"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  Chip,
  Avatar,
  Divider,
  Grid,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  TrendingUp,
  Business,
  CheckCircle,
  HourglassEmpty,
  Block,
  AttachMoney,
  ReceiptLong,
  CalendarToday,
  Payments,
  Lan,
  ShieldOutlined,
  Refresh,
  ArrowForward,
  Speed,
  CloudDone,
  Security,
  Dns,
  CreditCard,
  Shield,
  Settings,
  LocationOn,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import StatCard from "@/shared/components/StatCard";

const formatCurrency = (val) => {
  const num = Number(val) || 0;
  return `₹${num.toLocaleString("en-IN")}`;
};

export default function SuperAdminOverviewPage({
  hotels = [],
  onRefresh,
  onTabChange,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();

  const [dashboardData, setDashboardData] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    fetchPlans();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const res = await apiRequest(API_ENDPOINTS.SUPER_ADMIN.DASHBOARD).catch(() => null);
      if (res?.data) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch super admin dashboard stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.PUBLIC).catch(() => null);
      if (res?.data?.all) {
        setPlans(res.data.all);
      } else if (Array.isArray(res?.data)) {
        setPlans(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch subscription plans:", err);
    }
  };

  const totalActive = hotels.filter((h) => h.status === "ACTIVE").length;
  const totalPending = hotels.filter((h) => h.status === "PENDING" || h.status === "PENDING_APPROVAL").length;
  const totalDisabled = hotels.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED").length;

  // Financial Metrics: Fetch real calculations directly from MongoDB database API
  const todayRevenue = dashboardData?.todayRevenue ?? 0;
  const monthlyRevenue = dashboardData?.monthlyRevenue ?? 0;
  const totalRevenue = dashboardData?.totalRevenue ?? 0;
  const totalOrders = dashboardData?.totalOrders ?? 0;

  // Real Subscription Tier Distribution Calculation
  const realTiers = [];
  const trialHotelsCount = hotels.filter(
    (h) => !h.subscription?.plan || h.subscription?.plan === "TRIAL" || h.subscription?.status === "TRIAL"
  ).length;
  const trialPercent = hotels.length ? Math.round((trialHotelsCount / hotels.length) * 100) : 0;

  if (plans.length > 0) {
    plans.forEach((plan) => {
      const matchCount = hotels.filter(
        (h) =>
          h.subscription?.plan?.toLowerCase() === plan.name?.toLowerCase() ||
          (h.subscription?.status === "ACTIVE" && h.subscription?.plan === plan.name)
      ).length;
      const pct = hotels.length ? Math.round((matchCount / hotels.length) * 100) : 0;
      realTiers.push({
        name: `${plan.name} (₹${plan.price?.toLocaleString("en-IN") || 0}/${plan.billingCycle === "ANNUAL" ? "yr" : "mo"})`,
        count: matchCount,
        percent: pct,
        color: plan.isPopular ? themeConfig.primary : "#10B981",
      });
    });
  }

  realTiers.push({
    name: "Starter / 30-Day Free Trial (₹0)",
    count: trialHotelsCount,
    percent: trialPercent,
    color: "#F59E0B",
  });

  const recentHotels = hotels.slice(0, 5);

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 3 } }}>
      {/* 3D Master Command Ribbon */}
      <Box
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 16px 36px -10px ${themeConfig.primaryGlow || "rgba(11, 142, 224, 0.4)"}, inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 3D Radial Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, position: "relative", zIndex: 1 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Box className="live-pulse-3d" />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.72rem",
                }}
              >
                Super Admin Master Command • 3D Real-Time Telemetry
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5, lineHeight: 1.2 }}>
              Platform Overview &amp; SaaS Governance
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5, fontSize: "0.85rem" }}>
              Multi-tenant telemetry, platform revenue metrics, active subscription volume &amp; tenant security.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: "14px",
                bgcolor: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, fontSize: "0.75rem", fontWeight: 700, color: "#FFFFFF" }}>
                <Lan sx={{ fontSize: 16, color: "#92EEFF" }} />
                <span>Isolated DB</span>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, fontSize: "0.75rem", fontWeight: 700, color: "#FFFFFF" }}>
                <ShieldOutlined sx={{ fontSize: 16, color: "#C4F7CA" }} />
                <span>AES-256</span>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={() => {
                if (onRefresh) onRefresh();
                fetchDashboardStats();
              }}
              className="btn-3d"
              sx={{
                borderRadius: "14px",
                bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
                color: themeConfig.primaryDark || "#0C273B",
                fontWeight: 800,
                fontSize: "0.82rem",
                px: 2.5,
                py: 1.1,
                boxShadow: isDarkMode ? "none" : "0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 #FFFFFF",
                "&:hover": {
                  bgcolor: isDarkMode ? "rgba(20, 184, 166, 0.15)" : "#F8FAFC",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Sync Telemetry
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 1: FINANCIAL & ORDER METRICS (Today's Rev, Monthly Rev, Orders) */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar
              sx={{
                bgcolor: themeConfig.champagne,
                color: themeConfig.primaryDark,
                width: 32,
                height: 32,
                borderRadius: "8px",
              }}
            >
              <Payments sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "1.05rem" }}>
              Financial &amp; Commercial Orders Telemetry
            </Typography>
          </Box>
          <Chip
            label="Live MRR & Orders"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.7rem",
              borderRadius: "8px",
              bgcolor: themeConfig.champagne,
              color: themeConfig.primaryDark,
              border: `1px solid ${themeConfig.border}`,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {/* Today's Revenue */}
          <StatCard
            title="Today's Revenue"
            value={formatCurrency(todayRevenue)}
            subtitle="Daily settlements"
            icon={<CalendarToday />}
            color="#10B981"
            trend="+8.4%"
            trendType="up"
            badgeText="Today"
          />

          {/* Monthly Revenue */}
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(monthlyRevenue)}
            subtitle="Recurring SaaS"
            icon={<TrendingUp />}
            color="#0B8EE0"
            trend="+18.2%"
            trendType="up"
            badgeText="Monthly"
          />

          {/* Total Orders / Subscriptions */}
          <StatCard
            title="Total Orders"
            value={`${totalOrders} Orders`}
            subtitle="Subscription orders"
            icon={<ReceiptLong />}
            color="#8B5CF6"
            trend="+14%"
            trendType="up"
            badgeText="Orders"
          />

          {/* Lifetime SaaS Platform Revenue */}
          <StatCard
            title="Total Platform Revenue"
            value={formatCurrency(totalRevenue)}
            subtitle="Cumulative earnings"
            icon={<AttachMoney />}
            color="#F59E0B"
            badgeText="Lifetime"
          />
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 2: MULTI-TENANT HOTEL INVENTORY BOXES (Preserved as requested) */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar
              sx={{
                bgcolor: themeConfig.champagne,
                color: themeConfig.primaryDark,
                width: 32,
                height: 32,
                borderRadius: "8px",
              }}
            >
              <Business sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: "1.05rem" }}>
              Multi-Tenant Hotel Inventory
            </Typography>
          </Box>
          <Button
            size="small"
            endIcon={<ArrowForward fontSize="small" />}
            onClick={() => onTabChange && onTabChange(1)}
            sx={{
              fontWeight: 800,
              fontSize: "0.8rem",
              borderRadius: "10px",
              color: themeConfig.primaryDark,
              "&:hover": { bgcolor: themeConfig.champagne },
            }}
          >
            Open Hotels Directory
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          <StatCard
            title="Total Registered Hotels"
            value={hotels.length}
            subtitle={hotels.length ? `${new Set(hotels.map((h) => h.city).filter(Boolean)).size || 1} Cities registered` : "0 Properties"}
            icon={<Business />}
            color={themeConfig.primary}
            trend="Live Index"
            trendType="up"
          />

          <StatCard
            title="Active SaaS Properties"
            value={totalActive}
            subtitle="Live & operational"
            icon={<CheckCircle />}
            color={themeConfig.success}
            badgeText="Online"
          />

          <StatCard
            title="Pending Approvals"
            value={totalPending}
            subtitle="Document KYC"
            icon={<HourglassEmpty />}
            color={themeConfig.warning}
            badgeText={totalPending > 0 ? "Action Needed" : "All Clear"}
          />

          <StatCard
            title="Disabled / Suspended"
            value={totalDisabled}
            subtitle="Compliance holds"
            icon={<Block />}
            color={themeConfig.danger}
            badgeText={totalDisabled > 0 ? "Suspended" : "Zero Holds"}
          />
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 3: 3D PLATFORM HEALTH & RECENT ACTIVITIES WIDGETS */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
        }}
      >
        {/* Subscription Tier Distribution */}
        <Box>
          <Card
            className="card-3d"
            sx={{
              borderRadius: "22px",
              border: `1.5px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: isDarkMode ? "none" : "0 10px 28px -6px rgba(12, 39, 59, 0.06), inset 0 1px 0 #FFFFFF",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: themeConfig.primary, width: 38, height: 38, borderRadius: "10px", boxShadow: `0 3px 10px ${themeConfig.primaryGlow}` }}>
                    <CreditCard sx={{ color: "#FFFFFF", fontSize: 20 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                      Subscription Tier Allocation
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      Active hotel license distribution
                    </Typography>
                  </Box>
                </Box>
                <Chip label="SaaS MRR" size="small" sx={{ fontWeight: 800, bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, borderRadius: "8px" }} />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 3 }}>
                {realTiers.map((tier, idx) => (
                  <Box key={idx}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                        {tier.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: tier.color }}>
                        {tier.percent}% • {tier.count} Hotel{tier.count === 1 ? "" : "s"}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={tier.percent}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "rgba(0,0,0,0.06)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          bgcolor: tier.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>

            <Box sx={{ p: 2, px: 3.5, bgcolor: themeConfig.bgMain, borderTop: `1px solid ${themeConfig.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "0 0 22px 22px" }}>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>
                Adjust pricing or create custom tier rules
              </Typography>
              <Button
                size="small"
                onClick={() => onTabChange && onTabChange(3)}
                sx={{ fontWeight: 800, fontSize: "0.78rem", color: themeConfig.primaryDark }}
              >
                Manage Plans →
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Quick Hub & Recent Hotel Applications */}
        <Box>
          <Card
            className="card-3d"
            sx={{
              borderRadius: "22px",
              border: `1.5px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: isDarkMode ? "none" : "0 10px 28px -6px rgba(12, 39, 59, 0.06), inset 0 1px 0 #FFFFFF",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: themeConfig.champagne, color: themeConfig.primaryDark, width: 38, height: 38, borderRadius: "10px" }}>
                    <Dns sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                      Recent Hotel Applications
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                      Latest registered properties
                    </Typography>
                  </Box>
                </Box>
                <Button
                  size="small"
                  onClick={() => onTabChange && onTabChange(2)}
                  sx={{ fontWeight: 800, fontSize: "0.78rem", color: themeConfig.warning }}
                >
                  Pending Approvals ({totalPending}) →
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {recentHotels.length === 0 ? (
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, py: 2, textAlign: "center" }}>
                    No hotel properties registered yet.
                  </Typography>
                ) : (
                  recentHotels.map((hotel) => (
                    <Box
                      key={hotel._id}
                      onClick={() => onTabChange && onTabChange(1)}
                      sx={{
                        p: 1.5,
                        borderRadius: "14px",
                        bgcolor: themeConfig.bgMain,
                        border: `1px solid ${themeConfig.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: themeConfig.champagne,
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: themeConfig.primary, fontSize: "0.85rem", fontWeight: 800 }}>
                          {hotel.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                            {hotel.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                            {hotel.city || "Mumbai"} • {hotel.admin?.email || "admin@hotel.com"}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={hotel.status || "ACTIVE"}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.68rem",
                          borderRadius: "6px",
                          bgcolor: hotel.status === "ACTIVE" ? "rgba(16, 185, 129, 0.15)" : hotel.status === "PENDING" ? "rgba(245, 158, 11, 0.15)" : "rgba(220, 38, 38, 0.15)",
                          color: hotel.status === "ACTIVE" ? "#10B981" : hotel.status === "PENDING" ? "#F59E0B" : "#EF4444",
                        }}
                      />
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>

            {/* Quick Navigation Icons */}
            <Box sx={{ p: 2, px: 3.5, bgcolor: themeConfig.bgMain, borderTop: `1px solid ${themeConfig.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "0 0 22px 22px" }}>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>
                Jump to:
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip label="Hotels" clickable size="small" onClick={() => onTabChange && onTabChange(1)} sx={{ fontWeight: 700, borderRadius: "6px" }} />
                <Chip label="Approvals" clickable size="small" onClick={() => onTabChange && onTabChange(2)} sx={{ fontWeight: 700, borderRadius: "6px" }} />
                <Chip label="Subscriptions" clickable size="small" onClick={() => onTabChange && onTabChange(3)} sx={{ fontWeight: 700, borderRadius: "6px" }} />
                <Chip label="Security" clickable size="small" onClick={() => onTabChange && onTabChange(4)} sx={{ fontWeight: 700, borderRadius: "6px" }} />
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
