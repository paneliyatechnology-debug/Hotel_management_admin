"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import {
  CheckCircle,
  Refresh,
  Hotel,
  TouchApp,
  Draw,
} from "@/shared/icons";
import { AppThemeProvider } from "@/shared/context/ThemeContext";

function MobileSignContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const guestName = searchParams.get("name") || "Guest";

  const canvasRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Initialize Canvas with crisp background and fixed buffer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fixed high-resolution canvas buffer: 800 x 400
    canvas.width = 800;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 800, 400);

    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#090D16";
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Accurate coordinate calculation that scales screen touch pixels to 800x400 canvas buffer
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Start Drawing
  const handleStart = (e) => {
    if (e.cancelable) e.preventDefault();
    isDrawingRef.current = true;
    const pos = getCanvasCoords(e);
    lastPosRef.current = pos;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#090D16";

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#090D16";
    ctx.fill();

    setHasDrawn(true);
  };

  // Move / Draw Line
  const handleMove = (e) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const currentPos = getCanvasCoords(e);
    const lastPos = lastPosRef.current;

    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#090D16";

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosRef.current = currentPos;
    setHasDrawn(true);
  };

  // End Drawing
  const handleEnd = (e) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable) e.preventDefault();
    isDrawingRef.current = false;
  };

  // Native touch event listeners with passive: false for 100% Android/iOS compatibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
    };
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawn(false);
  };

  const handleSubmit = async () => {
    if (!hasDrawn || !canvasRef.current || !sessionId) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const signatureDataUrl = canvasRef.current.toDataURL("image/png");
      const response = await fetch("/api/signature-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          signature: signatureDataUrl,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to submit signature");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Container maxWidth="xs" sx={{ py: 6, px: 2, textAlign: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            bgcolor: "#F0FDF4",
            border: "2px solid #86EFAC",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.15)",
          }}
        >
          <CheckCircle sx={{ fontSize: 64, color: "#10B981", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#065F46", mb: 1 }}>
            Signature Submitted!
          </Typography>
          <Typography variant="body2" sx={{ color: "#047857", fontWeight: 700, mb: 3 }}>
            તમારી સહી સફળતાપૂર્વક રિસેપ્શન કમ્પ્યુટર પર મોકલી દેવામાં આવી છે. આ પેજ બંધ કરી શકો છો.
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
            Session: {sessionId.slice(0, 14)}...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 2 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          border: "1.5px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "12px",
              bgcolor: "rgba(197, 160, 89, 0.15)",
              color: "#C5A059",
              display: "flex",
            }}
          >
            <Hotel sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#0F172A", lineHeight: 1.2 }}>
              Hotel Check-In Signature
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700 }}>
              Guest: {guestName}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#475569", fontWeight: 700, mb: 1.5, fontSize: "0.85rem" }}>
          કૃપા કરીને નીચે આપેલા સફેદ બોક્સમાં તમારી આંગળીથી સહી કરો:
        </Typography>

        {/* Touch Drawing Canvas Box */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 260, sm: 300 },
            borderRadius: "16px",
            border: `2px dashed ${hasDrawn ? "#10B981" : "#94A3B8"}`,
            bgcolor: "#FFFFFF",
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            mb: 2,
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              touchAction: "none",
              cursor: "crosshair",
              backgroundColor: "#FFFFFF",
            }}
          />

          {!hasDrawn && (
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
                opacity: 0.45,
              }}
            >
              <TouchApp sx={{ fontSize: 40, color: "#64748B", mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: "#334155", fontWeight: 800 }}>
                અહીં આંગળીથી સહી કરો (Sign Here)
              </Typography>
            </Box>
          )}

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
              fontWeight: 800,
              pointerEvents: "none",
            }}
          >
            Sign Here ✍️
          </Typography>
        </Box>

        {errorMsg && (
          <Typography variant="caption" sx={{ color: "#EF4444", fontWeight: 800, display: "block", mb: 1.5 }}>
            ⚠️ {errorMsg}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5 }}>
          <Button
            startIcon={<Refresh />}
            onClick={handleClear}
            color="error"
            disabled={!hasDrawn || isSubmitting}
            sx={{
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "10px",
              px: 2,
            }}
          >
            Clear (ફરીથી)
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!hasDrawn || isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <CheckCircle />}
            sx={{
              bgcolor: "#10B981",
              color: "#FFF",
              fontWeight: 900,
              fontSize: "0.9rem",
              textTransform: "none",
              borderRadius: "12px",
              px: 3.5,
              py: 1,
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
              "&:hover": { bgcolor: "#059669" },
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Signature (જમા કરો)"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default function MobileSignPage() {
  return (
    <AppThemeProvider>
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <CircularProgress />
          </Box>
        }
      >
        <MobileSignContent />
      </Suspense>
    </AppThemeProvider>
  );
}
