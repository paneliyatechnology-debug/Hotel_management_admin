"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  TablePagination,
  Pagination,
} from "@mui/material";
import {
  HowToReg,
  CleaningServices,
  Build,
  Add,
  Badge,
  Print,
  Refresh,
  CheckCircle,
  Search,
  ArrowForward,
  People,
  Close,
  EventSeat,
  Schedule,
  AccessTime,
  Hotel as HotelIcon,
  AutoAwesome,
  Security,
  Layers,
  Timer,
  Bolt,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import StatCard from "@/shared/components/StatCard";
import { formatTime12Hour, getTurnaroundWindow } from "@/shared/utils/timeUtils";

export default function AvailableRoomsPage({
  user,
  rooms = [],
  guests = [],
  bookings = [],
  dashboardData,
  hotelSettings = { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" },
  onRefresh,
  onNavigateTab,
  onRoomStatusChange,
}) {
  const { themeConfig } = useAppTheme();

  const [roomSearch, setRoomSearch] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [statusDialog, setStatusDialog] = useState({ open: false, room: null, newStatus: "AVAILABLE" });
  const [nowTime, setNowTime] = useState(Date.now());
  const [guestPage, setGuestPage] = useState(0);
  const [guestRowsPerPage, setGuestRowsPerPage] = useState(5);

  // Room Matrix Pagination State (8 room boxes per page)
  const [roomPage, setRoomPage] = useState(1);
  const roomsPerPage = 8;

  // 1-second interval ticker for live housekeeping cleaning countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to calculate remaining cleaning time & status
  const getCleaningTimerData = (room) => {
    if (room.status !== "CLEANING") return null;
    const startedAt = room.cleaningStartedAt ? new Date(room.cleaningStartedAt).getTime() : new Date(room.updatedAt || Date.now()).getTime();
    const durationSec = (room.cleaningDurationMinutes || 15) * 60;
    const elapsedSec = Math.floor((nowTime - startedAt) / 1000);
    const remainingSec = Math.max(0, durationSec - elapsedSec);

    const mins = Math.floor(remainingSec / 60);
    const secs = remainingSec % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    const isComplete = remainingSec <= 0;

    return {
      isComplete,
      remainingSec,
      formatted,
    };
  };

  // Auto-transition cleaning rooms to AVAILABLE when 15-minute turnaround finishes
  useEffect(() => {
    rooms.forEach((room) => {
      if (room.status === "CLEANING") {
        const timerData = getCleaningTimerData(room);
        if (timerData && timerData.isComplete && onRoomStatusChange) {
          onRoomStatusChange(room, "AVAILABLE");
        }
      }
    });
  }, [nowTime, rooms]);

  // Counts
  const totalOccupied = rooms.filter((r) => r.status === "OCCUPIED").length;
  const totalAvailable = rooms.filter((r) => r.status === "AVAILABLE").length;
  const totalCleaning = rooms.filter((r) => r.status === "CLEANING").length;
  const totalMaintenance = rooms.filter((r) => r.status === "MAINTENANCE" || r.status === "BLOCKED").length;
  const totalReserved = rooms.filter((r) => r.status === "RESERVED").length;
  const inHouseGuestsCount = guests.filter((g) => g.status === "IN-HOUSE" || g.status === "CONFIRMED").length || bookings.length;

  const distinctFloors = Array.from(new Set(rooms.map((r) => r.floor || 1))).sort((a, b) => a - b);

  // Filtered Rooms
  const filteredRooms = rooms.filter((r) => {
    if (selectedFloor !== "ALL" && String(r.floor || 1) !== String(selectedFloor)) return false;
    if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;
    if (roomSearch.trim()) {
      const q = roomSearch.toLowerCase();
      const matchNum = r.roomNumber?.toString().toLowerCase().includes(q);
      const roomTypeObj = typeof r.roomType === "object" ? r.roomType : null;
      const matchType = (roomTypeObj?.name || r.type || "").toLowerCase().includes(q);
      const matchGuest = (r.guestName || "").toLowerCase().includes(q);
      const matchNotes = (r.notes || "").toLowerCase().includes(q);
      return matchNum || matchType || matchGuest || matchNotes;
    }
    return true;
  });

  // Reset room page when filters change
  useEffect(() => {
    setRoomPage(1);
  }, [roomSearch, selectedFloor, selectedStatus]);

  // Paginated rooms (8 per page)
  const totalRoomPages = Math.ceil(filteredRooms.length / roomsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice((roomPage - 1) * roomsPerPage, roomPage * roomsPerPage);

  const inTimeFormatted = formatTime12Hour(hotelSettings?.checkInTime || "14:00");
  const outTimeFormatted = formatTime12Hour(hotelSettings?.checkOutTime || "12:00");
  const timezoneStr = hotelSettings?.timezone || "Asia/Kolkata";
  const turnaroundStr = getTurnaroundWindow(hotelSettings?.checkInTime, hotelSettings?.checkOutTime);

  // Helper to extract YYYY-MM-DD from various date formats
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

  const todayStr = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  })();

  // Filter ONLY today's check-ins, active in-house stays (staying today or checkout pending), and today's departures
  // Exclude historical departed stays from 2 or 3 days ago
  const activeRecentGuests = (() => {
    // 1. If bookings list is available, prioritize live bookings
    if (bookings && bookings.length > 0) {
      const matchedBookings = bookings.filter((b) => {
        const inDate = parseToIsoDate(b.checkInDate);
        const outDate = parseToIsoDate(b.checkOutDate);
        const isCheckedIn = b.status === "CHECKED_IN" || b.status === "IN-HOUSE";
        const isTodayIn = inDate === todayStr;
        const isTodayOut = outDate === todayStr;
        const isPendingCheckout = isCheckedIn && (!outDate || outDate >= todayStr);

        // Include active in-house stays, today's check-ins, or today's departures
        if (isCheckedIn || isTodayIn || isTodayOut || isPendingCheckout) {
          return true;
        }

        // If checked-out / departed, only include if departed TODAY or checked-in TODAY
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
            name: g?.fullName || g?.name || b.guestName || "Resident Guest",
            email: g?.email || b.email || "",
            phone: g?.mobileNumber || g?.phone || b.mobileNumber || "N/A",
            roomAssigned: b.roomNumber || b.room?.roomNumber || "101",
            checkInDate: inDateFormattedDate(b.checkInDate) || "Today",
            status: b.status === "CHECKED_IN" ? "IN-HOUSE" : b.status === "CHECKED_OUT" ? "DEPARTED" : b.status || "IN-HOUSE",
          };
        });
      }
    }

    // 2. Fallback to guests array with the same filter
    return (guests || []).filter((g) => {
      const inDate = parseToIsoDate(g.checkInDate);
      const outDate = parseToIsoDate(g.checkOutDate);
      const isTodayIn = inDate === todayStr;
      const isTodayOut = outDate === todayStr;
      const isInHouse = g.status === "IN-HOUSE" || g.status === "CHECKED_IN" || g.status === "ACTIVE";

      // If in-house, always keep (active stay)
      if (isInHouse) return true;

      // If today check-in or today check-out
      if (isTodayIn || isTodayOut) return true;

      // Exclude departed records from 2 or 3 days ago
      if (g.status === "DEPARTED" || g.status === "CHECKED_OUT") {
        return false;
      }

      // If future checkout
      if (outDate && outDate >= todayStr) return true;

      return false;
    });
  })();

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

  const handleOpenStatusDialog = (room) => {
    setStatusDialog({
      open: true,
      room,
      newStatus: room.status || "AVAILABLE",
    });
  };

  const handleConfirmStatusChange = () => {
    if (statusDialog.room && onRoomStatusChange) {
      onRoomStatusChange(statusDialog.room, statusDialog.newStatus);
    }
    setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" });
  };

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {/* ========================================================================= */}
      {/* 3D MASTER COMMAND RIBBON (Hero 3D Aesthetics with Glow & Timings)         */}
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
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#FFFFFF",
                  width: 32,
                  height: 32,
                  backdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)",
                }}
              >
                <HowToReg sx={{ fontSize: 18 }} />
              </Avatar>
              <Chip
                label="Front Desk Master Operations"
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: 0.5,
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.8, color: "#FFFFFF", lineHeight: 1.2 }}>
              Front Desk & Guest Operations
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5, maxWidth: "600px" }}>
              Express check-in wizard, keycard allocation, regulatory guest ID compliance, and live folio settlements.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => onNavigateTab && onNavigateTab(2)}
              className="btn-3d"
              sx={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #E6EFF8 100%)",
                color: themeConfig.primaryDark,
                fontWeight: 900,
                borderRadius: "14px",
                px: 2.8,
                py: 1.2,
                fontSize: "0.88rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.18), inset 0 1px 0 #FFFFFF",
                border: "1px solid rgba(255,255,255,0.8)",
                "&:hover": {
                  background: "#FFFFFF",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 26px rgba(0,0,0,0.24)",
                },
              }}
            >
              Express Check-In
            </Button>

            <Button
              variant="outlined"
              startIcon={<Badge />}
              onClick={() => onNavigateTab && onNavigateTab(3)}
              sx={{
                borderRadius: "14px",
                fontWeight: 800,
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.4)",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                px: 2,
                py: 1.1,
                fontSize: "0.85rem",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Govt ID Hub
            </Button>

            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={() => onNavigateTab && onNavigateTab(4)}
              sx={{
                borderRadius: "14px",
                fontWeight: 800,
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.4)",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                px: 2,
                py: 1.1,
                fontSize: "0.85rem",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              POS & Invoice
            </Button>

            <IconButton
              onClick={onRefresh}
              sx={{
                color: "#FFFFFF",
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: "12px",
                p: 1.2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <Refresh fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Operational Timings Ribbon */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 3 },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTime sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
              Check-In Opens: <strong>{inTimeFormatted}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Schedule sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
              Check-Out Deadline: <strong>{outTimeFormatted}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CleaningServices sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
              Buffer: <strong>{turnaroundStr}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Security sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
              Timezone: <strong>{timezoneStr}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE TELEMETRY STAT CARDS (Standardized Equal Height)         */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <StatCard
          title="Available Vacant"
          value={totalAvailable}
          subtitle="Ready for guest check-in"
          icon={<CheckCircle />}
          color="#10B981"
          badgeText="Vacant"
        />

        <StatCard
          title="Occupied In-House"
          value={totalOccupied}
          subtitle="Active guest stay"
          icon={<HowToReg />}
          color="#0B8EE0"
          badgeText="In-House"
        />

        <StatCard
          title="Housekeeping Queue"
          value={totalCleaning}
          subtitle="Linen sanitation buffer"
          icon={<CleaningServices />}
          color="#D97706"
          badgeText="Cleaning"
        />

        <StatCard
          title="Maintenance / Blocked"
          value={totalMaintenance}
          subtitle="Out of service repairs"
          icon={<Build />}
          color="#EF4444"
          badgeText={totalMaintenance > 0 ? "Under Fix" : "All Clear"}
        />

        <StatCard
          title="Total In-House Guests"
          value={inHouseGuestsCount}
          subtitle="Active keycard folios"
          icon={<People />}
          color="#8E24AA"
          badgeText="Guests"
        />
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 3: LIVE ROOM STATUS MATRIX (Interactive 3D Visual Grid)           */}
      {/* ========================================================================= */}
      <Card
        className="card-3d"
        sx={{
          borderRadius: "22px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Filter Bar with Floor & Status Dropdowns */}
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", mb: 2.5, gap: 2 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: -0.3 }}>
                Live Room Status Matrix
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.82rem" }}>
                Click any room to quickly switch housekeeping status or allocate guests.
              </Typography>
            </div>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Search room #, guest..."
                value={roomSearch}
                onChange={(e) => setRoomSearch(e.target.value)}
                sx={{ minWidth: { xs: "100%", sm: 200 }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF" } }}
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
                sx={{ minWidth: 125, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Floors</MenuItem>
                {distinctFloors.map((fl) => (
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
                sx={{ minWidth: 155, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontWeight: 700 } }}
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
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
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

                const roomTypeObj = typeof room.roomType === "object" ? room.roomType : null;
                const tariff = room.customPricePerNight || roomTypeObj?.basePrice || room.basePrice || 3500;

                return (
                  <Card
                    key={room._id || room.roomNumber}
                    className="card-3d"
                    onClick={() => handleOpenStatusDialog(room)}
                    sx={{
                      p: 2,
                      borderRadius: "18px",
                      border: `1.5px solid ${statusBorder}`,
                      background: `linear-gradient(135deg, #FFFFFF 0%, ${statusBg} 100%)`,
                      boxShadow: `0 4px 14px rgba(12, 39, 59, 0.04), 0 2px 6px ${statusGlow}, inset 0 1px 1px #FFFFFF`,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: `0 12px 24px -4px ${statusGlow}, 0 4px 10px rgba(0,0,0,0.05)`,
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8, width: "100%" }}>
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
                        <Typography variant="caption" sx={{ fontWeight: 800, fontSize: "0.68rem", color: themeConfig.primary }}>
                          ₹{tariff}/n
                        </Typography>
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mb: 0.2, letterSpacing: -0.5 }}>
                        #{room.roomNumber}
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mb: 1.2, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: "0.72rem" }}>
                        {roomTypeObj?.name || room.type || "Deluxe Suite"}
                      </Typography>
                    </Box>

                    <Box sx={{ width: "100%" }}>
                      <StatusChip status={room.status} size="small" />

                      {/* Live 15-Minute Housekeeping Cleaning Timer */}
                      {room.status === "CLEANING" && (() => {
                        const timerData = getCleaningTimerData(room);
                        if (!timerData) return null;
                        return (
                          <Box sx={{ mt: 0.8, width: "100%" }}>
                            <Chip
                              icon={<CleaningServices sx={{ fontSize: 13, color: "#8B5CF6 !important" }} />}
                              label={`Cleaning: ${timerData.formatted}`}
                              size="small"
                              sx={{
                                bgcolor: "rgba(139, 92, 246, 0.15)",
                                color: "#6D28D9",
                                fontWeight: 800,
                                fontSize: "0.68rem",
                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                width: "100%",
                                mb: 0.4,
                              }}
                            />
                            <Button
                              size="small"
                              variant="text"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onRoomStatusChange) onRoomStatusChange(room, "AVAILABLE");
                              }}
                              sx={{
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                color: themeConfig.success,
                                p: 0,
                                minHeight: 18,
                                textTransform: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              ⚡ Mark Ready Clean
                            </Button>
                          </Box>
                        );
                      })()}

                      {room.guestName && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: themeConfig.textMain,
                            fontWeight: 800,
                            mt: 0.8,
                            display: "block",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            fontSize: "0.72rem",
                            bgcolor: "rgba(255,255,255,0.7)",
                            borderRadius: "6px",
                            py: 0.3,
                          }}
                        >
                          👤 {room.guestName}
                        </Typography>
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
                  Showing <strong>{(roomPage - 1) * roomsPerPage + 1}</strong> &ndash; <strong>{Math.min(roomPage * roomsPerPage, filteredRooms.length)}</strong> of <strong>{filteredRooms.length}</strong> Rooms (8 per page)
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
                    "& .MuiPaginationItem-root": {
                      fontWeight: 800,
                      borderRadius: "10px",
                    },
                    "& .Mui-selected": {
                      bgcolor: `${themeConfig.primary} !important`,
                      color: "#FFFFFF !important",
                      boxShadow: `0 4px 10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}`,
                    },
                  }}
                />
              </Box>
            )}
          </>
          )}
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* SECTION 4: RECENT IN-HOUSE GUESTS & ARRIVALS (3D Table View)             */}
      {/* ========================================================================= */}
      <Card
        className="card-3d"
        sx={{
          borderRadius: "22px",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 10px 30px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Avatar
                sx={{
                  bgcolor: themeConfig.champagne,
                  color: themeConfig.primaryDark,
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                }}
              >
                <People sx={{ fontSize: 18 }} />
              </Avatar>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1.05rem" }}>
                  Recent Front Desk Check-Ins & In-House Folios
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                  Live guest registry, allocated keycards & folio settlements
                </Typography>
              </div>
            </Box>

            <Button
              size="small"
              endIcon={<ArrowForward fontSize="small" />}
              onClick={() => onNavigateTab && onNavigateTab(1)}
              sx={{
                fontWeight: 800,
                fontSize: "0.8rem",
                borderRadius: "10px",
                color: themeConfig.primaryDark,
                "&:hover": { bgcolor: themeConfig.champagne },
              }}
            >
              View In-House Folios
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "none",
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: "420px",
              "&::-webkit-scrollbar": { height: "7px", width: "7px" },
              "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.02)", borderRadius: "8px" },
              "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "8px" },
              "&::-webkit-scrollbar-thumb:hover": { background: themeConfig.primary },
            }}
          >
            <Table size="small" stickyHeader sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain, py: 1.2 }}>Guest Name</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Assigned Room</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Contact / Email</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Check-In Date</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeRecentGuests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3, color: themeConfig.textMuted, fontWeight: 700 }}>
                      No active check-ins or in-house guest folios for today.
                    </TableCell>
                  </TableRow>
                ) : (
                  activeRecentGuests
                    .slice(guestPage * guestRowsPerPage, guestPage * guestRowsPerPage + guestRowsPerPage)
                    .map((g) => (
                    <TableRow key={g._id || g.name} sx={{ "&:hover": { bgcolor: `${themeConfig.primaryGlow} !important` } }}>
                      <TableCell sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: "0.8rem",
                              fontWeight: 800,
                              bgcolor: themeConfig.primary,
                              color: "#FFFFFF",
                            }}
                          >
                            {(g.name || g.fullName || "G").charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                              {g.name || g.fullName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                              {g.email || "No email on file"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`Room #${g.roomAssigned || g.roomNumber || "101"}`}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            borderRadius: "8px",
                            bgcolor: themeConfig.champagne,
                            color: themeConfig.primaryDark,
                            border: `1px solid ${themeConfig.border}`,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: themeConfig.textMuted }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                          {g.phone || g.mobileNumber}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: themeConfig.textMuted }}>
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                          {g.checkInDate || "Today"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={g.status || "IN-HOUSE"} size="small" />
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
              sx={{
                borderTop: `1px solid ${themeConfig.border}`,
                bgcolor: "#FFFFFF",
                mt: 1,
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 3D DIALOG: QUICK ROOM STATUS CONTROL                                      */}
      {/* ========================================================================= */}
      <Dialog
        open={statusDialog.open}
        onClose={() => setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" })}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
            Room #{statusDialog.room?.roomNumber} Status
          </Typography>
          <IconButton onClick={() => setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" })} sx={{ borderRadius: "10px" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
              Update housekeeping or operational availability status for this room:
            </Typography>

            <TextField
              select
              fullWidth
              size="small"
              value={statusDialog.newStatus}
              onChange={(e) => setStatusDialog({ ...statusDialog, newStatus: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", fontWeight: 700 } }}
            >
              <MenuItem value="AVAILABLE">🟢 AVAILABLE (Clean & Ready)</MenuItem>
              <MenuItem value="CLEANING">🟣 CLEANING (Housekeeping in Progress)</MenuItem>
              <MenuItem value="MAINTENANCE">🔴 MAINTENANCE (Out of Service)</MenuItem>
              <MenuItem value="BLOCKED">⚪ BLOCKED (Locked by Admin)</MenuItem>
              <MenuItem value="OCCUPIED">🔵 OCCUPIED (In-House Guest)</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className="btn-3d"
            onClick={handleConfirmStatusChange}
            sx={{
              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "10px",
              px: 3,
              boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`,
            }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
