"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { WarningAmber, CheckCircle, Close } from "@/shared/icons";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useSocket } from "@/shared/context/SocketContext";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { toast } from "@/shared/utils/toast";
import { useDebounce } from "@/shared/hooks/useDebounce";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const ComponentSpinner = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
    <CircularProgress size={36} />
  </Box>
);

const SettingsView = dynamic(() => import("@/shared/components/SettingsView"), { loading: () => <ComponentSpinner /> });
const SuperAdminOverviewPage = dynamic(() => import("../pages/SuperAdminOverviewPage"), { loading: () => <ComponentSpinner /> });
const HotelsDirectoryPage = dynamic(() => import("../pages/HotelsDirectoryPage"), { loading: () => <ComponentSpinner /> });
const SubscriptionPlansPage = dynamic(() => import("../pages/SubscriptionPlansPage"), { loading: () => <ComponentSpinner /> });
const AuditLogsPage = dynamic(() => import("../pages/AuditLogsPage"), { loading: () => <ComponentSpinner /> });

export default function SuperAdminDashboard({ user, activeNav = 0, onTabChange }) {
  const { themeConfig } = useAppTheme();

  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const debouncedSearch = useDebounce(search, 350);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState(0);

  // Dialogs
  const [actionDialog, setActionDialog] = useState({ open: false, type: null, hotel: null, reason: "" });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "SUPER_ADMIN" && (activeNav === 0 || activeNav === 1)) {
      fetchHotels();
    }
  }, [user, activeNav, page, rowsPerPage, debouncedSearch, statusFilter]);

  useSocket(["HOTEL_REGISTERED", "HOTEL_STATUS_UPDATED", "SUBSCRIPTION_UPDATED", "DASHBOARD_SYNC"], () => {
    if (user?.role === "SUPER_ADMIN") {
      fetchHotels();
    }
  });

  const fetchHotels = async () => {
    if (!user || user.role !== "SUPER_ADMIN") return;
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.set("page", String(page + 1));
      params.set("limit", String(rowsPerPage));

      if (debouncedSearch && debouncedSearch.trim()) {
        params.set("search", debouncedSearch.trim());
      }

      if (statusFilter === "ACTIVE") {
        params.set("is_active", "true");
      } else if (statusFilter === "DISABLED" || statusFilter === "DEACTIVE") {
        params.set("is_active", "false");
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const data = await apiRequest(API_ENDPOINTS.HOTELS.LIST(queryString));

      const rawList = Array.isArray(data?.data?.hotels)
        ? data.data.hotels
        : Array.isArray(data?.hotels)
          ? data.hotels
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
              ? data
              : [];

      const totalCount =
        Number(
          data?.total ??
          data?.data?.total ??
          data?.pagination?.total ??
          data?.data?.pagination?.total ??
          data?.total_count ??
          data?.data?.total_count ??
          rawList.length
        ) || rawList.length;

      setTotalHotels(totalCount);

      const text = (...values) => values.find((value) => value !== undefined && value !== null && String(value).trim() !== "") || "";
      const person = (record) => (record && typeof record === "object" && !Array.isArray(record) ? record : {});

      setHotels(rawList.map((hotel) => {
        // Resolve is_active from API — strictly check boolean, string, or number
        const rawActive = hotel.is_active !== undefined ? hotel.is_active : hotel.isActive;
        const isHotelActive =
          rawActive === false || rawActive === 0 || String(rawActive).toLowerCase() === "false"
            ? false
            : rawActive === true || rawActive === 1 || String(rawActive).toLowerCase() === "true"
            ? true
            : hotel.status
            ? String(hotel.status).toUpperCase() === "ACTIVE"
            : true;

        const status = isHotelActive ? "ACTIVE" : "DISABLED";
        const hotelId = String(hotel._id || hotel.id || "");
        const adminObj = person(hotel.admin);
        const ownerObj = person(hotel.owner || hotel.user || hotel.manager);
        const ownerName = text(hotel.ownerName, hotel.owner_name, adminObj.name, adminObj.full_name, ownerObj.name, ownerObj.full_name);
        const ownerEmail = text(hotel.ownerEmail, hotel.owner_email, adminObj.email, hotel.email, hotel.contact_email, hotel.contactEmail, ownerObj.email);
        const ownerPhone = text(hotel.ownerPhone, hotel.owner_phone, adminObj.phone, adminObj.mobile, hotel.phone, hotel.mobile, hotel.contact_phone, ownerObj.phone, ownerObj.mobile);
        const totalRooms = Number(hotel.totalRooms ?? hotel.total_rooms ?? hotel.rooms_count ?? hotel.room_count ?? hotel.roomsCount ?? hotel.stats?.totalRooms ?? 0) || 0;

        return {
          ...hotel,
          _id: hotel._id || hotel.id,
          id: hotel.id || hotel._id,
          is_active: isHotelActive,
          isActive: isHotelActive,
          status,
          name: hotel.name || hotel.hotel_name || hotel.hotelName || "Hotel",
          city: hotel.city || hotel.address?.city || "",
          state: hotel.state || hotel.address?.state || "",
          ownerName,
          ownerEmail,
          ownerPhone,
          totalRooms,
          createdAt: hotel.createdAt || hotel.created_at,
          admin: { ...adminObj, name: ownerName, email: ownerEmail, phone: ownerPhone },
        };
      }));
    } catch (err) {
      console.warn("Failed to fetch hotels:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (hotelId, newStatus, reason) => {
    // newStatus: "ACTIVE" or "DISABLED"
    // API: PATCH /api/v1/hotels/:id/active-status  Body: { is_active: true | false }
    const isActivating = newStatus === "ACTIVE";
    setActionLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.HOTELS.UPDATE_STATUS(hotelId), {
        method: "PATCH",
        body: { is_active: isActivating },
      });
      toast.success(
        isActivating
          ? "Hotel activated successfully!"
          : "Hotel suspended successfully!"
      );
      setActionDialog({ open: false, type: null, hotel: null, reason: "" });
      setHotels((prev) =>
        prev.map((h) => {
          if (String(h._id || h.id) === String(hotelId)) {
            return {
              ...h,
              is_active: isActivating,
              isActive: isActivating,
              status: isActivating ? "ACTIVE" : "DISABLED",
            };
          }
          return h;
        })
      );
      if (selectedHotel && String(selectedHotel._id || selectedHotel.id) === String(hotelId)) {
        setSelectedHotel((prev) => ({
          ...prev,
          is_active: isActivating,
          isActive: isActivating,
          status: isActivating ? "ACTIVE" : "DISABLED",
        }));
      }
      fetchHotels();
    } catch (err) {
      toast.error(err.message || "Failed to update hotel status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExtendTrial = async (hotelId, days = 30) => {
    setActionLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.HOTELS.EXTEND_TRIAL(hotelId), {
        method: "POST",
        body: { days },
      });
      toast.success(`Trial successfully extended by ${days} days!`);
      fetchHotels();
    } catch (err) {
      toast.error(err.message || "Failed to extend trial");
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Hotel & Trial Dialog State
  const [editDialog, setEditDialog] = useState({ open: false, hotel: null });
  const [editFormData, setEditFormData] = useState({
    name: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    status: "ACTIVE",
    totalRooms: 20,
    subscriptionPlan: "TRIAL",
    extendTrialDays: 0,
    customTrialDays: "",
    trialEndDate: "",
  });

  const handleOpenEditDialog = (hotel) => {
    const rawDate = hotel?.subscription?.trialEndDate;
    let formattedDate = "";
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        const pad = (n) => String(n).padStart(2, "0");
        formattedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      } catch {
        formattedDate = "";
      }
    }
    setEditDialog({ open: true, hotel });
    setEditFormData({
      name: hotel?.name || "",
      ownerName: hotel?.ownerName || hotel?.admin?.name || "",
      ownerEmail: hotel?.ownerEmail || hotel?.admin?.email || "",
      ownerPhone: hotel?.ownerPhone || hotel?.phone || "",
      status: hotel?.status || "ACTIVE",
      totalRooms: hotel?.totalRooms || 20,
      subscriptionPlan: hotel?.subscription?.plan || "TRIAL",
      extendTrialDays: 0,
      customTrialDays: "",
      trialEndDate: formattedDate,
    });
  };

  const handleSaveHotelEdit = async () => {
    if (!editDialog.hotel) return;
    setActionLoading(true);
    try {
      const isTrial = editFormData.subscriptionPlan === "TRIAL" || editFormData.subscriptionPlan === "FREE";
      const payload = {
        ...editFormData,
        subscriptionStatus: isTrial ? "TRIAL" : "ACTIVE",
      };
      await apiRequest(API_ENDPOINTS.SUPER_ADMIN.UPDATE_HOTEL(editDialog.hotel._id), {
        method: "PUT",
        body: payload,
      });
      toast.success(`Hotel '${editFormData.name}' updated to ${editFormData.subscriptionPlan} plan! Realtime sync emitted.`);
      setEditDialog({ open: false, hotel: null });
      if (selectedHotel && selectedHotel._id === editDialog.hotel._id) {
        setSelectedHotel((prev) => ({
          ...prev,
          name: editFormData.name,
          ownerName: editFormData.ownerName,
          status: editFormData.status,
        }));
      }
      fetchHotels();
    } catch (err) {
      toast.error(err.message || "Failed to update hotel");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenActionDialog = (type, hotel) => {
    setActionDialog({ open: true, type, hotel, reason: "" });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: themeConfig.bgMain, minHeight: "100%" }}>

      {/* Confirmation Dialog for Suspend / Activate */}
      <Dialog
        open={actionDialog.open}
        onClose={() => !actionLoading && setActionDialog({ open: false, type: null, hotel: null, reason: "" })}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              overflow: "hidden",
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ p: 0 }}>
          <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, bgcolor: themeConfig.bgSoft, borderBottom: `1px solid ${themeConfig.border}` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  color: actionDialog.type === "DISABLE" ? themeConfig.danger || "#EF4444" : themeConfig.success || "#10B981",
                  bgcolor: themeConfig.bgCard,
                  border: `1px solid ${themeConfig.border}`,
                }}
              >
                {actionDialog.type === "DISABLE" ? <WarningAmber sx={{ fontSize: 20 }} /> : <CheckCircle sx={{ fontSize: 20 }} />}
              </Box>
              <Box>
                <Typography sx={{ color: actionDialog.type === "DISABLE" ? themeConfig.danger || "#EF4444" : themeConfig.success || "#10B981", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                  HOTELS
                </Typography>
                <Typography sx={{ fontWeight: 700, color: themeConfig.textMain, fontSize: "1.05rem", lineHeight: 1.3 }}>
                  {actionDialog.type === "DISABLE" ? "Suspend Hotel" : "Activate Hotel"}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => setActionDialog({ open: false, type: null, hotel: null, reason: "" })}
              disabled={actionLoading}
              aria-label="Close"
              sx={{ width: 36, height: 36, borderRadius: "10px", border: `1px solid ${themeConfig.border}`, color: themeConfig.textMuted }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2.75 }}>
          <Typography sx={{ color: themeConfig.textMain, fontSize: "0.95rem", lineHeight: 1.6 }}>
            {actionDialog.type === "DISABLE"
              ? `Are you sure you want to suspend "${actionDialog.hotel?.name}"? Front desk check-ins, guest reservations, and staff logins will be locked immediately.`
              : `Are you sure you want to activate "${actionDialog.hotel?.name}"? The hotel will be brought back online with full PMS access.`}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgSoft }}>
          <Button
            onClick={() => setActionDialog({ open: false, type: null, hotel: null, reason: "" })}
            disabled={actionLoading}
            variant="outlined"
            sx={{ minWidth: 104, height: 40, borderRadius: "10px", textTransform: "none", fontWeight: 700, color: themeConfig.textMain, borderColor: themeConfig.border, bgcolor: themeConfig.bgCard }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={actionLoading}
            onClick={() => handleStatusUpdate(actionDialog.hotel?._id, actionDialog.type === "DISABLE" ? "DISABLED" : "ACTIVE")}
            sx={{
              minWidth: 104,
              height: 40,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              bgcolor: actionDialog.type === "DISABLE" ? themeConfig.danger || "#DC2626" : themeConfig.success || "#16A34A",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: actionDialog.type === "DISABLE" ? "#B91C1C" : "#15803D",
                boxShadow: "none",
              },
            }}
          >
            {actionLoading
              ? "Please wait…"
              : actionDialog.type === "DISABLE"
              ? "Confirm Suspension"
              : "Confirm Activation"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Hotel & Trial Settings Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, hotel: null })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "22px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "0 24px 48px -12px rgba(12, 39, 59, 0.22)",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
          Edit Hotel &amp; Trial Settings
          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
            Target Hotel: <strong>{editDialog.hotel?.name}</strong>
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Hotel Name"
            fullWidth
            size="small"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            sx={{ mt: 1 }}
          />

          <TextField
            label="Owner Full Name"
            fullWidth
            size="small"
            value={editFormData.ownerName}
            onChange={(e) => setEditFormData({ ...editFormData, ownerName: e.target.value })}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Owner Email"
              fullWidth
              size="small"
              value={editFormData.ownerEmail}
              onChange={(e) => setEditFormData({ ...editFormData, ownerEmail: e.target.value })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              size="small"
              value={editFormData.ownerPhone}
              onChange={(e) => setEditFormData({ ...editFormData, ownerPhone: e.target.value })}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="Hotel Operational Status"
              fullWidth
              size="small"
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
            >
              <MenuItem value="ACTIVE">ACTIVE (Operational)</MenuItem>
              <MenuItem value="SUSPENDED">SUSPENDED (Temporary Hold)</MenuItem>
              <MenuItem value="DISABLED">DISABLED (Blocked)</MenuItem>
              <MenuItem value="EXPIRED">EXPIRED (Trial/Plan Ended)</MenuItem>
            </TextField>

            <TextField
              select
              label="Subscription Plan"
              fullWidth
              size="small"
              value={editFormData.subscriptionPlan}
              onChange={(e) => setEditFormData({ ...editFormData, subscriptionPlan: e.target.value })}
            >
              <MenuItem value="TRIAL">TRIAL Plan</MenuItem>
              <MenuItem value="FREE">FREE Plan</MenuItem>
              <MenuItem value="STARTER">STARTER Tier</MenuItem>
              <MenuItem value="PREMIUM">PREMIUM Tier</MenuItem>
              <MenuItem value="ENTERPRISE">ENTERPRISE Tier</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ p: 2, borderRadius: "14px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}`, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primaryDark, display: "block" }}>
              ⚡ Free Trial &amp; Expiry Date Management (Custom &amp; Realtime Sync)
            </Typography>

            {/* Quick Presets */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexWrap: "wrap" }}>
              {[0, 7, 15, 30, 60, 90, 180, 365].map((days) => (
                <Chip
                  key={days}
                  label={days === 0 ? "Default" : `+${days} Days`}
                  size="small"
                  clickable
                  onClick={() => setEditFormData((prev) => ({ ...prev, extendTrialDays: days, customTrialDays: "", trialEndDate: "", status: days > 0 ? "ACTIVE" : prev.status }))}
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    bgcolor: editFormData.extendTrialDays === days && !editFormData.customTrialDays && !editFormData.trialEndDate ? themeConfig.primary : themeConfig.bgCard,
                    color: editFormData.extendTrialDays === days && !editFormData.customTrialDays && !editFormData.trialEndDate ? "#FFFFFF" : themeConfig.textMain,
                  }}
                />
              ))}
            </Box>

            {/* Custom Inputs: Days or Exact Date */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 0.5 }}>
              <TextField
                label="Custom Trial (Days)"
                type="number"
                size="small"
                fullWidth
                placeholder="e.g. 45, 120"
                value={editFormData.customTrialDays}
                onChange={(e) => setEditFormData({ ...editFormData, customTrialDays: e.target.value, extendTrialDays: 0, trialEndDate: "", status: e.target.value ? "ACTIVE" : editFormData.status })}
                slotProps={{
                  input: {
                    sx: { bgcolor: themeConfig.bgCard, fontSize: "0.82rem" },
                  },
                }}
              />

              <TextField
                label="Custom Expiry Date & Time (Hours/Mins)"
                type="datetime-local"
                size="small"
                fullWidth
                value={editFormData.trialEndDate}
                onChange={(e) => setEditFormData({ ...editFormData, trialEndDate: e.target.value, extendTrialDays: 0, customTrialDays: "", status: e.target.value ? "ACTIVE" : editFormData.status })}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    sx: { bgcolor: themeConfig.bgCard, fontSize: "0.82rem" },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setEditDialog({ open: false, hotel: null })} sx={{ fontWeight: 700, color: themeConfig.textMuted }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={actionLoading}
            onClick={handleSaveHotelEdit}
            className="btn-3d"
            sx={{
              bgcolor: themeConfig.primary,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "12px",
              px: 3,
            }}
          >
            {actionLoading ? "Saving..." : "Save & Sync Realtime (Socket) →"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ROUTE 0: OVERVIEW & REVENUE TELEMETRY */}
      {activeNav === 0 && (
        <SuperAdminOverviewPage
          hotels={hotels}
          staffCount={staffCount}
          onRefresh={fetchHotels}
          onTabChange={onTabChange}
        />
      )}

      {/* ROUTE 1: HOTELS DIRECTORY & MASTER TABLE */}
      {activeNav === 1 && (
        <HotelsDirectoryPage
          hotels={hotels}
          totalHotels={totalHotels}
          loading={loading}
          search={search}
          setSearch={(val) => {
            setSearch(val);
            setPage(0);
          }}
          statusFilter={statusFilter}
          setStatusFilter={(val) => {
            setStatusFilter(val);
            setPage(0);
          }}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(val) => {
            setRowsPerPage(val);
            setPage(0);
          }}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerTab={drawerTab}
          setDrawerTab={setDrawerTab}
          onOpenActionDialog={handleOpenActionDialog}
          onEditHotel={handleOpenEditDialog}
          onExtendTrial={handleExtendTrial}
          onRefresh={fetchHotels}
        />
      )}

      {/* ROUTE 2: SUBSCRIPTION PLANS */}
      {activeNav === 2 && <SubscriptionPlansPage />}

      {/* ROUTE 3: AUDIT LOGS & SECURITY */}
      {activeNav === 3 && <AuditLogsPage hotels={hotels} onRefreshHotels={fetchHotels} />}

      {/* ROUTE 4: PROFILE & SETTINGS */}
      {activeNav === 4 && <SettingsView user={user} />}
    </Box>
  );
}
