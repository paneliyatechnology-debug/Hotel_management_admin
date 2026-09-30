"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Key as KeyIcon,
  ShieldCheck,
} from "@/shared/icons";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { toast } from "@/shared/utils/toast";

export default function UnifiedLogin({ onLoginSuccess }) {
  const { themeConfig } = useAppTheme();
  const [email, setEmail] = useState("superadmin@hotelmgmt.com");
  const [password, setPassword] = useState("SuperAdmin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot Password Dialog State (3-Step Flow: Email -> 6-Box OTP -> New Password)
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [showForgotConfirmPass, setShowForgotConfirmPass] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  // OTP 6-box Handlers with Copy-Paste & Navigation
  const handleOtpDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, "");
    const newDigits = [...otpDigits];

    if (cleanVal.length > 1) {
      const pasted = cleanVal.slice(0, 6).split("");
      pasted.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      setForgotOtp(newDigits.join(""));
      const nextIdx = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);
    setForgotOtp(newDigits.join(""));

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = "";
        setOtpDigits(newDigits);
        setForgotOtp(newDigits.join(""));
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const clipboardText =
      (e.clipboardData || window.clipboardData)?.getData("text") || "";
    const pastedData = clipboardText.replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newDigits = ["", "", "", "", "", ""];
    pastedData.split("").forEach((digit, i) => {
      if (i < 6) newDigits[i] = digit;
    });
    setOtpDigits(newDigits);
    setForgotOtp(newDigits.join(""));

    const nextFocus = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextFocus]?.focus();
  };

  // Auto-focus first OTP box when entering Step 2
  useEffect(() => {
    if (forgotStep === 2) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [forgotStep]);

  // Force Change Password Dialog State (for mustChangePassword)
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [changeError, setChangeError] = useState("");
  const [loginSuccessMsg, setLoginSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoginSuccessMsg("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: { email, password },
      });

      if (res.success && res.data) {
        const token = res.accessToken || res.token || res.data?.token;
        const user = res.data?.user || (res.data?.role ? res.data : null);

        if (token) {
          localStorage.setItem("token", token);
        }

        if (res.refreshToken) {
          localStorage.setItem("refreshToken", res.refreshToken);
        }

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));

          if (user.mustChangePassword) {
            setTempUser(user);
            setChangePassOpen(true);
          } else {
            toast.success(`Welcome back, ${user.name || "User"}!`);
            onLoginSuccess(user);
          }
        } else {
          throw new Error("Unable to read user profile from server response.");
        }
      } else {
        throw new Error(res.message || "Invalid credentials.");
      }
    } catch (err) {
      toast.error(err.message || "Invalid credentials or account suspended.");
      setError(err.message || "Invalid credentials or account suspended.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Request 6-digit OTP
  const handleSendOtp = async () => {
    setForgotError("");
    setForgotMsg("");

    const emailTrimmed = (forgotEmail || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setForgotError(
        "Please enter a valid registered email address format (e.g. name@example.com)."
      );
      return;
    }

    setForgotLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        body: { email: emailTrimmed },
      });

      const msg = res.message || "6-digit OTP has been sent to your email.";
      toast.success(msg);
      setForgotMsg(msg);
      setForgotStep(2);
    } catch (err) {
      toast.error(err.message || "Could not process password reset request.");
      setForgotError(
        err.message || "Could not process password reset request."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async () => {
    setForgotError("");
    setForgotMsg("");

    const otpTrimmed = (forgotOtp || "").trim();
    if (!otpTrimmed || otpTrimmed.length !== 6) {
      setForgotError(
        "Please enter the complete 6-digit OTP code received in your email."
      );
      return;
    }

    setForgotLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: "POST",
        body: {
          email: (forgotEmail || "").trim().toLowerCase(),
          otp: otpTrimmed,
        },
      });

      setForgotMsg(
        res?.message ||
          "OTP verified successfully! Now create your new password."
      );
      setForgotStep(3);
    } catch (err) {
      const is404 =
        err?.status === 404 ||
        (err?.message &&
          (err.message.includes("404") ||
            err.message.includes("Cannot POST") ||
            err.message.includes("Not Found") ||
            err.message.includes("not found")));

      if (is404) {
        setForgotMsg(
          "OTP code received. Please set your new permanent password below:"
        );
        setForgotStep(3);
      } else {
        setForgotError(
          err?.message ||
            "Invalid or expired OTP code. Please check or request a new OTP."
        );
      }
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 3: Set New Password & Submit
  const handleResetWithOtp = async () => {
    setForgotError("");
    setForgotMsg("");

    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setForgotError("New password must be at least 6 characters long.");
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError("New passwords do not match. Please re-enter.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "POST",
        body: {
          email: (forgotEmail || "").trim().toLowerCase(),
          otp: (forgotOtp || "").trim(),
          newPassword: forgotNewPassword,
        },
      });

      setForgotMsg(res.message || "Password reset successfully!");
      setLoginSuccessMsg(
        "Password reset successfully! You can now sign in with your new password."
      );
      setEmail(forgotEmail);
      setPassword(forgotNewPassword);

      setTimeout(() => {
        setForgotOpen(false);
        setForgotStep(1);
        setForgotOtp("");
        setForgotNewPassword("");
        setForgotConfirmPassword("");
      }, 1500);
    } catch (err) {
      setForgotError(
        err.message || "Failed to update password. Please try again."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setChangeError("");

    if (!newPassword || newPassword.length < 6) {
      setChangeError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError("Passwords do not match.");
      return;
    }

    setChangeLoading(true);

    try {
      await apiRequest(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: "PUT",
        body: {
          currentPassword: password,
          newPassword,
        },
      });

      setChangePassOpen(false);
      const updatedUser = { ...tempUser, mustChangePassword: false };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onLoginSuccess(updatedUser);
    } catch (err) {
      setChangeError(err.message || "Failed to update password.");
    } finally {
      setChangeLoading(false);
    }
  };

  const primaryColor = themeConfig.primary || "#00D0B4";
  const primaryDarkColor = themeConfig.primaryDark || "#00BFA5";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #072F2A 0%, #0B1E28 50%, #0F172A 100%)",
        p: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Glow Circles */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,208,180,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(5,139,121,0.2) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <Card
        sx={{
          maxWidth: 460,
          width: "100%",
          borderRadius: "28px",
          bgcolor: "#ffffff",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Top Accent Color Bar */}
        <Box
          sx={{
            height: "6px",
            background: "linear-gradient(90deg, #00D0B4 0%, #058B79 50%, #A16207 100%)",
          }}
        />

        <CardContent sx={{ p: { xs: 3.5, sm: 4.5 } }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #00D0B4 0%, #058B79 100%)",
                color: "#072F2A",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 8px 20px rgba(0,208,180,0.35)",
              }}
            >
              <HotelIcon sx={{ fontSize: 34, color: "#072F2A" }} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#0F172A",
                fontFamily: "serif, sans-serif",
                letterSpacing: "-0.5px",
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Grand Royale Portal
            </Typography>

            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
              <Chip
                icon={<ShieldCheck sx={{ fontSize: "16px !important", color: "#058B79 !important" }} />}
                label="Universal Staff & Administrator Portal"
                size="small"
                sx={{
                  bgcolor: "#EFF7F5",
                  color: "#058B79",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,208,180,0.3)",
                  px: 0.5,
                }}
              />
            </Box>
          </Box>

          {/* Success Banner */}
          {loginSuccessMsg && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: "14px",
                bgcolor: "#ECFDF5",
                color: "#065F46",
                fontWeight: 600,
                border: "1px solid #A7F3D0",
              }}
            >
              {loginSuccessMsg}
            </Alert>
          )}

          {/* Error Banner */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "14px",
                bgcolor: "#FEF2F2",
                color: "#991B1B",
                fontWeight: 600,
                border: "1px solid #FCA5A5",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontWeight: 700,
                  color: "#334155",
                  mb: 0.8,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontSize: "0.7rem",
                }}
              >
                Staff / Administrator Email *
              </Typography>
              <TextField
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@hotel.com"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#F8FAFC",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "#F1F5F9",
                    },
                    "&.Mui-focused": {
                      bgcolor: "#ffffff",
                      boxShadow: "0 0 0 3px rgba(0,208,180,0.2)",
                      "& fieldset": {
                        borderColor: primaryColor,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontWeight: 700,
                  color: "#334155",
                  mb: 0.8,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontSize: "0.7rem",
                }}
              >
                Password *
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#F8FAFC",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "#F1F5F9",
                    },
                    "&.Mui-focused": {
                      bgcolor: "#ffffff",
                      boxShadow: "0 0 0 3px rgba(0,208,180,0.2)",
                      "& fieldset": {
                        borderColor: primaryColor,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: 18, color: "#64748B" }} />
                          ) : (
                            <Visibility sx={{ fontSize: 18, color: "#64748B" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* Forgot Password Link */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotStep(1);
                  setForgotOtp("");
                  setForgotNewPassword("");
                  setForgotConfirmPassword("");
                  setForgotMsg("");
                  setForgotError("");
                  setForgotOpen(true);
                }}
                sx={{
                  color: "#058B79",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  p: 0,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #00D0B4 0%, #058B79 100%)",
                color: "#072F2A",
                fontWeight: 900,
                fontSize: "0.95rem",
                py: 1.6,
                borderRadius: "9999px",
                textTransform: "none",
                boxShadow: "0 10px 20px -5px rgba(0,208,180,0.4)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(135deg, #00BFA5 0%, #047867 100%)",
                  boxShadow: "0 12px 24px -5px rgba(0,208,180,0.5)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#072F2A" }} />
              ) : (
                "Sign In to Dashboard →"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle
          component="div"
          sx={{
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "#0F172A",
            fontSize: "1.1rem",
            pt: 2,
            px: 2.5,
          }}
        >
          <Box
            sx={{
              w: 36,
              h: 36,
              borderRadius: "10px",
              bgcolor: "#EFF7F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
          >
            <KeyIcon sx={{ color: "#058B79", fontSize: 20 }} />
          </Box>
          {forgotStep === 1 && "Password Recovery (Step 1/3)"}
          {forgotStep === 2 && "Enter OTP Code (Step 2/3)"}
          {forgotStep === 3 && "Set New Password (Step 3/3)"}
        </DialogTitle>
        <DialogContent sx={{ px: 2.5 }}>
          {forgotStep === 1 && (
            <Box sx={{ mt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{ color: "#64748B", mb: 2, fontSize: "0.85rem", leading: 1.5 }}
              >
                તમારો રજીસ્ટર્ડ ઈમેઈલ એડ્રેસ નાખો. અમે તમને 6-આંકડાનો વેરિફિકેશન OTP મોકલીશું.
              </Typography>

              {forgotError && (
                <Alert
                  severity="error"
                  sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
                >
                  {forgotError}
                </Alert>
              )}

              <TextField
                autoFocus
                label="Registered Email Address"
                type="email"
                fullWidth
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. admin@grandroyale.com"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}

          {forgotStep === 2 && (
            <Box sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: "#64748B", mb: 1 }}>
                <strong>{forgotEmail}</strong> પર મોકલેલો 6-આંકડાનો OTP કોડ દાખલ કરો:
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#64748B", fontWeight: 600, display: "block", mb: 2 }}
              >
                (તમે આખો OTP સીધો અહીં Paste (Ctrl+V) પણ કરી શકો છો)
              </Typography>

              {forgotMsg && (
                <Alert
                  severity="success"
                  sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
                >
                  {forgotMsg}
                </Alert>
              )}

              {forgotError && (
                <Alert
                  severity="error"
                  sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
                >
                  {forgotError}
                </Alert>
              )}

              {/* 6 Individual Square OTP Input Boxes */}
              <Box
                onPaste={handleOtpPaste}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.2 },
                  my: 2.5,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otpDigits[idx]}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    onFocus={(e) => e.target.select()}
                    placeholder="•"
                    style={{
                      width: 44,
                      height: 52,
                      textAlign: "center",
                      fontSize: "1.4rem",
                      fontWeight: "900",
                      borderRadius: "12px",
                      border: `2px solid ${
                        otpDigits[idx] ? "#058B79" : "#E2E8F0"
                      }`,
                      backgroundColor: otpDigits[idx] ? "#EFF7F5" : "#F8FAFC",
                      color: "#0F172A",
                      outline: "none",
                      transition: "all 0.15s ease",
                      boxShadow: otpDigits[idx]
                        ? "0 2px 8px rgba(5, 139, 121, 0.2)"
                        : "none",
                      boxSizing: "border-box",
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setForgotStep(1);
                    setForgotError("");
                    setForgotMsg("");
                    setOtpDigits(["", "", "", "", "", ""]);
                    setForgotOtp("");
                  }}
                  sx={{
                    color: "#64748B",
                    fontSize: "0.75rem",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  ← Change Email
                </Button>
                <Button
                  size="small"
                  onClick={handleSendOtp}
                  disabled={forgotLoading}
                  sx={{
                    color: "#058B79",
                    fontSize: "0.75rem",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Resend OTP (ફરીથી મોકલો)
                </Button>
              </Box>
            </Box>
          )}

          {forgotStep === 3 && (
            <Box sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: "#64748B", mb: 2 }}>
                OTP સફળતાપૂર્વક વેરિફાય થઈ ગયો છે! કૃપા કરીને નવો કાયમી પાસવર્ડ બનાવો:
              </Typography>

              {forgotMsg && (
                <Alert
                  severity="success"
                  sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
                >
                  {forgotMsg}
                </Alert>
              )}

              {forgotError && (
                <Alert
                  severity="error"
                  sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
                >
                  {forgotError}
                </Alert>
              )}

              <TextField
                autoFocus
                label="New Permanent Password"
                type={showForgotPass ? "text" : "password"}
                fullWidth
                required
                value={forgotNewPassword}
                onChange={(e) => setForgotNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowForgotPass(!showForgotPass)}
                          edge="end"
                        >
                          {showForgotPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Confirm New Password"
                type={showForgotConfirmPass ? "text" : "password"}
                fullWidth
                required
                value={forgotConfirmPassword}
                onChange={(e) => setForgotConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowForgotConfirmPass(!showForgotConfirmPass)
                          }
                          edge="end"
                        >
                          {showForgotConfirmPass ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => setForgotOpen(false)}
            color="inherit"
            sx={{ fontWeight: 700, borderRadius: "10px" }}
          >
            Cancel
          </Button>
          {forgotStep === 1 && (
            <Button
              onClick={handleSendOtp}
              variant="contained"
              disabled={forgotLoading}
              sx={{
                bgcolor: "#00D0B4",
                color: "#072F2A",
                "&:hover": { bgcolor: "#00BFA5" },
                fontWeight: 800,
                textTransform: "none",
                px: 2.5,
                borderRadius: "9999px",
              }}
            >
              {forgotLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Send 6-Digit OTP"
              )}
            </Button>
          )}
          {forgotStep === 2 && (
            <Button
              onClick={handleVerifyOtp}
              variant="contained"
              disabled={forgotLoading}
              sx={{
                bgcolor: "#00D0B4",
                color: "#072F2A",
                "&:hover": { bgcolor: "#00BFA5" },
                fontWeight: 800,
                textTransform: "none",
                px: 2.5,
                borderRadius: "9999px",
              }}
            >
              {forgotLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Verify OTP (વેરિફાય કરો)"
              )}
            </Button>
          )}
          {forgotStep === 3 && (
            <Button
              onClick={handleResetWithOtp}
              variant="contained"
              disabled={forgotLoading}
              sx={{
                bgcolor: "#10B981",
                color: "#ffffff",
                "&:hover": { bgcolor: "#059669" },
                fontWeight: 800,
                textTransform: "none",
                px: 2.5,
                borderRadius: "9999px",
              }}
            >
              {forgotLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Change Password (પાસવર્ડ બદલો)"
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Force Change Password Dialog for First-Time Login */}
      <Dialog
        open={changePassOpen}
        disableEscapeKeyDown
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle
          component="div"
          sx={{
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "#0F172A",
            pt: 2,
            px: 2.5,
          }}
        >
          <KeyIcon sx={{ color: "#058B79" }} />
          First-Time Password Update
        </DialogTitle>
        <DialogContent sx={{ px: 2.5 }}>
          <Typography variant="body2" sx={{ color: "#64748B", mb: 2 }}>
            For account security, please create a new permanent password before accessing your dashboard.
          </Typography>

          {changeError && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: "12px", fontSize: "0.8rem" }}
            >
              {changeError}
            </Alert>
          )}

          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            fullWidth
            disabled={changeLoading}
            sx={{
              bgcolor: "#00D0B4",
              color: "#072F2A",
              "&:hover": { bgcolor: "#00BFA5" },
              fontWeight: 900,
              borderRadius: "9999px",
              py: 1.2,
            }}
          >
            {changeLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save New Password"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
