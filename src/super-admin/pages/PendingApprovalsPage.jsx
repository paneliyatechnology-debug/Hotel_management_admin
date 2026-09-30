"use client";

import { useState } from "react";
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
  Button,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { VerifiedUser, Block, Business, HourglassEmpty } from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import TrialExtensionRequestsSection from "../components/TrialExtensionRequestsSection";

export default function PendingApprovalsPage({
  hotels = [],
  onOpenActionDialog,
  onRefreshHotels,
}) {
  const { themeConfig } = useAppTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pendingHotels = hotels.filter((h) => h.status === "PENDING");
  const paginatedHotels = pendingHotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: -0.5 }}>
          Pending Approvals &amp; Free Trial Requests
        </Typography>
        <Typography variant="body2" sx={{ color: themeConfig.textMuted, mt: 0.5 }}>
          Review pending hotel onboarding registrations and approve hotel free trial extension requests in real-time.
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newVal) => setActiveTab(newVal)}
          sx={{
            mt: 2,
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
          <Tab icon={<Business fontSize="small" />} iconPosition="start" label={`Onboarding Approvals (${pendingHotels.length})`} />
          <Tab icon={<HourglassEmpty fontSize="small" />} iconPosition="start" label="Free Trial Extension Requests ⚡" />
        </Tabs>
      </Box>

      {activeTab === 1 ? (
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
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>City / Region</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Applicant Email</TableCell>
              <TableCell sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingHotels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 6 }}>
                  <EmptyState title="No Pending Approvals" description="All registered hotel applications have been verified and processed." />
                </TableCell>
              </TableRow>
            ) : (
              paginatedHotels.map((hotel) => (
                <TableRow key={hotel._id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        sx={{
                          background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                          borderRadius: "10px",
                          width: 38,
                          height: 38,
                          boxShadow: `0 2px 8px ${themeConfig.primaryGlow}`,
                        }}
                      >
                        <Business fontSize="small" />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                        {hotel.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{hotel.city || "Mumbai, India"}</TableCell>
                  <TableCell>{hotel.admin?.email || "applicant@hotel.com"}</TableCell>
                  <TableCell>
                    <StatusChip status={hotel.status} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<VerifiedUser />}
                        onClick={() => onOpenActionDialog("ACTIVATE", hotel)}
                        className="btn-3d"
                        sx={{
                          background: `linear-gradient(135deg, ${themeConfig.success} 0%, #15803D 100%)`,
                          color: "#FFFFFF",
                          fontWeight: 800,
                          borderRadius: "10px",
                          boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)",
                        }}
                      >
                        Approve &amp; Activate
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Block />}
                        onClick={() => onOpenActionDialog("DISABLE", hotel)}
                        sx={{
                          fontWeight: 800,
                          borderRadius: "10px",
                          borderColor: "rgba(220, 38, 38, 0.3)",
                          color: themeConfig.danger,
                          "&:hover": {
                            borderColor: themeConfig.danger,
                            bgcolor: "rgba(220, 38, 38, 0.08)",
                          },
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pendingHotels.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={pendingHotels.length}
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

