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
  Paper,
  Button,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  MenuItem,
  Tabs,
  Tab,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Divider,
  TablePagination,
} from "@mui/material";
import {
  Add,
  Receipt,
  Logout,
  Search,
  CurrencyRupee,
  Schedule,
  MeetingRoom,
  Warning,
  CheckCircle,
  Phone,
  ContentCopy,
  CreditCard,
  AccountBalance,
  QrCode2,
  Close,
  Print,
  InfoOutlined,
  Fastfood,
  Check,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import StatCard from "@/shared/components/StatCard";
import { formatTime12Hour } from "@/shared/utils/timeUtils";

export default function InHouseFoliosPage({
  bookings = [],
  hotelSettings = {
    checkInTime: "14:00",
    checkOutTime: "12:00",
    timezone: "Asia/Kolkata",
    upiId: "jatinkakadiya234-1@okicici",
  },
  onCheckOut,
  onOpenInvoice,
  onOpenPosCharge,
}) {
  const { themeConfig } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusTab, setActiveStatusTab] = useState("ALL");
  const [balanceFilter, setBalanceFilter] = useState("ALL");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Check-Out Settlement Dialog State
  const [checkoutDialog, setCheckoutDialog] = useState({
    open: false,
    booking: null,
    paymentMethod: "CASH",
    amount: 0,
    transactionId: "",
    paymentReference: "",
  });

  // Folio Details Modal State
  const [detailsModal, setDetailsModal] = useState({
    open: false,
    booking: null,
  });

  const hotelUpi = hotelSettings?.upiId || "jatinkakadiya234-1@okicici";
  const checkOutTimeFormatted = formatTime12Hour(hotelSettings?.checkOutTime || "12:00");
  const checkInTimeFormatted = formatTime12Hour(hotelSettings?.checkInTime || "14:00");
  const timezoneStr = hotelSettings?.timezone || "Asia/Kolkata";
  const todayStr = new Date().toISOString().split("T")[0];

  // Telemetry Calculations
  const inHouseBookings = bookings.filter((b) => b.status === "CHECKED_IN");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "PENDING");
  const checkedOutBookings = bookings.filter((b) => b.status === "CHECKED_OUT");

  const totalGrossLedger = bookings.reduce((sum, b) => {
    const pos = (b.posCharges || []).reduce((pSum, c) => pSum + (c.amount || 0), 0);
    return sum + (b.totalAmount || 0) + pos;
  }, 0);

  const totalPendingDues = bookings.reduce((sum, b) => {
    const pos = (b.posCharges || []).reduce((pSum, c) => pSum + (c.amount || 0), 0);
    const gross = (b.totalAmount || 0) + pos;
    const paid = b.paidAmount || 0;
    return sum + Math.max(0, gross - paid);
  }, 0);

  const todayCheckoutsDueCount = inHouseBookings.filter((b) => {
    const outDate = b.checkOutDate ? String(b.checkOutDate).split("T")[0] : "";
    return outDate && outDate <= todayStr;
  }).length;

  // Filter Bookings List
  const filteredBookings = bookings.filter((b) => {
    // Status Filter
    if (activeStatusTab !== "ALL" && b.status !== activeStatusTab) return false;

    // Balance Filter
    const posChargesTotal = (b.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0);
    const grandTotal = (b.totalAmount || 0) + posChargesTotal;
    const paidTotal = b.paidAmount || 0;
    const dueBalance = Math.max(0, grandTotal - paidTotal);

    if (balanceFilter === "DUES" && dueBalance <= 0) return false;
    if (balanceFilter === "SETTLED" && dueBalance > 0) return false;

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchFolio = (b.bookingNumber || "").toLowerCase().includes(q);
      const matchGuest = (b.guest?.name || b.guest?.fullName || "").toLowerCase().includes(q);
      const matchPhone = (b.guest?.phone || b.guest?.mobileNumber || "").toLowerCase().includes(q);
      const matchRoom = String(b.roomNumber || b.room?.roomNumber || "").toLowerCase().includes(q);
      if (!matchFolio && !matchGuest && !matchPhone && !matchRoom) return false;
    }

    return true;
  });

  const handleOpenCheckout = (booking) => {
    const posChargesTotal = (booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0);
    const grandTotal = (booking.totalAmount || 0) + posChargesTotal;
    const paidTotal = booking.paidAmount || 0;
    const due = Math.max(0, grandTotal - paidTotal);

    setCheckoutDialog({
      open: true,
      booking,
      paymentMethod: due > 0 ? "UPI" : "CASH",
      amount: due,
      transactionId: "",
      paymentReference: "",
    });
  };

  const handleConfirmCheckout = () => {
    if (checkoutDialog.booking && onCheckOut) {
      onCheckOut(checkoutDialog.booking, {
        paymentMethod: checkoutDialog.paymentMethod,
        settlementPaymentAmount: Number(checkoutDialog.amount) || 0,
        transactionId: checkoutDialog.transactionId,
        paymentReference: checkoutDialog.paymentReference,
      });
    }
    setCheckoutDialog({
      open: false,
      booking: null,
      paymentMethod: "CASH",
      amount: 0,
      transactionId: "",
      paymentReference: "",
    });
  };

  const handleCopyUpi = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hotelUpi);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // UPI QR String for settlement
  const upiSettlementAmount = checkoutDialog.amount > 0 ? checkoutDialog.amount : 0;
  const upiString = `upi://pay?pa=${encodeURIComponent(hotelUpi)}&pn=HotelFrontDesk&am=${upiSettlementAmount}&tn=CheckoutSettlement_Folio_${checkoutDialog.booking?.bookingNumber || "Stay"}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(upiString)}`;

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {/* 3D Page Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", mb: 3.5, gap: 2 }}>
        <div>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 0.5 }}>
            <Avatar sx={{ bgcolor: themeConfig.primary, width: 38, height: 38, borderRadius: "12px", boxShadow: `0 4px 12px ${themeConfig.primaryGlow}` }}>
              <Receipt sx={{ color: "#FFFFFF", fontSize: 22 }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.5 }}>
              In-House Guest Folios & Account Ledgers
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
            Real-time active resident stay ledger, room charges, ancillary POS services, and instant checkout settlement.
          </Typography>
        </div>

        <Chip
          icon={<Schedule sx={{ fontSize: 16, color: `${themeConfig.primaryDark} !important` }} />}
          label={`Standard Check-Out: ${checkOutTimeFormatted} (${timezoneStr})`}
          sx={{
            bgcolor: themeConfig.champagne,
            color: themeConfig.primaryDark,
            fontWeight: 800,
            borderRadius: "12px",
            border: `1px solid ${themeConfig.border}`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            py: 2,
            px: 1,
            fontSize: "0.8rem",
          }}
        />
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 1: TELEMETRY METRIC STAT CARDS                                   */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <StatCard
          title="Total Registered Folios"
          value={bookings.length}
          subtitle={`${inHouseBookings.length} In-House • ${checkedOutBookings.length} Checked-Out`}
          icon={<MeetingRoom />}
          color="#0B8EE0"
          badgeText="Folios"
        />

        <StatCard
          title="Total Folio Ledger"
          value={`₹${totalGrossLedger.toLocaleString()}`}
          subtitle="Total stay & ancillary billings"
          icon={<CurrencyRupee />}
          color="#10B981"
          badgeText="Billed"
        />

        <StatCard
          title="Pending Settlement Dues"
          value={`₹${totalPendingDues.toLocaleString()}`}
          subtitle={totalPendingDues > 0 ? "Outstanding balance to collect" : "All active folios settled"}
          icon={<Warning />}
          color={totalPendingDues > 0 ? "#EF4444" : "#10B981"}
          badgeText={totalPendingDues > 0 ? "Dues Active" : "All Clear"}
        />

        <StatCard
          title="Checked-Out / Closed"
          value={checkedOutBookings.length}
          subtitle={`${todayCheckoutsDueCount} due today • Departures`}
          icon={<Schedule />}
          color="#8B5CF6"
          badgeText="Departures"
        />
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 2: FOLIOS SEARCH, FILTER TABS & LIVE LEDGER TABLE                */}
      {/* ========================================================================= */}
      <Paper
        className="card-3d"
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "22px",
          bgcolor: "#FFFFFF",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
        }}
      >
        {/* Controls Bar: Search, Status Tabs & Balance Filter */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
          <Tabs
            value={activeStatusTab}
            onChange={(e, v) => {
              setActiveStatusTab(v);
              setPage(0);
            }}
            sx={{
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 800,
                fontSize: "0.85rem",
                borderRadius: "12px",
                minHeight: 38,
                px: 2,
                mr: 1,
                color: themeConfig.textMuted,
                "&.Mui-selected": {
                  bgcolor: themeConfig.primary,
                  color: "#FFFFFF",
                  boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`,
                },
              },
            }}
          >
            <Tab value="ALL" label={`All Folios (${bookings.length})`} />
            <Tab value="CHECKED_IN" label={`Active In-House (${inHouseBookings.length})`} />
            <Tab value="CONFIRMED" label={`Reserved (${confirmedBookings.length})`} />
            <Tab value="CHECKED_OUT" label={`Checked-Out (${checkedOutBookings.length})`} />
          </Tabs>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={balanceFilter}
                onChange={(e) => {
                  setBalanceFilter(e.target.value);
                  setPage(0);
                }}
                sx={{ borderRadius: "12px", bgcolor: themeConfig.bgMain, fontSize: "0.85rem", fontWeight: 700 }}
              >
                <MenuItem value="ALL">All Balances</MenuItem>
                <MenuItem value="DUES">⚠️ Dues Pending</MenuItem>
                <MenuItem value="SETTLED">✅ Fully Settled</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Search folio #, guest, room #, phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              sx={{ minWidth: { xs: "100%", sm: 260 }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: themeConfig.bgMain } }}
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
          </Box>
        </Box>

        {/* 3D Folios Table */}
        <TableContainer
          sx={{
            borderRadius: "16px",
            border: `1px solid ${themeConfig.border}`,
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "560px",
            "&::-webkit-scrollbar": { height: "7px", width: "7px" },
            "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.02)", borderRadius: "8px" },
            "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "8px" },
            "&::-webkit-scrollbar-thumb:hover": { background: themeConfig.primary },
          }}
        >
          <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ "& th": { bgcolor: themeConfig.champagne, color: themeConfig.textMain, fontWeight: 800, py: 1.5 } }}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Folio #</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Guest Profile</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Allocated Room</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Stay Schedule</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Ledger Breakdown</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Balance Due</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>Front Desk Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} sx={{ py: 6 }}>
                    <EmptyState
                      title="No Folios Found"
                      description={
                        searchQuery
                          ? "No reservation folios match your search query."
                          : activeStatusTab === "CHECKED_IN"
                          ? "No resident guests currently checked in. Use the Check-In Wizard to register guests."
                          : "No folios under this category."
                      }
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((b) => {
                  const guestName = b.guest?.name || b.guest?.fullName || "Walk-In Guest";
                  const guestPhone = b.guest?.phone || b.guest?.mobileNumber || "";
                  const roomNum = b.roomNumber || b.room?.roomNumber || "N/A";
                  const roomType = b.roomType?.name || b.room?.roomType?.name || "Room Stay";
                  const posChargesTotal = (b.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0);
                  const grandTotal = (b.totalAmount || 0) + posChargesTotal;
                  const paidTotal = b.paidAmount || 0;
                  const dueBalance = Math.max(0, grandTotal - paidTotal);
                  const isCheckoutToday = b.checkOutDate && String(b.checkOutDate).split("T")[0] <= todayStr;

                  return (
                    <TableRow key={b._id} hover sx={{ "&:hover": { bgcolor: "rgba(11, 142, 224, 0.03)" } }}>
                      {/* Folio # */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 900,
                            color: themeConfig.primaryDark,
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => setDetailsModal({ open: true, booking: b })}
                        >
                          #{b.bookingNumber}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.7rem" }}>
                          {b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-IN") : "Direct"}
                        </Typography>
                      </TableCell>

                      {/* Guest Details */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <Avatar sx={{ bgcolor: themeConfig.primary, width: 34, height: 34, fontSize: "0.85rem", fontWeight: 800 }}>
                            {guestName.charAt(0).toUpperCase()}
                          </Avatar>
                          <div>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                              {guestName}
                            </Typography>
                            {guestPhone && (
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Phone sx={{ fontSize: 11 }} /> {guestPhone}
                              </Typography>
                            )}
                          </div>
                        </Box>
                      </TableCell>

                      {/* Room Details */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Chip
                          icon={<MeetingRoom sx={{ fontSize: 14, color: `${themeConfig.primaryDark} !important` }} />}
                          label={`Room ${roomNum}`}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            bgcolor: themeConfig.champagne,
                            color: themeConfig.primaryDark,
                            border: `1px solid ${themeConfig.border}`,
                            mb: 0.3,
                          }}
                        />
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", fontSize: "0.72rem" }}>
                          {roomType}
                        </Typography>
                      </TableCell>

                      {/* Stay Duration */}
                      <TableCell sx={{ color: themeConfig.textMuted, fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                        <div><strong>In:</strong> {b.checkInDate || "Today"} ({checkInTimeFormatted})</div>
                        <div>
                          <strong>Out:</strong> {b.checkOutDate || "Tomorrow"} ({checkOutTimeFormatted})
                          {isCheckoutToday && b.status === "CHECKED_IN" && (
                            <Chip
                              label="Due Today"
                              size="small"
                              sx={{
                                ml: 0.8,
                                height: 18,
                                fontSize: "0.65rem",
                                bgcolor: "rgba(239, 68, 68, 0.12)",
                                color: "#DC2626",
                                fontWeight: 800,
                              }}
                            />
                          )}
                        </div>
                      </TableCell>

                      {/* Ledger Breakdown */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                          ₹{grandTotal.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem", display: "block" }}>
                          Room: ₹{(b.totalAmount || 0).toLocaleString()}
                          {posChargesTotal > 0 && ` + POS: ₹${posChargesTotal}`}
                        </Typography>
                        {(b.posCharges || []).length > 0 && (
                          <Chip
                            label={`${b.posCharges.length} POS Items`}
                            size="small"
                            onClick={() => setDetailsModal({ open: true, booking: b })}
                            sx={{
                              height: 18,
                              fontSize: "0.65rem",
                              fontWeight: 800,
                              cursor: "pointer",
                              bgcolor: "rgba(11, 142, 224, 0.1)",
                              color: themeConfig.primary,
                              mt: 0.3,
                            }}
                          />
                        )}
                      </TableCell>

                      {/* Balance Due */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {dueBalance > 0 ? (
                          <Chip
                            label={`₹${dueBalance.toLocaleString()} Due`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(239, 68, 68, 0.12)",
                              color: "#DC2626",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                            }}
                          />
                        ) : (
                          <Chip
                            label="Fully Settled"
                            size="small"
                            sx={{
                              bgcolor: "rgba(16, 185, 129, 0.12)",
                              color: "#059669",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              border: "1px solid rgba(16, 185, 129, 0.3)",
                            }}
                          />
                        )}
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", fontSize: "0.7rem", mt: 0.2 }}>
                          Paid: ₹{paidTotal.toLocaleString()}
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <StatusChip status={b.status} size="small" />
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                          {b.status === "CHECKED_IN" && (
                            <Tooltip title="Post POS Ancillary Charge (In-Room Dining / Laundry / Spa)">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => onOpenPosCharge(b)}
                                className="btn-3d"
                                sx={{
                                  borderColor: themeConfig.border,
                                  bgcolor: "#FFFFFF",
                                  color: themeConfig.textMain,
                                  borderRadius: "10px",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                                }}
                              >
                                + Charge
                              </Button>
                            </Tooltip>
                          )}

                          <Tooltip title="View & Print Official Tax Invoice">
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Receipt />}
                              onClick={() => onOpenInvoice(b)}
                              className="btn-3d"
                              sx={{
                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                color: "#FFFFFF",
                                borderRadius: "10px",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`,
                              }}
                            >
                              Invoice
                            </Button>
                          </Tooltip>

                          {b.status === "CHECKED_IN" && (
                            <Tooltip title="Process Final Check-Out & Mark Room for Cleaning">
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Logout />}
                                color="error"
                                onClick={() => handleOpenCheckout(b)}
                                className="btn-3d"
                                sx={{
                                  borderRadius: "10px",
                                  fontSize: "0.75rem",
                                  fontWeight: 800,
                                  borderColor: "rgba(220, 38, 38, 0.3)",
                                  color: themeConfig.danger,
                                  "&:hover": {
                                    borderColor: themeConfig.danger,
                                    bgcolor: "rgba(220, 38, 38, 0.08)",
                                  },
                                }}
                              >
                                Check-Out
                              </Button>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        {filteredBookings.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredBookings.length}
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
              mt: 1,
            }}
          />
        )}
      </Paper>

      {/* ========================================================================= */}
      {/* CHECK-OUT SETTLEMENT CONFIRMATION MODAL                                  */}
      {/* ========================================================================= */}
      <Dialog
        open={checkoutDialog.open}
        onClose={() => setCheckoutDialog({ open: false, booking: null, paymentMethod: "CASH", amount: 0, transactionId: "", paymentReference: "" })}
        slotProps={{ paper: { sx: { borderRadius: "22px", p: 2, maxWidth: 520, border: `1px solid ${themeConfig.border}` } } }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 900, color: themeConfig.textMain, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Check-Out Settlement (Room {checkoutDialog.booking?.roomNumber || checkoutDialog.booking?.room?.roomNumber})</span>
          <IconButton size="small" onClick={() => setCheckoutDialog({ open: false, booking: null, paymentMethod: "CASH", amount: 0, transactionId: "", paymentReference: "" })}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Guest Summary Card */}
            <Paper sx={{ p: 2, borderRadius: "14px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                    {checkoutDialog.booking?.guest?.name || checkoutDialog.booking?.guest?.fullName || "Resident Guest"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                    Folio #{checkoutDialog.booking?.bookingNumber} &bull; Room {checkoutDialog.booking?.roomNumber || checkoutDialog.booking?.room?.roomNumber}
                  </Typography>
                </div>
                <Chip
                  label={checkoutDialog.amount > 0 ? `₹${checkoutDialog.amount.toLocaleString()} Due` : "₹0 Due (Clear)"}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    bgcolor: checkoutDialog.amount > 0 ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
                    color: checkoutDialog.amount > 0 ? "#DC2626" : "#059669",
                  }}
                />
              </Box>
            </Paper>

            {/* Dues & Payment Section */}
            {checkoutDialog.amount > 0 ? (
              <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "rgba(239, 68, 68, 0.04)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#DC2626", mb: 0.5 }}>
                  Outstanding Balance to Settle: ₹{checkoutDialog.amount.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mb: 2 }}>
                  Collect remaining folio balance before keycard return & check-out release:
                </Typography>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Settlement Payment Mode</InputLabel>
                  <Select
                    value={checkoutDialog.paymentMethod}
                    label="Settlement Payment Mode"
                    onChange={(e) => setCheckoutDialog({ ...checkoutDialog, paymentMethod: e.target.value })}
                  >
                    <MenuItem value="UPI">📱 UPI / QR Code (Instant Scan)</MenuItem>
                    <MenuItem value="CARD">💳 Credit / Debit Card (POS)</MenuItem>
                    <MenuItem value="CASH">💵 Cash at Counter</MenuItem>
                    <MenuItem value="BANK_TRANSFER">🏦 Bank Transfer (NEFT / IMPS)</MenuItem>
                  </Select>
                </FormControl>

                {/* DYNAMIC PAYMENT METHOD UI */}
                {checkoutDialog.paymentMethod === "UPI" && (
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: "#FFFFFF",
                      border: `1.5px solid ${themeConfig.primary}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      boxShadow: "0 4px 12px rgba(11, 142, 224, 0.1)",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase" }}>
                      Scan UPI QR to Settle ₹{checkoutDialog.amount.toLocaleString()}
                    </Typography>

                    <Box
                      component="img"
                      src={qrCodeUrl}
                      alt="UPI Payment QR Code"
                      sx={{
                        width: 140,
                        height: 140,
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                      }}
                    />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: themeConfig.champagne, px: 1.5, py: 0.6, borderRadius: "8px" }}>
                      <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 800, color: themeConfig.primaryDark }}>
                        {hotelUpi}
                      </Typography>
                      <IconButton size="small" onClick={handleCopyUpi} sx={{ p: 0.3 }}>
                        {copiedUpi ? <Check sx={{ fontSize: 14, color: themeConfig.success }} /> : <ContentCopy sx={{ fontSize: 14 }} />}
                      </IconButton>
                    </Box>

                    <TextField
                      size="small"
                      fullWidth
                      label="UPI Ref / Transaction ID (Optional)"
                      placeholder="e.g. 423819283741"
                      value={checkoutDialog.transactionId}
                      onChange={(e) => setCheckoutDialog({ ...checkoutDialog, transactionId: e.target.value })}
                      sx={{ mt: 0.5 }}
                    />
                  </Paper>
                )}

                {checkoutDialog.paymentMethod === "CARD" && (
                  <Paper sx={{ p: 2, borderRadius: "14px", bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, display: "block", mb: 1.5 }}>
                      💳 POS Card Terminal Details:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <TextField
                        size="small"
                        label="Card Last 4 Digits"
                        placeholder="e.g. 4829"
                        value={checkoutDialog.transactionId}
                        onChange={(e) => setCheckoutDialog({ ...checkoutDialog, transactionId: e.target.value })}
                        fullWidth
                      />
                      <TextField
                        size="small"
                        label="POS Auth Code"
                        placeholder="e.g. AUTH-8821"
                        value={checkoutDialog.paymentReference}
                        onChange={(e) => setCheckoutDialog({ ...checkoutDialog, paymentReference: e.target.value })}
                        fullWidth
                      />
                    </Box>
                  </Paper>
                )}

                {checkoutDialog.paymentMethod === "CASH" && (
                  <Paper sx={{ p: 2, borderRadius: "14px", bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                      💵 Cash Counter Settlement
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      Collect physical cash of <strong>₹{checkoutDialog.amount.toLocaleString()}</strong> at the front desk counter and print the cash receipt.
                    </Typography>
                  </Paper>
                )}

                {checkoutDialog.paymentMethod === "BANK_TRANSFER" && (
                  <Paper sx={{ p: 2, borderRadius: "14px", bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, display: "block", mb: 1 }}>
                      🏦 Bank Transfer / NEFT / IMPS Reference:
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      label="Bank NEFT / IMPS UTR Number *"
                      placeholder="e.g. HDFCN24091823901"
                      value={checkoutDialog.transactionId}
                      onChange={(e) => setCheckoutDialog({ ...checkoutDialog, transactionId: e.target.value })}
                    />
                  </Paper>
                )}
              </Box>
            ) : (
              <Paper sx={{ p: 2.5, borderRadius: "16px", bgcolor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CheckCircle sx={{ color: "#059669", fontSize: 28 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#059669" }}>
                      Account Fully Settled (₹0 Balance Due)
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                      Keycard can be returned now. Room will be automatically marked for <strong>Housekeeping Cleaning</strong>.
                    </Typography>
                  </div>
                </Box>
              </Paper>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setCheckoutDialog({ open: false, booking: null, paymentMethod: "CASH", amount: 0, transactionId: "", paymentReference: "" })}
            sx={{ borderRadius: "10px", fontWeight: 700 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmCheckout}
            className="btn-3d"
            sx={{
              background: `linear-gradient(135deg, ${themeConfig.danger} 0%, #B91C1C 100%)`,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "10px",
              px: 3,
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
            }}
          >
            Confirm & Settle Check-Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========================================================================= */}
      {/* DETAILED FOLIO BREAKDOWN MODAL                                           */}
      {/* ========================================================================= */}
      <Dialog
        open={detailsModal.open}
        onClose={() => setDetailsModal({ open: false, booking: null })}
        slotProps={{ paper: { sx: { borderRadius: "22px", p: 2, maxWidth: 600, border: `1px solid ${themeConfig.border}` } } }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 900, color: themeConfig.textMain, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Folio #{detailsModal.booking?.bookingNumber} Ledger Details</span>
          <IconButton size="small" onClick={() => setDetailsModal({ open: false, booking: null })}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {detailsModal.booking && (
            <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <Paper sx={{ p: 2, borderRadius: "14px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                      {detailsModal.booking.guest?.name || detailsModal.booking.guest?.fullName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      Room {detailsModal.booking.roomNumber || detailsModal.booking.room?.roomNumber} &bull; Check-in: {detailsModal.booking.checkInDate} &bull; Check-out: {detailsModal.booking.checkOutDate}
                    </Typography>
                  </div>
                  <StatusChip status={detailsModal.booking.status} size="small" />
                </Box>
              </Paper>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                Itemized Charges & Ancillary Services:
              </Typography>

              <TableContainer sx={{ borderRadius: "12px", border: `1px solid ${themeConfig.border}` }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: themeConfig.champagne }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800 }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Room Accommodation</TableCell>
                      <TableCell><Chip label="STAY" size="small" sx={{ height: 20, fontSize: "0.65rem" }} /></TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>₹{(detailsModal.booking.totalAmount || 0).toLocaleString()}</TableCell>
                    </TableRow>

                    {(detailsModal.booking.posCharges || []).map((c, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{c.item || c.title || "POS Service"}</TableCell>
                        <TableCell><Chip label={c.type || "POS"} size="small" sx={{ height: 20, fontSize: "0.65rem" }} /></TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>₹{(c.amount || 0).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}

                    <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                      <TableCell colSpan={2} sx={{ fontWeight: 900 }}>Total Billed Ledger</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                        ₹{((detailsModal.booking.totalAmount || 0) + (detailsModal.booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0)).toLocaleString()}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: 800, color: themeConfig.textMuted }}>Advance / Paid Amount</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: "#059669" }}>
                        ₹{(detailsModal.booking.paidAmount || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: 900, color: themeConfig.danger }}>Outstanding Balance Due</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 900, color: themeConfig.danger }}>
                        ₹{Math.max(0, ((detailsModal.booking.totalAmount || 0) + (detailsModal.booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0)) - (detailsModal.booking.paidAmount || 0)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDetailsModal({ open: false, booking: null })} sx={{ borderRadius: "10px" }}>
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<Receipt />}
            onClick={() => {
              const b = detailsModal.booking;
              setDetailsModal({ open: false, booking: null });
              if (onOpenInvoice) onOpenInvoice(b);
            }}
            className="btn-3d"
            sx={{
              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "10px",
            }}
          >
            View Tax Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
