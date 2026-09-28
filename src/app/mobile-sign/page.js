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
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Refresh,
  Hotel,
  Save,
  QrCode2,
  Close,
} from "@/shared/icons";
import { QRCodeSVG } from "qrcode.react";
import { io } from "socket.io-client";
import SignaturePad from "@/shared/components/SignaturePad";

function MobileSignContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const guestName = searchParams.get("name") || "Guest";
  const guestId = searchParams.get("guestId") || "";
  const bookingId = searchParams.get("bookingId") || "";

  const sigPadRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [networkHost, setNetworkHost] = useState("http://192.168.1.101:3001");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNetworkHost(window.location.origin);
    }
  }, []);

  const qrUrl = `${networkHost}/mobile-sign?session=${sessionId}&name=${encodeURIComponent(guestName)}`;

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
    }
    setHasDrawn(false);
  };

  const handleSubmit = async () => {
    if (!sigPadRef.current || !hasDrawn || !sessionId) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const signatureDataUrl = sigPadRef.current.toDataURL("image/png");
      if (!signatureDataUrl) {
        setErrorMsg("Please provide a signature first");
        setIsSubmitting(false);
        return;
      }

      // 1. Post to API route
      const response = await fetch("/api/signature-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          signature: signatureDataUrl,
          guestName,
          guestId,
          bookingId,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSavedSignature(signatureDataUrl);
        setIsSuccess(true);

        // 2. Also broadcast over Socket.io if available for instant zero-latency reception sync
        try {
          const socketBase = window.location.hostname === "localhost" 
            ? "http://localhost:5000" 
            : `http://${window.location.hostname}:5000`;
          const socket = io(socketBase, { transports: ["websocket", "polling"], timeout: 3000 });
          socket.emit("submit_signature", {
            sessionId,
            signature: signatureDataUrl,
            guestName,
            guestId,
            bookingId,
          });
          setTimeout(() => socket.disconnect(), 1500);
        } catch (sockErr) {
          // Socket emit is non-blocking enhancement
        }
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
      <Container maxWidth="xs" sx={{ py: 5, px: 2, textAlign: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 3.5,
            borderRadius: "24px",
            bgcolor: "#F0FDF4",
            border: "2px solid #86EFAC",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.15)",
          }}
        >
          <CheckCircle sx={{ fontSize: 56, color: "#10B981", mb: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#065F46", mb: 0.8 }}>
            Signature Saved Successfully!
          </Typography>
          <Typography variant="body2" sx={{ color: "#047857", fontWeight: 700, mb: 2.5 }}>
            ✓ તમારી સહી સફળતાપૂર્વક સિસ્ટમમાં સેવ થઈ ગઈ છે.
          </Typography>

          {savedSignature && (
            <Box
              sx={{
                p: 1.5,
                mb: 2.5,
                bgcolor: "#FFFFFF",
                borderRadius: "14px",
                border: "1.5px solid #86EFAC",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              }}
            >
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 800, display: "block", mb: 1 }}>
                Saved Signature Preview:
              </Typography>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={savedSignature}
                alt="Saved Signature"
                style={{ width: "100%", maxHeight: 110, objectFit: "contain" }}
              />
            </Box>
          )}

          <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
            Session: {sessionId.slice(0, 16)}...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        height: { xs: "100dvh", sm: "auto" },
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F1F5F9",
        p: { xs: 1, sm: 3 },
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: { xs: "100%", sm: "auto" },
          maxHeight: { xs: "100%", sm: "none" },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: "16px", sm: "24px" },
            border: "1.5px solid #E2E8F0",
            bgcolor: "#FFFFFF",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
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
                  Guest Digital Signature
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700 }}>
                  Guest: {guestName}
                </Typography>
              </Box>
            </Box>

            <Button
              size="small"
              variant="outlined"
              startIcon={<QrCode2 sx={{ fontSize: 16 }} />}
              onClick={() => setShowQrModal(true)}
              sx={{
                fontWeight: 800,
                fontSize: "0.72rem",
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#CBD5E1",
                color: "#475569",
              }}
            >
              QR Code
            </Button>
          </Box>

          {/* QR Code Modal */}
          <Dialog
            open={showQrModal}
            onClose={() => setShowQrModal(false)}
            PaperProps={{ sx: { borderRadius: "20px", p: 2, textAlign: "center" } }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#0F172A" }}>
                📱 Mobile Signature QR Code
              </Typography>
              <IconButton size="small" onClick={() => setShowQrModal(false)}>
                <Close sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
            <DialogContent sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "2px solid #E2E8F0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  mb: 1.5,
                }}
              >
                <QRCodeSVG value={qrUrl} size={180} level="M" fgColor="#0F172A" />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "#334155", mb: 0.5 }}>
                તમારા મોબાઈલ કેમેરાથી આ QR કોડ સ્કેન કરો
              </Typography>
              <Typography variant="caption" sx={{ color: "#2563EB", fontWeight: 800, wordBreak: "break-all", mb: 0.5 }}>
                {qrUrl}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                (Scan with phone connected to the same Wi-Fi)
              </Typography>
            </DialogContent>
          </Dialog>

          <Typography variant="body2" sx={{ color: "#475569", fontWeight: 700, mb: 1, fontSize: "0.85rem" }}>
            કૃપા કરીને નીચે આપેલા બોક્સમાં તમારી આંગળીથી સહી કરો:
          </Typography>

          {/* Pure PointerEvents Native Signature Pad Component (Stretches to fill available height) */}
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: 260, sm: 320 },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              mb: 1.5,
              position: "relative",
            }}
          >
            <SignaturePad
              ref={sigPadRef}
              height="100%"
              color="#0F172A"
              placeholder="Sign here using finger (આંગળીથી સહી કરો)"
              onSignChange={(signed) => setHasDrawn(signed)}
            />
          </Box>

          {errorMsg && (
            <Typography variant="caption" sx={{ color: "#EF4444", fontWeight: 800, display: "block", mb: 1 }}>
              ⚠️ {errorMsg}
            </Typography>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, pt: 0.5 }}>
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
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <Save />}
              sx={{
                bgcolor: hasDrawn ? "#10B981" : "#CBD5E1",
                color: "#FFF",
                fontWeight: 900,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                textTransform: "none",
                borderRadius: "12px",
                px: { xs: 2, sm: 3 },
                py: 1,
                boxShadow: hasDrawn ? "0 4px 14px rgba(16, 185, 129, 0.3)" : "none",
                "&:hover": { bgcolor: hasDrawn ? "#059669" : "#CBD5E1" },
              }}
            >
              {isSubmitting ? "Saving Signature..." : "Save Signature (સહી સેવ કરો)"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
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
