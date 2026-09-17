"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Divider,
  IconButton,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Add,
  Close,
  Search,
  Edit,
  Delete,
  MeetingRoom,
  Layers,
  People,
  CurrencyRupee,
  CleaningServices,
  Build,
  CheckCircle,
  AutoAwesome,
  EventSeat,
  Hotel as HotelIcon,
  FilterList,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import StatusChip from "@/shared/components/StatusChip";
import EmptyState from "@/shared/components/EmptyState";

export default function RoomTypesPage({
  rooms = [],
  roomTypes = [],
  roomModal,
  setRoomModal,
  typeModal,
  setTypeModal,
  onSaveRoom,
  onDeleteRoom,
  onUpdateRoomStatus,
  onSaveRoomType,
  onDeleteRoomType,
  getInitialRoomForm,
}) {
  const { themeConfig } = useAppTheme();

  const [activeTab, setActiveTab] = useState(0); // 0: Rooms Inventory, 1: Room Categories
  const [roomSearch, setRoomSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Summary Metrics
  const totalRoomsCount = rooms.length;
  const availableRoomsCount = rooms.filter((r) => r.status === "AVAILABLE").length;
  const occupiedRoomsCount = rooms.filter((r) => r.status === "OCCUPIED" || r.status === "RESERVED").length;
  const maintenanceRoomsCount = rooms.filter((r) => r.status === "MAINTENANCE" || r.status === "CLEANING" || r.status === "BLOCKED").length;

  // Distinct Floors
  const availableFloors = Array.from(new Set(rooms.map((r) => r.floor || 1))).sort((a, b) => a - b);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtered Rooms
  const filteredRooms = rooms.filter((r) => {
    const q = roomSearch.toLowerCase();
    const roomTypeObj = typeof r.roomType === "object" ? r.roomType : roomTypes.find((t) => t._id === r.roomType);
    const typeName = (roomTypeObj?.name || "").toLowerCase();
    const roomNum = (r.roomNumber || "").toLowerCase();
    const notes = (r.notes || "").toLowerCase();

    const matchesSearch = roomNum.includes(q) || typeName.includes(q) || notes.includes(q);
    const matchesFloor = floorFilter === "ALL" || String(r.floor || 1) === String(floorFilter);
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const matchesCategory = categoryFilter === "ALL" || (roomTypeObj?._id === categoryFilter || roomTypeObj?.name === categoryFilter);

    return matchesSearch && matchesFloor && matchesStatus && matchesCategory;
  });

  const paginatedRooms = filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {/* ========================================================================= */}
      {/* 3D MASTER COMMAND RIBBON                                                  */}
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
                <Layers sx={{ fontSize: 18 }} />
              </Avatar>
              <Chip
                label="Room & Floor Infrastructure"
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
              Room Inventory & Category Master
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5, maxWidth: "600px" }}>
              Configure physical hotel rooms, assign floor numbers, set seating / bed capacities, define categories, and manage daily tariffs.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() =>
                setRoomModal({
                  open: true,
                  mode: "ADD",
                  data: {
                    _id: "",
                    roomNumber: "",
                    roomType: roomTypes[0]?._id || "",
                    floor: 1,
                    seatingCapacity: 2,
                    customPricePerNight: "",
                    status: "AVAILABLE",
                    notes: "",
                  },
                })
              }
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
              + Add New Room
            </Button>

            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              onClick={() =>
                setTypeModal({
                  open: true,
                  mode: "ADD",
                  data: { name: "", basePrice: 4000, maxAdults: 2, maxChildren: 1, description: "" },
                })
              }
              sx={{
                borderRadius: "14px",
                fontWeight: 800,
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.4)",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                px: 2.2,
                py: 1.1,
                fontSize: "0.85rem",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              + Add Category
            </Button>
          </Box>
        </Box>

        {/* Live Metrics Strip */}
        <Grid container spacing={2} sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <Grid size={{ xs: 6, sm: 3, md: 2.4 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              TOTAL ROOMS
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FFFFFF" }}>
              {totalRoomsCount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.4 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              AVAILABLE ROOMS
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#4ADE80" }}>
              {availableRoomsCount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.4 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              OCCUPIED / RESERVED
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FDE047" }}>
              {occupiedRoomsCount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2.4 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              CLEANING / MAINT
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#F87171" }}>
              {maintenanceRoomsCount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 2.4 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              ROOM CATEGORIES
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FFFFFF" }}>
              {roomTypes.length}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* ========================================================================= */}
      {/* 3D SEGMENTED TAB SWITCHER                                                 */}
      {/* ========================================================================= */}
      <Paper
        className="card-3d"
        sx={{
          p: 0.8,
          mb: 3,
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 6px 18px rgba(12, 39, 59, 0.05)",
          display: "inline-flex",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{
            minHeight: "auto",
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label={`🏨 Individual Rooms Inventory (${rooms.length})`}
            sx={{
              fontWeight: 800,
              fontSize: "0.85rem",
              borderRadius: "12px",
              py: 1,
              px: 2.5,
              minHeight: "auto",
              color: activeTab === 0 ? "#FFFFFF" : themeConfig.textMuted,
              bgcolor: activeTab === 0 ? themeConfig.primary : "transparent",
              boxShadow: activeTab === 0 ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
              transition: "all 0.2s ease",
            }}
          />
          <Tab
            label={`🏷️ Room Categories & Tariffs (${roomTypes.length})`}
            sx={{
              fontWeight: 800,
              fontSize: "0.85rem",
              borderRadius: "12px",
              py: 1,
              px: 2.5,
              minHeight: "auto",
              color: activeTab === 1 ? "#FFFFFF" : themeConfig.textMuted,
              bgcolor: activeTab === 1 ? themeConfig.primary : "transparent",
              boxShadow: activeTab === 1 ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
              transition: "all 0.2s ease",
            }}
          />
        </Tabs>
      </Paper>

      {/* ========================================================================= */}
      {/* TAB 0: INDIVIDUAL ROOMS INVENTORY & FLOORS                                */}
      {/* ========================================================================= */}
      {activeTab === 0 && (
        <Box>
          {/* 3D Filter & Search Strip */}
          <Paper
            className="card-3d"
            sx={{
              p: 2,
              mb: 3,
              borderRadius: "18px",
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 6px 20px rgba(12, 39, 59, 0.04)",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              size="small"
              placeholder="Search room number, type, notes..."
              value={roomSearch}
              onChange={(e) => {
                setRoomSearch(e.target.value);
                setPage(0);
              }}
              sx={{
                width: { xs: "100%", sm: "300px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: themeConfig.bgMain,
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

            {/* Floor Filters */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, mr: 0.5 }}>
                FLOOR:
              </Typography>
              {["ALL", ...availableFloors].map((fl) => {
                const isSelected = floorFilter === String(fl);
                return (
                  <Chip
                    key={fl}
                    label={fl === "ALL" ? "All Floors" : `Floor ${fl}`}
                    clickable
                    onClick={() => {
                      setFloorFilter(String(fl));
                      setPage(0);
                    }}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      bgcolor: isSelected ? themeConfig.primary : themeConfig.champagne,
                      color: isSelected ? "#FFFFFF" : themeConfig.primaryDark,
                      border: `1px solid ${isSelected ? themeConfig.primary : themeConfig.border}`,
                      boxShadow: isSelected ? `0 3px 8px ${themeConfig.primaryGlow}` : "none",
                    }}
                  />
                );
              })}
            </Box>

            {/* Status Filter */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, mr: 0.5 }}>
                STATUS:
              </Typography>
              {["ALL", "AVAILABLE", "OCCUPIED", "CLEANING", "MAINTENANCE"].map((st) => {
                const isSelected = statusFilter === st;
                return (
                  <Chip
                    key={st}
                    label={st === "ALL" ? "All" : st}
                    clickable
                    onClick={() => {
                      setStatusFilter(st);
                      setPage(0);
                    }}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      borderRadius: "8px",
                      fontSize: "0.72rem",
                      bgcolor: isSelected ? themeConfig.primaryDark : themeConfig.champagne,
                      color: isSelected ? "#FFFFFF" : themeConfig.primaryDark,
                      border: `1px solid ${isSelected ? themeConfig.primaryDark : themeConfig.border}`,
                    }}
                  />
                );
              })}
            </Box>
          </Paper>

          {/* Rooms Inventory Master Table */}
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
            <Table stickyHeader sx={{ minWidth: 950 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain, py: 1.6 }}>Room & Floor</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Room Category</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Seating / Capacity</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Daily Tariff (₹)</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Operational Status</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>Notes / Features</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: themeConfig.textMain }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 6, textAlign: "center" }}>
                      <EmptyState
                        title="No Rooms Found"
                        description={
                          rooms.length === 0
                            ? "No rooms created yet. Click '+ Add New Room' above to create your hotel's rooms."
                            : "No rooms match your filter criteria."
                        }
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRooms.map((room) => {
                    const roomTypeObj = typeof room.roomType === "object" ? room.roomType : roomTypes.find((t) => t._id === room.roomType);
                    const effectivePrice = room.customPricePerNight || roomTypeObj?.basePrice || 4000;
                    const seating = room.seatingCapacity || roomTypeObj?.capacity?.adults || 2;

                    return (
                      <TableRow
                        key={room._id || room.roomNumber}
                        hover
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": { bgcolor: "rgba(11, 142, 224, 0.04)" },
                        }}
                      >
                        {/* Room Number & Floor */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "10px",
                                bgcolor: themeConfig.primary,
                                color: "#FFFFFF",
                                fontWeight: 900,
                                fontSize: "0.95rem",
                                boxShadow: `0 4px 10px ${themeConfig.primaryGlow}`,
                              }}
                            >
                              {room.roomNumber}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                                Room {room.roomNumber}
                              </Typography>
                              <Chip
                                label={`Floor ${room.floor || 1}`}
                                size="small"
                                sx={{
                                  fontSize: "0.68rem",
                                  fontWeight: 800,
                                  height: "18px",
                                  bgcolor: themeConfig.champagne,
                                  color: themeConfig.primaryDark,
                                  border: `1px solid ${themeConfig.border}`,
                                  mt: 0.3,
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Room Category */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primaryDark }}>
                            {roomTypeObj?.name || "Standard Room"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                            {roomTypeObj?.description?.slice(0, 32) || "Standard suite amenities"}...
                          </Typography>
                        </TableCell>

                        {/* Seating / Bed Capacity */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                            <EventSeat fontSize="small" sx={{ color: themeConfig.primary, fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                              {seating} Persons / Seats
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Tariff */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                            ₹{effectivePrice.toLocaleString("en-IN")}
                            <Typography component="span" variant="caption" sx={{ color: themeConfig.textMuted, ml: 0.5 }}>
                              / night
                            </Typography>
                          </Typography>
                          {room.customPricePerNight && (
                            <Chip label="Custom Tariff" size="small" sx={{ height: 16, fontSize: "0.65rem", bgcolor: "#FEF3C7", color: "#B45309" }} />
                          )}
                        </TableCell>

                        {/* Status */}
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <StatusChip status={room.status || "AVAILABLE"} size="small" />
                          </Box>
                        </TableCell>

                        {/* Notes */}
                        <TableCell sx={{ maxWidth: 220 }}>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", lineHeight: 1.3 }}>
                            {room.notes || "Standard check-in room configuration"}
                          </Typography>
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                            <Tooltip title="Edit Room Details">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  setRoomModal({
                                    open: true,
                                    mode: "EDIT",
                                    data: {
                                      _id: room._id,
                                      roomNumber: room.roomNumber,
                                      roomType: typeof room.roomType === "object" ? room.roomType._id : room.roomType,
                                      floor: room.floor || 1,
                                      seatingCapacity: room.seatingCapacity || 2,
                                      customPricePerNight: room.customPricePerNight || "",
                                      status: room.status || "AVAILABLE",
                                      notes: room.notes || "",
                                    },
                                  })
                                }
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

                            <Tooltip title="Delete Room">
                              <IconButton
                                size="small"
                                onClick={() => onDeleteRoom && onDeleteRoom(room)}
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
                    );
                  })
                )}
              </TableBody>
            </Table>
            {filteredRooms.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredRooms.length}
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
                }}
              />
            )}
          </TableContainer>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: ROOM CATEGORIES & BASE TARIFFS                                     */}
      {/* ========================================================================= */}
      {activeTab === 1 && (
        <Box>
          {roomTypes.length === 0 ? (
            <Card
              className="card-3d"
              sx={{
                p: 4,
                borderRadius: "20px",
                border: `1px solid ${themeConfig.border}`,
                bgcolor: "#FFFFFF",
                boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
              }}
            >
              <EmptyState
                title="No Room Categories Defined"
                description="No room types have been configured yet. Click 'Add Category' to create your first category."
              />
            </Card>
          ) : (
            <Grid container spacing={3}>
              {roomTypes.map((rt) => {
                const linkedRoomsCount = rooms.filter((r) => {
                  const typeId = typeof r.roomType === "object" ? r.roomType?._id : r.roomType;
                  return typeId === rt._id;
                }).length;

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rt._id}>
                    <Card
                      className="card-3d"
                      sx={{
                        borderRadius: "22px",
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
                        background: "linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 16px 32px -6px rgba(12, 39, 59, 0.12), inset 0 1px 1px #FFFFFF",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                              {rt.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                              Max {rt.capacity?.adults || rt.maxAdults || 2} Adults, {rt.capacity?.children || rt.maxChildren || 1} Children
                            </Typography>
                          </Box>
                          <Chip
                            label={`₹${rt.basePrice}/night`}
                            sx={{
                              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                              color: "#FFFFFF",
                              fontWeight: 900,
                              borderRadius: "10px",
                              boxShadow: `0 2px 8px ${themeConfig.primaryGlow}`,
                            }}
                          />
                        </Box>

                        <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2, lineHeight: 1.5, minHeight: 44 }}>
                          {rt.description || "Premium comfortable room with attached bathroom and modern hotel amenities."}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Chip
                            label={`🏨 ${linkedRoomsCount} Linked Rooms`}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.72rem",
                              bgcolor: themeConfig.champagne,
                              color: themeConfig.primaryDark,
                              border: `1px solid ${themeConfig.border}`,
                            }}
                          />
                        </Box>

                        <Divider sx={{ my: 1.5, borderColor: themeConfig.border }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => onDeleteRoomType && onDeleteRoomType(rt)}
                            sx={{
                              borderRadius: "10px",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              borderColor: "rgba(220, 38, 38, 0.3)",
                              color: themeConfig.danger,
                              "&:hover": { borderColor: themeConfig.danger, bgcolor: "rgba(220, 38, 38, 0.08)" },
                            }}
                          >
                            Delete Category
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      )}

      {/* ========================================================================= */}
      {/* 3D MODAL: ADD / EDIT ROOM                                                 */}
      {/* ========================================================================= */}
      <Dialog
        open={roomModal.open}
        onClose={() => setRoomModal({ ...roomModal, open: false })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 24px 50px rgba(0,0,0,0.2)",
            },
          },
        }}
      >
        <form onSubmit={onSaveRoom}>
          <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
              {roomModal.mode === "ADD" ? "Create New Hotel Room" : `Edit Room ${roomModal.data?.roomNumber}`}
            </Typography>
            <IconButton onClick={() => setRoomModal({ ...roomModal, open: false })} sx={{ borderRadius: "10px" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
            <Grid container spacing={2.5}>
              {/* Room Number */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Room Number *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  value={roomModal.data?.roomNumber || ""}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, roomNumber: e.target.value } })}
                  placeholder="e.g. 101, 204, Penthouse-A"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Floor */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Floor Level *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  type="number"
                  value={roomModal.data?.floor || 1}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, floor: Number(e.target.value) } })}
                  placeholder="1"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Room Category */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Room Category / Type *
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  required
                  value={roomModal.data?.roomType || (roomTypes[0]?._id || "")}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, roomType: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  {roomTypes.map((rt) => (
                    <MenuItem key={rt._id} value={rt._id}>
                      {rt.name} (Base: ₹{rt.basePrice})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Seating / Bed Capacity */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Seating / Guest Capacity *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  type="number"
                  value={roomModal.data?.seatingCapacity || 2}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, seatingCapacity: Number(e.target.value) } })}
                  placeholder="2"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Custom Tariff */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Custom Price per Night (₹)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={roomModal.data?.customPricePerNight || ""}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, customPricePerNight: e.target.value } })}
                  placeholder="Leave empty for category base price"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Status */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Initial Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={roomModal.data?.status || "AVAILABLE"}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, status: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="AVAILABLE">AVAILABLE (Clean & Ready)</MenuItem>
                  <MenuItem value="CLEANING">CLEANING (Housekeeping)</MenuItem>
                  <MenuItem value="MAINTENANCE">MAINTENANCE (Repair Work)</MenuItem>
                  <MenuItem value="OCCUPIED">OCCUPIED (In-House Guest)</MenuItem>
                  <MenuItem value="BLOCKED">BLOCKED (Admin Lock)</MenuItem>
                </TextField>
              </Grid>

              {/* Notes */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Room Features & Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  value={roomModal.data?.notes || ""}
                  onChange={(e) => setRoomModal({ ...roomModal, data: { ...roomModal.data, notes: e.target.value } })}
                  placeholder="e.g. Sea view balcony, King sized bed, near lobby elevator..."
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, bgcolor: themeConfig.bgMain }}>
            <Button onClick={() => setRoomModal({ ...roomModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="btn-3d"
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                color: "#FFFFFF",
                fontWeight: 900,
                borderRadius: "12px",
                px: 3.5,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
              }}
            >
              {roomModal.mode === "ADD" ? "Save & Create Room" : "Update Room"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ========================================================================= */}
      {/* 3D MODAL: ADD / EDIT ROOM CATEGORY                                        */}
      {/* ========================================================================= */}
      <Dialog
        open={typeModal.open}
        onClose={() => setTypeModal({ ...typeModal, open: false })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "22px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "0 24px 48px -12px rgba(12, 39, 59, 0.22), inset 0 1px 1px #FFFFFF",
            },
          },
        }}
      >
        <form onSubmit={onSaveRoomType}>
          <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              Add New Room Category
            </Typography>
            <IconButton onClick={() => setTypeModal({ ...typeModal, open: false })} sx={{ borderRadius: "10px" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Room Category Name *"
                required
                fullWidth
                size="small"
                value={typeModal.data.name}
                onChange={(e) => setTypeModal({ ...typeModal, data: { ...typeModal.data, name: e.target.value } })}
                placeholder="e.g. Royal Presidential Suite"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <TextField
                label="Base Tariff per Night (₹) *"
                required
                type="number"
                fullWidth
                size="small"
                value={typeModal.data.basePrice}
                onChange={(e) => setTypeModal({ ...typeModal, data: { ...typeModal.data, basePrice: Number(e.target.value) } })}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Max Adults"
                  type="number"
                  fullWidth
                  size="small"
                  value={typeModal.data.maxAdults}
                  onChange={(e) => setTypeModal({ ...typeModal, data: { ...typeModal.data, maxAdults: Number(e.target.value) } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  label="Max Children"
                  type="number"
                  fullWidth
                  size="small"
                  value={typeModal.data.maxChildren}
                  onChange={(e) => setTypeModal({ ...typeModal, data: { ...typeModal.data, maxChildren: Number(e.target.value) } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Box>

              <TextField
                label="Description & Amenities"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={typeModal.data.description}
                onChange={(e) => setTypeModal({ ...typeModal, data: { ...typeModal.data, description: e.target.value } })}
                placeholder="King bed, sea view balcony, jacuzzi, free breakfast..."
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button onClick={() => setTypeModal({ ...typeModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
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
              Save Category
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
