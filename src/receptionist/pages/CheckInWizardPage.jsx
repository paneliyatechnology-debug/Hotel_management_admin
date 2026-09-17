"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Chip,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import {
  CheckCircle,
  VerifiedUser,
  Star,
  Hotel as HotelIcon,
  MeetingRoom,
  Badge,
  Phone,
  Person,
  Home,
  CreditCard,
  ArrowForward,
  ArrowBack,
  AutoAwesome,
  History,
  Security,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { formatTime12Hour } from "@/shared/utils/timeUtils";

const CHECKIN_STEPS = [
  "Guest Profile",
  "ID Document",
  "Room Allocation",
  "Payment Settlement",
  "Review & Check-In",
];

export default function CheckInWizardPage({
  activeStep,
  setActiveStep,
  checkInData,
  setCheckInData,
  hotelSettings = { checkInTime: "14:00", checkOutTime: "12:00", timezone: "Asia/Kolkata" },
  rooms = [],
  guests = [],
  bookings = [],
  onFinalCheckIn,
}) {
  const { themeConfig } = useAppTheme();
  const checkInTimeFormatted = formatTime12Hour(hotelSettings?.checkInTime || "14:00");
  const checkOutTimeFormatted = formatTime12Hour(hotelSettings?.checkOutTime || "12:00");
  const timezoneStr = hotelSettings?.timezone || "Asia/Kolkata";

  // Filter clean and ready available rooms
  const availableRooms = rooms.filter((r) => r.status === "AVAILABLE");

  // Calculate stay duration (nights)
  const calculateNights = (inDate, outDate) => {
    try {
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      return Math.max(1, isNaN(diffDays) ? 1 : diffDays);
    } catch {
      return 1;
    }
  };

  const nights = calculateNights(checkInData.checkInDate, checkInData.checkOutDate);

  // Phone number lookup & repeat guest logic (Auto-detects when full 10-digit number matches)
  const handlePhoneChange = async (val) => {
    const rawVal = val.trim();
    const queryDigits = rawVal.replace(/\D/g, "");
    setCheckInData((prev) => ({ ...prev, mobile: val }));

    if (queryDigits.length === 10) {
      // 1. Check in loaded local guests list first for instant response
      const matched = guests.find((g) => {
        const p = (g.phone || g.mobileNumber || "").replace(/\D/g, "");
        return p === queryDigits;
      });

      if (matched) {
        applyGuestData(matched);
        return;
      }

      // 2. Query backend guest lookup for historical database record
      try {
        const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.GUEST_LOOKUP(queryDigits));
        if (res?.data) {
          applyGuestData(res.data);
        }
      } catch {
        // New guest - keep fields clear
      }
    } else if (queryDigits.length < 10 && checkInData.isRepeatGuest) {
      // If user edits/clears phone number, reset returning guest recognition
      setCheckInData((prev) => ({
        ...prev,
        guestId: undefined,
        isRepeatGuest: false,
        totalVisits: 1,
        hasVerifiedId: false,
        reusePreviousId: false,
      }));
    }
  };

  const applyGuestData = (guest) => {
    const totalVisits = guest.totalVisits || (bookings.filter((b) => (b.guest?._id || b.guest) === guest._id).length || 1);
    const idNum = guest.govtIdNumber || guest.idNumber || guest.idProof?.idNumber || "";
    const isIdVerified = guest.idVerified || guest.idProof?.verificationStatus === "VERIFIED" || Boolean(idNum && idNum !== "PENDING");

    setCheckInData((prev) => ({
      ...prev,
      guestId: guest._id,
      fullName: guest.name || guest.fullName || prev.fullName,
      email: guest.email || prev.email,
      address: guest.address || prev.address,
      govtIdType: guest.govtIdType || guest.idType || guest.idProof?.idType || prev.govtIdType || "AADHAAR",
      govtIdNumber: idNum || prev.govtIdNumber,
      isRepeatGuest: true,
      totalVisits: Math.max(totalVisits, 2),
      lastStayDate: guest.updatedAt || guest.createdAt || new Date().toISOString(),
      hasVerifiedId: isIdVerified,
      reusePreviousId: isIdVerified,
    }));
  };

  // Select Room Handler
  const handleSelectRoom = (roomNum) => {
    const selected = rooms.find((r) => String(r.roomNumber) === String(roomNum));
    if (selected) {
      const roomTypeObj = typeof selected.roomType === "object" ? selected.roomType : null;
      const ratePerNight = selected.customPricePerNight || roomTypeObj?.basePrice || selected.basePrice || 3500;
      const totalCost = ratePerNight * nights;

      setCheckInData((prev) => ({
        ...prev,
        roomId: selected._id,
        roomNumber: selected.roomNumber,
        roomType: roomTypeObj?.name || selected.type || "Deluxe Suite",
        floor: selected.floor || 1,
        rate: ratePerNight,
        total: totalCost,
        paid: totalCost,
        due: 0,
      }));
    }
  };

  // Recalculate total if dates change
  const handleDateChange = (field, val) => {
    const updated = { ...checkInData, [field]: val };
    const n = calculateNights(updated.checkInDate, updated.checkOutDate);
    const newTotal = (updated.rate || 3500) * n;
    setCheckInData({
      ...updated,
      total: newTotal,
      paid: newTotal,
      due: 0,
    });
  };

  // Mask ID Number for privacy (e.g. **** 4321)
  const formatMaskedId = (idStr) => {
    if (!idStr || idStr === "PENDING") return "ID On Record";
    if (idStr.length <= 4) return idStr;
    return `•••• •••• ${idStr.slice(-4)}`;
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 3.5 }, py: { xs: 2, sm: 3.5 } }}>
      <Card
        className="card-3d"
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: "24px",
          bgcolor: "#FFFFFF",
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 12px 30px -5px rgba(12, 39, 59, 0.08), inset 0 1px 1px #FFFFFF",
          maxWidth: 960,
          mx: "auto",
        }}
      >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 1 }}>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.5, letterSpacing: -0.5 }}>
            Express Guest Check-In & Registration Wizard
          </Typography>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
            Complete guest registration, returning VIP verification, live available room allocation, and advance billing.
          </Typography>
        </div>

        {checkInData.isRepeatGuest && (
          <Chip
            icon={<Star sx={{ "&&": { color: "#F59E0B" } }} />}
            label={`VIP Returning Guest (${checkInData.totalVisits || 2} Stays)`}
            sx={{
              bgcolor: "rgba(245, 158, 11, 0.12)",
              color: "#B45309",
              fontWeight: 800,
              fontSize: "0.78rem",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              boxShadow: "0 2px 6px rgba(245, 158, 11, 0.1)",
            }}
          />
        )}
      </Box>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3.5 }}>
        {CHECKIN_STEPS.map((label) => (
          <Step key={label}>
            <StepLabel
              slotProps={{
                stepIcon: {
                  sx: {
                    "&.Mui-active": { color: themeConfig.primary },
                    "&.Mui-completed": { color: themeConfig.success },
                  },
                },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* ========================================================================= */}
      {/* STEP 1: GUEST PERSONAL PARTICULARS & REPEAT GUEST DETECTION               */}
      {/* ========================================================================= */}
      {activeStep === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
              Step 1: Primary Guest Particulars
            </Typography>

            {guests.length > 0 && (
              <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                💡 Tip: Type phone number to auto-detect returning hotel guests
              </Typography>
            )}
          </Box>

          {/* Repeat Guest Banner */}
          {checkInData.isRepeatGuest && (
            <Paper
              className="card-3d"
              sx={{
                p: 2.2,
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(254, 243, 199, 0.6) 100%)",
                border: "1.5px solid rgba(245, 158, 11, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "#F59E0B", color: "#FFFFFF", width: 40, height: 40, boxShadow: "0 4px 10px rgba(245, 158, 11, 0.3)" }}>
                  <Star />
                </Avatar>
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#92400E" }}>
                    🎉 Returning Guest Recognized: {checkInData.fullName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#B45309", display: "block" }}>
                    Visited hotel <strong>{checkInData.totalVisits || 2} times</strong> previously &bull; Profile & preferences auto-filled.
                  </Typography>
                </div>
              </Box>
              <Chip
                size="small"
                label={checkInData.hasVerifiedId ? "Verified Govt ID on File" : "ID Stamped"}
                sx={{ bgcolor: "#FFFFFF", color: "#B45309", fontWeight: 800, border: "1px solid rgba(245, 158, 11, 0.4)" }}
              />
            </Paper>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2.2,
            }}
          >
            <TextField
              fullWidth
              label="Mobile Phone *"
              placeholder="Enter 10-digit mobile number"
              value={checkInData.mobile}
              onChange={(e) => handlePhoneChange(e.target.value)}
              helperText="Auto-searches and loads profile when full 10 digits match"
              slotProps={{
                input: {
                  startAdornment: <Phone sx={{ mr: 1, color: themeConfig.textMuted, fontSize: 18 }} />,
                },
              }}
            />

            <TextField
              fullWidth
              label="Full Name *"
              placeholder="e.g. Vikramaditya Singhania"
              value={checkInData.fullName}
              onChange={(e) => setCheckInData({ ...checkInData, fullName: e.target.value })}
              slotProps={{
                input: {
                  startAdornment: <Person sx={{ mr: 1, color: themeConfig.textMuted, fontSize: 18 }} />,
                },
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              placeholder="e.g. guest@example.com"
              value={checkInData.email}
              onChange={(e) => setCheckInData({ ...checkInData, email: e.target.value })}
            />

            <TextField
              fullWidth
              label="Permanent Residential Address"
              placeholder="City, State, Pincode"
              value={checkInData.address}
              onChange={(e) => setCheckInData({ ...checkInData, address: e.target.value })}
              slotProps={{
                input: {
                  startAdornment: <Home sx={{ mr: 1, color: themeConfig.textMuted, fontSize: 18 }} />,
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              disabled={!checkInData.fullName || !checkInData.mobile}
              onClick={() => setActiveStep(1)}
              className="btn-3d"
              endIcon={<ArrowForward />}
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                borderRadius: "12px",
                px: 4,
                fontWeight: 800,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
                "&.Mui-disabled": {
                  background: "rgba(12, 39, 59, 0.1)",
                  color: "rgba(12, 39, 59, 0.35)",
                  boxShadow: "none",
                },
              }}
            >
              Next: ID Verification →
            </Button>
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: REGULATORY GOVT ID & RETURNING GUEST DOCUMENT SMART LOGIC         */}
      {/* ========================================================================= */}
      {activeStep === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
            Step 2: Regulatory Govt ID & Document Stamping
          </Typography>

          {/* Returning Guest Verified Document Option */}
          {checkInData.isRepeatGuest && checkInData.hasVerifiedId ? (
            <Paper
              className="card-3d"
              sx={{
                p: 3,
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(240, 253, 244, 0.8) 100%)",
                border: "1.5px solid #10B981",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ bgcolor: "#10B981", color: "#FFFFFF", width: 36, height: 36, boxShadow: "0 4px 10px rgba(16, 185, 129, 0.3)" }}>
                  <VerifiedUser />
                </Avatar>
                <div>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#065F46" }}>
                    Verified Government ID Already on Record
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#047857" }}>
                    Guest KYC details were previously verified and stamped in hotel compliance records.
                  </Typography>
                </div>
              </Box>

              <Box sx={{ bgcolor: "#FFFFFF", p: 2, borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)", mb: 2 }}>
                <Grid container spacing={2} sx={{ fontSize: "0.85rem" }}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Document Type:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                      {checkInData.govtIdType || "Aadhaar Card"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Registered Number:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                      {formatMaskedId(checkInData.govtIdNumber)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <RadioGroup
                value={checkInData.reusePreviousId !== false ? "REUSE" : "NEW"}
                onChange={(e) => setCheckInData({ ...checkInData, reusePreviousId: e.target.value === "REUSE" })}
              >
                <FormControlLabel
                  value="REUSE"
                  control={<Radio sx={{ color: "#10B981", "&.Mui-checked": { color: "#10B981" } }} />}
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#065F46" }}>
                      ✅ Express Check-In: Reuse existing verified ID (No document re-upload required)
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="NEW"
                  control={<Radio sx={{ color: "#10B981", "&.Mui-checked": { color: "#10B981" } }} />}
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textMain }}>
                      🔄 Update Document: Provide and verify a new Government ID for this stay
                    </Typography>
                  }
                />
              </RadioGroup>
            </Paper>
          ) : (
            <Alert severity="info" sx={{ borderRadius: "14px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                🆕 First-Time Guest: Mandatory ID Stamping
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                Local police and tourism department regulations mandate recording a valid government ID for all hotel guests.
              </Typography>
            </Alert>
          )}

          {/* Show ID inputs if first-time guest or user chose to update document */}
          {(!checkInData.isRepeatGuest || !checkInData.hasVerifiedId || checkInData.reusePreviousId === false) && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Govt ID Document</InputLabel>
                  <Select
                    value={checkInData.govtIdType || "AADHAAR"}
                    label="Govt ID Document"
                    onChange={(e) => setCheckInData({ ...checkInData, govtIdType: e.target.value })}
                  >
                    <MenuItem value="AADHAAR">Aadhaar Card (UIDAI)</MenuItem>
                    <MenuItem value="PASSPORT">International Passport</MenuItem>
                    <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                    <MenuItem value="VOTER_ID">Voter ID</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Govt ID Number *"
                  placeholder="e.g. 5421 8890 1234"
                  value={checkInData.govtIdNumber}
                  onChange={(e) => setCheckInData({ ...checkInData, govtIdNumber: e.target.value })}
                />
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setActiveStep(0)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Back
            </Button>
            <Button
              variant="contained"
              disabled={!checkInData.govtIdNumber && !checkInData.reusePreviousId}
              onClick={() => setActiveStep(2)}
              className="btn-3d"
              endIcon={<ArrowForward />}
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                borderRadius: "12px",
                px: 4,
                fontWeight: 800,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
                "&.Mui-disabled": {
                  background: "rgba(12, 39, 59, 0.1)",
                  color: "rgba(12, 39, 59, 0.35)",
                  boxShadow: "none",
                },
              }}
            >
              Next: Available Rooms →
            </Button>
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: AVAILABLE ROOMS SELECTION & DURATION ALLOCATION                   */}
      {/* ========================================================================= */}
      {activeStep === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
              Step 3: Available Room Selection & Stay Schedule
            </Typography>

            <Chip
              label={`${availableRooms.length} Clean Rooms Ready`}
              size="small"
              sx={{ bgcolor: "#10B98118", color: "#059669", fontWeight: 800, border: "1px solid #10B98130" }}
            />
          </Box>

          <Grid container spacing={2}>
            {/* Live Available Rooms Dropdown */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Select Available Room *</InputLabel>
                <Select
                  value={checkInData.roomNumber || ""}
                  label="Select Available Room *"
                  onChange={(e) => handleSelectRoom(e.target.value)}
                >
                  {availableRooms.length === 0 ? (
                    <MenuItem value="" disabled>
                      ⚠️ No clean rooms available (Check Housekeeping)
                    </MenuItem>
                  ) : (
                    availableRooms.map((r) => {
                      const roomTypeObj = typeof r.roomType === "object" ? r.roomType : null;
                      const tariff = r.customPricePerNight || roomTypeObj?.basePrice || r.basePrice || 3500;
                      return (
                        <MenuItem key={r._id || r.roomNumber} value={r.roomNumber}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                            <span>
                              <strong>Room {r.roomNumber}</strong> (Floor {r.floor || 1}) &bull; {roomTypeObj?.name || r.type || "Deluxe Suite"}
                            </span>
                            <span style={{ fontWeight: 800, color: themeConfig.primary, marginLeft: "12px" }}>
                              ₹{tariff}/night
                            </span>
                          </Box>
                        </MenuItem>
                      );
                    })
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Daily Room Tariff (₹) *"
                type="number"
                value={checkInData.rate || 3500}
                onChange={(e) => {
                  const r = Number(e.target.value);
                  const totalAmt = r * nights;
                  setCheckInData({ ...checkInData, rate: r, total: totalAmt, paid: totalAmt });
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={`Check-In Date * (From ${checkInTimeFormatted})`}
                type="date"
                value={checkInData.checkInDate}
                onChange={(e) => handleDateChange("checkInDate", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={`Check-Out Date * (By ${checkOutTimeFormatted})`}
                type="date"
                value={checkInData.checkOutDate}
                onChange={(e) => handleDateChange("checkOutDate", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>

          {/* Stay Financial Breakdown Preview */}
          <Paper
            className="card-3d"
            sx={{
              p: 2,
              borderRadius: "14px",
              bgcolor: themeConfig.champagne,
              border: `1px solid ${themeConfig.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <div>
              <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                Stay Schedule: <strong>{nights} Night(s)</strong> &bull; Selected Room: <strong>Room {checkInData.roomNumber || "None"}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                Check-In: {checkInTimeFormatted} &bull; Check-Out: {checkOutTimeFormatted} ({timezoneStr})
              </Typography>
            </div>
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.primary }}>
              ₹{(checkInData.rate || 3500) * nights} <span style={{ fontSize: "0.75rem", color: themeConfig.textMuted }}>Total</span>
            </Typography>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setActiveStep(1)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Back
            </Button>
            <Button
              variant="contained"
              disabled={!checkInData.roomNumber}
              onClick={() => setActiveStep(3)}
              className="btn-3d"
              endIcon={<ArrowForward />}
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                borderRadius: "12px",
                px: 4,
                fontWeight: 800,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
                "&.Mui-disabled": {
                  background: "rgba(12, 39, 59, 0.1)",
                  color: "rgba(12, 39, 59, 0.35)",
                  boxShadow: "none",
                },
              }}
            >
              Next: Payment Settlement →
            </Button>
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: PAYMENT SETTLEMENT & ADVANCE COLLECTION                          */}
      {/* ========================================================================= */}
      {activeStep === 3 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
            Step 4: Payment Method & Advance Settlement
          </Typography>

          {/* Amount Overview Ribbon */}
          <Paper
            className="card-3d"
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: themeConfig.champagne,
              border: `1px solid ${themeConfig.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <div>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
                Total Billable Tariff ({nights} Nights):
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                ₹{checkInData.total}
              </Typography>
            </div>

            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <div>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
                  Advance Settling Now:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                  ₹{checkInData.paid}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
                  Balance at Checkout:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: checkInData.due > 0 ? themeConfig.danger : themeConfig.success }}>
                  ₹{checkInData.due || 0}
                </Typography>
              </div>
            </Box>
          </Paper>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Select Payment Mode *</InputLabel>
                <Select
                  value={checkInData.paymentMethod || "UPI"}
                  label="Select Payment Mode *"
                  onChange={(e) => setCheckInData({ ...checkInData, paymentMethod: e.target.value })}
                >
                  <MenuItem value="UPI">📱 UPI / Dynamic QR Code</MenuItem>
                  <MenuItem value="CARD">💳 Credit / Debit Card (POS)</MenuItem>
                  <MenuItem value="CASH">💵 Cash at Front Counter</MenuItem>
                  <MenuItem value="BANK_TRANSFER">🏦 Bank Transfer / NEFT / IMPS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Advance Amount Collecting (₹) *"
                type="number"
                value={checkInData.paid}
                onChange={(e) => {
                  const p = Number(e.target.value);
                  setCheckInData({ ...checkInData, paid: p, due: Math.max(0, checkInData.total - p) });
                }}
              />
            </Grid>
          </Grid>

          {/* DYNAMIC PAYMENT METHOD SPECIFIC BOXES */}

          {/* 1. UPI / QR CODE SCANNER */}
          {(checkInData.paymentMethod === "UPI" || !checkInData.paymentMethod) && (
            <Paper
              className="card-3d"
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(11, 142, 224, 0.06) 0%, rgba(255,255,255,0.95) 100%)",
                border: `1.5px solid ${themeConfig.primary}`,
                boxShadow: `0 8px 24px -4px ${themeConfig.primaryGlow}`,
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
                {/* Dynamic QR Code */}
                <Box sx={{ textAlign: "center", bgcolor: "#FFFFFF", p: 2, borderRadius: "16px", border: `1px solid ${themeConfig.border}`, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=170x170&margin=4&data=${encodeURIComponent(
                      `upi://pay?pa=${hotelSettings?.upiId || "jatinkakadiya234-1@okicici"}&pn=HotelFrontDesk&am=${checkInData.paid || checkInData.total}&tn=Room${checkInData.roomNumber || "Stay"}`
                    )}`}
                    alt="Dynamic UPI QR Code"
                    style={{ width: "170px", height: "170px", display: "block", borderRadius: "8px" }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primary, display: "block", mt: 1 }}>
                    Scan with GPay / PhonePe / Paytm
                  </Typography>
                </Box>

                {/* QR Code Details & UTR Input */}
                <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "260px" } }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain, mb: 0.5 }}>
                    Instant UPI QR Payment
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                    Ask guest to scan the dynamic QR code on screen. Amount <strong>₹{checkInData.paid}</strong> is encoded directly.
                  </Typography>

                  <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}`, mb: 2 }}>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Hotel UPI ID:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primaryDark }}>
                      {hotelSettings?.upiId || "jatinkakadiya234-1@okicici"}
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    size="small"
                    label="UPI Transaction Reference / UTR Number"
                    placeholder="e.g. 423984729103"
                    value={checkInData.transactionId || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, transactionId: e.target.value })}
                  />
                </Box>
              </Box>
            </Paper>
          )}

          {/* 2. CREDIT / DEBIT CARD (POS MACHINE) */}
          {checkInData.paymentMethod === "CARD" && (
            <Paper
              className="card-3d"
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(255,255,255,0.95) 100%)",
                border: "1.5px solid #8B5CF6",
                boxShadow: "0 8px 24px -4px rgba(139, 92, 246, 0.2)",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#6D28D9", mb: 0.5 }}>
                💳 POS Terminal / Card Swiping Record
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2.5 }}>
                Swipe or tap card on EDC POS machine and record the authorization slip details:
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Card Network</InputLabel>
                    <Select
                      value={checkInData.cardNetwork || "VISA"}
                      label="Card Network"
                      onChange={(e) => setCheckInData({ ...checkInData, cardNetwork: e.target.value })}
                    >
                      <MenuItem value="VISA">Visa</MenuItem>
                      <MenuItem value="MASTERCARD">Mastercard</MenuItem>
                      <MenuItem value="RUPAY">RuPay</MenuItem>
                      <MenuItem value="AMEX">American Express</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Last 4 Digits of Card *"
                    placeholder="e.g. 4242"
                    inputProps={{ maxLength: 4 }}
                    value={checkInData.paymentReference || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, paymentReference: e.target.value })}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Cardholder Name"
                    placeholder="Name as printed on card"
                    value={checkInData.cardholderName || checkInData.fullName || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, cardholderName: e.target.value })}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="POS Terminal Auth / Slip Ref *"
                    placeholder="e.g. AUTH-99214"
                    value={checkInData.transactionId || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, transactionId: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* 3. CASH PAYMENT */}
          {checkInData.paymentMethod === "CASH" && (
            <Paper
              className="card-3d"
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0.95) 100%)",
                border: "1.5px solid #10B981",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#10B981", color: "#FFFFFF", width: 44, height: 44, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)" }}>
                  💵
                </Avatar>
                <div>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#065F46" }}>
                    Cash Counter Settlement
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#047857" }}>
                    Collect physical cash of <strong>₹{checkInData.paid}</strong> at the front desk counter. Instant official cash voucher receipt will be recorded in shift drawer.
                  </Typography>
                </div>
              </Box>
            </Paper>
          )}

          {/* 4. BANK TRANSFER / NEFT / IMPS */}
          {checkInData.paymentMethod === "BANK_TRANSFER" && (
            <Paper
              className="card-3d"
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(255,255,255,0.95) 100%)",
                border: "1.5px solid #F59E0B",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#B45309", mb: 0.5 }}>
                🏦 Direct Bank Transfer / NEFT / RTGS
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2.5 }}>
                Enter the remitter bank name and electronic fund transfer UTR number:
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Remitter / Guest Bank Name *"
                    placeholder="e.g. HDFC Bank / State Bank of India"
                    value={checkInData.paymentReference || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, paymentReference: e.target.value })}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="IMPS / NEFT UTR Number *"
                    placeholder="e.g. HDFCN23849102"
                    value={checkInData.transactionId || ""}
                    onChange={(e) => setCheckInData({ ...checkInData, transactionId: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setActiveStep(2)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveStep(4)}
              className="btn-3d"
              endIcon={<ArrowForward />}
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                borderRadius: "12px",
                px: 4,
                fontWeight: 800,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
              }}
            >
              Review Summary →
            </Button>
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: COMPREHENSIVE REVIEW & FINAL CHECK-IN CONFIRMATION               */}
      {/* ========================================================================= */}
      {activeStep === 4 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
            Step 5: Review Folio & Final Check-In Confirmation
          </Typography>

          <Paper
            className="card-3d"
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: themeConfig.bgMain,
              border: `1.5px solid ${themeConfig.border}`,
              boxShadow: "0 6px 20px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                  {checkInData.fullName}
                </Typography>
                <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                  Mobile: {checkInData.mobile} &bull; Email: {checkInData.email || "N/A"}
                </Typography>
              </div>

              {checkInData.isRepeatGuest ? (
                <Chip
                  icon={<Star sx={{ "&&": { color: "#F59E0B" } }} />}
                  label={`Returning Guest (${checkInData.totalVisits || 2} Stays)`}
                  size="small"
                  sx={{ bgcolor: "rgba(245, 158, 11, 0.12)", color: "#B45309", fontWeight: 800 }}
                />
              ) : (
                <Chip label="First-Time Guest" size="small" sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, fontWeight: 800 }} />
              )}
            </Box>

            <Divider sx={{ my: 2, borderColor: themeConfig.border }} />

            <Grid container spacing={2} sx={{ fontSize: "0.85rem", color: themeConfig.textMain }}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Allocated Room:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primary }}>
                  Room {checkInData.roomNumber} ({checkInData.roomType || "Deluxe"})
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Stay Duration:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {nights} Night(s) ({checkInData.checkInDate} ➔ {checkInData.checkOutDate})
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Govt ID Stamping:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: checkInData.hasVerifiedId ? "#059669" : themeConfig.textMain }}>
                  {checkInData.govtIdType} ({formatMaskedId(checkInData.govtIdNumber)})
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Payment Mode:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primaryDark }}>
                  {checkInData.paymentMethod === "UPI"
                    ? "📱 UPI / Dynamic QR Scan"
                    : checkInData.paymentMethod === "CARD"
                    ? `💳 Card (${checkInData.paymentReference ? `•••• ${checkInData.paymentReference}` : "POS"})`
                    : checkInData.paymentMethod === "BANK_TRANSFER"
                    ? "🏦 Bank Transfer / NEFT"
                    : "💵 Cash Counter"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Advance Settled:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: "#059669" }}>
                  ₹{checkInData.paid}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Balance Due:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: checkInData.due > 0 ? themeConfig.danger : themeConfig.success }}>
                  ₹{checkInData.due || 0}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setActiveStep(3)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              onClick={onFinalCheckIn}
              className="btn-3d"
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.success} 0%, #15803D 100%)`,
                borderRadius: "12px",
                px: 5,
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)",
              }}
            >
              Confirm & Check In Guest
            </Button>
          </Box>
        </Box>
      )}
      </Card>
    </Box>
  );
}
