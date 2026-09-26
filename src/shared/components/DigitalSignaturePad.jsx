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
} from "@mui/material";
import {
  Edit,
  Refresh,
  CheckCircle,
  Create,
  TextFields,
  Delete,
  Fingerprint,
  Draw,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";

/**
 * Modern Interactive HTML5 Digital E-Signature Pad
 * Supports Touch & Mouse Drawing + Typed Cursive Signature
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(Boolean(value));
  const [mode, setMode] = useState("DRAW"); // 'DRAW' | 'TYPE'
  const [typedName, setTypedName] = useState(signerName || "");

  // Initialize canvas resolution & crisp drawing
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = isDarkMode ? "#38BDF8" : (themeConfig.textMain || "#0F172A");

    if (value && typeof value === "string" && value.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasSignature(true);
      };
      img.src = value;
    }
  }, [value]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Get mouse/touch coordinate relative to canvas
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    if (onChange) {
      onChange(dataUrl);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
    }
    setHasSignature(false);
    setTypedName("");
    if (onChange) {
      onChange(null);
    }
  };

  const handleTypedChange = (e) => {
    const text = e.target.value;
    setTypedName(text);
    if (text.trim()) {
      setHasSignature(true);
      // Generate signature image from cursive text
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 140;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 400, 140);
      ctx.font = "italic 36px 'Brush Script MT', 'Caveat', 'Dancing Script', cursive, sans-serif";
      ctx.fillStyle = "#0F172A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 200, 70);

      const dataUrl = canvas.toDataURL("image/png");
      if (onChange) onChange(dataUrl);
    } else {
      setHasSignature(false);
      if (onChange) onChange(null);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2.2 },
        borderRadius: "16px",
        border: `1.5px solid ${hasSignature ? "#10B981" : themeConfig.border || "#E2E8F0"}`,
        bgcolor: themeConfig.bgCard || (isDarkMode ? "#162032" : "#FFFFFF"),
        boxShadow: hasSignature
          ? "0 4px 14px rgba(16, 185, 129, 0.12)"
          : (isDarkMode ? "0 4px 14px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.03)"),
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 1,
          mb: 1.5,
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

        <Chip
          icon={hasSignature ? <CheckCircle style={{ fontSize: 13, color: "#059669" }} /> : <Create style={{ fontSize: 13, color: "#D97706" }} />}
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

      {/* Mode Switch: Draw vs Type */}
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
              px: { xs: 1.2, sm: 1.8 },
              fontSize: { xs: "0.72rem", sm: "0.75rem" },
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "8px",
            },
          }}
        >
          <Tab value="DRAW" icon={<Create sx={{ fontSize: 14 }} />} iconPosition="start" label="Draw (સહી કરો)" />
          <Tab value="TYPE" icon={<TextFields sx={{ fontSize: 14 }} />} iconPosition="start" label="Type (ટાઇપ કરો)" />
        </Tabs>

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

      {/* Drawing Canvas Area */}
      {mode === "DRAW" ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 150, sm: 190 },
            bgcolor: isDarkMode ? "#0B1120" : "#F8FAFC",
            borderRadius: "14px",
            border: `2px dashed ${isDarkMode ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
            cursor: "crosshair",
            overflow: "hidden",
            touchAction: "none", // Prevent page scrolling during touch signature
            transition: "border-color 0.2s ease",
            "&:hover": {
              borderColor: themeConfig.primary || "#C5A059",
            },
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />

          {/* Guide Line & Placeholder */}
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
                opacity: 0.55,
                px: 1.5,
              }}
            >
              <Draw sx={{ fontSize: 26, color: "#64748B", mb: 0.8 }} />
              <Typography variant="body2" sx={{ color: "#475569", fontWeight: 800, fontSize: { xs: "0.75rem", sm: "0.85rem" }, textAlign: "center" }}>
                Touchscreen અથવા Mouse થી અહીં સહી કરો
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, mt: 0.2, fontSize: "0.68rem" }}>
                (Sign inside this box)
              </Typography>
            </Box>
          )}

          {/* Bottom baseline watermark */}
          <Box
            sx={{
              position: "absolute",
              bottom: 28,
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
            Sign-off (X)
          </Typography>
        </Box>
      ) : (
        /* Typed Name in Cursive Style */
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type your full name"
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
                bgcolor: "#F8FAFC",
                border: "1.5px dashed #CBD5E1",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', cursive, sans-serif",
                  fontSize: { xs: "1.5rem", sm: "1.8rem" },
                  color: "#0F172A",
                  lineHeight: 1.2,
                }}
              >
                {typedName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.65rem", fontWeight: 700, mt: 0.5, display: "block" }}>
                Generated Electronic E-Signature
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Footer info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
        <Typography variant="caption" sx={{ color: themeConfig.textMuted || "#94A3B8", fontSize: "0.65rem", fontWeight: 700 }}>
          🔒 Legally binding digital acknowledgement
        </Typography>
      </Box>
    </Paper>
  );
}
