"use client";

import { useState } from "react";
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
  Divider,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Key as KeyIcon,
} from "@/shared/icons";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { useAppTheme } from "@/shared/context/ThemeContext";

export default function UnifiedLogin({ onLoginSuccess }) {
  const { themeConfig } = useAppTheme();
  const [email, setEmail] = useState("superadmin@hotelmgmt.com");
  const [password, setPassword] = useState("SuperAdmin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot Password Dialog State (2-Step Flow: Email -> OTP + New Password)
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Force Change Password Dialog State (for mustChangePassword)
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        const token = res.token || res.data.token;
        const user = res.data.user || (res.data.role ? res.data : null);

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
            onLoginSuccess(user);
          }
        } else {
          throw new Error("Unable to read user profile from server response.");
        }
      } else {
        throw new Error(res.message || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials or account suspended.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Request 6-digit OTP
  const handleSendOtp = async () => {
    setForgotError("");
    setForgotMsg("");

    if (!forgotEmail || !forgotEmail.includes("@")) {
      setForgotError("Please enter a valid registered email address.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        body: { email: forgotEmail },
      });

      setForgotMsg(res.message || "6-digit OTP has been dispatched to your email.");
      setForgotStep(2);
    } catch (err) {
      setForgotError(err.message || "Could not process password reset request.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Verify OTP & Reset Password
  const handleResetWithOtp = async () => {
    setForgotError("");
    setForgotMsg("");

    if (!forgotOtp || forgotOtp.trim().length < 6) {
      setForgotError("Please enter the 6-digit OTP received in email.");
      return;
    }

    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setForgotError("New password must be at least 6 characters long.");
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError("New passwords do not match.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await apiRequest(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "POST",
        body: {
          email: forgotEmail,
          otp: forgotOtp.trim(),
          newPassword: forgotNewPassword,
        },
      });

      setForgotMsg(res.message || "Password reset successfully!");
      setLoginSuccessMsg("Password reset successfully! You can now sign in with your new password.");
      setEmail(forgotEmail);
      setPassword(forgotNewPassword);

      setTimeout(() => {
        setForgotOpen(false);
        setForgotStep(1);
        setForgotOtp("");
        setForgotNewPassword("");
        setForgotConfirmPassword("");
      }, 1200);
    } catch (err) {
      setForgotError(err.message || "Invalid or expired OTP. Please try again.");
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
        method: "POST",
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: themeConfig.bgMain,
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 460,
          width: "100%",
          p: 1,
          borderRadius: 0,
          bgcolor: themeConfig.bgCard || "#ffffff",
          borderColor: themeConfig.border,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 0,
                bgcolor: themeConfig.primary,
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow || "rgba(0,0,0,0.15)"}`,
              }}
            >
              <HotelIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              Grand Royale Portal
            </Typography>
            <Typography variant="body2" sx={{ color: themeConfig.textMuted, mt: 0.5 }}>
              Universal Sign-In for Super Admin, Hotel Admin & Receptionists
            </Typography>
          </Box>

          {/* Success Banner */}
          {loginSuccessMsg && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
              {loginSuccessMsg}
            </Alert>
          )}

          {/* Error Banner */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <TextField
              label="Staff / Administrator Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2.5 }}
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

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1.5 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

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
                sx={{ color: themeConfig.primary, fontSize: "0.8rem", p: 0 }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                bgcolor: themeConfig.primary,
                "&:hover": { bgcolor: themeConfig.primaryDark },
                py: 1.4,
                fontSize: "0.95rem",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password with 2-Step OTP Dialog */}
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle component="div" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
          <KeyIcon sx={{ color: themeConfig.primary }} />
          {forgotStep === 1 ? "Password Recovery" : "Verify OTP & Reset"}
        </DialogTitle>
        <DialogContent>
          {forgotStep === 1 ? (
            /* STEP 1: Enter Email to Receive OTP */
            <Box sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                Enter your registered email address. We will email you a 6-digit verification OTP.
              </Typography>

              {forgotError && (
                <Alert severity="error" sx={{ mb: 2 }}>
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
          ) : (
            /* STEP 2: Enter OTP & New Password */
            <Box sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
                Enter the 6-digit verification OTP sent to <strong>{forgotEmail}</strong> and your new password.
              </Typography>

              {forgotMsg && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {forgotMsg}
                </Alert>
              )}

              {forgotError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {forgotError}
                </Alert>
              )}

              <TextField
                autoFocus
                label="6-Digit OTP"
                fullWidth
                required
                value={forgotOtp}
                onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="e.g. 583920"
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon sx={{ color: themeConfig.primary, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="New Permanent Password"
                type={showForgotPass ? "text" : "password"}
                fullWidth
                required
                value={forgotNewPassword}
                onChange={(e) => setForgotNewPassword(e.target.value)}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowForgotPass(!showForgotPass)} edge="end">
                          {showForgotPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Confirm New Password"
                type={showForgotPass ? "text" : "password"}
                fullWidth
                required
                value={forgotConfirmPassword}
                onChange={(e) => setForgotConfirmPassword(e.target.value)}
                sx={{ mb: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setForgotStep(1);
                    setForgotError("");
                  }}
                  sx={{ color: themeConfig.textMuted, fontSize: "0.75rem" }}
                >
                  Change Email
                </Button>
                <Button
                  size="small"
                  onClick={handleSendOtp}
                  disabled={forgotLoading}
                  sx={{ color: themeConfig.primary, fontSize: "0.75rem" }}
                >
                  Resend OTP
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={() => setForgotOpen(false)} color="inherit">
            Cancel
          </Button>
          {forgotStep === 1 ? (
            <Button
              onClick={handleSendOtp}
              variant="contained"
              disabled={forgotLoading}
              sx={{ bgcolor: themeConfig.primary, "&:hover": { bgcolor: themeConfig.primaryDark } }}
            >
              {forgotLoading ? <CircularProgress size={20} color="inherit" /> : "Send 6-Digit OTP"}
            </Button>
          ) : (
            <Button
              onClick={handleResetWithOtp}
              variant="contained"
              disabled={forgotLoading}
              sx={{ bgcolor: themeConfig.primary, "&:hover": { bgcolor: themeConfig.primaryDark } }}
            >
              {forgotLoading ? <CircularProgress size={20} color="inherit" /> : "Verify & Reset Password"}
            </Button>
          )}
        </DialogActions>
      </Dialog>


      {/* Force Change Password Dialog for First-Time Login */}
      <Dialog open={changePassOpen} disableEscapeKeyDown maxWidth="xs" fullWidth>
        <DialogTitle component="div" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
          <KeyIcon sx={{ color: themeConfig.primary }} />
          First-Time Password Update
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: themeConfig.textMuted, mb: 2 }}>
            For account security, please create a new permanent password before accessing your dashboard.
          </Typography>

          {changeError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {changeError}
            </Alert>
          )}

          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            fullWidth
            disabled={changeLoading}
            sx={{ bgcolor: themeConfig.primary, "&:hover": { bgcolor: themeConfig.primaryDark } }}
          >
            {changeLoading ? <CircularProgress size={20} color="inherit" /> : "Save New Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
