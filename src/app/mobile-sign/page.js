"use client";

import { useRef, useState, useEffect, Suspense } from "react";
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
} from "@/shared/icons";
import { AppThemeProvider } from "@/shared/context/ThemeContext";

function MobileSignContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const guestName = searchParams.get("name") || "Guest";

  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Array of SVG path strings: e.g. ["M 10 20 L 15 25 L 20 30", ...]
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const isDrawingRef = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculate SVG viewBox relative coordinates
  const getCoords = (e) => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    // Scale to fixed 600x300 SVG viewBox
    const scaleX = 600 / (rect.width || 1);
    const scaleY = 300 / (rect.height || 1);

    return {
      x: Math.round(relX * scaleX * 10) / 10,
      y: Math.round(relY * scaleY * 10) / 10,
    };
  };

  // Start Drawing (Touch or Mouse)
  const handleStart = (e) => {
    if (e.cancelable) e.preventDefault();
    isDrawingRef.current = true;
    const { x, y } = getCoords(e);
    const newPath = `M ${x} ${y} L ${x + 0.1} ${y + 0.1}`;
    setCurrentPath(newPath);
  };

  // Move Drawing
  const handleMove = (e) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoords(e);
    setCurrentPath((prev) => (prev ? `${prev} L ${x} ${y}` : `M ${x} ${y}`));
  };

  // End Drawing
  const handleEnd = (e) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable) e.preventDefault();
    isDrawingRef.current = false;
    if (currentPath) {
      setPaths((prev) => [...prev, currentPath]);
      setCurrentPath("");
    }
  };

  const handleClear = () => {
    setPaths([]);
    setCurrentPath("");
    isDrawingRef.current = false;
  };

  // Convert SVG Paths directly to high-res PNG Data URL
  const handleSubmit = async () => {
    const allPaths = currentPath ? [...paths, currentPath] : paths;
    if (allPaths.length === 0 || !sessionId) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Create off-screen canvas to render signature image
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");

      // Clean white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 600, 300);

      // Draw all SVG paths onto canvas
      ctx.strokeStyle = "#090D16";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      allPaths.forEach((pathStr) => {
        try {
          const path2D = new Path2D(pathStr);
          ctx.stroke(path2D);
        } catch (_) {}
      });

      const signatureDataUrl = canvas.toDataURL("image/png");

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

  const hasAnyDrawn = paths.length > 0 || Boolean(currentPath);

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

        {/* Infallible SVG Vector Signature Canvas Box */}
        <Box
          ref={containerRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onTouchCancel={handleEnd}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 260, sm: 300 },
            borderRadius: "16px",
            border: `2.5px dashed ${hasAnyDrawn ? "#10B981" : "#94A3B8"}`,
            bgcolor: "#FFFFFF",
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            cursor: "crosshair",
            mb: 2,
          }}
        >
          {/* SVG Vector Renderer (100% Guaranteed on all phones) */}
          <svg
            ref={svgRef}
            viewBox="0 0 600 300"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              backgroundColor: "#FFFFFF",
              touchAction: "none",
              pointerEvents: "none",
            }}
          >
            {/* Committed Strokes */}
            {paths.map((p, idx) => (
              <path
                key={idx}
                d={p}
                stroke="#090D16"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Current Active Stroke */}
            {currentPath && (
              <path
                d={currentPath}
                stroke="#090D16"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>

          {/* Placeholder helper */}
          {!hasAnyDrawn && (
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
              <TouchApp sx={{ fontSize: 42, color: "#64748B", mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: "#334155", fontWeight: 800 }}>
                અહીં આંગળીથી સહી કરો (Sign with Finger)
              </Typography>
            </Box>
          )}

          {/* Baseline watermark */}
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
            disabled={!hasAnyDrawn || isSubmitting}
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
            disabled={!hasAnyDrawn || isSubmitting}
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
