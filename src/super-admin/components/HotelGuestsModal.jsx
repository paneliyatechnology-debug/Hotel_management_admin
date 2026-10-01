"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  TablePagination,
  Button,
} from "@mui/material";
import {
  Close,
  Search,
  People,
  LocationOn,
  Phone,
  Email,
  Badge,
  VerifiedUser,
  MeetingRoom,
  Receipt,
  Refresh,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import LoadingState from "@/shared/components/LoadingState";
import EmptyState from "@/shared/components/EmptyState";

export default function HotelGuestsModal({ open, onClose, hotel }) {
  const { themeConfig, isDarkMode } = useAppTheme();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchGuests = useCallback(
    async (p = page, q = search) => {
      if (!hotel?._id) return;
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(p + 1),
          limit: String(rowsPerPage),
        });
        if (q && q.trim()) {
          queryParams.append("search", q.trim());
        }

        const endpoint = `${API_ENDPOINTS.SUPER_ADMIN.HOTEL_GUESTS(hotel._id)}?${queryParams.toString()}`;
        const res = await apiRequest(endpoint);

        if (res && res.success) {
          setGuests(res.data || []);
          setTotalRecords(res.pagination?.totalRecords || res.data?.length || 0);
        }
      } catch (err) {
        console.error("Failed to load hotel guests:", err);
      } finally {
        setLoading(false);
      }
    },
    [hotel?._id, page, rowsPerPage, search]
  );

  useEffect(() => {
    if (open && hotel?._id) {
      setPage(0);
      setSearch("");
      fetchGuests(0, "");
    }
  }, [open, hotel?._id]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setPage(0);
    fetchGuests(0, val);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchGuests(newPage, search);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
          border: `1.5px solid ${themeConfig.border}`,
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.5)",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              width: 48,
              height: 48,
              borderRadius: "14px",
            }}
          >
            <People fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, leading: 1.2 }}>
              Guest Directory & Master Records
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
              🏨 <strong>{hotel?.name}</strong> • Owner: {hotel?.admin?.name || hotel?.ownerName || "Manager"} • <LocationOn sx={{ fontSize: 13 }} /> {hotel?.city || "India"}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#FFFFFF", "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}>
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, bgcolor: themeConfig.bgMain }}>
        {/* Search & Actions Bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2.5, flexWrap: "wrap" }}>
          <TextField
            size="small"
            placeholder="Search Guest by Name, Mobile, Email, City, or ID Proof..."
            value={search}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              minWidth: 280,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: themeConfig.bgCard || "#FFFFFF",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: themeConfig.textMuted }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={`Total Guests: ${totalRecords}`}
              sx={{
                bgcolor: themeConfig.champagne,
                color: themeConfig.primaryDark,
                fontWeight: 800,
                borderRadius: "10px",
                border: `1px solid ${themeConfig.border}`,
              }}
            />
            <IconButton onClick={() => fetchGuests(page, search)} size="small" sx={{ color: themeConfig.primary }}>
              <Refresh />
            </IconButton>
          </Box>
        </Box>

        {/* Guests Table */}
        {loading ? (
          <LoadingState message="Fetching hotel guest records..." />
        ) : guests.length === 0 ? (
          <Paper sx={{ p: 4, borderRadius: "16px", border: `1px solid ${themeConfig.border}`, textAlign: "center" }}>
            <EmptyState
              title="No Guest Records Found"
              description={search ? `No guests match "${search}" for ${hotel?.name}.` : `No registered guests found in ${hotel?.name}.`}
            />
          </Paper>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "none",
              maxHeight: "440px",
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ "& th": { bgcolor: isDarkMode ? "#092420" : "#F1F5F9", fontWeight: 800, color: themeConfig.textMain } }}>
                  <TableCell>Guest Profile</TableCell>
                  <TableCell>Contact Details</TableCell>
                  <TableCell>City / Location</TableCell>
                  <TableCell>ID Proof Verification</TableCell>
                  <TableCell>Latest Stay & Room</TableCell>
                  <TableCell align="center">Visits & Spent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guests.map((g) => (
                  <TableRow key={g._id} hover sx={{ "&:hover": { bgcolor: `${themeConfig.primaryGlow} !important` } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: themeConfig.primary,
                            color: "#FFFFFF",
                            fontWeight: 800,
                            fontSize: "0.85rem",
                          }}
                        >
                          {g.fullName?.charAt(0).toUpperCase() || "G"}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                            {g.fullName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                            {g.gender || "Male"} • {g.nationality || "Indian"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Phone sx={{ fontSize: 12, color: themeConfig.primary }} /> {g.mobileNumber}
                        </Typography>
                        {g.email && (
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Email sx={{ fontSize: 12 }} /> {g.email}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textMain, fontSize: "0.8rem" }}>
                        {g.city || "N/A"}{g.state ? `, ${g.state}` : ""}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Chip
                          label={`${g.idProof?.idType || "ID"}: ${g.idProof?.idNumber || "N/A"}`}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            bgcolor: isDarkMode ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                            color: themeConfig.textMain,
                            width: "fit-content",
                          }}
                        />
                        <Chip
                          label={g.idProof?.verificationStatus || "VERIFIED"}
                          size="small"
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            bgcolor: g.idProof?.verificationStatus === "VERIFIED" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                            color: g.idProof?.verificationStatus === "VERIFIED" ? "#10B981" : "#D97706",
                            width: "fit-content",
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primary }}>
                          Room: {g.latestRoomNumber || "N/A"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                          Booking #{g.latestBookingNumber || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.3 }}>
                        <Chip
                          label={`${g.totalVisits || 1} Visit(s)`}
                          size="small"
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            bgcolor: themeConfig.champagne,
                            color: themeConfig.primaryDark,
                          }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#10B981" }}>
                          ₹{(g.totalSpent || 0).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
          sx={{ color: themeConfig.textMain, mt: 1 }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: themeConfig.bgCard, borderTop: `1px solid ${themeConfig.border}` }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: "12px", px: 4, bgcolor: themeConfig.primary, fontWeight: 800 }}>
          Close Directory
        </Button>
      </DialogActions>
    </Dialog>
  );
}
