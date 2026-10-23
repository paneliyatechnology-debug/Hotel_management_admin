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
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Check, Add, Edit, Delete, Close } from "@/shared/icons";
import { useAppTheme } from "@/shared/context/ThemeContext";
import { API_ENDPOINTS, apiRequest } from "@/config/api";
import { toast } from "@/shared/utils/toast";
import EmptyState from "@/shared/components/EmptyState";
import ConfirmDialog from "@/shared/components/ConfirmDialog";

function getInitialPlanForm(cycle = "ANNUAL") {
  return {
    _id: "",
    name: "",
    billingCycle: cycle,
    price: cycle === "ANNUAL" ? 6399 : 7999,
    discountPercent: cycle === "ANNUAL" ? 20 : 0,
    maxRooms: 75,
    description: "",
    featuresText: "",
    badge: "",
    isPopular: false,
    isActive: true,
    displayOrder: 1,
  };
}

export default function SubscriptionPlansPage() {
  const { themeConfig, isDarkMode } = useAppTheme();

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
  const [billingCycle, setBillingCycle] = useState("ANNUAL");

  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: "", message: "", onConfirm: null });

  const [planModal, setPlanModal] = useState({
    open: false,
    mode: "ADD",
    data: getInitialPlanForm("ANNUAL"),
  });

  const showToast = (message, severity = "success") => {
    toast.show(message, severity);
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.ADMIN_ALL);
      if (res?.data) {
        const planList = Array.isArray(res.data) ? res.data : (res.data.plans || []);
        setPlans(planList);
        const monthly = planList.filter((p) => p.billingCycle === "MONTHLY").length;
        const annual = planList.filter((p) => p.billingCycle === "ANNUAL").length;
        setMeta(res.meta || {
          totalCount: planList.length,
          monthlyCount: monthly,
          annualCount: annual,
        });
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

  const currentPlans = plans.filter((p) => p.billingCycle === billingCycle);
  const isCurrentCycleFull = billingCycle === "MONTHLY" ? meta.monthlyCount >= 3 : meta.annualCount >= 3;
  const canAddPlan = meta.totalCount < 6 && !isCurrentCycleFull;

  const handleOpenAddModal = () => {
    if (meta.totalCount >= 6) {
      showToast("Maximum of 6 subscription plans reached.", "warning");
      return;
    }
    if (isCurrentCycleFull) {
      showToast(`Maximum of 3 ${billingCycle === "MONTHLY" ? "monthly" : "annual"} plans already created.`, "warning");
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
      showToast("Plan name and price are required", "error");
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
        showToast(res.message || "Subscription plan created.");
      } else {
        const planId = planModal.data._id || planModal.data.id;
        const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.UPDATE(planId), {
          method: "PUT",
          body: payload,
        });
        showToast(res.message || "Subscription plan updated.");
      }
      setPlanModal({ open: false, mode: "ADD", data: getInitialPlanForm(billingCycle) });
      fetchPlans();
    } catch (err) {
      showToast(err.message || "Failed to save subscription plan", "error");
    }
  };

  const handleDeletePlan = (plan) => {
    setConfirmDialog({
      open: true,
      title: "Delete Subscription Plan",
      message: `Delete '${plan.name}'? This cannot be undone.`,
      onConfirm: async () => {
        try {
          const planId = plan._id || plan.id;
          const res = await apiRequest(API_ENDPOINTS.SUBSCRIPTION_PLANS.DELETE(planId), {
            method: "DELETE",
          });
          showToast(res.message || "Subscription plan deleted.");
          fetchPlans();
        } catch (err) {
          showToast(err.message || "Failed to delete plan", "error");
        } finally {
          setConfirmDialog({ open: false, title: "", message: "", onConfirm: null });
        }
      },
    });
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };
  const cycleLabel = billingCycle === "MONTHLY" ? "Monthly" : "Annual";

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        pb: { xs: 12, sm: 4 },
      }}
    >
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        isDanger
        confirmLabel="Delete"
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ open: false, title: "", message: "", onConfirm: null })}
      />

      <Box
        sx={{
          mb: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: themeConfig.textMain, letterSpacing: 0 }}>
          Subscription Plans
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          disabled={!canAddPlan}
          onClick={handleOpenAddModal}
          className={canAddPlan ? "btn-3d" : ""}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
            color: "#FFFFFF",
            boxShadow: canAddPlan ? `0 4px 12px ${themeConfig.primaryGlow}` : "none",
            "&.Mui-disabled": {
              bgcolor: isDarkMode ? "rgba(255,255,255,0.08)" : "#E2E8F0",
              color: themeConfig.textMuted,
            },
          }}
        >
          Add {cycleLabel} Plan
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2.5 }}>
        {[
          { id: "MONTHLY", label: `Monthly (${meta.monthlyCount}/3)` },
          { id: "ANNUAL", label: `Annual (${meta.annualCount}/3)` },
        ].map((cycle) => {
          const isSelected = billingCycle === cycle.id;
          return (
            <Chip
              key={cycle.id}
              label={cycle.label}
              clickable
              onClick={() => setBillingCycle(cycle.id)}
              sx={{
                fontWeight: 800,
                borderRadius: "10px",
                fontSize: "0.75rem",
                px: 1,
                bgcolor: isSelected ? themeConfig.primary : themeConfig.champagne,
                color: isSelected ? (themeConfig.onPrimary || "#FFFFFF") : themeConfig.textMain,
                border: `1px solid ${isSelected ? themeConfig.primary : themeConfig.border}`,
                boxShadow: isSelected ? `0 4px 10px ${themeConfig.primaryGlow}` : "none",
                "&:hover": {
                  bgcolor: themeConfig.primary,
                  color: themeConfig.onPrimary || "#FFFFFF",
                },
              }}
            />
          );
        })}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: themeConfig.primary }} />
        </Box>
      ) : currentPlans.length === 0 ? (
        <EmptyState
          title={`No ${cycleLabel.toLowerCase()} plans yet`}
          description={`Add a ${cycleLabel.toLowerCase()} plan to start offering it to hotels.`}
          actionText={`Add ${cycleLabel} Plan`}
          onAction={handleOpenAddModal}
        />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2.5 }}>
          {currentPlans.map((plan, idx) => {
            const isPopular = Boolean(plan.isPopular || plan.badge === "MOST POPULAR");
            const roomLabel = plan.maxRooms >= 9000 ? "Unlimited rooms" : `Up to ${plan.maxRooms} rooms`;

            return (
              <Card
                key={plan._id || plan.id || idx}
                className="card-3d"
                sx={{
                  borderRadius: "18px",
                  bgcolor: themeConfig.bgCard,
                  border: `1.5px solid ${isPopular ? themeConfig.primary : themeConfig.border}`,
                  boxShadow: isDarkMode ? "none" : "0 8px 24px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column", "&:last-child": { pb: 2.5 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1.15rem", lineHeight: 1.25 }}>
                    {plan.name}
                  </Typography>
                  {plan.description && (
                    <Typography variant="body2" sx={{ color: themeConfig.textMuted, mt: 0.5, fontSize: "0.8rem", lineHeight: 1.4 }}>
                      {plan.description}
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, mt: 1.75, mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 800, color: themeConfig.textMain, fontSize: "1.6rem", letterSpacing: 0 }}>
                      ₹{Number(plan.price || 0).toLocaleString("en-IN")}
                    </Typography>
                    <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 600 }}>
                      {plan.billingCycle === "ANNUAL" ? "/mo, billed yearly" : "/month"}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: themeConfig.textMuted, fontWeight: 700, display: "block", mb: 2 }}>
                    {roomLabel}
                  </Typography>

                  {(plan.features || []).length > 0 && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.9, mb: 2, flex: 1 }}>
                      {(plan.features || []).map((feature, fidx) => (
                        <Box key={fidx} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          <Check sx={{ color: themeConfig.success, fontSize: 16, mt: 0.15, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: themeConfig.textMain, fontSize: "0.8rem", fontWeight: 600 }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: "auto", pt: 2, borderTop: `1px solid ${themeConfig.border}` }}>
                    <Tooltip title="Edit plan">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEditModal(plan)}
                        sx={{
                          bgcolor: themeConfig.champagne,
                          color: themeConfig.primary,
                          borderRadius: "10px",
                          border: `1px solid ${themeConfig.border}`,
                          "&:hover": { bgcolor: themeConfig.primary, color: themeConfig.onPrimary || "#FFFFFF" },
                        }}
                      >
                        <Edit sx={{ fontSize: 17 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete plan">
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePlan(plan)}
                        sx={{
                          bgcolor: themeConfig.dangerBg,
                          color: themeConfig.danger,
                          borderRadius: "10px",
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
            );
          })}
        </Box>
      )}

      <Dialog
        open={planModal.open}
        onClose={() => setPlanModal({ ...planModal, open: false })}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              p: 1,
              border: `1px solid ${themeConfig.border}`,
              bgcolor: themeConfig.bgCard || (isDarkMode ? "#0E312C" : "#FFFFFF"),
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        <form onSubmit={handleSavePlan}>
          <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 800, color: themeConfig.textMain }}>
              {planModal.mode === "ADD" ? "Add Plan" : "Edit Plan"}
            </Typography>
            <IconButton onClick={() => setPlanModal({ ...planModal, open: false })} sx={{ borderRadius: "10px" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderColor: themeConfig.border }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Billing Cycle
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  required
                  value={planModal.data?.billingCycle || billingCycle}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, billingCycle: e.target.value } })}
                  sx={fieldSx}
                >
                  <MenuItem value="MONTHLY" disabled={planModal.mode === "ADD" && meta.monthlyCount >= 3}>
                    Monthly {meta.monthlyCount >= 3 ? "(full)" : `(${meta.monthlyCount}/3)`}
                  </MenuItem>
                  <MenuItem value="ANNUAL" disabled={planModal.mode === "ADD" && meta.annualCount >= 3}>
                    Annual {meta.annualCount >= 3 ? "(full)" : `(${meta.annualCount}/3)`}
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Plan Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g. Starter"
                  value={planModal.data?.name || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, name: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Price (₹)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  placeholder="2999"
                  value={planModal.data?.price ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, price: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Max Rooms
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="75"
                  value={planModal.data?.maxRooms ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, maxRooms: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Discount %
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="20"
                  value={planModal.data?.discountPercent ?? ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, discountPercent: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Short description shown on the plan card"
                  value={planModal.data?.description || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, description: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: themeConfig.textMain, mb: 0.8, display: "block" }}>
                  Features (one per line)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={"Unlimited receptionist accounts\nGST invoicing\nEmail notifications"}
                  value={planModal.data?.featuresText || ""}
                  onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, featuresText: e.target.value } })}
                  sx={fieldSx}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(planModal.data?.isPopular)}
                      onChange={(e) => setPlanModal({ ...planModal, data: { ...planModal.data, isPopular: e.target.checked } })}
                    />
                  }
                  label="Mark as popular"
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
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setPlanModal({ ...planModal, open: false })} sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                color: "#FFFFFF",
                fontWeight: 800,
                borderRadius: "12px",
                px: 3,
                textTransform: "none",
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
