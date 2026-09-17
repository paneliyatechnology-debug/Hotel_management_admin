# 🏨 Multi-Tenant Hotel Management - Unified Admin & Front-Desk Portal

An enterprise-grade, unified administration and reception operational dashboard built with **Next.js (App Router)**, **React**, and **Material UI (MUI v9)**. Designed with multi-tenancy, custom hotel slug routing, granular role-based UI views, dark/light theme switching, and live operational widgets.

---

## 🌟 Key Portals & Capabilities

### 1. 👑 Super Admin Platform Portal
- **Platform Analytics**: Global active hotels, total revenue, pending approvals, and active subscription trends.
- **Hotel Directory**: Comprehensive list of registered properties with instant approve/reject/suspend actions.
- **Subscription Tier Builder**: Create, edit, and configure custom SaaS subscription plans with feature limits.
- **Audit Logs**: Complete platform-wide operational and security activity log with search & timestamp filters.

### 2. 🏢 Hotel Admin Dashboard
- **Property Management**: Real-time room status grid, occupancy rates, and revenue analytics.
- **Room Types & Inventory**: Manage deluxe, suite, standard categories, hourly/daily pricing, amenities, and room inventories.
- **Staff & Team Access**: Onboard receptionists, shift managers, and configure operational permissions.
- **Guest CRM & History**: Search guest profiles, previous stays, total spent, and compliance document flags.
- **Daily Collections & Financials**: Cash vs. Card vs. UPI breakdown, settlement reports, and shift handovers.
- **Subscription Management**: View plan validity, upgrade tiers, or handle renewals.

### 3. 🛎️ Receptionist Front-Desk Operations
- **Interactive Room Grid**: Visual color-coded room status (Available, Occupied, Dirty/Cleaning, Maintenance).
- **Multi-Step Check-In Wizard**:
  - Guest identity capture & Government ID verification compliance.
  - Room type and specific room selection.
  - Advance payment recording and receipt printing.
- **In-House Guest Folios**: Real-time folio billing, add extra room charges/services (food, laundry, minibar).
- **Express Check-Out & Settlement**: Instant bill calculation, tax computation, discount application, and Printable PDF Invoice generation.
- **End-of-Shift Cash Handover**: Shift closing balances, physical cash vs. digital transaction reconciliation.

### 4. 🎨 Design & Accessibility
- **Dual Themes**: Seamless Dark Mode and Light Mode switching powered by MUI Emotion theming and React Context.
- **Printable Invoices**: Native browser PDF invoice generator with hotel branding and breakdown.
- **Vanity URL Routing**: Dynamic `/[slug]` multi-tenant hotel portal routing for direct hotel staff logins.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Component Library**: [Material UI (MUI v9)](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **Frontend Library**: [React 19](https://react.dev/)
- **Styling**: Emotion Styled Components, MUI Custom Theme Tokens & Glassmorphic CSS
- **State Management**: React Context (`ThemeContext`, `AuthContext`) + Hooks

---

## 📁 Project Structure

```text
admin/
├── public/                # Static assets, logos, and vector illustrations
├── src/
│   ├── app/
│   │   ├── [slug]/        # Multi-tenant custom hotel slug entry & login
│   │   ├── globals.css    # Global stylesheet & reset rules
│   │   ├── layout.js      # Root layout with Emotion/MUI Theme Provider
│   │   └── page.js        # Main portal landing & Unified Authentication Screen
│   ├── auth/
│   │   └── components/
│   │       └── UnifiedLogin.jsx # Single sign-on for Super Admin, Hotel Admin & Staff
│   ├── config/
│   │   ├── api.js         # Centralized API service methods & endpoints
│   │   └── theme.js       # Branding colors and token definitions
│   ├── hotel-admin/       # Hotel Admin Pages & Modules
│   │   ├── components/    # Admin dashboard overview cards & widgets
│   │   ├── layout/        # Dedicated sidebar & header navigation
│   │   └── pages/         # RoomTypes, StaffTeam, GuestDirectory, DailyCollections, Subscriptions
│   ├── receptionist/      # Front-Desk Receptionist Pages & Modules
│   │   ├── components/    # Receptionist quick-action dashboards
│   │   ├── layout/        # Front-desk top bar & operational navigation
│   │   └── pages/         # AvailableRooms, CheckInWizard, InHouseFolios, PosSettlement, GovtIdCompliance
│   ├── shared/            # Reusable components & utilities
│   │   ├── components/    # StatCard, StatusChip, ConfirmDialog, EmptyState, LoadingState, Invoice
│   │   ├── context/       # ThemeContext (Dark/Light mode)
│   │   ├── layout/        # Common dashboard layout shells
│   │   └── utils/         # PDF generator & date/time formatting utilities
│   ├── super-admin/       # Platform Super Admin Portal
│   │   ├── components/    # Platform KPI cards & analytics charts
│   │   ├── layout/        # Super Admin drawer & header
│   │   └── pages/         # HotelsDirectory, PendingApprovals, SubscriptionPlans, AuditLogs
│   └── theme/
│       └── muiTheme.js    # Custom Material UI light and dark theme configurations
├── eslint.config.mjs      # Linting configuration
├── jsconfig.json          # Module path mappings
├── next.config.mjs        # Next.js server configuration
└── package.json           # Dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **Backend API Server**: Running on `http://localhost:5000`

### 2. Installation

```bash
git clone https://github.com/paneliyatechnology-debug/Hotel_management_admin.git
cd Hotel_management_admin
npm install
```

### 3. Environment Configuration

Create a `.env.local` file to point to your backend API:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 4. Running Locally

```bash
# Start the Admin Next.js development server (default port: 3001)
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser to access the Unified Admin Login.

### 5. Production Build

```bash
# Build production bundle
npm run build

# Run production server
npm start
```

---

## 🔑 Default Roles & Access

| Role | Access Scope |
| :--- | :--- |
| **Super Admin** | Full platform management, new hotel approvals, SaaS plans, global audit logs |
| **Hotel Admin** | Property configuration, rooms inventory, staff accounts, revenue & collections |
| **Receptionist** | Front-desk operations, guest check-ins/outs, folios, billing & cash handover |

---

## 📜 License

This project is proprietary and confidential. Developed by Paneliya Technology.
