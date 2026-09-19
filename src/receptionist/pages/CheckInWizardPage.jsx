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
  IconButton,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Switch,
} from "@mui/material";
import {
  CheckCircle,
  VerifiedUser,
  Star,
  MeetingRoom,
  Phone,
  Person,
  Home,
  ArrowForward,
  ArrowBack,
  CloudUpload,
  DocumentScanner,
  FlashOn,
  Delete,
  Refresh,
  Group,
  People,
  Lightbulb,
  Warning,
  Add,
  Remove,
  Check,
  Shield,
  LocalOffer,
  AccessTime,
  FilterList,
} from "@mui/icons-material";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { formatTime12Hour } from "@/shared/utils/timeUtils";
import { apiRequest, API_ENDPOINTS } from "@/config/api";

const CHECKIN_STEPS = [
  "Guest Profile",
  "ID Document",
  "Room Allocation",
  "Payment Settlement",
  "Review & Check-In",
];

// Helper to get exact current local date in YYYY-MM-DD format
const getTodayLocalDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper to get exact current local time in HH:MM format
const getCurrentLocalTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

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

  // Filter state for room dropdown
  const [roomFilterCategory, setRoomFilterCategory] = useState("ALL");

  // Continuous Live Clock that ticks every second and synchronizes real-time
  const [liveTime, setLiveTime] = useState(getCurrentLocalTime());
  const [liveDate, setLiveDate] = useState(getTodayLocalDate());

  useEffect(() => {
    // Initial sync
    const initialTime = getCurrentLocalTime();
    const initialDate = getTodayLocalDate();
    setLiveTime(initialTime);
    setLiveDate(initialDate);

    const timer = setInterval(() => {
      const curTime = getCurrentLocalTime();
      const curDate = getTodayLocalDate();
      setLiveTime(curTime);
      setLiveDate(curDate);

      // Unless the receptionist explicitly manually typed a custom time, keep it ticking in real-time
      setCheckInData((prev) => {
        if (prev.isCustomCheckInTime) return prev;
        if (prev.checkInTime === curTime && prev.checkInDate === curDate) return prev;
        return {
          ...prev,
          checkInTime: curTime,
          checkInDate: prev.checkInDate || curDate,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sync initial checkout date if missing
  useEffect(() => {
    setCheckInData((prev) => {
      if (!prev.checkOutDate) {
        const d = new Date();
        d.setDate(d.getDate() + (prev.numberOfNights || 1));
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return { ...prev, checkOutDate: `${y}-${m}-${day}` };
      }
      return prev;
    });
  }, []);

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

  // Total party guest count
  const adultsCount = Number(checkInData.adults) || 1;
  const childrenCount = Number(checkInData.children) || 0;
  const totalPartySize = adultsCount + childrenCount;

  // Helper to extract room person capacity
  const getRoomCapacity = (room) => {
    const rt = typeof room?.roomType === "object" ? room.roomType : null;
    const adults = rt?.capacity?.adults || room?.capacity?.adults || 2;
    const children = rt?.capacity?.children || room?.capacity?.children || 1;
    return { adults, children, total: adults + children };
  };

  // Helper to extract room nightly tariff
  const getRoomTariff = (room) => {
    const rt = typeof room?.roomType === "object" ? room.roomType : null;
    return room?.customPricePerNight || rt?.basePrice || room?.basePrice || 3000;
  };

  // Auto-sync initial room selection & tariff if not yet selected
  useEffect(() => {
    if (availableRooms.length > 0 && (!checkInData.roomId || checkInData.roomIds?.length === 0)) {
      const defaultRoom = availableRooms[0];
      const tariff = getRoomTariff(defaultRoom);
      const rt = typeof defaultRoom.roomType === "object" ? defaultRoom.roomType : null;
      setCheckInData((prev) => {
        if (prev.roomId && prev.roomIds && prev.roomIds.length > 0) return prev;
        const totalCost = tariff * (prev.numberOfNights || 1);
        const isVip = Boolean(prev.isRepeatGuest || (prev.totalVisits && prev.totalVisits >= 2));
        const disc = isVip ? Math.round(totalCost * 0.10) : 0;
        const netTotal = totalCost - disc + (prev.collectSecurityDeposit ? (Number(prev.securityDepositAmount) || 1000) : 0);
        return {
          ...prev,
          roomId: defaultRoom._id,
          roomNumber: String(defaultRoom.roomNumber),
          roomIds: [defaultRoom._id],
          selectedRooms: [defaultRoom],
          selectedRoomNumbers: [String(defaultRoom.roomNumber)],
          roomType: rt?.name || defaultRoom.type || "Deluxe King Room",
          floor: defaultRoom.floor || 1,
          rate: tariff,
          discountAmount: disc,
          total: netTotal,
          paid: netTotal,
          due: 0,
        };
      });
    }
  }, [availableRooms.length]);

  // Selected Rooms List calculation
  const selectedRoomIds = (checkInData.roomIds && checkInData.roomIds.length > 0)
    ? checkInData.roomIds
    : checkInData.roomId
    ? [checkInData.roomId]
    : [];

  const selectedRoomsList = rooms.filter((r) =>
    selectedRoomIds.includes(r._id) ||
    (checkInData.selectedRoomNumbers && checkInData.selectedRoomNumbers.includes(String(r.roomNumber))) ||
    (checkInData.roomNumber && String(checkInData.roomNumber).split(",").map((s) => s.trim()).includes(String(r.roomNumber)))
  );

  // Calculate total capacity of currently selected rooms
  const totalSelectedCapacity = selectedRoomsList.reduce((acc, r) => acc + getRoomCapacity(r).total, 0);
  const totalSelectedAdultsCap = selectedRoomsList.reduce((acc, r) => acc + getRoomCapacity(r).adults, 0);

  // Smart Room Recommendation Calculation
  const suggestedRoomsMin = Math.max(1, Math.ceil(adultsCount / 2));
  const suggestedRoomsMax = Math.max(suggestedRoomsMin, Math.ceil(totalPartySize / 3));

  // VIP Returning Guest 10% Discount calculation
  const isVipGuest = Boolean(checkInData.isRepeatGuest || (checkInData.totalVisits && checkInData.totalVisits >= 2));
  const baseTariffTotal = (checkInData.rate || 3000) * nights;
  const vipDiscountAmount = isVipGuest ? Math.round(baseTariffTotal * 0.10) : (checkInData.discountAmount || 0);
  const securityDepositAmount = checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0;
  const calculatedGrandTotal = Math.max(0, baseTariffTotal - vipDiscountAmount) + securityDepositAmount;

  // Accompanying Members Helper Handlers (Managed in Step 2)
  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      age: "",
      gender: "Male",
      relationship: "Spouse",
      idType: "AADHAAR",
      idNumber: "",
      frontImage: "",
    };
    const updatedMembers = [...(checkInData.accompanyingGuests || []), newMember];
    setCheckInData((prev) => ({
      ...prev,
      accompanyingGuests: updatedMembers,
      adults: Math.max(prev.adults || 1, 1 + updatedMembers.length),
    }));
  };

  const handleUpdateMember = (id, field, val) => {
    const updatedMembers = (checkInData.accompanyingGuests || []).map((m) =>
      m.id === id ? { ...m, [field]: val } : m
    );
    setCheckInData((prev) => ({
      ...prev,
      accompanyingGuests: updatedMembers,
    }));
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = (checkInData.accompanyingGuests || []).filter((m) => m.id !== id);
    setCheckInData((prev) => ({
      ...prev,
      accompanyingGuests: updatedMembers,
    }));
  };

  const handleMemberImageUpload = (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target.result;
      handleUpdateMember(id, "frontImage", b64);
    };
    reader.readAsDataURL(file);
  };

  // Date and Time Check-in / Checkout Calculation Handlers
  const handleCheckInDateChange = (inDateVal) => {
    const d1 = new Date(inDateVal);
    const n = checkInData.numberOfNights || nights || 1;
    const d2 = new Date(d1.getTime() + n * 86400000);
    const outDateStr = d2.toISOString().split("T")[0];

    const currentRate = checkInData.rate || 3000;
    const baseTot = currentRate * n;
    const disc = isVipGuest ? Math.round(baseTot * 0.10) : 0;
    const netTot = Math.max(0, baseTot - disc) + (checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0);

    setCheckInData((prev) => ({
      ...prev,
      checkInDate: inDateVal,
      checkOutDate: outDateStr,
      checkOutTime: "12:00",
      numberOfNights: n,
      discountAmount: disc,
      total: netTot,
      paid: netTot,
      due: 0,
    }));
  };

  const handleNightsChange = (nightsCount) => {
    const n = Math.max(1, parseInt(nightsCount) || 1);
    const inDateStr = checkInData.checkInDate || new Date().toISOString().split("T")[0];
    const d1 = new Date(inDateStr);
    const d2 = new Date(d1.getTime() + n * 86400000);
    const outDateStr = d2.toISOString().split("T")[0];

    const currentRate = checkInData.rate || 3000;
    const baseTot = currentRate * n;
    const disc = isVipGuest ? Math.round(baseTot * 0.10) : 0;
    const netTot = Math.max(0, baseTot - disc) + (checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0);

    setCheckInData((prev) => ({
      ...prev,
      numberOfNights: n,
      checkOutDate: outDateStr,
      checkOutTime: "12:00",
      discountAmount: disc,
      total: netTot,
      paid: netTot,
      due: 0,
    }));
  };

  const handleCheckOutDateChange = (outDateVal) => {
    const d1 = new Date(checkInData.checkInDate || new Date());
    const d2 = new Date(outDateVal);
    const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    const n = Math.max(1, isNaN(diffDays) ? 1 : diffDays);

    const currentRate = checkInData.rate || 3000;
    const baseTot = currentRate * n;
    const disc = isVipGuest ? Math.round(baseTot * 0.10) : 0;
    const netTot = Math.max(0, baseTot - disc) + (checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0);

    setCheckInData((prev) => ({
      ...prev,
      checkOutDate: outDateVal,
      checkOutTime: "12:00",
      numberOfNights: n,
      discountAmount: disc,
      total: netTot,
      paid: netTot,
      due: 0,
    }));
  };

  // Surepass Zero-OTP OCR & KYC State
  const [ocrLoading, setOcrLoading] = useState(false);
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [ocrFeedback, setOcrFeedback] = useState(null);
  const [dlDob, setDlDob] = useState(checkInData.dob || "");

  // Upload helper for Front/Back photo
  const handleImageFileChange = (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target.result;
      if (target === "front") setFrontImage(b64);
      if (target === "back") setBackImage(b64);
    };
    reader.readAsDataURL(file);
  };

  // Trigger Zero-OTP Surepass OCR Verification
  const handleOcrVerification = async (forcedType) => {
    const typeToScan = forcedType || checkInData.govtIdType || "AADHAAR";
    setOcrLoading(true);
    setOcrFeedback(null);

    try {
      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.KYC_OCR_VERIFY, {
        method: "POST",
        body: JSON.stringify({
          idType: typeToScan,
          frontImage,
          backImage,
          idNumber: checkInData.govtIdNumber,
          dob: dlDob || checkInData.dob,
          mobileNumber: checkInData.mobile,
          guestId: checkInData.guestId,
        }),
      });

      if (res?.success && res.extractedData) {
        const ext = res.extractedData;
        setCheckInData((prev) => ({
          ...prev,
          fullName: prev.fullName?.trim() ? prev.fullName : (ext.fullName || ""),
          govtIdType: ext.idType || typeToScan,
          govtIdNumber: ext.idNumber || prev.govtIdNumber,
          address: prev.address?.trim() ? prev.address : (ext.address || prev.address || ""),
          city: prev.city?.trim() ? prev.city : (ext.city || prev.city || ""),
          state: prev.state?.trim() ? prev.state : (ext.state || prev.state || ""),
          pincode: prev.pincode?.trim() ? prev.pincode : (ext.pincode || prev.pincode || ""),
          dateOfBirth: prev.dateOfBirth ? prev.dateOfBirth : (ext.dob || prev.dateOfBirth || ""),
          hasVerifiedId: true,
          idVerified: true,
          verificationSource: res.source,
          confidenceScore: ext.confidenceScore,
          verificationNotes: `Verified via ${res.source === "LIVE_SUREPASS" ? "Surepass OCR Engine" : res.source === "LOCAL_OCR" ? "High-Precision Real OCR Engine" : "Surepass Instant Validator"}`,
        }));

        setOcrFeedback({
          success: true,
          message: res.message || "Document verified and guest details auto-filled successfully!",
          data: ext,
          source: res.source,
        });
      } else {
        setOcrFeedback({
          success: false,
          message: res?.message || "Verification failed. Please check the document image.",
        });
      }
    } catch (err) {
      setOcrFeedback({
        success: false,
        message: err?.message || "Error connecting to Surepass verification service.",
      });
    } finally {
      setOcrLoading(false);
    }
  };

  // Direct DL Verification with Number + DOB (No OTP)
  const handleDirectDlVerify = async () => {
    if (!checkInData.govtIdNumber || !dlDob) {
      setOcrFeedback({
        success: false,
        message: "Please enter both Driving License Number and Date of Birth (YYYY-MM-DD).",
      });
      return;
    }
    setOcrLoading(true);
    setOcrFeedback(null);
    try {
      const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.KYC_VERIFY_DL, {
        method: "POST",
        body: JSON.stringify({
          dlNumber: checkInData.govtIdNumber,
          dob: dlDob,
          mobileNumber: checkInData.mobile,
          guestId: checkInData.guestId,
        }),
      });

      if (res?.success && res.extractedData) {
        const ext = res.extractedData;
        setCheckInData((prev) => ({
          ...prev,
          fullName: prev.fullName?.trim() ? prev.fullName : (ext.fullName || ""),
          govtIdType: "DRIVING_LICENSE",
          govtIdNumber: ext.idNumber || prev.govtIdNumber,
          address: prev.address?.trim() ? prev.address : (ext.address || prev.address || ""),
          hasVerifiedId: true,
          idVerified: true,
          verificationSource: res.source,
        }));
        setOcrFeedback({
          success: true,
          message: "Driving License verified from National Registry (Parivahan)!",
          data: ext,
          source: res.source,
        });
      } else {
        setOcrFeedback({
          success: false,
          message: res?.message || "Driving License not found or invalid details.",
        });
      }
    } catch (err) {
      setOcrFeedback({
        success: false,
        message: err?.message || "Error verifying Driving License.",
      });
    } finally {
      setOcrLoading(false);
    }
  };

  // Phone number lookup & repeat guest logic (Auto-detects when full 10-digit number matches)
  const handlePhoneChange = async (val) => {
    const rawVal = val.trim();
    const queryDigits = rawVal.replace(/\D/g, "");
    setCheckInData((prev) => ({ ...prev, mobile: val }));

    if (queryDigits.length === 10) {
      const matched = guests.find((g) => {
        const p = (g.phone || g.mobileNumber || "").replace(/\D/g, "");
        return p === queryDigits;
      });

      if (matched) {
        applyGuestData(matched);
        return;
      }

      try {
        const res = await apiRequest(API_ENDPOINTS.RECEPTIONIST.GUEST_LOOKUP(queryDigits));
        if (res?.data) {
          applyGuestData(res.data);
        }
      } catch {
        // New guest - keep fields clear
      }
    } else if (queryDigits.length < 10 && checkInData.isRepeatGuest) {
      setCheckInData((prev) => {
        const currentRate = prev.rate || 3000;
        const baseTot = currentRate * nights;
        return {
          ...prev,
          guestId: undefined,
          isRepeatGuest: false,
          totalVisits: 1,
          hasVerifiedId: false,
          reusePreviousId: false,
          discountAmount: 0,
          total: baseTot,
          paid: baseTot,
          due: 0,
        };
      });
    }
  };

  const applyGuestData = (guest) => {
    const totalVisits = guest.totalVisits || (bookings.filter((b) => (b.guest?._id || b.guest) === guest._id).length || 1);
    const idNum = guest.govtIdNumber || guest.idNumber || guest.idProof?.idNumber || "";
    const isIdVerified = guest.idVerified || guest.idProof?.verificationStatus === "VERIFIED" || Boolean(idNum && idNum !== "PENDING");
    const isVip = true;

    setCheckInData((prev) => {
      const currentRate = prev.rate || 3000;
      const baseTot = currentRate * nights;
      const disc = Math.round(baseTot * 0.10); // 10% VIP Loyalty Discount for returning guests
      const netTot = Math.max(0, baseTot - disc) + (prev.collectSecurityDeposit ? (Number(prev.securityDepositAmount) || 1000) : 0);

      return {
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
        discountAmount: disc,
        total: netTot,
        paid: netTot,
        due: 0,
      };
    });
  };

  // Multi-Room Dropdown Change Handler
  const handleDropdownRoomChange = (event) => {
    const selectedIds = typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value;
    if (selectedIds.length === 0) return;

    const newSelectedRooms = rooms.filter((r) => selectedIds.includes(r._id));
    const newRoomNumbers = newSelectedRooms.map((r) => String(r.roomNumber));
    const primaryRoom = newSelectedRooms[0];
    const primaryRt = typeof primaryRoom?.roomType === "object" ? primaryRoom.roomType : null;

    // Combined Nightly Rate across all selected rooms
    const combinedRate = newSelectedRooms.reduce((sum, r) => sum + getRoomTariff(r), 0);
    const baseTot = combinedRate * nights;
    const disc = isVipGuest ? Math.round(baseTot * 0.10) : (checkInData.discountAmount || 0);
    const netTot = Math.max(0, baseTot - disc) + (checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0);

    setCheckInData((prev) => ({
      ...prev,
      roomId: primaryRoom?._id || "",
      roomNumber: newRoomNumbers.join(", "),
      roomIds: selectedIds,
      selectedRooms: newSelectedRooms,
      selectedRoomNumbers: newRoomNumbers,
      roomType: primaryRt?.name || primaryRoom?.type || "Deluxe King Room",
      floor: primaryRoom?.floor || 1,
      rate: combinedRate,
      discountAmount: disc,
      total: netTot,
      paid: netTot,
      due: 0,
    }));
  };

  // Remove a room from multi-selection
  const handleRemoveSelectedRoom = (roomIdToRemove) => {
    if (selectedRoomIds.length <= 1) return;
    const newIds = selectedRoomIds.filter((id) => id !== roomIdToRemove);
    const newSelectedRooms = rooms.filter((r) => newIds.includes(r._id));
    const newRoomNumbers = newSelectedRooms.map((r) => String(r.roomNumber));
    const primaryRoom = newSelectedRooms[0];
    const primaryRt = typeof primaryRoom?.roomType === "object" ? primaryRoom.roomType : null;

    const combinedRate = newSelectedRooms.reduce((sum, r) => sum + getRoomTariff(r), 0);
    const baseTot = combinedRate * nights;
    const disc = isVipGuest ? Math.round(baseTot * 0.10) : (checkInData.discountAmount || 0);
    const netTot = Math.max(0, baseTot - disc) + (checkInData.collectSecurityDeposit ? (Number(checkInData.securityDepositAmount) || 1000) : 0);

    setCheckInData((prev) => ({
      ...prev,
      roomId: primaryRoom?._id || "",
      roomNumber: newRoomNumbers.join(", "),
      roomIds: newIds,
      selectedRooms: newSelectedRooms,
      selectedRoomNumbers: newRoomNumbers,
      roomType: primaryRt?.name || primaryRoom?.type || "Deluxe King Room",
      floor: primaryRoom?.floor || 1,
      rate: combinedRate,
      discountAmount: disc,
      total: netTot,
      paid: netTot,
      due: 0,
    }));
  };

  // Filtered available rooms according to user filter
  const filteredAvailableRooms = availableRooms.filter((r) => {
    if (roomFilterCategory === "RECOMMENDED") {
      const cap = getRoomCapacity(r);
      return cap.total >= totalPartySize || cap.adults >= adultsCount;
    }
    if (roomFilterCategory.startsWith("FLOOR_")) {
      const f = parseInt(roomFilterCategory.replace("FLOOR_", "")) || 1;
      return r.floor === f;
    }
    return true;
  });

  // Mask ID Number for privacy (e.g. •••• 4321)
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
        {/* Wizard Header Banner */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 1 }}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 0.5, letterSpacing: -0.5 }}>
              Express Guest Check-In & Registration Wizard
            </Typography>
            <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
              Complete guest registration, returning VIP verification, live available room allocation, and advance billing.
            </Typography>
          </div>

          {isVipGuest && (
            <Chip
              icon={<Star sx={{ "&&": { color: "#F59E0B" } }} />}
              label={`VIP Returning Guest (10% Loyalty Discount Applied)`}
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
        {/* STEP 1: GUEST PROFILE & STAY SCHEDULE (CLEAN & STREAMLINED)               */}
        {/* ========================================================================= */}
        {activeStep === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Section 1: Check-in / Check-out Schedule & Auto 12:00 PM Timing */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "18px",
                bgcolor: themeConfig.champagne,
                border: `1.5px solid ${themeConfig.border}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark, display: "flex", alignItems: "center", gap: 1 }}>
                  🕒 Check-In & Check-Out Schedule (12:00 PM Fixed Check-Out)
                </Typography>
                <Chip
                  label="Standard Check-Out: 12:00 PM (Noon)"
                  size="small"
                  sx={{ bgcolor: "#FFFFFF", color: themeConfig.primaryDark, fontWeight: 800, border: `1px solid ${themeConfig.border}` }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Check-In Date *"
                    type="date"
                    value={checkInData.checkInDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleCheckInDateChange(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={checkInData.isCustomCheckInTime ? "Check-In Time (Manual)" : "Check-In Time (Live Real-Time)"}
                    type="time"
                    value={checkInData.isCustomCheckInTime ? checkInData.checkInTime : liveTime}
                    onChange={(e) => setCheckInData({ ...checkInData, checkInTime: e.target.value, isCustomCheckInTime: true })}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={checkInData.isCustomCheckInTime ? "Click to switch back to Live Auto-Updating Real-Time" : "Currently updating live every second"}>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  const cur = getCurrentLocalTime();
                                  setCheckInData({ ...checkInData, checkInTime: cur, isCustomCheckInTime: false });
                                }}
                                sx={{ color: checkInData.isCustomCheckInTime ? themeConfig.textMuted : "#10B981" }}
                              >
                                <AccessTime sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      },
                    }}
                    helperText={checkInData.isCustomCheckInTime ? `Manual: ${formatTime12Hour(checkInData.checkInTime)} (Click ⏱️ for Live)` : `🔴 LIVE: ${formatTime12Hour(liveTime)} (Auto-Updating Every Minute)`}
                  />
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Stay Duration (Nights) *"
                    type="number"
                    value={checkInData.numberOfNights || nights || 1}
                    onChange={(e) => handleNightsChange(e.target.value)}
                    slotProps={{ htmlInput: { min: 1, max: 90 } }}
                    helperText={`Auto-sets checkout date for ${checkInData.numberOfNights || nights || 1} night(s)`}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Check-Out Date (Auto-Calculated) *"
                    type="date"
                    value={checkInData.checkOutDate || new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={(e) => handleCheckOutDateChange(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Check-Out Time (Fixed)"
                    value="12:00 PM (Noon)"
                    disabled
                    helperText="Automatic standard hotel checkout policy"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Section 2: Primary Guest Information */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
                  Primary Guest Particulars
                </Typography>

                {guests.length > 0 && (
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                    💡 Tip: Type 10-digit mobile number to auto-detect returning hotel guests
                  </Typography>
                )}
              </Box>

              {/* Repeat Guest Banner with 10% Discount notice */}
              {isVipGuest && (
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
                    mb: 2.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#F59E0B", color: "#FFFFFF", width: 40, height: 40, boxShadow: "0 4px 10px rgba(245, 158, 11, 0.3)" }}>
                      <Star />
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#92400E" }}>
                        🎉 Returning Guest Recognized: {checkInData.fullName} (10% Loyalty Discount)
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#B45309", display: "block" }}>
                        Visited hotel <strong>{checkInData.totalVisits || 2} times</strong> previously &bull; 10% VIP Returning Discount auto-applied.
                      </Typography>
                    </div>
                  </Box>
                  <Chip
                    icon={<LocalOffer sx={{ fontSize: 16 }} />}
                    size="small"
                    label="10% VIP Discount"
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
                  value={checkInData.mobile || ""}
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
                  value={checkInData.fullName || ""}
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
                  value={checkInData.email || ""}
                  onChange={(e) => setCheckInData({ ...checkInData, email: e.target.value })}
                />

                <TextField
                  fullWidth
                  label="Permanent Residential Address"
                  placeholder="City, State, Pincode"
                  value={checkInData.address || ""}
                  onChange={(e) => setCheckInData({ ...checkInData, address: e.target.value })}
                  slotProps={{
                    input: {
                      startAdornment: <Home sx={{ mr: 1, color: themeConfig.textMuted, fontSize: 18 }} />,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Section 3: Party Size & Occupancy Configuration */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: `1.5px solid ${themeConfig.border}`,
                boxShadow: "0 4px 16px rgba(12, 39, 59, 0.04)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
                    👥 Group / Party Size Configuration
                  </Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                    Specify how many adults and children are staying to calculate room capacity and multi-room suggestions.
                  </Typography>
                </div>

                <Chip
                  icon={<Group sx={{ "&&": { color: themeConfig.primary } }} />}
                  label={`Total Party: ${totalPartySize} Guest${totalPartySize > 1 ? "s" : ""} (${adultsCount} Adult${adultsCount > 1 ? "s" : ""}, ${childrenCount} Child${childrenCount !== 1 ? "ren" : ""})`}
                  sx={{
                    bgcolor: "rgba(11, 142, 224, 0.08)",
                    color: themeConfig.primaryDark,
                    fontWeight: 800,
                    border: `1px solid ${themeConfig.border}`,
                  }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: themeConfig.champagne,
                      border: `1px solid ${themeConfig.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                        Adults (12+ Years)
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                        Primary guest + adult family/couples
                      </Typography>
                    </div>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <IconButton
                        size="small"
                        disabled={adultsCount <= 1}
                        onClick={() => setCheckInData({ ...checkInData, adults: Math.max(1, adultsCount - 1) })}
                        sx={{ bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" sx={{ fontWeight: 900, minWidth: 24, textAlign: "center" }}>
                        {adultsCount}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setCheckInData({ ...checkInData, adults: adultsCount + 1 })}
                        sx={{ bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: themeConfig.champagne,
                      border: `1px solid ${themeConfig.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                        Children (Below 12 Years)
                      </Typography>
                      <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                        Kids staying with family
                      </Typography>
                    </div>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <IconButton
                        size="small"
                        disabled={childrenCount <= 0}
                        onClick={() => setCheckInData({ ...checkInData, children: Math.max(0, childrenCount - 1) })}
                        sx={{ bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" sx={{ fontWeight: 900, minWidth: 24, textAlign: "center" }}>
                        {childrenCount}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setCheckInData({ ...checkInData, children: childrenCount + 1 })}
                        sx={{ bgcolor: "#FFFFFF", border: `1px solid ${themeConfig.border}` }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {totalPartySize > 2 && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: "12px",
                    bgcolor: "rgba(245, 158, 11, 0.08)",
                    border: "1px dashed rgba(245, 158, 11, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Lightbulb sx={{ color: "#D97706", fontSize: 22 }} />
                  <Typography variant="caption" sx={{ color: "#92400E", fontWeight: 700 }}>
                    Party of <strong>{totalPartySize} guests</strong> detected ({adultsCount} Adults, {childrenCount} Children). Multi-room recommendations and capacity check will be provided in Step 3.
                  </Typography>
                </Box>
              )}
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
                Next: ID Documents & Member Proofs →
              </Button>
            </Box>
          </Box>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: ID DOCUMENTS & ACCOMPANYING MEMBERS PROOFS                        */}
        {/* ========================================================================= */}
        {activeStep === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
                  Step 2: Regulatory Govt ID & Accompanying Member Proofs
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                  Attach government ID proofs for primary guest and all accompanying members for police/regulatory compliance.
                </Typography>
              </div>

              <Chip
                icon={<VerifiedUser sx={{ "&&": { color: "#059669" } }} />}
                label="Compliance Standard KYC"
                size="small"
                sx={{ bgcolor: "#ECFDF5", color: "#059669", fontWeight: 800, border: "1px solid #10B98130" }}
              />
            </Box>

            {/* --- SECTION 2A: PRIMARY GUEST GOVT ID --- */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: `1.5px solid ${themeConfig.border}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                🪪 Primary Guest Govt ID ({checkInData.fullName || "Guest"})
              </Typography>

              {/* Returning Guest Verified Document Option */}
              {isVipGuest && checkInData.hasVerifiedId ? (
                <Paper
                  sx={{
                    p: 2.2,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(240, 253, 244, 0.8) 100%)",
                    border: "1.5px solid #10B981",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#10B981", color: "#FFFFFF", width: 34, height: 34 }}>
                      <VerifiedUser fontSize="small" />
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#065F46" }}>
                        Verified Government ID Already on Record
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#047857" }}>
                        Guest KYC details were previously verified in hotel records.
                      </Typography>
                    </div>
                  </Box>

                  <Box sx={{ bgcolor: "#FFFFFF", p: 1.5, borderRadius: "10px", border: "1px solid rgba(16, 185, 129, 0.2)", mb: 1.5 }}>
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
                      control={<Radio size="small" sx={{ color: "#10B981", "&.Mui-checked": { color: "#10B981" } }} />}
                      label={<Typography variant="body2" sx={{ fontWeight: 800, color: "#065F46" }}>✅ Express Check-In: Reuse existing verified ID (No document re-upload required)</Typography>}
                    />
                    <FormControlLabel
                      value="NEW"
                      control={<Radio size="small" sx={{ color: "#10B981", "&.Mui-checked": { color: "#10B981" } }} />}
                      label={<Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textMain }}>🔄 Update Document: Provide and verify a new Government ID for this stay</Typography>}
                    />
                  </RadioGroup>
                </Paper>
              ) : null}

              {/* Show ID inputs and Surepass Zero-OTP scanner if first-time guest or user chose to update document */}
              {(!isVipGuest || !checkInData.hasVerifiedId || checkInData.reusePreviousId === false) && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Govt ID Document</InputLabel>
                        <Select
                          value={checkInData.govtIdType || "AADHAAR"}
                          label="Govt ID Document"
                          onChange={(e) => {
                            setCheckInData({ ...checkInData, govtIdType: e.target.value });
                            setOcrFeedback(null);
                          }}
                        >
                          <MenuItem value="AADHAAR">🪪 Aadhaar Card (UIDAI)</MenuItem>
                          <MenuItem value="DRIVING_LICENSE">🚗 Driving License (MoRTH)</MenuItem>
                          <MenuItem value="PASSPORT">🛂 International Passport</MenuItem>
                          <MenuItem value="VOTER_ID">🗳️ Voter ID (ECI)</MenuItem>
                          <MenuItem value="PAN">💳 PAN Card</MenuItem>
                          <MenuItem value="OTHER">📄 Other Govt ID</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Govt ID Number *"
                        placeholder={checkInData.govtIdType === "DRIVING_LICENSE" ? "e.g. GJ0520180012345" : "e.g. 5421 8890 1234"}
                        value={checkInData.govtIdNumber || ""}
                        onChange={(e) => setCheckInData({ ...checkInData, govtIdNumber: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  {/* Driving License DOB field if DL selected */}
                  {checkInData.govtIdType === "DRIVING_LICENSE" && (
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Driver Date of Birth (DOB) *"
                          type="date"
                          value={dlDob}
                          onChange={(e) => setDlDob(e.target.value)}
                          slotProps={{ inputLabel: { shrink: true } }}
                          helperText="Required for National Parivahan Registry check"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          startIcon={<FlashOn />}
                          disabled={ocrLoading || !checkInData.govtIdNumber || !dlDob}
                          onClick={handleDirectDlVerify}
                          className="btn-3d"
                          sx={{
                            py: 1,
                            borderRadius: "10px",
                            fontWeight: 800,
                            borderColor: themeConfig.primary,
                            color: themeConfig.primaryDark,
                          }}
                        >
                          {ocrLoading ? "Verifying Registry..." : "Verify DL via Parivahan Registry (No Image)"}
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {/* Surepass OCR Photo Scanner Card */}
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: checkInData.idVerified ? "#F0FDF4" : themeConfig.champagne,
                      border: `1.5px dashed ${checkInData.idVerified ? "#10B981" : themeConfig.primary}`,
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DocumentScanner sx={{ color: themeConfig.primary, fontSize: 22 }} />
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          Surepass Instant Document OCR & Auto-Fill (Zero OTP)
                        </Typography>
                      </Box>
                      {checkInData.idVerified && (
                        <Chip
                          icon={<CheckCircle sx={{ "&&": { color: "#059669" } }} />}
                          label="Surepass Verified ✅"
                          size="small"
                          sx={{ bgcolor: "#FFFFFF", color: "#059669", fontWeight: 900, border: "1px solid #10B981" }}
                        />
                      )}
                    </Box>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ p: 1.5, borderRadius: "10px", border: "1px solid", borderColor: frontImage ? "#10B981" : themeConfig.border, bgcolor: "#FFFFFF", textAlign: "center" }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, display: "block", mb: 0.5 }}>🪪 ID Front Photo</Typography>
                          {frontImage ? (
                            <Box>
                              <img src={frontImage} alt="ID Front" style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: "8px" }} />
                              <Button size="small" color="error" startIcon={<Delete />} onClick={() => setFrontImage("")} sx={{ mt: 0.5, fontSize: "0.7rem" }}>
                                Remove Front
                              </Button>
                            </Box>
                          ) : (
                            <Button component="label" variant="outlined" size="small" startIcon={<CloudUpload />} sx={{ borderRadius: "8px", borderStyle: "dashed", fontSize: "0.75rem", py: 1, width: "100%" }}>
                              Upload / Snap Front
                              <input type="file" accept="image/*" hidden onChange={(e) => handleImageFileChange(e, "front")} />
                            </Button>
                          )}
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ p: 1.5, borderRadius: "10px", border: "1px solid", borderColor: backImage ? "#10B981" : themeConfig.border, bgcolor: "#FFFFFF", textAlign: "center" }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, display: "block", mb: 0.5 }}>📄 ID Back Photo (Optional)</Typography>
                          {backImage ? (
                            <Box>
                              <img src={backImage} alt="ID Back" style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: "8px" }} />
                              <Button size="small" color="error" startIcon={<Delete />} onClick={() => setBackImage("")} sx={{ mt: 0.5, fontSize: "0.7rem" }}>
                                Remove Back
                              </Button>
                            </Box>
                          ) : (
                            <Button component="label" variant="outlined" size="small" startIcon={<CloudUpload />} sx={{ borderRadius: "8px", borderStyle: "dashed", fontSize: "0.75rem", py: 1, width: "100%" }}>
                              Upload / Snap Back
                              <input type="file" accept="image/*" hidden onChange={(e) => handleImageFileChange(e, "back")} />
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={ocrLoading || (!frontImage && !checkInData.govtIdNumber)}
                        onClick={() => handleOcrVerification(checkInData.govtIdType)}
                        className="btn-3d"
                        startIcon={ocrLoading ? <Refresh sx={{ animation: "spin 1s linear infinite" }} /> : <FlashOn />}
                        sx={{
                          background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                          borderRadius: "10px",
                          px: 3,
                          fontWeight: 800,
                        }}
                      >
                        {ocrLoading ? "Scanning Document..." : "⚡ Scan & Auto-Fill (Surepass Real OCR)"}
                      </Button>
                    </Box>

                    {ocrFeedback && (
                      <Box sx={{ mt: 1.5, p: 1.5, borderRadius: "10px", bgcolor: ocrFeedback.success ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${ocrFeedback.success ? "#86EFAC" : "#FECACA"}` }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: ocrFeedback.success ? "#065F46" : "#991B1B", display: "block" }}>
                          {ocrFeedback.message}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Box>
              )}
            </Paper>

            {/* --- SECTION 2B: ACCOMPANYING MEMBERS & ID PROOFS --- */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: `1.5px solid ${themeConfig.border}`,
                boxShadow: "0 4px 16px rgba(12, 39, 59, 0.04)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
                    👥 Accompanying Family & Group Members (સાથેના સભ્યો અને તેમના ID)
                  </Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                    Add secondary guests/couples/children staying in the rooms along with their ID details.
                  </Typography>
                </div>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddMember}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: 800,
                    textTransform: "none",
                    borderColor: themeConfig.primary,
                    color: themeConfig.primary,
                    "&:hover": { bgcolor: "rgba(11, 142, 224, 0.08)" },
                  }}
                >
                  + Add Member ID Proof
                </Button>
              </Box>

              {(!checkInData.accompanyingGuests || checkInData.accompanyingGuests.length === 0) ? (
                <Box
                  sx={{
                    p: 2.5,
                    textAlign: "center",
                    borderRadius: "12px",
                    bgcolor: themeConfig.champagne,
                    border: `1px dashed ${themeConfig.border}`,
                  }}
                >
                  <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontWeight: 600 }}>
                    {totalPartySize > 1
                      ? `Party of ${totalPartySize} detected. Click "+ Add Member ID Proof" above to record IDs for spouse, family, or additional guests.`
                      : "Single guest stay. Click '+ Add Member ID Proof' if other members are staying."}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {checkInData.accompanyingGuests.map((member, index) => (
                    <Paper
                      key={member.id || index}
                      sx={{
                        p: 2,
                        borderRadius: "14px",
                        bgcolor: themeConfig.champagne,
                        border: `1px solid ${themeConfig.border}`,
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                        <Chip
                          label={`Member #${index + 1}${member.name ? `: ${member.name}` : ""}`}
                          size="small"
                          sx={{ bgcolor: themeConfig.primary, color: "#FFFFFF", fontWeight: 800 }}
                        />
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleRemoveMember(member.id)}
                          sx={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "none" }}
                        >
                          Remove
                        </Button>
                      </Box>

                      <Grid container spacing={1.5}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Member Full Name *"
                            placeholder="e.g. Anjali Singhania"
                            value={member.name || ""}
                            onChange={(e) => handleUpdateMember(member.id, "name", e.target.value)}
                          />
                        </Grid>

                        <Grid size={{ xs: 6, sm: 4 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Relationship</InputLabel>
                            <Select
                              value={member.relationship || "Spouse"}
                              label="Relationship"
                              onChange={(e) => handleUpdateMember(member.id, "relationship", e.target.value)}
                            >
                              <MenuItem value="Spouse">Spouse (પતિ/પત્ની)</MenuItem>
                              <MenuItem value="Child">Child (બાળક)</MenuItem>
                              <MenuItem value="Parent">Parent (માતા/પિતા)</MenuItem>
                              <MenuItem value="Sibling">Sibling (ભાઈ/બહેન)</MenuItem>
                              <MenuItem value="Friend">Friend (મિત્ર)</MenuItem>
                              <MenuItem value="Relative">Relative (સગા)</MenuItem>
                              <MenuItem value="Colleague">Colleague (સહકર્મી)</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 6, sm: 2 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Gender</InputLabel>
                            <Select
                              value={member.gender || "Female"}
                              label="Gender"
                              onChange={(e) => handleUpdateMember(member.id, "gender", e.target.value)}
                            >
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 6, sm: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Age"
                            type="number"
                            placeholder="e.g. 28"
                            value={member.age || ""}
                            onChange={(e) => handleUpdateMember(member.id, "age", e.target.value)}
                          />
                        </Grid>

                        <Grid size={{ xs: 6, sm: 4 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>ID Proof Type</InputLabel>
                            <Select
                              value={member.idType || "AADHAAR"}
                              label="ID Proof Type"
                              onChange={(e) => handleUpdateMember(member.id, "idType", e.target.value)}
                            >
                              <MenuItem value="AADHAAR">Aadhaar Card</MenuItem>
                              <MenuItem value="PASSPORT">Passport</MenuItem>
                              <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                              <MenuItem value="VOTER_ID">Voter ID</MenuItem>
                              <MenuItem value="PAN">PAN Card</MenuItem>
                              <MenuItem value="OTHER">Other Govt ID</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="ID Proof Number"
                            placeholder="e.g. 5421 8890 1234"
                            value={member.idNumber || ""}
                            onChange={(e) => handleUpdateMember(member.id, "idNumber", e.target.value)}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                          {member.frontImage ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <img
                                src={member.frontImage}
                                alt="Member ID"
                                style={{ width: 44, height: 38, objectFit: "cover", borderRadius: "6px", border: `1px solid ${themeConfig.border}` }}
                              />
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleUpdateMember(member.id, "frontImage", "")}
                                sx={{ fontSize: "0.7rem", p: 0 }}
                              >
                                Remove Photo
                              </Button>
                            </Box>
                          ) : (
                            <Button
                              component="label"
                              variant="outlined"
                              size="small"
                              startIcon={<CloudUpload />}
                              fullWidth
                              sx={{
                                borderRadius: "8px",
                                borderStyle: "dashed",
                                textTransform: "none",
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                py: 0.8,
                              }}
                            >
                              Upload ID Proof
                              <input type="file" accept="image/*" hidden onChange={(e) => handleMemberImageUpload(e, member.id)} />
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Box>
              )}
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={() => setActiveStep(0)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!checkInData.govtIdNumber && !checkInData.reusePreviousId && !checkInData.hasVerifiedId}
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
                Next: Room Allocation & Capacity →
              </Button>
            </Box>
          </Box>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: ROOM ALLOCATION WITH FILTER & DROPDOWN SELECTION                  */}
        {/* ========================================================================= */}
        {activeStep === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
                  Step 3: Room Selection & Capacity Management
                </Typography>
                <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                  Select one or multiple rooms from the dropdown list. The system matches person capacity for {totalPartySize} guests.
                </Typography>
              </div>

              <Chip
                label={`${availableRooms.length} Clean Rooms Ready`}
                size="small"
                sx={{ bgcolor: "#10B98118", color: "#059669", fontWeight: 800, border: "1px solid #10B98130" }}
              />
            </Box>

            {/* Smart Multi-Room Recommendation Banner */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.2,
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(11, 142, 224, 0.08) 0%, rgba(240, 249, 255, 0.9) 100%)",
                border: `1.5px solid ${themeConfig.primary}`,
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <Avatar sx={{ bgcolor: themeConfig.primary, color: "#FFFFFF", width: 36, height: 36, mt: 0.3 }}>
                <Lightbulb />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark }}>
                  💡 Room Recommendation for {totalPartySize} Guests ({adultsCount} Adults, {childrenCount} Children)
                </Typography>
                <Typography variant="body2" sx={{ color: themeConfig.textMain, mt: 0.5, fontSize: "0.85rem" }}>
                  {totalPartySize <= 3
                    ? `Standard room capacity: 2 Adults + 1 Child (3 Persons Max). Recommended: 1 Room (e.g. Deluxe Room).`
                    : `Party of ${totalPartySize} detected. Standard rooms fit 2-3 persons. We recommend booking ${suggestedRoomsMin === suggestedRoomsMax ? `${suggestedRoomsMin} Rooms` : `${suggestedRoomsMin} to ${suggestedRoomsMax} Rooms`} for full family comfort.`}
                </Typography>
              </Box>
            </Paper>

            {/* Capacity Satisfaction Status Bar */}
            {selectedRoomsList.length > 0 && (
              <Paper
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  bgcolor: totalSelectedCapacity >= totalPartySize ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                  border: `1.5px solid ${totalSelectedCapacity >= totalPartySize ? "#10B981" : "#EF4444"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  {totalSelectedCapacity >= totalPartySize ? (
                    <CheckCircle sx={{ color: "#059669", fontSize: 24 }} />
                  ) : (
                    <Warning sx={{ color: "#DC2626", fontSize: 24 }} />
                  )}
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: totalSelectedCapacity >= totalPartySize ? "#065F46" : "#991B1B" }}>
                      {totalSelectedCapacity >= totalPartySize
                        ? `✅ Capacity Satisfied (${selectedRoomsList.length} Room${selectedRoomsList.length > 1 ? "s" : ""} accommodates all ${totalPartySize} guests)`
                        : `⚠️ Capacity Warning (Selected rooms fit ${totalSelectedCapacity} persons, party has ${totalPartySize} guests)`}
                    </Typography>
                    <Typography variant="caption" sx={{ color: totalSelectedCapacity >= totalPartySize ? "#047857" : "#B91C1C" }}>
                      Selected Capacity: <strong>{totalSelectedCapacity} Persons ({totalSelectedAdultsCap} Adults)</strong> &bull; Party Size: <strong>{totalPartySize} Persons</strong>
                    </Typography>
                  </div>
                </Box>

                <Chip
                  label={`${selectedRoomsList.length} Room${selectedRoomsList.length > 1 ? "s" : ""} Selected`}
                  sx={{
                    bgcolor: totalSelectedCapacity >= totalPartySize ? "#059669" : "#DC2626",
                    color: "#FFFFFF",
                    fontWeight: 900,
                  }}
                />
              </Paper>
            )}

            {/* DROPDOWN SELECTOR WITH QUICK FILTERS (Clean & Compact UI) */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: `1.5px solid ${themeConfig.border}`,
              }}
            >
              {/* Filter Chips Bar */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FilterList sx={{ color: themeConfig.primary, fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                    Select Available Rooms (Dropdown Selector):
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={`All Clean (${availableRooms.length})`}
                    size="small"
                    onClick={() => setRoomFilterCategory("ALL")}
                    sx={{
                      cursor: "pointer",
                      bgcolor: roomFilterCategory === "ALL" ? themeConfig.primary : themeConfig.champagne,
                      color: roomFilterCategory === "ALL" ? "#FFFFFF" : themeConfig.textMain,
                      fontWeight: 800,
                    }}
                  />
                  <Chip
                    label={`Recommended for ${totalPartySize} Guests`}
                    size="small"
                    onClick={() => setRoomFilterCategory("RECOMMENDED")}
                    sx={{
                      cursor: "pointer",
                      bgcolor: roomFilterCategory === "RECOMMENDED" ? themeConfig.primary : themeConfig.champagne,
                      color: roomFilterCategory === "RECOMMENDED" ? "#FFFFFF" : themeConfig.textMain,
                      fontWeight: 800,
                    }}
                  />
                  <Chip
                    label="Floor 1"
                    size="small"
                    onClick={() => setRoomFilterCategory("FLOOR_1")}
                    sx={{
                      cursor: "pointer",
                      bgcolor: roomFilterCategory === "FLOOR_1" ? themeConfig.primary : themeConfig.champagne,
                      color: roomFilterCategory === "FLOOR_1" ? "#FFFFFF" : themeConfig.textMain,
                      fontWeight: 700,
                    }}
                  />
                  <Chip
                    label="Floor 2"
                    size="small"
                    onClick={() => setRoomFilterCategory("FLOOR_2")}
                    sx={{
                      cursor: "pointer",
                      bgcolor: roomFilterCategory === "FLOOR_2" ? themeConfig.primary : themeConfig.champagne,
                      color: roomFilterCategory === "FLOOR_2" ? "#FFFFFF" : themeConfig.textMain,
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Box>

              {/* Multi-Select Room Dropdown */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="select-rooms-dropdown-label">Select Clean Room(s) *</InputLabel>
                <Select
                  labelId="select-rooms-dropdown-label"
                  multiple
                  value={selectedRoomIds}
                  onChange={handleDropdownRoomChange}
                  input={<OutlinedInput label="Select Clean Room(s) *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                      {selected.map((val) => {
                        const r = rooms.find((rm) => rm._id === val);
                        return (
                          <Chip
                            key={val}
                            label={`Room ${r?.roomNumber || val} (₹${getRoomTariff(r)})`}
                            size="small"
                            sx={{ bgcolor: themeConfig.primary, color: "#FFFFFF", fontWeight: 800 }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {filteredAvailableRooms.length === 0 ? (
                    <MenuItem disabled value="">
                      ⚠️ No clean rooms found for selected filter
                    </MenuItem>
                  ) : (
                    filteredAvailableRooms.map((room) => {
                      const cap = getRoomCapacity(room);
                      const tariff = getRoomTariff(room);
                      const rt = typeof room.roomType === "object" ? room.roomType : null;
                      const roomTypeName = rt?.name || room.type || "Deluxe Suite";
                      const isSelected = selectedRoomIds.includes(room._id);

                      return (
                        <MenuItem key={room._id} value={room._id}>
                          <Checkbox checked={isSelected} size="small" />
                          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", ml: 1 }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                Room {room.roomNumber} (Floor {room.floor || 1}) &bull; {roomTypeName}
                              </Typography>
                              <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                                👥 Capacity: {cap.adults} Adults + {cap.children} Child ({cap.total} Max)
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: "right", ml: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                                ₹{tariff}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#059669", fontWeight: 700 }}>
                                Clean & Ready
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      );
                    })
                  )}
                </Select>
              </FormControl>

              {/* Selected Rooms List Chips with Delete */}
              {selectedRoomsList.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, display: "block", mb: 1 }}>
                    Selected Room(s) Breakdown:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedRoomsList.map((r) => {
                      const cap = getRoomCapacity(r);
                      const tariff = getRoomTariff(r);
                      const rt = typeof r.roomType === "object" ? r.roomType : null;
                      const roomTypeName = rt?.name || r.type || "Deluxe Suite";

                      return (
                        <Chip
                          key={r._id}
                          label={`Room ${r.roomNumber} (${roomTypeName}) • 👥 ${cap.adults}A+${cap.children}C • ₹${tariff}/nt`}
                          onDelete={selectedRoomsList.length > 1 ? () => handleRemoveSelectedRoom(r._id) : undefined}
                          sx={{
                            p: 0.5,
                            bgcolor: "rgba(11, 142, 224, 0.08)",
                            color: themeConfig.primaryDark,
                            fontWeight: 800,
                            border: `1.5px solid ${themeConfig.primary}`,
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Selected Rooms Financial Breakdown Banner */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.2,
                borderRadius: "16px",
                bgcolor: themeConfig.champagne,
                border: `1.5px solid ${themeConfig.border}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                <Box>
                  <Box sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "0.875rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.5 }}>
                    <span>Allocated Room(s): </span>
                    {selectedRoomsList.length > 0 ? (
                      selectedRoomsList.map((r) => (
                        <Chip
                          key={r._id}
                          label={`Room ${r.roomNumber} (₹${getRoomTariff(r)})`}
                          size="small"
                          sx={{ bgcolor: themeConfig.primary, color: "#FFFFFF", fontWeight: 800 }}
                        />
                      ))
                    ) : (
                      <span style={{ color: themeConfig.danger }}>No room selected</span>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block", mt: 0.5 }}>
                    Stay: <strong>{nights} Night(s)</strong> ({checkInData.checkInDate || liveDate} to {checkInData.checkOutDate}) &bull; Arrival: {formatTime12Hour(checkInData.isCustomCheckInTime ? checkInData.checkInTime : liveTime)} &bull; Check-Out: 12:00 PM
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>
                    Combined Tariff ({selectedRoomsList.length} Rooms &bull; {nights} Nights):
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                    ₹{(checkInData.rate || 3000) * nights}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={() => setActiveStep(1)} startIcon={<ArrowBack />} sx={{ borderRadius: "10px", fontWeight: 700 }}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={selectedRoomsList.length === 0}
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
        {/* STEP 4: PAYMENT SETTLEMENT, VIP 10% DISCOUNT & SECURITY DEPOSIT           */}
        {/* ========================================================================= */}
        {activeStep === 3 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.primary, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
              Step 4: Payment Method, VIP Discount & Security Deposit
            </Typography>

            {/* Amount Overview Ribbon with 10% VIP Discount & Security Deposit Breakdown */}
            <Paper
              className="card-3d"
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: themeConfig.champagne,
                border: `1.5px solid ${themeConfig.border}`,
              }}
            >
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
                    Base Tariff ({selectedRoomsList.length} Rooms &bull; {nights} Nts):
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                    ₹{baseTariffTotal}
                  </Typography>
                </Grid>

                {vipDiscountAmount > 0 && (
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" sx={{ color: "#059669", fontWeight: 800 }}>
                      🎉 VIP 10% Loyalty Discount:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#059669" }}>
                      -₹{vipDiscountAmount}
                    </Typography>
                  </Grid>
                )}

                {securityDepositAmount > 0 && (
                  <Grid size={{ xs: 6, sm: 2 }}>
                    <Typography variant="caption" sx={{ color: "#2563EB", fontWeight: 800 }}>
                      🛡️ Security Deposit:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#2563EB" }}>
                      +₹{securityDepositAmount}
                    </Typography>
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: vipDiscountAmount > 0 ? 3 : 5 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800 }}>
                    Net Billable Total:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.primary }}>
                    ₹{checkInData.total || calculatedGrandTotal}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5, borderColor: themeConfig.border }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <div>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Advance Amount Collecting:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#059669" }}>
                    ₹{checkInData.paid !== undefined ? checkInData.paid : checkInData.total || calculatedGrandTotal}
                  </Typography>
                </div>

                <div>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Pending Balance:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: (checkInData.due || 0) > 0 ? themeConfig.danger : themeConfig.success }}>
                    ₹{checkInData.due || 0}
                  </Typography>
                </div>
              </Box>
            </Paper>

            {/* Optional Security Deposit Toggle Card */}
            <Paper
              sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: checkInData.collectSecurityDeposit ? "rgba(37, 99, 235, 0.06)" : "#FFFFFF",
                border: `1.5px solid ${checkInData.collectSecurityDeposit ? "#2563EB" : themeConfig.border}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Shield sx={{ color: "#2563EB" }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                      🛡️ Collect Refundable Security Deposit (સુરક્ષા ડિપોઝિટ - વૈકલ્પિક)
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      Optional caution deposit collected at check-in, refundable upon room inspection at check-out.
                    </Typography>
                  </div>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(checkInData.collectSecurityDeposit)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const depAmt = checked ? (Number(checkInData.securityDepositAmount) || 1000) : 0;
                        const netTot = Math.max(0, baseTariffTotal - vipDiscountAmount) + depAmt;
                        setCheckInData({
                          ...checkInData,
                          collectSecurityDeposit: checked,
                          securityDepositAmount: depAmt,
                          total: netTot,
                          paid: netTot,
                          due: 0,
                        });
                      }}
                      color="primary"
                    />
                  }
                  label={<Typography variant="body2" sx={{ fontWeight: 700 }}>Enable Deposit</Typography>}
                />
              </Box>

              {checkInData.collectSecurityDeposit && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Security Deposit Amount (₹)"
                        type="number"
                        value={checkInData.securityDepositAmount || 1000}
                        onChange={(e) => {
                          const depAmt = Number(e.target.value) || 0;
                          const netTot = Math.max(0, baseTariffTotal - vipDiscountAmount) + depAmt;
                          setCheckInData({
                            ...checkInData,
                            securityDepositAmount: depAmt,
                            total: netTot,
                            paid: netTot,
                            due: 0,
                          });
                        }}
                        helperText="Will be recorded as refundable deposit in guest folio"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Advance Amount Collecting (₹) *"
                  type="number"
                  value={checkInData.paid !== undefined ? checkInData.paid : checkInData.total || calculatedGrandTotal}
                  onChange={(e) => {
                    const p = Number(e.target.value);
                    const tot = checkInData.total || calculatedGrandTotal;
                    setCheckInData({ ...checkInData, paid: p, due: Math.max(0, tot - p) });
                  }}
                />
              </Grid>
            </Grid>

            {/* Payment Method Selector */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mt: 1 }}>
              Select Advance Payment Method:
            </Typography>

            <RadioGroup
              row
              value={checkInData.paymentMethod || "UPI"}
              onChange={(e) => setCheckInData({ ...checkInData, paymentMethod: e.target.value })}
              sx={{ gap: 1.5 }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: checkInData.paymentMethod === "UPI" ? themeConfig.primary : themeConfig.border,
                  bgcolor: checkInData.paymentMethod === "UPI" ? "rgba(11, 142, 224, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FormControlLabel value="UPI" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 800 }}>📱 UPI / QR</Typography>} />
              </Paper>

              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: checkInData.paymentMethod === "CARD" ? "#8B5CF6" : themeConfig.border,
                  bgcolor: checkInData.paymentMethod === "CARD" ? "rgba(139, 92, 246, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FormControlLabel value="CARD" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 800 }}>💳 Card (POS)</Typography>} />
              </Paper>

              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: checkInData.paymentMethod === "CASH" ? "#10B981" : themeConfig.border,
                  bgcolor: checkInData.paymentMethod === "CASH" ? "rgba(16, 185, 129, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FormControlLabel value="CASH" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 800 }}>💵 Cash</Typography>} />
              </Paper>

              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor: checkInData.paymentMethod === "BANK_TRANSFER" ? "#F59E0B" : themeConfig.border,
                  bgcolor: checkInData.paymentMethod === "BANK_TRANSFER" ? "rgba(245, 158, 11, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FormControlLabel value="BANK_TRANSFER" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 800 }}>🏦 Bank Transfer</Typography>} />
              </Paper>
            </RadioGroup>

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
                  boxShadow: "0 8px 24px -4px rgba(11, 142, 224, 0.15)",
                }}
              >
                <Box sx={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
                  <Box sx={{ p: 1.5, bgcolor: "#FFFFFF", borderRadius: "14px", border: `1px solid ${themeConfig.border}`, textAlign: "center" }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=${encodeURIComponent(hotelSettings?.upiId || "jatinkakadiya234-1@okicici")}%26pn=Hotel%20Grand%20Royale%26am=${checkInData.paid || calculatedGrandTotal}%26cu=INR`}
                      alt="UPI Dynamic QR"
                      style={{ width: 130, height: 130, display: "block" }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primaryDark, mt: 0.5, display: "block" }}>
                      Scan to Pay ₹{checkInData.paid || calculatedGrandTotal}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 240 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain, mb: 0.5 }}>
                      Instant UPI QR Payment
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                      Ask guest to scan the dynamic QR code on screen. Amount <strong>₹{checkInData.paid || calculatedGrandTotal}</strong> is encoded directly.
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
                      slotProps={{ htmlInput: { maxLength: 4 } }}
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
                      Collect physical cash of <strong>₹{checkInData.paid || calculatedGrandTotal}</strong> at the front desk counter. Instant official cash voucher receipt will be recorded in shift drawer.
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, flexWrap: "gap", gap: 1 }}>
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                    {checkInData.fullName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                    Mobile: {checkInData.mobile} &bull; Email: {checkInData.email || "N/A"}
                  </Typography>
                </div>

                {isVipGuest ? (
                  <Chip
                    icon={<Star sx={{ "&&": { color: "#F59E0B" } }} />}
                    label={`Returning VIP Guest (10% Discount Applied)`}
                    size="small"
                    sx={{ bgcolor: "rgba(245, 158, 11, 0.12)", color: "#B45309", fontWeight: 800 }}
                  />
                ) : (
                  <Chip label="First-Time Guest" size="small" sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, fontWeight: 800 }} />
                )}
              </Box>

              <Divider sx={{ my: 2, borderColor: themeConfig.border }} />

              <Grid container spacing={2} sx={{ fontSize: "0.85rem", color: themeConfig.textMain }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Allocated Room(s):</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.primary }}>
                    {selectedRoomsList.length > 0
                      ? selectedRoomsList.map((r) => `Room ${r.roomNumber} (${(typeof r.roomType === "object" ? r.roomType?.name : r.type) || "Suite"})`).join(", ")
                      : `Room ${checkInData.roomNumber || "None"}`}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Party Size:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {totalPartySize} Guests ({adultsCount} Adults, {childrenCount} Children)
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Stay Duration:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {nights} Night(s)
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Check-In Date & Time:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#059669" }}>
                    {checkInData.checkInDate || liveDate} at {formatTime12Hour(checkInData.isCustomCheckInTime ? checkInData.checkInTime : liveTime)}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Check-Out Date & Time:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#DC2626" }}>
                    {checkInData.checkOutDate} at 12:00 PM (Noon)
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Primary Govt ID Stamping:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: checkInData.hasVerifiedId ? "#059669" : themeConfig.textMain }}>
                    {checkInData.govtIdType} ({formatMaskedId(checkInData.govtIdNumber)})
                  </Typography>
                </Grid>

                {vipDiscountAmount > 0 && (
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" sx={{ color: "#059669", display: "block", fontWeight: 800 }}>VIP 10% Loyalty Discount:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#059669" }}>
                      -₹{vipDiscountAmount}
                    </Typography>
                  </Grid>
                )}

                {securityDepositAmount > 0 && (
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" sx={{ color: "#2563EB", display: "block", fontWeight: 800 }}>Refundable Security Deposit:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#2563EB" }}>
                      +₹{securityDepositAmount}
                    </Typography>
                  </Grid>
                )}

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
                    ₹{checkInData.paid !== undefined ? checkInData.paid : checkInData.total || calculatedGrandTotal}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, display: "block" }}>Balance Due:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: (checkInData.due || 0) > 0 ? themeConfig.danger : themeConfig.success }}>
                    ₹{checkInData.due || 0}
                  </Typography>
                </Grid>
              </Grid>

              {/* Accompanying Members Table in Review */}
              {checkInData.accompanyingGuests && checkInData.accompanyingGuests.length > 0 && (
                <Box sx={{ mt: 2.5 }}>
                  <Divider sx={{ my: 2, borderColor: themeConfig.border }} />
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 800, textTransform: "uppercase", display: "block", mb: 1 }}>
                    👥 Accompanying Members ({checkInData.accompanyingGuests.length}):
                  </Typography>
                  <Paper sx={{ borderRadius: "12px", border: `1px solid ${themeConfig.border}`, overflow: "hidden" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", bgcolor: themeConfig.champagne, p: 1, fontWeight: 800, fontSize: "0.75rem", color: themeConfig.textMain }}>
                      <div>Name</div>
                      <div>Relationship</div>
                      <div>Gender/Age</div>
                      <div>Govt ID Proof</div>
                    </Box>
                    {checkInData.accompanyingGuests.map((m, idx) => (
                      <Box key={idx} sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", p: 1, fontSize: "0.78rem", borderTop: `1px solid ${themeConfig.border}`, alignItems: "center" }}>
                        <div style={{ fontWeight: 700 }}>{m.name || "Member"}</div>
                        <div>{m.relationship || "Family"}</div>
                        <div>{m.gender || "Male"}{m.age ? `, ${m.age} yrs` : ""}</div>
                        <div style={{ color: themeConfig.textMuted }}>{m.idType}: {m.idNumber || "On Record"}</div>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              )}
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
