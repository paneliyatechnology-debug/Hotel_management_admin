"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { WarningAmber, CheckCircle } from "@/shared/icons";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useSocket } from "@/shared/context/SocketContext";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { toast } from "@/shared/utils/toast";
import SettingsView from "@/shared/components/SettingsView";
import SuperAdminOverviewPage from "../pages/SuperAdminOverviewPage";
import HotelsDirectoryPage from "../pages/HotelsDirectoryPage";
import PendingApprovalsPage from "../pages/PendingApprovalsPage";
import SubscriptionPlansPage from "../pages/SubscriptionPlansPage";
import AuditLogsPage from "../pages/AuditLogsPage";

export default function SuperAdminDashboard({ user, activeNav = 0, onTabChange }) {
  const { themeConfig } = useAppTheme();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState(0);

  // Dialogs
  const [actionDialog, setActionDialog] = useState({ open: false, type: null, hotel: null, reason: "" });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  useSocket(["HOTEL_REGISTERED", "HOTEL_STATUS_UPDATED", "SUBSCRIPTION_UPDATED", "DASHBOARD_SYNC"], () => {
    fetchHotels();
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(API_ENDPOINTS.HOTELS.ALL);
      if (data?.data) {
        setHotels(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (hotelId, newStatus, reason = "") => {
    setActionLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.HOTELS.UPDATE_STATUS(hotelId), {
        method: "PUT",
        body: { status: newStatus, reason },
      });
      toast.success(`Hotel status updated to ${newStatus} successfully!`);
      setActionDialog({ open: false, type: null, hotel: null, reason: "" });
      if (selectedHotel && selectedHotel._id === hotelId) {
        setSelectedHotel((prev) => ({ ...prev, status: newStatus }));
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
  });

  const handleOpenEditDialog = (hotel) => {
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
    });
  };

  const handleSaveHotelEdit = async () => {
    if (!editDialog.hotel) return;
    setActionLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.SUPER_ADMIN.UPDATE_HOTEL(editDialog.hotel._id), {
        method: "PUT",
        body: editFormData,
      });
      toast.success(`Hotel '${editFormData.name}' and trial/subscription updated successfully! Realtime sync emitted.`);
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

      {/* Confirmation & Remarks Dialog for Suspend / Activate */}
      <Dialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, type: null, hotel: null, reason: "" })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "22px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "0 24px 48px -12px rgba(12, 39, 59, 0.22), inset 0 1px 1px rgba(255,255,255,0.95)",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: actionDialog.type === "DISABLE" ? themeConfig.dangerBg : themeConfig.successBg,
              color: actionDialog.type === "DISABLE" ? themeConfig.danger : themeConfig.success,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: actionDialog.type === "DISABLE" ? "0 2px 8px rgba(220, 38, 38, 0.2)" : "0 2px 8px rgba(22, 163, 74, 0.2)",
            }}
          >
            {actionDialog.type === "DISABLE" ? <WarningAmber sx={{ fontSize: 22 }} /> : <CheckCircle sx={{ fontSize: 22 }} />}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, lineHeight: 1.1 }}>
              {actionDialog.type === "DISABLE" ? "Suspend Hotel Property" : "Activate Hotel Property"}
            </Typography>
            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
              Target Hotel: <strong>{actionDialog.hotel?.name}</strong>
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 1.5 }}>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
            {actionDialog.type === "DISABLE"
              ? `Are you sure you want to suspend access for '${actionDialog.hotel?.name}'? Front desk check-ins, guest reservations, and staff logins will be locked immediately.`
              : `Are you sure you want to activate access for '${actionDialog.hotel?.name}'? The hotel property will be brought online with active PMS operational capabilities.`}
          </Typography>

          {/* Quick Pre-Set Remark Suggestions */}
          <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "block", mb: 0.8 }}>
            {actionDialog.type === "DISABLE" ? "Select or write suspension remark *:" : "Activation remarks / notes (optional):"}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.5 }}>
            {(actionDialog.type === "DISABLE"
              ? ["Payment Overdue", "GST Compliance Pending", "Police / KYC Hold", "Policy Violation", "License Expired", "Temporary Maintenance"]
              : ["KYC Documents Approved", "Commercial Plan Active", "Payment Received", "Compliance Verified", "Reactivated by Admin"]
            ).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                clickable
                onClick={() => setActionDialog((prev) => ({ ...prev, reason: tag }))}
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  borderRadius: "8px",
                  bgcolor: actionDialog.reason === tag ? themeConfig.primary : themeConfig.champagne,
                  color: actionDialog.reason === tag ? "#FFFFFF" : themeConfig.primaryDark,
                  border: `1px solid ${actionDialog.reason === tag ? themeConfig.primary : themeConfig.border}`,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: themeConfig.primary,
                    color: "#FFFFFF",
                  },
                }}
              />
            ))}
          </Box>

          <TextField
            label={actionDialog.type === "DISABLE" ? "Reason / Remark *" : "Reason / Remark (Optional)"}
            fullWidth
            multiline
            rows={3}
            required={actionDialog.type === "DISABLE"}
            value={actionDialog.reason}
            onChange={(e) => setActionDialog({ ...actionDialog, reason: e.target.value })}
            placeholder={
              actionDialog.type === "DISABLE"
                ? "State exact reason for suspension (sent to hotel owner email and saved in audit logs)..."
                : "Optional note for audit logging..."
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: themeConfig.bgMain,
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, px: 3, gap: 1 }}>
          <Button onClick={() => setActionDialog({ open: false, type: null, hotel: null, reason: "" })} sx={{ borderRadius: "10px", fontWeight: 700, color: themeConfig.textMuted }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={actionLoading || (actionDialog.type === "DISABLE" && !actionDialog.reason?.trim())}
            onClick={() => handleStatusUpdate(actionDialog.hotel?._id, actionDialog.type === "DISABLE" ? "DISABLED" : "ACTIVE", actionDialog.reason)}
            className="btn-3d"
            sx={{
              background: actionDialog.type === "DISABLE"
                ? `linear-gradient(135deg, ${themeConfig.danger} 0%, #B91C1C 100%)`
                : `linear-gradient(135deg, ${themeConfig.success} 0%, #15803D 100%)`,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "12px",
              px: 3,
              py: 1,
              boxShadow: actionDialog.type === "DISABLE"
                ? "0 4px 14px rgba(220, 38, 38, 0.3)"
                : "0 4px 14px rgba(22, 163, 74, 0.3)",
              "&:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            {actionLoading
              ? "Processing..."
              : actionDialog.type === "DISABLE"
              ? "Confirm & Send Suspension"
              : "Confirm & Activate Hotel"}
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

          <Box sx={{ p: 2, borderRadius: "14px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primaryDark, display: "block", mb: 1 }}>
              ⚡ Extend Free Trial Period (Realtime Socket Update)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {[0, 7, 15, 30, 60, 90].map((days) => (
                <Chip
                  key={days}
                  label={days === 0 ? "No Change" : `+${days} Days`}
                  size="small"
                  clickable
                  onClick={() => setEditFormData((prev) => ({ ...prev, extendTrialDays: days }))}
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    bgcolor: editFormData.extendTrialDays === days ? themeConfig.primary : themeConfig.bgCard,
                    color: editFormData.extendTrialDays === days ? "#FFFFFF" : themeConfig.textMain,
                  }}
                />
              ))}
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
          onRefresh={fetchHotels}
          onTabChange={onTabChange}
        />
      )}

      {/* ROUTE 1: HOTELS DIRECTORY & MASTER TABLE */}
      {activeNav === 1 && (
        <HotelsDirectoryPage
          hotels={hotels}
          loading={loading}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
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

      {/* ROUTE 3: AUDIT LOGS */}
      {activeNav === 3 && <AuditLogsPage />}

      {/* ROUTE 4: PROFILE & SETTINGS */}
      {activeNav === 4 && <SettingsView user={user} />}
    </Box>
  );
}
