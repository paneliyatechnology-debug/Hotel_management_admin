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
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { WarningAmber, CheckCircle } from "@mui/icons-material";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useSocket } from "@/shared/context/SocketContext";
import { useAppTheme } from "@/shared/context/ThemeContext";
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
  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });

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

  const showToast = (message, severity = "success") => {
    setNotification({ show: true, message, severity });
    setTimeout(() => setNotification({ show: false, message: "", severity: "success" }), 4000);
  };

  const handleStatusUpdate = async (hotelId, newStatus, reason = "") => {
    setActionLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.HOTELS.UPDATE_STATUS(hotelId), {
        method: "PUT",
        body: { status: newStatus, reason },
      });
      showToast(`Hotel status updated to ${newStatus} successfully!`);
      setActionDialog({ open: false, type: null, hotel: null, reason: "" });
      if (selectedHotel && selectedHotel._id === hotelId) {
        setSelectedHotel((prev) => ({ ...prev, status: newStatus }));
      }
      fetchHotels();
    } catch (err) {
      showToast(err.message || "Failed to update hotel status", "error");
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
      showToast(`Trial successfully extended by ${days} days!`);
      fetchHotels();
    } catch (err) {
      showToast(err.message || "Failed to extend trial", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenActionDialog = (type, hotel) => {
    setActionDialog({ open: true, type, hotel, reason: "" });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: themeConfig.bgMain, minHeight: "100%" }}>
      {/* Toast Notification */}
      {notification.show && (
        <Alert
          severity={notification.severity}
          sx={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            borderRadius: "14px",
            bgcolor: notification.severity === "success" ? "#FAF9F6" : "#FFF5F5",
            border: `1px solid ${notification.severity === "success" ? themeConfig.success : themeConfig.danger}`,
          }}
        >
          {notification.message}
        </Alert>
      )}

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
          onExtendTrial={handleExtendTrial}
          onRefresh={fetchHotels}
        />
      )}

      {/* ROUTE 2: PENDING APPROVALS */}
      {activeNav === 2 && (
        <PendingApprovalsPage
          hotels={hotels}
          onOpenActionDialog={handleOpenActionDialog}
        />
      )}

      {/* ROUTE 3: SUBSCRIPTION PLANS */}
      {activeNav === 3 && <SubscriptionPlansPage />}

      {/* ROUTE 4: AUDIT LOGS */}
      {activeNav === 4 && <AuditLogsPage />}

      {/* ROUTE 5: PROFILE & SETTINGS */}
      {activeNav === 5 && <SettingsView user={user} />}
    </Box>
  );
}
