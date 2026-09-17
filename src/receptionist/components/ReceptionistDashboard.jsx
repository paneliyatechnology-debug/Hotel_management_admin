"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { Download, Print } from "@mui/icons-material";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { downloadTaxInvoicePDF } from "@/shared/utils/pdfGenerator";
import SettingsView from "@/shared/components/SettingsView";
import AvailableRoomsPage from "../pages/AvailableRoomsPage";
import InHouseFoliosPage from "../pages/InHouseFoliosPage";
import CheckInWizardPage from "../pages/CheckInWizardPage";
import GovtIdCompliancePage from "../pages/GovtIdCompliancePage";
import PosSettlementPage from "../pages/PosSettlementPage";

export default function ReceptionistDashboard({ user, activeNav = 0, onTabChange }) {
  const { themeConfig } = useAppTheme();

  const [hotelSettings, setHotelSettings] = useState(
    user?.hotel?.settings || { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" }
  );
  const [dashboardData, setDashboardData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });

  // 5-Step Check-in Stepper State
  const [activeStep, setActiveStep] = useState(0);
  const [checkInData, setCheckInData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "Male",
    dob: "",
    nationality: "Indian",
    address: "",
    emergencyContact: "",
    govtIdType: "AADHAAR",
    govtIdNumber: "",
    frontImage: "",
    backImage: "",
    idStatus: "Verified",
    roomType: "Deluxe King Room",
    roomNumber: "101",
    checkInDate: new Date().toISOString().split("T")[0],
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    adults: 2,
    children: 0,
    rate: 4500,
    total: 4500,
    paid: 4500,
    due: 0,
    paymentMethod: "UPI",
  });

  // Dialogs
  const [posChargeDialog, setPosChargeDialog] = useState({ open: false, booking: null, serviceType: "ROOM_SERVICE", amount: 650, description: "Breakfast & Sparkling Water" });
  const [invoiceModal, setInvoiceModal] = useState({ open: false, booking: null });

  useEffect(() => {
    fetchFrontDeskData();
  }, []);

  const fetchFrontDeskData = async () => {
    setLoading(true);
    try {
      const [dashRes, roomsRes, bookRes, guestRes] = await Promise.allSettled([
        apiRequest(API_ENDPOINTS.RECEPTIONIST.DASHBOARD),
        apiRequest(API_ENDPOINTS.RECEPTIONIST.AVAILABLE_ROOMS),
        apiRequest(API_ENDPOINTS.RECEPTIONIST.BOOKINGS),
        apiRequest(API_ENDPOINTS.RECEPTIONIST.GUESTS),
      ]);

      if (dashRes.status === "fulfilled" && dashRes.value?.data) {
        setDashboardData(dashRes.value.data);
      }
      if (roomsRes.status === "fulfilled" && (roomsRes.value?.data || Array.isArray(roomsRes.value))) {
        setRooms(roomsRes.value.data || roomsRes.value || []);
      }
      if (bookRes.status === "fulfilled" && (bookRes.value?.data || Array.isArray(bookRes.value))) {
        setBookings(bookRes.value.data || bookRes.value || []);
      }
      if (guestRes.status === "fulfilled" && (guestRes.value?.data || Array.isArray(guestRes.value))) {
        setGuests(guestRes.value.data || guestRes.value || []);
      }
    } catch (err) {
      console.error("Front desk error:", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, severity = "success") => {
    setNotification({ show: true, message, severity });
    setTimeout(() => setNotification({ show: false, message: "", severity: "success" }), 4000);
  };

  const handleFinalCheckIn = async () => {
    try {
      const payload = {
        guestId: checkInData.guestId,
        fullName: checkInData.fullName,
        mobileNumber: checkInData.mobile,
        email: checkInData.email,
        address: checkInData.address,
        govtIdType: checkInData.govtIdType || "AADHAAR",
        govtIdNumber: checkInData.govtIdNumber || "PENDING",
        reusePreviousId: checkInData.reusePreviousId !== false,
        roomId: checkInData.roomId,
        roomNumber: checkInData.roomNumber,
        checkInDate: checkInData.checkInDate,
        checkOutDate: checkInData.checkOutDate,
        adults: checkInData.adults || 1,
        children: checkInData.children || 0,
        advancePaymentAmount: checkInData.paid !== undefined ? checkInData.paid : checkInData.total || 0,
        paymentMethod: checkInData.paymentMethod || "CASH",
        transactionId: checkInData.transactionId || "",
        paymentReference: checkInData.paymentReference || "",
        paymentNote: `${checkInData.paymentMethod || "CASH"} settlement at check-in`,
        isInstantCheckIn: true,
      };

      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.BOOKINGS, {
        method: "POST",
        body: payload,
      });

      showToast(res.message || `Guest ${checkInData.fullName} successfully checked in to Room ${checkInData.roomNumber}!`);
      await fetchFrontDeskData();
      setActiveStep(0);
      setCheckInData({
        fullName: "",
        mobile: "",
        email: "",
        address: "",
        govtIdType: "AADHAAR",
        govtIdNumber: "",
        roomNumber: "",
        checkInDate: new Date().toISOString().split("T")[0],
        checkOutDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        rate: 3500,
        total: 3500,
        paid: 3500,
        due: 0,
        paymentMethod: "UPI",
      });
      if (onTabChange) onTabChange(1);
    } catch (err) {
      showToast(err.message || "Failed to process check-in", "error");
    }
  };

  const handleVerifyGuestId = async (guestId) => {
    try {
      await apiRequest(API_ENDPOINTS.RECEPTIONIST.VERIFY_GUEST_ID(guestId), {
        method: "PUT",
        body: { status: "VERIFIED" },
      });
      setGuests(guests.map((g) => (g._id === guestId ? { ...g, idVerified: true } : g)));
      showToast("Regulatory ID stamped and verified in police ledger!");
    } catch (err) {
      showToast(err.message || "Failed to verify guest ID", "error");
    }
  };

  const handleRoomStatusToggle = async (room, explicitStatus = null) => {
    try {
      const nextStatus =
        explicitStatus ||
        (room.status === "AVAILABLE"
          ? "OCCUPIED"
          : room.status === "OCCUPIED"
          ? "CLEANING"
          : room.status === "CLEANING"
          ? "AVAILABLE"
          : "AVAILABLE");

      await apiRequest(API_ENDPOINTS.RECEPTIONIST.UPDATE_ROOM_STATUS(room._id), {
        method: "PUT",
        body: { status: nextStatus },
      });

      setRooms(rooms.map((r) => (r._id === room._id ? { ...r, status: nextStatus } : r)));
      showToast(`Room ${room.roomNumber} status updated to ${nextStatus}`);
      await fetchFrontDeskData();
    } catch (err) {
      showToast(err.message || "Failed to update room status", "error");
    }
  };

  const handleCheckOut = async (bookingOrId, settlementData = {}) => {
    try {
      const bookingId = typeof bookingOrId === "string" ? bookingOrId : (bookingOrId?._id || bookingOrId?.id);
      const amount = settlementData.settlementPaymentAmount !== undefined
        ? settlementData.settlementPaymentAmount
        : (typeof bookingOrId === "object" ? (bookingOrId.dueAmount || 0) : 0);
      const method = settlementData.paymentMethod || "CASH";

      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.CHECKOUT(bookingId), {
        method: "POST",
        body: {
          settlementPaymentAmount: Number(amount) || 0,
          paymentMethod: method,
          transactionId: settlementData.transactionId || "",
          paymentReference: settlementData.paymentReference || "",
        },
      });
      showToast(res.message || "Booking checked out successfully! Room marked for cleaning.");
      await fetchFrontDeskData();
    } catch (err) {
      showToast(err.message || "Failed to process checkout", "error");
    }
  };

  const handleAddPosCharge = async () => {
    if (!posChargeDialog.booking) return;
    try {
      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.ADD_CHARGE(posChargeDialog.booking._id), {
        method: "POST",
        body: {
          type: posChargeDialog.serviceType,
          title: posChargeDialog.description,
          amount: Number(posChargeDialog.amount),
        },
      });
      showToast(res.message || "POS charge added to guest folio!");
      setPosChargeDialog({ open: false, booking: null, serviceType: "ROOM_SERVICE", amount: 650, description: "" });
      await fetchFrontDeskData();
    } catch (err) {
      showToast(err.message || "Failed to add charge", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: themeConfig.bgMain, pb: 8 }}>
      {/* Toast Notification */}
      {notification.show && (
        <Alert
          severity={notification.severity}
          sx={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            boxShadow: themeConfig.shadowModal,
            borderRadius: 0,
            bgcolor: notification.severity === "success" ? "#FAF9F6" : "#FFF5F5",
            border: `1px solid ${notification.severity === "success" ? themeConfig.success : themeConfig.danger}`,
          }}
        >
          {notification.message}
        </Alert>
      )}

      {/* ROUTE 0: AVAILABLE ROOMS & FRONT DESK OVERVIEW */}
      {activeNav === 0 && (
        <AvailableRoomsPage
          user={user}
          rooms={rooms}
          guests={guests}
          bookings={bookings}
          dashboardData={dashboardData}
          hotelSettings={hotelSettings}
          onRefresh={fetchFrontDeskData}
          onNavigateTab={(tab) => onTabChange && onTabChange(tab)}
          onRoomStatusChange={handleRoomStatusToggle}
        />
      )}

      {/* ROUTE 1: IN-HOUSE FOLIOS */}
      {activeNav === 1 && (
        <InHouseFoliosPage
          bookings={bookings}
          hotelSettings={hotelSettings}
          onCheckOut={handleCheckOut}
          onOpenInvoice={(b) => setInvoiceModal({ open: true, booking: b })}
          onOpenPosCharge={(b) => setPosChargeDialog({ open: true, booking: b, serviceType: "ROOM_SERVICE", amount: 850, description: "Dinner Service" })}
        />
      )}

      {/* ROUTE 2: 5-STEP CHECK-IN WIZARD */}
      {activeNav === 2 && (
        <CheckInWizardPage
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          checkInData={checkInData}
          setCheckInData={setCheckInData}
          hotelSettings={hotelSettings}
          rooms={rooms}
          guests={guests}
          bookings={bookings}
          onFinalCheckIn={handleFinalCheckIn}
        />
      )}

      {/* ROUTE 3: GOVT ID COMPLIANCE HUB */}
      {activeNav === 3 && (
        <GovtIdCompliancePage
          guests={guests}
          hotelSettings={{ ...hotelSettings, ...(user?.hotel || {}) }}
          onVerifyGuestId={handleVerifyGuestId}
        />
      )}

      {/* ROUTE 4: POS CHARGES & SETTLEMENT */}
      {activeNav === 4 && (
        <PosSettlementPage
          user={user}
          hotelSettings={hotelSettings}
          bookings={bookings}
          onOpenPosCharge={(b) => setPosChargeDialog({ open: true, booking: b, serviceType: "ROOM_SERVICE", amount: 850, description: "Dinner Service" })}
          onOpenInvoice={(b) => setInvoiceModal({ open: true, booking: b })}
          onRefresh={fetchFrontDeskData}
        />
      )}

      {/* ROUTE 5: SETTINGS & PROFILE */}
      {activeNav === 5 && (
        <SettingsView
          user={{ ...user, hotel: { ...user?.hotel, settings: hotelSettings } }}
          onUpdateHotelSettings={(newSettings) => setHotelSettings(newSettings)}
        />
      )}

      {/* POS Charge Modal */}
      <Dialog
        open={posChargeDialog.open}
        onClose={() => setPosChargeDialog({ ...posChargeDialog, open: false })}
        slotProps={{ paper: { sx: { borderRadius: "20px", p: 2, border: `1px solid ${themeConfig.border}`, maxWidth: 480 } } }}
      >
        <DialogTitle component="div" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
          Post Ancillary Charge (Room {posChargeDialog.booking?.roomNumber || posChargeDialog.booking?.room?.roomNumber})
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Charge Category</InputLabel>
              <Select
                value={posChargeDialog.serviceType}
                label="Charge Category"
                onChange={(e) => setPosChargeDialog({ ...posChargeDialog, serviceType: e.target.value })}
              >
                <MenuItem value="ROOM_SERVICE">🍽️ In-Room Dining / Restaurant</MenuItem>
                <MenuItem value="LAUNDRY">👔 Express Laundry & Dry Cleaning</MenuItem>
                <MenuItem value="SPA">💆 Spa & Wellness Therapy</MenuItem>
                <MenuItem value="MINI_BAR">🥤 Mini Bar Refreshment</MenuItem>
                <MenuItem value="TRANSPORT">🚕 Airport Shuttle & Cab</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Item / Service Description"
              placeholder="e.g. Dinner Buffet for 2, Dry Cleaning 3 Shirts"
              value={posChargeDialog.description}
              onChange={(e) => setPosChargeDialog({ ...posChargeDialog, description: e.target.value })}
              fullWidth
            />
            <TextField
              size="small"
              label="Amount (₹) *"
              type="number"
              value={posChargeDialog.amount}
              onChange={(e) => setPosChargeDialog({ ...posChargeDialog, amount: Number(e.target.value) })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setPosChargeDialog({ ...posChargeDialog, open: false })} sx={{ borderRadius: "10px" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPosCharge}
            className="btn-3d"
            sx={{
              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
              borderRadius: "10px",
              fontWeight: 800,
            }}
          >
            Post to Folio
          </Button>
        </DialogActions>
      </Dialog>

      {/* Printable GST Tax Receipt & Invoice Modal */}
      <Dialog
        open={invoiceModal.open}
        onClose={() => setInvoiceModal({ open: false, booking: null })}
        slotProps={{ paper: { sx: { borderRadius: "20px", p: 3, maxWidth: 680, border: `1px solid ${themeConfig.border}` } } }}
      >
        {invoiceModal.booking && (
          <Box sx={{ p: 1 }} id="printable-invoice">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", pb: 2, borderBottom: `2px solid ${themeConfig.primary}` }}>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                  {user?.hotel?.name || "Grand Royale Luxury Resort & Spa"}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  {user?.hotel?.address || "Front Desk Operations Center"}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  GSTIN: {user?.hotel?.gstNumber || "24AAACG1234F1Z5"} &bull; UPI: {hotelSettings?.upiId || "jatinkakadiya234-1@okicici"}
                </Typography>
              </div>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                  OFFICIAL TAX INVOICE
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  Folio: #{invoiceModal.booking.bookingNumber}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  Date: {new Date().toLocaleDateString("en-IN")}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ my: 2.5, display: "flex", justifyContent: "space-between", fontSize: "0.85rem", bgcolor: themeConfig.champagne, p: 2, borderRadius: "12px" }}>
              <div>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, textTransform: "uppercase" }}>Billed To:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                  {invoiceModal.booking.guest?.name || invoiceModal.booking.guest?.fullName || "Resident Guest"}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  Phone: {invoiceModal.booking.guest?.phone || invoiceModal.booking.guest?.mobileNumber || "N/A"}
                </Typography>
              </div>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, textTransform: "uppercase" }}>Room Allocation:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                  Room {invoiceModal.booking.roomNumber || invoiceModal.booking.room?.roomNumber}
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                  In: {invoiceModal.booking.checkInDate} &bull; Out: {invoiceModal.booking.checkOutDate}
                </Typography>
              </Box>
            </Box>

            <TableContainer sx={{ mb: 2, borderRadius: "12px", border: `1px solid ${themeConfig.border}` }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: themeConfig.champagne }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>Description</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>Amount (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Room Accommodation Tariff</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>₹{invoiceModal.booking.totalAmount?.toLocaleString()}</TableCell>
                  </TableRow>
                  {(invoiceModal.booking.posCharges || []).map((c, i) => (
                    <TableRow key={i}>
                      <TableCell>POS: {c.item || c.title || c.type || "Ancillary Service"}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>₹{(c.amount || 0).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: themeConfig.champagne }}>
                    <TableCell sx={{ fontWeight: 800 }}>CGST (6%) + SGST (6%)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800 }}>
                      ₹{Math.round(((invoiceModal.booking.totalAmount || 0) + (invoiceModal.booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0)) * 0.12).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900, fontSize: "1rem" }}>Grand Total (Incl. GST)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900, fontSize: "1.1rem", color: themeConfig.primary }}>
                      ₹{Math.round(((invoiceModal.booking.totalAmount || 0) + (invoiceModal.booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0)) * 1.12).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, color: themeConfig.textMuted }}>Amount Paid</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: "#059669" }}>
                      ₹{(invoiceModal.booking.paidAmount || 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900, color: themeConfig.danger }}>Balance Outstanding</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900, color: themeConfig.danger }}>
                      ₹{Math.max(0, ((invoiceModal.booking.totalAmount || 0) + (invoiceModal.booking.posCharges || []).reduce((s, c) => s + (c.amount || 0), 0)) - (invoiceModal.booking.paidAmount || 0)).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <DialogActions sx={{ p: 0, pt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button onClick={() => setInvoiceModal({ open: false, booking: null })} sx={{ borderRadius: "10px" }}>
                Close
              </Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => {
                    downloadTaxInvoicePDF(invoiceModal.booking, { ...hotelSettings, ...(user?.hotel || {}) });
                    showToast("PDF Tax Invoice opened / downloaded successfully!");
                  }}
                  sx={{ borderRadius: "10px", borderColor: themeConfig.border, color: themeConfig.textMain, fontWeight: 700 }}
                >
                  Download PDF
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Print />}
                  onClick={() => {
                    downloadTaxInvoicePDF(invoiceModal.booking, { ...hotelSettings, ...(user?.hotel || {}) });
                  }}
                  className="btn-3d"
                  sx={{
                    background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                    borderRadius: "10px",
                    fontWeight: 800,
                  }}
                >
                  Print / Save PDF
                </Button>
              </Box>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
