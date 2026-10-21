"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  lastEvent: null,
  onlineUserIds: [],
  onlineHotelIds: [],
  isUserOnline: () => false,
  isHotelOnline: () => false,
  joinRoom: () => {},
});

// This app is the super-admin portal. Socket.IO talks to the live API, not the Vercel site.
const SOCKET_URL = "https://hotelmanagementbackendnew-production.up.railway.app";
const LOCAL_SOCKET_URL = "http://localhost:5000";

export const SOCKET_ENABLED = true;

const SUPER_ADMIN_EVENTS = [
  "HOTEL_REGISTERED",
  "NEW_TRIAL_REQUEST",
  "TRIAL_REQUEST_APPROVED",
  "TRIAL_REQUEST_REJECTED",
  "HOTEL_STATUS_UPDATED",
  "HOTEL_UPDATED",
  "SUBSCRIPTION_UPDATED",
  "DASHBOARD_SYNC",
  "HOTEL_ONLINE",
  "HOTEL_OFFLINE",
  "USER_ONLINE",
  "USER_OFFLINE",
  "PRESENCE_SYNC",
  "ONLINE_PRESENCE_STATE",
];

const HOTEL_ADMIN_EVENTS = [
  "ROOM_UPDATED",
  "room:category_counts",
  "BOOKING_CREATED",
  "BOOKING_UPDATED",
  "GUEST_CHECKED_OUT",
  "PAYMENT_RECORDED",
  "GUEST_UPDATED",
  "DASHBOARD_SYNC",
  "HOTEL_STATUS_UPDATED",
  "HOTEL_UPDATED",
  "SUBSCRIPTION_UPDATED",
  "STAFF_STATUS_UPDATED",
  "USER_UPDATED",
];

function readSession() {
  if (typeof window === "undefined") return { token: "", user: null, hotelId: "", role: "SUPER_ADMIN" };
  const token = localStorage.getItem("token") || "";
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }
  const hotelId = user?.hotel?._id || user?.hotel?.id || user?.hotel || user?.hotelId || user?.hotel_id || "";
  const role = String(user?.role || "SUPER_ADMIN").toUpperCase();
  return { token, user, hotelId: hotelId ? String(hotelId) : "", role };
}

function eventsForRole(role) {
  if (role === "HOTEL_ADMIN" || role === "RECEPTIONIST") return HOTEL_ADMIN_EVENTS;
  return SUPER_ADMIN_EVENTS;
}

function socketUrl() {
  if (typeof window !== "undefined") {
    const mode = String(localStorage.getItem("API_ENVIRONMENT") || "").toUpperCase();
    if (mode === "LOCAL") return LOCAL_SOCKET_URL;
  }
  return SOCKET_URL;
}

const dummySocket = {
  connected: false,
  emit: () => {},
  on: () => {},
  off: () => {},
  disconnect: () => {},
};

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [onlineHotelIds, setOnlineHotelIds] = useState([]);
  const socketRef = useRef(dummySocket);

  const isUserOnline = useCallback((userId) => {
    if (!userId) return false;
    const idStr = String(userId._id || userId.id || userId).trim();
    return onlineUserIds.some((id) => String(id).trim() === idStr);
  }, [onlineUserIds]);

  const isHotelOnline = useCallback((hotelId) => {
    if (!hotelId) return false;
    const idStr = String(hotelId._id || hotelId.id || hotelId).trim();
    return onlineHotelIds.some((id) => String(id).trim() === idStr);
  }, [onlineHotelIds]);

  const joinRoom = useCallback(() => {
    const sock = socketRef.current;
    if (!sock || !sock.connected) return;
    const { token, user, hotelId, role } = readSession();

    if (role === "SUPER_ADMIN" || !hotelId) {
      sock.emit("join_super_admin", { user, token });
    } else {
      sock.emit("join_hotel", { hotelId, token, user });
    }

    if (user) {
      sock.emit("user_presence", {
        userId: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role || role,
        hotelId: hotelId || null,
        token,
      });
    }
    sock.emit("get_presence");
  }, []);

  useEffect(() => {
    if (!SOCKET_ENABLED || typeof window === "undefined") return undefined;

    const { token } = readSession();
    const socket = io(socketUrl(), {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      auth: { token },
      query: token ? { token } : {},
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      joinRoom();
    });
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("ONLINE_PRESENCE_STATE", (data) => {
      if (Array.isArray(data?.onlineUserIds)) setOnlineUserIds(data.onlineUserIds.map(String));
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
    });
    socket.on("HOTEL_ONLINE", (data) => {
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
      else if (data?.hotelId) setOnlineHotelIds((prev) => Array.from(new Set([...prev, String(data.hotelId)])));
    });
    socket.on("HOTEL_OFFLINE", (data) => {
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
      else if (data?.hotelId) setOnlineHotelIds((prev) => prev.filter((id) => id !== String(data.hotelId)));
    });
    socket.on("USER_ONLINE", (data) => {
      if (data?.userId) setOnlineUserIds((prev) => Array.from(new Set([...prev, String(data.userId)])));
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
    });
    socket.on("USER_OFFLINE", (data) => {
      if (data?.userId) setOnlineUserIds((prev) => prev.filter((id) => id !== String(data.userId)));
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
    });
    socket.on("PRESENCE_SYNC", (data) => {
      if (Array.isArray(data?.onlineHotelIds)) setOnlineHotelIds(data.onlineHotelIds.map(String));
      if (Array.isArray(data?.onlineUserIds)) setOnlineUserIds(data.onlineUserIds.map(String));
    });

    const ALL_EVENTS = [...new Set([...SUPER_ADMIN_EVENTS, ...HOTEL_ADMIN_EVENTS])];
    const bindRoleEvents = () => {
      ALL_EVENTS.forEach((evtName) => socket.off(evtName));
      eventsForRole(readSession().role).forEach((evtName) => {
        socket.on(evtName, (payload) => {
          setLastEvent({ name: evtName, payload, timestamp: Date.now() });
          window.dispatchEvent(new CustomEvent(`socket:${evtName}`, { detail: payload }));
          window.dispatchEvent(new CustomEvent("socket:any", { detail: { name: evtName, payload } }));
        });
      });
    };
    bindRoleEvents();

    const handleAuthChange = () => {
      bindRoleEvents();
      joinRoom();
    };
    window.addEventListener("auth-state-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      socket.disconnect();
      socketRef.current = dummySocket;
    };
  }, [joinRoom]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        lastEvent,
        onlineUserIds,
        onlineHotelIds,
        isUserOnline,
        isHotelOnline,
        joinRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function usePresence() {
  const context = useContext(SocketContext);
  return {
    onlineUserIds: context.onlineUserIds || [],
    onlineHotelIds: context.onlineHotelIds || [],
    isUserOnline: context.isUserOnline || (() => false),
    isHotelOnline: context.isHotelOnline || (() => false),
    isConnected: Boolean(context.isConnected),
  };
}

export function useSocket(eventSubscriptions = [], callback) {
  const context = useContext(SocketContext);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const eventsKey = Array.isArray(eventSubscriptions) ? eventSubscriptions.join(",") : "";

  useEffect(() => {
    if (!SOCKET_ENABLED || !eventsKey || typeof window === "undefined") return undefined;
    const events = eventsKey.split(",").filter(Boolean);
    const handlers = events.map((evtName) => {
      const handler = (e) => {
        if (callbackRef.current) callbackRef.current(e.detail, evtName);
      };
      window.addEventListener(`socket:${evtName}`, handler);
      return { evtName, handler };
    });
    return () => {
      handlers.forEach(({ evtName, handler }) => window.removeEventListener(`socket:${evtName}`, handler));
    };
  }, [eventsKey]);

  return context;
}
