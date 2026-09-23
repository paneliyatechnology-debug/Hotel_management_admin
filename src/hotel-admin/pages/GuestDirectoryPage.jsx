"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Tooltip,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Card,
  CardContent,
  TablePagination,
} from "@mui/material";
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  Phone,
  Description,
  Close,
  Person,
  AutoAwesome,
  Security,
  MeetingRoom,
  EventNote,
  AttachMoney,
  CheckCircle,
  HourglassEmpty,
  BadgeOutlined,
  Email,
  CalendarMonth,
  Hotel,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import { formatTime12Hour } from "@/shared/utils/timeUtils";

export default function GuestDirectoryPage({
  guests = [],
  guestSearch = "",
  setGuestSearch,
  guestFilter = "ALL",
  setGuestFilter,
  guestModal,
  setGuestModal,
  viewGuestModal,
  setViewGuestModal,
  hotelSettings = { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" },
  onSaveGuest,
  onDeleteGuest,
  getInitialGuestForm,
}) {
  const { themeConfig } = useAppTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalInHouse = guests.filter((g) => g.status === "IN-HOUSE").length;
  const totalReserved = guests.filter((g) => g.status === "RESERVED").length;
  const totalCheckedOut = guests.filter((g) => g.status === "CHECKED_OUT" || g.status === "CHECKED-OUT").length;

  const filteredGuests = guests.filter((g) => {
    const q = (guestSearch || "").toLowerCase();
    const matchSearch =
      (g.name || "").toLowerCase().includes(q) ||
      (g.phone || "").includes(q) ||
      (g.email || "").toLowerCase().includes(q) ||
      (g.roomAssigned || "").toString().includes(q) ||
      (g.idNumber || "").toLowerCase().includes(q);

    if (guestFilter === "ALL") return matchSearch;
    return matchSearch && (g.status === guestFilter || (guestFilter === "CHECKED_OUT" && g.status === "CHECKED-OUT"));
  });

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {/* ========================================================================= */}
      {/* 3D MASTER COMMAND RIBBON (Hero 3D Aesthetics with Glow & Stats)          */}
      {/* ========================================================================= */}
      <Box
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 16px 36px -10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}, inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 3D Radial Background Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            right: "-15%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, position: "relative", zIndex: 1 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <Person fontSize="small" />
              </Avatar>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.72rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                }}
              >
                <AutoAwesome sx={{ fontSize: 14 }} />
                Guest Ledger &bull; Govt ID Compliance Archive
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5, fontSize: { xs: "1.4rem", sm: "1.8rem" } }}>
              Guest Master Directory
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5, fontSize: "0.85rem" }}>
              Registered guest profiles, contact numbers, Govt ID compliance documents, and stay history.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setGuestModal({ open: true, mode: "ADD", data: getInitialGuestForm ? getInitialGuestForm() : { name: "", phone: "", email: "", roomAssigned: "", idType: "AADHAAR", idNumber: "", status: "IN-HOUSE", totalAmount: 0 } })}
            className="btn-3d"
            sx={{
              borderRadius: "14px",
              bgcolor: "#FFFFFF",
              color: themeConfig.primaryDark || "#0C273B",
              fontWeight: 800,
              fontSize: "0.82rem",
              px: 2.5,
              py: 1.1,
              boxShadow: "0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 #FFFFFF",
              "&:hover": {
                bgcolor: "#F8FAFC",
                transform: "translateY(-2px)",
              },
            }}
          >
            Register New Guest
          </Button>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 3D SEARCH & SEGMENTED FILTER TOOLBAR                                     */}
      {/* ========================================================================= */}
      <Paper
        className="card-3d"
        sx={{
          p: 2,
          mb: 3.5,
          borderRadius: "18px",
          bgcolor: "#FFFFFF",
          border: `1.5px solid ${themeConfig.border}`,
          boxShadow: "0 8px 24px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search by Guest Name, Phone, Email, Room #, or Govt ID..."
          value={guestSearch}
          onChange={(e) => setGuestSearch(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 260,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: themeConfig.bgMain,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
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

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {[
            { id: "ALL", label: `All Guests (${guests.length})` },
            { id: "IN-HOUSE", label: `In-House (${totalInHouse})` },
            { id: "RESERVED", label: `Reserved (${totalReserved})` },
            { id: "CHECKED_OUT", label: `Checked Out (${totalCheckedOut})` },
          ].map((st) => {
            const isSelected = guestFilter === st.id;
            return (
              <Chip
                key={st.id}
                label={st.label}
                clickable
                onClick={() => setGuestFilter(st.id)}
                sx={{
                  fontWeight: 800,
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  px: 1,
                  bgcolor: isSelected ? themeConfig.primary : themeConfig.champagne,
                  color: isSelected ? "#FFFFFF" : themeConfig.primaryDark,
                  border: `1px solid ${isSelected ? themeConfig.primary : themeConfig.border}`,
                  boxShadow: isSelected ? `0 4px 10px ${themeConfig.primaryGlow}` : "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: themeConfig.primary,
                    color: "#FFFFFF",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* ========================================================================= */}
      {/* 3D GUEST DIRECTORY MASTER TABLE                                          */}
      {/* ========================================================================= */}
      <TableContainer
        component={Paper}
        className="card-3d"
        sx={{
          borderRadius: "20px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: { xs: "520px", md: "calc(100vh - 280px)" },
          mb: 4,
          "&::-webkit-scrollbar": { height: "8px", width: "8px" },
          "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.02)", borderRadius: "8px" },
          "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "8px" },
          "&::-webkit-scrollbar-thumb:hover": { background: themeConfig.primary },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 920 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: themeConfig.champagne }}>
              <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain, py: 1.6 }}>Guest Profile</TableCell>
              <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Contact Phone</TableCell>
              <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Govt ID Proof</TableCell>
              <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Room &amp; Stay</TableCell>
              <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: themeConfig.textMain }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6, textAlign: "center" }}>
                  <EmptyState
                    title="No Guests Found"
                    description={guests.length === 0 ? "No guest records created yet. Click '+ Register New Guest' to add your first guest." : "No guest records match your search criteria."}
                  />
                </TableCell>
              </TableRow>
            ) : (
              filteredGuests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((guest) => (
                <TableRow
                  key={guest._id || guest.name}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: `${themeConfig.primaryGlow} !important`,
                      transform: "scale(1.001)",
                    },
                  }}
                >
                  {/* Profile Photo & Name */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                      <Avatar
                        sx={{
                          background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                          color: "#FFFFFF",
                          fontWeight: 800,
                          width: 42,
                          height: 42,
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        {guest.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                            {guest.name || guest.fullName}
                          </Typography>
                          {guest.totalVisits && guest.totalVisits > 1 && (
                            <Chip
                              label={`VIP • ${guest.totalVisits} Stays`}
                              size="small"
                              sx={{
                                bgcolor: "#FEF3C7",
                                color: "#B45309",
                                fontWeight: 800,
                                height: 20,
                                fontSize: "0.62rem",
                                borderRadius: "6px",
                                border: "1px solid #FCD34D",
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Email sx={{ fontSize: 12, color: themeConfig.primary }} />
                          {guest.email || "No Email Provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Contact Phone */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Phone fontSize="small" sx={{ color: themeConfig.primaryDark, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                        {guest.phone || guest.mobileNumber || "N/A"}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Govt ID Proof with Document Icon */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Security fontSize="small" sx={{ color: themeConfig.primary }} />
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "block" }}>
                          {guest.idType || guest.govtIdType || "Govt ID"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                          {guest.idNumber || guest.govtIdNumber || "Not Provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Room & Stay */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
                      <Chip
                        label={
                          guest.roomAssigned && guest.roomAssigned !== "Not Assigned"
                            ? `Room #${guest.roomAssigned}`
                            : guest.room?.roomNumber
                              ? `Room #${guest.room.roomNumber}`
                              : "No Active Stay"
                        }
                        size="small"
                        sx={{
                          fontWeight: 800,
                          borderRadius: "8px",
                          bgcolor: (guest.roomAssigned && guest.roomAssigned !== "Not Assigned") || guest.room?.roomNumber ? themeConfig.champagne : "#F1F5F9",
                          color: (guest.roomAssigned && guest.roomAssigned !== "Not Assigned") || guest.room?.roomNumber ? themeConfig.primaryDark : themeConfig.textMuted,
                          border: `1px solid ${themeConfig.border}`,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                      {guest.checkInDate && guest.checkInDate !== "N/A"
                        ? `${guest.checkInDate} ➔ ${guest.checkOutDate || "N/A"}`
                        : "No active stay schedule"}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <StatusChip status={guest.status || "REGISTERED"} size="small" />
                  </TableCell>

                  {/* Action Icons: View, Edit, Delete */}
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                      <Tooltip title="Inspect Guest Dossier">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility fontSize="small" />}
                          onClick={() => setViewGuestModal({ open: true, guest })}
                          sx={{
                            borderRadius: "10px",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            borderColor: themeConfig.border,
                            color: themeConfig.primaryDark,
                            "&:hover": {
                              borderColor: themeConfig.primary,
                              bgcolor: themeConfig.champagne,
                            },
                          }}
                        >
                          Dossier
                        </Button>
                      </Tooltip>

                      <Tooltip title="Edit Guest Details">
                        <IconButton
                          size="small"
                          onClick={() => setGuestModal({ open: true, mode: "EDIT", data: { ...guest } })}
                          sx={{
                            color: themeConfig.info,
                            bgcolor: themeConfig.infoBg,
                            borderRadius: "10px",
                            border: `1px solid ${themeConfig.info}30`,
                            "&:hover": { bgcolor: "rgba(51, 104, 160, 0.2)" },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Guest Record">
                        <IconButton
                          size="small"
                          onClick={() => onDeleteGuest(guest)}
                          sx={{
                            color: themeConfig.danger,
                            bgcolor: themeConfig.dangerBg,
                            borderRadius: "10px",
                            border: `1px solid ${themeConfig.danger}30`,
                            "&:hover": { bgcolor: "rgba(220, 38, 38, 0.2)" },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      {filteredGuests.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredGuests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            borderTop: `1px solid ${themeConfig.border}`,
            bgcolor: "#FFFFFF",
            borderRadius: "0 0 20px 20px",
            mb: 4,
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 3D MODAL: ADD / EDIT GUEST RECORD                                        */}
      {/* ========================================================================= */}
      <Dialog
        open={guestModal.open}
        onClose={() => setGuestModal({ ...guestModal, open: false })}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        <form onSubmit={onSaveGuest}>
          <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              {guestModal.mode === "ADD" ? "Register New Hotel Guest" : `Edit Guest: ${guestModal.data?.name}`}
            </Typography>
            <IconButton onClick={() => setGuestModal({ ...guestModal, open: false })} sx={{ borderRadius: "10px" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Full Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  value={guestModal.data?.name || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, name: e.target.value } })}
                  placeholder="e.g. Vikram Malhotra"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Contact Phone Number *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  value={guestModal.data?.phone || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, phone: e.target.value } })}
                  placeholder="+91 98201 44556"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  value={guestModal.data?.email || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, email: e.target.value } })}
                  placeholder="guest@example.com"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Assigned Room #
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={guestModal.data?.roomAssigned || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, roomAssigned: e.target.value } })}
                  placeholder="e.g. 102"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Govt ID Document Type
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={
                    guestModal.data?.idType === "Aadhaar Card" || !guestModal.data?.idType
                      ? "AADHAAR"
                      : guestModal.data?.idType === "Passport"
                        ? "PASSPORT"
                        : guestModal.data?.idType === "Driving License"
                          ? "DRIVING_LICENSE"
                          : guestModal.data?.idType === "Voter ID"
                            ? "VOTER_ID"
                            : guestModal.data?.idType === "PAN Card"
                              ? "PAN"
                              : guestModal.data?.idType
                  }
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, idType: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="AADHAAR">Aadhaar Card (UIDAI)</MenuItem>
                  <MenuItem value="PASSPORT">Passport</MenuItem>
                  <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                  <MenuItem value="VOTER_ID">Voter ID</MenuItem>
                  <MenuItem value="PAN">PAN Card</MenuItem>
                  <MenuItem value="OTHER">Other Govt ID</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Govt ID Document Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={guestModal.data?.idNumber || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, idNumber: e.target.value } })}
                  placeholder="e.g. XXXX-XXXX-8921"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Check-in Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={guestModal.data?.checkInDate || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, checkInDate: e.target.value } })}
                  helperText={`Standard Policy: In at ${formatTime12Hour(hotelSettings.checkInTime)}`}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Check-out Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={guestModal.data?.checkOutDate || ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, checkOutDate: e.target.value } })}
                  helperText={`Standard Policy: Out by ${formatTime12Hour(hotelSettings.checkOutTime)}`}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Guest Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={guestModal.data?.status || "IN-HOUSE"}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, status: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="IN-HOUSE">In-House Active</MenuItem>
                  <MenuItem value="RESERVED">Advance Reserved</MenuItem>
                  <MenuItem value="CHECKED_OUT">Checked Out</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Total Bill Amount (₹)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={guestModal.data?.totalAmount ?? ""}
                  onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, totalAmount: e.target.value } })}
                  placeholder="e.g. 7000"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setGuestModal({ ...guestModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="btn-3d"
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                color: "#FFFFFF",
                fontWeight: 800,
                borderRadius: "12px",
                px: 3,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
              }}
            >
              {guestModal.mode === "ADD" ? "Save Guest Record" : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ========================================================================= */}
      {/* 3D MODAL: VIEW GUEST DOSSIER & COMPLIANCE VERIFICATION                  */}
      {/* ========================================================================= */}
      <Dialog
        open={viewGuestModal.open}
        onClose={() => setViewGuestModal({ open: false, guest: null })}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: 0,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              overflow: "hidden",
            },
          },
        }}
      >
        {viewGuestModal.guest && (
          <Box>
            {/* Dossier Header */}
            <Box
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
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                    color: themeConfig.primaryDark,
                    fontWeight: 900,
                    fontSize: "1.3rem",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  {(viewGuestModal.guest.name || "G").charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                    {viewGuestModal.guest.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
                    Registered Guest Dossier &bull; Folio #{viewGuestModal.guest._id?.slice(-6) || "PMS-001"}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setViewGuestModal({ open: false, guest: null })} sx={{ color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}>
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={2.5}>
                {/* Contact Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card className="card-3d" sx={{ p: 2.2, borderRadius: "16px", border: `1px solid ${themeConfig.border}`, height: "100%" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5, display: "flex", alignItems: "center", gap: 0.8 }}>
                      <Phone fontSize="small" sx={{ color: themeConfig.primary }} /> Guest Contact &amp; Identity
                    </Typography>
                    <Grid container spacing={1.5} sx={{ fontSize: "0.85rem" }}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Phone Number:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{viewGuestModal.guest.phone}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Email Address:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{viewGuestModal.guest.email || "N/A"}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Govt ID Type:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primary }}>{viewGuestModal.guest.idType || viewGuestModal.guest.govtIdType || "Govt ID"}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Govt ID Number:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{viewGuestModal.guest.idNumber || viewGuestModal.guest.govtIdNumber || "Not Provided"}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                {/* Stay & Room Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card className="card-3d" sx={{ p: 2.2, borderRadius: "16px", border: `1px solid ${themeConfig.border}`, height: "100%" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5, display: "flex", alignItems: "center", gap: 0.8 }}>
                      <MeetingRoom fontSize="small" sx={{ color: themeConfig.primary }} /> Room Allocation &amp; Folio
                    </Typography>
                    <Grid container spacing={1.5} sx={{ fontSize: "0.85rem" }}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Assigned Room:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primaryDark }}>
                          {viewGuestModal.guest.roomAssigned && viewGuestModal.guest.roomAssigned !== "Not Assigned"
                            ? `Room #${viewGuestModal.guest.roomAssigned}`
                            : viewGuestModal.guest.room?.roomNumber
                              ? `Room #${viewGuestModal.guest.room.roomNumber}`
                              : "No Active Stay"}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Current Status:</Typography>
                        <Box sx={{ mt: 0.3 }}>
                          <StatusChip status={viewGuestModal.guest.status || "REGISTERED"} size="small" />
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Check-In Timeline:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {viewGuestModal.guest.checkInDate && viewGuestModal.guest.checkInDate !== "N/A"
                            ? viewGuestModal.guest.checkInDate
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Expected Check-Out:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {viewGuestModal.guest.checkOutDate && viewGuestModal.guest.checkOutDate !== "N/A"
                            ? viewGuestModal.guest.checkOutDate
                            : "N/A"}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 0.5 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted }}>Settled Folio Total:</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.primary }}>₹{(viewGuestModal.guest.totalAmount || 0).toLocaleString("en-IN")}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <DialogActions sx={{ p: 2.5, bgcolor: themeConfig.bgMain }}>
              <Button onClick={() => setViewGuestModal({ open: false, guest: null })} variant="contained" className="btn-3d" sx={{ borderRadius: "10px", fontWeight: 700 }}>
                Close Dossier
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
