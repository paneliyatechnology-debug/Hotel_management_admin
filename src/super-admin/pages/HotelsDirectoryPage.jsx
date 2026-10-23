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
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Drawer,
  Divider,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search,
  CheckCircle,
  Block,
  Delete,
  HourglassEmpty,
  Visibility,
  Close,
  WarningAmber,
  Email,
  Phone,
  LocationOn,
  Security,
  CloudDone,
  Storage,
  Dns,
  AttachMoney,
  Key,
  SupportAgent,
  Receipt,
  People,
  MeetingRoom,
  Lan,
  ShieldOutlined,
  Bolt,
  Edit,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { usePresence } from "@/shared/context/SocketContext";
import PresenceBadge from "@/shared/components/PresenceBadge";
import EmptyState from "@/shared/components/EmptyState";
import LoadingState from "@/shared/components/LoadingState";
import { useLiveCountdown } from "@/shared/utils/countdown";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { toast } from "@/shared/utils/toast";

function TrialTimeCell({ trialEndDate, status, themeConfig }) {
  const countdown = useLiveCountdown(trialEndDate);
  if (!trialEndDate) {
    return <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.73rem", fontWeight: 600 }}>Subscription Active</Typography>;
  }

  const d = new Date(trialEndDate);
  const formattedDateTime = d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  if (countdown.isExpired || status === "EXPIRED") {
    return (
      <Typography variant="caption" sx={{ color: themeConfig.danger, fontSize: "0.73rem", fontWeight: 700 }}>
        Expired ({formattedDateTime})
      </Typography>
    );
  }

  return (
    <Typography variant="caption" sx={{ color: themeConfig.primaryDark, fontSize: "0.73rem", fontWeight: 700 }}>
      ⏳ {countdown.formatted} ({formattedDateTime})
    </Typography>
  );
}
const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "—";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch {
    return "—";
  }
};

export default function HotelsDirectoryPage({
  hotels = [],
  loading,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  selectedHotel,
  setSelectedHotel,
  drawerOpen,
  setDrawerOpen,
  drawerTab,
  setDrawerTab,
  onOpenActionDialog,
  onEditHotel,
  onExtendTrial,
  onRefresh,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();
  const { isHotelOnline } = usePresence();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("NEWEST");
  const [addOpen, setAddOpen] = useState(false);
  const [hotelStep, setHotelStep] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [savingHotel, setSavingHotel] = useState(false);
  const emptyHotel = {
    name: "",
    hotel_type: "",
    custom_hotel_type: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    total_rooms: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gst_number: "",
    pan_number: "",
  };
  const [hotelForm, setHotelForm] = useState(emptyHotel);
  const setField = (key, value) => setHotelForm((prev) => ({ ...prev, [key]: value }));

  const saveHotel = async () => {
    const name = hotelForm.name.trim();
    const ownerName = hotelForm.owner_name.trim();
    const email = hotelForm.owner_email.trim().toLowerCase();
    const phone = hotelForm.owner_phone.replace(/\D/g, "").slice(-10);
    const rooms = Number(hotelForm.total_rooms);
    const pin = hotelForm.pincode.replace(/\D/g, "");
    if (!editingId && (!hotelForm.hotel_type.trim() || (hotelForm.hotel_type === "Custom" && !hotelForm.custom_hotel_type.trim()) || !ownerName || !email || phone.length !== 10)) {
      toast.error("Fill hotel type, owner name, email, and a 10-digit phone.");
      return;
    }
    if (!name || !hotelForm.address.trim() || !hotelForm.city.trim() || !hotelForm.state.trim() || pin.length !== 6) {
      toast.error("Fill hotel name, type, owner, email, 10-digit phone, rooms, address, city, state, and 6-digit pincode.");
      return;
    }
    const body = {
      name,
      hotel_type: hotelForm.hotel_type === "Custom" ? hotelForm.custom_hotel_type.trim() : hotelForm.hotel_type.trim(),
      owner_name: ownerName,
      owner_email: email,
      owner_phone: phone,
      total_rooms: rooms,
      website: hotelForm.website.trim(),
      address: hotelForm.address.trim(),
      city: hotelForm.city.trim(),
      state: hotelForm.state.trim(),
      country: "India",
      pincode: pin,
    };
    if (editingId) {
      delete body.owner_name;
      delete body.owner_email;
      delete body.owner_phone;
    }
    const gst = hotelForm.gst_number.trim().toUpperCase();
    const pan = hotelForm.pan_number.trim().toUpperCase();
    if (gst) body.gst_number = gst;
    if (pan) body.pan_number = pan;
    try {
      setSavingHotel(true);
      if (editingId) {
        await apiRequest(API_ENDPOINTS.HOTELS.UPDATE(editingId), { method: "PUT", body });
        toast.success("Hotel updated.");
      } else {
        await apiRequest(API_ENDPOINTS.HOTELS.ALL, { method: "POST", body });
        toast.success("Hotel created.");
      }
      setAddOpen(false);
      setEditingId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err?.message || "Could not register the hotel.");
    } finally {
      setSavingHotel(false);
    }
  };

  const openEdit = (hotel) => {
    setEditingId(hotel._id || hotel.id);
    setHotelStep(0);
    const knownTypes = ["Luxury Boutique Hotel", "Boutique Hotel", "Luxury Resort", "Business Hotel", "Heritage Palace", "Bed & Breakfast"];
    const currentType = hotel.hotel_type || hotel.hotelType || "";
    setHotelForm({
      name: hotel.name || "",
      hotel_type: knownTypes.includes(currentType) || !currentType ? currentType : "Custom",
      custom_hotel_type: knownTypes.includes(currentType) ? "" : currentType,
      owner_name: hotel.ownerName || hotel.admin?.name || "",
      owner_email: hotel.ownerEmail || hotel.admin?.email || hotel.email || "",
      owner_phone: hotel.ownerPhone || hotel.admin?.phone || hotel.phone || "",
      total_rooms: String(hotel.totalRooms ?? hotel.total_rooms ?? ""),
      website: hotel.website || "",
      address: typeof hotel.address === "string" ? hotel.address : "",
      city: hotel.city || "",
      state: hotel.state || "",
      pincode: hotel.pincode || "",
      gst_number: hotel.gst_number || hotel.gstNumber || "",
      pan_number: hotel.pan_number || hotel.panNumber || "",
    });
    setAddOpen(true);
  };

  const deleteHotel = (hotel) => {
    if (!(hotel._id || hotel.id)) return;
    setDeleteTarget(hotel);
  };

  const confirmDelete = async () => {
    const id = deleteTarget?._id || deleteTarget?.id;
    if (!id) return;
    try {
      setDeleting(true);
      await apiRequest(API_ENDPOINTS.HOTELS.BY_ID(id), { method: "DELETE" });
      toast.success("Hotel deleted.");
      setDeleteTarget(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error(err?.message || "Could not delete the hotel.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredHotels = hotels.filter((h) => {
    const matchSearch =
      h.name?.toLowerCase().includes(search.toLowerCase()) ||
      h.admin?.email?.toLowerCase().includes(search.toLowerCase()) ||
      h.city?.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === "ALL") return matchSearch;
    return matchSearch && h.status === statusFilter;
  }).slice().sort((a, b) => {
    if (sortBy === "NAME") return String(a.name || "").localeCompare(String(b.name || ""));
    const aTime = new Date(a.createdAt || a.created_at || 0).getTime() || 0;
    const bTime = new Date(b.createdAt || b.created_at || 0).getTime() || 0;
    return sortBy === "OLDEST" ? aTime - bTime : bTime - aTime;
  });

  const paginatedHotels = filteredHotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalActive = hotels.filter((h) => h.status === "ACTIVE").length;
  const totalPending = hotels.filter((h) => h.status === "PENDING").length;
  const totalDisabled = hotels.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED").length;

  if (addOpen) {
    const fieldSx = {
      "& .MuiOutlinedInput-root": {
        height: 42,
        borderRadius: "10px",
        bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : themeConfig.bgMain,
      },
    };
    const label = (text, required) => (
      <Typography sx={{ fontWeight: 700, color: themeConfig.textMain, fontSize: "0.8rem", mb: 0.6 }}>
        {text}
        {required ? <span style={{ color: themeConfig.danger }}> *</span> : null}
      </Typography>
    );
    const stepCopy = [
      ["Hotel details", "Name, type, and size of the property."],
      ["Owner", "Who will sign in as the hotel admin."],
      ["Address", "Where the hotel is, plus optional tax numbers."],
    ];
    return (
      <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 }, maxWidth: 760, mx: "auto", width: "100%" }}>
        <Button
          variant="text"
          onClick={() => setAddOpen(false)}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontWeight: 700,
            color: themeConfig.primary,
            bgcolor: "transparent",
            boxShadow: "none",
            border: "none",
            px: 0.5,
            minWidth: 0,
            mb: 0.5,
            "&:hover": { bgcolor: "transparent", color: themeConfig.primaryDark, boxShadow: "none", transform: "none" },
          }}
        >
          ← Back to hotels
        </Button>
        <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: themeConfig.textMain }}>{editingId ? "Edit Hotel" : "Add Hotel"}</Typography>
        <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.85rem", mb: 2.5 }}>Register a new property in three steps.</Typography>

        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3.5 }, borderRadius: "20px", border: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgCard }}>
          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
              <Box sx={{ position: "absolute", top: 18, left: "16%", right: "16%", height: 2, bgcolor: themeConfig.border, zIndex: 0 }}>
                <Box sx={{ height: "100%", width: `${(hotelStep / 2) * 100}%`, bgcolor: themeConfig.primary, transition: "width 0.3s ease" }} />
              </Box>
              {["Hotel", "Owner", "Address"].map((name, index) => {
                const done = hotelStep > index;
                const current = hotelStep === index;
                return (
                  <Box key={name} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center", mb: 0.75, fontWeight: 800, bgcolor: done ? themeConfig.primary : themeConfig.bgCard, color: done ? (themeConfig.onPrimary || "#fff") : current ? themeConfig.primary : themeConfig.textMuted, border: `2px solid ${done || current ? themeConfig.primary : themeConfig.border}`, boxShadow: current ? `0 0 0 4px ${themeConfig.primaryGlow}` : "none" }}>
                      {index + 1}
                    </Box>
                    <Typography sx={{ fontSize: "0.68rem", color: themeConfig.textMuted }}>Step {index + 1}</Typography>
                    <Typography sx={{ fontSize: "0.84rem", fontWeight: current ? 800 : 600, color: current || done ? themeConfig.textMain : themeConfig.textMuted }}>{name}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ pb: 2, mb: 2.5, borderBottom: `1px solid ${themeConfig.border}` }}>
            <Typography sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1rem" }}>{stepCopy[hotelStep][0]}</Typography>
            <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.8rem", mt: 0.25 }}>{stepCopy[hotelStep][1]}</Typography>
          </Box>

          {hotelStep === 0 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box sx={{ gridColumn: "1 / -1" }}>{label("Hotel name", true)}<TextField fullWidth size="small" placeholder="JK Residency" value={hotelForm.name} onChange={(e) => setField("name", e.target.value)} sx={fieldSx} /></Box>
              <Box>
                {label("Hotel type", true)}
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={hotelForm.hotel_type}
                  onChange={(e) => setField("hotel_type", e.target.value)}
                  sx={fieldSx}
                  slotProps={{ select: { displayEmpty: true, renderValue: (selected) => selected === "Custom" ? "Custom hotel type" : selected || "Select hotel type" } }}
                >
                  <MenuItem value="">Select hotel type</MenuItem>
                  <MenuItem value="Luxury Boutique Hotel">Luxury Boutique Hotel</MenuItem>
                  <MenuItem value="Boutique Hotel">Boutique Hotel</MenuItem>
                  <MenuItem value="Luxury Resort">Luxury Resort</MenuItem>
                  <MenuItem value="Business Hotel">Business Hotel</MenuItem>
                  <MenuItem value="Heritage Palace">Heritage Palace</MenuItem>
                  <MenuItem value="Bed & Breakfast">Bed & Breakfast</MenuItem>
                  <MenuItem value="Custom">Custom hotel type</MenuItem>
                </TextField>
                {hotelForm.hotel_type === "Custom" && (
                  <TextField fullWidth size="small" placeholder="Enter your hotel type" value={hotelForm.custom_hotel_type} onChange={(e) => setField("custom_hotel_type", e.target.value)} sx={{ ...fieldSx, mt: 1.25 }} />
                )}
              </Box>
              <Box>{label("Total rooms", true)}<TextField fullWidth size="small" placeholder="24" value={hotelForm.total_rooms} onChange={(e) => setField("total_rooms", e.target.value)} sx={fieldSx} /></Box>
              <Box sx={{ gridColumn: "1 / -1" }}>{label("Website")}<TextField fullWidth size="small" placeholder="https://hotel.com" value={hotelForm.website} onChange={(e) => setField("website", e.target.value)} sx={fieldSx} /></Box>
            </Box>
          )}
          {hotelStep === 1 && (
            <Box sx={{ display: "grid", gap: 2 }}>
              <Box>{label("Owner name", true)}<TextField fullWidth size="small" placeholder="Niraj Vekariya" value={hotelForm.owner_name} onChange={(e) => setField("owner_name", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("Owner email", true)}<TextField fullWidth size="small" placeholder="owner@hotel.com" value={hotelForm.owner_email} onChange={(e) => setField("owner_email", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("Owner phone", true)}<TextField fullWidth size="small" placeholder="10-digit mobile" value={hotelForm.owner_phone} onChange={(e) => setField("owner_phone", e.target.value)} sx={fieldSx} /></Box>
            </Box>
          )}
          {hotelStep === 2 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box sx={{ gridColumn: "1 / -1" }}>{label("Address", true)}<TextField fullWidth size="small" placeholder="Street, area" value={hotelForm.address} onChange={(e) => setField("address", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("City", true)}<TextField fullWidth size="small" value={hotelForm.city} onChange={(e) => setField("city", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("State", true)}<TextField fullWidth size="small" value={hotelForm.state} onChange={(e) => setField("state", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("Pincode", true)}<TextField fullWidth size="small" placeholder="6 digits" value={hotelForm.pincode} onChange={(e) => setField("pincode", e.target.value)} sx={fieldSx} /></Box>
              <Box>{label("GST number")}<TextField fullWidth size="small" value={hotelForm.gst_number} onChange={(e) => setField("gst_number", e.target.value)} sx={fieldSx} /></Box>
              <Box sx={{ gridColumn: { sm: "1 / -1" } }}>{label("PAN number")}<TextField fullWidth size="small" value={hotelForm.pan_number} onChange={(e) => setField("pan_number", e.target.value)} sx={fieldSx} /></Box>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3.5, pt: 2.5, borderTop: `1px solid ${themeConfig.border}` }}>
            <Button variant="outlined" disabled={hotelStep === 0} onClick={() => setHotelStep((step) => step - 1)} sx={{ minHeight: 40, px: 2.5, textTransform: "none", borderRadius: "10px", fontWeight: 700, borderColor: themeConfig.border, color: themeConfig.textMain }}>
              Back
            </Button>
            {hotelStep < 2 ? (
              <Button variant="contained" onClick={() => setHotelStep((step) => step + 1)} sx={{ minHeight: 40, px: 3, textTransform: "none", borderRadius: "10px", fontWeight: 800, bgcolor: themeConfig.primary, boxShadow: "none" }}>Next</Button>
            ) : (
              <Button variant="contained" disabled={savingHotel} onClick={saveHotel} sx={{ minHeight: 40, px: 3, textTransform: "none", borderRadius: "10px", fontWeight: 800, bgcolor: themeConfig.primary, boxShadow: "none" }}>{savingHotel ? "Saving..." : editingId ? "Save changes" : "Register hotel"}</Button>
            )}
          </Box>
        </Paper>
      </Box>
    );
  }

  if (drawerOpen && selectedHotel) {
    const hotel = selectedHotel;
    const facts = [
      ["Hotel", hotel.name],
      ["Type", hotel.hotel_type || hotel.hotelType],
      ["Owner", hotel.ownerName || hotel.admin?.name],
      ["Email", hotel.ownerEmail || hotel.admin?.email || hotel.email],
      ["Phone", hotel.ownerPhone || hotel.admin?.phone || hotel.phone],
      ["Rooms", hotel.totalRooms ?? hotel.total_rooms],
      ["City", [hotel.city, hotel.state].filter(Boolean).join(", ")],
      ["Pincode", hotel.pincode],
      ["Address", typeof hotel.address === "string" ? hotel.address : ""],
      ["GST", hotel.gstNumber || hotel.gst_number],
      ["PAN", hotel.panNumber || hotel.pan_number],
      ["Website", hotel.website],
      ["Status", hotel.status],
      ["Plan", hotel.subscription?.plan || hotel.subscriptionPlan || "Trial"],
      ["Registered", formatDate(hotel.createdAt || hotel.created_at)],
    ];
    return (
      <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 }, maxWidth: 760, mx: "auto", width: "100%" }}>
        <Button
          variant="text"
          onClick={() => setDrawerOpen(false)}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontWeight: 700,
            color: themeConfig.primary,
            bgcolor: "transparent",
            boxShadow: "none",
            border: "none",
            px: 0.5,
            minWidth: 0,
            mb: 0.5,
            "&:hover": { bgcolor: "transparent", color: themeConfig.primaryDark, boxShadow: "none", transform: "none" },
          }}
        >
          ← Back to hotels
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Avatar sx={{ width: 48, height: 48, borderRadius: "14px", bgcolor: themeConfig.primary, color: themeConfig.onPrimary || "#fff", fontWeight: 800 }}>
            {(hotel.name || "H").charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: themeConfig.textMain, lineHeight: 1.2 }}>{hotel.name}</Typography>
            <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.85rem" }}>{hotel.city || "Hotel details"}</Typography>
          </Box>
        </Box>
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", border: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgCard }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
            {facts.map(([name, value]) => (
              <Box key={name} sx={{ p: 1.5, borderRadius: "12px", border: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgSubtle || themeConfig.bgMain, gridColumn: name === "Address" ? "1 / -1" : undefined }}>
                <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.72rem", fontWeight: 700 }}>{name}</Typography>
                <Typography sx={{ color: themeConfig.textMain, fontWeight: 700, fontSize: "0.95rem", wordBreak: "break-word" }}>{value || "—"}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2.5 }}>
            <Button variant="outlined" onClick={() => { setDrawerOpen(false); openEdit(hotel); }} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700, borderColor: themeConfig.border, color: themeConfig.textMain }}>
              Edit
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        height: { xs: "calc(100vh - 132px)", sm: "calc(100vh - 148px)", md: "calc(100vh - 108px)" },
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0, width: "100%", display: "flex", flexDirection: "column" }}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
            borderRadius: "20px",
            border: `1.5px solid ${themeConfig.border}`,
            overflow: "hidden",
            bgcolor: themeConfig.bgCard,
            "& .MuiTableContainer-root, & .MuiTablePagination-root": {
              mx: { xs: -2, sm: -3 },
              width: { xs: "calc(100% + 32px)", sm: "calc(100% + 48px)" },
              maxWidth: "none",
            },
          }}
        >
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search hotel, email, or city"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={{ flex: { xs: "1 1 100%", sm: "1 1 240px" }, maxWidth: { sm: 320 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgMain } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 18, color: themeConfig.textMuted }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 180 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgMain } }}
          >
            <MenuItem value="ALL">All statuses</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="DISABLED">Disabled</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(0);
            }}
            sx={{ width: { xs: "100%", sm: 170 }, "& .MuiOutlinedInput-root": { height: 40, borderRadius: "10px", bgcolor: themeConfig.bgMain } }}
          >
            <MenuItem value="NEWEST">Newest</MenuItem>
            <MenuItem value="OLDEST">Oldest</MenuItem>
            <MenuItem value="NAME">Name (A-Z)</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={() => {
              setHotelForm(emptyHotel);
              setEditingId(null);
              setHotelStep(0);
              setAddOpen(true);
            }}
            sx={{
              ml: { sm: "auto" },
              height: 40,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 800,
              bgcolor: themeConfig.primary,
              boxShadow: "none",
              whiteSpace: "nowrap",
            }}
          >
            Add Hotel
          </Button>
        </Box>
        <TableContainer
          sx={{
            flex: 1,
            minHeight: 0,
            overflowX: "auto",
            overflowY: "auto",
            maxWidth: "100%",
            borderRadius: "0 !important",
            border: "none",
            boxShadow: "none",
            "& .MuiTableCell-head": { borderRadius: "0 !important" },
          "&::-webkit-scrollbar": {
            height: 8,
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: themeConfig.champagne || "rgba(0,0,0,0.04)",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeConfig.border || "rgba(0,0,0,0.15)",
            borderRadius: 4,
            "&:hover": {
              background: themeConfig.primary,
            },
          },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              {["Hotel", "Manager", "Plan", "Status", "Registered"].map((heading) => (
                <TableCell key={heading} sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>{heading}</TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 800, textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6 }}>
                  <LoadingState message="Fetching hotel property network..." />
                </TableCell>
              </TableRow>
            ) : filteredHotels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 6 }}>
                  <EmptyState title="No Hotels Found" description="No hotel properties matching the current filter criteria." />
                </TableCell>
              </TableRow>
            ) : (
              paginatedHotels.map((hotel) => (
                <TableRow
                  key={hotel._id}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: `${themeConfig.primaryGlow} !important`,
                      transform: "scale(1.002)",
                    },
                  }}
                >
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                          color: "#FFFFFF",
                          fontWeight: 800,
                          width: 42,
                          height: 42,
                          borderRadius: "12px",
                          boxShadow: `0 4px 10px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                        }}
                      >
                        {hotel.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                            {hotel.name}
                          </Typography>
                          <PresenceBadge isOnline={isHotelOnline(hotel._id)} size="small" />
                        </Box>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 12, color: themeConfig.primary }} />
                          {hotel.city ? `${hotel.city}${hotel.state ? `, ${hotel.state}` : ""}` : "Location N/A"} • {hotel.totalRooms ?? 0} Rooms
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                      {hotel.admin?.name || hotel.ownerName || "—"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      {hotel.admin?.email || hotel.ownerEmail || hotel.email || "—"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Chip
                        label={`${(hotel.subscription?.plan || hotel.subscriptionPlan || "TRIAL").toUpperCase()} PLAN`}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.72rem",
                          borderRadius: "8px",
                          bgcolor:
                            (hotel.subscription?.plan || hotel.subscriptionPlan) === "ENTERPRISE"
                              ? "rgba(16, 185, 129, 0.15)"
                              : (hotel.subscription?.plan || hotel.subscriptionPlan) === "PREMIUM"
                              ? "rgba(11, 142, 224, 0.15)"
                              : "rgba(245, 158, 11, 0.15)",
                          color:
                            (hotel.subscription?.plan || hotel.subscriptionPlan) === "ENTERPRISE"
                              ? "#059669"
                              : (hotel.subscription?.plan || hotel.subscriptionPlan) === "PREMIUM"
                              ? themeConfig.primary
                              : "#D97706",
                          border: `1px solid ${themeConfig.border}`,
                          width: "fit-content",
                        }}
                      />
                      <TrialTimeCell trialEndDate={hotel.subscription?.trialEndDate} status={hotel.status} themeConfig={themeConfig} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Tooltip title={hotel.status === "ACTIVE" ? "Toggle to Suspend / Disable Hotel" : "Toggle to Activate Hotel"}>
                        <Switch
                          size="small"
                          checked={hotel.status === "ACTIVE"}
                          onChange={() => onOpenActionDialog(hotel.status === "ACTIVE" ? "DISABLE" : "ACTIVE", hotel)}
                          color="success"
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#10B981",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#10B981",
                            },
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.85rem" }}>
                      {formatDate(hotel.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
                      <Tooltip title="Inspect Hotel Dossier">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setDrawerTab(0);
                            setDrawerOpen(true);
                          }}
                          sx={{
                            width: 32,
                            height: 32,
                            color: themeConfig.primaryDark,
                            bgcolor: isDarkMode ? "rgba(255,255,255,0.06)" : themeConfig.champagne,
                            borderRadius: "10px",
                            border: `1px solid ${themeConfig.border}`,
                            "&:hover": {
                              borderColor: themeConfig.primary,
                              bgcolor: isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(11, 142, 224, 0.12)",
                            },
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit Hotel & Trial Settings">
                        <IconButton
                          size="small"
                          onClick={() => openEdit(hotel)}
                          sx={{
                            width: 32,
                            height: 32,
                            color: themeConfig.primary,
                            bgcolor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(11, 142, 224, 0.1)",
                            borderRadius: "10px",
                            border: `1px solid ${themeConfig.border}`,
                            "&:hover": {
                              borderColor: themeConfig.primary,
                              bgcolor: "rgba(11, 142, 224, 0.2)",
                            },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete hotel">
                        <IconButton
                          size="small"
                          onClick={() => deleteHotel(hotel)}
                          sx={{
                            width: 32,
                            height: 32,
                            color: themeConfig.danger || "#EF4444",
                            bgcolor: isDarkMode ? "rgba(239,68,68,0.12)" : "#FEF2F2",
                            borderRadius: "10px",
                            border: "1px solid rgba(239,68,68,0.25)",
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {hotel.status === "ACTIVE" ? (
                        <Tooltip title="Suspend Hotel Operational Access">
                          <IconButton
                            size="small"
                            onClick={() => onOpenActionDialog("DISABLE", hotel)}
                            sx={{
                              width: 32,
                              height: 32,
                              color: themeConfig.danger || "#EF4444",
                              bgcolor: isDarkMode ? "rgba(239,68,68,0.15)" : "#FCE8E6",
                              borderRadius: "10px",
                              border: "1px solid rgba(239,68,68,0.3)",
                              "&:hover": {
                                borderColor: themeConfig.danger || "#EF4444",
                                bgcolor: isDarkMode ? "rgba(239,68,68,0.25)" : "#F8D7DA",
                              },
                            }}
                          >
                            <Block fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activate Hotel Operational Access">
                          <IconButton
                            size="small"
                            onClick={() => onOpenActionDialog("ACTIVE", hotel)}
                            sx={{
                              width: 32,
                              height: 32,
                              color: "#10B981",
                              bgcolor: isDarkMode ? "rgba(16,185,129,0.15)" : "#E6F4EA",
                              borderRadius: "10px",
                              border: "1px solid rgba(16,185,129,0.3)",
                              "&:hover": {
                                borderColor: "#10B981",
                                bgcolor: isDarkMode ? "rgba(16,185,129,0.25)" : "#CEEAD6",
                              },
                            }}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredHotels.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              flexShrink: 0,
              borderTop: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              color: themeConfig.textMain,
              "& .MuiTablePagination-toolbar": {
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                px: { xs: 1, sm: 2 },
                gap: 0.5,
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                my: 0.5,
              },
            }}
          />
        </Paper>
      </Box>

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => !deleting && setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              border: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              overflow: "hidden",
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle component="div" sx={{ p: 0 }}>
          <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, bgcolor: themeConfig.bgSoft, borderBottom: `1px solid ${themeConfig.border}` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "12px", display: "grid", placeItems: "center", color: themeConfig.primary, bgcolor: themeConfig.bgCard, border: `1px solid ${themeConfig.border}` }}>
                <WarningAmber sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography sx={{ color: themeConfig.primary, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em" }}>HOTELS</Typography>
                <Typography sx={{ fontWeight: 700, color: themeConfig.textMain, fontSize: "1.05rem", lineHeight: 1.3 }}>Delete {deleteTarget?.name || "hotel"}</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setDeleteTarget(null)} disabled={deleting} aria-label="Close" sx={{ width: 36, height: 36, borderRadius: "10px", border: `1px solid ${themeConfig.border}`, color: themeConfig.textMuted }}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2.75 }}>
          <Typography sx={{ color: themeConfig.textMain, fontSize: "0.95rem", lineHeight: 1.6 }}>
            {deleteTarget?.name || "This hotel"} will be removed from the list. The owner and staff will not be able to sign in. Rooms and bookings stay saved.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: `1px solid ${themeConfig.border}`, bgcolor: isDarkMode ? themeConfig.bgSubtle : "#F8FAFC" }}>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting} variant="outlined" sx={{ minWidth: 104, height: 40, borderRadius: "10px", textTransform: "none", fontWeight: 700, color: themeConfig.textMain, borderColor: themeConfig.border, bgcolor: isDarkMode ? "transparent" : "#FFFFFF" }}>
            Cancel
          </Button>
          <Button variant="contained" disabled={deleting} onClick={confirmDelete} sx={{ minWidth: 104, height: 40, borderRadius: "10px", textTransform: "none", fontWeight: 700, boxShadow: "none", bgcolor: themeConfig.danger || "#DC2626", color: "#FFFFFF", "&:hover": { bgcolor: "#B91C1C", boxShadow: "none" } }}>
            {deleting ? "Please wait…" : "Delete hotel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
