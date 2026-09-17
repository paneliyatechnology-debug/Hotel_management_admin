"use client";

import DashboardLayout from "@/shared/layout/DashboardLayout";
import {
  Bed,
  HowToReg,
  Add,
  AssignmentTurnedIn,
  Receipt,
  Settings,
} from "@mui/icons-material";

export const RECEPTIONIST_NAV = [
  { label: "Available Rooms", shortLabel: "Rooms", path: "rooms", icon: <Bed fontSize="small" /> },
  { label: "In-House Folios", shortLabel: "Folios", path: "folios", icon: <HowToReg fontSize="small" /> },
  { label: "5-Step Check-In", shortLabel: "Check-In", path: "check-in", icon: <Add fontSize="small" /> },
  { label: "Govt ID Compliance", shortLabel: "ID Check", path: "id-compliance", icon: <AssignmentTurnedIn fontSize="small" /> },
  { label: "POS Settlement Desk", shortLabel: "POS", path: "pos-billing", icon: <Receipt fontSize="small" /> },
  { label: "Profile & Settings", shortLabel: "Settings", path: "settings", icon: <Settings fontSize="small" /> },
];

export default function ReceptionistLayout({ user, activeTab, onTabChange, onLogout, children }) {
  return (
    <DashboardLayout
      user={user}
      navItems={RECEPTIONIST_NAV}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onLogout={onLogout}
    >
      {children}
    </DashboardLayout>
  );
}
