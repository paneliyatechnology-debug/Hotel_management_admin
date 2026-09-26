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

function MobileSignContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const guestName = searchParams.get("name") || "Guest";

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Setup Canvas Dimensions with Hi-DPI Scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 3.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0F172A";
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  // Native Touch & Pointer Event Listeners for 100% Mobile Reliability
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (e) => {
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

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const ctx = canvas.getContext("2d");
      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      lastPointRef.current = pos;
    };

    const handleMove = (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();

      const ctx = canvas.getContext("2d");
      const pos = getPos(e);
      const last = lastPointRef.current || pos;

      const midX = (last.x + pos.x) / 2;
      const midY = (last.y + pos.y) / 2;

      ctx.quadraticCurveTo(last.x, last.y, midX, midY);
      ctx.stroke();

      lastPointRef.current = pos;
      setHasDrawn(true);
    };

    const handleEnd = (e) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      lastPointRef.current = null;
    };

    // Attach passive: false listeners so mobile gestures don't scroll
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleEnd, { passive: false });

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);

      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
    };
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
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
      <Container maxWidth="xs" sx={{ py: 6, textAlign: "center" }}>
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
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 3 } }}>
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
          કૃપા કરીને નીચે આપેલા બોક્સમાં તમારી આંગળીથી સહી કરો:
        </Typography>

        {/* Touch Drawing Container */}
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 260, sm: 300 },
            bgcolor: "#F8FAFC",
            borderRadius: "16px",
            border: `2px dashed ${hasDrawn ? "#10B981" : "#CBD5E1"}`,
            cursor: "crosshair",
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            mb: 2,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              touchAction: "none",
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
                opacity: 0.5,
              }}
            >
              <TouchApp sx={{ fontSize: 36, color: "#94A3B8", mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 800 }}>
                Sign with Finger Here (આંગળીથી સહી કરો)
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
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <CircularProgress />
        </Box>
      }
    >
      <MobileSignContent />
    </Suspense>
  );
}
