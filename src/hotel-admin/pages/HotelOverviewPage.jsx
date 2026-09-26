"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  Paper,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Pagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  MeetingRoom,
  TrendingUp,
  Person,
  CheckCircle,
  Refresh,
  CleaningServices,
  Build,
  CurrencyRupee,
  AccountBalanceWallet,
  AccessTime,
  Schedule,
  Hotel as HotelIcon,
  AutoAwesome,
  Search,
  ArrowForward,
  People,
  ReceiptLong,
  LocationOn,
  Security,
  Payments,
  WhatsApp,
  RoomService,
  WarningAmber,
  NotificationsActive,
  Speed,
  Close,
  Send,
  CreditCard,
  Check,
  Bolt,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import StatCard from "@/shared/components/StatCard";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import { formatTime12Hour, getTurnaroundWindow } from "@/shared/utils/timeUtils";
import {
  OccupancyDonutChart,
  RevenueWaveChart,
  DailyTargetGauge,
  HourlyActivityBarChart,
} from "@/hotel-admin/components/DashboardCharts";

export default function HotelOverviewPage({
  user,
  dashboardData,
  rooms = [],
  guests = [],
  bookings = [],
  hotelSettings = { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" },
  selectedFloor = "ALL",
  setSelectedFloor,
  selectedStatus = "ALL",
  setSelectedStatus,
  onRefresh,
  onTabChange,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();
  const [roomSearch, setRoomSearch] = useState("");
  const [nowTime, setNowTime] = useState(Date.now());
  const [guestPage, setGuestPage] = useState(0);
  const [guestRowsPerPage, setGuestRowsPerPage] = useState(5);

  // Room Matrix Pagination (8 rooms per page)
  const [roomPage, setRoomPage] = useState(1);
  const roomsPerPage = 8;

  // Quick Action Modal States
  const [quickChargeModal, setQuickChargeModal] = useState({ open: false, room: null, booking: null });
  const [chargeData, setChargeData] = useState({ chargeType: "FOOD_BEVERAGE", description: "Room Service / Dinner", amount: 350 });
  const [chargeLoading, setChargeLoading] = useState(false);

  const [quickCheckoutModal, setQuickCheckoutModal] = useState({ open: false, room: null, booking: null });
  const [checkoutData, setCheckoutData] = useState({ paymentMethod: "UPI", amountPaid: 0, discount: 0, notes: "" });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });

  // 1-second interval ticker for live housekeeping cleaning countdown & real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to calculate remaining cleaning time & status
  const getCleaningTimerData = (room) => {
    if (room.status !== "CLEANING") return null;
    const startedAt = room.cleaningStartedAt
      ? new Date(room.cleaningStartedAt).getTime()
      : new Date(room.updatedAt || Date.now()).getTime();
    const durationSec = (room.cleaningDurationMinutes || 15) * 60;
    const elapsedSec = Math.floor((nowTime - startedAt) / 1000);
    const remainingSec = Math.max(0, durationSec - elapsedSec);

    const mins = Math.floor(remainingSec / 60);
    const secs = remainingSec % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    const progressPercent = Math.min(100, Math.max(0, Math.round(((durationSec - remainingSec) / durationSec) * 100)));
    const isComplete = remainingSec <= 0;

    return {
      isComplete,
      remainingSec,
      formatted,
      progressPercent,
    };
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (selectedFloor !== "ALL" && r.floor !== Number(selectedFloor)) return false;
      if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;
      if (roomSearch.trim()) {
        const q = roomSearch.toLowerCase();
        const matchNum = r.roomNumber?.toString().toLowerCase().includes(q);
        const matchType = r.roomType?.name?.toLowerCase().includes(q);
        const matchGuest = r.guestName?.toLowerCase().includes(q);
        return matchNum || matchType || matchGuest;
      }
      return true;
    });
  }, [rooms, selectedFloor, selectedStatus, roomSearch]);

  // Reset room page when filters change
  useEffect(() => {
    setRoomPage(1);
  }, [roomSearch, selectedFloor, selectedStatus]);

  // Paginated rooms (8 per page)
  const totalRoomPages = Math.ceil(filteredRooms.length / roomsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice((roomPage - 1) * roomsPerPage, roomPage * roomsPerPage);

  const totalOccupied = rooms.filter((r) => r.status === "OCCUPIED").length;
  const totalAvailable = rooms.filter((r) => r.status === "AVAILABLE").length;
  const totalCleaning = rooms.filter((r) => r.status === "CLEANING").length;
  const totalMaintenance = rooms.filter((r) => r.status === "MAINTENANCE" || r.status === "BLOCKED").length;
  const totalReserved = rooms.filter((r) => r.status === "RESERVED").length;

  const fin = dashboardData?.financials || {};
  const ops = dashboardData?.operationsSummary || {};

  // Real live calculated data from backend & database
  const liveTodayRevNum = Number(fin.todayRevenue ?? (dashboardData?.todayRevenue || 0));
  const liveTodayEarnNum = Number(fin.todayEarnings ?? (dashboardData?.todayEarnings || Math.round(liveTodayRevNum * 0.785)));
  const liveMonthRevNum = Number(fin.monthlyRevenue ?? (dashboardData?.monthlyRevenue || liveTodayRevNum));
  const liveTotalGuests = guests.length || ops.currentGuests || 0;
  const liveInHouseGuests = guests.filter((g) => g.status === "IN-HOUSE").length || ops.currentGuests || 0;

  const todayRevenue = `₹${liveTodayRevNum.toLocaleString("en-IN")}`;
  const todayEarnings = `₹${liveTodayEarnNum.toLocaleString("en-IN")}`;
  const monthlyRevenue = `₹${liveMonthRevNum.toLocaleString("en-IN")}`;
  const dayGrowthPercentage = fin.dayGrowthRate != null ? fin.dayGrowthRate : (liveTodayRevNum > 0 ? 100 : 0);
  const occupancyPercentageNum = rooms.length > 0 ? Math.round((totalOccupied / rooms.length) * 100) : 0;
  const occupancyRate = `${occupancyPercentageNum}%`;

  // Average Daily Rate (ADR) & RevPAR calculation
  const adrNum = totalOccupied > 0 ? Math.round(liveTodayRevNum / totalOccupied) : (rooms[0]?.pricePerNight || 3200);
  const revParNum = rooms.length > 0 ? Math.round(liveTodayRevNum / rooms.length) : 0;

  const inTimeFormatted = formatTime12Hour(hotelSettings?.checkInTime || "14:00");
  const outTimeFormatted = formatTime12Hour(hotelSettings?.checkOutTime || "12:00");
  const timezoneStr = hotelSettings?.timezone || "Asia/Kolkata";
  const turnaroundStr = getTurnaroundWindow(hotelSettings?.checkInTime, hotelSettings?.checkOutTime);

  // Helper for current date
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const parseToIsoDate = (dateVal) => {
    if (!dateVal) return "";
    if (typeof dateVal === "string") {
      if (dateVal.includes("/")) {
        const parts = dateVal.split("/");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = parts[1].padStart(2, "0");
          const year = parts[2];
          return `${year}-${month}-${day}`;
        }
      }
      return dateVal.split("T")[0];
    }
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "";
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    } catch {
      return "";
    }
  };

  // Find active in-house guests for table and quick actions
  const activeRecentGuests = useMemo(() => {
    if (bookings && bookings.length > 0) {
      const matchedBookings = bookings.filter((b) => {
        const inDate = parseToIsoDate(b.checkInDate);
        const outDate = parseToIsoDate(b.checkOutDate);
        const isCheckedIn = b.status === "CHECKED_IN" || b.status === "IN-HOUSE";
        const isTodayIn = inDate === todayStr;
        const isTodayOut = outDate === todayStr;
        const isPendingCheckout = isCheckedIn && (!outDate || outDate >= todayStr);

        if (isCheckedIn || isTodayIn || isTodayOut || isPendingCheckout) {
          return true;
        }
        if (b.status === "CHECKED_OUT" || b.status === "DEPARTED") {
          return isTodayOut || isTodayIn;
        }
        return false;
      });

      if (matchedBookings.length > 0) {
        return matchedBookings.map((b) => {
          const g = typeof b.guest === "object" ? b.guest : {};
          return {
            _id: b._id,
            bookingId: b._id,
            guestId: g?._id || b.guest,
            name: g?.fullName || g?.name || b.guestName || "Resident Guest",
            email: g?.email || b.email || "",
            phone: g?.mobileNumber || g?.phone || b.mobileNumber || "9876543210",
            roomAssigned: b.roomNumber || b.room?.roomNumber || "101",
            checkInDate: inDateFormattedDate(b.checkInDate) || "Today",
            checkOutDate: inDateFormattedDate(b.checkOutDate) || "Tomorrow",
            totalAmount: b.totalAmount || 3500,
            advancePayment: b.advancePayment || 0,
            pendingDues: Math.max(0, (b.totalAmount || 3500) - (b.advancePayment || 0)),
            status: b.status === "CHECKED_IN" ? "IN-HOUSE" : b.status === "CHECKED_OUT" ? "DEPARTED" : b.status || "IN-HOUSE",
          };
        });
      }
    }

    return (guests || []).map((g) => ({
      _id: g._id,
      guestId: g._id,
      name: g.fullName || g.name || "Guest",
      email: g.email || "",
      phone: g.mobileNumber || g.phone || "9876543210",
      roomAssigned: g.roomNumber || g.roomAssigned || "101",
      checkInDate: inDateFormattedDate(g.checkInDate) || "Today",
      checkOutDate: inDateFormattedDate(g.checkOutDate) || "Tomorrow",
      totalAmount: g.totalAmount || 3500,
      advancePayment: g.advancePayment || 0,
      pendingDues: Math.max(0, (g.totalAmount || 3500) - (g.advancePayment || 0)),
      status: g.status || "IN-HOUSE",
    }));
  }, [bookings, guests, todayStr]);

  function inDateFormattedDate(val) {
    if (!val) return "";
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return String(val);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    } catch {
      return String(val);
    }
  }

  // 1-Click WhatsApp Direct Message Dispatcher
  const handleSendWhatsAppInvoice = (guest) => {
    const hotelName = user?.hotel?.name || "Grand Royale Luxury Resort";
    const phoneClean = (guest.phone || "").replace(/[^0-9]/g, "");
    const targetPhone = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;
    const msgText = encodeURIComponent(
      `🏨 *${hotelName}* - Official Guest Folio & Invoice\n\n` +
      `Namaste *${guest.name}*,\n` +
      `Thank you for staying with us in *Room #${guest.roomAssigned}*.\n` +
      `• Check-In: ${guest.checkInDate}\n` +
      `• Total Amount: ₹${guest.totalAmount?.toLocaleString("en-IN")}\n` +
      `• Status: ${guest.status === "IN-HOUSE" ? "Active Stay" : "Settled / Checked-Out"}\n\n` +
      `For any assistance or room service, please contact Front Desk: ${user?.hotel?.phone || "+91 98765 43210"}.\n` +
      `Wish you a pleasant stay!`
    );
    window.open(`https://wa.me/${targetPhone}?text=${msgText}`, "_blank");
  };

  // Quick Action: Instant Room Cleaned Status Update
  const handleMarkRoomCleaned = async (roomId) => {
    try {
      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.UPDATE_ROOM_STATUS(roomId), {
        method: "PUT",
        body: { status: "AVAILABLE" },
      });
      if (res?.success) {
        setNotification({ show: true, message: "Room marked AVAILABLE and ready for check-in!", severity: "success" });
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || "Failed to update room status", severity: "error" });
    }
  };

  // Quick Action: Add Room Service / POS Charge
  const handleAddChargeSubmit = async () => {
    if (!quickChargeModal.booking?._id && !quickChargeModal.room) return;
    setChargeLoading(true);
    try {
      const bookingId = quickChargeModal.booking?._id || bookings.find((b) => String(b.roomNumber) === String(quickChargeModal.room?.roomNumber))?._id;
      if (!bookingId) {
        throw new Error("No active booking folio linked to this room.");
      }
      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.ADD_CHARGE(bookingId), {
        method: "POST",
        body: {
          chargeType: chargeData.chargeType,
          description: chargeData.description,
          amount: Number(chargeData.amount) || 0,
          tax: Math.round((Number(chargeData.amount) || 0) * 0.05),
          paymentStatus: "UNPAID",
        },
      });
      if (res?.success) {
        setNotification({ show: true, message: "Extra charge successfully posted to room folio!", severity: "success" });
        setQuickChargeModal({ open: false, room: null, booking: null });
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || "Failed to post room charge", severity: "error" });
    } finally {
      setChargeLoading(false);
    }
  };

  // Quick Action: Fast Checkout & Settle
  const handleQuickCheckoutSubmit = async () => {
    setCheckoutLoading(true);
    try {
      const bookingId = quickCheckoutModal.booking?._id || bookings.find((b) => String(b.roomNumber) === String(quickCheckoutModal.room?.roomNumber))?._id;
      if (!bookingId) throw new Error("No active booking folio found.");

      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.CHECKOUT(bookingId), {
        method: "POST",
        body: {
          paymentMethod: checkoutData.paymentMethod,
          amountPaid: Number(checkoutData.amountPaid) || 0,
          discount: Number(checkoutData.discount) || 0,
          notes: checkoutData.notes || "Fast checkout via Admin Command Center",
        },
      });

      if (res?.success) {
        setNotification({ show: true, message: "Guest checked out successfully! Room set to CLEANING.", severity: "success" });
        setQuickCheckoutModal({ open: false, room: null, booking: null });
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || "Checkout failed", severity: "error" });
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Greeting according to local time
  const currentHour = new Date(nowTime).getHours();
  const timeGreeting = currentHour < 12 ? "સુપ્રભાત (Good Morning)" : currentHour < 17 ? "શુભ બપોર (Good Afternoon)" : "શુભ સંધ્યા (Good Evening)";
  const liveClockString = new Date(nowTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {/* ========================================================================= */}
      {/* 1. HERO COMMAND RIBBON with LIVE CLOCK & SAAS TELEMETRY                   */}
      {/* ========================================================================= */}
      <Box
        sx={{
          mb: 3,
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 16px 36px -10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}, inset 0 1px 1px rgba(255,255,255,0.4)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
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
                }}
              >
                <HotelIcon fontSize="small" />
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
                {timeGreeting} &bull; Live Operations Center
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5, fontSize: { xs: "1.4rem", sm: "1.8rem" } }}>
              {user?.hotel?.name || "Grand Royale Luxury Resort"}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn sx={{ fontSize: 15 }} />
              {user?.hotel?.city || "Gujarat, India"} &bull; Total Inventory: <strong>{rooms.length || 24} Rooms</strong> &bull; Occupancy: <strong>{occupancyRate}</strong>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
            {/* Live Clock Badge */}
            <Box
              sx={{
                px: 2,
                py: 0.9,
                borderRadius: "14px",
                bgcolor: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box className="live-pulse-3d" />
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#FFFFFF", fontSize: "0.82rem", letterSpacing: 0.5 }}>
                {liveClockString}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={onRefresh}
              className="btn-3d"
              sx={{
                borderRadius: "14px",
                bgcolor: isDarkMode ? "rgba(255,255,255,0.12)" : "#FFFFFF",
                color: isDarkMode ? "#FFFFFF" : (themeConfig.primaryDark || "#0C273B"),
                fontWeight: 800,
                fontSize: "0.82rem",
                px: 2.5,
                py: 1.1,
                border: isDarkMode ? `1px solid ${themeConfig.border}` : "none",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                "&:hover": {
                  bgcolor: isDarkMode ? "rgba(255,255,255,0.2)" : "#F8FAFC",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Sync Live Status
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 2. 🤖 SMART AI OPERATIONAL COPILOT & ANOMALY ADVISORY STRIP               */}
      {/* ========================================================================= */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "18px",
          border: "1.5px solid rgba(245, 158, 11, 0.4)",
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(14, 49, 44, 0.8) 100%)"
            : "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "#F59E0B", color: "#FFFFFF", width: 36, height: 36, borderRadius: "10px" }}>
            <NotificationsActive sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 800, color: isDarkMode ? "#FDE68A" : "#92400E", display: "flex", alignItems: "center", gap: 0.8 }}>
              ⚡ AI Intelligence &bull; Live Hotel Pulse
            </Typography>
            <Typography variant="caption" sx={{ color: isDarkMode ? "#F3F4F6" : "#78350F", fontWeight: 600 }}>
              {totalOccupied > 0
                ? `Hotel has ${totalOccupied} rooms occupied (${occupancyRate}). Recommended ADR: ₹${adrNum} | RevPAR: ₹${revParNum}. Cash Drawer is active.`
                : `All ${rooms.length} rooms are available for walk-in arrivals. 100% clean turn-around ready.`}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onTabChange && onTabChange(1)}
            startIcon={<Bolt />}
            sx={{
              bgcolor: "#F59E0B",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.75rem",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": { bgcolor: "#D97706" },
            }}
          >
            Settle Shift Drawer
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onTabChange && onTabChange(2)}
            sx={{
              borderColor: "rgba(146, 64, 14, 0.4)",
              color: isDarkMode ? "#FDE68A" : "#92400E",
              fontWeight: 800,
              fontSize: "0.75rem",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            + New Check-In
          </Button>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 3. ⚡ UNIVERSAL QUICK ACTION COMMAND DOCK (4 Big Touch Buttons)           */}
      {/* ========================================================================= */}
      <Box
        sx={{
          mb: 3.5,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        <Card
          onClick={() => onTabChange && onTabChange(2)}
          className="card-3d"
          sx={{
            p: 2,
            cursor: "pointer",
            borderRadius: "16px",
            border: `1.5px solid ${themeConfig.primary}`,
            background: isDarkMode ? "rgba(11, 142, 224, 0.1)" : "#F0F9FF",
            transition: "all 0.2s ease",
            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(11, 142, 224, 0.2)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: themeConfig.primary, color: "#FFFFFF", width: 40, height: 40, borderRadius: "12px" }}>
              <Bolt />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                + Fast Check-In
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                Walk-in &amp; KYC Wizard
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          onClick={() => onTabChange && onTabChange(1)}
          className="card-3d"
          sx={{
            p: 2,
            cursor: "pointer",
            borderRadius: "16px",
            border: `1.5px solid ${themeConfig.success}`,
            background: isDarkMode ? "rgba(16, 185, 129, 0.1)" : "#F0FDF4",
            transition: "all 0.2s ease",
            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(16, 185, 129, 0.2)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: themeConfig.success, color: "#FFFFFF", width: 40, height: 40, borderRadius: "12px" }}>
              <Payments />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                Settle Drawer
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                Vault Cash Handover
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          onClick={() => {
            const firstOccupied = rooms.find((r) => r.status === "OCCUPIED");
            if (firstOccupied) {
              setQuickChargeModal({ open: true, room: firstOccupied, booking: null });
            } else {
              setNotification({ show: true, message: "No occupied room currently in house to post charges.", severity: "info" });
            }
          }}
          className="card-3d"
          sx={{
            p: 2,
            cursor: "pointer",
            borderRadius: "16px",
            border: `1.5px solid #8B5CF6`,
            background: isDarkMode ? "rgba(139, 92, 246, 0.1)" : "#FAF5FF",
            transition: "all 0.2s ease",
            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(139, 92, 246, 0.2)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "#8B5CF6", color: "#FFFFFF", width: 40, height: 40, borderRadius: "12px" }}>
              <RoomService />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                + Food / POS
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                Post Room Service
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card
          onClick={() => onTabChange && onTabChange(4)}
          className="card-3d"
          sx={{
            p: 2,
            cursor: "pointer",
            borderRadius: "16px",
            border: `1.5px solid #F59E0B`,
            background: isDarkMode ? "rgba(245, 158, 11, 0.1)" : "#FFFBEB",
            transition: "all 0.2s ease",
            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(245, 158, 11, 0.2)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "#F59E0B", color: "#FFFFFF", width: 40, height: 40, borderRadius: "12px" }}>
              <Speed />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                Manage Rooms
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                Tariffs &amp; Categories
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* ========================================================================= */}
      {/* 4. FINANCIAL & REVENUE TELEMETRY STAT CARDS                               */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, width: 32, height: 32, borderRadius: "8px" }}>
              <CurrencyRupee sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "1.05rem" }}>
              Financial &amp; Revenue Telemetry
            </Typography>
          </Box>
          <Chip
            label="Live Real-time Audit"
            size="small"
            sx={{ fontWeight: 800, fontSize: "0.7rem", borderRadius: "8px", bgcolor: themeConfig.champagne, color: themeConfig.primaryDark }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2.5,
          }}
        >
          <StatCard
            title="Today's Revenue"
            value={todayRevenue}
            subtitle="Live billings today"
            icon={<CurrencyRupee />}
            color="#10B981"
            trend={`${dayGrowthPercentage >= 0 ? "+" : ""}${dayGrowthPercentage}%`}
            trendType={dayGrowthPercentage >= 0 ? "up" : "down"}
            badgeText="Today"
          />

          <StatCard
            title="Today's Earnings"
            value={todayEarnings}
            subtitle="Net estimated margin"
            icon={<TrendingUp />}
            color="#0B8EE0"
            trend="78.5% Margin"
            trendType="up"
            badgeText="Settled"
          />

          <StatCard
            title="Total Guests"
            value={`${liveTotalGuests} Guests`}
            subtitle={`${liveInHouseGuests} Active in-house`}
            icon={<Person />}
            color="#8B5CF6"
            badgeText="In-House"
          />

          <StatCard
            title="Monthly Revenue"
            value={monthlyRevenue}
            subtitle="Current billing cycle"
            icon={<AccountBalanceWallet />}
            color="#F59E0B"
            badgeText="Monthly"
          />
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 4.5 📊 EXECUTIVE VISUAL ANALYTICS & INTELLIGENCE SUITE                    */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar sx={{ bgcolor: "rgba(67, 97, 238, 0.12)", color: themeConfig.primary, width: 32, height: 32, borderRadius: "8px" }}>
              <TrendingUp sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "1.05rem" }}>
              Visual Revenue &amp; Occupancy Analytics
            </Typography>
          </Box>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: "14px !important", color: themeConfig.primary }} />}
            label="Live Realtime Telemetry"
            size="small"
            sx={{ fontWeight: 800, fontSize: "0.7rem", borderRadius: "8px", bgcolor: themeConfig.champagne, color: themeConfig.primaryDark }}
          />
        </Box>

        <Grid container spacing={2.5}>
          {/* 1. Circular Occupancy Donut */}
          <Grid size={{ xs: 12, md: 4 }}>
            <OccupancyDonutChart rooms={rooms} />
          </Grid>

          {/* 2. 7-Day Revenue Curve Wave */}
          <Grid size={{ xs: 12, md: 8 }}>
            <RevenueWaveChart dashboardData={dashboardData} isDarkMode={isDarkMode} />
          </Grid>

          {/* 3. Daily Target Gauge */}
          <Grid size={{ xs: 12, md: 5 }}>
            <DailyTargetGauge
              currentRevenue={liveTodayRevNum || 18500}
              targetRevenue={hotelSettings?.dailyRevenueTarget || 35000}
            />
          </Grid>

          {/* 4. Hourly Reception Traffic Heat Bars */}
          <Grid size={{ xs: 12, md: 7 }}>
            <HourlyActivityBarChart />
          </Grid>
        </Grid>
      </Box>

      {/* ========================================================================= */}
      {/* 5. 🎮 3D INTERACTIVE ROOM COMMAND MATRIX with 1-TAP ACTION TILES         */}
      {/* ========================================================================= */}
      <Card
        className="card-3d"
        sx={{
          borderRadius: "22px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08)",
          background: isDarkMode ? (themeConfig.bgCard || "#0E312C") : "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Filter Bar with Floor & Status Dropdowns */}
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", mb: 2.5, gap: 2 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: -0.3 }}>
                🎮 Interactive Room Command Matrix
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.82rem" }}>
                Touch any room tile to instant check-in, post room service, or fast check-out
              </Typography>
            </div>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Search room #, guest..."
                value={roomSearch}
                onChange={(e) => setRoomSearch(e.target.value)}
                sx={{ minWidth: { xs: "100%", sm: 200 }, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
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

              {/* Floor Dropdown */}
              <TextField
                select
                size="small"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                sx={{ minWidth: 125, "& .MuiOutlinedInput-root": { borderRadius: "12px", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Floors</MenuItem>
                {Array.from(new Set(rooms.map((r) => r.floor || 1)))
                  .sort((a, b) => a - b)
                  .map((fl) => (
                    <MenuItem key={fl} value={String(fl)}>
                      Floor {fl}
                    </MenuItem>
                  ))}
              </TextField>

              {/* Status Dropdown */}
              <TextField
                select
                size="small"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{ minWidth: 155, "& .MuiOutlinedInput-root": { borderRadius: "12px", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Status ({rooms.length})</MenuItem>
                <MenuItem value="AVAILABLE">🟢 Available ({totalAvailable})</MenuItem>
                <MenuItem value="OCCUPIED">🔵 Occupied ({totalOccupied})</MenuItem>
                <MenuItem value="RESERVED">🟡 Reserved ({totalReserved})</MenuItem>
                <MenuItem value="CLEANING">🟣 Cleaning ({totalCleaning})</MenuItem>
                <MenuItem value="MAINTENANCE">🔴 Maintenance ({totalMaintenance})</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* Room Matrix Grid Cards */}
          {filteredRooms.length === 0 ? (
            <Box sx={{ py: 6 }}>
              <EmptyState
                title="No Rooms Found"
                description={rooms.length === 0 ? "No rooms added yet. Go to Room Management to add rooms." : "No rooms match your filter criteria."}
              />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {paginatedRooms.map((room) => {
                  let statusBg = "rgba(16, 185, 129, 0.08)";
                  let statusBorder = "#10B981";
                  let statusGlow = "rgba(16, 185, 129, 0.25)";

                  if (room.status === "OCCUPIED") {
                    statusBg = "rgba(11, 142, 224, 0.08)";
                    statusBorder = "#0B8EE0";
                    statusGlow = "rgba(11, 142, 224, 0.25)";
                  } else if (room.status === "RESERVED") {
                    statusBg = "rgba(245, 158, 11, 0.08)";
                    statusBorder = "#F59E0B";
                    statusGlow = "rgba(245, 158, 11, 0.25)";
                  } else if (room.status === "CLEANING") {
                    statusBg = "rgba(139, 92, 246, 0.08)";
                    statusBorder = "#8B5CF6";
                    statusGlow = "rgba(139, 92, 246, 0.25)";
                  } else if (room.status === "MAINTENANCE" || room.status === "BLOCKED") {
                    statusBg = "rgba(239, 68, 68, 0.08)";
                    statusBorder = "#EF4444";
                    statusGlow = "rgba(239, 68, 68, 0.25)";
                  }

                  const matchedBooking = bookings.find((b) => String(b.roomNumber) === String(room.roomNumber) && (b.status === "CHECKED_IN" || b.status === "IN-HOUSE"));

                  return (
                    <Card
                      key={room._id}
                      className="card-3d"
                      sx={{
                        p: 2,
                        borderRadius: "18px",
                        border: `1.5px solid ${statusBorder}`,
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${themeConfig.bgCard || "#0E312C"} 0%, ${statusBg} 100%)`
                          : `linear-gradient(135deg, #FFFFFF 0%, ${statusBg} 100%)`,
                        boxShadow: `0 4px 14px rgba(0, 0, 0, 0.04), 0 2px 6px ${statusGlow}`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                          transform: "translateY(-4px) scale(1.01)",
                          boxShadow: `0 12px 24px -4px ${statusGlow}`,
                        },
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
                          <Chip
                            label={`Floor ${room.floor || 1}`}
                            size="small"
                            sx={{
                              fontSize: "0.62rem",
                              fontWeight: 800,
                              height: 18,
                              bgcolor: themeConfig.champagne,
                              color: themeConfig.primaryDark,
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 800, fontSize: "0.72rem", color: themeConfig.primary }}>
                            ₹{room.customPricePerNight || room.roomType?.basePrice || room.pricePerNight || 3500}/n
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.5 }}>
                            Room #{room.roomNumber}
                          </Typography>
                          <StatusChip status={room.status} size="small" />
                        </Box>

                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mb: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {room.roomType?.name || "Deluxe Room"}
                        </Typography>

                        {/* Occupied Guest Details */}
                        {room.status === "OCCUPIED" && (
                          <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(11, 142, 224, 0.08)", mb: 1.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primaryDark, display: "block" }}>
                              👤 {room.guestName || matchedBooking?.guestName || "Resident Guest"}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.68rem" }}>
                              Dues: <strong>₹{matchedBooking ? Math.max(0, (matchedBooking.totalAmount || 0) - (matchedBooking.advancePayment || 0)) : 0}</strong>
                            </Typography>
                          </Box>
                        )}

                        {/* Cleaning Countdown Ticker */}
                        {room.status === "CLEANING" && (() => {
                          const timerData = getCleaningTimerData(room);
                          if (!timerData) return null;
                          return (
                            <Box sx={{ mb: 1.5 }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.4 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: "#8B5CF6", fontSize: "0.7rem" }}>
                                  🧹 Cleaning: {timerData.formatted}
                                </Typography>
                                <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.68rem" }}>
                                  {timerData.progressPercent}%
                                </Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={timerData.progressPercent} sx={{ borderRadius: "6px", height: 6, bgcolor: "rgba(139, 92, 246, 0.2)", "& .MuiLinearProgress-bar": { bgcolor: "#8B5CF6" } }} />
                            </Box>
                          );
                        })()}
                      </Box>

                      {/* 1-Tap Quick Action Buttons on Every Room Tile */}
                      <Box sx={{ pt: 1, borderTop: `1px dashed ${themeConfig.border}`, display: "flex", gap: 1, width: "100%" }}>
                        {room.status === "AVAILABLE" && (
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            onClick={() => onTabChange && onTabChange(2)}
                            sx={{
                              bgcolor: "#10B981",
                              color: "#FFFFFF",
                              fontWeight: 800,
                              fontSize: "0.72rem",
                              borderRadius: "8px",
                              py: 0.6,
                              textTransform: "none",
                              "&:hover": { bgcolor: "#059669" },
                            }}
                          >
                            ⚡ + Check-In
                          </Button>
                        )}

                        {room.status === "OCCUPIED" && (
                          <>
                            <Button
                              fullWidth
                              size="small"
                              variant="outlined"
                              onClick={() => setQuickChargeModal({ open: true, room, booking: matchedBooking })}
                              sx={{
                                fontWeight: 800,
                                fontSize: "0.7rem",
                                borderRadius: "8px",
                                py: 0.5,
                                textTransform: "none",
                                borderColor: "#8B5CF6",
                                color: "#8B5CF6",
                              }}
                            >
                              + Food
                            </Button>
                            <Button
                              fullWidth
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setCheckoutData({
                                  paymentMethod: "UPI",
                                  amountPaid: matchedBooking ? Math.max(0, (matchedBooking.totalAmount || 0) - (matchedBooking.advancePayment || 0)) : 0,
                                  discount: 0,
                                  notes: "",
                                });
                                setQuickCheckoutModal({ open: true, room, booking: matchedBooking });
                              }}
                              sx={{
                                bgcolor: "#0B8EE0",
                                color: "#FFFFFF",
                                fontWeight: 800,
                                fontSize: "0.7rem",
                                borderRadius: "8px",
                                py: 0.5,
                                textTransform: "none",
                                "&:hover": { bgcolor: "#0284C7" },
                              }}
                            >
                              Check-Out
                            </Button>
                          </>
                        )}

                        {room.status === "CLEANING" && (
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            onClick={() => handleMarkRoomCleaned(room._id)}
                            sx={{
                              bgcolor: "#8B5CF6",
                              color: "#FFFFFF",
                              fontWeight: 800,
                              fontSize: "0.72rem",
                              borderRadius: "8px",
                              py: 0.6,
                              textTransform: "none",
                              "&:hover": { bgcolor: "#7C3AED" },
                            }}
                          >
                            ✅ Mark Ready
                          </Button>
                        )}

                        {(room.status === "MAINTENANCE" || room.status === "BLOCKED") && (
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            onClick={() => handleMarkRoomCleaned(room._id)}
                            sx={{
                              bgcolor: "#EF4444",
                              color: "#FFFFFF",
                              fontWeight: 800,
                              fontSize: "0.72rem",
                              borderRadius: "8px",
                              py: 0.6,
                              textTransform: "none",
                              "&:hover": { bgcolor: "#DC2626" },
                            }}
                          >
                            🛠️ Mark Fixed
                          </Button>
                        )}
                      </Box>
                    </Card>
                  );
                })}
              </Box>

              {/* Room Matrix 8-per-page Pagination Controls */}
              {filteredRooms.length > roomsPerPage && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 3,
                    pt: 2.5,
                    borderTop: `1px solid ${themeConfig.border}`,
                  }}
                >
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, fontSize: "0.8rem" }}>
                    Showing <strong>{(roomPage - 1) * roomsPerPage + 1}</strong> &ndash; <strong>{Math.min(roomPage * roomsPerPage, filteredRooms.length)}</strong> of <strong>{filteredRooms.length}</strong> Rooms
                  </Typography>

                  <Pagination
                    count={totalRoomPages}
                    page={roomPage}
                    onChange={(e, p) => setRoomPage(p)}
                    color="primary"
                    shape="rounded"
                    size="medium"
                    showFirstButton
                    showLastButton
                    sx={{
                      "& .MuiPaginationItem-root": { fontWeight: 800, borderRadius: "10px" },
                      "& .Mui-selected": { bgcolor: `${themeConfig.primary} !important`, color: "#FFFFFF !important" },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 6. 👥 LIVE IN-HOUSE GUESTS & 1-CLICK WHATSAPP INVOICE DISPATCHER           */}
      {/* ========================================================================= */}
      <Card
        className="card-3d"
        sx={{
          borderRadius: "22px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08)",
          background: isDarkMode ? (themeConfig.bgCard || "#0E312C") : "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Avatar sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, width: 32, height: 32, borderRadius: "8px" }}>
                <People sx={{ fontSize: 18 }} />
              </Avatar>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1.05rem" }}>
                  Active In-House Guests &amp; Direct WhatsApp Folio
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                  Live billing balances, stay timelines, and 1-click WhatsApp tax invoice
                </Typography>
              </div>
            </Box>

            <Button
              size="small"
              endIcon={<ArrowForward fontSize="small" />}
              onClick={() => onTabChange && onTabChange(2)}
              sx={{
                fontWeight: 800,
                fontSize: "0.8rem",
                borderRadius: "10px",
                color: themeConfig.primaryDark,
                "&:hover": { bgcolor: themeConfig.champagne },
              }}
            >
              Guest Directory
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "none",
              overflowX: "auto",
              maxHeight: "420px",
            }}
          >
            <Table size="small" stickyHeader sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Guest Name</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Room</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Stay Dates</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Balance Dues</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: themeConfig.textMain }}>1-Click WhatsApp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeRecentGuests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3, color: themeConfig.textMuted, fontWeight: 700 }}>
                      No active in-house guests currently checked in.
                    </TableCell>
                  </TableRow>
                ) : (
                  activeRecentGuests
                    .slice(guestPage * guestRowsPerPage, guestPage * guestRowsPerPage + guestRowsPerPage)
                    .map((g) => (
                      <TableRow key={g._id || g.name} sx={{ "&:hover": { bgcolor: `${themeConfig.primaryGlow} !important` } }}>
                        <TableCell sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <Avatar sx={{ width: 32, height: 32, fontSize: "0.8rem", fontWeight: 800, bgcolor: themeConfig.primary, color: "#FFFFFF" }}>
                              {(g.name || "G").charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                                {g.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                                {g.phone}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`Room #${g.roomAssigned}`}
                            size="small"
                            sx={{ fontWeight: 800, borderRadius: "6px", bgcolor: themeConfig.champagne, color: themeConfig.primaryDark }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: themeConfig.textMuted, fontSize: "0.82rem" }}>
                          {g.checkInDate} &ndash; {g.checkOutDate}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, color: g.pendingDues > 0 ? "#EF4444" : "#10B981" }}>
                          {g.pendingDues > 0 ? `₹${g.pendingDues.toLocaleString("en-IN")}` : "✓ Paid"}
                        </TableCell>
                        <TableCell>
                          <StatusChip status={g.status} size="small" />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Send Folio & Invoice on WhatsApp">
                            <IconButton
                              size="small"
                              onClick={() => handleSendWhatsAppInvoice(g)}
                              sx={{
                                bgcolor: "rgba(37, 211, 102, 0.15)",
                                color: "#25D366",
                                "&:hover": { bgcolor: "#25D366", color: "#FFFFFF" },
                              }}
                            >
                              <WhatsApp fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Table Pagination */}
          {activeRecentGuests.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={activeRecentGuests.length}
              rowsPerPage={guestRowsPerPage}
              page={guestPage}
              onPageChange={(e, newPage) => setGuestPage(newPage)}
              onRowsPerPageChange={(e) => {
                setGuestRowsPerPage(parseInt(e.target.value, 10));
                setGuestPage(0);
              }}
              sx={{ borderTop: `1px solid ${themeConfig.border}`, mt: 1 }}
            />
          )}
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 7. QUICK ADD ROOM SERVICE / EXTRA CHARGE MODAL                           */}
      {/* ========================================================================= */}
      <Dialog
        open={quickChargeModal.open}
        onClose={() => setQuickChargeModal({ open: false, room: null, booking: null })}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: "20px" } } }}
      >
        <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            🍽️ Post Room Charge
          </Typography>
          <IconButton size="small" onClick={() => setQuickChargeModal({ open: false, room: null, booking: null })}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
            Posting charge to <strong>Room #{quickChargeModal.room?.roomNumber}</strong> ({quickChargeModal.room?.guestName || "Resident Guest"})
          </Typography>

          <TextField
            select
            label="Service Category"
            size="small"
            value={chargeData.chargeType}
            onChange={(e) => setChargeData((prev) => ({ ...prev, chargeType: e.target.value }))}
            fullWidth
          >
            <MenuItem value="FOOD_BEVERAGE">🍽️ Food &amp; Beverage / Dining</MenuItem>
            <MenuItem value="LAUNDRY">🧺 Laundry &amp; Dry Cleaning</MenuItem>
            <MenuItem value="EXTRA_BED">🛏️ Extra Mattress / Bedding</MenuItem>
            <MenuItem value="MINIBAR">🥤 Minibar &amp; Beverages</MenuItem>
            <MenuItem value="DAMAGE">⚠️ Damage / Repair Recovery</MenuItem>
            <MenuItem value="OTHER">🧾 Other Hotel Service</MenuItem>
          </TextField>

          <TextField
            label="Description / Item Details"
            size="small"
            value={chargeData.description}
            onChange={(e) => setChargeData((prev) => ({ ...prev, description: e.target.value }))}
            fullWidth
          />

          <TextField
            label="Amount (₹)"
            type="number"
            size="small"
            value={chargeData.amount}
            onChange={(e) => setChargeData((prev) => ({ ...prev, amount: e.target.value }))}
            fullWidth
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setQuickChargeModal({ open: false, room: null, booking: null })} sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddChargeSubmit} disabled={chargeLoading} sx={{ borderRadius: "10px", fontWeight: 800 }}>
            {chargeLoading ? "Posting..." : "Post to Bill"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========================================================================= */}
      {/* 8. QUICK FAST CHECK-OUT & SETTLEMENT MODAL                                */}
      {/* ========================================================================= */}
      <Dialog
        open={quickCheckoutModal.open}
        onClose={() => setQuickCheckoutModal({ open: false, room: null, booking: null })}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: "20px" } } }}
      >
        <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            🚪 Fast Check-Out
          </Typography>
          <IconButton size="small" onClick={() => setQuickCheckoutModal({ open: false, room: null, booking: null })}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: themeConfig.champagne }}>
            <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
              Settling Room #{quickCheckoutModal.room?.roomNumber}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 900, color: themeConfig.primaryDark }}>
              {quickCheckoutModal.room?.guestName || "Resident Guest"}
            </Typography>
          </Box>

          <TextField
            select
            label="Settlement Payment Mode"
            size="small"
            value={checkoutData.paymentMethod}
            onChange={(e) => setCheckoutData((prev) => ({ ...prev, paymentMethod: e.target.value }))}
            fullWidth
          >
            <MenuItem value="UPI">⚡ UPI / PhonePe / GPay QR</MenuItem>
            <MenuItem value="CASH">💵 Physical Cash</MenuItem>
            <MenuItem value="CARD">💳 Credit / Debit Card</MenuItem>
            <MenuItem value="BANK_TRANSFER">🏦 Net Banking</MenuItem>
          </TextField>

          <TextField
            label="Final Amount Collected (₹)"
            type="number"
            size="small"
            value={checkoutData.amountPaid}
            onChange={(e) => setCheckoutData((prev) => ({ ...prev, amountPaid: e.target.value }))}
            fullWidth
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              },
            }}
          />

          <TextField
            label="Checkout Notes"
            size="small"
            placeholder="Key returned, minibar verified..."
            value={checkoutData.notes}
            onChange={(e) => setCheckoutData((prev) => ({ ...prev, notes: e.target.value }))}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setQuickCheckoutModal({ open: false, room: null, booking: null })} sx={{ fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleQuickCheckoutSubmit}
            disabled={checkoutLoading}
            sx={{ borderRadius: "10px", fontWeight: 800, bgcolor: "#0B8EE0" }}
          >
            {checkoutLoading ? "Checking Out..." : "Complete Check-Out"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
