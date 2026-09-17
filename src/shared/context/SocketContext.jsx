"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "@/config/api";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  lastEvent: null,
});

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    let user = null;
    try {
      const stored = localStorage.getItem("user");
      if (stored) user = JSON.parse(stored);
    } catch {}

    const socketUrl = API_BASE_URL || "http://localhost:5000";

    const socket = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);

      // Join tenant hotel room or super admin room
      const hotelId = user?.hotel?._id || user?.hotel || user?.hotelId;
      if (user?.role === "SUPER_ADMIN") {
        socket.emit("join_super_admin");
      } else if (hotelId) {
        socket.emit("join_hotel", { hotelId, token });
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Real-Time Event Dispatchers to Window
    const realTimeEvents = [
      "ROOM_UPDATED",
      "BOOKING_CREATED",
      "BOOKING_UPDATED",
      "GUEST_CHECKED_OUT",
      "PAYMENT_RECORDED",
      "GUEST_UPDATED",
      "DASHBOARD_SYNC",
      "HANDOVER_SETTLED",
      "HOTEL_STATUS_UPDATED",
    ];

    realTimeEvents.forEach((evtName) => {
      socket.on(evtName, (payload) => {
        setLastEvent({ name: evtName, payload, timestamp: Date.now() });
        // Dispatch CustomEvent on window for seamless subscription
        window.dispatchEvent(
          new CustomEvent(`socket:${evtName}`, {
            detail: payload,
          })
        );
        window.dispatchEvent(
          new CustomEvent("socket:any", {
            detail: { name: evtName, payload },
          })
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected, lastEvent }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(eventSubscriptions = [], callback) {
  const context = useContext(SocketContext);

  useEffect(() => {
    if (!callback || eventSubscriptions.length === 0 || typeof window === "undefined") return;

    const handlers = eventSubscriptions.map((evtName) => {
      const handler = (e) => callback(e.detail, evtName);
      window.addEventListener(`socket:${evtName}`, handler);
      return { evtName, handler };
    });

    return () => {
      handlers.forEach(({ evtName, handler }) => {
        window.removeEventListener(`socket:${evtName}`, handler);
      });
    };
  }, [eventSubscriptions, callback]);

  return context;
}
