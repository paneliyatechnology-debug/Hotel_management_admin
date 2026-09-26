import { NextResponse } from "next/server";

// In-memory signature sessions store for real-time mobile sync
// Keys expire after 30 minutes
const signatureSessions = new Map();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const session = signatureSessions.get(sessionId);
  if (!session) {
    return NextResponse.json({ status: "PENDING", signature: null });
  }

  return NextResponse.json({
    status: "SIGNED",
    signature: session.signature,
    timestamp: session.timestamp,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId, signature } = body;

    if (!sessionId || !signature) {
      return NextResponse.json({ error: "Session ID and signature data required" }, { status: 400 });
    }

    signatureSessions.set(sessionId, {
      signature,
      timestamp: Date.now(),
    });

    // Cleanup old sessions (> 30 mins)
    const now = Date.now();
    for (const [id, data] of signatureSessions.entries()) {
      if (now - data.timestamp > 30 * 60 * 1000) {
        signatureSessions.delete(id);
      }
    }

    return NextResponse.json({ success: true, message: "Signature synced successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to sync signature" }, { status: 500 });
  }
}
