import { NextResponse } from "next/server";
import os from "os";

// In-memory signature sessions store for real-time mobile sync
// Keys expire after 30 minutes
const signatureSessions = new Map();

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      // Find non-internal IPv4 address
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "192.168.1.101";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const sessionId = searchParams.get("session");

  // If asking for network info for QR code host resolution
  if (action === "network-info") {
    const localIp = getLocalIpAddress();
    return NextResponse.json({
      localIp: localIp || "192.168.1.101",
      port: process.env.PORT || 3001,
      fullUrl: `http://${localIp || "192.168.1.101"}:${process.env.PORT || 3001}`,
    });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const session = signatureSessions.get(sessionId);
  if (!session) {
    return NextResponse.json({ status: "PENDING", signature: null });
  }

  return NextResponse.json({
    status: session.signature ? "SIGNED" : "PENDING",
    signature: session.signature || null,
    timestamp: session.timestamp,
    guestName: session.guestName || "",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId, signature, guestName } = body;

    if (!sessionId || !signature) {
      return NextResponse.json({ error: "Session ID and signature data required" }, { status: 400 });
    }

    signatureSessions.set(sessionId, {
      signature,
      guestName: guestName || "Guest",
      timestamp: Date.now(),
    });

    // Cleanup old sessions (> 30 mins)
    const now = Date.now();
    for (const [id, data] of signatureSessions.entries()) {
      if (now - (data.createdAt || data.timestamp) > 30 * 60 * 1000) {
        signatureSessions.delete(id);
      }
    }

    return NextResponse.json({ success: true, message: "Signature synced successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to sync signature" }, { status: 500 });
  }
}
