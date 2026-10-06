"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Badge,
} from "@mui/material";
import { HourglassEmpty, CheckCircle, Cancel, Business, Phone, Email, AccessTime } from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { useSocket } from "@/shared/context/SocketContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { toast } from "@/shared/utils/toast";
import EmptyState from "@/shared/components/EmptyState";

export default function TrialExtensionRequestsSection({ onRefreshHotels }) {
  const { themeConfig } = useAppTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog State for Approve / Reject
  const [dialogState, setDialogState] = useState({ open: false, type: null, request: null, days: 30, remarks: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  useSocket(["NEW_TRIAL_REQUEST", "TRIAL_REQUEST_APPROVED", "TRIAL_REQUEST_REJECTED"], () => {
    fetchRequests();
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(API_ENDPOINTS.TRIAL_REQUESTS.SUPER_ADMIN_LIST);
      if (res?.data) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch trial requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (type, reqItem) => {
    setDialogState({
      open: true,
      type,
      request: reqItem,
      days: reqItem?.requestedDays || 30,
      customEndDate: "",
      remarks: type === "APPROVE" ? `Approved for trial extension by Super Admin.` : "Request declined by Super Admin.",
    });
  };

  const handleSubmitAction = async () => {
    if (!dialogState.request) return;
    setSubmitting(true);
    try {
      if (dialogState.type === "APPROVE") {
        await apiRequest(API_ENDPOINTS.TRIAL_REQUESTS.APPROVE(dialogState.request._id), {
          method: "PUT",
          body: {
            approvedDays: Number(dialogState.days) || 30,
            customEndDate: dialogState.customEndDate || undefined,
            remarks: dialogState.remarks,
          },
        });
        toast.success(`Approved trial extension for '${dialogState.request.hotelName}'!`);
      } else {
        await apiRequest(API_ENDPOINTS.TRIAL_REQUESTS.REJECT(dialogState.request._id), {
          method: "PUT",
          body: { remarks: dialogState.remarks },
        });
        toast.info(`Rejected trial extension for '${dialogState.request.hotelName}'.`);
      }
      setDialogState({ open: false, type: null, request: null, days: 30, customEndDate: "", remarks: "" });
      fetchRequests();
      if (onRefreshHotels) onRefreshHotels();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  return (
    <Box sx={{ mt: 1, width: "100%", overflow: "hidden" }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: { xs: "1rem", sm: "1.2rem" } }}>
            Free Trial Extension Requests Queue
          </Typography>
          {pendingRequests.length > 0 && (
            <Chip
              label={`${pendingRequests.length} Pending`}
              color="warning"
              size="small"
              sx={{ fontWeight: 800, borderRadius: "8px" }}
            />
          )}
        </Box>
        <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
          ⚡ Realtime Socket.IO Sync Active
        </Typography>
      </Box>

      {/* Action Dialog */}
      <Dialog
        open={dialogState.open}
        onClose={() => setDialogState({ open: false, type: null, request: null, days: 30, customEndDate: "", remarks: "" })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
          {dialogState.type === "APPROVE" ? "Approve Trial Extension" : "Reject Trial Extension"}
          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mt: 0.5 }}>
            Hotel: <strong>{dialogState.request?.hotelName}</strong> | Requested Days: <strong>{dialogState.request?.requestedDays} Days</strong>
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 1.5, display: "flex", flexDirection: "column", gap: 2 }}>
          {dialogState.type === "APPROVE" && (
            <Box sx={{ display: "flex", gap: 1.5, flexDirection: "column" }}>
              <TextField
                label="Approved Days (+Days)"
                type="number"
                fullWidth
                size="small"
                value={dialogState.days}
                onChange={(e) => setDialogState({ ...dialogState, days: e.target.value, customEndDate: "" })}
                helperText="Standard relative days extension."
              />

              <TextField
                label="OR Custom Expiry Date & Exact Time (Hours/Mins)"
                type="datetime-local"
                fullWidth
                size="small"
                value={dialogState.customEndDate}
                onChange={(e) => setDialogState({ ...dialogState, customEndDate: e.target.value })}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                helperText="Specify exact cutoff date and time (e.g. 2026-10-31 23:59)."
              />
            </Box>
          )}

          <TextField
            label="Super Admin Remarks / Reason"
            fullWidth
            multiline
            rows={3}
            size="small"
            value={dialogState.remarks}
            onChange={(e) => setDialogState({ ...dialogState, remarks: e.target.value })}
            placeholder="Write official response to hotel administration..."
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button onClick={() => setDialogState({ open: false, type: null, request: null, days: 30, remarks: "" })} sx={{ fontWeight: 700, color: themeConfig.textMuted }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handleSubmitAction}
            className="btn-3d"
            sx={{
              bgcolor: dialogState.type === "APPROVE" ? themeConfig.success : themeConfig.danger,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "10px",
              px: 3,
            }}
          >
            {submitting ? "Processing..." : dialogState.type === "APPROVE" ? "Grant Trial Days →" : "Reject Request"}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer
        component={Paper}
        className="card-3d"
        sx={{
          borderRadius: "18px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.08)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ background: `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)` }}>
              <TableCell sx={{ fontWeight: 800 }}>Hotel &amp; Owner Details</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Requested Extension</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Reason / Note</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Submitted On</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 5 }}>
                  <EmptyState title="No Trial Extension Requests" description="Hotel admins can submit trial extension requests directly from their portal." />
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req._id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: themeConfig.primary,
                          borderRadius: "10px",
                          width: 38,
                          height: 38,
                        }}
                      >
                        <Business fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          {req.hotelName || "Hotel Property"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                          Owner: {req.ownerName} ({req.ownerPhone || req.ownerEmail})
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      icon={<AccessTime fontSize="small" />}
                      label={`+${req.requestedDays} Free Days`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        bgcolor: themeConfig.champagne,
                        color: themeConfig.primaryDark,
                        border: `1px solid ${themeConfig.border}`,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ maxWidth: 220 }}>
                    <Typography variant="body2" sx={{ color: themeConfig.textMain, fontSize: "0.85rem", fontStyle: "italic" }}>
                      "{req.reason}"
                    </Typography>
                    {req.adminRemarks && (
                      <Typography variant="caption" sx={{ color: themeConfig.primary, display: "block", mt: 0.5, fontWeight: 700 }}>
                        Remark: {req.adminRemarks}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ color: themeConfig.textMuted, fontSize: "0.82rem" }}>
                    {new Date(req.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={req.status}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        bgcolor:
                          req.status === "APPROVED"
                            ? themeConfig.successBg
                            : req.status === "REJECTED"
                            ? themeConfig.dangerBg
                            : themeConfig.champagne,
                        color:
                          req.status === "APPROVED"
                            ? themeConfig.success
                            : req.status === "REJECTED"
                            ? themeConfig.danger
                            : themeConfig.primaryDark,
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    {req.status === "PENDING" ? (
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<CheckCircle />}
                          onClick={() => handleOpenDialog("APPROVE", req)}
                          className="btn-3d"
                          sx={{
                            bgcolor: themeConfig.success,
                            color: "#FFFFFF",
                            fontWeight: 800,
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            px: 1.5,
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleOpenDialog("REJECT", req)}
                          sx={{
                            fontWeight: 800,
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontStyle: "italic" }}>
                        Processed
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
