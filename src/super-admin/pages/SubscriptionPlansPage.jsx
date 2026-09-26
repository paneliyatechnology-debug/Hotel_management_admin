"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Check,
  Add,
  Edit,
  Delete,
  Close,
  Domain,
  AutoAwesome,
  WorkspacePremium,
  Layers,
  CheckCircle,
} from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import EmptyState from "@/shared/components/EmptyState";
import ConfirmDialog from "@/shared/components/ConfirmDialog";

export default function SubscriptionPlansPage() {
  const { themeConfig } = useAppTheme();

  const [plans, setPlans] = useState([]);
  const [meta, setMeta] = useState({
    monthlyCount: 0,
    maxMonthly: 3,
    canAddMonthly: true,
    annualCount: 0,
    maxAnnual: 3,
    canAddAnnual: true,
    totalCount: 0,
    maxTotal: 6,
    canAddTotal: true,
  });
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("ANNUAL"); // "MONTHLY" | "ANNUAL"

  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: "", message: "", onConfirm: null });

  const [planModal, setPlanModal] = useState({
    open: false,
    mode: "ADD",
    data: getInitialPlanForm(),
  });

  function getInitialPlanForm(cycle = billingCycle) {
    return {
      _id: "",
      name: "",
      billingCycle: cycle,
      price: cycle === "ANNUAL" ? 6399 : 7999,
      discountPercent: cycle === "ANNUAL" ? 20 : 0,
      maxRooms: 75,
      description: "Designed for premium luxury resorts & business hotels",
      featuresText: "Full 30-Day Free Trial\nUp to 75 Room Inventory\nUnlimited Receptionist Accounts\nAutomated GST Folio & Invoicing\nMulti-Method Payment Tracking\nAutomated Email Notifications\nPriority 24/7 Phone & Email Support\nComprehensive Audit Log Logs",
      badge: "MOST POPULAR",
      isPopular: true,
      isActive: true,
      displayOrder: 1,
    };
  }

  const showToast = (message, severity = "success") => {
    setNotification({ show: true, message, severity });
    setTimeout(() => setNotification({ show: false, message: "", severity: "success" }), 4000);
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.ADMIN_ALL);
      if (res?.data) {
        setPlans(res.data);
      }
      if (res?.meta) {
        setMeta(res.meta);
      }
    } catch (err) {
      showToast(err.message || "Failed to load subscription plans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Condition-based plan filter: only show plans for the active billing cycle
  const currentPlans = plans.filter((p) => p.billingCycle === billingCycle);

  const isCurrentCycleFull = billingCycle === "MONTHLY" ? meta.monthlyCount >= 3 : meta.annualCount >= 3;

  const handleOpenAddModal = () => {
    if (meta.totalCount >= 6) {
      showToast("Maximum limit of 6 total subscription plans has been reached.", "warning");
      return;
    }
    if (isCurrentCycleFull) {
      showToast(`Maximum 3 ${billingCycle} plans already created. Switch to ${billingCycle === "MONTHLY" ? "Annual" : "Monthly"} to create more.`, "warning");
      return;
    }
    setPlanModal({ open: true, mode: "ADD", data: getInitialPlanForm(billingCycle) });
  };

  const handleOpenEditModal = (plan) => {
    setPlanModal({
      open: true,
      mode: "EDIT",
      data: {
        ...plan,
        featuresText: Array.isArray(plan.features) ? plan.features.join("\n") : "",
      },
    });
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (!planModal.data.name || !planModal.data.price) {
      showToast("Plan Name and Price are required", "error");
      return;
    }

    const payload = {
      name: planModal.data.name,
      billingCycle: planModal.data.billingCycle,
      price: Number(planModal.data.price),
      discountPercent: Number(planModal.data.discountPercent) || 0,
      maxRooms: Number(planModal.data.maxRooms) || 50,
      description: planModal.data.description || "",
      features: (planModal.data.featuresText || "").split("\n").map((s) => s.trim()).filter(Boolean),
      badge: planModal.data.badge || "",
      isPopular: Boolean(planModal.data.isPopular),
      isActive: Boolean(planModal.data.isActive),
      displayOrder: Number(planModal.data.displayOrder) || 1,
    };

    try {
      if (planModal.mode === "ADD") {
        const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.CREATE, {
          method: "POST",
          body: payload,
        });
        showToast(res.message || "Subscription plan created successfully!");
      } else {
        const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.UPDATE(planModal.data._id), {
          method: "PUT",
          body: payload,
        });
        showToast(res.message || "Subscription plan updated successfully!");
      }
      setPlanModal({ open: false, mode: "ADD", data: getInitialPlanForm() });
      fetchPlans();
    } catch (err) {
      showToast(err.message || "Failed to save subscription plan", "error");
    }
  };

  const handleTogglePlanActive = async (plan) => {
    try {
      const newStatus = !(plan.isActive !== false);
      const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.UPDATE(plan._id), {
        method: "PUT",
        body: { ...plan, isActive: newStatus },
      });
      showToast(`Plan '${plan.name}' is now ${newStatus ? "Active" : "Disabled"}`);
      fetchPlans();
    } catch (err) {
      showToast(err.message || "Failed to update plan status", "error");
    }
  };

  const handleDeletePlan = (plan) => {
    setConfirmDialog({
      open: true,
      title: "Archive Subscription Plan",
      message: `Are you sure you want to delete '${plan.name}' (${plan.billingCycle})?`,
      onConfirm: async () => {
        try {
          const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.DELETE(plan._id), {
            method: "DELETE",
          });
          showToast(res.message || "Subscription plan archived.");
          fetchPlans();
        } catch (err) {
          showToast(err.message || "Failed to delete plan", "error");
        } finally {
          setConfirmDialog({ open: false, title: "", message: "", onConfirm: null });
        }
      },
    });
  };

  const getPlanIcon = (idx, name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("palace") || lower.includes("enterprise") || idx === 2) {
      return (
        <Box
          sx={{
            p: 1,
            borderRadius: "10px",
            background: `linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)`,
            border: "1px solid #E9D5FF",
            boxShadow: "0 2px 6px rgba(126, 34, 206, 0.12), inset 0 1px 0 #FFFFFF",
            display: "inline-flex",
          }}
        >
          <WorkspacePremium sx={{ color: "#7E22CE", fontSize: 20 }} />
        </Box>
      );
    }
    if (lower.includes("resort") || lower.includes("pro") || idx === 1) {
      return (
        <Box
          sx={{
            p: 1,
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)`,
            border: `1px solid ${themeConfig.border}`,
            boxShadow: `0 2px 6px ${themeConfig.primaryGlow}, inset 0 1px 0 #FFFFFF`,
            display: "inline-flex",
          }}
        >
          <AutoAwesome sx={{ color: themeConfig.primary, fontSize: 20 }} />
        </Box>
      );
    }
    return (
      <Box
        sx={{
          p: 1,
          borderRadius: "10px",
          background: `linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%)`,
          border: "1px solid #E2E8F0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 #FFFFFF",
          display: "inline-flex",
        }}
      >
        <Domain sx={{ color: themeConfig.textMain, fontSize: 20 }} />
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pt: { xs: 2, sm: 2.5 }, pb: { xs: 12, sm: 4 }, px: { xs: 1.5, sm: 2.5 } }}>
      {/* Toast */}
      {notification.show && (
        <Alert
          severity={notification.severity}
          sx={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            bgcolor: notification.severity === "success" ? "#FAF9F6" : "#FFF5F5",
            border: `1px solid ${notification.severity === "success" ? themeConfig.success : themeConfig.danger}`,
          }}
        >
          {notification.message}
        </Alert>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ open: false, title: "", message: "", onConfirm: null })}
      />

      {/* 3D Master Quota & Architecture Ribbon (Compact 3D Design) */}
      <Card
        className="card-3d"
        sx={{
          mb: 2.5,
          p: { xs: 1.8, sm: 2.2 },
          borderRadius: "18px",
          background: `linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)`,
          border: `1px solid ${themeConfig.border}`,
          boxShadow: "0 8px 20px -4px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", md: "center" }, gap: 2 }}>
          <div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.25 }}>
              <AutoAwesome sx={{ fontSize: 16, color: themeConfig.primary }} />
              <Typography variant="caption" sx={{ fontWeight: 800, textTransform: "uppercase", color: themeConfig.primary, letterSpacing: 0.8, fontSize: "0.7rem" }}>
                Commercial Subscription Architecture
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: -0.3, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
              Subscription Tier Governance &amp; Quota
            </Typography>
            <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.78rem", mt: 0.25 }}>
              Strict 3 Monthly &amp; 3 Annual quota management (max 6 active commercial tiers).
            </Typography>
          </div>

          {/* 3D Quota Telemetry Gauges */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, auto)" }, alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
            <Box
              sx={{
                py: 0.8,
                px: { xs: 1, sm: 1.8 },
                borderRadius: "12px",
                background: `linear-gradient(135deg, #F8FAFC 0%, ${themeConfig.champagne} 100%)`,
                border: `1px solid ${themeConfig.border}`,
                boxShadow: "0 2px 5px rgba(0,0,0,0.03), inset 0 1px 0 #FFFFFF",
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, display: "block", fontSize: { xs: "0.62rem", sm: "0.68rem" } }}>
                Monthly
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark, fontSize: "0.95rem" }}>
                {meta.monthlyCount} / 3
              </Typography>
            </Box>

            <Box
              sx={{
                py: 0.8,
                px: { xs: 1, sm: 1.8 },
                borderRadius: "12px",
                background: `linear-gradient(135deg, #F8FAFC 0%, ${themeConfig.champagne} 100%)`,
                border: `1px solid ${themeConfig.border}`,
                boxShadow: "0 2px 5px rgba(0,0,0,0.03), inset 0 1px 0 #FFFFFF",
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeConfig.textMuted, display: "block", fontSize: { xs: "0.62rem", sm: "0.68rem" } }}>
                Annual
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: themeConfig.primaryDark, fontSize: "0.95rem" }}>
                {meta.annualCount} / 3
              </Typography>
            </Box>

            <Box
              sx={{
                py: 0.8,
                px: { xs: 1, sm: 1.8 },
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                color: "#FFFFFF",
                boxShadow: `0 4px 10px ${themeConfig.primaryGlow}`,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.85)", display: "block", fontSize: { xs: "0.62rem", sm: "0.68rem" } }}>
                Total Active
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#FFFFFF", fontSize: "0.95rem" }}>
                {meta.totalCount} / 6
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5, borderColor: themeConfig.border }} />

        {/* 3D Cycle Switcher & Action Controls */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 1.5 }}>
          {/* Condition-based 3D Pill Switcher */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: "4px",
              borderRadius: "14px",
              bgcolor: themeConfig.champagne,
              border: `1px solid ${themeConfig.border}`,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              onClick={() => setBillingCycle("MONTHLY")}
              sx={{
                flex: { xs: 1, sm: "none" },
                borderRadius: "10px",
                px: { xs: 1.2, sm: 2.2 },
                py: 0.6,
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                fontWeight: 800,
                textTransform: "none",
                bgcolor: billingCycle === "MONTHLY" ? "#FFFFFF" : "transparent",
                color: billingCycle === "MONTHLY" ? themeConfig.primaryDark : themeConfig.textMuted,
                boxShadow: billingCycle === "MONTHLY" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: billingCycle === "MONTHLY" ? "#FFFFFF" : "rgba(255,255,255,0.4)" },
              }}
            >
              Monthly ({meta.monthlyCount}/3)
            </Button>
            <Button
              onClick={() => setBillingCycle("ANNUAL")}
              sx={{
                flex: { xs: 1, sm: "none" },
                borderRadius: "10px",
                px: { xs: 1.2, sm: 2.2 },
                py: 0.6,
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                fontWeight: 800,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.8,
                bgcolor: billingCycle === "ANNUAL" ? "#FFFFFF" : "transparent",
                color: billingCycle === "ANNUAL" ? themeConfig.primaryDark : themeConfig.textMuted,
                boxShadow: billingCycle === "ANNUAL" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: billingCycle === "ANNUAL" ? "#FFFFFF" : "rgba(255,255,255,0.4)" },
              }}
            >
              <span>Annual ({meta.annualCount}/3)</span>
              <Chip
                label="Save 20%"
                size="small"
                sx={{
                  bgcolor: themeConfig.successBg,
                  color: themeConfig.success,
                  fontWeight: 900,
                  height: 18,
                  fontSize: "0.62rem",
                  borderRadius: "5px",
                }}
              />
            </Button>
          </Box>

          {/* 3D Create Plan Button */}
          <Button
            variant="contained"
            startIcon={<Add />}
            disabled={meta.totalCount >= 6 || isCurrentCycleFull}
            onClick={handleOpenAddModal}
            className="btn-3d"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 800,
              fontSize: { xs: "0.78rem", sm: "0.8rem" },
              background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
              color: "#FFFFFF",
              px: 2.2,
              py: 0.8,
              boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            {isCurrentCycleFull
              ? `Max 3 ${billingCycle} Plans Reached`
              : ` Create ${billingCycle === "MONTHLY" ? "Monthly" : "Annual"} Plan (${billingCycle === "MONTHLY" ? meta.monthlyCount : meta.annualCount}/3)`}
          </Button>
        </Box>
      </Card>

      {/* 3D Pricing Cards Grid (Compact & Sleek) */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress sx={{ color: themeConfig.primary }} />
        </Box>
      ) : currentPlans.length === 0 ? (
        <EmptyState
          title={`No ${billingCycle} Plans Created Yet`}
          description={`Click '+ Create ${billingCycle === "MONTHLY" ? "Monthly" : "Annual"} Plan' above to add your first commercial tier (up to 3 allowed).`}
          actionText={`Create First ${billingCycle} Plan`}
          onAction={handleOpenAddModal}
        />
      ) : (
        <Grid container spacing={2.5} sx={{ alignItems: "stretch", pt: 2 }}>
          {currentPlans.map((plan, idx) => {
            const isPopular = Boolean(plan.isPopular || plan.badge === "MOST POPULAR");

            return (
              <Grid size={{ xs: 12, md: 4 }} key={plan._id}>
                <Card
                  className="card-3d"
                  sx={{
                    borderRadius: "18px",
                    border: isPopular ? `2px solid ${themeConfig.primary}` : `1px solid ${themeConfig.border}`,
                    boxShadow: isPopular
                      ? `0 12px 28px -8px ${themeConfig.primaryGlow}, 0 6px 12px rgba(0,0,0,0.04), inset 0 1px 1px #FFFFFF`
                      : "0 8px 20px -4px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
                    background: `linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "visible !important",
                    zIndex: isPopular ? 3 : 1,
                    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isPopular
                        ? `0 18px 36px -8px ${themeConfig.primaryGlow}, 0 8px 16px rgba(0,0,0,0.06)`
                        : "0 14px 28px -6px rgba(12, 39, 59, 0.12)",
                    },
                  }}
                >
                  {/* Floating 3D Most Popular Pill (High z-index & never clipped) */}
                  {isPopular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                        color: "#FFFFFF",
                        px: 2,
                        py: 0.35,
                        fontSize: "0.68rem",
                        fontWeight: 900,
                        letterSpacing: 0.8,
                        borderRadius: "10px",
                        textTransform: "uppercase",
                        boxShadow: `0 4px 12px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.6,
                      }}
                    >
                      <AutoAwesome sx={{ fontSize: 13 }} />
                      MOST POPULAR
                    </Box>
                  )}

                  <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", "&:last-child": { pb: 2.5 } }}>
                    <div>
                      {/* Icon & Room Limit Badge + Active Toggle */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                        {getPlanIcon(idx, plan.name)}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip
                            label={plan.maxRooms >= 9000 ? "Unlimited Rooms" : `Up to ${plan.maxRooms} Rooms`}
                            size="small"
                            sx={{
                              bgcolor: themeConfig.champagne,
                              color: themeConfig.primaryDark,
                              fontWeight: 800,
                              fontSize: "0.7rem",
                              height: 24,
                              borderRadius: "8px",
                              border: `1px solid ${themeConfig.border}`,
                              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                              px: 0.4,
                            }}
                          />
                          <Tooltip title={plan.isActive !== false ? "Plan is Active (Click to Disable)" : "Plan is Disabled (Click to Activate)"}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                bgcolor: plan.isActive !== false ? "rgba(16, 185, 129, 0.1)" : "rgba(220, 38, 38, 0.08)",
                                px: 0.8,
                                py: 0.2,
                                borderRadius: "8px",
                                border: `1px solid ${plan.isActive !== false ? "rgba(16, 185, 129, 0.25)" : "rgba(220, 38, 38, 0.2)"}`,
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 800, fontSize: "0.65rem", color: plan.isActive !== false ? "#10B981" : "#EF4444", mr: 0.5 }}>
                                {plan.isActive !== false ? "ACTIVE" : "DISABLED"}
                              </Typography>
                              <Switch
                                size="small"
                                checked={plan.isActive !== false}
                                onChange={() => handleTogglePlanActive(plan)}
                                color="success"
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#10B981",
                                  },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#10B981",
                                  },
                                }}
                              />
                            </Box>
                          </Tooltip>
                        </Box>
                      </Box>

                      {/* Plan Title & Tagline */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: themeConfig.textMain,
                          mb: 0.4,
                          letterSpacing: -0.3,
                          fontSize: "1.1rem",
                        }}
                      >
                        {plan.name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: themeConfig.textMuted, fontSize: "0.78rem", minHeight: 28, mb: 1.5, lineHeight: 1.35 }}>
                        {plan.description}
                      </Typography>

                      {/* 3D Price Display */}
                      <Box sx={{ display: "flex", alignItems: "baseline", mb: 1.5, pb: 1.5, borderBottom: `1px solid ${themeConfig.border}` }}>
                        <Typography sx={{ fontWeight: 900, color: themeConfig.textMain, letterSpacing: -0.8, fontSize: "1.65rem" }}>
                          ₹{plan.price.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: themeConfig.textMuted, ml: 0.8, fontSize: "0.78rem" }}>
                          {plan.billingCycle === "ANNUAL" ? "/mo (billed annually)" : "/month"}
                        </Typography>
                      </Box>

                      {/* INCLUDES Header */}
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          color: themeConfig.primaryDark,
                          letterSpacing: 0.8,
                          textTransform: "uppercase",
                          display: "block",
                          mb: 1,
                          fontSize: "0.68rem",
                        }}
                      >
                        INCLUDES:
                      </Typography>

                      {/* Feature Bullet List */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, mb: 2 }}>
                        {(plan.features || []).map((feature, fidx) => (
                          <Box key={fidx} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            <Box
                              sx={{
                                width: 17,
                                height: 17,
                                borderRadius: "50%",
                                bgcolor: themeConfig.successBg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: 0.2,
                                flexShrink: 0,
                                border: `1px solid ${themeConfig.success}30`,
                              }}
                            >
                              <Check sx={{ color: themeConfig.success, fontSize: 11 }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: themeConfig.textMain, fontSize: "0.78rem", fontWeight: 600 }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </div>

                    {/* 3D Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, pt: 1.5, borderTop: `1px solid ${themeConfig.border}` }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Edit sx={{ fontSize: 16 }} />}
                        onClick={() => handleOpenEditModal(plan)}
                        className="btn-3d"
                        sx={{
                          bgcolor: isPopular ? themeConfig.primary : "#FFFFFF",
                          color: isPopular ? "#FFFFFF" : themeConfig.primaryDark,
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          borderRadius: "10px",
                          py: 0.8,
                          textTransform: "none",
                          border: `1px solid ${isPopular ? themeConfig.primary : themeConfig.border}`,
                          boxShadow: isPopular ? `0 3px 10px ${themeConfig.primaryGlow}` : "0 2px 5px rgba(0,0,0,0.04)",
                          "&:hover": {
                            bgcolor: isPopular ? themeConfig.primaryDark : themeConfig.champagne,
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Edit Tier
                      </Button>
                      <Tooltip title="Delete Plan">
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePlan(plan)}
                          sx={{
                            bgcolor: themeConfig.dangerBg,
                            color: themeConfig.danger,
                            borderRadius: "10px",
                            p: 0.8,
                            border: `1px solid ${themeConfig.danger}30`,
                            "&:hover": { bgcolor: "rgba(220, 38, 38, 0.2)" },
                          }}
                        >
                          <Delete sx={{ fontSize: 17 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* 3D MODAL: ADD / EDIT PLAN */}
      <Dialog
        open={planModal.open}
        onClose={() => setPlanModal({ ...planModal, open: false })}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              p: 1.5,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: "#FFFFFF",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        <form onSubmit={handleSavePlan}>
          <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              {planModal.mode === "ADD" ? `Create ${planModal.data?.billingCycle} Plan` : `Edit Plan: ${planModal.data?.name}`}
            </Typography>
            <IconButton onClick={() => setPlanModal({ ...planModal, open: false })} sx={{ borderRadius: "10px" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
            <Grid container spacing={2.5}>
              {/* Billing Cycle */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Billing Cadence *
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  required
                  value={planModal.data?.billingCycle || billingCycle}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, billingCycle: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="MONTHLY" disabled={planModal.mode === "ADD" && meta.monthlyCount >= 3}>
                    Monthly Billing {meta.monthlyCount >= 3 ? "(Max 3/3 Reached)" : `(${meta.monthlyCount}/3)`}
                  </MenuItem>
                  <MenuItem value="ANNUAL" disabled={planModal.mode === "ADD" && meta.annualCount >= 3}>
                    Annual Billing {meta.annualCount >= 3 ? "(Max 3/3 Reached)" : `(${meta.annualCount}/3)`}
                  </MenuItem>
                </TextField>
              </Grid>

              {/* Plan Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Plan Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g. Starter Boutique"
                  value={planModal.data?.name || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, name: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Price */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Effective Monthly Price (₹) *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g. 2999"
                  value={planModal.data?.price ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, price: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Max Rooms */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Max Rooms (e.g. 20, 75, 9999)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 50"
                  value={planModal.data?.maxRooms ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, maxRooms: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Discount */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Annual Savings % (e.g. 20)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 20"
                  value={planModal.data?.discountPercent ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, discountPercent: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Description */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Tagline / Description
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Perfect for boutique hotels, homestays, & B&Bs"
                  value={planModal.data?.description || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, description: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Features Multiline */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Feature Checklist (One bullet per line)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Full 30-Day Free Trial&#10;Up to 20 Room Inventory&#10;Up to 3 Receptionist Accounts&#10;Guest Check-In & Aadhaar Verification"
                  value={planModal.data?.featuresText || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, featuresText: e.target.value } })}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              {/* Active & Popular Switches */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(planModal.data?.isPopular)}
                      onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, isPopular: e.target.checked } })}
                    />
                  }
                  label="Highlight as MOST POPULAR"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(planModal.data?.isActive)}
                      onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, isActive: e.target.checked } })}
                    />
                  }
                  label="Active in Pricing Catalog"
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setPlanModal({ ...planModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="btn-3d"
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                color: "#FFFFFF",
                fontWeight: 800,
                borderRadius: "12px",
                px: 3,
                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
              }}
            >
              {planModal.mode === "ADD" ? "Create Plan" : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

