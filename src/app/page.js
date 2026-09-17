"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { AppThemeProvider, useAppTheme } from "@/shared/context/ThemeContext";
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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [lockout, setLockout] = useState({ locked: false, type: "EXPIRED", reason: "" });

  const getNavListForUser = (currentUser) => {
    if (!currentUser) return [];
    if (currentUser.role === "HOTEL_ADMIN") {
      return ["overview", "daily-collections", "guests", "staff", "rooms", "subscriptions", "settings"];
    }
    if (currentUser.role === "SUPER_ADMIN") {
      return ["overview", "hotels", "approvals", "subscriptions", "audit-logs", "settings"];
    }
    if (currentUser.role === "RECEPTIONIST") {
      return ["rooms", "folios", "check-in", "id-compliance", "pos-billing", "settings"];
    }
    return [];
  };

  const checkUserLockout = (userData) => {
    if (!userData || userData.role === "SUPER_ADMIN") {
      setLockout({ locked: false, type: "EXPIRED", reason: "" });
      return false;
    }

    if (userData.status === "INACTIVE" || userData.status === "BLOCKED" || userData.status === "DELETED") {
      setLockout({
        locked: true,
        type: "DISABLED",
        reason: "Your staff account has been deactivated by Hotel Administration. All portal access is suspended.",
      });
      return true;
    }

    const hotel = userData.hotel;
    if (!hotel) return false;

    if (hotel.status === "DISABLED" || hotel.status === "SUSPENDED") {
      setLockout({
        locked: true,
        type: hotel.status,
        reason: hotel.statusReason || `Hotel account has been ${hotel.status.toLowerCase()} by Super Admin policy.`,
      });
      return true;
    }

    const sub = hotel.subscription;
    if (sub) {
      const now = new Date();
      const trialEndDate = sub.trialEndDate ? new Date(sub.trialEndDate) : null;
      const isTrialExpired = sub.isExpired || (sub.status === "TRIAL" && trialEndDate && trialEndDate < now) || sub.status === "EXPIRED";
      if (isTrialExpired && sub.status !== "ACTIVE") {
        setLockout({
          locked: true,
          type: "EXPIRED",
          reason: "Your 30-day free trial or hotel subscription plan has ended.",
        });
        return true;
      }
    }

    setLockout({ locked: false, type: "EXPIRED", reason: "" });
    return false;
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

  useEffect(() => {
    // Check local storage for session on initial mount
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        checkUserLockout(parsed);
        const tabIdx = getActiveTabFromPath(parsed, pathname);
        setActiveTab(tabIdx);

        // Fetch fresh profile with live computed subscription metrics from backend
        apiRequest(API_ENDPOINTS.AUTH.ME)
          .then((res) => {
            if (res?.data) {
              setUser(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              checkUserLockout(res.data);
            }
          })
          .catch(() => {});
      } catch {
        setUser(null);
      }
    }
    setLoading(false);

    // Global listener for immediate lockout events triggered by apiRequest
    const handleLockoutEvent = (e) => {
      const detail = e.detail || {};
      setLockout({
        locked: true,
        type: detail.hotelStatus || (detail.errorCode === "SUBSCRIPTION_EXPIRED" ? "EXPIRED" : "DISABLED"),
        reason: detail.message || "Hotel account access is restricted.",
      });
    };

    window.addEventListener("hotel-status-lockout", handleLockoutEvent);
    return () => window.removeEventListener("hotel-status-lockout", handleLockoutEvent);
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
        router.push(targetPath);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setLockout({ locked: false, type: "EXPIRED", reason: "" });
    setActiveTab(0);
    router.push("/");
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: themeConfig.bgMain }}>
        <CircularProgress sx={{ color: themeConfig.primary }} />
      </Box>
    );
  }

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
              />
            </ReceptionistLayout>
          )}
        </>
      )}
    </>
  );
}

import { SocketProvider } from "@/shared/context/SocketContext";

function AdminApp() {
  return (
    <AppThemeProvider>
      <SocketProvider>
        <AdminAppContent />
      </SocketProvider>
    </AppThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(AdminApp), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF9F6",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: "3.5px solid #E2E8F0",
          borderTopColor: "#0B8EE0",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  ),
});
