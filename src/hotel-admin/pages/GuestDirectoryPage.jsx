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
  Alert,
  FormControlLabel,
  Switch,
  Checkbox,
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
  KingBed,
  Check,
  ArrowForward,
  ArrowBack,
  CreditCard,
  People,
  CloudUpload,
  DocumentScanner,
  FlashOn,
  Receipt,
  Payments,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import { formatTime12Hour } from "@/shared/utils/timeUtils";
import { apiRequest, API_ENDPOINTS } from "@/config/api";

export default function GuestDirectoryPage({
  guests = [],
  rooms = [],
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
  const { themeConfig, isDarkMode } = useAppTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilterType, setDateFilterType] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Frontdesk Check-In Wizard & Multi-Room Allocation State
  const [wizardTab, setWizardTab] = useState(0);
  const [roomFloorFilter, setRoomFloorFilter] = useState("ALL");
  const [roomStatusFilter, setRoomStatusFilter] = useState("ALL");
  const [roomSearchFilter, setRoomSearchFilter] = useState("");

  // Repeat Guest Auto-Lookup State
  const [lookupSearch, setLookupSearch] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleGuestLookup = async (searchTerm) => {
    const term = searchTerm || lookupSearch || guestModal.data?.phone || guestModal.data?.name;
    if (!term || term.trim().length < 3) return;
    setLookupLoading(true);
    try {
      const res = await apiRequest(`${API_ENDPOINTS.RECEPTIONIST.GUESTS}/lookup?phone=${encodeURIComponent(term.trim())}&query=${encodeURIComponent(term.trim())}`);
      if (res && res.data) {
        setLookupResult(res.data);
        setGuestModal((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            name: res.data.fullName || prev.data.name,
            phone: res.data.mobileNumber || prev.data.phone,
            email: res.data.email || prev.data.email,
            address: res.data.address || prev.data.address,
            idType: res.data.idProof?.idType || prev.data.idType,
            idNumber: res.data.idProof?.idNumber || prev.data.idNumber,
          },
        }));
      } else {
        setLookupResult(null);
      }
    } catch {
      setLookupResult(null);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setGuestModal((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [field]: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const getRoomPrice = (r) =>
    r?.customPricePerNight || (typeof r?.roomType === "object" ? r?.roomType?.basePrice : 4000) || 4000;

  const toggleRoomSelection = (room) => {
    const currentSelected = guestModal.data?.selectedRooms || [];
    const exists = currentSelected.some(
      (r) => String(r._id || r.roomNumber) === String(room._id || room.roomNumber)
    );
    let updatedRooms;
    if (exists) {
      updatedRooms = currentSelected.filter(
        (r) => String(r._id || r.roomNumber) !== String(room._id || room.roomNumber)
      );
    } else {
      updatedRooms = [...currentSelected, room];
    }

    const cIn = guestModal.data?.checkInDate ? new Date(guestModal.data.checkInDate) : new Date();
    const cOut = guestModal.data?.checkOutDate
      ? new Date(guestModal.data.checkOutDate)
      : new Date(cIn.getTime() + 86400000);
    const stayNights = Math.max(1, Math.ceil((cOut.getTime() - cIn.getTime()) / (1000 * 60 * 60 * 24)) || 1);
    const combinedRate = updatedRooms.reduce((sum, r) => sum + getRoomPrice(r), 0);
    const totalTariff = combinedRate * stayNights;

    setGuestModal({
      ...guestModal,
      data: {
        ...guestModal.data,
        selectedRooms: updatedRooms,
        roomAssigned: updatedRooms.map((r) => r.roomNumber).join(", "),
        totalAmount: totalTariff,
      },
    });
  };

  const setStayNights = (nightsCount) => {
    const cInStr = guestModal.data?.checkInDate || todayStr;
    const cInDate = new Date(cInStr);
    const cOutDate = new Date(cInDate.getTime() + nightsCount * 86400000);
    const cOutStr = cOutDate.toISOString().split("T")[0];
    const currentSelected = guestModal.data?.selectedRooms || [];
    const combinedRate = currentSelected.reduce((sum, r) => sum + getRoomPrice(r), 0);
    const totalTariff = combinedRate * nightsCount;

    setGuestModal({
      ...guestModal,
      data: {
        ...guestModal.data,
        checkInDate: cInStr,
        checkOutDate: cOutStr,
        totalAmount: totalTariff > 0 ? totalTariff : guestModal.data?.totalAmount || 0,
      },
    });
  };

  const addAccompanyingMember = () => {
    const current = guestModal.data?.accompanyingGuests || [];
    setGuestModal({
      ...guestModal,
      data: {
        ...guestModal.data,
        accompanyingGuests: [
          ...current,
          { name: "", age: "", gender: "Male", relationship: "Family" },
        ],
      },
    });
  };

  const updateAccompanyingMember = (index, field, value) => {
    const current = [...(guestModal.data?.accompanyingGuests || [])];
    current[index] = { ...current[index], [field]: value };
    setGuestModal({
      ...guestModal,
      data: {
        ...guestModal.data,
        accompanyingGuests: current,
      },
    });
  };

  const removeAccompanyingMember = (index) => {
    const current = (guestModal.data?.accompanyingGuests || []).filter((_, i) => i !== index);
    setGuestModal({
      ...guestModal,
      data: {
        ...guestModal.data,
        accompanyingGuests: current,
      },
    });
  };

  function normalizeDate(val) {
    if (!val || val === "N/A" || val === "Not Assigned") return null;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10);
      if (trimmed.includes("/")) {
        const parts = trimmed.split("/");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = parts[1].padStart(2, "0");
          const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2].slice(0, 4);
          return `${year}-${month}-${day}`;
        }
      }
      if (/^\d{1,2}-\d{1,2}-\d{4}/.test(trimmed)) {
        const parts = trimmed.split("-");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = parts[1].padStart(2, "0");
          const year = parts[2].slice(0, 4);
          return `${year}-${month}-${day}`;
        }
      }
    }
    try {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch {}
    return null;
  }

  const totalInHouse = guests.filter((g) => g.status === "IN-HOUSE").length;
  const totalReserved = guests.filter((g) => g.status === "RESERVED").length;
  const totalCheckedOut = guests.filter((g) => g.status === "CHECKED_OUT" || g.status === "CHECKED-OUT").length;

  const filteredGuests = guests.filter((g) => {
    const q = (guestSearch || "").toLowerCase().trim();
    const matchSearch =
      !q ||
      (g.name || g.fullName || "").toLowerCase().includes(q) ||
      (g.phone || g.mobileNumber || "").includes(q) ||
      (g.email || "").toLowerCase().includes(q) ||
      (g.roomAssigned || g.room?.roomNumber || "").toString().includes(q) ||
      (g.idNumber || g.govtIdNumber || "").toLowerCase().includes(q);

    // Status Filter
    const matchStatus =
      guestFilter === "ALL" ||
      g.status === guestFilter ||
      (guestFilter === "CHECKED_OUT" && (g.status === "CHECKED-OUT" || g.status === "CHECKED_OUT"));

    // Date Filter
    const checkInNorm = normalizeDate(g.checkInDateRaw || g.checkInDate);
    const checkOutNorm = normalizeDate(g.checkOutDateRaw || g.checkOutDate);
    const createdNorm = normalizeDate(g.createdAt);

    let matchDate = true;

    if (dateFilterType === "CHECK_IN_TODAY") {
      matchDate = checkInNorm === todayStr;
    } else if (dateFilterType === "CHECK_OUT_TODAY") {
      matchDate = checkOutNorm === todayStr;
    } else if (dateFilterType === "THIS_MONTH") {
      const currentMonth = todayStr.slice(0, 7);
      matchDate =
        (checkInNorm && checkInNorm.startsWith(currentMonth)) ||
        (createdNorm && createdNorm.startsWith(currentMonth));
    } else if (dateFilterType === "CUSTOM" || startDate || endDate) {
      const guestStart = checkInNorm || createdNorm;
      const guestEnd = checkOutNorm || checkInNorm || createdNorm;

      if (startDate && endDate) {
        matchDate = Boolean(guestStart && guestEnd && guestStart <= endDate && guestEnd >= startDate);
      } else if (startDate) {
        matchDate = Boolean((guestEnd && guestEnd >= startDate) || (guestStart && guestStart >= startDate));
      } else if (endDate) {
        matchDate = Boolean(guestStart && guestStart <= endDate);
      }
    }

    return matchSearch && matchStatus && matchDate;
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
            onClick={() => {
              setWizardTab(0);
              const availableRoom = rooms.find((r) => r.status === "AVAILABLE") || rooms[0];
              const initialRooms = availableRoom ? [availableRoom] : [];
              const baseRate = availableRoom ? getRoomPrice(availableRoom) : 4000;
              setGuestModal({
                open: true,
                mode: "ADD",
                data: {
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  idType: "AADHAAR",
                  idNumber: "",
                  selectedRooms: initialRooms,
                  roomAssigned: availableRoom ? String(availableRoom.roomNumber) : "",
                  checkInDate: todayStr,
                  checkOutDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                  totalAmount: baseRate,
                  advancePaid: 0,
                  paymentMethod: "CASH",
                  status: "IN-HOUSE",
                  accompanyingGuests: [],
                },
              });
            }}
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
              boxShadow: isDarkMode
                ? "0 6px 16px rgba(0,0,0,0.3)"
                : "0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 #FFFFFF",
              "&:hover": {
                bgcolor: isDarkMode ? "rgba(255,255,255,0.2)" : "#F8FAFC",
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
          p: 2.2,
          mb: 3.5,
          borderRadius: "18px",
          bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
          border: `1.5px solid ${themeConfig.border}`,
          boxShadow: isDarkMode
            ? "0 8px 24px -4px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Row 1: Search & Status Filter Chips */}
        <Box
          sx={{
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
        </Box>

        <Divider sx={{ borderColor: themeConfig.border }} />

        {/* Row 2: Date-Wise Filtering Controls */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          {/* Quick Date Presets */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mr: 0.5 }}>
              <CalendarMonth sx={{ fontSize: 18, color: themeConfig.primary }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, textTransform: "uppercase", fontSize: "0.72rem" }}>
                Stay Date:
              </Typography>
            </Box>

            {[
              { id: "ALL", label: "All Dates" },
              { id: "CHECK_IN_TODAY", label: "Today Check-ins" },
              { id: "CHECK_OUT_TODAY", label: "Today Check-outs" },
              { id: "THIS_MONTH", label: "This Month" },
              { id: "CUSTOM", label: "Custom Range" },
            ].map((preset) => {
              const isSelected = dateFilterType === preset.id;
              return (
                <Chip
                  key={preset.id}
                  label={preset.label}
                  clickable
                  onClick={() => {
                    setDateFilterType(preset.id);
                    if (preset.id !== "CUSTOM") {
                      setStartDate("");
                      setEndDate("");
                    }
                  }}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    borderRadius: "8px",
                    fontSize: "0.72rem",
                    bgcolor: isSelected ? (themeConfig.primaryLight || themeConfig.primary) : "transparent",
                    color: isSelected ? "#FFFFFF" : themeConfig.textMuted,
                    border: `1px solid ${isSelected ? themeConfig.primary : themeConfig.border}`,
                    "&:hover": {
                      bgcolor: themeConfig.champagne,
                      color: themeConfig.primaryDark,
                    },
                  }}
                />
              );
            })}
          </Box>

          {/* Date Picker Inputs */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                From:
              </Typography>
              <TextField
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDateFilterType("CUSTOM");
                }}
                sx={{
                  width: 145,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: "0.78rem",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                To:
              </Typography>
              <TextField
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDateFilterType("CUSTOM");
                }}
                sx={{
                  width: 145,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: "0.78rem",
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  },
                }}
              />
            </Box>

            {(startDate || endDate || dateFilterType !== "ALL") && (
              <Button
                size="small"
                variant="text"
                startIcon={<Close sx={{ fontSize: 14 }} />}
                onClick={() => {
                  setDateFilterType("ALL");
                  setStartDate("");
                  setEndDate("");
                }}
                sx={{
                  color: themeConfig.danger,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  py: 0.5,
                  px: 1,
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" },
                }}
              >
                Reset Dates
              </Button>
            )}
          </Box>
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
                          onClick={() => {
                            setWizardTab(0);
                            const cIn = guest.checkInDateRaw
                              ? new Date(guest.checkInDateRaw).toISOString().split("T")[0]
                              : normalizeDate(guest.checkInDate) || todayStr;
                            const cOut = guest.checkOutDateRaw
                              ? new Date(guest.checkOutDateRaw).toISOString().split("T")[0]
                              : normalizeDate(guest.checkOutDate) || new Date(Date.now() + 86400000).toISOString().split("T")[0];

                            let matchedRooms = [];
                            if (Array.isArray(guest.roomIds) && guest.roomIds.length > 0) {
                              matchedRooms = rooms.filter((r) => guest.roomIds.some((id) => String(id) === String(r._id)));
                            } else if (guest.roomAssigned && guest.roomAssigned !== "Not Assigned" && guest.roomAssigned !== "N/A") {
                              const numList = String(guest.roomAssigned).split(",").map((s) => s.trim());
                              matchedRooms = rooms.filter((r) => numList.includes(String(r.roomNumber)));
                            }

                            setGuestModal({
                              open: true,
                              mode: "EDIT",
                              data: {
                                ...guest,
                                name: guest.name || guest.fullName || "",
                                phone: guest.phone || guest.mobileNumber || "",
                                email: guest.email || "",
                                address: guest.address || "",
                                idType: guest.idType || "AADHAAR",
                                idNumber: guest.idNumber === "N/A" || guest.idNumber === "PENDING" ? "" : guest.idNumber,
                                selectedRooms: matchedRooms,
                                roomAssigned: guest.roomAssigned === "Not Assigned" || guest.roomAssigned === "N/A" ? "" : guest.roomAssigned,
                                status: guest.status || "IN-HOUSE",
                                checkInDate: cIn,
                                checkOutDate: cOut,
                                totalAmount: guest.totalAmount || 0,
                                advancePaid: guest.paidAmount || 0,
                                paymentMethod: "CASH",
                                accompanyingGuests: Array.isArray(guest.accompanyingGuests) ? guest.accompanyingGuests : [],
                              },
                            });
                          }}
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
            bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
            borderRadius: "0 0 20px 20px",
            mb: 4,
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 3D FRONTDESK CHECK-IN & MULTI-ROOM WIZARD MODAL                           */}
      {/* ========================================================================= */}
      <Dialog
        open={guestModal.open}
        onClose={() => setGuestModal({ ...guestModal, open: false })}
        maxWidth="lg"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: 0,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: isDarkMode ? "0 25px 60px rgba(0,0,0,0.7)" : "0 25px 60px rgba(0,0,0,0.22)",
              overflow: "hidden",
            },
          },
        }}
      >
        <form onSubmit={onSaveGuest}>
          {/* Header Ribbon */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3 },
              background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, zIndex: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <MeetingRoom sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.2 }}>
                    {guestModal.mode === "ADD" ? "Front Desk Guest Check-In & Multi-Room Allocation" : `Edit Guest Record: ${guestModal.data?.name || "Guest"}`}
                  </Typography>
                  <Chip
                    label={guestModal.mode === "ADD" ? "NEW CHECK-IN" : "EDIT FOLIO"}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "0.68rem",
                      borderRadius: "6px",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
                  <span>🏨 Front Desk Operations</span>
                  <span>&bull;</span>
                  <span>Standard Check-In: {formatTime12Hour(hotelSettings.checkInTime)}</span>
                  <span>&bull;</span>
                  <span>Standard Check-Out: {formatTime12Hour(hotelSettings.checkOutTime)}</span>
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => setGuestModal({ ...guestModal, open: false })}
              sx={{ color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.15)", borderRadius: "10px", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Frontdesk Wizard Segmented Tabs */}
          <Box
            sx={{
              display: "flex",
              borderBottom: `1px solid ${themeConfig.border}`,
              bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : themeConfig.champagne,
              px: { xs: 1.5, sm: 3 },
              py: 1,
              gap: 1,
              overflowX: "auto",
            }}
          >
            {[
              { id: 0, label: "1. Guest Profile & ID KYC", icon: <Person fontSize="small" /> },
              {
                id: 1,
                label: `2. Multi-Room Allocation (${(guestModal.data?.selectedRooms || []).length} Selected)`,
                icon: <MeetingRoom fontSize="small" />,
              },
              { id: 2, label: "3. Tariff, Advance & Members", icon: <CreditCard fontSize="small" /> },
            ].map((tab) => {
              const active = wizardTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setWizardTab(tab.id)}
                  startIcon={tab.icon}
                  variant={active ? "contained" : "text"}
                  className={active ? "btn-3d" : ""}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    textTransform: "none",
                    px: 2,
                    py: 0.8,
                    bgcolor: active ? (themeConfig.primaryDark || "#0C273B") : "transparent",
                    color: active ? "#FFFFFF" : themeConfig.textMain,
                    boxShadow: active ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
                    "&:hover": {
                      bgcolor: active ? themeConfig.primaryDark : "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Box>

          <DialogContent sx={{ p: { xs: 2, sm: 3 }, maxHeight: "calc(82vh - 160px)", overflowY: "auto" }}>
            {/* ========================================================================= */}
            {/* TAB 0: GUEST PROFILE & ID KYC                                            */}
            {/* ========================================================================= */}
            {wizardTab === 0 && (
              <Grid container spacing={2.5}>
                {/* VIP / Repeat Guest Lookup Bar */}
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "16px",
                      bgcolor: isDarkMode ? "rgba(11, 142, 224, 0.12)" : "#EBF5FF",
                      border: `1px solid ${themeConfig.primary}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 260 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primaryDark, display: "block", mb: 0.5 }}>
                        ⚡ Repeat Guest Intelligent Auto-Lookup
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Type guest mobile or name to auto-fill..."
                        value={lookupSearch}
                        onChange={(e) => setLookupSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleGuestLookup(lookupSearch);
                          }
                        }}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search sx={{ color: themeConfig.primary, fontSize: 18 }} />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.05)" : "#FFFFFF", fontSize: "0.82rem" } }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleGuestLookup(lookupSearch)}
                      disabled={lookupLoading}
                      className="btn-3d"
                      sx={{
                        borderRadius: "10px",
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        textTransform: "none",
                        px: 2.5,
                        py: 0.9,
                        bgcolor: themeConfig.primaryDark || "#0C273B",
                        color: "#FFFFFF",
                        mt: { xs: 0, sm: 2.3 },
                      }}
                    >
                      {lookupLoading ? "Looking up..." : "🔍 Auto-Lookup"}
                    </Button>
                  </Box>

                  {lookupResult && (
                    <Alert
                      severity="success"
                      sx={{ mt: 1.5, borderRadius: "12px", border: `1px solid ${themeConfig.success}` }}
                    >
                      ✨ <strong>Repeat Guest Profile Found:</strong> {lookupResult.fullName} ({lookupResult.totalVisits} Prior Stays). Auto-populated contact details &amp; Govt ID KYC!
                    </Alert>
                  )}
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primaryDark, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.75rem" }}>
                    👤 Guest Personal Details
                  </Typography>
                  <Divider sx={{ mt: 0.5, mb: 1.5, borderColor: themeConfig.border }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                    Full Legal Name *
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
                    Contact Phone / Mobile *
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

                <Grid size={{ xs: 12, sm: 4 }}>
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

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                    Gender
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={guestModal.data?.gender || "Male"}
                    onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, gender: e.target.value } })}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                    City / Residential Address
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={guestModal.data?.address || ""}
                    onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, address: e.target.value } })}
                    placeholder="e.g. Mumbai, Maharashtra"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                </Grid>

                {/* ID Proof KYC Section */}
                <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primaryDark, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.75rem" }}>
                    🛡️ Govt ID Proof &amp; KYC Compliance
                  </Typography>
                  <Divider sx={{ mt: 0.5, mb: 1.5, borderColor: themeConfig.border }} />
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
                    <MenuItem value="VOTER_ID">Voter ID Card</MenuItem>
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

                {/* ID Photo Upload Cards */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      border: `1px dashed ${themeConfig.border}`,
                      bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : "#FAFAFA",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "block", mb: 1 }}>
                      📄 ID Document Front Photo
                    </Typography>
                    {guestModal.data?.frontImage ? (
                      <Box sx={{ position: "relative", display: "inline-block" }}>
                        <img
                          src={guestModal.data.frontImage}
                          alt="ID Front"
                          style={{ maxWidth: "100%", maxHeight: 120, borderRadius: 8, objectFit: "contain" }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => setGuestModal({ ...guestModal, data: { ...guestModal.data, frontImage: "" } })}
                          sx={{ position: "absolute", top: -8, right: -8, bgcolor: themeConfig.danger, color: "#FFF", "&:hover": { bgcolor: themeConfig.danger } }}
                        >
                          <Close sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        startIcon={<CloudUpload />}
                        sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", fontSize: "0.75rem" }}
                      >
                        Upload Front Image
                        <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, "frontImage")} />
                      </Button>
                    )}
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      border: `1px dashed ${themeConfig.border}`,
                      bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : "#FAFAFA",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "block", mb: 1 }}>
                      📄 ID Document Back Photo
                    </Typography>
                    {guestModal.data?.backImage ? (
                      <Box sx={{ position: "relative", display: "inline-block" }}>
                        <img
                          src={guestModal.data.backImage}
                          alt="ID Back"
                          style={{ maxWidth: "100%", maxHeight: 120, borderRadius: 8, objectFit: "contain" }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => setGuestModal({ ...guestModal, data: { ...guestModal.data, backImage: "" } })}
                          sx={{ position: "absolute", top: -8, right: -8, bgcolor: themeConfig.danger, color: "#FFF", "&:hover": { bgcolor: themeConfig.danger } }}
                        >
                          <Close sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        startIcon={<CloudUpload />}
                        sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", fontSize: "0.75rem" }}
                      >
                        Upload Back Image
                        <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, "backImage")} />
                      </Button>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}

            {/* ========================================================================= */}
            {/* TAB 1: FRONTDESK MULTI-ROOM ALLOCATION & STAY SCHEDULE                   */}
            {/* ========================================================================= */}
            {wizardTab === 1 && (
              <Box>
                {/* Stay Schedule Control Bar */}
                <Paper
                  className="card-3d"
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: "16px",
                    border: `1px solid ${themeConfig.border}`,
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : themeConfig.champagne,
                  }}
                >
                  <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.6, display: "block" }}>
                        Check-in Date &bull; Time
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        value={guestModal.data?.checkInDate || ""}
                        onChange={(e) => {
                          const newCheckIn = e.target.value;
                          const cIn = newCheckIn ? new Date(newCheckIn) : new Date();
                          const cOut = guestModal.data?.checkOutDate ? new Date(guestModal.data.checkOutDate) : new Date(cIn.getTime() + 86400000);
                          const stayNights = Math.max(1, Math.ceil((cOut.getTime() - cIn.getTime()) / (1000 * 60 * 60 * 24)) || 1);
                          const selectedRoomList = guestModal.data?.selectedRooms || [];
                          const combinedRate = selectedRoomList.reduce((sum, r) => sum + getRoomPrice(r), 0);

                          setGuestModal({
                            ...guestModal,
                            data: {
                              ...guestModal.data,
                              checkInDate: newCheckIn,
                              totalAmount: combinedRate * stayNights,
                            },
                          });
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "#FFFFFF" } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.6, display: "block" }}>
                        Check-out Date &bull; Time
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        value={guestModal.data?.checkOutDate || ""}
                        onChange={(e) => {
                          const newCheckOut = e.target.value;
                          const cIn = guestModal.data?.checkInDate ? new Date(guestModal.data.checkInDate) : new Date();
                          const cOut = newCheckOut ? new Date(newCheckOut) : new Date(cIn.getTime() + 86400000);
                          const stayNights = Math.max(1, Math.ceil((cOut.getTime() - cIn.getTime()) / (1000 * 60 * 60 * 24)) || 1);
                          const selectedRoomList = guestModal.data?.selectedRooms || [];
                          const combinedRate = selectedRoomList.reduce((sum, r) => sum + getRoomPrice(r), 0);

                          setGuestModal({
                            ...guestModal,
                            data: {
                              ...guestModal.data,
                              checkOutDate: newCheckOut,
                              totalAmount: combinedRate * stayNights,
                            },
                          });
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "#FFFFFF" } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.6, display: "block" }}>
                        Stay Status
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={guestModal.data?.status || "IN-HOUSE"}
                        onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, status: e.target.value } })}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.04)" : "#FFFFFF" } }}
                      >
                        <MenuItem value="IN-HOUSE">🟢 In-House Active (Immediate Check-In)</MenuItem>
                        <MenuItem value="RESERVED">🟡 Advance Reserved (Confirmed Booking)</MenuItem>
                        <MenuItem value="CHECKED_OUT">⚪ Checked Out (Departed)</MenuItem>
                      </TextField>
                    </Grid>

                    {/* Quick Stay Presets */}
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted }}>
                          ⚡ Quick Stay Presets:
                        </Typography>
                        {[1, 2, 3, 5, 7, 14].map((n) => (
                          <Chip
                            key={n}
                            label={`+${n} Night${n > 1 ? "s" : ""}`}
                            size="small"
                            onClick={() => setStayNights(n)}
                            clickable
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.7rem",
                              borderRadius: "8px",
                              bgcolor: isDarkMode ? "rgba(255,255,255,0.08)" : "#FFFFFF",
                              border: `1px solid ${themeConfig.border}`,
                              "&:hover": { bgcolor: themeConfig.primaryGlow, borderColor: themeConfig.primary },
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Selected Rooms Banner */}
                <Box
                  sx={{
                    mb: 2.5,
                    p: 2,
                    borderRadius: "16px",
                    bgcolor: (guestModal.data?.selectedRooms || []).length > 0 ? (isDarkMode ? "rgba(11, 142, 224, 0.15)" : "#EBF5FF") : (isDarkMode ? "rgba(255,255,255,0.03)" : "#F9FAFB"),
                    border: `1px solid ${(guestModal.data?.selectedRooms || []).length > 0 ? themeConfig.primary : themeConfig.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MeetingRoom sx={{ color: themeConfig.primary, fontSize: 20 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                        Allocated Room(s): {(guestModal.data?.selectedRooms || []).length} Room(s) Selected
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mt: 1 }}>
                      {(guestModal.data?.selectedRooms || []).length === 0 ? (
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontStyle: "italic" }}>
                          No rooms selected yet. Click any room card below to allocate to this guest.
                        </Typography>
                      ) : (
                        (guestModal.data?.selectedRooms || []).map((r) => (
                          <Chip
                            key={r._id || r.roomNumber}
                            label={`Room #${r.roomNumber} • ${r.roomType?.name || "Standard"} (₹${getRoomPrice(r)}/nt)`}
                            onDelete={() => toggleRoomSelection(r)}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 800, borderRadius: "8px" }}
                          />
                        ))
                      )}
                    </Box>
                  </Box>

                  {(guestModal.data?.selectedRooms || []).length > 0 && (
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                        Combined Rate
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.primaryDark }}>
                        ₹{(guestModal.data?.selectedRooms || []).reduce((sum, r) => sum + getRoomPrice(r), 0).toLocaleString("en-IN")}{" "}
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>/ night</span>
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Room Filters: Floor & Status & Search */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted }}>
                      Floor:
                    </Typography>
                    {["ALL", ...Array.from(new Set(rooms.map((r) => String(r.floor || 1)))).sort()].map((fl) => (
                      <Chip
                        key={fl}
                        label={fl === "ALL" ? "All Floors" : `Floor ${fl}`}
                        size="small"
                        onClick={() => setRoomFloorFilter(fl)}
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.72rem",
                          borderRadius: "8px",
                          bgcolor: roomFloorFilter === fl ? (themeConfig.primaryDark || "#0C273B") : "transparent",
                          color: roomFloorFilter === fl ? "#FFFFFF" : themeConfig.textMain,
                          border: `1px solid ${roomFloorFilter === fl ? themeConfig.primaryDark : themeConfig.border}`,
                          cursor: "pointer",
                        }}
                      />
                    ))}

                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, ml: 1 }}>
                      Status:
                    </Typography>
                    {[
                      { val: "ALL", label: "All" },
                      { val: "AVAILABLE", label: "🟢 Available" },
                      { val: "OCCUPIED", label: "🔴 Occupied" },
                    ].map((st) => (
                      <Chip
                        key={st.val}
                        label={st.label}
                        size="small"
                        onClick={() => setRoomStatusFilter(st.val)}
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.72rem",
                          borderRadius: "8px",
                          bgcolor: roomStatusFilter === st.val ? (themeConfig.primaryDark || "#0C273B") : "transparent",
                          color: roomStatusFilter === st.val ? "#FFFFFF" : themeConfig.textMain,
                          border: `1px solid ${roomStatusFilter === st.val ? themeConfig.primaryDark : themeConfig.border}`,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Box>

                  <TextField
                    size="small"
                    placeholder="Search Room # or Type..."
                    value={roomSearchFilter}
                    onChange={(e) => setRoomSearchFilter(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ fontSize: 16, color: themeConfig.textMuted }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ width: 200, "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.78rem" } }}
                  />
                </Box>

                {/* Interactive Multi-Room Grid */}
                <Grid container spacing={1.8}>
                  {rooms
                    .filter((r) => {
                      const matchFloor = roomFloorFilter === "ALL" || String(r.floor) === String(roomFloorFilter);
                      const matchStatus = roomStatusFilter === "ALL" || r.status === roomStatusFilter;
                      const matchSearch =
                        !roomSearchFilter ||
                        String(r.roomNumber).toLowerCase().includes(roomSearchFilter.toLowerCase()) ||
                        (r.roomType?.name || "").toLowerCase().includes(roomSearchFilter.toLowerCase());
                      return matchFloor && matchStatus && matchSearch;
                    })
                    .sort((a, b) => (a.status === "AVAILABLE" ? -1 : 1))
                    .map((room) => {
                      const isSelected = (guestModal.data?.selectedRooms || []).some(
                        (r) => String(r._id || r.roomNumber) === String(room._id || room.roomNumber)
                      );
                      const isAvailable = room.status === "AVAILABLE";
                      const rate = getRoomPrice(room);

                      return (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={room._id || room.roomNumber}>
                          <Paper
                            onClick={() => toggleRoomSelection(room)}
                            className="card-3d"
                            sx={{
                              p: 1.8,
                              borderRadius: "16px",
                              border: isSelected
                                ? `2px solid ${themeConfig.primary}`
                                : `1px solid ${themeConfig.border}`,
                              bgcolor: isSelected
                                ? (isDarkMode ? "rgba(11, 142, 224, 0.18)" : "#EFF6FF")
                                : (isDarkMode ? "rgba(255,255,255,0.03)" : "#FFFFFF"),
                              boxShadow: isSelected
                                ? `0 8px 20px ${themeConfig.primaryGlow}`
                                : "0 2px 8px rgba(0,0,0,0.04)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              position: "relative",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                borderColor: themeConfig.primary,
                              },
                            }}
                          >
                            {/* Selection Checkmark */}
                            {isSelected && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  bgcolor: themeConfig.primary,
                                  color: "#FFFFFF",
                                  borderRadius: "50%",
                                  width: 22,
                                  height: 22,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                }}
                              >
                                <Check sx={{ fontSize: 14 }} />
                              </Box>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1 }}>
                                #{room.roomNumber}
                              </Typography>
                              <Chip
                                label={room.status}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.62rem",
                                  fontWeight: 800,
                                  borderRadius: "6px",
                                  bgcolor: isAvailable ? "#DCFCE7" : room.status === "OCCUPIED" ? "#FEE2E2" : "#FEF3C7",
                                  color: isAvailable ? "#166534" : room.status === "OCCUPIED" ? "#991B1B" : "#B45309",
                                }}
                              />
                            </Box>

                            <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted, display: "block", noWrap: true }}>
                              {room.roomType?.name || "Standard Room"} &bull; Floor {room.floor || 1}
                            </Typography>

                            <Divider sx={{ my: 1, borderColor: themeConfig.border }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.4 }}>
                                <KingBed sx={{ fontSize: 14 }} />
                                {room.bedType || "1 Bed"}
                              </Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark }}>
                                ₹{rate.toLocaleString("en-IN")}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: TARIFF, ADVANCE SETTLEMENT & ACCOMPANYING MEMBERS                  */}
            {/* ========================================================================= */}
            {wizardTab === 2 && (
              <Grid container spacing={2.5}>
                {/* Financial Summary Breakdown */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Paper
                    className="card-3d"
                    sx={{
                      p: 2.5,
                      borderRadius: "18px",
                      border: `1px solid ${themeConfig.border}`,
                      bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : themeConfig.champagne,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primaryDark, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.75rem", mb: 1.5 }}>
                      💳 Stay Tariff &amp; Billing Calculation
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                          Selected Rooms Count:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          {(guestModal.data?.selectedRooms || []).length} Room(s)
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                          Stay Duration:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          {Math.max(
                            1,
                            Math.ceil(
                              (new Date(guestModal.data?.checkOutDate || "").getTime() -
                                new Date(guestModal.data?.checkInDate || "").getTime()) /
                                (1000 * 60 * 60 * 24)
                            ) || 1
                          )}{" "}
                          Night(s)
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                          Combined Nightly Rate:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          ₹{(guestModal.data?.selectedRooms || []).reduce((sum, r) => sum + getRoomPrice(r), 0).toLocaleString("en-IN")}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 0.5, borderColor: themeConfig.border }} />

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                          Total Stay Bill / Tariff (₹):
                        </Typography>
                        <TextField
                          size="small"
                          type="number"
                          value={guestModal.data?.totalAmount ?? ""}
                          onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, totalAmount: e.target.value } })}
                          sx={{ width: 140, "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: 800, fontSize: "1rem" } }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                          Discount (₹):
                        </Typography>
                        <TextField
                          size="small"
                          type="number"
                          value={guestModal.data?.discountAmount ?? ""}
                          onChange={(e) => {
                            const disc = Number(e.target.value) || 0;
                            const currentSelected = guestModal.data?.selectedRooms || [];
                            const cIn = guestModal.data?.checkInDate ? new Date(guestModal.data.checkInDate) : new Date();
                            const cOut = guestModal.data?.checkOutDate ? new Date(guestModal.data.checkOutDate) : new Date(cIn.getTime() + 86400000);
                            const stayNights = Math.max(1, Math.ceil((cOut.getTime() - cIn.getTime()) / (1000 * 60 * 60 * 24)) || 1);
                            const combinedRate = currentSelected.reduce((sum, r) => sum + getRoomPrice(r), 0);
                            const baseTariff = combinedRate * stayNights;
                            setGuestModal({
                              ...guestModal,
                              data: {
                                ...guestModal.data,
                                discountAmount: disc,
                                totalAmount: Math.max(0, baseTariff - disc),
                              },
                            });
                          }}
                          placeholder="0"
                          sx={{ width: 140, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                          Advance Paid at Check-in (₹):
                        </Typography>
                        <TextField
                          size="small"
                          type="number"
                          value={guestModal.data?.advancePaid ?? ""}
                          onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, advancePaid: e.target.value } })}
                          placeholder="0"
                          sx={{ width: 140, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                          Payment Method:
                        </Typography>
                        <TextField
                          select
                          size="small"
                          value={guestModal.data?.paymentMethod || "UPI"}
                          onChange={(e) => setGuestModal({ ...guestModal, data: { ...guestModal.data, paymentMethod: e.target.value } })}
                          sx={{ width: 140, "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.8rem" } }}
                        >
                          <MenuItem value="UPI">⚡ UPI / QR</MenuItem>
                          <MenuItem value="CASH">💵 Cash</MenuItem>
                          <MenuItem value="CARD">💳 Card</MenuItem>
                          <MenuItem value="NET_BANKING">🏦 Net Banking</MenuItem>
                        </TextField>
                      </Box>

                      <Box
                        sx={{
                          p: 1.5,
                          mt: 1,
                          borderRadius: "12px",
                          bgcolor: isDarkMode ? "rgba(0,0,0,0.3)" : "#FFFFFF",
                          border: `1px solid ${themeConfig.border}`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          Balance Due Amount:
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 900,
                            color:
                              Number(guestModal.data?.totalAmount || 0) - Number(guestModal.data?.advancePaid || 0) > 0
                                ? themeConfig.danger
                                : themeConfig.success,
                          }}
                        >
                          ₹{Math.max(0, Number(guestModal.data?.totalAmount || 0) - Number(guestModal.data?.advancePaid || 0)).toLocaleString("en-IN")}
                        </Typography>
                      </Box>

                      <FormControlLabel
                        control={<Checkbox defaultChecked size="small" />}
                        label={
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
                            Guest has presented valid Govt Photo ID and agreed to hotel check-in terms.
                          </Typography>
                        }
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                {/* Accompanying Guests / Members */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Paper
                    className="card-3d"
                    sx={{
                      p: 2.5,
                      borderRadius: "18px",
                      border: `1px solid ${themeConfig.border}`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primaryDark, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.75rem" }}>
                        👥 Accompanying Members
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<Add />}
                        onClick={addAccompanyingMember}
                        sx={{ fontWeight: 800, fontSize: "0.72rem", textTransform: "none" }}
                      >
                        Add Member
                      </Button>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
                      {(guestModal.data?.accompanyingGuests || []).length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4, color: themeConfig.textMuted }}>
                          <People sx={{ fontSize: 32, opacity: 0.4, mb: 0.5 }} />
                          <Typography variant="caption" sx={{ display: "block" }}>
                            No accompanying guests added yet. Click &ldquo;+ Add Member&rdquo; to add family members.
                          </Typography>
                        </Box>
                      ) : (
                        (guestModal.data?.accompanyingGuests || []).map((m, idx) => (
                          <Paper
                            key={idx}
                            sx={{
                              p: 1.2,
                              borderRadius: "10px",
                              border: `1px solid ${themeConfig.border}`,
                              bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : "#FAFAFA",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Member Name"
                                value={m.name || ""}
                                onChange={(e) => updateAccompanyingMember(idx, "name", e.target.value)}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.8rem" } }}
                              />
                              <IconButton size="small" onClick={() => removeAccompanyingMember(idx)} sx={{ color: themeConfig.danger }}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <TextField
                                size="small"
                                placeholder="Age"
                                type="number"
                                value={m.age || ""}
                                onChange={(e) => updateAccompanyingMember(idx, "age", e.target.value)}
                                sx={{ width: 70, "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.78rem" } }}
                              />
                              <TextField
                                select
                                size="small"
                                value={m.relationship || "Family"}
                                onChange={(e) => updateAccompanyingMember(idx, "relationship", e.target.value)}
                                sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.78rem" } }}
                              >
                                <MenuItem value="Spouse">Spouse</MenuItem>
                                <MenuItem value="Child">Child</MenuItem>
                                <MenuItem value="Parent">Parent</MenuItem>
                                <MenuItem value="Family">Family Member</MenuItem>
                                <MenuItem value="Friend">Friend</MenuItem>
                                <MenuItem value="Colleague">Colleague</MenuItem>
                              </TextField>
                            </Box>
                          </Paper>
                        ))
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </DialogContent>

          {/* Footer Actions */}
          <DialogActions sx={{ p: 2.5, px: 3, borderTop: `1px solid ${themeConfig.border}`, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button onClick={() => setGuestModal({ ...guestModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
                Cancel
              </Button>
              {wizardTab > 0 && (
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => setWizardTab((prev) => prev - 1)}
                  sx={{ borderRadius: "10px", fontWeight: 700 }}
                >
                  Previous
                </Button>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              {wizardTab < 2 && (
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => setWizardTab((prev) => prev + 1)}
                  variant="outlined"
                  sx={{ borderRadius: "12px", fontWeight: 800, px: 2.5 }}
                >
                  Next Step
                </Button>
              )}

              <Button
                type="submit"
                variant="contained"
                className="btn-3d"
                startIcon={<CheckCircle />}
                sx={{
                  background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                  color: "#FFFFFF",
                  fontWeight: 800,
                  borderRadius: "12px",
                  px: 3.5,
                  py: 1,
                  boxShadow: `0 4px 16px ${themeConfig.primaryGlow}`,
                }}
              >
                {guestModal.mode === "ADD" ? "⚡ Complete Check-In & Save" : "Save Changes"}
              </Button>
            </Box>
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
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: isDarkMode ? "0 20px 50px rgba(0,0,0,0.6)" : "0 20px 50px rgba(0,0,0,0.18)",
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
                    bgcolor: isDarkMode ? "rgba(255,255,255,0.15)" : "#FFFFFF",
                    color: isDarkMode ? "#FFFFFF" : themeConfig.primaryDark,
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
