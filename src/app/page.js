"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, CircularProgress, Typography, Button, Paper } from "@mui/material";
import { AppThemeProvider, useAppTheme } from "@/shared/context/ThemeContext";
import { SocketProvider, useSocket } from "@/shared/context/SocketContext";
import UnifiedLogin from "@/auth/components/UnifiedLogin";
import SuperAdminLayout from "@/super-admin/layout/SuperAdminLayout";
import SuperAdminDashboard from "@/super-admin/components/SuperAdminDashboard";
import { API_ENDPOINTS, apiRequest } from "@/config/api";

function SuperAdminAppContent() {
  const { themeConfig } = useAppTheme();
  const pathname = usePathname();
  const router = useRouter();

  const getNavListForUser = (currentUser) => {
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") return [];
    return ["overview", "hotels", "subscriptions", "audit-logs", "settings"];
  };

  const getActiveTabFromPath = (currentUser, currentPath) => {
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") return 0;
    const navList = getNavListForUser(currentUser);
    const cleanPath = (currentPath || (typeof window !== "undefined" ? window.location.pathname : ""))
      .replace(/^\/+/, "")
      .split("/")[0];

    if (cleanPath) {
      const idx = navList.indexOf(cleanPath);
      if (idx !== -1) return idx;
    }
    return 0;
  };

  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (!stored || !token) return null;
      const parsed = JSON.parse(stored);
      if (parsed?.role !== "SUPER_ADMIN") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return null;
      }
      return parsed;
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
      if (u?.role !== "SUPER_ADMIN") return 0;
      return getActiveTabFromPath(u, pathname);
    } catch {
      return 0;
    }
  });

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } catch {}
    setUser(null);
    setActiveTab(0);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiRequest(API_ENDPOINTS.AUTH.ME)
        .then((res) => {
          if (res?.data) {
            if (res.data.role !== "SUPER_ADMIN") {
              handleLogout();
              return;
            }
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch(() => {
          handleLogout();
        });
    }

    const handleUnauthorizedEvent = () => {
      console.warn("🔒 [SuperAdmin Auth] Session expired. Auto-logging out...");
      handleLogout();
    };

    const handleStorageEvent = (e) => {
      if ((e.key === "token" || e.key === "user") && !e.newValue) {
        handleLogout();
      }
    };

    window.addEventListener("auth-unauthorized", handleUnauthorizedEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("auth-unauthorized", handleUnauthorizedEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  useEffect(() => {
    if (user && user.role === "SUPER_ADMIN") {
      const tabIdx = getActiveTabFromPath(user, pathname);
      setActiveTab(tabIdx);
    }
  }, [pathname, user]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    if (user && user.role === "SUPER_ADMIN") {
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
          }}
        />
      ) : user.role !== "SUPER_ADMIN" ? (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#062823", p: 3 }}>
          <Paper sx={{ p: 4, borderRadius: "24px", maxWidth: 480, textAlign: "center", bgcolor: "#0C273B", color: "#FFFFFF" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5, color: "#F59E0B" }}>
              Super Admin SaaS Portal
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 3, lineHeight: 1.6 }}>
              This portal is restricted to Super Admin Governance. For Hotel Administration and Front Desk Reception operations, please access the Hotel Web Application.
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{ bgcolor: themeConfig.primary || "#0B8EE0", borderRadius: "12px", fontWeight: 800, px: 3 }}
            >
              Sign Out &amp; Return
            </Button>
          </Paper>
        </Box>
      ) : (
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
        <SuperAdminAppContent />
      </SocketProvider>
    </AppThemeProvider>
  );
}
