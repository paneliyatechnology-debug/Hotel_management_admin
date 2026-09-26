"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  CleaningServices,
  Refresh,
  CheckCircle,
  Close,
  MeetingRoom,
  KingBed,
  Apartment,
  Groups,
  Hotel,
  Bed,
  HowToReg,
  ArrowBack,
  ArrowForward,
  Search,
  Visibility,
  ViewModule,
  TableRows,
  Favorite,
  FamilyRestroom,
  Diamond,
  Villa,
  SingleBed,
  Work,
  Bolt,
  Build,
  Edit,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import EmptyState from "@/shared/components/EmptyState";
import StatusChip from "@/shared/components/StatusChip";

export default function AvailableRoomsPage({
  user,
  rooms = [],
  roomTypes = [],
  bookings = [],
  onRefresh,
  onRoomStatusChange,
  onSelectRoomForCheckIn,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();

  // Helper to reliably resolve guest name from room or active bookings (including multi-room bookings)
  const getRoomGuestName = (room) => {
    if (room?.guestName && room.guestName.trim()) return room.guestName;
    const rId = String(room?._id || "");
    const rNum = String(room?.roomNumber || "");

    const activeBooking = bookings.find((b) => {
      const isLive = b.status === "CHECKED_IN" || b.status === "CONFIRMED" || b.status === "OCCUPIED";
      if (!isLive) return false;

      const matchPrimary = String(b.room?._id || b.room || "") === rId || String(b.roomNumber || "") === rNum;
      const matchRoomsArr = Array.isArray(b.rooms) && b.rooms.some((id) => String(id?._id || id) === rId);
      const matchRoomNums = Array.isArray(b.roomNumbers) && b.roomNumbers.some((num) => String(num) === rNum);
      return matchPrimary || matchRoomsArr || matchRoomNums;
    });

    if (activeBooking) {
      return activeBooking.guest?.fullName || activeBooking.guest?.name || "";
    }
    return "";
  };

  // Primary Global View Mode: "BOX" (Categories Box Grid) or "TABLE" (All Rooms Table)
  const [viewMode, setViewMode] = useState("TABLE");

  // Box View Navigation: null = Categories Overview, string (categoryId) = Category Drilldown
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Category Drilldown Sub View Mode: "BOX" (Room Cards) or "TABLE" (Category Rooms Table)
  const [categorySubViewMode, setCategorySubViewMode] = useState("TABLE");

  // Filters for Table View & Category Drilldown
  const [roomSearch, setRoomSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [selectedFloor, setSelectedFloor] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Table Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Room Status Modal
  const [statusDialog, setStatusDialog] = useState({ open: false, room: null, newStatus: "AVAILABLE" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Category Icon helper
  const getCategoryIcon = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("coupl") || n.includes("copol") || n.includes("honey") || n.includes("romant") || n.includes("love"))
      return <Favorite sx={{ fontSize: 20, color: "#E11D48" }} />;
    if (n.includes("fam") || n.includes("group") || n.includes("quad"))
      return <FamilyRestroom sx={{ fontSize: 20, color: "#059669" }} />;
    if (n.includes("villa") || n.includes("cottage") || n.includes("penthouse") || n.includes("resort") || n.includes("bungalow"))
      return <Villa sx={{ fontSize: 20, color: "#0891B2" }} />;
    if (n.includes("deluxe") || n.includes("super") || n.includes("luxury") || n.includes("suite") || n.includes("vip") || n.includes("presid"))
      return <Diamond sx={{ fontSize: 20, color: "#D97706" }} />;
    if (n.includes("single") || n.includes("solo"))
      return <SingleBed sx={{ fontSize: 20, color: "#6366F1" }} />;
    if (n.includes("business") || n.includes("exec") || n.includes("corporate"))
      return <Work sx={{ fontSize: 20, color: "#2563EB" }} />;
    if (n.includes("king") || n.includes("double") || n.includes("queen"))
      return <KingBed sx={{ fontSize: 20, color: "#10B981" }} />;
    return <Hotel sx={{ fontSize: 20 }} />;
  };

  // Grouped Categories with Live Counts & Room Lists
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

    // Sort room lists inside each category numerically by room number
    catMap.forEach((cat) => {
      cat.rooms.sort((a, b) => {
        const numA = parseInt(a.roomNumber, 10) || 0;
        const numB = parseInt(b.roomNumber, 10) || 0;
        return numA - numB;
      });
    });

    return Array.from(catMap.values());
  }, [rooms, roomTypes]);

  // Overall Global Room Stats
  const globalStats = useMemo(() => {
    let total = rooms.length;
    let available = 0;
    let occupied = 0;
    let cleaning = 0;
    let maintenance = 0;

    rooms.forEach((r) => {
      if (r.status === "AVAILABLE") available++;
      else if (r.status === "OCCUPIED" || r.status === "RESERVED") occupied++;
      else if (r.status === "CLEANING") cleaning++;
      else if (r.status === "MAINTENANCE" || r.status === "BLOCKED") maintenance++;
    });

    return { total, available, occupied, cleaning, maintenance };
  }, [rooms]);

  // Current selected category object (for Box drill-down)
  const activeCategory = useMemo(() => {
    if (!selectedCategory) return null;
    return categoryStats.find((c) => c._id === selectedCategory) || null;
  }, [selectedCategory, categoryStats]);

  // Distinct floors across all rooms
  const distinctFloors = useMemo(() => {
    const list = selectedCategory && activeCategory ? activeCategory.rooms : rooms;
    return Array.from(new Set(list.map((r) => r.floor || 1))).sort((a, b) => a - b);
  }, [rooms, selectedCategory, activeCategory]);

  // Filtered rooms for Table View
  const filteredAllRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (selectedCategoryFilter !== "ALL") {
        const rtObj = typeof r.roomType === "object" ? r.roomType : null;
        const rtId = rtObj?._id || r.roomType || "UNCATEGORIZED";
        if (rtId !== selectedCategoryFilter) return false;
      }
      if (selectedFloor !== "ALL" && String(r.floor || 1) !== String(selectedFloor)) {
        return false;
      }
      if (selectedStatus !== "ALL" && r.status !== selectedStatus) {
        return false;
      }
      if (roomSearch.trim()) {
        const q = roomSearch.toLowerCase();
        const matchNum = r.roomNumber?.toString().toLowerCase().includes(q);
        const gName = getRoomGuestName(r);
        const matchGuest = gName.toLowerCase().includes(q);
        const rtObj = typeof r.roomType === "object" ? r.roomType : null;
        const matchCat = (rtObj?.name || r.type || "").toLowerCase().includes(q);
        return matchNum || matchGuest || matchCat;
      }
      return true;
    }).sort((a, b) => {
      const numA = parseInt(a.roomNumber, 10) || 0;
      const numB = parseInt(b.roomNumber, 10) || 0;
      return numA - numB;
    });
  }, [rooms, selectedCategoryFilter, selectedFloor, selectedStatus, roomSearch, bookings]);

  // Filtered rooms inside active category (for Category drill-down)
  const filteredCategoryRooms = useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.rooms.filter((r) => {
      if (selectedFloor !== "ALL" && String(r.floor || 1) !== String(selectedFloor)) {
        return false;
      }
      if (selectedStatus !== "ALL" && r.status !== selectedStatus) {
        return false;
      }
      if (roomSearch.trim()) {
        const q = roomSearch.toLowerCase();
        const matchNum = r.roomNumber?.toString().toLowerCase().includes(q);
        const gName = getRoomGuestName(r);
        const matchGuest = gName.toLowerCase().includes(q);
        return matchNum || matchGuest;
      }
      return true;
    });
  }, [activeCategory, selectedFloor, selectedStatus, roomSearch, bookings]);

  // Open Room Status Change Dialog
  const handleOpenStatusDialog = (room) => {
    setStatusDialog({
      open: true,
      room,
      newStatus: room.status || "AVAILABLE",
    });
  };

  const handleConfirmStatusChange = async () => {
    if (!statusDialog.room) return;
    try {
      setIsSubmitting(true);
      if (onRoomStatusChange) {
        await onRoomStatusChange(statusDialog.room, statusDialog.newStatus);
      }
      setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" });
    } catch (err) {
      console.error("Error updating room status:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 2.5 }, pb: { xs: 12, md: 4 } }}>
      {/* Top Header Control Bar with Box / Table View Switcher */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          mb: 2.5,
          gap: 1.8,
        }}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap" }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.5, fontSize: { xs: "1.25rem", sm: "1.45rem" } }}>
              🏨 Room Inventory
            </Typography>
            <Chip
              label={`${globalStats.total} Total Rooms`}
              size="small"
              sx={{
                bgcolor: themeConfig.champagne,
                color: themeConfig.primaryDark,
                fontWeight: 800,
                fontSize: "0.72rem",
                border: `1px solid ${themeConfig.border}`,
                height: 24,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: { xs: "0.78rem", sm: "0.85rem" }, mt: 0.3 }}>
            Monitor real-time room availability, housekeeping, and tariffs in Box or Table layout.
          </Typography>
        </div>

        {/* Global View Mode Toggle: Box View & Table View */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: { xs: "100%", sm: "auto" }, flexShrink: 0 }}>
          <Box
            sx={{
              display: "inline-flex",
              bgcolor: themeConfig.bgCard || "#FFFFFF",
              p: 0.5,
              borderRadius: "14px",
              border: `1px solid ${themeConfig.border}`,
              boxShadow: isDarkMode ? "0 4px 14px rgba(0,0,0,0.35)" : "0 2px 8px rgba(12, 39, 59, 0.04)",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Button
              size="small"
              onClick={() => {
                setViewMode("BOX");
                setPage(0);
              }}
              startIcon={<ViewModule sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "10px",
                px: { xs: 1.5, sm: 2.2 },
                py: 0.7,
                fontWeight: 800,
                fontSize: "0.82rem",
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: "max-content",
                bgcolor: viewMode === "BOX" ? themeConfig.primary : "transparent",
                color: viewMode === "BOX" ? "#FFFFFF !important" : themeConfig.textMain,
                boxShadow: viewMode === "BOX" ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: viewMode === "BOX" ? themeConfig.primaryDark : "rgba(0,0,0,0.04)",
                },
              }}
            >
              Box View
            </Button>
            <Button
              size="small"
              onClick={() => {
                setViewMode("TABLE");
                setSelectedCategory(null);
                setPage(0);
              }}
              startIcon={<TableRows sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "10px",
                px: { xs: 1.5, sm: 2.2 },
                py: 0.7,
                fontWeight: 800,
                fontSize: "0.82rem",
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: "max-content",
                bgcolor: viewMode === "TABLE" ? themeConfig.primary : "transparent",
                color: viewMode === "TABLE" ? "#FFFFFF !important" : themeConfig.textMain,
                boxShadow: viewMode === "TABLE" ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: viewMode === "TABLE" ? themeConfig.primaryDark : "rgba(0,0,0,0.04)",
                },
              }}
            >
              Table View
            </Button>
          </Box>

          {onRefresh && (
            <Tooltip title="Refresh Rooms Data">
              <IconButton
                onClick={onRefresh}
                sx={{
                  bgcolor: themeConfig.bgCard || "#FFFFFF",
                  border: `1px solid ${themeConfig.border}`,
                  borderRadius: "12px",
                  p: 0.9,
                  boxShadow: isDarkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.04)",
                  "&:hover": { bgcolor: themeConfig.champagne },
                }}
              >
                <Refresh fontSize="small" sx={{ color: themeConfig.primary }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* 1. BOX VIEW (Grid of Category Cards / Category Drilldown)                */}
      {/* ========================================================================= */}
      {viewMode === "BOX" && (
        <>
          {selectedCategory === null ? (
            /* Category Overview Cards */
            categoryStats.length === 0 ? (
              <Box sx={{ py: 8 }}>
                <EmptyState
                  title="No Room Categories Found"
                  description="Please configure room categories and rooms in Hotel Admin to manage inventory."
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
                  gap: 2.5,
                }}
              >
                {categoryStats.map((cat) => {
                  const hasAvailable = cat.available > 0;
                  const isAllBooked = cat.totalRooms > 0 && cat.available === 0;

                  return (
                    <Card
                      key={cat._id}
                      className="card-3d"
                      onClick={() => {
                        setSelectedCategory(cat._id);
                        setPage(0);
                      }}
                      sx={{
                        p: 2.5,
                        borderRadius: "22px",
                        border: `1px solid ${themeConfig.border}`,
                        background: isDarkMode
                          ? `linear-gradient(135deg, ${themeConfig.bgCard} 0%, rgba(255, 255, 255, 0.02) 100%)`
                          : "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
                        bgcolor: themeConfig.bgCard,
                        boxShadow: isDarkMode
                          ? "0 10px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)"
                          : "0 8px 24px rgba(12, 39, 59, 0.05), inset 0 1px 1px #FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: themeConfig.primary,
                          boxShadow: isDarkMode
                            ? `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 0 1px ${themeConfig.primary}`
                            : `0 16px 36px rgba(12, 39, 59, 0.1), 0 0 0 1px ${themeConfig.primary}`,
                        },
                      }}
                    >
                      <div>
                        {/* Header: Icon, Name & Tariff */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <Avatar
                              sx={{
                                bgcolor: themeConfig.champagne,
                                color: themeConfig.primaryDark,
                                width: 44,
                                height: 44,
                                borderRadius: "14px",
                                border: `1px solid ${themeConfig.border}`,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                              }}
                            >
                              {getCategoryIcon(cat.name)}
                            </Avatar>
                            <div>
                              <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.3, fontSize: "1.05rem" }}>
                                {cat.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>
                                {cat.bedCount} Bed ({cat.bedType}) &bull; Max {cat.capacity.adults} Guests
                              </Typography>
                            </div>
                          </Box>

                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.primary, fontSize: "1.15rem", letterSpacing: -0.5 }}>
                              ₹{Number(cat.basePrice || 0).toLocaleString()}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, display: "block", fontSize: "0.7rem" }}>
                              / night
                            </Typography>
                          </Box>
                        </Box>

                        {/* Status Units Counter (Available, Booked, Cleaning) */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1,
                            mt: 2,
                            p: 1,
                            borderRadius: "14px",
                            bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
                            border: `1px solid ${themeConfig.border}`,
                          }}
                        >
                          {/* Available */}
                          <Box sx={{ textAlign: "center", p: 0.8, borderRadius: "10px", bgcolor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                            <Typography variant="caption" sx={{ color: "#059669", fontWeight: 800, display: "block", fontSize: "0.62rem", textTransform: "uppercase" }}>
                              🟢 Available
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 900, color: "#10B981", mt: 0.1, fontSize: "0.95rem" }}>
                              {cat.available}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.6rem", fontWeight: 700 }}>
                              Units
                            </Typography>
                          </Box>

                          {/* Booked */}
                          <Box sx={{ textAlign: "center", p: 0.8, borderRadius: "10px", bgcolor: "rgba(11, 142, 224, 0.08)", border: "1px solid rgba(11, 142, 224, 0.2)" }}>
                            <Typography variant="caption" sx={{ color: "#0284C7", fontWeight: 800, display: "block", fontSize: "0.62rem", textTransform: "uppercase" }}>
                              🔵 Booked
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 900, color: "#0B8EE0", mt: 0.1, fontSize: "0.95rem" }}>
                              {cat.occupied + cat.reserved}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.6rem", fontWeight: 700 }}>
                              Units
                            </Typography>
                          </Box>

                          {/* Cleaning */}
                          <Box sx={{ textAlign: "center", p: 0.8, borderRadius: "10px", bgcolor: "rgba(217, 119, 6, 0.08)", border: "1px solid rgba(217, 119, 6, 0.2)" }}>
                            <Typography variant="caption" sx={{ color: "#D97706", fontWeight: 800, display: "block", fontSize: "0.62rem", textTransform: "uppercase" }}>
                              🟡 Cleaning
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 900, color: "#D97706", mt: 0.1, fontSize: "0.95rem" }}>
                              {cat.cleaning}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.6rem", fontWeight: 700 }}>
                              Units
                            </Typography>
                          </Box>
                        </Box>

                        {/* Room Numbers List Chips */}
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
                            <Typography variant="caption" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.72rem", textTransform: "uppercase" }}>
                              Room Numbers ({cat.rooms.length})
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.65rem" }}>
                              Click to view
                            </Typography>
                          </Box>

                          {cat.rooms.length === 0 ? (
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontStyle: "italic", display: "block", py: 0.5 }}>
                              No rooms added yet.
                            </Typography>
                          ) : (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, maxHeight: "100px", overflowY: "auto", pr: 0.5 }}>
                              {cat.rooms.map((room) => {
                                const isAvail = room.status === "AVAILABLE";
                                const isOcc = room.status === "OCCUPIED" || room.status === "RESERVED";
                                const isCln = room.status === "CLEANING";

                                let badgeBg = isAvail
                                  ? "rgba(16, 185, 129, 0.12)"
                                  : isOcc
                                    ? "rgba(11, 142, 224, 0.12)"
                                    : isCln
                                      ? "rgba(217, 119, 6, 0.12)"
                                      : "rgba(239, 68, 68, 0.12)";

                                let badgeColor = isAvail
                                  ? "#059669"
                                  : isOcc
                                    ? "#0284C7"
                                    : isCln
                                      ? "#D97706"
                                      : "#DC2626";

                                let dotSymbol = isAvail ? "🟢" : isOcc ? "🔵" : isCln ? "🟡" : "🔴";

                                return (
                                  <Chip
                                    key={room._id || room.roomNumber}
                                    label={`${dotSymbol} #${room.roomNumber}`}
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenStatusDialog(room);
                                    }}
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: "0.7rem",
                                      bgcolor: badgeBg,
                                      color: badgeColor,
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      transition: "all 0.15s ease",
                                      "&:hover": {
                                        transform: "scale(1.06)",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                      },
                                    }}
                                  />
                                );
                              })}
                            </Box>
                          )}
                        </Box>
                      </div>

                      {/* Card Action Footer */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pt: 1.5,
                          mt: 1.8,
                          borderTop: `1px solid ${themeConfig.border}`,
                        }}
                      >
                        <Chip
                          label={
                            isAllBooked
                              ? "🔴 100% Booked"
                              : cat.available > 0
                                ? `🟢 ${cat.available} Ready`
                                : "⚪ No Rooms"
                          }
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.68rem",
                            bgcolor: isAllBooked
                              ? "rgba(239, 68, 68, 0.1)"
                              : hasAvailable
                                ? "rgba(16, 185, 129, 0.12)"
                                : "rgba(0,0,0,0.05)",
                            color: isAllBooked ? "#EF4444" : hasAvailable ? "#059669" : themeConfig.textMuted,
                          }}
                        />

                        <Button
                          size="small"
                          endIcon={<ArrowForward fontSize="small" />}
                          sx={{
                            fontWeight: 900,
                            fontSize: "0.78rem",
                            color: themeConfig.primary,
                            borderRadius: "8px",
                            px: 1.2,
                            "&:hover": { bgcolor: themeConfig.champagne },
                          }}
                        >
                          View {cat.totalRooms} Rooms
                        </Button>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            )
          ) : (
            /* Category Rooms Drilldown (With Box and Table View inside Category!) */
            <Box>
              {/* Drilldown Header with Back Button and Category Box/Table Switcher */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  flexDirection: { xs: "column", sm: "row" },
                  mb: 2.5,
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => setSelectedCategory(null)}
                    sx={{
                      borderRadius: "10px",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      borderColor: themeConfig.border,
                      color: themeConfig.textMain,
                      bgcolor: themeConfig.bgCard || "#FFFFFF",
                      "&:hover": { bgcolor: themeConfig.champagne, borderColor: themeConfig.primary },
                    }}
                  >
                    Back
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: themeConfig.champagne,
                        color: themeConfig.primaryDark,
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                      }}
                    >
                      {getCategoryIcon(activeCategory?.name || "")}
                    </Avatar>
                    <div>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.5, fontSize: "1.1rem" }}>
                        {activeCategory?.name || "Category"} ({activeCategory?.totalRooms || 0} Rooms)
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.75rem" }}>
                        ₹{Number(activeCategory?.basePrice || 0).toLocaleString()} / night &bull; {activeCategory?.bedCount} Bed ({activeCategory?.bedType})
                      </Typography>
                    </div>
                  </Box>
                </Box>

                {/* Right Side: Status Pills & Category Sub-View Toggle (Box / Table) */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", justifyContent: { xs: "space-between", sm: "flex-end" } }}>
                  <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                    <Chip
                      label={`🟢 ${activeCategory?.available || 0} Avail`}
                      size="small"
                      sx={{ bgcolor: "rgba(16, 185, 129, 0.12)", color: "#059669", fontWeight: 800, fontSize: "0.72rem" }}
                    />
                    <Chip
                      label={`🔵 ${(activeCategory?.occupied || 0) + (activeCategory?.reserved || 0)} Booked`}
                      size="small"
                      sx={{ bgcolor: "rgba(11, 142, 224, 0.12)", color: "#0284C7", fontWeight: 800, fontSize: "0.72rem" }}
                    />
                  </Box>

                  {/* Personal Box vs Table Toggle for this category */}
                  <Box
                    sx={{
                      display: "flex",
                      bgcolor: themeConfig.bgCard || "#FFFFFF",
                      p: 0.4,
                      borderRadius: "12px",
                      border: `1px solid ${themeConfig.border}`,
                      boxShadow: isDarkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 2px 6px rgba(12, 39, 59, 0.03)",
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => setCategorySubViewMode("BOX")}
                      startIcon={<ViewModule sx={{ fontSize: 16 }} />}
                      sx={{
                        borderRadius: "8px",
                        px: 1.2,
                        py: 0.4,
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        textTransform: "none",
                        bgcolor: categorySubViewMode === "BOX" ? themeConfig.primary : "transparent",
                        color: categorySubViewMode === "BOX" ? "#FFFFFF !important" : themeConfig.textMain,
                        boxShadow: categorySubViewMode === "BOX" ? `0 2px 8px ${themeConfig.primaryGlow}` : "none",
                      }}
                    >
                      Box
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setCategorySubViewMode("TABLE")}
                      startIcon={<TableRows sx={{ fontSize: 16 }} />}
                      sx={{
                        borderRadius: "8px",
                        px: 1.2,
                        py: 0.4,
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        textTransform: "none",
                        bgcolor: categorySubViewMode === "TABLE" ? themeConfig.primary : "transparent",
                        color: categorySubViewMode === "TABLE" ? "#FFFFFF !important" : themeConfig.textMain,
                        boxShadow: categorySubViewMode === "TABLE" ? `0 2px 8px ${themeConfig.primaryGlow}` : "none",
                      }}
                    >
                      Table
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Filters Bar */}
              <Card
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2.5,
                  borderRadius: "16px",
                  border: `1px solid ${themeConfig.border}`,
                  bgcolor: themeConfig.bgCard || "#FFFFFF",
                  boxShadow: isDarkMode ? "0 8px 24px rgba(0,0,0,0.35)" : "0 4px 14px rgba(12, 39, 59, 0.04)",
                }}
              >
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1.5, alignItems: "center" }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search room #, guest..."
                    value={roomSearch}
                    onChange={(e) => {
                      setRoomSearch(e.target.value);
                      setPage(0);
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={selectedFloor}
                    onChange={(e) => {
                      setSelectedFloor(e.target.value);
                      setPage(0);
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 700 } }}
                  >
                    <MenuItem value="ALL">All Floors</MenuItem>
                    {distinctFloors.map((fl) => (
                      <MenuItem key={fl} value={String(fl)}>
                        Floor {fl}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setPage(0);
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 700 } }}
                  >
                    <MenuItem value="ALL">All Status</MenuItem>
                    <MenuItem value="AVAILABLE">🟢 Available</MenuItem>
                    <MenuItem value="OCCUPIED">🔵 Occupied</MenuItem>
                    <MenuItem value="CLEANING">🟡 Cleaning</MenuItem>
                    <MenuItem value="MAINTENANCE">🔴 Maintenance</MenuItem>
                    <MenuItem value="BLOCKED">⚪ Blocked</MenuItem>
                  </TextField>
                </Box>
              </Card>

              {/* 1A. Category Rooms Box View (Cards Grid) */}
              {categorySubViewMode === "BOX" && (
                filteredCategoryRooms.length === 0 ? (
                  <Box sx={{ py: 6 }}>
                    <EmptyState
                      title="No Rooms Found"
                      description="No rooms match the current search or filter criteria in this category."
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
                      gap: 2,
                    }}
                  >
                    {filteredCategoryRooms.map((room) => {
                      const isAvail = room.status === "AVAILABLE";
                      const isOcc = room.status === "OCCUPIED" || room.status === "RESERVED";
                      const isCln = room.status === "CLEANING";
                      const tariff = room.customPricePerNight || activeCategory?.basePrice || 3000;
                      const roomGuestName = getRoomGuestName(room);

                      let borderAccent = isAvail ? "#10B981" : isOcc ? "#0B8EE0" : isCln ? "#D97706" : "#EF4444";

                      return (
                        <Card
                          key={room._id || room.roomNumber}
                          className="card-3d"
                          sx={{
                            p: 2,
                            borderRadius: "18px",
                            border: `1px solid ${themeConfig.border}`,
                            borderTop: `4px solid ${borderAccent}`,
                            background: themeConfig.bgCard,
                            bgcolor: themeConfig.bgCard,
                            boxShadow: isDarkMode
                              ? "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                              : "0 6px 20px rgba(12, 39, 59, 0.04)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: isDarkMode
                                ? "0 14px 32px rgba(0, 0, 0, 0.6)"
                                : "0 12px 28px rgba(12, 39, 59, 0.08)",
                            },
                          }}
                        >
                          <div>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: isAvail
                                      ? "rgba(16, 185, 129, 0.15)"
                                      : isOcc
                                        ? "rgba(11, 142, 224, 0.15)"
                                        : isCln
                                          ? "rgba(217, 119, 6, 0.15)"
                                          : "rgba(239, 68, 68, 0.15)",
                                    color: borderAccent,
                                    width: 36,
                                    height: 36,
                                    fontSize: "0.85rem",
                                    fontWeight: 900,
                                    borderRadius: "10px",
                                  }}
                                >
                                  {room.roomNumber}
                                </Avatar>
                                <div>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1.2 }}>
                                    Room {room.roomNumber}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>
                                    Floor {room.floor || 1}
                                  </Typography>
                                </div>
                              </Box>
                              <StatusChip status={room.status} size="small" />
                            </Box>

                            <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : "#F8FAFC", border: `1px solid ${themeConfig.border}`, mb: 1.2 }}>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", fontWeight: 700, fontSize: "0.68rem" }}>
                                Rate / Tariff
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                                ₹{Number(tariff).toLocaleString()} <span style={{ fontSize: "0.72rem", color: themeConfig.textMuted, fontWeight: 600 }}>/ night</span>
                              </Typography>
                              {roomGuestName && (
                                <Typography variant="caption" sx={{ color: themeConfig.textMain, fontWeight: 800, mt: 0.3, display: "block" }}>
                                  👤 {roomGuestName}
                                </Typography>
                              )}
                            </Box>
                          </div>

                          <Box sx={{ display: "flex", gap: 0.8, pt: 1, borderTop: `1px solid ${themeConfig.border}` }}>
                            {isAvail && onSelectRoomForCheckIn && (
                              <Button
                                fullWidth
                                size="small"
                                variant="contained"
                                startIcon={<Bolt sx={{ fontSize: 13 }} />}
                                onClick={() => onSelectRoomForCheckIn(room)}
                                sx={{
                                  borderRadius: "8px",
                                  fontWeight: 900,
                                  fontSize: "0.72rem",
                                  textTransform: "none",
                                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                                  color: "#FFFFFF",
                                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                                }}
                              >
                                Check-In
                              </Button>
                            )}
                            <Button
                              fullWidth={!isAvail}
                              size="small"
                              variant="outlined"
                              startIcon={<Edit sx={{ fontSize: 12 }} />}
                              onClick={() => handleOpenStatusDialog(room)}
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 800,
                                fontSize: "0.72rem",
                                textTransform: "none",
                                borderColor: themeConfig.border,
                                color: themeConfig.textMain,
                                "&:hover": { borderColor: themeConfig.primary, bgcolor: themeConfig.champagne },
                              }}
                            >
                              Status
                            </Button>
                          </Box>
                        </Card>
                      );
                    })}
                  </Box>
                )
              )}

              {/* 1B. Category Rooms Table View */}
              {categorySubViewMode === "TABLE" && (
                filteredCategoryRooms.length === 0 ? (
                  <Box sx={{ py: 6 }}>
                    <EmptyState
                      title="No Rooms Found"
                      description="No rooms match the current search or filter criteria in this category."
                    />
                  </Box>
                ) : (
                  <Paper
                    sx={{
                      borderRadius: "18px",
                      border: `1px solid ${themeConfig.border}`,
                      boxShadow: "0 8px 24px rgba(12, 39, 59, 0.05)",
                      overflow: "hidden",
                    }}
                  >
                    <TableContainer
                      sx={{
                        maxHeight: { xs: 450, md: 540 },
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { height: "6px", width: "6px" },
                        "&::-webkit-scrollbar-track": { background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" },
                        "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "6px" },
                      }}
                    >
                      <Table stickyHeader size="small" sx={{ minWidth: 680 }}>
                        <TableHead>
                          <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, py: 1.2, pl: 2.5, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Room Number
                            </TableCell>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Floor
                            </TableCell>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Rate / Tariff
                            </TableCell>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Live Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Guest / Occupant
                            </TableCell>
                            <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, textAlign: "right", pr: 2.5, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredCategoryRooms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((room) => {
                              const isAvail = room.status === "AVAILABLE";
                              const isOcc = room.status === "OCCUPIED" || room.status === "RESERVED";
                              const isCln = room.status === "CLEANING";
                              const tariff = room.customPricePerNight || activeCategory?.basePrice || 3000;
                              const roomGuestName = getRoomGuestName(room);

                              return (
                                <TableRow
                                  key={room._id || room.roomNumber}
                                  hover
                                  onClick={() => {
                                    if (isAvail && onSelectRoomForCheckIn) {
                                      onSelectRoomForCheckIn(room);
                                    } else {
                                      handleOpenStatusDialog(room);
                                    }
                                  }}
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": { bgcolor: "rgba(11, 142, 224, 0.04)" },
                                    transition: "background 0.15s ease",
                                  }}
                                >
                                  {/* Room Number */}
                                  <TableCell sx={{ py: 1.2, pl: 2.5, whiteSpace: "nowrap" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                                      <Avatar
                                        sx={{
                                          bgcolor: isAvail
                                            ? "rgba(16, 185, 129, 0.15)"
                                            : isOcc
                                              ? "rgba(11, 142, 224, 0.15)"
                                              : isCln
                                                ? "rgba(217, 119, 6, 0.15)"
                                                : "rgba(239, 68, 68, 0.15)",
                                          color: isAvail
                                            ? "#10B981"
                                            : isOcc
                                              ? "#0B8EE0"
                                              : isCln
                                                ? "#D97706"
                                                : "#EF4444",
                                          width: 32,
                                          height: 32,
                                          fontSize: "0.8rem",
                                          fontWeight: 900,
                                          borderRadius: "8px",
                                        }}
                                      >
                                        {room.roomNumber}
                                      </Avatar>
                                      <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.9rem" }}>
                                        Room #{room.roomNumber}
                                      </Typography>
                                    </Box>
                                  </TableCell>

                                  {/* Floor */}
                                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    <Chip
                                      label={`Floor ${room.floor || 1}`}
                                      size="small"
                                      sx={{
                                        fontWeight: 800,
                                        fontSize: "0.7rem",
                                        bgcolor: themeConfig.champagne,
                                        color: themeConfig.primaryDark,
                                        borderRadius: "6px",
                                        height: 22,
                                      }}
                                    />
                                  </TableCell>

                                  {/* Rate */}
                                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                                      ₹{Number(tariff).toLocaleString()}
                                      <Typography component="span" variant="caption" sx={{ color: themeConfig.textMuted, ml: 0.5 }}>
                                        / night
                                      </Typography>
                                    </Typography>
                                  </TableCell>

                                  {/* Status */}
                                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    <StatusChip status={room.status} size="small" />
                                  </TableCell>

                                  {/* Guest */}
                                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    {roomGuestName ? (
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                        <Avatar sx={{ width: 22, height: 22, fontSize: "0.65rem", bgcolor: themeConfig.primary }}>
                                          {roomGuestName.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "0.82rem" }}>
                                          {roomGuestName}
                                        </Typography>
                                      </Box>
                                    ) : (
                                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontStyle: "italic" }}>
                                        &mdash; Vacant &mdash;
                                      </Typography>
                                    )}
                                  </TableCell>

                                  {/* Action */}
                                  <TableCell sx={{ textAlign: "right", pr: 2.5, whiteSpace: "nowrap" }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 0.8 }}>
                                      {isAvail && (
                                        <Button
                                          size="small"
                                          variant="contained"
                                          startIcon={<Bolt sx={{ fontSize: 13 }} />}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (onSelectRoomForCheckIn) onSelectRoomForCheckIn(room);
                                          }}
                                          sx={{
                                            borderRadius: "8px",
                                            fontWeight: 900,
                                            fontSize: "0.72rem",
                                            background: `linear-gradient(135deg, #10B981 0%, #059669 100%)`,
                                            color: "#FFFFFF",
                                            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                                            px: 1.4,
                                            py: 0.3,
                                            "&:hover": { background: "#059669" },
                                          }}
                                        >
                                          Check-In
                                        </Button>
                                      )}

                                      <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<Edit sx={{ fontSize: 12 }} />}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenStatusDialog(room);
                                        }}
                                        sx={{
                                          borderRadius: "8px",
                                          fontWeight: 800,
                                          fontSize: "0.7rem",
                                          borderColor: themeConfig.border,
                                          color: themeConfig.textMain,
                                          "&:hover": { borderColor: themeConfig.primary, bgcolor: themeConfig.champagne },
                                        }}
                                      >
                                        Status
                                      </Button>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* Table Pagination */}
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={filteredCategoryRooms.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(e, newPage) => setPage(newPage)}
                      onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                      sx={{
                        borderTop: `1px solid ${themeConfig.border}`,
                        bgcolor: themeConfig.bgCard || "#FFFFFF",
                      }}
                    />
                  </Paper>
                )
              )}
            </Box>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. TABLE VIEW (Full All-Rooms Table with Comprehensive Filters)          */}
      {/* ========================================================================= */}
      {viewMode === "TABLE" && (
        <Box>
          {/* Table Filters Bar: Search, Category, Floor, Status */}
          <Card
            sx={{
              p: { xs: 1.5, sm: 2 },
              mb: 2.5,
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || "#FFFFFF",
              boxShadow: isDarkMode ? "0 8px 24px rgba(0,0,0,0.35)" : "0 4px 14px rgba(12, 39, 59, 0.04)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "2fr 1.2fr 1fr 1.2fr auto" },
                gap: 1.5,
                alignItems: "center",
              }}
            >
              {/* Search */}
              <TextField
                fullWidth
                size="small"
                placeholder="Search room #, guest, category..."
                value={roomSearch}
                onChange={(e) => {
                  setRoomSearch(e.target.value);
                  setPage(0);
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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

              {/* Category Filter */}
              <TextField
                select
                fullWidth
                size="small"
                value={selectedCategoryFilter}
                onChange={(e) => {
                  setSelectedCategoryFilter(e.target.value);
                  setPage(0);
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Categories ({categoryStats.length})</MenuItem>
                {categoryStats.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name} ({c.totalRooms})
                  </MenuItem>
                ))}
              </TextField>

              {/* Floor Filter */}
              <TextField
                select
                fullWidth
                size="small"
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                  setPage(0);
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Floors</MenuItem>
                {distinctFloors.map((fl) => (
                  <MenuItem key={fl} value={String(fl)}>
                    Floor {fl}
                  </MenuItem>
                ))}
              </TextField>

              {/* Status Filter */}
              <TextField
                select
                fullWidth
                size="small"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(0);
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 700 } }}
              >
                <MenuItem value="ALL">All Statuses</MenuItem>
                <MenuItem value="AVAILABLE">🟢 Available ({globalStats.available})</MenuItem>
                <MenuItem value="OCCUPIED">🔵 Occupied ({globalStats.occupied})</MenuItem>
                <MenuItem value="CLEANING">🟡 Cleaning ({globalStats.cleaning})</MenuItem>
                <MenuItem value="MAINTENANCE">🔴 Maintenance ({globalStats.maintenance})</MenuItem>
                <MenuItem value="BLOCKED">⚪ Blocked</MenuItem>
              </TextField>

              {/* Reset Filter Button */}
              {(roomSearch || selectedCategoryFilter !== "ALL" || selectedFloor !== "ALL" || selectedStatus !== "ALL") && (
                <Button
                  size="small"
                  onClick={() => {
                    setRoomSearch("");
                    setSelectedCategoryFilter("ALL");
                    setSelectedFloor("ALL");
                    setSelectedStatus("ALL");
                    setPage(0);
                  }}
                  sx={{
                    fontWeight: 800,
                    color: themeConfig.primary,
                    fontSize: "0.78rem",
                    gridColumn: { xs: "1 / -1", md: "auto" },
                    borderRadius: "8px",
                  }}
                >
                  Reset
                </Button>
              )}
            </Box>
          </Card>

          {/* All Rooms Table */}
          {filteredAllRooms.length === 0 ? (
            <Box sx={{ py: 6 }}>
              <EmptyState
                title="No Rooms Found"
                description="No rooms match the selected search or filter criteria."
              />
            </Box>
          ) : (
            <Paper
              sx={{
                borderRadius: "18px",
                border: `1px solid ${themeConfig.border}`,
                boxShadow: "0 8px 24px rgba(12, 39, 59, 0.05)",
                overflow: "hidden",
              }}
            >
              <TableContainer
                sx={{
                  maxHeight: { xs: 480, md: 580 },
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { height: "6px", width: "6px" },
                  "&::-webkit-scrollbar-track": { background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" },
                  "&::-webkit-scrollbar-thumb": { background: themeConfig.border, borderRadius: "6px" },
                }}
              >
                <Table stickyHeader size="small" sx={{ minWidth: 720 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, py: 1.4, pl: 2.5, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Room Number
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Category / Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Floor
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Tariff / Night
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Live Status
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Guest / Occupant
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900, color: themeConfig.textMain, textAlign: "right", pr: 2.5, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAllRooms
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((room) => {
                        const isAvail = room.status === "AVAILABLE";
                        const isOcc = room.status === "OCCUPIED" || room.status === "RESERVED";
                        const isCln = room.status === "CLEANING";

                        const rtObj = typeof room.roomType === "object" ? room.roomType : null;
                        const catName = rtObj?.name || room.type || "Standard Room";
                        const tariff = room.customPricePerNight || rtObj?.basePrice || room.basePrice || 3000;
                        const roomGuestName = getRoomGuestName(room);

                        return (
                          <TableRow
                            key={room._id || room.roomNumber}
                            hover
                            onClick={() => {
                              if (isAvail && onSelectRoomForCheckIn) {
                                onSelectRoomForCheckIn(room);
                              } else {
                                handleOpenStatusDialog(room);
                              }
                            }}
                            sx={{
                              cursor: "pointer",
                              "&:hover": { bgcolor: "rgba(11, 142, 224, 0.04)" },
                              transition: "background 0.15s ease",
                            }}
                          >
                            {/* Room Number */}
                            <TableCell sx={{ py: 1.2, pl: 2.5, whiteSpace: "nowrap" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: isAvail
                                      ? "rgba(16, 185, 129, 0.15)"
                                      : isOcc
                                        ? "rgba(11, 142, 224, 0.15)"
                                        : isCln
                                          ? "rgba(217, 119, 6, 0.15)"
                                          : "rgba(239, 68, 68, 0.15)",
                                    color: isAvail
                                      ? "#10B981"
                                      : isOcc
                                        ? "#0B8EE0"
                                        : isCln
                                          ? "#D97706"
                                          : "#EF4444",
                                    width: 32,
                                    height: 32,
                                    fontSize: "0.8rem",
                                    fontWeight: 900,
                                    borderRadius: "8px",
                                  }}
                                >
                                  {room.roomNumber}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "0.9rem" }}>
                                  Room #{room.roomNumber}
                                </Typography>
                              </Box>
                            </TableCell>

                            {/* Category */}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                <Avatar sx={{ width: 22, height: 22, bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, fontSize: "0.65rem", borderRadius: "6px" }}>
                                  {getCategoryIcon(catName)}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "0.82rem" }}>
                                  {catName}
                                </Typography>
                              </Box>
                            </TableCell>

                            {/* Floor */}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                              <Chip
                                label={`Floor ${room.floor || 1}`}
                                size="small"
                                sx={{
                                  fontWeight: 800,
                                  fontSize: "0.7rem",
                                  bgcolor: themeConfig.champagne,
                                  color: themeConfig.primaryDark,
                                  borderRadius: "6px",
                                  height: 22,
                                }}
                              />
                            </TableCell>

                            {/* Rate */}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                                ₹{Number(tariff).toLocaleString()}
                                <Typography component="span" variant="caption" sx={{ color: themeConfig.textMuted, ml: 0.5 }}>
                                  / night
                                </Typography>
                              </Typography>
                            </TableCell>

                            {/* Status */}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                              <StatusChip status={room.status} size="small" />
                            </TableCell>

                            {/* Guest */}
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                              {roomGuestName ? (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                  <Avatar sx={{ width: 22, height: 22, fontSize: "0.65rem", bgcolor: themeConfig.primary }}>
                                    {roomGuestName.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "0.82rem" }}>
                                    {roomGuestName}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontStyle: "italic" }}>
                                  &mdash; Vacant &mdash;
                                </Typography>
                              )}
                            </TableCell>

                            {/* Action */}
                            <TableCell sx={{ textAlign: "right", pr: 2.5, whiteSpace: "nowrap" }}>
                              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 0.8 }}>
                                {isAvail && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<Bolt sx={{ fontSize: 13 }} />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectRoomForCheckIn) onSelectRoomForCheckIn(room);
                                    }}
                                    sx={{
                                      borderRadius: "8px",
                                      fontWeight: 900,
                                      fontSize: "0.72rem",
                                      background: `linear-gradient(135deg, #10B981 0%, #059669 100%)`,
                                      color: "#FFFFFF",
                                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                                      px: 1.4,
                                      py: 0.3,
                                      "&:hover": { background: "#059669" },
                                    }}
                                  >
                                    Check-In
                                  </Button>
                                )}

                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<Edit sx={{ fontSize: 12 }} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenStatusDialog(room);
                                  }}
                                  sx={{
                                    borderRadius: "8px",
                                    fontWeight: 800,
                                    fontSize: "0.7rem",
                                    borderColor: themeConfig.border,
                                    color: themeConfig.textMain,
                                    "&:hover": { borderColor: themeConfig.primary, bgcolor: themeConfig.champagne },
                                  }}
                                >
                                  Status
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Table Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={filteredAllRooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                sx={{
                  borderTop: `1px solid ${themeConfig.border}`,
                  bgcolor: themeConfig.bgCard || "#FFFFFF",
                }}
              />
            </Paper>
          )}
        </Box>
      )}

      {/* ========================================================================= */}
      {/* DIALOG: QUICK ROOM STATUS CONTROL                                         */}
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
              bgcolor: themeConfig.bgCard || "#FFFFFF",
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
              Update operational or housekeeping status for Room #{statusDialog.room?.roomNumber}:
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
              <MenuItem value="CLEANING">🟡 CLEANING (Housekeeping in Progress)</MenuItem>
              <MenuItem value="OCCUPIED">🔵 OCCUPIED (In-House Guest)</MenuItem>
              <MenuItem value="MAINTENANCE">🔴 MAINTENANCE (Out of Service)</MenuItem>
              <MenuItem value="BLOCKED">⚪ BLOCKED (Locked by Admin)</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setStatusDialog({ open: false, room: null, newStatus: "AVAILABLE" })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isSubmitting}
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
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
