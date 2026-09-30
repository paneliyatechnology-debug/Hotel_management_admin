"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { AppThemeProvider, useAppTheme } from "@/shared/context/ThemeContext";
import { SocketProvider, useSocket } from "@/shared/context/SocketContext";
import UnifiedLogin from "@/auth/components/UnifiedLogin";
import SuperAdminLayout from "@/super-admin/layout/SuperAdminLayout";
import HotelAdminLayout from "@/hotel-admin/layout/HotelAdminLayout";
import ReceptionistLayout from "@/receptionist/layout/ReceptionistLayout";
import SuperAdminDashboard from "@/super-admin/components/SuperAdminDashboard";
import HotelAdminDashboard from "@/hotel-admin/components/HotelAdminDashboard";
import ReceptionistDashboard from "@/receptionist/components/ReceptionistDashboard";

import { API_ENDPOINTS, apiRequest } from "@/config/api";
import SubscriptionExpiredScreen from "@/shared/components/SubscriptionExpiredScreen";

function AdminAppContent() {
  const { themeConfig } = useAppTheme();
  const pathname = usePathname();
  const router = useRouter();

  // ⚡ Realtime Socket.IO Sync: Auto-show / Auto-hide Subscription Expired & Lockout Popup without Page Refresh
  useSocket(
    ["HOTEL_UPDATED", "SUBSCRIPTION_UPDATED", "HOTEL_STATUS_UPDATED", "TRIAL_REQUEST_APPROVED", "TRIAL_REQUEST_REJECTED", "DASHBOARD_SYNC"],
    (payload, eventName) => {
      console.log(`⚡ [Realtime Lockout Sync] Event received: ${eventName}`, payload);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        apiRequest(API_ENDPOINTS.AUTH.ME)
          .then((res) => {
            if (res?.data) {
              setUser(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              checkUserLockout(res.data);
            }
          })
          .catch(() => {});
      }
    }
  );

  const getNavListForUser = (currentUser) => {
    if (!currentUser) return [];
    if (currentUser.role === "HOTEL_ADMIN") {
      return ["overview", "daily-collections", "guests", "staff", "rooms", "subscriptions", "settings"];
    }
    if (currentUser.role === "SUPER_ADMIN") {
      return ["overview", "hotels", "subscriptions", "audit-logs", "settings"];
    }
    if (currentUser.role === "RECEPTIONIST") {
      return ["rooms", "folios", "check-in", "id-compliance", "pos-billing", "settings"];
    }
    return [];
  };

  const getActiveTabFromPath = (currentUser, currentPath) => {
    if (!currentUser) return 0;
    const navList = getNavListForUser(currentUser);
    const cleanPath = (currentPath || (typeof window !== "undefined" ? window.location.pathname : ""))
      .replace(/^\/+/, "")
      .split("/")[0] ||
      (typeof window !== "undefined" ? window.location.hash.replace("#", "").replace(/^\/+/, "").split("/")[0] : "");
    
    if (cleanPath) {
      const idx = navList.indexOf(cleanPath);
      if (idx !== -1) return idx;

      // Common path aliases for seamless navigation
      if (currentUser.role === "RECEPTIONIST") {
        if (cleanPath === "checkin" || cleanPath === "check-in" || cleanPath === "booking") return 2;
        if (cleanPath === "id" || cleanPath === "kyc" || cleanPath === "compliance") return 3;
        if (cleanPath === "pos" || cleanPath === "billing") return 4;
      }
      if (currentUser.role === "HOTEL_ADMIN") {
        if (cleanPath === "collections" || cleanPath === "payments" || cleanPath === "billing") return 1;
        if (cleanPath === "folios" || cleanPath === "guest-directory") return 2;
        if (cleanPath === "team") return 3;
        if (cleanPath === "plans" || cleanPath === "pricing") return 5;
      }
    }
    return 0;
  };

  const computeLockout = (userData) => {
    if (!userData || userData.role === "SUPER_ADMIN") {
      return { locked: false, type: "EXPIRED", reason: "" };
    }

    if (userData.status === "INACTIVE" || userData.status === "BLOCKED" || userData.status === "DELETED") {
      return {
        locked: true,
        type: "DISABLED",
        reason: "Your staff account has been deactivated by Hotel Administration. All portal access is suspended.",
      };
    }

    const hotel = userData.hotel;
    if (!hotel) return { locked: false, type: "EXPIRED", reason: "" };

    if (hotel.status === "DISABLED" || hotel.status === "SUSPENDED") {
      return {
        locked: true,
        type: hotel.status,
        reason: hotel.statusReason || `Hotel account has been ${hotel.status.toLowerCase()} by Super Admin policy.`,
      };
    }

    const sub = hotel.subscription;
    if (sub) {
      const now = new Date();
      const trialEndDate = sub.trialEndDate ? new Date(sub.trialEndDate) : null;
      const isTrialExpired = sub.isExpired || (sub.status === "TRIAL" && trialEndDate && trialEndDate < now) || sub.status === "EXPIRED";
      if (isTrialExpired && sub.status !== "ACTIVE") {
        return {
          locked: true,
          type: "EXPIRED",
          reason: "Your 30-day free trial or hotel subscription plan has ended.",
        };
      }
    }

    return { locked: false, type: "EXPIRED", reason: "" };
  };

  // Instant synchronous state initialization from LocalStorage (Zero delay, Zero loader flash)
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return stored && token ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const u = stored && token ? JSON.parse(stored) : null;
      return getActiveTabFromPath(u, pathname);
    } catch {
      return 0;
    }
  });

  const [lockout, setLockout] = useState(() => {
    if (typeof window === "undefined") return { locked: false, type: "EXPIRED", reason: "" };
    try {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const u = stored && token ? JSON.parse(stored) : null;
      return computeLockout(u);
    } catch {
      return { locked: false, type: "EXPIRED", reason: "" };
    }
  });

  const checkUserLockout = (userData) => {
    const res = computeLockout(userData);
    setLockout(res);
    return res.locked;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } catch {}
    setUser(null);
    setLockout({ locked: false, type: "EXPIRED", reason: "" });
    setActiveTab(0);
    router.push("/");
  };

  useEffect(() => {
    // Background silent profile verification without blocking UI
    const token = localStorage.getItem("token");
    if (token) {
      apiRequest(API_ENDPOINTS.AUTH.ME)
        .then((res) => {
          if (res?.data) {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            checkUserLockout(res.data);
          }
        })
        .catch(() => {});
    }

    // 1. Global listener for immediate lockout events triggered by apiRequest
    const handleLockoutEvent = (e) => {
      const detail = e.detail || {};
      setLockout({
        locked: true,
        type: detail.hotelStatus || (detail.errorCode === "SUBSCRIPTION_EXPIRED" ? "EXPIRED" : "DISABLED"),
        reason: detail.message || "Hotel account access is restricted.",
      });
    };

    // 2. Global listener for Unauthorized 401 events (Auto-Logout on Token Expiry)
    const handleUnauthorizedEvent = () => {
      console.warn("🔒 [Auth] Session expired or unauthorized. Auto-logging out...");
      handleLogout();
    };

    // 3. Multi-Tab & Devtools Storage Listener (Auto-Logout if token is deleted)
    const handleStorageEvent = (e) => {
      if ((e.key === "token" || e.key === "user") && !e.newValue) {
        console.warn("🔒 [Auth] Token removed from storage in another window. Auto-logging out...");
        handleLogout();
      }
      if (e.key === null) {
        handleLogout();
      }
    };

    // 4. Tab Focus & Periodic Check for Deleted Token
    const handleFocusCheck = () => {
      const currentToken = localStorage.getItem("token");
      if (!currentToken && localStorage.getItem("user")) {
        console.warn("🔒 [Auth] Token missing upon tab focus. Auto-logging out...");
        handleLogout();
      }
    };

    const tokenHeartbeat = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      const currentStoredUser = localStorage.getItem("user");
      if (!currentToken && currentStoredUser) {
        console.warn("🔒 [Auth] Token was deleted. Auto-logging out immediately...");
        handleLogout();
        return;
      }

      // ⏱️ Live Ticker: Periodically re-evaluate lockout so trial expiry locks portal at the exact second/minute
      if (currentStoredUser) {
        try {
          const u = JSON.parse(currentStoredUser);
          if (u && u.role !== "SUPER_ADMIN") {
            checkUserLockout(u);
          }
        } catch {}
      }
    }, 3000);

    window.addEventListener("hotel-status-lockout", handleLockoutEvent);
    window.addEventListener("auth-unauthorized", handleUnauthorizedEvent);
    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("focus", handleFocusCheck);
    document.addEventListener("visibilitychange", handleFocusCheck);

    return () => {
      clearInterval(tokenHeartbeat);
      window.removeEventListener("hotel-status-lockout", handleLockoutEvent);
      window.removeEventListener("auth-unauthorized", handleUnauthorizedEvent);
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("focus", handleFocusCheck);
      document.removeEventListener("visibilitychange", handleFocusCheck);
    };
  }, []);

  // Keep activeTab synchronized with the browser URL address at all times
  useEffect(() => {
    if (user) {
      const tabIdx = getActiveTabFromPath(user, pathname);
      setActiveTab(tabIdx);
    }
  }, [pathname, user]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    if (user) {
      const navList = getNavListForUser(user);
      if (navList[tabIndex] !== undefined) {
        const targetPath = tabIndex === 0 ? "/" : `/${navList[tabIndex]}`;
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", targetPath);
        }
      }
    }
  };

  return (
    <>
      {!user ? (
        <UnifiedLogin
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            checkUserLockout(loggedInUser);
          }}
        />
      ) : lockout.locked && user.role !== "SUPER_ADMIN" ? (
        <SubscriptionExpiredScreen
          user={user}
          type={lockout.type}
          reason={lockout.reason}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {user.role === "SUPER_ADMIN" && (
            <SuperAdminLayout
              user={user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            >
              <SuperAdminDashboard
                user={user}
                activeNav={activeTab}
                onTabChange={handleTabChange}
              />
            </SuperAdminLayout>
          )}

          {user.role === "HOTEL_ADMIN" && (
            <HotelAdminLayout
              user={user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            >
              <HotelAdminDashboard
                user={user}
                activeNav={activeTab}
                onTabChange={handleTabChange}
              />
            </HotelAdminLayout>
          )}

          {user.role === "RECEPTIONIST" && (
            <ReceptionistLayout
              user={user}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={handleLogout}
            >
              <ReceptionistDashboard
                user={user}
                activeNav={activeTab}
                onTabChange={handleTabChange}
                onLogout={handleLogout}
              />
            </ReceptionistLayout>
          )}
        </>
      )}
    </>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppThemeProvider>
      <SocketProvider>
        <AdminAppContent />
      </SocketProvider>
    </AppThemeProvider>
  );
}
