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
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";
import LoadingState from "@/shared/components/LoadingState";
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
  onExtendTrial,
  onRefresh,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 3 } }}>
      {/* 3D Page Title Banner */}
      <Box
        sx={{
          mb: 3.5,
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 16px 36px -10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}, inset 0 1px 1px rgba(255,255,255,0.4)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, position: "relative", zIndex: 1 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                }}
              >
                <Business fontSize="small" />
              </Avatar>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.72rem",
                }}
              >
                Multi-Tenant Hotel Network • Registered Properties
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5, lineHeight: 1.2 }}>
              Hotels Directory &amp; Governance
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5, fontSize: "0.85rem" }}>
              Comprehensive tenant management, subscription lifecycle, property license suspension &amp; live diagnostics.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={onRefresh}
              className="btn-3d"
              sx={{
                borderRadius: "14px",
                bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
                color: themeConfig.primaryDark || "#0C273B",
                fontWeight: 800,
                fontSize: "0.82rem",
                px: 2.5,
                py: 1.1,
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
                borderRadius: "14px",
                bgcolor: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.4)",
                fontWeight: 800,
                fontSize: "0.82rem",
                px: 2.5,
                py: 1.1,
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
          p: 2,
          mb: 3,
          borderRadius: "18px",
          bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
          border: `1.5px solid ${themeConfig.border}`,
          boxShadow: isDarkMode ? "none" : "0 8px 24px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
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

      {/* 3D Hotels Master Table */}
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
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          {hotel.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "flex", alignItems: "center", gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 12, color: themeConfig.primary }} />
                          {hotel.city || "Mumbai, India"} • {hotel.totalRooms || 24} Rooms
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                      {hotel.admin?.name || "Hotel General Manager"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      {hotel.admin?.email || "admin@grandroyale.com"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Chip
                      label={hotel.subscriptionPlan || "Enterprise (30-Day Trial)"}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        borderRadius: "8px",
                        bgcolor: themeConfig.champagne,
                        color: themeConfig.primaryDark,
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                      }}
                    />
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
                          <Visibility sx={{ fontSize: 16, color: themeConfig.primaryDark }} />
                        </IconButton>
                      </Tooltip>

                      {hotel.status === "ACTIVE" ? (
                        <Tooltip title="Suspend Hotel Operational Access">
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Block fontSize="small" />}
                            onClick={() => onOpenActionDialog("DISABLE", hotel)}
                            sx={{
                              borderRadius: "10px",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderColor: "rgba(220, 38, 38, 0.3)",
                              "&:hover": {
                                bgcolor: "rgba(220, 38, 38, 0.08)",
                                borderColor: themeConfig.danger,
                              },
                            }}
                          >
                            Suspend
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activate Hotel Operational Access">
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircle fontSize="small" />}
                            onClick={() => onOpenActionDialog("ACTIVE", hotel)}
                            className="btn-3d"
                            sx={{
                              borderRadius: "10px",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              background: `linear-gradient(135deg, ${themeConfig.success} 0%, #15803D 100%)`,
                              boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)",
                              "&:hover": {
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            Activate
                          </Button>
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
            }}
          />
        )}
      </TableContainer>

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
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                    {selectedHotel.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOn sx={{ fontSize: 13 }} />
                    {selectedHotel.city || "Mumbai, Maharashtra"} • Code: <strong>{selectedHotel.code || "PMS"}</strong>
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
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.admin?.name || selectedHotel.ownerName || "Siddharth Verma"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Contact Email:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.admin?.email || selectedHotel.ownerEmail || "owner@grandroyale.com"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Phone Number:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.phone || "+91 98200 12345"}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>GST / Tax Number:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedHotel.taxId || "27AABCU9603R1ZM"}</Typography>
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
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{selectedHotel.totalRooms || 24}</Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Inventory Rooms</Typography>
                          </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Paper sx={{ p: 1.5, textAlign: "center", borderRadius: "12px", bgcolor: themeConfig.bgMain }}>
                            <People fontSize="small" sx={{ color: themeConfig.secondary }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{selectedHotel.staffCount || 6}</Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Staff Logins</Typography>
                          </Paper>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Paper sx={{ p: 1.5, textAlign: "center", borderRadius: "12px", bgcolor: themeConfig.bgMain }}>
                            <Dns fontSize="small" sx={{ color: themeConfig.primaryDark }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Online</Typography>
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
                          {selectedHotel.subscriptionPlan || "Enterprise Tier"}
                        </Typography>
                        <Chip label="ACTIVE" color="success" size="small" sx={{ fontWeight: 800, borderRadius: "6px" }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                        Commercial License valid through <strong>{formatDate(selectedHotel.trialEndsAt || selectedHotel.createdAt)}</strong>. Includes unlimited guest check-ins, multi-lingual bills, &amp; 24/7 priority support.
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted }}>
                          Monthly Renewal Fee: <strong>₹4,999 / mo</strong>
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
    </Box>
  );
}
