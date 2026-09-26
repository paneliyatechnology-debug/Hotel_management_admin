"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  ButtonGroup,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalanceWallet,
  Speed,
  AccessTime,
  Hotel as HotelIcon,
  AutoAwesome,
  Circle,
  Payments,
  CurrencyRupee,
  CheckCircle,
  Schedule,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";

/**
 * 1. OCCUPANCY RADIAL DONUT CHART (Custom High-End SVG)
 */
export function OccupancyDonutChart({ rooms = [] }) {
  const { themeConfig, isDarkMode } = useAppTheme();
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const total = rooms.length || 1;
  const occupied = rooms.filter((r) => r.status === "OCCUPIED").length;
  const available = rooms.filter((r) => r.status === "AVAILABLE").length;
  const cleaning = rooms.filter((r) => r.status === "CLEANING").length;
  const maintenance = rooms.filter((r) => r.status === "MAINTENANCE" || r.status === "BLOCKED").length;

  const occRate = Math.round((occupied / total) * 100);

  const segments = [
    { label: "Occupied", count: occupied, color: "#3B82F6", grad: "url(#donutOccupied)", desc: "Currently in room" },
    { label: "Available", count: available, color: "#10B981", grad: "url(#donutAvailable)", desc: "Ready for check-in" },
    { label: "Cleaning", count: cleaning, color: "#F59E0B", grad: "url(#donutCleaning)", desc: "In turnaround" },
    { label: "Maintenance", count: maintenance, color: "#EF4444", grad: "url(#donutMaint)", desc: "Blocked / Repair" },
  ];

  // Calculate SVG arc paths
  const size = 220;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;
  const arcs = segments.map((seg) => {
    const strokeDash = (seg.count / total) * circumference;
    const offset = accumulatedOffset;
    accumulatedOffset += strokeDash;
    return {
      ...seg,
      strokeDasharray: `${strokeDash} ${circumference - strokeDash}`,
      strokeDashoffset: -offset,
      percent: Math.round((seg.count / total) * 100),
    };
  });

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: `1px solid ${themeConfig.border}`,
        bgcolor: isDarkMode ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 10px 30px rgba(67, 97, 238, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
              <HotelIcon sx={{ color: "#3B82F6", fontSize: 22 }} />
              Live Room Occupancy
            </Typography>
            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
              Real-time room status breakdown
            </Typography>
          </Box>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: "14px !important", color: "#10B981" }} />}
            label={`${occRate}% Occupied`}
            size="small"
            sx={{
              fontWeight: 800,
              bgcolor: "rgba(16, 185, 129, 0.12)",
              color: "#10B981",
              border: "1px solid rgba(16, 185, 129, 0.25)",
            }}
          />
        </Box>

        {/* Circular Donut Visual */}
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", my: "auto", py: 1 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="donutOccupied" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="donutAvailable" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="donutCleaning" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="donutMaint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {arcs.map((arc, i) =>
              arc.count > 0 ? (
                <circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={arc.grad}
                  strokeWidth={hoveredSegment === arc.label ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={arc.strokeDasharray}
                  strokeDashoffset={arc.strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredSegment(arc.label)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              ) : null
            )}
          </svg>

          {/* Center Hub Display */}
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1 }}>
              {hoveredSegment
                ? segments.find((s) => s.label === hoveredSegment)?.count
                : `${occRate}%`}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMuted, textTransform: "uppercase", mt: 0.5, letterSpacing: "0.05em" }}>
              {hoveredSegment
                ? hoveredSegment
                : "Occupancy"}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.68rem", color: themeConfig.primary, fontWeight: 800 }}>
              {total} Total Rooms
            </Typography>
          </Box>
        </Box>

        {/* Legend Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)" },
            gap: 1.5,
            mt: 2,
          }}
        >
          {segments.map((s) => {
            const pct = Math.round((s.count / total) * 100);
            return (
              <Box
                key={s.label}
                onMouseEnter={() => setHoveredSegment(s.label)}
                onMouseLeave={() => setHoveredSegment(null)}
                sx={{
                  p: 1.2,
                  borderRadius: "12px",
                  bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  border: hoveredSegment === s.label ? `1px solid ${s.color}` : `1px solid transparent`,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain }}>
                    {s.label}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
                    {s.count}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: "0.65rem", color: themeConfig.textMuted, ml: 0.5 }}>
                    ({pct}%)
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * 2. 7-DAY REVENUE & PAYMENT FLOW GRADIENT AREA GRAPH
 */
export function RevenueWaveChart({ dashboardData, isDarkMode }) {
  const { themeConfig } = useAppTheme();
  const [timeRange, setTimeRange] = useState("7D");
  const [activePoint, setActivePoint] = useState(null);

  // Generate realistic 7-day revenue trend based on today's revenue
  const todayRev = Number(dashboardData?.financials?.todayRevenue ?? dashboardData?.todayRevenue ?? 18500);

  const revenueData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Today"];
    const baseMultipliers = [0.65, 0.78, 0.72, 0.85, 0.92, 1.15, 1.0];
    return days.map((day, idx) => {
      const mult = baseMultipliers[idx] * (0.9 + Math.random() * 0.2);
      const total = Math.max(3000, Math.round(todayRev * mult));
      const upi = Math.round(total * 0.68);
      const cash = total - upi;
      return { day, total, upi, cash, index: idx };
    });
  }, [todayRev]);

  // SVG Chart Geometry
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };

  const maxVal = Math.max(...revenueData.map((d) => d.total)) * 1.15 || 25000;
  const minVal = 0;

  const points = revenueData.map((d, i) => {
    const x = padding.left + (i / (revenueData.length - 1)) * (width - padding.left - padding.right);
    const y = height - padding.bottom - ((d.total - minVal) / (maxVal - minVal)) * (height - padding.top - padding.bottom);
    return { x, y, ...d };
  });

  // Create smooth Bezier curve string
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  const totalWeek = revenueData.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: `1px solid ${themeConfig.border}`,
        bgcolor: isDarkMode ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 10px 30px rgba(67, 97, 238, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
              <TrendingUp sx={{ color: "#10B981", fontSize: 22 }} />
              Revenue &amp; Collection Dynamics
            </Typography>
            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
              7-Day Total Collection: <strong style={{ color: themeConfig.primary }}>₹{totalWeek.toLocaleString("en-IN")}</strong>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              size="small"
              label="⚡ 68% UPI"
              sx={{ fontWeight: 800, bgcolor: "rgba(67, 97, 238, 0.12)", color: "#4361EE", fontSize: "0.72rem" }}
            />
            <Chip
              size="small"
              label="💵 32% Cash"
              sx={{ fontWeight: 800, bgcolor: "rgba(16, 185, 129, 0.12)", color: "#10B981", fontSize: "0.72rem" }}
            />
          </Box>
        </Box>

        {/* SVG Curve Chart */}
        <Box sx={{ position: "relative", width: "100%", height: height, my: "auto" }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: "100%", height: "100%", overflow: "visible" }}
            onMouseLeave={() => setActivePoint(null)}
          >
            <defs>
              <linearGradient id="revAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4361EE" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#4361EE" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#4361EE" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="revLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
              const yVal = height - padding.bottom - ratio * (height - padding.top - padding.bottom);
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={yVal}
                  x2={width - padding.right}
                  y2={yVal}
                  stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#revAreaGrad)" />

            {/* Glowing Stroke Line */}
            <path
              d={linePath}
              fill="none"
              stroke="url(#revLineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 4px 8px rgba(67, 97, 238, 0.35))" }}
            />

            {/* Points & Interactive Hover Area */}
            {points.map((pt, idx) => (
              <g key={idx}>
                {/* Invisible large touch target */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActivePoint(pt)}
                />
                {/* Visible Data Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={activePoint?.day === pt.day ? 6 : 4}
                  fill="#FFFFFF"
                  stroke="#4361EE"
                  strokeWidth={activePoint?.day === pt.day ? 3 : 2}
                  style={{
                    transition: "all 0.2s ease",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                />
                {/* X-axis Day Label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  fill={activePoint?.day === pt.day ? themeConfig.primary : themeConfig.textMuted}
                  fontSize="10.5"
                  fontWeight={activePoint?.day === pt.day ? "800" : "600"}
                >
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>

          {/* Interactive Floating Tooltip */}
          {activePoint && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: `${(activePoint.x / width) * 100}%`,
                transform: "translate(-50%, -10%)",
                bgcolor: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(30, 41, 59, 0.95)",
                color: "#FFFFFF",
                p: 1.2,
                borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.15)",
                pointerEvents: "none",
                minWidth: "120px",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#93C5FD", display: "block" }}>
                {activePoint.day} Collection
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 900, color: "#10B981" }}>
                ₹{activePoint.total.toLocaleString("en-IN")}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mt: 0.5, fontSize: "0.65rem", color: "#CBD5E1" }}>
                <span>UPI: ₹{activePoint.upi}</span>
                <span>Cash: ₹{activePoint.cash}</span>
              </Box>
            </Box>
          )}
        </Box>

        {/* Quick Highlights bottom bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5, borderTop: `1px solid ${themeConfig.border}`, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#10B981" }} />
            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
              Projected Month End: <strong style={{ color: themeConfig.textMain }}>₹{(todayRev * 30).toLocaleString("en-IN")}</strong>
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 800 }}>
            +14.8% vs last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * 3. DAILY REVENUE TARGET SPEEDOMETER / RADIAL GAUGE
 */
export function DailyTargetGauge({ currentRevenue = 18500, targetRevenue = 25000 }) {
  const { themeConfig, isDarkMode } = useAppTheme();

  const percentage = Math.min(100, Math.round((currentRevenue / targetRevenue) * 100));

  // 180-degree semi-circle gauge
  const size = 180;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const arcLength = Math.PI * radius; // Half circumference
  const strokeDash = (percentage / 100) * arcLength;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: `1px solid ${themeConfig.border}`,
        bgcolor: isDarkMode ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 10px 30px rgba(67, 97, 238, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
            <Speed sx={{ color: "#F59E0B", fontSize: 22 }} />
            Daily Revenue Goal
          </Typography>
          <Chip
            size="small"
            label={percentage >= 100 ? "🎯 Target Achieved" : "⚡ In Progress"}
            sx={{
              fontWeight: 800,
              bgcolor: percentage >= 100 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
              color: percentage >= 100 ? "#10B981" : "#F59E0B",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: themeConfig.textMuted, mb: 1 }}>
          Target: ₹{targetRevenue.toLocaleString("en-IN")} / Day
        </Typography>

        {/* Semi Circle Gauge SVG */}
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", my: "auto" }}>
          <svg width={size} height={size / 2 + 25} viewBox={`0 0 ${size} ${size / 2 + 25}`}>
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Background Arc */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke={isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Progress Arc */}
            <path
              d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${strokeDash} ${arcLength}`}
              strokeLinecap="round"
              style={{
                transition: "stroke-dasharray 1s ease-in-out",
                filter: "drop-shadow(0 4px 10px rgba(67, 97, 238, 0.3))",
              }}
            />
          </svg>

          {/* Needle / Value In Center */}
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 900, color: themeConfig.textMain, lineHeight: 1 }}>
              {percentage}%
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#10B981", mt: 0.3 }}>
              ₹{currentRevenue.toLocaleString("en-IN")} Achieved
            </Typography>
          </Box>
        </Box>

        {/* Bottom target remaining indicator */}
        <Box sx={{ p: 1.2, borderRadius: "12px", bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
            Remaining to Goal:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 900, color: themeConfig.textMain }}>
            ₹{Math.max(0, targetRevenue - currentRevenue).toLocaleString("en-IN")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * 4. HOURLY RECEPTION ACTIVITY & RUSH HOUR HEAT BARS
 */
export function HourlyActivityBarChart() {
  const { themeConfig, isDarkMode } = useAppTheme();

  const hourlyData = [
    { hour: "8 AM", checkins: 2, checkouts: 4, label: "Morning Checkout" },
    { hour: "10 AM", checkins: 5, checkouts: 9, label: "Peak Checkout", isPeak: true },
    { hour: "12 PM", checkins: 8, checkouts: 6, label: "Turnaround Rush", isPeak: true },
    { hour: "2 PM", checkins: 11, checkouts: 2, label: "Peak Check-in", isPeak: true },
    { hour: "4 PM", checkins: 7, checkouts: 1, label: "Afternoon Check-in" },
    { hour: "6 PM", checkins: 9, checkouts: 2, label: "Evening Arrivals", isPeak: true },
    { hour: "8 PM", checkins: 4, checkouts: 0, label: "Night Check-in" },
    { hour: "10 PM", checkins: 2, checkouts: 0, label: "Late Night" },
  ];

  const maxVal = 14;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: `1px solid ${themeConfig.border}`,
        bgcolor: isDarkMode ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 10px 30px rgba(67, 97, 238, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule sx={{ color: "#6366F1", fontSize: 22 }} />
              Hourly Reception Traffic
            </Typography>
            <Typography variant="caption" sx={{ color: themeConfig.textMuted }}>
              Guest Check-in vs Check-out flow
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#3B82F6" }} />
              <Typography variant="caption" sx={{ fontSize: "0.68rem", color: themeConfig.textMuted }}>In</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#EC4899" }} />
              <Typography variant="caption" sx={{ fontSize: "0.68rem", color: themeConfig.textMuted }}>Out</Typography>
            </Box>
          </Box>
        </Box>

        {/* Bars Container */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 160, pt: 2, pb: 1, my: "auto" }}>
          {hourlyData.map((d, i) => {
            const inHeight = (d.checkins / maxVal) * 110;
            const outHeight = (d.checkouts / maxVal) * 110;
            return (
              <Tooltip
                key={i}
                title={`${d.hour}: ${d.checkins} Check-ins, ${d.checkouts} Check-outs (${d.label})`}
                arrow
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    cursor: "pointer",
                    "&:hover .bar-in": { transform: "scaleY(1.08)" },
                    "&:hover .bar-out": { transform: "scaleY(1.08)" },
                  }}
                >
                  {d.isPeak && (
                    <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: "#EF4444", mb: 0.5, lineHeight: 1 }}>
                      🔥
                    </Typography>
                  )}
                  {/* Paired Bars */}
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: "3px", height: 110 }}>
                    {/* In Bar */}
                    <Box
                      className="bar-in"
                      sx={{
                        width: 8,
                        height: `${inHeight}px`,
                        borderRadius: "4px 4px 0 0",
                        bgcolor: "#3B82F6",
                        background: "linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)",
                        transition: "transform 0.2s ease",
                        transformOrigin: "bottom",
                      }}
                    />
                    {/* Out Bar */}
                    <Box
                      className="bar-out"
                      sx={{
                        width: 8,
                        height: `${outHeight}px`,
                        borderRadius: "4px 4px 0 0",
                        bgcolor: "#EC4899",
                        background: "linear-gradient(180deg, #F472B6 0%, #DB2777 100%)",
                        transition: "transform 0.2s ease",
                        transformOrigin: "bottom",
                      }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ fontSize: "0.62rem", fontWeight: 700, color: themeConfig.textMuted, mt: 1 }}>
                    {d.hour}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontSize: "0.72rem" }}>
            Peak Turnaround Window:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.primary, fontSize: "0.72rem" }}>
            11:00 AM – 2:30 PM
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
