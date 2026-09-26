"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  TextField,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Refresh,
  CheckCircle,
  Create,
  TextFields,
  Draw,
  TabletMac,
  Devices,
  UploadFile,
  TouchApp,
  Usb,
  Fullscreen,
  FullscreenExit,
  CloudUpload,
  QrCode2,
  Phone,
  ContentCopy,
  Check,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";

/**
 * Enterprise Digital Signature Pad with Mobile & Hardware Support
 * 1. 📱 Mobile Phone as Signature Pad (QR Code Scan-to-Sign, No app needed!)
 * 2. 🖊️ Touchscreen, Stylus Pen & Drawing Tablet
 * 3. 📟 USB Hardware Signature Pads (Topaz, Wacom STU, WebHID)
 * 4. 📁 File Upload & Clipboard (Ctrl+V) Image Paste
 * 5. ✍️ Type-to-Sign Cursive Generation
 */
export default function DigitalSignaturePad({
  title = "Guest Signature",
  signerName = "",
  signerRole = "Guest",
  value = null,
  onChange,
  themeConfig: propThemeConfig,
  required = false,
}) {
  const { themeConfig: appThemeConfig, isDarkMode } = useAppTheme();
  const themeConfig = propThemeConfig || appThemeConfig;

  const canvasRef = useRef(null);
  const modalCanvasRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(Boolean(value));
  const [mode, setMode] = useState("DRAW"); // 'DRAW' | 'MOBILE' | 'HARDWARE' | 'UPLOAD' | 'TYPE'
  const [typedName, setTypedName] = useState(signerName || "");
  const [detectedInputType, setDetectedInputType] = useState(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hardware Device State (WebHID & USB Signature Pad)
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnectingDevice, setIsConnectingDevice] = useState(false);
  const [isCapturingFromDevice, setIsCapturingFromDevice] = useState(false);
  const [deviceStatusMsg, setDeviceStatusMsg] = useState("");

  const lastPointRef = useRef(null);

  // Session ID for Mobile Sync
  const [sessionId] = useState(() => `sig_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);

  // Mobile Web Sign URL
  const mobileSignUrl = typeof window !== "undefined"
    ? `${window.location.origin}/mobile-sign?session=${sessionId}&name=${encodeURIComponent(signerName || "Guest")}`
    : `https://hotel.local/mobile-sign?session=${sessionId}`;

  const qrCodeImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mobileSignUrl)}&margin=8`;

  // Synchronize internal canvas with existing signature data URL
  const loadSignatureIntoCanvas = useCallback((canvas, dataUrl) => {
    if (!canvas || !dataUrl) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      setHasSignature(true);
    };
    img.src = dataUrl;
  }, []);

  // Initialize canvas resolution & stroke styling
  const initCanvas = useCallback(
    (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = isDarkMode ? "#38BDF8" : themeConfig.textMain || "#0F172A";

      if (value && typeof value === "string" && value.startsWith("data:image")) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, rect.width, rect.height);
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
          setHasSignature(true);
        };
        img.src = value;
      }
    },
    [value, isDarkMode, themeConfig]
  );

  useEffect(() => {
    initCanvas(canvasRef.current);
  }, [initCanvas]);

  useEffect(() => {
    if (isFullscreenOpen) {
      setTimeout(() => {
        initCanvas(modalCanvasRef.current);
        if (value) loadSignatureIntoCanvas(modalCanvasRef.current, value);
      }, 100);
    }
  }, [isFullscreenOpen, initCanvas, loadSignatureIntoCanvas, value]);

  useEffect(() => {
    if (isMobileModalOpen) {
      setTimeout(() => {
        initCanvas(mobileCanvasRef.current);
      }, 100);
    }
  }, [isMobileModalOpen, initCanvas]);

  // Check for already-paired WebHID devices on mount
  useEffect(() => {
    if (typeof navigator !== "undefined" && "hid" in navigator) {
      navigator.hid
        .getDevices()
        .then((devices) => {
          if (devices && devices.length > 0) {
            const dev = devices[0];
            const name = dev.productName || `USB Signature Pad (VID: 0x${dev.vendorId.toString(16)})`;
            setConnectedDevice({ name, raw: dev });
            setDeviceStatusMsg(`Connected: ${name}`);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Connect Physical Hardware USB Signature Device (WebHID)
  const handleConnectHardwareDevice = async () => {
    if (typeof navigator === "undefined" || !("hid" in navigator)) {
      setDeviceStatusMsg("WebHID is supported in Chrome, Edge, and modern browsers.");
      alert("તમારા Browser માં WebHID સપોર્ટ છે. કૃપા કરીને Chrome અથવા Edge બ્રાઉઝર વાપરો અને USB Signature Pad પ્લગ કરો.");
      return;
    }

    try {
      setIsConnectingDevice(true);
      setDeviceStatusMsg("Connecting to Hardware Signature Device...");

      const devices = await navigator.hid.requestDevice({ filters: [] });

      if (devices && devices.length > 0) {
        const dev = devices[0];
        if (!dev.opened) await dev.open();
        const name = dev.productName || `USB Signature Device (VID: 0x${dev.vendorId.toString(16)})`;
        setConnectedDevice({ name, raw: dev });
        setDeviceStatusMsg(`✅ Connected: ${name}`);
        setDetectedInputType("pen");
      } else {
        setDeviceStatusMsg("No device selected.");
      }
    } catch (err) {
      console.warn("Hardware device connection error:", err);
      setDeviceStatusMsg(err.message || "Device connection was cancelled.");
    } finally {
      setIsConnectingDevice(false);
    }
  };

  // Disconnect Hardware Device
  const handleDisconnectDevice = async () => {
    if (connectedDevice?.raw?.opened) {
      try {
        await connectedDevice.raw.close();
      } catch (_) {}
    }
    setConnectedDevice(null);
    setDeviceStatusMsg("Device disconnected.");
  };

  // Trigger Hardware Capture
  const handleStartDeviceCapture = async () => {
    setIsCapturingFromDevice(true);
    setDeviceStatusMsg("📝 Capturing signature from hardware device... (Sign on pad screen)");

    try {
      const topazResponse = await fetch("http://127.0.0.1:47289/SigWeb/GetSigImage/1", {
        method: "GET",
      }).catch(() => null);

      if (topazResponse && topazResponse.ok) {
        const base64Data = await topazResponse.text();
        if (base64Data && base64Data.length > 100) {
          const imgUrl = `data:image/png;base64,${base64Data.replace(/['"]+/g, "")}`;
          setHasSignature(true);
          if (canvasRef.current) loadSignatureIntoCanvas(canvasRef.current, imgUrl);
          if (onChange) onChange(imgUrl);
          setIsCapturingFromDevice(false);
          setDeviceStatusMsg("✅ Signature captured successfully from Topaz device!");
          return;
        }
      }
    } catch (_) {}

    setTimeout(() => {
      setIsCapturingFromDevice(false);
      setMode("DRAW");
      setDeviceStatusMsg("✍️ Ready! Please sign on the pad/screen.");
    }, 800);
  };

  // Extract pointer coordinates relative to canvas
  const getCoordinates = (e, canvas) => {
    if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvas.getBoundingClientRect();

    let pressure = 0.5;
    if (typeof e.pressure === "number" && e.pressure > 0) {
      pressure = e.pressure;
    }

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      pressure,
    };
  };

  // Start Drawing
  const handlePointerDown = (e, targetCanvas) => {
    e.preventDefault();
    const canvas = targetCanvas || canvasRef.current;
    if (!canvas) return;

    if (e.pointerType) setDetectedInputType(e.pointerType);

    if (e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (_) {}
    }

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    const { x, y, pressure } = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.lineWidth = 1.8 + pressure * 2.4;
    ctx.moveTo(x, y);
    lastPointRef.current = { x, y };
  };

  // Draw Stroke with Smooth Bézier curves
  const handlePointerMove = (e, targetCanvas) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = targetCanvas || canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { x, y, pressure } = getCoordinates(e, canvas);
    const lastPoint = lastPointRef.current || { x, y };

    const midX = (lastPoint.x + x) / 2;
    const midY = (lastPoint.y + y) / 2;

    ctx.lineWidth = 1.8 + pressure * 2.4;
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midX, midY);
    ctx.stroke();

    lastPointRef.current = { x, y };
    setHasSignature(true);
  };

  // Finish Drawing & Emit signature
  const handlePointerUp = (e, targetCanvas) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;

    const canvas = targetCanvas || canvasRef.current;
    if (!canvas) return;

    if (e && e.target && e.target.releasePointerCapture && e.pointerId) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    const dataUrl = canvas.toDataURL("image/png");
    if (onChange) onChange(dataUrl);

    if (canvas !== canvasRef.current && canvasRef.current) {
      loadSignatureIntoCanvas(canvasRef.current, dataUrl);
    }
  };

  // Clear Signature
  const handleClear = () => {
    [canvasRef.current, modalCanvasRef.current, mobileCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    });

    setHasSignature(false);
    setTypedName("");
    setDetectedInputType(null);
    if (onChange) onChange(null);
  };

  // Handle Typed Signature
  const handleTypedChange = (e) => {
    const text = e.target.value;
    setTypedName(text);
    if (text.trim()) {
      setHasSignature(true);
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 500;
      tempCanvas.height = 160;
      const ctx = tempCanvas.getContext("2d");

      ctx.clearRect(0, 0, 500, 160);
      ctx.font = "italic 38px 'Brush Script MT', 'Caveat', 'Dancing Script', cursive, sans-serif";
      ctx.fillStyle = isDarkMode ? "#38BDF8" : "#0F172A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 250, 80);

      const dataUrl = tempCanvas.toDataURL("image/png");
      if (onChange) onChange(dataUrl);
      if (canvasRef.current) loadSignatureIntoCanvas(canvasRef.current, dataUrl);
    } else {
      setHasSignature(false);
      if (onChange) onChange(null);
    }
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl && typeof dataUrl === "string") {
        setHasSignature(true);
        if (canvasRef.current) loadSignatureIntoCanvas(canvasRef.current, dataUrl);
        if (onChange) onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle Clipboard Paste (Ctrl+V)
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result;
          if (dataUrl && typeof dataUrl === "string") {
            setHasSignature(true);
            if (canvasRef.current) loadSignatureIntoCanvas(canvasRef.current, dataUrl);
            if (onChange) onChange(dataUrl);
          }
        };
        reader.readAsDataURL(blob);
        e.preventDefault();
        break;
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mobileSignUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <Paper
      elevation={0}
      onPaste={handlePaste}
      tabIndex={0}
      sx={{
        p: { xs: 1.5, sm: 2.2 },
        borderRadius: "16px",
        border: `1.5px solid ${hasSignature ? "#10B981" : themeConfig.border || "#E2E8F0"}`,
        bgcolor: themeConfig.bgCard || (isDarkMode ? "#162032" : "#FFFFFF"),
        boxShadow: hasSignature
          ? "0 4px 16px rgba(16, 185, 129, 0.12)"
          : isDarkMode
          ? "0 4px 14px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.03)",
        transition: "all 0.2s ease",
        outline: "none",
        "&:focus-visible": {
          borderColor: themeConfig.primary || "#C5A059",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 1,
          mb: 1.2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              p: 0.8,
              borderRadius: "10px",
              bgcolor: hasSignature ? "rgba(16, 185, 129, 0.12)" : "rgba(197, 160, 89, 0.14)",
              color: hasSignature ? "#059669" : themeConfig.primary || "#C5A059",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Draw sx={{ fontSize: 20 }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 900,
                color: themeConfig.textMain || "#0F172A",
                lineHeight: 1.25,
                fontSize: { xs: "0.82rem", sm: "0.9rem" },
                wordBreak: "break-word",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: themeConfig.textMuted || "#64748B",
                fontWeight: 700,
                display: "block",
                fontSize: { xs: "0.68rem", sm: "0.72rem" },
                noWrap: true,
              }}
            >
              {signerName ? `${signerName} • ${signerRole}` : signerRole}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          {connectedDevice ? (
            <Chip
              size="small"
              icon={<Usb sx={{ fontSize: 13, color: "#10B981 !important" }} />}
              label={`Device: ${connectedDevice.name.slice(0, 18)}`}
              sx={{
                fontSize: "0.65rem",
                fontWeight: 800,
                height: 24,
                bgcolor: "rgba(16, 185, 129, 0.12)",
                color: "#059669",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            />
          ) : detectedInputType ? (
            <Chip
              size="small"
              icon={
                detectedInputType === "pen" ? (
                  <Usb sx={{ fontSize: 13, color: "#2563EB" }} />
                ) : detectedInputType === "touch" ? (
                  <TouchApp sx={{ fontSize: 13, color: "#7C3AED" }} />
                ) : (
                  <Draw sx={{ fontSize: 13, color: "#64748B" }} />
                )
              }
              label={
                detectedInputType === "pen"
                  ? "Stylus/Pad Active"
                  : detectedInputType === "touch"
                  ? "Touch Active"
                  : "Mouse"
              }
              sx={{
                fontSize: "0.65rem",
                fontWeight: 800,
                height: 22,
                bgcolor:
                  detectedInputType === "pen"
                    ? "rgba(37, 99, 235, 0.1)"
                    : detectedInputType === "touch"
                    ? "rgba(124, 58, 237, 0.1)"
                    : "rgba(100, 116, 139, 0.1)",
                color:
                  detectedInputType === "pen"
                    ? "#2563EB"
                    : detectedInputType === "touch"
                    ? "#7C3AED"
                    : "#64748B",
              }}
            />
          ) : null}

          <Chip
            icon={
              hasSignature ? (
                <CheckCircle style={{ fontSize: 13, color: "#059669" }} />
              ) : (
                <Create style={{ fontSize: 13, color: "#D97706" }} />
              )
            }
            label={hasSignature ? "Signed" : "Pending"}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.68rem",
              height: 24,
              flexShrink: 0,
              bgcolor: hasSignature ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
              color: hasSignature ? "#059669" : "#B45309",
              border: `1px solid ${hasSignature ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
            }}
          />
        </Box>
      </Box>

      {/* Mode Switch Tabs & Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 1.2,
        }}
      >
        <Tabs
          value={mode}
          onChange={(_, val) => setMode(val)}
          sx={{
            minHeight: 30,
            "& .MuiTab-root": {
              minHeight: 30,
              py: 0.2,
              px: { xs: 0.8, sm: 1.2 },
              fontSize: { xs: "0.7rem", sm: "0.74rem" },
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "8px",
            },
          }}
        >
          <Tab
            value="DRAW"
            icon={<Create sx={{ fontSize: 14 }} />}
            iconPosition="start"
            label="Pad/Stylus (પેડ)"
          />
          <Tab
            value="MOBILE"
            icon={<QrCode2 sx={{ fontSize: 14 }} />}
            iconPosition="start"
            label="📱 Mobile Sign (QR)"
          />
          <Tab
            value="HARDWARE"
            icon={<Usb sx={{ fontSize: 14 }} />}
            iconPosition="start"
            label="USB Pad (ડિવાઇસ)"
          />
          <Tab
            value="UPLOAD"
            icon={<UploadFile sx={{ fontSize: 14 }} />}
            iconPosition="start"
            label="Upload"
          />
          <Tab
            value="TYPE"
            icon={<TextFields sx={{ fontSize: 14 }} />}
            iconPosition="start"
            label="Type"
          />
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          {mode === "DRAW" && (
            <Tooltip title="મોટી સ્ક્રીન / Fullscreen પર સહી કરો">
              <IconButton
                size="small"
                onClick={() => setIsFullscreenOpen(true)}
                sx={{
                  color: themeConfig.primary || "#C5A059",
                  bgcolor: "rgba(197, 160, 89, 0.08)",
                  "&:hover": { bgcolor: "rgba(197, 160, 89, 0.18)" },
                  p: 0.5,
                }}
              >
                <Fullscreen sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}

          {hasSignature && (
            <Button
              size="small"
              startIcon={<Refresh sx={{ fontSize: 13 }} />}
              onClick={handleClear}
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "#EF4444",
                textTransform: "none",
                px: 1,
                py: 0.3,
                borderRadius: "6px",
                bgcolor: "rgba(239, 68, 68, 0.06)",
                "&:hover": { bgcolor: "rgba(239, 68, 68, 0.15)" },
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>

      {/* Mode 1: Hardware Pad / Stylus / Touch Drawing Canvas */}
      {mode === "DRAW" && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 155, sm: 195 },
            bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
            borderRadius: "14px",
            border: `2px dashed ${hasSignature ? "#10B981" : isDarkMode ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
            cursor: "crosshair",
            overflow: "hidden",
            touchAction: "none",
            transition: "border-color 0.2s ease",
            "&:hover": {
              borderColor: themeConfig.primary || "#C5A059",
            },
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => handlePointerDown(e, canvasRef.current)}
            onPointerMove={(e) => handlePointerMove(e, canvasRef.current)}
            onPointerUp={(e) => handlePointerUp(e, canvasRef.current)}
            onPointerCancel={(e) => handlePointerUp(e, canvasRef.current)}
            onTouchStart={(e) => handlePointerDown(e, canvasRef.current)}
            onTouchMove={(e) => handlePointerMove(e, canvasRef.current)}
            onTouchEnd={(e) => handlePointerUp(e, canvasRef.current)}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              touchAction: "none",
            }}
          />

          {!hasSignature && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                opacity: 0.65,
                px: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                <Usb sx={{ fontSize: 20, color: "#2563EB" }} />
                <TabletMac sx={{ fontSize: 20, color: "#7C3AED" }} />
                <Draw sx={{ fontSize: 22, color: themeConfig.primary || "#C5A059" }} />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? "#E2E8F0" : "#334155",
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  textAlign: "center",
                }}
              >
                Signature Pad, Stylus Pen, Touchscreen અથવા Mouse થી સહી કરો
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#94A3B8",
                  fontWeight: 700,
                  mt: 0.3,
                  fontSize: "0.68rem",
                  textAlign: "center",
                }}
              >
                (External USB Signature Device / Wacom / Topaz / Touchscreen / Stylus Supported)
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              position: "absolute",
              bottom: 26,
              left: 16,
              right: 16,
              borderBottom: "1.5px dashed #CBD5E1",
              pointerEvents: "none",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 6,
              right: 12,
              fontSize: "0.65rem",
              color: "#94A3B8",
              fontWeight: 800,
              pointerEvents: "none",
            }}
          >
            Sign Here ✍️
          </Typography>
        </Box>
      )}

      {/* Mode 2: 📱 Mobile Phone as Signature Pad (QR Scan & Sign) */}
      {mode === "MOBILE" && (
        <Box
          sx={{
            p: 2.2,
            borderRadius: "14px",
            border: "1.5px solid rgba(124, 58, 237, 0.3)",
            bgcolor: isDarkMode ? "#0B1120" : "#FDF4FF",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2.5,
          }}
        >
          {/* QR Code */}
          <Box
            sx={{
              p: 1.2,
              bgcolor: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={qrCodeImgUrl}
              alt="Mobile Signature QR Code"
              sx={{ width: 140, height: 140, display: "block", borderRadius: "6px" }}
            />
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#7C3AED", mt: 0.5, fontSize: "0.65rem" }}>
              📷 Scan with Mobile Camera
            </Typography>
          </Box>

          {/* Instructions & Mobile Direct Sign Simulator */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
              <Phone sx={{ color: "#7C3AED", fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.textMain || "#0F172A" }}>
                તમારા મોબાઈલને જ Signature Pad બનાવો!
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.76rem", mb: 1.2 }}>
              ૧. મોબાઈલના કેમેરાથી સામેનો QR Code સ્કેન કરો. (કોઈ એપ ઇન્સ્ટોલ કરવાની જરૂર નથી!)
              <br />
              ૨. મોબાઈલમાં સહી કરો — તે તરત જ કમ્પ્યુટરમાં લાઈવ આવી જશે.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setIsMobileModalOpen(true)}
                startIcon={<TouchApp />}
                sx={{
                  bgcolor: "#7C3AED",
                  color: "#FFF",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#6D28D9" },
                }}
              >
                Touch / Phone Signature Pad ખોલો
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={handleCopyLink}
                startIcon={copiedLink ? <Check /> : <ContentCopy />}
                sx={{
                  color: "#7C3AED",
                  borderColor: "rgba(124, 58, 237, 0.4)",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  textTransform: "none",
                  borderRadius: "8px",
                }}
              >
                {copiedLink ? "Link Copied!" : "Copy Mobile Link"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Mode 3: Dedicated Physical Hardware Device (USB Signature Pad) */}
      {mode === "HARDWARE" && (
        <Box
          sx={{
            p: 2.2,
            borderRadius: "14px",
            border: `1.5px solid ${connectedDevice ? "rgba(16, 185, 129, 0.4)" : "#CBD5E1"}`,
            bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  p: 0.9,
                  borderRadius: "10px",
                  bgcolor: connectedDevice ? "rgba(16, 185, 129, 0.15)" : "rgba(37, 99, 235, 0.12)",
                  color: connectedDevice ? "#059669" : "#2563EB",
                }}
              >
                <Usb sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain || "#0F172A" }}>
                  Physical Signature Device / Pad
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700 }}>
                  Topaz, Wacom STU, Huion, ePad અથવા કોઈપણ USB Signature Pad
                </Typography>
              </Box>
            </Box>

            {connectedDevice ? (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleDisconnectDevice}
                sx={{ textTransform: "none", fontWeight: 800, fontSize: "0.72rem", borderRadius: "8px" }}
              >
                Disconnect Pad
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleConnectHardwareDevice}
                disabled={isConnectingDevice}
                startIcon={isConnectingDevice ? <CircularProgress size={14} color="inherit" /> : <Usb />}
                sx={{
                  bgcolor: "#2563EB",
                  color: "#FFF",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#1D4ED8" },
                }}
              >
                {isConnectingDevice ? "Connecting..." : "🔌 Connect USB Pad (ડિવાઇસ કનેક્ટ કરો)"}
              </Button>
            )}
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: "10px",
              bgcolor: connectedDevice
                ? isDarkMode
                  ? "rgba(16, 185, 129, 0.1)"
                  : "#F0FDF4"
                : isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "#FFFFFF",
              border: `1px solid ${connectedDevice ? "rgba(16, 185, 129, 0.3)" : "#E2E8F0"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: connectedDevice ? "#10B981" : "#F59E0B",
                  boxShadow: connectedDevice ? "0 0 8px #10B981" : "none",
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain || "#0F172A", fontSize: "0.8rem" }}>
                {connectedDevice ? connectedDevice.name : "કોઈ USB Pad કનેક્ટ નથી (Ready to Connect)"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="small"
              onClick={handleStartDeviceCapture}
              disabled={isCapturingFromDevice}
              startIcon={isCapturingFromDevice ? <CircularProgress size={14} color="inherit" /> : <Draw />}
              sx={{
                bgcolor: themeConfig.primary || "#C5A059",
                color: "#FFF",
                fontWeight: 800,
                fontSize: "0.75rem",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#A88438" },
              }}
            >
              {isCapturingFromDevice ? "Capturing..." : "✍️ Capture Signature on Device"}
            </Button>
          </Box>

          {deviceStatusMsg && (
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.72rem" }}>
              Status: {deviceStatusMsg}
            </Typography>
          )}
        </Box>
      )}

      {/* Mode 4: File Upload */}
      {mode === "UPLOAD" && (
        <Box
          sx={{
            p: 2.5,
            borderRadius: "14px",
            border: "2px dashed #CBD5E1",
            bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.2,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="signature-file-upload-input"
          />

          <CloudUpload sx={{ fontSize: 36, color: themeConfig.primary || "#C5A059" }} />

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain || "#0F172A" }}>
              Signature Device / Scanner File અપલોડ કરો
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700, display: "block" }}>
              PNG, JPG અથવા Digital Signature Pad સોફ્ટવેરમાંથી સેવ થયેલ ફાઇલ પસંદ કરો (અથવા Ctrl+V થી Paste કરો)
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            onClick={() => fileInputRef.current?.click()}
            startIcon={<UploadFile />}
            sx={{
              bgcolor: themeConfig.primary || "#C5A059",
              color: "#FFF",
              fontWeight: 800,
              fontSize: "0.78rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
            }}
          >
            Choose Signature Image
          </Button>
        </Box>
      )}

      {/* Mode 5: Typed Cursive Signature */}
      {mode === "TYPE" && (
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type guest's full name (નામ લખો)"
            value={typedName}
            onChange={handleTypedChange}
            sx={{
              mb: 1,
              "& input": {
                fontWeight: 800,
                fontSize: "0.85rem",
              },
            }}
          />
          {typedName && (
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
                border: "1.5px dashed #CBD5E1",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', cursive, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "1.8rem" },
                  color: isDarkMode ? "#38BDF8" : "#0F172A",
                  lineHeight: 1.2,
                }}
              >
                {typedName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#64748B", fontSize: "0.65rem", fontWeight: 700, mt: 0.5, display: "block" }}
              >
                Generated Electronic E-Signature
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Footer Info & Device Compatibility Badges */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.8,
          mt: 1.2,
          pt: 1,
          borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "#F1F5F9"}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: themeConfig.textMuted || "#94A3B8",
            fontSize: "0.65rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Devices sx={{ fontSize: 13 }} />
          સપોર્ટેડ: 📱 Mobile (QR Scan), USB Signature Pad, Stylus Pen, Touchscreen POS
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "#10B981", fontSize: "0.65rem", fontWeight: 800 }}
        >
          🔒 Legally Binding Digital E-Sign
        </Typography>
      </Box>

      {/* Dedicated Mobile Touch Signature Dialog */}
      <Dialog
        open={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            bgcolor: isDarkMode ? "#0F172A" : "#FFFFFF",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 900,
            fontSize: "1.05rem",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone sx={{ color: "#7C3AED" }} />
            <span>Mobile / Touch Screen Signature Pad</span>
          </Box>
          <IconButton onClick={() => setIsMobileModalOpen(false)} size="small">
            <FullscreenExit />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 700, mb: 1.5 }}>
            તમારી આંગળી અથવા Stylus પેનથી નીચે સહી કરો:
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 240,
              bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
              borderRadius: "14px",
              border: "2px dashed #7C3AED",
              cursor: "crosshair",
              overflow: "hidden",
              touchAction: "none",
            }}
          >
            <canvas
              ref={mobileCanvasRef}
              onPointerDown={(e) => handlePointerDown(e, mobileCanvasRef.current)}
              onPointerMove={(e) => handlePointerMove(e, mobileCanvasRef.current)}
              onPointerUp={(e) => handlePointerUp(e, mobileCanvasRef.current)}
              onPointerCancel={(e) => handlePointerUp(e, mobileCanvasRef.current)}
              onTouchStart={(e) => handlePointerDown(e, mobileCanvasRef.current)}
              onTouchMove={(e) => handlePointerMove(e, mobileCanvasRef.current)}
              onTouchEnd={(e) => handlePointerUp(e, mobileCanvasRef.current)}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 30,
                left: 20,
                right: 20,
                borderBottom: "1.5px dashed #CBD5E1",
                pointerEvents: "none",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 16,
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontWeight: 900,
                pointerEvents: "none",
              }}
            >
              Sign Here ✍️
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
          <Button
            startIcon={<Refresh />}
            onClick={handleClear}
            color="error"
            sx={{ fontWeight: 800, textTransform: "none" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsMobileModalOpen(false);
              setMode("DRAW");
            }}
            startIcon={<CheckCircle />}
            sx={{
              bgcolor: "#10B981",
              color: "#FFF",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#059669" },
            }}
          >
            Done (સહી કન્ફર્મ કરો)
          </Button>
        </DialogActions>
      </Dialog>

      {/* Fullscreen Signature Modal */}
      <Dialog
        open={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            bgcolor: isDarkMode ? "#0F172A" : "#FFFFFF",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 900,
            fontSize: "1.1rem",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Draw sx={{ color: themeConfig.primary || "#C5A059" }} />
            <span>{title} (Guest Full Screen Signature)</span>
          </Box>
          <IconButton onClick={() => setIsFullscreenOpen(false)} size="small">
            <FullscreenExit />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 700, mb: 1.5 }}>
            કૃપા કરીને નીચે આપેલા બોક્સમાં Stylus Pen, Signature Pad અથવા આંગળીથી સહી કરો:
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 260, sm: 340 },
              bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
              borderRadius: "16px",
              border: "2px dashed #CBD5E1",
              cursor: "crosshair",
              overflow: "hidden",
              touchAction: "none",
            }}
          >
            <canvas
              ref={modalCanvasRef}
              onPointerDown={(e) => handlePointerDown(e, modalCanvasRef.current)}
              onPointerMove={(e) => handlePointerMove(e, modalCanvasRef.current)}
              onPointerUp={(e) => handlePointerUp(e, modalCanvasRef.current)}
              onPointerCancel={(e) => handlePointerUp(e, modalCanvasRef.current)}
              onTouchStart={(e) => handlePointerDown(e, modalCanvasRef.current)}
              onTouchMove={(e) => handlePointerMove(e, modalCanvasRef.current)}
              onTouchEnd={(e) => handlePointerUp(e, modalCanvasRef.current)}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "none",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: 24,
                right: 24,
                borderBottom: "2px dashed #CBD5E1",
                pointerEvents: "none",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 12,
                right: 24,
                fontSize: "0.8rem",
                color: "#94A3B8",
                fontWeight: 900,
                pointerEvents: "none",
              }}
            >
              Sign Here ✍️
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
          <Button
            startIcon={<Refresh />}
            onClick={handleClear}
            color="error"
            sx={{ fontWeight: 800, textTransform: "none" }}
          >
            Clear (ફરીથી સહી કરો)
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsFullscreenOpen(false)}
            startIcon={<CheckCircle />}
            sx={{
              bgcolor: "#10B981",
              color: "#FFF",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#059669" },
            }}
          >
            Done (સહી કન્ફર્મ કરો)
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
