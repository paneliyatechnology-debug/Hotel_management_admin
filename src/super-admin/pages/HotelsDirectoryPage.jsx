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
} from "@mui/material";
import {
  Search,
  CheckCircle,
  Block,
  HourglassEmpty,
  Business,
  Visibility,
  Close,
  Email,
  Phone,
  LocationOn,
  Security,
  CloudDone,
  Storage,
  Dns,
  Refresh,
  AttachMoney,
  Key,
  SupportAgent,
  Receipt,
  People,
  MeetingRoom,
  Lan,
  ShieldOutlined,
  Bolt,
  Download,
  Edit,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { usePresence } from "@/shared/context/SocketContext";
import PresenceBadge from "@/shared/components/PresenceBadge";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import LoadingState from "@/shared/components/LoadingState";
import { useLiveCountdown } from "@/shared/utils/countdown";
import HotelGuestsModal from "@/super-admin/components/HotelGuestsModal";

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
import { downloadHotelsDirectoryPDF } from "@/shared/utils/pdfGenerator";

const formatDate = (dateString) => {
  if (!dateString) return "Sep 15, 2026";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Sep 15, 2026";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch {
    return "Sep 15, 2026";
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestModalHotel, setGuestModalHotel] = useState(null);

  const filteredHotels = hotels.filter((h) => {
    const matchSearch =
      h.name?.toLowerCase().includes(search.toLowerCase()) ||
      h.admin?.email?.toLowerCase().includes(search.toLowerCase()) ||
      h.city?.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === "ALL") return matchSearch;
    return matchSearch && h.status === statusFilter;
  });

  const paginatedHotels = filteredHotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalActive = hotels.filter((h) => h.status === "ACTIVE").length;
  const totalPending = hotels.filter((h) => h.status === "PENDING").length;
  const totalDisabled = hotels.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED").length;

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 3 }, pb: { xs: 10, sm: 4 } }}>
      {/* 3D Page Title Banner */}
      <Box
        sx={{
          mb: { xs: 2, sm: 3.5 },
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: { xs: "16px", sm: "24px" },
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 16px 36px -10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}, inset 0 1px 1px rgba(255,255,255,0.4)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, position: "relative", zIndex: 1 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap" }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                }}
              >
                <Business fontSize="small" />
              </Avatar>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: { xs: "0.65rem", sm: "0.72rem" },
                }}
              >
                Multi-Tenant Hotel Network • Registered Properties
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5, lineHeight: 1.2, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
              Hotels Directory &amp; Governance
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5, fontSize: { xs: "0.78rem", sm: "0.85rem" } }}>
              Comprehensive tenant management, subscription lifecycle, property license suspension &amp; live diagnostics.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, alignItems: { xs: "stretch", sm: "center" }, width: { xs: "100%", sm: "auto" } }}>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={onRefresh}
              className="btn-3d"
              sx={{
                width: { xs: "100%", sm: "auto" },
                justifyContent: "center",
                whiteSpace: "nowrap",
                borderRadius: "14px",
                bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
                color: themeConfig.primaryDark || "#0C273B",
                fontWeight: 800,
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                px: { xs: 2, sm: 2.5 },
                py: 1,
                boxShadow: isDarkMode ? "none" : "0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 #FFFFFF",
                "&:hover": {
                  bgcolor: isDarkMode ? "rgba(20, 184, 166, 0.15)" : "#F8FAFC",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Refresh Directory
            </Button>

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => downloadHotelsDirectoryPDF(filteredHotels)}
              className="btn-3d"
              sx={{
                width: { xs: "100%", sm: "auto" },
                justifyContent: "center",
                whiteSpace: "nowrap",
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.4)",
                fontWeight: 800,
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                px: { xs: 2, sm: 2.5 },
                py: 1,
                backdropFilter: "blur(10px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Download Network PDF
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 3D Filter & Inset Search Bar */}
      <Paper
        className="card-3d"
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 3,
          borderRadius: { xs: "14px", sm: "18px" },
          bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
          border: `1.5px solid ${themeConfig.border}`,
          boxShadow: isDarkMode ? "none" : "0 8px 24px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <TextField
          size="small"
          placeholder="Search by Hotel Name, Email, or City..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{
            flex: 1,
            width: "100%",
            minWidth: { xs: "100%", sm: 240 },
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

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
          {["ALL", "ACTIVE", "PENDING", "DISABLED"].map((st) => {
            const isSelected = statusFilter === st;
            return (
              <Chip
                key={st}
                label={st === "ALL" ? `All (${hotels.length})` : st === "ACTIVE" ? `Active (${totalActive})` : st === "PENDING" ? `Pending (${totalPending})` : `Disabled (${totalDisabled})`}
                clickable
                onClick={() => {
                  setStatusFilter(st);
                  setPage(0);
                }}
                sx={{
                  flex: { xs: "1 1 calc(50% - 8px)", sm: "0 0 auto" },
                  justifyContent: "center",
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

      {/* 3D Hotels Master Table Wrapper */}
      <Box sx={{ width: "100%", overflow: "hidden", borderRadius: "20px" }}>
        <TableContainer
          component={Paper}
          className="card-3d"
          sx={{
            borderRadius: "20px",
            border: `1.5px solid ${themeConfig.border}`,
            boxShadow: "0 10px 28px -6px rgba(12, 39, 59, 0.08), 0 4px 12px rgba(0,0,0,0.03), inset 0 1px 0 #FFFFFF",
            overflowX: "auto",
          overflowY: "auto",
          maxHeight: { xs: "520px", md: "calc(100vh - 280px)" },
          maxWidth: "100%",
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
            <TableRow sx={{ background: `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)` }}>
              <TableCell sx={{ fontWeight: 800, py: 2, minWidth: 260, whiteSpace: "nowrap" }}>Hotel / Property</TableCell>
              <TableCell sx={{ fontWeight: 800, minWidth: 220, whiteSpace: "nowrap" }}>General Manager</TableCell>
              <TableCell sx={{ fontWeight: 800, minWidth: 220, whiteSpace: "nowrap" }}>Plan / Subscription</TableCell>
              <TableCell sx={{ fontWeight: 800, minWidth: 160, whiteSpace: "nowrap" }}>Account Status</TableCell>
              <TableCell sx={{ fontWeight: 800, minWidth: 140, whiteSpace: "nowrap" }}>Registered Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 800, minWidth: 200, whiteSpace: "nowrap" }}>Administrative Actions</TableCell>
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
                      {hotel.admin?.name || hotel.ownerName || "Property Admin"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      {hotel.admin?.email || hotel.ownerEmail || "N/A"}
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
                      <StatusChip status={hotel.status} size="small" />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.85rem" }}>
                      {formatDate(hotel.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
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
                          onClick={() => onEditHotel && onEditHotel(hotel)}
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

                      <Tooltip title={`View Guest Directory (${hotel.name})`}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setGuestModalHotel(hotel);
                            setGuestModalOpen(true);
                          }}
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
                          <People fontSize="small" />
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
        {filteredHotels.length > 0 && (
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
              borderTop: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard,
              color: themeConfig.textMain,
              borderRadius: "0 0 20px 20px",
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
        )}
      </TableContainer>
      </Box>

      {/* 3D Slide-Over Dossier Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 540, md: 620 },
              p: 0,
              bgcolor: themeConfig.bgMain,
              boxShadow: "-10px 0 35px rgba(12, 39, 59, 0.15)",
            },
          },
        }}
      >
        {selectedHotel && (
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Drawer Header */}
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "14px",
                    bgcolor: "#FFFFFF",
                    color: themeConfig.primaryDark,
                    fontWeight: 900,
                    fontSize: "1.4rem",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  {selectedHotel.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                      {selectedHotel.name}
                    </Typography>
                    <PresenceBadge isOnline={isHotelOnline(selectedHotel._id)} size="small" sx={{ bgcolor: "rgba(255,255,255,0.15)", px: 0.8, py: 0.2, borderRadius: "6px" }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
                    <LocationOn sx={{ fontSize: 13 }} />
                    {selectedHotel.city ? `${selectedHotel.city}${selectedHotel.state ? `, ${selectedHotel.state}` : ""}` : "Location N/A"} • Code: <strong>{selectedHotel.code || selectedHotel.slug?.toUpperCase() || "PMS"}</strong>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: selectedHotel.status === "ACTIVE" ? "rgba(16, 185, 129, 0.2)" : "rgba(220, 38, 38, 0.2)",
                    px: 1.2,
                    py: 0.4,
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800, fontSize: "0.72rem", color: "#FFFFFF", mr: 0.5 }}>
                    {selectedHotel.status === "ACTIVE" ? "ACTIVE" : "DISABLED"}
                  </Typography>
                  <Switch
                    size="small"
                    checked={selectedHotel.status === "ACTIVE"}
                    onChange={() => onOpenActionDialog(selectedHotel.status === "ACTIVE" ? "DISABLE" : "ACTIVE", selectedHotel)}
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
                </Box>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Dossier Tabs */}
            <Box sx={{ borderBottom: `1px solid ${themeConfig.border}`, bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"), px: 2 }}>
              <Tabs
                value={drawerTab}
                onChange={(e, v) => setDrawerTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: "0.85rem", minHeight: 48 },
                  "& .Mui-selected": { color: themeConfig.primary },
                  "& .MuiTabs-indicator": { bgcolor: themeConfig.primary, height: 3 },
                }}
              >
                <Tab label="Overview & KYC" />
                <Tab label="Subscription Plan" />
                <Tab label="Staff & Security" />
              </Tabs>
            </Box>

            {/* Drawer Body */}
            <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
              {drawerTab === 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Card className="card-3d" sx={{ borderRadius: "16px", border: `1px solid ${themeConfig.border}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                        <Security fontSize="small" sx={{ color: themeConfig.primary }} /> Legal &amp; Ownership Verification
                      </Typography>
                      <Grid container spacing={1.5} sx={{ fontSize: "0.85rem" }}>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Owner / Applicant:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.admin?.name || selectedHotel.ownerName || "Property Admin"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Contact Email:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.admin?.email || selectedHotel.ownerEmail || "N/A"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Phone Number:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.phone || selectedHotel.ownerPhone || selectedHotel.admin?.phone || "N/A"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>GST / Tax Number:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.taxId || selectedHotel.gstNumber || selectedHotel.settings?.gstin || selectedHotel.panNumber || "N/A"}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card className="card-3d" sx={{ borderRadius: "16px", border: `1px solid ${themeConfig.border}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                        <CloudDone fontSize="small" sx={{ color: themeConfig.success }} /> Multi-Tenant PMS Capacity
                      </Typography>
                      <Grid container spacing={1.5}>
                        <Grid size={{ xs: 4 }}>
                          <Paper sx={{ p: 1.5, textAlign: "center", borderRadius: "12px", bgcolor: themeConfig.bgMain }}>
                            <MeetingRoom fontSize="small" sx={{ color: themeConfig.primary }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{selectedHotel.stats?.totalRooms ?? selectedHotel.totalRooms ?? 0}</Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Inventory Rooms</Typography>
                          </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Paper sx={{ p: 1.5, textAlign: "center", borderRadius: "12px", bgcolor: themeConfig.bgMain }}>
                            <People fontSize="small" sx={{ color: themeConfig.secondary }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{selectedHotel.stats?.staffCount ?? selectedHotel.staffCount ?? 1}</Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Staff Logins</Typography>
                          </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Paper sx={{ p: 1.5, textAlign: "center", borderRadius: "12px", bgcolor: themeConfig.bgMain }}>
                            <Dns fontSize="small" sx={{ color: themeConfig.primaryDark }} />
                            <Box sx={{ display: "flex", justifyContent: "center", my: 0.5 }}>
                              <PresenceBadge isOnline={isHotelOnline(selectedHotel._id)} size="small" />
                            </Box>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Node Health</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {drawerTab === 1 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Card className="card-3d" sx={{ borderRadius: "16px", border: `1.5px solid ${themeConfig.primary}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: themeConfig.primaryDark }}>
                          {((selectedHotel.subscription?.plan || selectedHotel.subscriptionPlan || "TRIAL") + " PLAN").toUpperCase()}
                        </Typography>
                        <Chip
                          label={selectedHotel.status || "ACTIVE"}
                          color={selectedHotel.status === "ACTIVE" ? "success" : "warning"}
                          size="small"
                          sx={{ fontWeight: 800, borderRadius: "6px" }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                        Commercial License valid through <strong>{formatDate(selectedHotel.subscription?.trialEndDate || selectedHotel.trialEndsAt || selectedHotel.subscription?.subscriptionEndDate || selectedHotel.createdAt)}</strong>. Includes full hotel operational management, multi-lingual bills, &amp; 24/7 priority support.
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted }}>
                          Monthly Renewal Fee: <strong>{selectedHotel.subscription?.plan === "PREMIUM" ? "₹7,999 / mo" : selectedHotel.subscription?.plan === "STANDARD" ? "₹4,999 / mo" : selectedHotel.subscription?.plan === "BASIC" ? "₹1,999 / mo" : "₹4,999 / mo"}</strong>
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => onExtendTrial(selectedHotel._id, 30)}
                          className="btn-3d"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.75rem",
                            bgcolor: themeConfig.primary,
                            "&:hover": { bgcolor: themeConfig.primaryDark },
                          }}
                        >
                          +30 Days Extension
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {drawerTab === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Card className="card-3d" sx={{ borderRadius: "16px", border: `1px solid ${themeConfig.border}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                        <Key fontSize="small" sx={{ color: themeConfig.primary }} /> Security &amp; Tenant Credentials
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mb: 2 }}>
                        Super Admin can trigger an emergency one-time password reset or issue system revocation tokens for this property.
                      </Typography>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="warning"
                        startIcon={<Key />}
                        sx={{ borderRadius: "10px", fontWeight: 700, py: 1 }}
                      >
                        Issue Temporary Admin Credentials
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Super Admin Hotel Guests Master Directory Modal */}
      <HotelGuestsModal
        open={guestModalOpen}
        onClose={() => setGuestModalOpen(false)}
        hotel={guestModalHotel}
      />
    </Box>
  );
}
