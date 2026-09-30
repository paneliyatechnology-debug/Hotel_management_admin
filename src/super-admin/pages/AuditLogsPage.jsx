"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Download, Shield, HourglassEmpty } from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import EmptyState from "@/shared/components/EmptyState";
import { downloadAuditLogsPDF } from "@/shared/utils/pdfGenerator";
import TrialExtensionRequestsSection from "../components/TrialExtensionRequestsSection";

export default function AuditLogsPage({ logs = [], onRefreshHotels }) {
  const { themeConfig } = useAppTheme();
  const [secTab, setSecTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedLogs = logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: -0.5 }}>
            Security, Compliance &amp; Requests Portal
          </Typography>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted, mt: 0.5 }}>
            Review free trial extension requests from hotel tenants and inspect immutable system audit logs.
          </Typography>
        </div>

        {secTab === 1 && (
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => downloadAuditLogsPDF(logs)}
            className="btn-3d"
            sx={{
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
              color: "#FFFFFF",
              fontWeight: 800,
              textTransform: "none",
              px: 2.5,
              boxShadow: `0 6px 16px ${themeConfig.primaryGlow}`,
            }}
          >
            Download PDF Audit Report
          </Button>
        )}
      </Box>

      <Tabs
        value={secTab}
        onChange={(e, val) => setSecTab(val)}
        sx={{
          mb: 3,
          borderBottom: `1px solid ${themeConfig.border}`,
          "& .MuiTab-root": {
            fontWeight: 800,
            fontSize: "0.9rem",
            color: themeConfig.textMuted,
            "&.Mui-selected": {
              color: themeConfig.primary,
            },
          },
        }}
      >
        <Tab icon={<HourglassEmpty fontSize="small" />} iconPosition="start" label="Hotel Trial Extension Requests ⚡" />
        <Tab icon={<Shield fontSize="small" />} iconPosition="start" label={`Security & System Audit Logs (${logs.length})`} />
      </Tabs>

      {secTab === 0 ? (
        <TrialExtensionRequestsSection onRefreshHotels={onRefreshHotels} />
      ) : (

      <TableContainer
        component={Paper}
        className="card-3d"
        sx={{
          borderRadius: "20px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: { xs: "520px", md: "calc(100vh - 280px)" },
          maxWidth: "100%",
          "&::-webkit-scrollbar": { height: "8px", width: "8px" },
          "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.02)", borderRadius: "8px" },
          "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "8px" },
          "&::-webkit-scrollbar-thumb:hover": { background: themeConfig.primary },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow sx={{ background: `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)` }}>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Log Event ID</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Action Triggered</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Target Hotel Property</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Actor Email</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>IP Address</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6 }}>
                  <EmptyState
                    title="No Audit Logs Recorded"
                    description="Administrative actions and platform security events will be logged here in real time."
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginatedLogs.map((log) => (
                <TableRow key={log.id || log._id} hover>
                  <TableCell sx={{ fontFamily: "monospace", fontWeight: 700, color: themeConfig.primaryDark }}>
                    {log.id || log._id}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.action}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                        bgcolor: log.action?.includes("ACTIVATED") ? themeConfig.successBg : log.action?.includes("SUSPENDED") ? themeConfig.dangerBg : themeConfig.champagne,
                        color: log.action?.includes("ACTIVATED") ? themeConfig.success : log.action?.includes("SUSPENDED") ? themeConfig.danger : themeConfig.primaryDark,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: themeConfig.textMain }}>{log.hotel || log.hotelName || "N/A"}</TableCell>
                  <TableCell sx={{ color: themeConfig.textMuted }}>{log.user || log.userEmail || "System"}</TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{log.ip || "127.0.0.1"}</TableCell>
                  <TableCell sx={{ color: themeConfig.textMuted, fontSize: "0.85rem" }}>{log.timestamp || log.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {logs.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={logs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              borderTop: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              color: themeConfig.textMain,
              borderRadius: "0 0 20px 20px",
            }}
          />
        )}
      </TableContainer>
      )}
    </Box>
  );
}

