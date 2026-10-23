"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  Chip,
  Avatar,
  Grid,
  LinearProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  ArrowForward,
  Speed,
  CloudDone,
  Security,
  CreditCard,
  Shield,
  Settings,
  LocationOn,
  Close,
  Search,
  Visibility,
  People,
  BookmarkBorder,
  MeetingRoom,
  Schedule,
  Warning,
  Phone,
  Email,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import StatCard from "@/shared/components/StatCard";

const formatCurrency = (val) => {
  const num = Number(val) || 0;
  return `₹${num.toLocaleString("en-IN")}`;
};

function asNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function SuperAdminOverviewPage({
  hotels = [],
  staffCount = 0,
  onRefresh,
  onTabChange,
}) {
  const { themeConfig, isDarkMode } = useAppTheme();

  const dashboardData = null;
  const [plans, setPlans] = useState([]);
  const [bookingStats, setBookingStats] = useState({ volume: 0, thisMonth: 0 });

  // Detail Modal State
  const [detailModal, setDetailModal] = useState({
    open: false,
    type: null,
  });
  const [modalSearch, setModalSearch] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetchPlans();

    const readPage = (res) => {
      const payload = res?.data;
      const list = Array.isArray(payload?.bookings)
        ? payload.bookings
        : Array.isArray(payload)
          ? payload
          : [];
      return {
        list,
        totalPages: Math.max(1, asNumber(payload?.totalPages || payload?.total_pages) || 1),
      };
    };

    (async () => {
      const seen = new Map();
      const first = await apiRequest(API_ENDPOINTS.BOOKINGS.LIST("?page=1&limit=10")).catch(() => null);
      const firstPage = readPage(first);
      const pages = Math.min(firstPage.totalPages, 10);
      const add = (list) => {
        list.forEach((booking) => {
          const id = booking.id || booking._id || booking.booking_number || booking.bookingNumber;
          if (id !== undefined && id !== null) seen.set(String(id), booking);
        });
      };
      add(firstPage.list);
      for (let page = 2; page <= pages; page += 1) {
        const next = await apiRequest(API_ENDPOINTS.BOOKINGS.LIST(`?page=${page}&limit=10`)).catch(() => null);
        add(readPage(next).list);
      }
      if (ignore) return;
      const bookings = [...seen.values()];
      const now = new Date();
      const inThisMonth = (booking) => {
        const raw = booking.created_at || booking.createdAt || booking.check_in_date || booking.checkInDate;
        const date = raw ? new Date(raw) : null;
        return date && !Number.isNaN(date.getTime()) && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      };
      const monthBookings = bookings.filter(inThisMonth);
      const amountOf = (booking) => asNumber(
        booking.total_amount ?? booking.totalAmount ?? booking.grand_total ?? booking.grandTotal ?? booking.base_amount ?? booking.baseAmount ?? booking.paid_amount ?? booking.paidAmount
      );
      setBookingStats({
        volume: bookings.reduce((sum, booking) => sum + amountOf(booking), 0),
        thisMonth: monthBookings.length || bookings.length,
      });
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await apiRequest(`${API_ENDPOINTS.SUBSCRIPTION_PLANS.PUBLIC}?page=1&limit=100`, { skipAuth: true }).catch(() => null);
      const payload = res?.data;
      const list = Array.isArray(payload?.plans)
        ? payload.plans
        : Array.isArray(payload?.all)
          ? payload.all
          : Array.isArray(payload)
            ? payload
            : [];
      setPlans(list);
    } catch (err) {
      console.warn("Failed to fetch subscription plans:", err);
    }
  };

  const kpis = dashboardData?.kpis || {};
  const totalHotels = dashboardData ? asNumber(kpis.total_hotels ?? kpis.totalHotels) : hotels.length;
  const totalActive = dashboardData ? asNumber(kpis.active_hotels ?? kpis.activeHotels) : hotels.filter((h) => h.status === "ACTIVE").length;
  const trialHotelsCount = dashboardData ? asNumber(kpis.trial_hotels ?? kpis.trialHotels) : hotels.filter((h) => !h.subscription?.plan || h.subscription?.plan === "TRIAL" || h.subscription?.status === "TRIAL").length;
  const inactiveHotels = dashboardData ? asNumber(kpis.inactive_hotels ?? kpis.inactiveHotels) : hotels.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED" || h.status === "INACTIVE").length;
  const expiredHotels = dashboardData ? asNumber(kpis.expired_hotels ?? kpis.expiredHotels) : 0;
  const totalPending = expiredHotels;
  const totalDisabled = inactiveHotels;
  const staffUsers = staffCount || asNumber(kpis.total_staff_users ?? kpis.totalStaffUsers);
  const estimatedMrr = hotels.reduce((sum, hotel) => {
    if (hotel.status !== "ACTIVE") return sum;
    const planId = hotel.subscription_plan_id ?? hotel.subscriptionPlanId ?? hotel.subscription?.plan_id ?? hotel.subscription?.planId;
    const plan = plans.find((item) => String(item.id || item._id) === String(planId));
    if (!plan) return sum;
    const cycle = String(plan.billing_cycle || plan.billingCycle || "MONTHLY").toUpperCase();
    const price = asNumber(plan.price);
    const discount = asNumber(plan.discount_percent ?? plan.discountPercent);
    const net = price * (1 - discount / 100);
    if (String(plan.code || plan.name || "").toUpperCase().includes("TRIAL") || net <= 0) return sum;
    return sum + (cycle === "ANNUAL" ? net / 12 : net);
  }, 0);

  const monthlyRevenue = estimatedMrr || dashboardData?.monthlyRevenue || asNumber(kpis.estimated_mrr ?? kpis.estimatedMrr);
  const totalRevenue = bookingStats.volume || dashboardData?.totalRevenue || asNumber(kpis.total_platform_booking_volume ?? kpis.totalPlatformBookingVolume);
  const totalOrders = bookingStats.thisMonth || dashboardData?.totalOrders || asNumber(kpis.total_bookings_this_month ?? kpis.totalBookingsThisMonth);
  const totalRoomsCount = dashboardData?.totalRooms ?? asNumber(kpis.total_platform_rooms ?? kpis.totalPlatformRooms);
  const planOfHotel = (hotel) => {
    const planId = hotel.subscription_plan_id ?? hotel.subscriptionPlanId ?? hotel.subscription?.plan_id ?? hotel.subscription?.planId;
    return plans.find((item) => String(item.id || item._id) === String(planId)) || null;
  };
  const isTrialPlan = (plan) => {
    const label = String(plan?.code || plan?.name || "").toUpperCase();
    return !plan || label.includes("TRIAL") || asNumber(plan.price) <= 0;
  };
  const monthlyNet = (plan) => {
    const cycle = String(plan.billing_cycle || plan.billingCycle || "MONTHLY").toUpperCase();
    const price = asNumber(plan.price);
    const discount = asNumber(plan.discount_percent ?? plan.discountPercent);
    const net = price * (1 - discount / 100);
    return cycle === "ANNUAL" ? net / 12 : net;
  };
  const tierBase = totalHotels || 1;
  const tierColors = [themeConfig.primary, "#10B981", "#8B5CF6", "#0B8EE0"];
  const paidPlans = plans.filter((plan) => !isTrialPlan(plan));
  const realTiers = paidPlans.map((plan, idx) => {
    const count = hotels.filter((hotel) => String(planOfHotel(hotel)?.id || planOfHotel(hotel)?._id) === String(plan.id || plan._id)).length;
    const revenue = monthlyNet(plan);
    return {
      name: `${plan.name || plan.code || "Plan"} • ₹${Math.round(revenue).toLocaleString("en-IN")}/mo`,
      count,
      percent: Math.round((count / tierBase) * 100),
      color: tierColors[idx % tierColors.length],
    };
  });
  const trialFromPlans = hotels.filter((hotel) => isTrialPlan(planOfHotel(hotel))).length;
  realTiers.push({
    name: "Trial hotels",
    count: trialFromPlans,
    percent: Math.round((trialFromPlans / tierBase) * 100),
    color: "#F59E0B",
  });

  const handleOpenDetailModal = (type) => {
    setModalSearch("");
    setDetailModal({ open: true, type });
    if (type === "STAFF_USERS") loadStaff();
  };

  const loadStaff = async () => {
    setStaffLoading(true);
    try {
      const res = await apiRequest(API_ENDPOINTS.USERS.LIST("?page=1&limit=10"));
      const payload = res?.data;
      const list = Array.isArray(payload) ? payload : payload?.users || payload?.data || [];
      setStaffList(Array.isArray(list) ? list : []);
    } catch (err) {
      setStaffList([]);
    } finally {
      setStaffLoading(false);
    }
  };

  const handleCloseDetailModal = () => {
    setDetailModal({ open: false, type: null });
    setModalSearch("");
  };

  // Filtered hotels inside detail modal based on search query
  const modalFilteredHotels = useMemo(() => {
    let list = [...hotels];
    if (detailModal.type === "ACTIVE_HOTELS") {
      list = list.filter((h) => h.status === "ACTIVE");
    } else if (detailModal.type === "PENDING_APPROVALS") {
      list = list.filter((h) => h.status === "PENDING" || h.status === "PENDING_APPROVAL");
    } else if (detailModal.type === "DISABLED_HOTELS") {
      list = list.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED");
    }

    if (!modalSearch.trim()) return list;
    const q = modalSearch.toLowerCase().trim();
    return list.filter(
      (h) =>
        (h.name || "").toLowerCase().includes(q) ||
        (h.city || "").toLowerCase().includes(q) ||
        (h.ownerName || h.admin?.name || "").toLowerCase().includes(q) ||
        (h.ownerEmail || h.admin?.email || "").toLowerCase().includes(q) ||
        (h.hotelCode || "").toLowerCase().includes(q)
    );
  }, [hotels, detailModal.type, modalSearch]);

  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 3 }, pb: { xs: 10, sm: 4 } }}>
      {/* ========================================================================= */}
      {/* SECTION 1: FINANCIAL & ORDER METRICS */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 4 }}>
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
            hideFooter
            title="Estimated MRR"
            value={formatCurrency(monthlyRevenue)}
            icon={<TrendingUp />}
            color="#0B8EE0"
          />

          <StatCard
            hideFooter
            title="Platform Booking Volume"
            value={formatCurrency(totalRevenue)}
            icon={<AttachMoney />}
            color="#F59E0B"
          />

          <StatCard
            hideFooter
            title="Bookings This Month"
            value={totalOrders}
            icon={<ReceiptLong />}
            color="#8B5CF6"
          />

          <StatCard
            hideFooter
            title="Staff Users"
            value={staffUsers}
            icon={<People />}
            color="#10B981"
          />
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 2: MULTI-TENANT HOTEL INVENTORY BOXES */}
      {/* ========================================================================= */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
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
            <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, fontSize: { xs: "0.95rem", sm: "1.05rem" } }}>
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
            hideFooter
            title="Total Hotels"
            value={totalHotels}
            icon={<Business />}
            color={themeConfig.primary}
          />

          <StatCard
            hideFooter
            title="Active Hotels"
            value={totalActive}
            icon={<CheckCircle />}
            color={themeConfig.success}
          />

          <StatCard
            hideFooter
            title="Trial Hotels"
            value={trialHotelsCount}
            icon={<HourglassEmpty />}
            color={themeConfig.warning}
          />

          <StatCard
            hideFooter
            title="Inactive Hotels"
            value={inactiveHotels}
            icon={<Block />}
            color={themeConfig.danger}
          />
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* SECTION 3: PLATFORM HEALTH & RECENT ACTIVITIES WIDGETS */}
      {/* ========================================================================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
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
                      Real database active hotel licenses
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
                        {tier.percent}% • {tier.count} Property({tier.count === 1 ? "" : "s"})
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
                onClick={() => onTabChange && onTabChange(2)}
                sx={{ fontWeight: 800, fontSize: "0.78rem", color: themeConfig.primaryDark }}
              >
                Manage Plans →
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
      {/* ========================================================================= */}
      {/* COMPREHENSIVE INTERACTIVE DETAIL MODAL DIALOG */}
      {/* ========================================================================= */}
      <Dialog
        open={detailModal.open}
        onClose={handleCloseDetailModal}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              border: `1.5px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: "0 28px 56px -12px rgba(12, 39, 59, 0.28)",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Modal Header */}
        <DialogTitle
          component="div"
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
              : `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)`,
            borderBottom: `1px solid ${themeConfig.border}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor:
                  detailModal.type === "TODAY_REVENUE"
                    ? "#10B981"
                    : detailModal.type === "MONTHLY_REVENUE"
                    ? "#0B8EE0"
                    : detailModal.type === "TOTAL_ORDERS"
                    ? "#8B5CF6"
                    : detailModal.type === "TOTAL_PLATFORM_REVENUE"
                    ? "#F59E0B"
                    : detailModal.type === "ACTIVE_HOTELS"
                    ? themeConfig.success
                    : detailModal.type === "PENDING_APPROVALS"
                    ? themeConfig.warning
                    : detailModal.type === "DISABLED_HOTELS"
                    ? themeConfig.danger
                    : themeConfig.primary,
                color: "#FFFFFF",
                boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
              }}
            >
              {detailModal.type === "STAFF_USERS" && <People />}
              {detailModal.type === "TODAY_REVENUE" && <CalendarToday />}
              {detailModal.type === "MONTHLY_REVENUE" && <TrendingUp />}
              {detailModal.type === "TOTAL_ORDERS" && <ReceiptLong />}
              {detailModal.type === "TOTAL_PLATFORM_REVENUE" && <AttachMoney />}
              {detailModal.type === "TOTAL_HOTELS" && <Business />}
              {detailModal.type === "ACTIVE_HOTELS" && <CheckCircle />}
              {detailModal.type === "PENDING_APPROVALS" && <HourglassEmpty />}
              {detailModal.type === "DISABLED_HOTELS" && <Block />}
            </Avatar>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1.2 }}>
                {detailModal.type === "STAFF_USERS" && "Staff Users"}
                {detailModal.type === "TODAY_REVENUE" && "Today's Revenue Telemetry & Settlements"}
                {detailModal.type === "MONTHLY_REVENUE" && "Monthly Recurring Revenue (MRR) & SaaS Analytics"}
                {detailModal.type === "TOTAL_ORDERS" && "Commercial Orders & Subscriptions Telemetry"}
                {detailModal.type === "TOTAL_PLATFORM_REVENUE" && "Lifetime SaaS Platform Revenue & Ledger"}
                {detailModal.type === "TOTAL_HOTELS" && "Multi-Tenant Hotel Inventory Directory"}
                {detailModal.type === "ACTIVE_HOTELS" && "Active & Operational SaaS Properties"}
                {detailModal.type === "PENDING_APPROVALS" && "Pending Hotel Approvals & KYC Verification"}
                {detailModal.type === "DISABLED_HOTELS" && "Disabled & Suspended Compliance Holds"}
              </Typography>
              <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                {detailModal.type === "STAFF_USERS" && `${staffList.length || staffUsers} people on the platform`}
                {detailModal.type === "TODAY_REVENUE" && "Real-time daily collection metrics, today's arrivals & settled folio dues from MongoDB API"}
                {detailModal.type === "MONTHLY_REVENUE" && "Current calendar month performance, projected run rate & subscription growth"}
                {detailModal.type === "TOTAL_ORDERS" && "Subscription invoicing orders, tier volume & SaaS conversions"}
                {detailModal.type === "TOTAL_PLATFORM_REVENUE" && "Cumulative financial records, all-time bookings & platform ledger"}
                {detailModal.type === "TOTAL_HOTELS" && `Inspecting ${hotels.length} registered hotels across all regions & cities`}
                {detailModal.type === "ACTIVE_HOTELS" && `Inspecting ${totalActive} currently verified and active hotel properties`}
                {detailModal.type === "PENDING_APPROVALS" && `Inspecting ${totalPending} properties awaiting super-admin approval`}
                {detailModal.type === "DISABLED_HOTELS" && `Inspecting ${totalDisabled} properties on compliance suspension`}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleCloseDetailModal} sx={{ color: themeConfig.textMuted }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, pt: 3 }}>
          {/* ======================================================== */}
          {/* 1. TODAY'S REVENUE DETAIL VIEW */}
          {/* ======================================================== */}
          {detailModal.type === "TODAY_REVENUE" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* 4 Stat Tiles */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TODAY'S COLLECTION</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#10B981", mt: 0.5 }}>{formatCurrency(monthlyRevenue)}</Typography>
                  <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 700 }}>{dashboardData?.todayGrowth || "0%"} vs yesterday</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TODAY'S ARRIVALS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mt: 0.5 }}>{dashboardData?.todayCheckIns ?? 0} Check-ins</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Scheduled for today</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TODAY'S DEPARTURES</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mt: 0.5 }}>{dashboardData?.todayCheckOuts ?? 0} Check-outs</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Departing today</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>YESTERDAY SETTLED</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0B8EE0", mt: 0.5 }}>{formatCurrency(dashboardData?.yesterdayRevenue ?? 0)}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Prior day ledger</Typography>
                </Paper>
              </Box>

              {/* Breakdown Details */}
              <Box sx={{ p: 2.5, borderRadius: "18px", bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5 }}>
                  Real-time Database Revenue Benchmarks
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>Weekly Rolling Settlements (Mon–Sun)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#2563EB" }}>{formatCurrency(dashboardData?.weeklyRevenue ?? 0)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>Current Month SaaS Settlements</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#8B5CF6" }}>{formatCurrency(monthlyRevenue)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: themeConfig.textMain }}>Cumulative Lifetime Volume</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#F59E0B" }}>{formatCurrency(totalRevenue)}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Real Recent Payments from API */}
              {(dashboardData?.recentPayments || []).length > 0 && (
                <Paper sx={{ p: 2.5, borderRadius: "18px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5 }}>
                    Latest Live Transactions (Database Feed)
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {(dashboardData?.recentPayments || []).slice(0, 5).map((pay) => (
                      <Box key={pay._id} sx={{ p: 1.2, px: 2, borderRadius: "10px", bgcolor: themeConfig.champagne, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                            {pay.hotel?.name || "Hotel"} • {pay.guest?.name || "Guest"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                            Receipt: #{pay.receiptNumber} • {pay.paymentMethod}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: "#10B981" }}>
                          {formatCurrency(pay.amount)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              )}
            </Box>
          )}

          {/* ======================================================== */}
          {/* 2. MONTHLY REVENUE DETAIL VIEW */}
          {/* ======================================================== */}
          {detailModal.type === "MONTHLY_REVENUE" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* 4 Stat Tiles */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>CURRENT MONTH MRR</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0B8EE0", mt: 0.5 }}>{formatCurrency(monthlyRevenue)}</Typography>
                  <Typography variant="caption" sx={{ color: "#0B8EE0", fontWeight: 700 }}>{dashboardData?.monthlyGrowth || "0%"} vs last month</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>PROJECTED ARR</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mt: 0.5 }}>{formatCurrency(monthlyRevenue * 12)}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Annualized run rate</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>ACTIVE SUBSCRIBERS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#10B981", mt: 0.5 }}>{dashboardData?.activeSubscriptions ?? totalActive} Hotels</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Paid &amp; verified</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TRIAL CONVERSION POOL</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#F59E0B", mt: 0.5 }}>{trialHotelsCount} Hotels</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>In 30-day evaluation</Typography>
                </Paper>
              </Box>

              {/* Tier Allocation in Detail */}
              <Box sx={{ p: 2.5, borderRadius: "18px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 2 }}>
                  Subscription Tier Revenue Distribution
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {realTiers.map((tier, idx) => (
                    <Box key={idx}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                          {tier.name}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: tier.color }}>
                          {tier.percent}% • {tier.count} Property({tier.count === 1 ? "" : "s"})
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={tier.percent}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "rgba(0,0,0,0.06)",
                          "& .MuiLinearProgress-bar": { borderRadius: 4, bgcolor: tier.color },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {/* ======================================================== */}
          {/* 3. TOTAL ORDERS DETAIL VIEW */}
          {/* ======================================================== */}
          {detailModal.type === "STAFF_USERS" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {staffLoading && (
                <Typography sx={{ color: themeConfig.textMuted }}>Loading staff...</Typography>
              )}
              {!staffLoading && staffList.length === 0 && (
                <Typography sx={{ color: themeConfig.textMuted }}>No staff users found.</Typography>
              )}
              {staffList
                .filter((person) => {
                  const q = modalSearch.trim().toLowerCase();
                  if (!q) return true;
                  return [person.name, person.email, person.role, person.phone].filter(Boolean).join(" ").toLowerCase().includes(q);
                })
                .map((person) => (
                  <Box
                    key={person.id || person._id || person.email}
                    sx={{
                      p: 1.5,
                      borderRadius: "14px",
                      border: `1px solid ${themeConfig.border}`,
                      bgcolor: themeConfig.bgMain,
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, color: themeConfig.textMain }}>{person.name || "User"}</Typography>
                      <Typography sx={{ color: themeConfig.textMuted, fontSize: "0.8rem" }}>{person.email || person.phone || "—"}</Typography>
                    </Box>
                    <Chip label={person.role || "STAFF"} size="small" sx={{ fontWeight: 800, bgcolor: themeConfig.bgSoft, color: themeConfig.accent || themeConfig.primary }} />
                  </Box>
                ))}
            </Box>
          )}

          {detailModal.type === "TOTAL_ORDERS" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* 4 Stat Tiles */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TOTAL ORDERS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#8B5CF6", mt: 0.5 }}>{totalOrders} Orders</Typography>
                  <Typography variant="caption" sx={{ color: "#8B5CF6", fontWeight: 700 }}>Settled in Database</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>ACTIVE LICENSES</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mt: 0.5 }}>{dashboardData?.activeSubscriptions ?? totalActive}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Operational keys</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>FREE TRIALS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#F59E0B", mt: 0.5 }}>{trialHotelsCount}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Non-billed trials</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>DATABASE PROPERTIES</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#10B981", mt: 0.5 }}>{hotels.length}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Total registered</Typography>
                </Paper>
              </Box>

              {/* Subscriptions breakdown */}
              <Paper sx={{ p: 2.5, borderRadius: "18px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1.5 }}>
                  Active Subscription Plans (Database Feed)
                </Typography>
                {plans.length === 0 ? (
                  <Typography variant="body2" sx={{ color: themeConfig.textMuted }}>
                    Standard SaaS Subscription Tiers configured.
                  </Typography>
                ) : (
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 1.5 }}>
                    {plans.map((p, idx) => (
                      <Box key={idx} sx={{ p: 1.5, borderRadius: "12px", bgcolor: themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>{p.name}</Typography>
                          <Chip label={`₹${p.price?.toLocaleString("en-IN") || 0}`} size="small" sx={{ fontWeight: 800, bgcolor: themeConfig.primary, color: "#FFFFFF" }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, mt: 0.5, display: "block" }}>
                          Cycle: {p.billingCycle || "MONTHLY"} • Rooms: Up to {p.maxRooms || "Unlimited"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </Box>
          )}

          {/* ======================================================== */}
          {/* 4. TOTAL PLATFORM REVENUE DETAIL VIEW */}
          {/* ======================================================== */}
          {detailModal.type === "TOTAL_PLATFORM_REVENUE" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* 4 Stat Tiles */}
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>LIFETIME REVENUE</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#F59E0B", mt: 0.5 }}>{formatCurrency(totalRevenue)}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Cumulative platform volume</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>TOTAL GUEST BOOKINGS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: themeConfig.textMain, mt: 0.5 }}>{dashboardData?.totalBookings ?? 0}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Across all properties</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>REGISTERED GUESTS</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#0B8EE0", mt: 0.5 }}>{dashboardData?.totalGuests ?? 0}</Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>Unique guest profiles</Typography>
                </Paper>

                <Paper sx={{ p: 2, borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700 }}>PENDING FOLIO DUES</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#EF4444", mt: 0.5 }}>{formatCurrency(dashboardData?.pendingPayments ?? 0)}</Typography>
                  <Typography variant="caption" sx={{ color: "#EF4444", fontWeight: 700 }}>Uncollected guest dues</Typography>
                </Paper>
              </Box>

              {/* Financial Security & Compliance Card */}
              <Paper sx={{ p: 2.5, borderRadius: "18px", bgcolor: isDarkMode ? "rgba(255,255,255,0.02)" : themeConfig.champagne, border: `1px solid ${themeConfig.border}` }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: themeConfig.textMain, mb: 1 }}>
                  Enterprise Multi-Tenant Financial Ledger Protocol
                </Typography>
                <Typography variant="body2" sx={{ color: themeConfig.textMuted, lineHeight: 1.6 }}>
                  Every transaction processed on the platform is cryptographically linked to individual tenant IDs with isolated billing vaults, automated GST invoice reconciliation, and real-time audit logging.
                </Typography>
              </Paper>
            </Box>
          )}

          {/* ======================================================== */}
          {/* 5, 6, 7, 8. HOTEL LIST VIEWS (Total, Active, Pending, Suspended) */}
          {/* ======================================================== */}
          {(detailModal.type === "TOTAL_HOTELS" ||
            detailModal.type === "ACTIVE_HOTELS" ||
            detailModal.type === "PENDING_APPROVALS" ||
            detailModal.type === "DISABLED_HOTELS") && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* Top Quick Filter Bar */}
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={`All (${hotels.length})`}
                    size="small"
                    onClick={() => setDetailModal((prev) => ({ ...prev, type: "TOTAL_HOTELS" }))}
                    sx={{
                      fontWeight: 800,
                      cursor: "pointer",
                      bgcolor: detailModal.type === "TOTAL_HOTELS" ? themeConfig.primary : themeConfig.bgMain,
                      color: detailModal.type === "TOTAL_HOTELS" ? "#FFFFFF" : themeConfig.textMain,
                    }}
                  />
                  <Chip
                    label={`Active (${totalActive})`}
                    size="small"
                    onClick={() => setDetailModal((prev) => ({ ...prev, type: "ACTIVE_HOTELS" }))}
                    sx={{
                      fontWeight: 800,
                      cursor: "pointer",
                      bgcolor: detailModal.type === "ACTIVE_HOTELS" ? themeConfig.success : themeConfig.bgMain,
                      color: detailModal.type === "ACTIVE_HOTELS" ? "#FFFFFF" : themeConfig.textMain,
                    }}
                  />
                  <Chip
                    label={`Pending (${totalPending})`}
                    size="small"
                    onClick={() => setDetailModal((prev) => ({ ...prev, type: "PENDING_APPROVALS" }))}
                    sx={{
                      fontWeight: 800,
                      cursor: "pointer",
                      bgcolor: detailModal.type === "PENDING_APPROVALS" ? themeConfig.warning : themeConfig.bgMain,
                      color: detailModal.type === "PENDING_APPROVALS" ? "#FFFFFF" : themeConfig.textMain,
                    }}
                  />
                  <Chip
                    label={`Suspended (${totalDisabled})`}
                    size="small"
                    onClick={() => setDetailModal((prev) => ({ ...prev, type: "DISABLED_HOTELS" }))}
                    sx={{
                      fontWeight: 800,
                      cursor: "pointer",
                      bgcolor: detailModal.type === "DISABLED_HOTELS" ? themeConfig.danger : themeConfig.bgMain,
                      color: detailModal.type === "DISABLED_HOTELS" ? "#FFFFFF" : themeConfig.textMain,
                    }}
                  />
                </Box>

                <TextField
                  size="small"
                  placeholder="Search hotel, owner, city..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  sx={{ width: { xs: "100%", sm: 260 }, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: themeConfig.primary, fontSize: 18 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Table / List */}
              {modalFilteredHotels.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: "16px", bgcolor: themeConfig.bgMain, border: `1px solid ${themeConfig.border}` }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                    No matching hotel properties found
                  </Typography>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
                    {modalSearch ? "Try adjusting your search criteria" : "There are currently no properties under this status."}
                  </Typography>
                </Paper>
              ) : (
                <TableContainer component={Paper} sx={{ borderRadius: "16px", border: `1px solid ${themeConfig.border}`, maxHeight: 380 }}>
                  <Table size="small" stickyHeader>
                    <TableHead sx={{ bgcolor: themeConfig.champagne }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>HOTEL PROPERTY</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>LOCATION</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>OWNER CONTACT</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>ROOMS</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: themeConfig.textMain }}>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modalFilteredHotels.map((hotel) => (
                        <TableRow
                          key={hotel._id || hotel.id}
                          hover
                          onClick={() => {
                            handleCloseDetailModal();
                            if (onTabChange) onTabChange(1);
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell sx={{ py: 1.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Avatar sx={{ width: 34, height: 34, borderRadius: "10px", bgcolor: themeConfig.primary, fontSize: "0.8rem", fontWeight: 800 }}>
                                {(hotel.name || "H").charAt(0).toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
                                  {hotel.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.7rem" }}>
                                  Code: {hotel.hotelCode || hotel.code || "PMS"}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: "0.8rem", color: themeConfig.textMain }}>
                              {hotel.city || "Location N/A"}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.7rem" }}>
                              {hotel.state || ""}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: "0.8rem", color: themeConfig.textMain }}>
                              {hotel.ownerName || hotel.admin?.name || "N/A"}
                            </Typography>
                            <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.7rem" }}>
                              {hotel.ownerEmail || hotel.admin?.email || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.8rem", color: themeConfig.textMain }}>
                              {hotel.totalRooms || 20} Rooms
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={hotel.status || "ACTIVE"}
                              size="small"
                              sx={{
                                fontWeight: 800,
                                fontSize: "0.68rem",
                                borderRadius: "6px",
                                bgcolor:
                                  hotel.status === "ACTIVE"
                                    ? "rgba(16, 185, 129, 0.15)"
                                    : hotel.status === "PENDING" || hotel.status === "PENDING_APPROVAL"
                                    ? "rgba(245, 158, 11, 0.15)"
                                    : "rgba(220, 38, 38, 0.15)",
                                color:
                                  hotel.status === "ACTIVE"
                                    ? "#10B981"
                                    : hotel.status === "PENDING" || hotel.status === "PENDING_APPROVAL"
                                    ? "#F59E0B"
                                    : "#EF4444",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </DialogContent>

        {/* Modal Footer Actions */}
        <DialogActions
          sx={{
            p: 2.5,
            px: 3,
            bgcolor: themeConfig.bgMain,
            borderTop: `1px solid ${themeConfig.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={handleCloseDetailModal} sx={{ fontWeight: 700, color: themeConfig.textMuted, borderRadius: "10px" }}>
            Close Window
          </Button>

          {detailModal.type !== "STAFF_USERS" && (
          <Button
            variant="contained"
            className="btn-3d"
            onClick={() => {
              handleCloseDetailModal();
              if (
                detailModal.type === "TOTAL_HOTELS" ||
                detailModal.type === "ACTIVE_HOTELS" ||
                detailModal.type === "PENDING_APPROVALS" ||
                detailModal.type === "DISABLED_HOTELS" ||
                detailModal.type === "TODAY_REVENUE"
              ) {
                if (onTabChange) onTabChange(1);
              } else if (detailModal.type === "MONTHLY_REVENUE" || detailModal.type === "TOTAL_ORDERS") {
                if (onTabChange) onTabChange(2);
              } else if (detailModal.type === "TOTAL_PLATFORM_REVENUE") {
                if (onTabChange) onTabChange(3);
              }
            }}
            sx={{
              borderRadius: "12px",
              bgcolor: themeConfig.primary,
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.82rem",
              px: 3,
              py: 1,
            }}
          >
            {detailModal.type === "MONTHLY_REVENUE" || detailModal.type === "TOTAL_ORDERS"
              ? "Open Subscription Plans →"
              : detailModal.type === "TOTAL_PLATFORM_REVENUE"
              ? "Open Security & Audit Logs →"
              : "Open Full Hotels Directory →"}
          </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
