"use client";

import { useState, useEffect, useMemo } from "react";
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
  Badge,
  Refresh,
  CheckCircle,
  Search,
  ArrowForward,
  ArrowBack,
  People,
  Close,
  Schedule,
  AccessTime,
  Security,
  Bolt,
  Delete,
  MeetingRoom,
  KingBed,
  WarningAmber,
  Visibility,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import StatCard from "@/shared/components/StatCard";
import { formatTime12Hour, getTurnaroundWindow } from "@/shared/utils/timeUtils";

export default function AvailableRoomsPage({
  user,
  rooms = [],
  roomTypes = [],
  guests = [],
  bookings = [],
  dashboardData,
  hotelSettings = { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" },
  onRefresh,
  onNavigateTab,
  onRoomStatusChange,
  onSelectRoomForCheckIn,
  onDeleteRoom,
}) {
  const { themeConfig } = useAppTheme();

  // Navigation / View State
  // selectedCategory: null => Show Category Cards Overview (Default)
  // selectedCategory: "ALL" or categoryId => Show Rooms List of that Category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [roomSearch, setRoomSearch] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modals
  const [statusDialog, setStatusDialog] = useState({ open: false, room: null, newStatus: "AVAILABLE" });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, room: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ticker for Live Housekeeping Cleaning Countdown
  const [nowTime, setNowTime] = useState(Date.now());
  const [guestPage, setGuestPage] = useState(0);
  const [guestRowsPerPage, setGuestRowsPerPage] = useState(5);

  // Room Matrix Pagination (8 room cards per page)
  const [roomPage, setRoomPage] = useState(1);
  const roomsPerPage = 8;

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

  // Overall Global Counts
  const totalOccupied = rooms.filter((r) => r.status === "OCCUPIED").length;
  const totalAvailable = rooms.filter((r) => r.status === "AVAILABLE").length;
  const totalCleaning = rooms.filter((r) => r.status === "CLEANING").length;
  const totalMaintenance = rooms.filter((r) => r.status === "MAINTENANCE" || r.status === "BLOCKED").length;
  const inHouseGuestsCount = guests.filter((g) => g.status === "IN-HOUSE" || g.status === "CONFIRMED").length || bookings.length;

  const distinctFloors = Array.from(new Set(rooms.map((r) => r.floor || 1))).sort((a, b) => a - b);

  // Grouped Categories with Live Counts
  const categoryStats = useMemo(() => {
    const catMap = new Map();

    // 1. Add all configured roomTypes
    roomTypes.forEach((rt) => {
      catMap.set(rt._id, {
        _id: rt._id,
        name: rt.name,
        description: rt.description || "",
        basePrice: rt.basePrice || 3000,
        bedCount: rt.bedCount || 1,
        bedType: rt.bedType || "1 King Bed",
        capacity: rt.capacity || { adults: 2, children: 1 },
        amenities: rt.amenities || [],
        totalRooms: 0,
        available: 0,
        occupied: 0,
        cleaning: 0,
        maintenance: 0,
        reserved: 0,
        rooms: [],
      });
    });

    // 2. Count rooms into each category
    rooms.forEach((r) => {
      const rtObj = typeof r.roomType === "object" ? r.roomType : null;
      const rtId = rtObj?._id || r.roomType || "UNCATEGORIZED";
      const rtName = rtObj?.name || r.type || "Standard Room";

      if (!catMap.has(rtId)) {
        catMap.set(rtId, {
          _id: rtId,
          name: rtName,
          description: "",
          basePrice: r.customPricePerNight || rtObj?.basePrice || r.basePrice || 3000,
          bedCount: r.bedCount || 1,
          bedType: r.bedType || "1 King Bed",
          capacity: { adults: r.seatingCapacity || 2, children: 1 },
          amenities: r.amenities || [],
          totalRooms: 0,
          available: 0,
          occupied: 0,
          cleaning: 0,
          maintenance: 0,
          reserved: 0,
          rooms: [],
        });
      }

      const item = catMap.get(rtId);
      item.totalRooms += 1;
      item.rooms.push(r);

      if (r.status === "AVAILABLE") item.available += 1;
      else if (r.status === "OCCUPIED") item.occupied += 1;
      else if (r.status === "CLEANING") item.cleaning += 1;
      else if (r.status === "RESERVED") item.reserved += 1;
      else if (r.status === "MAINTENANCE" || r.status === "BLOCKED") item.maintenance += 1;
    });

    return Array.from(catMap.values());
  }, [rooms, roomTypes]);

  // Filtered Rooms for Category Drill-down View
  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const rtObj = typeof r.roomType === "object" ? r.roomType : null;
      const rtId = rtObj?._id || r.roomType;

      // Filter by selected category (if not "ALL")
      if (selectedCategory && selectedCategory !== "ALL") {
        if (rtId !== selectedCategory) return false;
      }

      // Filter by floor
      if (selectedFloor !== "ALL" && String(r.floor || 1) !== String(selectedFloor)) return false;

      // Filter by status
      if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;

      // Filter by search query
      if (roomSearch.trim()) {
        const q = roomSearch.toLowerCase();
        const matchNum = r.roomNumber?.toString().toLowerCase().includes(q);
        const matchType = (rtObj?.name || r.type || "").toLowerCase().includes(q);
        const matchGuest = (r.guestName || "").toLowerCase().includes(q);
        const matchNotes = (r.notes || "").toLowerCase().includes(q);
        return matchNum || matchType || matchGuest || matchNotes;
      }

      return true;
    });
  }, [rooms, selectedCategory, selectedFloor, selectedStatus, roomSearch]);

  // Reset pagination when filter changes
  useEffect(() => {
    setRoomPage(1);
  }, [selectedCategory, roomSearch, selectedFloor, selectedStatus]);

  const totalRoomPages = Math.ceil(filteredRooms.length / roomsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice((roomPage - 1) * roomsPerPage, roomPage * roomsPerPage);

  const inTimeFormatted = formatTime12Hour(hotelSettings?.checkInTime || "14:00");
  const outTimeFormatted = formatTime12Hour(hotelSettings?.checkOutTime || "12:00");
  const timezoneStr = hotelSettings?.timezone || "Asia/Kolkata";
  const turnaroundStr = getTurnaroundWindow(hotelSettings?.checkInTime, hotelSettings?.checkOutTime);

  // Parse ISO Date helper
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

  // Filter ONLY active recent guests & stays for today
  const activeRecentGuests = (() => {
    if (bookings && bookings.length > 0) {
      const matchedBookings = bookings.filter((b) => {
        const inDate = parseToIsoDate(b.checkInDate);
        const outDate = parseToIsoDate(b.checkOutDate);
        const isCheckedIn = b.status === "CHECKED_IN" || b.status === "IN-HOUSE";
        const isTodayIn = inDate === todayStr;
        const isTodayOut = outDate === todayStr;
        const isPendingCheckout = isCheckedIn && (!outDate || outDate >= todayStr);

        if (isCheckedIn || isTodayIn || isTodayOut || isPendingCheckout) return true;
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

    return (guests || []).filter((g) => {
      const inDate = parseToIsoDate(g.checkInDate);
      const outDate = parseToIsoDate(g.checkOutDate);
      const isTodayIn = inDate === todayStr;
      const isTodayOut = outDate === todayStr;
      const isInHouse = g.status === "IN-HOUSE" || g.status === "CHECKED_IN" || g.status === "ACTIVE";

      if (isInHouse) return true;
      if (isTodayIn || isTodayOut) return true;
      if (g.status === "DEPARTED" || g.status === "CHECKED_OUT") return false;
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

  const handleDeleteRoomClick = (room, e) => {
    e?.stopPropagation();
    if (room.status !== "AVAILABLE") {
      alert(`⚠️ Cannot delete Room ${room.roomNumber} because it is currently '${room.status}'. Only 'AVAILABLE' rooms can be deleted.`);
      return;
    }
    setDeleteConfirmDialog({ open: true, room });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmDialog.room) return;
    setIsSubmitting(true);
    try {
      if (onDeleteRoom) {
        await onDeleteRoom(deleteConfirmDialog.room);
      }
      setDeleteConfirmDialog({ open: false, room: null });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Currently selected category object (if drilled down)
  const currentCategoryObj = selectedCategory && selectedCategory !== "ALL"
    ? categoryStats.find((c) => c._id === selectedCategory)
    : null;

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
              Front Desk & Room Inventory
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5, maxWidth: "600px" }}>
              Category-wise room inventory, live availability tracker, and 1-click 5-step express check-in.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<Bolt />}
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
          subtitle="Ready for 5-step check-in"
          icon={<CheckCircle />}
          color="#10B981"
          badgeText="Vacant"
        />

        <StatCard
          title="Occupied / Booked"
          value={totalOccupied}
          subtitle="Active guest stay"
          icon={<HowToReg />}
          color="#0B8EE0"
          badgeText="In-House"
        />

        <StatCard
          title="Housekeeping Queue"
          value={totalCleaning}
          subtitle="Sanitation in progress"
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
      {/* SECTION 3: CATEGORY OVERVIEW LIST OR CATEGORY ROOMS DRILLDOWN            */}
      {/* ========================================================================= */}
      {selectedCategory === null ? (
        /* ----------------------------------------------------------------------- */
        /* VIEW A: CATEGORY CARDS LIST (Default Home View Requested by User)       */
        /* ----------------------------------------------------------------------- */
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
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
              <div>
                <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.5 }}>
                  🏨 Room Categories & Live Inventory
                </Typography>
                <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.85rem", mt: 0.3 }}>
                  Click any Category to view its rooms, check live vacant/booked counts, or allocate rooms for check-in.
                </Typography>
              </div>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  onClick={() => setSelectedCategory("ALL")}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    borderColor: themeConfig.border,
                    color: themeConfig.textMain,
                  }}
                >
                  View All Rooms ({rooms.length})
                </Button>
              </Box>
            </Box>

            {categoryStats.length === 0 ? (
              <Box sx={{ py: 6 }}>
                <EmptyState
                  title="No Room Categories Found"
                  description="No rooms or categories configured yet in the hotel inventory."
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {categoryStats.map((cat) => {
                  const isAllBooked = cat.available === 0 && cat.totalRooms > 0;
                  const hasAvailable = cat.available > 0;

                  return (
                    <Card
                      key={cat._id}
                      className="card-3d"
                      onClick={() => setSelectedCategory(cat._id)}
                      sx={{
                        p: 3,
                        borderRadius: "20px",
                        border: `2px solid ${hasAvailable ? themeConfig.primaryGlow || "#0B8EE033" : themeConfig.border}`,
                        background: hasAvailable
                          ? "linear-gradient(135deg, #FFFFFF 0%, #F4F9FD 100%)"
                          : "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
                        boxShadow: "0 8px 24px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          borderColor: themeConfig.primary,
                          boxShadow: `0 16px 32px -4px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.25)"}`,
                        },
                      }}
                    >
                      <div>
                        {/* Header: Category Name & Price */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                          <div>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1.2 }}>
                              {cat.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                              <Chip
                                icon={<KingBed sx={{ fontSize: 14, color: `${themeConfig.primaryDark} !important` }} />}
                                label={`${cat.bedCount} Bed (${cat.bedType})`}
                                size="small"
                                sx={{
                                  bgcolor: themeConfig.champagne,
                                  color: themeConfig.primaryDark,
                                  fontWeight: 800,
                                  fontSize: "0.68rem",
                                  height: 22,
                                }}
                              />
                            </Box>
                          </div>

                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.primary, lineHeight: 1 }}>
                              ₹{cat.basePrice?.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>
                              / night
                            </Typography>
                          </Box>
                        </Box>

                        {/* Telemetry Counts Grid */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 1.5,
                            my: 2,
                            p: 1.5,
                            borderRadius: "14px",
                            bgcolor: "rgba(0,0,0,0.02)",
                            border: `1px solid ${themeConfig.border}`,
                          }}
                        >
                          {/* Available Count */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: "rgba(16, 185, 129, 0.15)", color: "#10B981", width: 28, height: 28 }}>
                              <CheckCircle sx={{ fontSize: 16 }} />
                            </Avatar>
                            <div>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, display: "block", fontSize: "0.65rem", textTransform: "uppercase" }}>
                                Available
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: "#10B981" }}>
                                {cat.available} Rooms
                              </Typography>
                            </div>
                          </Box>

                          {/* Booked / Occupied Count */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: "rgba(11, 142, 224, 0.15)", color: "#0B8EE0", width: 28, height: 28 }}>
                              <HowToReg sx={{ fontSize: 16 }} />
                            </Avatar>
                            <div>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, display: "block", fontSize: "0.65rem", textTransform: "uppercase" }}>
                                Booked
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: "#0B8EE0" }}>
                                {cat.occupied + cat.reserved} Rooms
                              </Typography>
                            </div>
                          </Box>

                          {/* Cleaning / Housekeeping */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: "rgba(217, 119, 6, 0.15)", color: "#D97706", width: 28, height: 28 }}>
                              <CleaningServices sx={{ fontSize: 16 }} />
                            </Avatar>
                            <div>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, display: "block", fontSize: "0.65rem", textTransform: "uppercase" }}>
                                Cleaning
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: "#D97706" }}>
                                {cat.cleaning} Rooms
                              </Typography>
                            </div>
                          </Box>

                          {/* Total Rooms */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, width: 28, height: 28 }}>
                              <MeetingRoom sx={{ fontSize: 16 }} />
                            </Avatar>
                            <div>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, display: "block", fontSize: "0.65rem", textTransform: "uppercase" }}>
                                Total
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                                {cat.totalRooms} Rooms
                              </Typography>
                            </div>
                          </Box>
                        </Box>

                        {/* Amenities Preview */}
                        {cat.amenities && cat.amenities.length > 0 && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
                            {cat.amenities.slice(0, 3).map((am, i) => (
                              <Chip
                                key={i}
                                label={am}
                                size="small"
                                sx={{
                                  fontSize: "0.65rem",
                                  fontWeight: 700,
                                  height: 20,
                                  bgcolor: "#FFFFFF",
                                  border: `1px solid ${themeConfig.border}`,
                                  color: themeConfig.textMuted,
                                }}
                              />
                            ))}
                            {cat.amenities.length > 3 && (
                              <Chip
                                label={`+${cat.amenities.length - 3} more`}
                                size="small"
                                sx={{ fontSize: "0.65rem", fontWeight: 700, height: 20, bgcolor: "transparent" }}
                              />
                            )}
                          </Box>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5, borderTop: `1px solid ${themeConfig.border}` }}>
                        <Chip
                          label={
                            isAllBooked
                              ? "🔴 100% Booked"
                              : cat.available > 0
                              ? `🟢 ${cat.available} Ready for Check-In`
                              : "⚪ No Rooms Added"
                          }
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            bgcolor: isAllBooked ? "rgba(239, 68, 68, 0.1)" : hasAvailable ? "rgba(16, 185, 129, 0.12)" : "rgba(0,0,0,0.05)",
                            color: isAllBooked ? "#EF4444" : hasAvailable ? "#059669" : themeConfig.textMuted,
                          }}
                        />

                        <Button
                          size="small"
                          endIcon={<ArrowForward fontSize="small" />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(cat._id);
                          }}
                          sx={{
                            fontWeight: 900,
                            fontSize: "0.8rem",
                            color: themeConfig.primary,
                            "&:hover": { bgcolor: themeConfig.champagne },
                          }}
                        >
                          View Rooms
                        </Button>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        /* ----------------------------------------------------------------------- */
        /* VIEW B: CATEGORY ROOMS DRILL-DOWN (Detailed Rooms Matrix with Selection) */
        /* ----------------------------------------------------------------------- */
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
            {/* Category Breadcrumb & Drilldown Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5, flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => setSelectedCategory(null)}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 800,
                    borderColor: themeConfig.border,
                    color: themeConfig.textMain,
                    "&:hover": { bgcolor: themeConfig.champagne },
                  }}
                >
                  All Categories
                </Button>

                <div>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.3 }}>
                    {currentCategoryObj ? `${currentCategoryObj.name} Rooms` : "All Hotel Rooms"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.8rem" }}>
                    Select an <strong>AVAILABLE</strong> room to directly launch the 5-step Check-In wizard.
                  </Typography>
                </div>
              </Box>

              {/* Quick Category Filter Dropdown */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
                <TextField
                  size="small"
                  placeholder="Search room #, guest..."
                  value={roomSearch}
                  onChange={(e) => setRoomSearch(e.target.value)}
                  sx={{ minWidth: { xs: "100%", sm: 180 }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF" } }}
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

                {/* Category Switcher */}
                <TextField
                  select
                  size="small"
                  value={selectedCategory || "ALL"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{ minWidth: 160, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontWeight: 700 } }}
                >
                  <MenuItem value="ALL">All Categories ({rooms.length})</MenuItem>
                  {categoryStats.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name} ({c.totalRooms})
                    </MenuItem>
                  ))}
                </TextField>

                {/* Floor Dropdown */}
                <TextField
                  select
                  size="small"
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                  sx={{ minWidth: 120, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontWeight: 700 } }}
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
                  sx={{ minWidth: 145, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#FFFFFF", fontWeight: 700 } }}
                >
                  <MenuItem value="ALL">All Status</MenuItem>
                  <MenuItem value="AVAILABLE">🟢 Available</MenuItem>
                  <MenuItem value="OCCUPIED">🔵 Occupied</MenuItem>
                  <MenuItem value="RESERVED">🟡 Reserved</MenuItem>
                  <MenuItem value="CLEANING">🟣 Cleaning</MenuItem>
                  <MenuItem value="MAINTENANCE">🔴 Maintenance</MenuItem>
                </TextField>
              </Box>
            </Box>

            {/* Room Matrix Grid */}
            {filteredRooms.length === 0 ? (
              <Box sx={{ py: 6 }}>
                <EmptyState
                  title="No Rooms Found"
                  description="No rooms match the selected category and filter criteria."
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
                    const isAvailable = room.status === "AVAILABLE";

                    return (
                      <Card
                        key={room._id || room.roomNumber}
                        className="card-3d"
                        onClick={() => {
                          if (isAvailable && onSelectRoomForCheckIn) {
                            onSelectRoomForCheckIn(room);
                          } else {
                            handleOpenStatusDialog(room);
                          }
                        }}
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
                          position: "relative",
                          transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.02)",
                            boxShadow: `0 12px 24px -4px ${statusGlow}, 0 4px 10px rgba(0,0,0,0.05)`,
                          },
                        }}
                      >
                        {/* Top Ribbon: Floor, Tariff, and Delete button */}
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

                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Typography variant="caption" sx={{ fontWeight: 900, fontSize: "0.72rem", color: themeConfig.primary }}>
                                ₹{tariff}/n
                              </Typography>

                              {/* Delete Room Action */}
                              <Tooltip title={isAvailable ? "Delete Room" : "Only Available rooms can be deleted"}>
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleDeleteRoomClick(room, e)}
                                  sx={{
                                    p: 0.3,
                                    color: isAvailable ? themeConfig.danger : themeConfig.textMuted,
                                    opacity: isAvailable ? 0.8 : 0.3,
                                    "&:hover": { opacity: 1, bgcolor: "rgba(239, 68, 68, 0.1)" },
                                  }}
                                >
                                  <Delete sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>

                          <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mb: 0.2, letterSpacing: -0.5 }}>
                            #{room.roomNumber}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mb: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: "0.72rem" }}>
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

                          {/* Direct Action Button for 5-Step Check-In Wizard */}
                          {isAvailable ? (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Bolt sx={{ fontSize: 14 }} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectRoomForCheckIn) onSelectRoomForCheckIn(room);
                              }}
                              className="btn-3d"
                              sx={{
                                mt: 1,
                                width: "100%",
                                py: 0.5,
                                fontSize: "0.72rem",
                                fontWeight: 900,
                                borderRadius: "10px",
                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                color: "#FFFFFF",
                                boxShadow: `0 4px 10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.3)"}`,
                              }}
                            >
                              Check-In
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenStatusDialog(room);
                              }}
                              sx={{
                                mt: 1,
                                width: "100%",
                                py: 0.3,
                                fontSize: "0.68rem",
                                fontWeight: 800,
                                borderRadius: "10px",
                                borderColor: themeConfig.border,
                                color: themeConfig.textMain,
                              }}
                            >
                              Status
                            </Button>
                          )}
                        </Box>
                      </Card>
                    );
                  })}
                </Box>

                {/* Pagination Controls */}
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
      )}

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

      {/* ========================================================================= */}
      {/* 3D DIALOG: DELETE ROOM CONFIRMATION                                       */}
      {/* ========================================================================= */}
      <Dialog
        open={deleteConfirmDialog.open}
        onClose={() => setDeleteConfirmDialog({ open: false, room: null })}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              p: 2,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ display: "flex", alignItems: "center", gap: 1, color: themeConfig.danger, fontWeight: 900 }}>
          <WarningAmber /> Confirm Delete Room
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
          <Typography variant="body2" sx={{ color: themeConfig.textMain, mb: 1 }}>
            Are you sure you want to delete <strong>Room #{deleteConfirmDialog.room?.roomNumber}</strong>?
          </Typography>
          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
            This room is currently in <strong>AVAILABLE</strong> status. It will be removed from inventory while preserving historical audit logs.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteConfirmDialog({ open: false, room: null })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isSubmitting}
            onClick={handleConfirmDelete}
            sx={{
              bgcolor: themeConfig.danger,
              color: "#FFFFFF",
              fontWeight: 800,
              borderRadius: "10px",
              px: 2.5,
              "&:hover": { bgcolor: "#DC2626" },
            }}
          >
            {isSubmitting ? "Deleting..." : "Delete Room"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
