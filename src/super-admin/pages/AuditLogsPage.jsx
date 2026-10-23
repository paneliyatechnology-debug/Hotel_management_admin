"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close } from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import EmptyState from "@/shared/components/EmptyState";
import { API_ENDPOINTS, apiRequest } from "@/config/api";

function formatLogTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function readAuditPage(res) {
  const buckets = [res?.data, res].filter(Boolean);
  for (const bucket of buckets) {
    if (Array.isArray(bucket)) return { list: bucket, total: bucket.length };
    const list = bucket.audit_logs || bucket.auditLogs || bucket.logs;
    if (Array.isArray(list)) {
      return { list, total: Number(bucket.total ?? list.length) || list.length };
    }
  }
  return { list: [], total: 0 };
}

function safeRequestData(data) {
  if (!data || typeof data !== "object") return null;
  const hidden = /password|passwd|secret|token|otp/i;
  const entries = Object.entries(data).filter(([key]) => !hidden.test(key));
  return entries.length ? entries : null;
}

export default function AuditLogsPage({ hotels = [] }) {
  const { themeConfig } = useAppTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hotelId, setHotelId] = useState("");
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const openLog = async (id) => {
    setDetailOpen(true);
    setDetail(null);
    setDetailError("");
    setDetailLoading(true);
    try {
      const res = await apiRequest(API_ENDPOINTS.AUDIT_LOGS.BY_ID(id));
      const record = res?.data?.id ? res.data : res?.data?.audit_log || res?.data?.auditLog || res?.data;
      setDetail(record && typeof record === "object" ? record : null);
      if (!record) setDetailError("Audit log details were not returned.");
    } catch (err) {
      setDetailError(err?.message || "Could not load this audit log.");
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const params = new URLSearchParams({
          page: String(page + 1),
          limit: String(rowsPerPage),
        });
        if (hotelId) params.set("hotel_id", hotelId);
        if (action) params.set("action", action);
        if (status) params.set("status", status);
        if (search.trim()) params.set("search", search.trim());
        const res = await apiRequest(`${API_ENDPOINTS.AUDIT_LOGS.ALL}?${params.toString()}`);
        const { list, total: count } = readAuditPage(res);
        if (!cancelled) {
          setLogs(list);
          setTotal(count);
        }
      } catch (err) {
        if (!cancelled) {
          setLogs([]);
          setTotal(0);
          setLoadError(err?.message || "Audit logs could not be loaded.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [page, rowsPerPage, hotelId, action, status, search]);

  const filteredLogs = logs.filter((log) => {
    if (action && String(log.action || "").toUpperCase() !== action) return false;
    if (status && String(log.status || "").toUpperCase() !== status) return false;
    const query = search.trim().toLowerCase();
    if (!query) return true;
    const actor = log.user?.name || log.request_data?.email || log.requestData?.email || "";
    const blob = [actor, log.user?.role, log.description, log.action, log.ip_address, log.ipAddress, log.entity_type, log.entityType]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return blob.includes(query);
  });

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        pb: { xs: 12, sm: 3 },
      }}
    >
      <Box sx={{ mb: 1.5, flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1.15rem" }}>
          Audit Logs
        </Typography>
        <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.8rem", mt: 0.25 }}>
          Logins and hotel actions.
        </Typography>
      </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2, flexShrink: 0 }}>
          <TextField
            size="small"
            placeholder="Search user, action, or IP"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 240 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgCard } }}
          />
          <TextField
            select
            size="small"
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 160 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgCard }, "& .MuiSelect-select": { color: themeConfig.textMain } }}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => selected ? String(selected).replaceAll("_", " ") : "All actions",
              },
            }}
          >
            <MenuItem value="">All actions</MenuItem>
            {["LOGIN", "CREATE", "UPDATE", "DELETE", "CHECK_OUT", "CHECK_IN"].map((item) => (
              <MenuItem key={item} value={item}>{item.replaceAll("_", " ")}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgCard }, "& .MuiSelect-select": { color: themeConfig.textMain } }}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => selected === "SUCCESS" ? "Success" : selected === "FAILED" ? "Failed" : "All statuses",
              },
            }}
          >
            <MenuItem value="">All statuses</MenuItem>
            <MenuItem value="SUCCESS">Success</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            value={hotelId}
            onChange={(e) => {
              setHotelId(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 220 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgCard }, "& .MuiSelect-select": { color: themeConfig.textMain } }}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) return "All hotels";
                  const hotel = hotels.find((item) => String(item._id || item.id) === String(selected));
                  return hotel?.name || "All hotels";
                },
              },
            }}
          >
            <MenuItem value="">All hotels</MenuItem>
            {hotels.map((hotel) => (
              <MenuItem key={hotel._id || hotel.id} value={String(hotel._id || hotel.id)}>
                {hotel.name || `Hotel ${hotel._id || hotel.id}`}
              </MenuItem>
            ))}
          </TextField>
        </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Paper
          className="card-3d"
          sx={{
            flex: 1,
            minHeight: rowsPerPage * 68 + 56,
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            border: `1.5px solid ${themeConfig.border}`,
            overflow: "hidden",
            bgcolor: themeConfig.bgCard,
          }}
        >
      <TableContainer
        sx={{
          flex: 1,
          minHeight: rowsPerPage * 68,
          overflowX: "auto",
          overflowY: "visible",
          maxWidth: "100%",
        }}
      >
        <Table stickyHeader sx={{ width: "100%" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: themeConfig.bgSoft || themeConfig.champagne }}>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Log Event ID</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Action Triggered</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>User</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>IP Address</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6, color: themeConfig.textMuted }}>
                  Loading audit logs...
                </TableCell>
              </TableRow>
            ) : filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6 }}>
                  <EmptyState
                    title={loadError || "No Audit Logs Recorded"}
                    description={loadError ? "The audit log request did not return rows." : "Administrative actions and platform security events will be logged here in real time."}
                  />
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => {
                const failed = String(log.status || "").toUpperCase() === "FAILED";
                const actor = log.user?.name || log.request_data?.email || log.requestData?.email || "System";
                const role = log.user?.role || "";
                return (
                <TableRow
                  key={log.id || log._id}
                  hover
                  onClick={() => openLog(log.id || log._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ fontFamily: "monospace", fontWeight: 700, color: themeConfig.primaryDark }}>
                    {log.id || log._id}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${log.action || "—"}${log.status ? ` · ${log.status}` : ""}`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        bgcolor: failed ? themeConfig.dangerBg : themeConfig.successBg,
                        color: failed ? themeConfig.danger : themeConfig.success,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: themeConfig.textMain }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{actor}</Typography>
                    {role && (
                      <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.75rem" }}>{role}</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: themeConfig.textMain, fontSize: "0.85rem", maxWidth: 360 }}>
                    {log.description || log.error_message || log.errorMessage || "—"}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{log.ip_address || log.ipAddress || "—"}</TableCell>
                  <TableCell sx={{ color: themeConfig.textMuted, fontSize: "0.85rem", whiteSpace: "nowrap" }}>{formatLogTime(log.created_at || log.createdAt)}</TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={search || action || status ? filteredLogs.length : total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              flexShrink: 0,
              borderTop: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              color: themeConfig.textMain,
            }}
          />
        </Paper>
      </Box>

      <Dialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "18px",
              bgcolor: themeConfig.bgCard,
              border: `1px solid ${themeConfig.border}`,
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1, pr: 1.5 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              {detail?.description || (detailLoading ? "Loading log" : "Audit log")}
            </Typography>
            <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.8rem", mt: 0.4 }}>
              {detail?.id ? `Log #${detail.id}` : ""}{detail ? ` · ${formatLogTime(detail.created_at || detail.createdAt)}` : ""}
            </Typography>
          </Box>
          <IconButton onClick={() => setDetailOpen(false)} aria-label="Close">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
          {detailLoading && (
            <Typography sx={{ color: themeConfig.textMuted, py: 2 }}>Loading log details...</Typography>
          )}
          {detailError && (
            <Typography sx={{ color: themeConfig.danger, py: 2 }}>{detailError}</Typography>
          )}
          {detail && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 0.5 }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label={detail.action || "—"} size="small" sx={{ fontWeight: 800, bgcolor: themeConfig.bgSoft, color: themeConfig.accent || themeConfig.primary }} />
                <Chip
                  label={detail.status || "—"}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    bgcolor: String(detail.status).toUpperCase() === "FAILED" ? themeConfig.dangerBg : themeConfig.successBg,
                    color: String(detail.status).toUpperCase() === "FAILED" ? themeConfig.danger : themeConfig.success,
                  }}
                />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" }, gap: 1.25 }}>
                {[
                  ["User", detail.user?.name || "—"],
                  ["Role", detail.user?.role || "—"],
                  ["Hotel ID", detail.hotel_id ?? detail.hotelId ?? "—"],
                  ["Entity", [detail.entity_type || detail.entityType, detail.entity_id || detail.entityId].filter(Boolean).join(" #") || "—"],
                  ["IP address", detail.ip_address || detail.ipAddress || "—"],
                  ["Status code", detail.status_code ?? detail.statusCode ?? "—"],
                ].map(([label, value]) => (
                  <Box key={label} sx={{ p: 1.25, borderRadius: "12px", border: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgSubtle || themeConfig.bgMain }}>
                    <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.72rem", fontWeight: 700 }}>{label}</Typography>
                    <Typography sx={{ color: themeConfig.textMain, fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-word" }}>{value}</Typography>
                  </Box>
                ))}
              </Box>

              {safeRequestData(detail.request_data || detail.requestData) && (
                <Box>
                  <Typography sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1, fontSize: "0.85rem" }}>Request</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                    {safeRequestData(detail.request_data || detail.requestData).map(([key, value]) => (
                      <Box key={key} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.8rem" }}>{key}</Typography>
                        <Typography sx={{ color: themeConfig.textMain, fontSize: "0.85rem", fontWeight: 700, textAlign: "right", wordBreak: "break-all" }}>{String(value)}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {(detail.error_message || detail.errorMessage) && (
                <Box sx={{ p: 1.25, borderRadius: "12px", bgcolor: themeConfig.dangerBg }}>
                  <Typography sx={{ color: themeConfig.danger, fontWeight: 700, fontSize: "0.85rem" }}>{detail.error_message || detail.errorMessage}</Typography>
                </Box>
              )}

              {detail.changes && (
                <Box>
                  <Typography sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1, fontSize: "0.85rem" }}>Changes</Typography>
                  <Typography sx={{ color: themeConfig.textMain, fontSize: "0.8rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {JSON.stringify(detail.changes, null, 2)}
                  </Typography>
                </Box>
              )}

              <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.75rem", wordBreak: "break-word" }}>
                {detail.user_agent || detail.userAgent || ""}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

