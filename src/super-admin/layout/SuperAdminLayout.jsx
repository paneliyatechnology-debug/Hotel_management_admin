"use client";

import DashboardLayout from "@/shared/layout/DashboardLayout";
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  HourglassEmpty,
  CreditCard,
  Shield,
  Settings,
} from "@mui/icons-material";

export const SUPER_ADMIN_NAV = [
  { label: "Dashboard", shortLabel: "Overview", path: "overview", icon: <DashboardIcon fontSize="small" /> },
  { label: "Hotels Directory", shortLabel: "Hotels", path: "hotels", icon: <BusinessIcon fontSize="small" /> },
  { label: "Pending Approvals", shortLabel: "Approvals", path: "approvals", icon: <HourglassEmpty fontSize="small" /> },
  { label: "Subscription Plans", shortLabel: "Plans", path: "subscriptions", icon: <CreditCard fontSize="small" /> },
  { label: "Security & Audit Logs", shortLabel: "Logs", path: "audit-logs", icon: <Shield fontSize="small" /> },
  { label: "Profile & Settings", shortLabel: "Settings", path: "settings", icon: <Settings fontSize="small" /> },
];

export default function SuperAdminLayout({ user, activeTab, onTabChange, onLogout, children }) {
  return (
    <DashboardLayout
      user={user}
      navItems={SUPER_ADMIN_NAV}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}
