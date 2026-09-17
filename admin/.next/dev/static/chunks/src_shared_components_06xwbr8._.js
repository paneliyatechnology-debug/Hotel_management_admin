(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/shared/components/ConfirmDialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfirmDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Dialog/Dialog.mjs [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.mjs [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogContent/DialogContent.mjs [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogActions/DialogActions.mjs [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TextField/TextField.mjs [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WarningAmber$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/WarningAmber.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ConfirmDialog({ open, title = "Confirm Action", message = "Are you sure you want to proceed with this operation?", confirmLabel = "Confirm", cancelLabel = "Cancel", isDanger = false, requireReason = false, reasonValue = "", onReasonChange, reasonPlaceholder = "Please state the reason for this action...", loading = false, onConfirm, onClose }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        slotProps: {
            paper: {
                sx: {
                    borderRadius: "20px",
                    p: 1.5,
                    bgcolor: themeConfig.bgCard,
                    border: `1px solid ${themeConfig.border}`,
                    boxShadow: "0 24px 48px -12px rgba(12, 39, 59, 0.22), 0 12px 24px -8px rgba(12, 39, 59, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                    maxWidth: 480,
                    width: "100%"
                }
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                component: "div",
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    pb: 1
                },
                children: [
                    isDanger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            bgcolor: themeConfig.dangerBg,
                            color: themeConfig.danger,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(220, 38, 38, 0.15)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WarningAmber$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                fontSize: 20
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        component: "div",
                        variant: "h6",
                        sx: {
                            fontWeight: 800,
                            color: themeConfig.textMain,
                            fontSize: "1.05rem"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    pt: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "body2",
                        sx: {
                            color: themeConfig.textMuted,
                            mb: requireReason ? 2 : 0
                        },
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    requireReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                        fullWidth: true,
                        multiline: true,
                        rows: 3,
                        placeholder: reasonPlaceholder,
                        value: reasonValue,
                        onChange: (e)=>onReasonChange && onReasonChange(e.target.value),
                        sx: {
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                bgcolor: themeConfig.bgMain
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                sx: {
                    p: 2,
                    gap: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: onClose,
                        disabled: loading,
                        sx: {
                            color: themeConfig.textMuted,
                            borderRadius: "10px"
                        },
                        children: cancelLabel
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        variant: "contained",
                        disabled: loading || requireReason && !reasonValue?.trim(),
                        onClick: onConfirm,
                        sx: {
                            background: isDanger ? `linear-gradient(135deg, ${themeConfig.danger} 0%, #B91C1C 100%)` : `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                            borderRadius: "12px",
                            fontWeight: 700,
                            boxShadow: isDanger ? "0 4px 14px rgba(220, 38, 38, 0.3)" : `0 4px 14px ${themeConfig.primaryGlow}`,
                            "&:hover": {
                                background: isDanger ? "#991B1B" : themeConfig.primaryDark,
                                transform: "translateY(-1px)"
                            }
                        },
                        children: loading ? "Processing..." : confirmLabel
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/ConfirmDialog.jsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(ConfirmDialog, "4X60El56Y/tZtk3jLN3bb8GPh3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = ConfirmDialog;
var _c;
__turbopack_context__.k.register(_c, "ConfirmDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/EmptyState.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$InboxOutlined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/InboxOutlined.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function EmptyState({ icon: Icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$InboxOutlined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], title = "No Records Found", description = "There are no items matching your criteria at this moment.", actionLabel, actionText, onAction }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const label = actionLabel || actionText;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            py: 8,
            px: 3,
            textAlign: "center",
            bgcolor: themeConfig.bgCard,
            borderRadius: "18px",
            border: `1px solid ${themeConfig.border}`,
            boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    width: 58,
                    height: 58,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, #FFFFFF 0%, ${themeConfig.champagne} 100%)`,
                    color: themeConfig.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    border: `1px solid ${themeConfig.border}`,
                    boxShadow: `0 6px 16px -2px ${themeConfig.primaryGlow}, inset 0 1px 1px #FFFFFF`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    sx: {
                        fontSize: 28
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/EmptyState.jsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/EmptyState.jsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "subtitle1",
                sx: {
                    fontWeight: 800,
                    color: themeConfig.textMain,
                    mb: 0.5
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/src/shared/components/EmptyState.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "body2",
                sx: {
                    color: themeConfig.textMuted,
                    maxWidth: 400,
                    mx: "auto",
                    mb: label ? 2.5 : 0
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/src/shared/components/EmptyState.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            label && onAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                variant: "contained",
                onClick: onAction,
                sx: {
                    background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                    borderRadius: "12px",
                    fontWeight: 700,
                    boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`,
                    "&:hover": {
                        background: `linear-gradient(135deg, ${themeConfig.primaryDark} 0%, ${themeConfig.primary} 100%)`,
                        transform: "translateY(-1.5px)"
                    }
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/shared/components/EmptyState.jsx",
                lineNumber: 58,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/EmptyState.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(EmptyState, "4X60El56Y/tZtk3jLN3bb8GPh3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/LoadingState.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoadingState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.mjs [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Skeleton$2f$Skeleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Skeleton/Skeleton.mjs [app-client] (ecmascript) <export default as Skeleton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LoadingState({ message = "Loading live data...", type = "spinner" }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    if (type === "skeleton") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                width: "100%",
                p: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Skeleton$2f$Skeleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                    variant: "rounded",
                    height: 60,
                    sx: {
                        mb: 2,
                        borderRadius: 0,
                        bgcolor: themeConfig.champagne
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/LoadingState.jsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Skeleton$2f$Skeleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                    variant: "rounded",
                    height: 180,
                    sx: {
                        mb: 2,
                        borderRadius: 0,
                        bgcolor: themeConfig.champagne
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/LoadingState.jsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Skeleton$2f$Skeleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skeleton$3e$__["Skeleton"], {
                    variant: "rounded",
                    height: 180,
                    sx: {
                        borderRadius: 0,
                        bgcolor: themeConfig.champagne
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/LoadingState.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/shared/components/LoadingState.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            py: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                size: 42,
                thickness: 4,
                sx: {
                    color: themeConfig.primary
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/components/LoadingState.jsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "body2",
                sx: {
                    color: themeConfig.textMuted,
                    fontWeight: 600
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/src/shared/components/LoadingState.jsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/LoadingState.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(LoadingState, "4X60El56Y/tZtk3jLN3bb8GPh3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = LoadingState;
var _c;
__turbopack_context__.k.register(_c, "LoadingState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/PaymentLedgerView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentLedgerView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Card/Card.mjs [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Paper/Paper.mjs [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TextField/TextField.mjs [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputAdornment$2f$InputAdornment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/InputAdornment/InputAdornment.mjs [app-client] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/IconButton/IconButton.mjs [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Dialog/Dialog.mjs [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.mjs [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogContent/DialogContent.mjs [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogActions/DialogActions.mjs [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/FormControl/FormControl.mjs [app-client] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/InputLabel/InputLabel.mjs [app-client] (ecmascript) <export default as InputLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Select/Select.mjs [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/MenuItem/MenuItem.mjs [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.mjs [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Alert/Alert.mjs [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Table/Table.mjs [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableHead$2f$TableHead$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableHead/TableHead.mjs [app-client] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableBody/TableBody.mjs [app-client] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableRow/TableRow.mjs [app-client] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableCell/TableCell.mjs [app-client] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableContainer$2f$TableContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableContainer/TableContainer.mjs [app-client] (ecmascript) <export default as TableContainer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Tooltip/Tooltip.mjs [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TablePagination/TablePagination.mjs [app-client] (ecmascript) <export default as TablePagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Search.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Receipt$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Receipt.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccountBalanceWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/AccountBalanceWallet.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$QrCode2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/QrCode2.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CreditCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/CreditCard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccountBalance$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/AccountBalance.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Payments$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Payments.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Print$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Print.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Download.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Refresh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Refresh.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Add$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Add.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Schedule$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Schedule.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/TrendingUp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MeetingRoom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/MeetingRoom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/EmptyState.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$pdfGenerator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/pdfGenerator.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function PaymentLedgerView({ user, hotelSettings, bookings = [], apiEndpoint, recordPaymentEndpoint, onPaymentSuccess }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        totalGrossCollected: 0,
        todayCollected: 0,
        cashTotal: 0,
        upiTotal: 0,
        cardTotal: 0,
        bankTotal: 0,
        onlineTotal: 0,
        todayCash: 0,
        todayUpi: 0,
        todayCard: 0,
        todayBank: 0,
        advanceTotal: 0,
        settlementTotal: 0,
        extraChargeTotal: 0,
        totalPendingDues: 0,
        totalTransactions: 0
    });
    // Filters
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedMethod, setSelectedMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const [selectedType, setSelectedType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [rowsPerPage, setRowsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    // Collect Payment Modal
    const [collectModalOpen, setCollectModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [collectData, setCollectData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        bookingId: "",
        amount: "",
        paymentMethod: "UPI",
        paymentType: "PARTIAL",
        transactionId: "",
        paymentReference: "",
        note: ""
    });
    const [collectLoading, setCollectLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [collectError, setCollectError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Receipt Modal
    const [receiptModal, setReceiptModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        payment: null
    });
    // Toast
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        message: "",
        severity: "success"
    });
    const activeUpiId = hotelSettings?.upiId || "jatinkakadiya234-1@okicici";
    const hotelName = user?.hotel?.name || "Grand Royale Luxury Resort";
    const fetchPayments = async ()=>{
        setLoading(true);
        try {
            const endpoint = apiEndpoint || "/api/v1/receptionist/payments";
            const params = new URLSearchParams();
            if (selectedMethod && selectedMethod !== "ALL") params.append("paymentMethod", selectedMethod);
            if (selectedType && selectedType !== "ALL") params.append("paymentType", selectedType);
            if (timeRange && timeRange !== "all") params.append("timeRange", timeRange);
            if (searchQuery.trim()) params.append("search", searchQuery.trim());
            const url = `${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(url);
            if (res?.success) {
                setPayments(res.data || []);
                if (res.summary) setSummary(res.summary);
            }
        } catch (err) {
            console.error("Failed to load payments ledger:", err);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentLedgerView.useEffect": ()=>{
            fetchPayments();
        }
    }["PaymentLedgerView.useEffect"], [
        selectedMethod,
        selectedType,
        timeRange
    ]);
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        fetchPayments();
    };
    const showToast = (message, severity = "success")=>{
        setToast({
            show: true,
            message,
            severity
        });
        setTimeout(()=>setToast({
                show: false,
                message: "",
                severity: "success"
            }), 4000);
    };
    const handleOpenCollectModal = (defaultBooking = null)=>{
        setCollectError("");
        const checkedInList = bookings.filter((b)=>b.status === "CHECKED_IN" || b.status === "CONFIRMED");
        const targetBooking = defaultBooking || checkedInList[0] || null;
        setCollectData({
            bookingId: targetBooking?._id || "",
            amount: targetBooking?.dueAmount ? String(targetBooking.dueAmount) : "",
            paymentMethod: "UPI",
            paymentType: targetBooking?.dueAmount ? "FULL_SETTLEMENT" : "PARTIAL",
            transactionId: "",
            paymentReference: "",
            note: ""
        });
        setCollectModalOpen(true);
    };
    const handleRecordPayment = async ()=>{
        if (!collectData.bookingId) {
            setCollectError("Please select a guest booking / folio.");
            return;
        }
        if (!collectData.amount || Number(collectData.amount) <= 0) {
            setCollectError("Please enter a valid payment amount (₹).");
            return;
        }
        setCollectLoading(true);
        setCollectError("");
        try {
            const endpoint = recordPaymentEndpoint || "/api/v1/receptionist/payments";
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(endpoint, {
                method: "POST",
                body: {
                    bookingId: collectData.bookingId,
                    amount: Number(collectData.amount),
                    paymentMethod: collectData.paymentMethod,
                    paymentType: collectData.paymentType,
                    transactionId: collectData.transactionId,
                    paymentReference: collectData.paymentReference,
                    note: collectData.note
                }
            });
            showToast(res.message || "Payment recorded successfully!");
            setCollectModalOpen(false);
            await fetchPayments();
            if (onPaymentSuccess) onPaymentSuccess();
        } catch (err) {
            setCollectError(err.message || "Failed to record payment");
        } finally{
            setCollectLoading(false);
        }
    };
    const checkedInBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaymentLedgerView.useMemo[checkedInBookings]": ()=>{
            return bookings.filter({
                "PaymentLedgerView.useMemo[checkedInBookings]": (b)=>b.status === "CHECKED_IN" || b.status === "CONFIRMED"
            }["PaymentLedgerView.useMemo[checkedInBookings]"]);
        }
    }["PaymentLedgerView.useMemo[checkedInBookings]"], [
        bookings
    ]);
    const selectedBookingDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaymentLedgerView.useMemo[selectedBookingDetails]": ()=>{
            return checkedInBookings.find({
                "PaymentLedgerView.useMemo[selectedBookingDetails]": (b)=>b._id === collectData.bookingId
            }["PaymentLedgerView.useMemo[selectedBookingDetails]"]) || null;
        }
    }["PaymentLedgerView.useMemo[selectedBookingDetails]"], [
        checkedInBookings,
        collectData.bookingId
    ]);
    // Dynamic UPI URL for direct collection
    const dynamicUpiUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaymentLedgerView.useMemo[dynamicUpiUrl]": ()=>{
            const amt = Number(collectData.amount) || 0;
            const note = encodeURIComponent(`Hotel Bill - ${selectedBookingDetails?.roomNumber || "Folio"}`);
            const name = encodeURIComponent(hotelName);
            return `upi://pay?pa=${activeUpiId}&pn=${name}&am=${amt}&cu=INR&tn=${note}`;
        }
    }["PaymentLedgerView.useMemo[dynamicUpiUrl]"], [
        activeUpiId,
        hotelName,
        collectData.amount,
        selectedBookingDetails
    ]);
    const dynamicQrCodeUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaymentLedgerView.useMemo[dynamicQrCodeUrl]": ()=>{
            return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(dynamicUpiUrl)}`;
        }
    }["PaymentLedgerView.useMemo[dynamicQrCodeUrl]"], [
        dynamicUpiUrl
    ]);
    // Method Icon & Color
    const getMethodBadge = (method)=>{
        const m = (method || "").toUpperCase();
        switch(m){
            case "UPI":
                return {
                    label: "UPI QR",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$QrCode2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, this),
                    bg: "#F5F3FF",
                    color: "#7C3AED",
                    border: "#DDD6FE"
                };
            case "CASH":
                return {
                    label: "Cash Counter",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Payments$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 247,
                        columnNumber: 17
                    }, this),
                    bg: "#ECFDF5",
                    color: "#059669",
                    border: "#A7F3D0"
                };
            case "CARD":
                return {
                    label: "Card POS",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CreditCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 255,
                        columnNumber: 17
                    }, this),
                    bg: "#EFF6FF",
                    color: "#2563EB",
                    border: "#BFDBFE"
                };
            case "BANK_TRANSFER":
                return {
                    label: "Bank / NEFT",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccountBalance$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 263,
                        columnNumber: 17
                    }, this),
                    bg: "#FFFBEB",
                    color: "#D97706",
                    border: "#FDE68A"
                };
            default:
                return {
                    label: "Online",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccountBalanceWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: 16
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 271,
                        columnNumber: 17
                    }, this),
                    bg: "#F3F4F6",
                    color: "#4B5563",
                    border: "#E5E7EB"
                };
        }
    };
    const getTypeBadge = (type)=>{
        const t = (type || "").toUpperCase();
        switch(t){
            case "ADVANCE":
                return {
                    label: "Advance Check-In",
                    bg: "#EFF6FF",
                    color: "#1D4ED8"
                };
            case "FULL_SETTLEMENT":
                return {
                    label: "Checkout Settlement",
                    bg: "#ECFDF5",
                    color: "#047857"
                };
            case "EXTRA_CHARGE":
                return {
                    label: "POS / Extra Service",
                    bg: "#FFF7ED",
                    color: "#C2410C"
                };
            case "PARTIAL":
                return {
                    label: "Partial Payment",
                    bg: "#FDF4FF",
                    color: "#A21CAF"
                };
            default:
                return {
                    label: type || "Payment",
                    bg: "#F3F4F6",
                    color: "#374151"
                };
        }
    };
    const handleExportCSV = ()=>{
        if (payments.length === 0) {
            showToast("No payment records to export.", "warning");
            return;
        }
        const headers = [
            "Receipt #",
            "Date",
            "Time",
            "Guest Name",
            "Guest Phone",
            "Room #",
            "Booking #",
            "Amount (INR)",
            "Payment Mode",
            "Payment Type",
            "Txn ID / Ref",
            "Collected By"
        ];
        const rows = payments.map((p)=>[
                p.receiptNumber,
                p.dateStr,
                p.timeStr,
                `"${p.guest?.fullName || "Guest"}"`,
                `"${p.guest?.mobileNumber || ""}"`,
                p.booking?.roomNumber || "N/A",
                p.booking?.bookingNumber || "N/A",
                p.amount,
                p.paymentMethod,
                p.paymentType,
                `"${p.transactionId || p.paymentReference || ""}"`,
                `"${p.collectedBy?.name || "Staff"}"`
            ]);
        const csvContent = "data:text/csv;charset=utf-8," + [
            headers.join(","),
            ...rows.map((e)=>e.join(","))
        ].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `payment_ledger_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Payment Ledger exported as CSV successfully!");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            flexDirection: "column",
            gap: 3.5
        },
        children: [
            toast.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                severity: toast.severity,
                sx: {
                    position: "fixed",
                    top: 24,
                    right: 24,
                    zIndex: 9999,
                    boxShadow: themeConfig.shadowModal,
                    borderRadius: "12px"
                },
                children: toast.message
            }, void 0, false, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 345,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        md: "center"
                    },
                    gap: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            minWidth: 0,
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h5",
                                sx: {
                                    fontWeight: 900,
                                    color: themeConfig.textMain,
                                    letterSpacing: -0.5
                                },
                                children: "Payment Collections & Cash Drawer Ledger"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                sx: {
                                    color: themeConfig.textMuted
                                },
                                children: "Real-time multi-mode billing telemetry • UPI QR, Cash Counter, Card POS & NEFT Bank Transfers"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            gap: 1.2,
                            alignItems: "center",
                            flexShrink: 0,
                            flexWrap: "nowrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                size: "small",
                                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        fontSize: 16
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 383,
                                    columnNumber: 24
                                }, this),
                                onClick: handleExportCSV,
                                className: "btn-3d",
                                sx: {
                                    borderRadius: "10px",
                                    borderColor: themeConfig.border,
                                    bgcolor: "#FFFFFF",
                                    color: themeConfig.textMain,
                                    fontWeight: 700,
                                    fontSize: "0.78rem",
                                    textTransform: "none",
                                    py: 0.7,
                                    px: 1.5,
                                    whiteSpace: "nowrap"
                                },
                                children: "Export CSV"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "outlined",
                                size: "small",
                                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        fontSize: 16
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 405,
                                    columnNumber: 24
                                }, this),
                                onClick: ()=>{
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$pdfGenerator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadDailyLedgerPDF"])(payments, summary, {
                                        ...hotelSettings,
                                        ...user?.hotel || {}
                                    });
                                    showToast("Collections statement PDF generated successfully!");
                                },
                                className: "btn-3d",
                                sx: {
                                    borderRadius: "10px",
                                    borderColor: themeConfig.primary,
                                    bgcolor: "#FFFFFF",
                                    color: themeConfig.primary,
                                    fontWeight: 800,
                                    fontSize: "0.78rem",
                                    textTransform: "none",
                                    py: 0.7,
                                    px: 1.5,
                                    whiteSpace: "nowrap"
                                },
                                children: "Statement (PDF)"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                size: "small",
                                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Add$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        fontSize: 16
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 430,
                                    columnNumber: 24
                                }, this),
                                onClick: ()=>handleOpenCollectModal(),
                                className: "btn-3d",
                                sx: {
                                    background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                    borderRadius: "10px",
                                    fontWeight: 800,
                                    fontSize: "0.78rem",
                                    textTransform: "none",
                                    py: 0.7,
                                    px: 1.8,
                                    whiteSpace: "nowrap",
                                    boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`
                                },
                                children: "Collect Payment"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 361,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        xl: "repeat(6, 1fr)"
                    },
                    gap: 2.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #FAFBFD 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.textMuted,
                                            textTransform: "uppercase"
                                        },
                                        children: "Total Revenue"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 476,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: themeConfig.champagne,
                                            color: themeConfig.primary
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 480,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 475,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: themeConfig.textMain
                                },
                                children: [
                                    "₹",
                                    (summary.totalGrossCollected || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                sx: {
                                    color: themeConfig.textMuted
                                },
                                children: [
                                    summary.totalTransactions || 0,
                                    " total receipts"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 486,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: "#059669",
                                            textTransform: "uppercase"
                                        },
                                        children: "Today's Collection"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: "#ECFDF5",
                                            color: "#059669"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Schedule$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 508,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 503,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: "#059669"
                                },
                                children: [
                                    "₹",
                                    (summary.todayCollected || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                sx: {
                                    color: "#059669",
                                    fontWeight: 700
                                },
                                children: [
                                    "Cash: ₹",
                                    (summary.todayCash || 0).toLocaleString(),
                                    " • UPI: ₹",
                                    (summary.todayUpi || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #FAFBFD 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.textMuted,
                                            textTransform: "uppercase"
                                        },
                                        children: "Cash In Drawer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: "#ECFDF5",
                                            color: "#059669"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Payments$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 536,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 535,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: themeConfig.textMain
                                },
                                children: [
                                    "₹",
                                    (summary.cashTotal || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 539,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                sx: {
                                    color: themeConfig.textMuted
                                },
                                children: "Physical Counter Cash"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 542,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 520,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF",
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: "#7C3AED",
                                            textTransform: "uppercase"
                                        },
                                        children: "UPI QR Pay"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: "#F5F3FF",
                                            color: "#7C3AED"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$QrCode2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 565,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 564,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 560,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: "#7C3AED"
                                },
                                children: [
                                    "₹",
                                    (summary.upiTotal || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: activeUpiId,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "caption",
                                    sx: {
                                        color: themeConfig.textMuted,
                                        display: "block",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    },
                                    children: activeUpiId
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #FAFBFD 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.textMuted,
                                            textTransform: "uppercase"
                                        },
                                        children: "Card & Bank NEFT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: "#EFF6FF",
                                            color: "#2563EB"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CreditCard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 604,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 599,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: themeConfig.textMain
                                },
                                children: [
                                    "₹",
                                    ((summary.cardTotal || 0) + (summary.bankTotal || 0)).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 607,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                sx: {
                                    color: themeConfig.textMuted
                                },
                                children: [
                                    "Card: ₹",
                                    (summary.cardTotal || 0).toLocaleString(),
                                    " • NEFT: ₹",
                                    (summary.bankTotal || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 610,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                        className: "card-3d",
                        sx: {
                            p: 2.2,
                            borderRadius: "16px",
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${themeConfig.border}`,
                            background: "linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)",
                            boxShadow: "0 6px 16px rgba(12, 39, 59, 0.04), inset 0 1px 1px #FFFFFF"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.danger,
                                            textTransform: "uppercase"
                                        },
                                        children: "Pending Dues"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 628,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            p: 0.8,
                                            borderRadius: "8px",
                                            bgcolor: "#FEF2F2",
                                            color: themeConfig.danger
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccountBalanceWallet$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 18
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 631,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 627,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h6",
                                sx: {
                                    fontWeight: 900,
                                    color: themeConfig.danger
                                },
                                children: [
                                    "₹",
                                    (summary.totalPendingDues || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 635,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "caption",
                                sx: {
                                    color: themeConfig.textMuted
                                },
                                children: "Active Resident Balances"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 638,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "card-3d",
                sx: {
                    p: 2,
                    borderRadius: "18px",
                    bgcolor: "#FFFFFF",
                    border: `1px solid ${themeConfig.border}`,
                    boxShadow: "0 8px 20px rgba(12, 39, 59, 0.05), inset 0 1px 1px #FFFFFF"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "form",
                    onSubmit: handleSearchSubmit,
                    sx: {
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        gap: 2,
                        alignItems: {
                            xs: "stretch",
                            md: "center"
                        },
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                            size: "small",
                            placeholder: "Search receipt #, guest, room #, phone, UTR...",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            sx: {
                                flex: {
                                    xs: "1 1 auto",
                                    md: "1 1 360px"
                                },
                                minWidth: {
                                    xs: "100%",
                                    sm: "240px"
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    bgcolor: themeConfig.champagne
                                }
                            },
                            slotProps: {
                                input: {
                                    startAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputAdornment$2f$InputAdornment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                                        position: "start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                color: themeConfig.textMuted
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 683,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 682,
                                        columnNumber: 19
                                    }, this)
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 666,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                gap: 1.5,
                                flexWrap: "wrap",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    size: "small",
                                    sx: {
                                        minWidth: 140
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                                            children: "Payment Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 692,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            value: selectedMethod,
                                            label: "Payment Mode",
                                            onChange: (e)=>{
                                                setSelectedMethod(e.target.value);
                                                setPage(0);
                                            },
                                            sx: {
                                                borderRadius: "12px",
                                                bgcolor: "#FFFFFF"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "ALL",
                                                    children: "All Modes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 702,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "UPI",
                                                    children: "🟣 UPI QR"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 703,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "CASH",
                                                    children: "🟢 Cash Counter"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 704,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "CARD",
                                                    children: "🔵 Card POS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 705,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "BANK_TRANSFER",
                                                    children: "🟠 Bank Transfer (NEFT)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 706,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "ONLINE",
                                                    children: "⚪ Online Gateway"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 707,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 693,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 691,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    size: "small",
                                    sx: {
                                        minWidth: 150
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                                            children: "Payment Stage"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 712,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            value: selectedType,
                                            label: "Payment Stage",
                                            onChange: (e)=>{
                                                setSelectedType(e.target.value);
                                                setPage(0);
                                            },
                                            sx: {
                                                borderRadius: "12px",
                                                bgcolor: "#FFFFFF"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "ALL",
                                                    children: "All Stages"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 722,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "ADVANCE",
                                                    children: "Advance Check-In"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 723,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "FULL_SETTLEMENT",
                                                    children: "Full Settlement"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 724,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "EXTRA_CHARGE",
                                                    children: "POS Extra Charge"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 725,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "PARTIAL",
                                                    children: "Partial Payment"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 726,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 713,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 711,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    size: "small",
                                    sx: {
                                        minWidth: 130
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                                            children: "Timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 731,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            value: timeRange,
                                            label: "Timeline",
                                            onChange: (e)=>{
                                                setTimeRange(e.target.value);
                                                setPage(0);
                                            },
                                            sx: {
                                                borderRadius: "12px",
                                                bgcolor: "#FFFFFF"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "all",
                                                    children: "All Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 741,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "today",
                                                    children: "Today Only"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 742,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "yesterday",
                                                    children: "Yesterday"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 743,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "this_week",
                                                    children: "Last 7 Days"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 744,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "this_month",
                                                    children: "This Month"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 745,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 732,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 730,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                    title: "Refresh Payment Ledger",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: fetchPayments,
                                        sx: {
                                            bgcolor: themeConfig.champagne,
                                            borderRadius: "12px",
                                            p: 1.1,
                                            border: `1px solid ${themeConfig.border}`,
                                            "&:hover": {
                                                bgcolor: themeConfig.border
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Refresh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                color: themeConfig.textMain
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 760,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 750,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 749,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 690,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                    lineNumber: 655,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 645,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "card-3d",
                sx: {
                    borderRadius: "20px",
                    bgcolor: "#FFFFFF",
                    border: `1px solid ${themeConfig.border}`,
                    boxShadow: "0 10px 30px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: 2.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: `1px solid ${themeConfig.border}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h6",
                                    sx: {
                                        fontWeight: 900,
                                        color: themeConfig.textMain
                                    },
                                    children: [
                                        "Audited Collections Ledger (",
                                        payments.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 780,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "caption",
                                    sx: {
                                        color: themeConfig.textMuted
                                    },
                                    children: "Chronological financial records stamped with staff identity & GST compliance"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 783,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 779,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 778,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            py: 8,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                            sx: {
                                color: themeConfig.primary
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 791,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 790,
                        columnNumber: 11
                    }, this) : payments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            py: 8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$EmptyState$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "No Payment Records Found",
                            description: "No financial transactions match your selected filter criteria. Try changing filters or search terms."
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 795,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 794,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableContainer$2f$TableContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
                        sx: {
                            overflowX: "auto",
                            "&::-webkit-scrollbar": {
                                height: "6px",
                                width: "6px"
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "rgba(0,0,0,0.02)"
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: themeConfig.border,
                                borderRadius: "6px"
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                            size: "small",
                            sx: {
                                minWidth: 900
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableHead$2f$TableHead$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                    sx: {
                                        bgcolor: themeConfig.champagne
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Receipt & Time"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 812,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Guest & Room"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 813,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Payment Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 814,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Stage / Reason"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 815,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Amount Paid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 816,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Collector Staff"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 817,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                align: "right",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    py: 1.2,
                                                    whiteSpace: "nowrap"
                                                },
                                                children: "Action"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 818,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                        lineNumber: 811,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 810,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                    children: payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p)=>{
                                        const methodBadge = getMethodBadge(p.paymentMethod);
                                        const typeBadge = getTypeBadge(p.paymentType);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            hover: true,
                                            sx: {
                                                "&:hover": {
                                                    bgcolor: "rgba(12, 39, 59, 0.02)"
                                                },
                                                transition: "background-color 0.2s ease"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: themeConfig.primary,
                                                                fontSize: "0.85rem"
                                                            },
                                                            children: [
                                                                "#",
                                                                p.receiptNumber
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 839,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontSize: "0.72rem",
                                                                display: "block"
                                                            },
                                                            children: [
                                                                "📅 ",
                                                                p.dateStr,
                                                                " • ⏰ ",
                                                                p.timeStr
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 842,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 838,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                sx: {
                                                                    p: 0.5,
                                                                    borderRadius: "6px",
                                                                    bgcolor: themeConfig.champagne,
                                                                    color: themeConfig.primary,
                                                                    display: "flex",
                                                                    alignItems: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MeetingRoom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    sx: {
                                                                        fontSize: 15
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                                    lineNumber: 851,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                                lineNumber: 850,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain,
                                                                            fontSize: "0.82rem"
                                                                        },
                                                                        children: [
                                                                            "Room ",
                                                                            p.booking?.roomNumber || "N/A",
                                                                            " - ",
                                                                            p.guest?.fullName || "Guest"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        sx: {
                                                                            color: themeConfig.textMuted,
                                                                            fontSize: "0.72rem",
                                                                            display: "block"
                                                                        },
                                                                        children: [
                                                                            "📞 ",
                                                                            p.guest?.mobileNumber || "N/A",
                                                                            " • Folio: #",
                                                                            p.booking?.bookingNumber || "N/A"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                                        lineNumber: 857,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                                lineNumber: 853,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                        lineNumber: 849,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 848,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                            icon: methodBadge.icon,
                                                            label: methodBadge.label,
                                                            size: "small",
                                                            sx: {
                                                                fontWeight: 800,
                                                                bgcolor: methodBadge.bg,
                                                                color: methodBadge.color,
                                                                border: `1px solid ${methodBadge.border}`,
                                                                borderRadius: "8px",
                                                                height: 24,
                                                                fontSize: "0.72rem"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 866,
                                                            columnNumber: 25
                                                        }, this),
                                                        p.transactionId && p.transactionId !== "N/A" && p.transactionId !== "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                display: "block",
                                                                color: themeConfig.textMuted,
                                                                fontSize: "0.7rem",
                                                                mt: 0.2
                                                            },
                                                            children: [
                                                                "Ref: ",
                                                                p.transactionId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 881,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 865,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                        label: typeBadge.label,
                                                        size: "small",
                                                        sx: {
                                                            fontWeight: 700,
                                                            bgcolor: typeBadge.bg,
                                                            color: typeBadge.color,
                                                            borderRadius: "6px",
                                                            height: 22,
                                                            fontSize: "0.72rem"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                        lineNumber: 889,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 888,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: "#059669",
                                                                fontSize: "0.9rem"
                                                            },
                                                            children: [
                                                                "₹",
                                                                (p.amount || 0).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 905,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: "#059669",
                                                                fontSize: "0.7rem",
                                                                fontWeight: 700
                                                            },
                                                            children: "PAID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 908,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 904,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 800,
                                                                color: themeConfig.textMain,
                                                                fontSize: "0.82rem"
                                                            },
                                                            children: p.collectedBy?.name || "Front Desk"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 915,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontSize: "0.7rem",
                                                                textTransform: "uppercase"
                                                            },
                                                            children: p.collectedBy?.role || "Receptionist"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 918,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 914,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        py: 1.1,
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                        size: "small",
                                                        variant: "outlined",
                                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Receipt$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            sx: {
                                                                fontSize: 14
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 928,
                                                            columnNumber: 38
                                                        }, this),
                                                        onClick: ()=>setReceiptModal({
                                                                open: true,
                                                                payment: p
                                                            }),
                                                        className: "btn-3d",
                                                        sx: {
                                                            borderRadius: "8px",
                                                            borderColor: themeConfig.border,
                                                            color: themeConfig.textMain,
                                                            fontWeight: 700,
                                                            fontSize: "0.75rem",
                                                            textTransform: "none",
                                                            bgcolor: "#FFFFFF",
                                                            py: 0.3,
                                                            px: 1.2
                                                        },
                                                        children: "Receipt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                        lineNumber: 925,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 924,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, p._id, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 829,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 821,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 809,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 801,
                        columnNumber: 11
                    }, this),
                    payments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TablePagination$2f$TablePagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__["TablePagination"], {
                        rowsPerPageOptions: [
                            5,
                            10,
                            25,
                            50
                        ],
                        component: "div",
                        count: payments.length,
                        rowsPerPage: rowsPerPage,
                        page: page,
                        onPageChange: (e, newPage)=>setPage(newPage),
                        onRowsPerPageChange: (e)=>{
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        },
                        sx: {
                            borderTop: `1px solid ${themeConfig.border}`,
                            bgcolor: "#FFFFFF"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 956,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 768,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: collectModalOpen,
                onClose: ()=>!collectLoading && setCollectModalOpen(false),
                slotProps: {
                    paper: {
                        sx: {
                            borderRadius: "20px",
                            p: 2,
                            maxWidth: 520,
                            border: `1px solid ${themeConfig.border}`
                        }
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        component: "div",
                        sx: {
                            fontWeight: 900,
                            color: themeConfig.textMain,
                            pb: 1
                        },
                        children: "💰 Collect Folio Payment"
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 981,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                pt: 1
                            },
                            children: [
                                collectError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                    severity: "error",
                                    children: collectError
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 986,
                                    columnNumber: 30
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    fullWidth: true,
                                    size: "small",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                                            children: "Select Active Guest / Room Folio *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 990,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            value: collectData.bookingId,
                                            label: "Select Active Guest / Room Folio *",
                                            onChange: (e)=>{
                                                const bId = e.target.value;
                                                const b = checkedInBookings.find((x)=>x._id === bId);
                                                setCollectData({
                                                    ...collectData,
                                                    bookingId: bId,
                                                    amount: b?.dueAmount ? String(b.dueAmount) : collectData.amount
                                                });
                                            },
                                            children: checkedInBookings.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: b._id,
                                                    children: [
                                                        "Room ",
                                                        b.roomNumber || b.room?.roomNumber,
                                                        " - ",
                                                        b.guest?.fullName || b.guest?.name,
                                                        " (Due: ₹",
                                                        (b.dueAmount || 0).toLocaleString(),
                                                        ")"
                                                    ]
                                                }, b._id, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1005,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 991,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 989,
                                    columnNumber: 13
                                }, this),
                                selectedBookingDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        p: 1.5,
                                        bgcolor: themeConfig.champagne,
                                        borderRadius: "10px",
                                        fontSize: "0.85rem"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                fontWeight: 800,
                                                color: themeConfig.textMuted
                                            },
                                            children: "Folio Balance Overview:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1014,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mt: 0.5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Total Tariff: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                "₹",
                                                                (selectedBookingDetails.totalAmount || 0).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 1016,
                                                            columnNumber: 39
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1016,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Paid: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            style: {
                                                                color: "#059669"
                                                            },
                                                            children: [
                                                                "₹",
                                                                (selectedBookingDetails.paidAmount || 0).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 1017,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1017,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Pending Due: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            style: {
                                                                color: themeConfig.danger
                                                            },
                                                            children: [
                                                                "₹",
                                                                (selectedBookingDetails.dueAmount || 0).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                            lineNumber: 1018,
                                                            columnNumber: 38
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1018,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1015,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1013,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                    size: "small",
                                    label: "Collection Amount (₹) *",
                                    type: "number",
                                    value: collectData.amount,
                                    onChange: (e)=>setCollectData({
                                            ...collectData,
                                            amount: e.target.value
                                        }),
                                    fullWidth: true,
                                    slotProps: {
                                        input: {
                                            startAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputAdornment$2f$InputAdornment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                                                position: "start",
                                                children: "₹"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 1033,
                                                columnNumber: 35
                                            }, this)
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1024,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                    fullWidth: true,
                                    size: "small",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$InputLabel$2f$InputLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                                            children: "Payment Method *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1040,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                            value: collectData.paymentMethod,
                                            label: "Payment Method *",
                                            onChange: (e)=>setCollectData({
                                                    ...collectData,
                                                    paymentMethod: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "UPI",
                                                    children: "🟣 UPI QR Code (GPay / PhonePe / Paytm)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1046,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "CASH",
                                                    children: "🟢 Cash Counter Drawer"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "CARD",
                                                    children: "🔵 Card POS Terminal"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1048,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                    value: "BANK_TRANSFER",
                                                    children: "🟠 Bank Transfer / NEFT / RTGS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1049,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1041,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1039,
                                    columnNumber: 13
                                }, this),
                                collectData.paymentMethod === "UPI" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        p: 2,
                                        bgcolor: "#F5F3FF",
                                        borderRadius: "14px",
                                        border: "1px solid #DDD6FE",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "subtitle2",
                                            sx: {
                                                fontWeight: 900,
                                                color: "#7C3AED"
                                            },
                                            children: [
                                                "Scan UPI QR to Pay ₹",
                                                Number(collectData.amount || 0).toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1068,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            component: "img",
                                            src: dynamicQrCodeUrl,
                                            alt: "UPI QR Code",
                                            sx: {
                                                width: 170,
                                                height: 170,
                                                borderRadius: "10px",
                                                bgcolor: "#FFFFFF",
                                                p: 1,
                                                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1071,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                fontWeight: 800,
                                                color: "#7C3AED"
                                            },
                                            children: [
                                                "UPI ID: ",
                                                activeUpiId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1084,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1055,
                                    columnNumber: 15
                                }, this),
                                collectData.paymentMethod === "UPI" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                    size: "small",
                                    label: "UPI UTR / Reference ID",
                                    placeholder: "e.g. 324512984512",
                                    value: collectData.transactionId,
                                    onChange: (e)=>setCollectData({
                                            ...collectData,
                                            transactionId: e.target.value
                                        }),
                                    fullWidth: true
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1092,
                                    columnNumber: 15
                                }, this),
                                collectData.paymentMethod === "CARD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 1.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            size: "small",
                                            label: "Card Last 4 Digits",
                                            placeholder: "e.g. 4022",
                                            value: collectData.paymentReference,
                                            onChange: (e)=>setCollectData({
                                                    ...collectData,
                                                    paymentReference: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1104,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            size: "small",
                                            label: "POS Approval Auth Code",
                                            placeholder: "e.g. 981245",
                                            value: collectData.transactionId,
                                            onChange: (e)=>setCollectData({
                                                    ...collectData,
                                                    transactionId: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1103,
                                    columnNumber: 15
                                }, this),
                                collectData.paymentMethod === "BANK_TRANSFER" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 1.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            size: "small",
                                            label: "Bank Name",
                                            placeholder: "e.g. HDFC / SBI / ICICI",
                                            value: collectData.paymentReference,
                                            onChange: (e)=>setCollectData({
                                                    ...collectData,
                                                    paymentReference: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1123,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            size: "small",
                                            label: "NEFT / RTGS UTR Number",
                                            placeholder: "e.g. UTIB000123...",
                                            value: collectData.transactionId,
                                            onChange: (e)=>setCollectData({
                                                    ...collectData,
                                                    transactionId: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1130,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                    size: "small",
                                    label: "Staff Notes / Remarks (Optional)",
                                    placeholder: "e.g. Settled remaining dining bill",
                                    value: collectData.note,
                                    onChange: (e)=>setCollectData({
                                            ...collectData,
                                            note: e.target.value
                                        }),
                                    fullWidth: true
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 985,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 984,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        sx: {
                            p: 2,
                            gap: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                onClick: ()=>setCollectModalOpen(false),
                                disabled: collectLoading,
                                sx: {
                                    borderRadius: "10px",
                                    color: themeConfig.textMuted
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 1151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                onClick: handleRecordPayment,
                                disabled: collectLoading,
                                className: "btn-3d",
                                sx: {
                                    background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                    borderRadius: "10px",
                                    fontWeight: 800
                                },
                                children: collectLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                    size: 20,
                                    sx: {
                                        color: "#FFFFFF"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1169,
                                    columnNumber: 31
                                }, this) : "Record & Print Receipt"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 1158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                        lineNumber: 1150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 976,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: receiptModal.open,
                onClose: ()=>setReceiptModal({
                        open: false,
                        payment: null
                    }),
                slotProps: {
                    paper: {
                        sx: {
                            borderRadius: "20px",
                            p: 3,
                            maxWidth: 580,
                            border: `1px solid ${themeConfig.border}`
                        }
                    }
                },
                children: receiptModal.payment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    id: "printable-payment-receipt",
                    sx: {
                        p: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                pb: 2,
                                borderBottom: `2px solid ${themeConfig.primary}`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            sx: {
                                                fontWeight: 900,
                                                color: themeConfig.textMain
                                            },
                                            children: hotelName
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: user?.hotel?.address || "Hotel Operations & Front Desk Billing Hub"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1188,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: [
                                                "GSTIN: ",
                                                user?.hotel?.gstNumber || "24AAACG1234F1Z5",
                                                " • UPI: ",
                                                activeUpiId
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1191,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        textAlign: "right"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "subtitle2",
                                            sx: {
                                                fontWeight: 900,
                                                color: themeConfig.primary
                                            },
                                            children: "OFFICIAL PAYMENT VOUCHER"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            sx: {
                                                fontWeight: 900,
                                                color: themeConfig.textMain
                                            },
                                            children: [
                                                "#",
                                                receiptModal.payment.receiptNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1199,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: receiptModal.payment.timestamp
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1202,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 1183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                my: 2.5,
                                p: 2,
                                bgcolor: themeConfig.champagne,
                                borderRadius: "12px",
                                display: "flex",
                                justifyContent: "space-between"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                fontWeight: 800,
                                                color: themeConfig.textMuted,
                                                textTransform: "uppercase"
                                            },
                                            children: "Received From:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1211,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            sx: {
                                                fontWeight: 900,
                                                color: themeConfig.textMain
                                            },
                                            children: receiptModal.payment.guest?.fullName || "Guest"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: [
                                                "Mobile: ",
                                                receiptModal.payment.guest?.mobileNumber || "N/A"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1210,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        textAlign: "right"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                fontWeight: 800,
                                                color: themeConfig.textMuted,
                                                textTransform: "uppercase"
                                            },
                                            children: "Room Allocation:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1220,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            sx: {
                                                fontWeight: 900,
                                                color: themeConfig.primary
                                            },
                                            children: [
                                                "Room ",
                                                receiptModal.payment.booking?.roomNumber || "N/A"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: [
                                                "Folio: #",
                                                receiptModal.payment.booking?.bookingNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1224,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 1209,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableContainer$2f$TableContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
                            sx: {
                                mb: 2,
                                borderRadius: "10px",
                                border: `1px solid ${themeConfig.border}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                size: "small",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMuted
                                                    },
                                                    children: "Payment Stage / Reason"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1235,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: receiptModal.payment.paymentType
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1236,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1234,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMuted
                                                    },
                                                    children: "Payment Mode"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1241,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: receiptModal.payment.paymentMethod
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1242,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1240,
                                            columnNumber: 19
                                        }, this),
                                        receiptModal.payment.transactionId && receiptModal.payment.transactionId !== "N/A" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMuted
                                                    },
                                                    children: "Transaction / UTR Ref"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1248,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: receiptModal.payment.transactionId
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1249,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1247,
                                            columnNumber: 21
                                        }, this),
                                        receiptModal.payment.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMuted
                                                    },
                                                    children: "Remarks"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1256,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        color: themeConfig.textMain
                                                    },
                                                    children: receiptModal.payment.note
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1257,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1255,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            sx: {
                                                bgcolor: themeConfig.champagne
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        fontWeight: 900,
                                                        fontSize: "1rem"
                                                    },
                                                    children: "Total Amount Received"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1263,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "right",
                                                    sx: {
                                                        fontWeight: 900,
                                                        fontSize: "1.1rem",
                                                        color: "#059669"
                                                    },
                                                    children: [
                                                        "₹",
                                                        (receiptModal.payment.amount || 0).toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1264,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1262,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1233,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                lineNumber: 1232,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 1231,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                pt: 2,
                                borderTop: `1px dashed ${themeConfig.border}`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: [
                                                "Collected By: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: receiptModal.payment.collectedBy?.name || "Front Desk"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                    lineNumber: 1276,
                                                    columnNumber: 33
                                                }, this),
                                                " (",
                                                receiptModal.payment.collectedBy?.role || "Receptionist",
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1275,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted,
                                                display: "block"
                                            },
                                            children: "Computer-generated authorized receipt • Valid without physical signature"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1278,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1274,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        textAlign: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                width: 120,
                                                borderBottom: `1px solid ${themeConfig.border}`,
                                                mb: 0.5
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1283,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                color: themeConfig.textMuted
                                            },
                                            children: "Authorized Signatory"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1284,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1282,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 1273,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                            sx: {
                                p: 0,
                                pt: 3,
                                display: "flex",
                                justifyContent: "space-between"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: ()=>setReceiptModal({
                                            open: false,
                                            payment: null
                                        }),
                                    sx: {
                                        borderRadius: "10px"
                                    },
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1290,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "flex",
                                        gap: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            variant: "outlined",
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 1296,
                                                columnNumber: 30
                                            }, this),
                                            onClick: ()=>{
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$pdfGenerator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadPaymentReceiptPDF"])(receiptModal.payment, {
                                                    ...hotelSettings,
                                                    ...user?.hotel || {}
                                                });
                                                showToast("Payment Receipt downloaded / opened!");
                                            },
                                            sx: {
                                                borderRadius: "10px",
                                                borderColor: themeConfig.border,
                                                color: themeConfig.textMain,
                                                fontWeight: 700
                                            },
                                            children: "Download PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1294,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            variant: "contained",
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Print$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                                lineNumber: 1307,
                                                columnNumber: 30
                                            }, this),
                                            onClick: ()=>{
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$pdfGenerator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadPaymentReceiptPDF"])(receiptModal.payment, {
                                                    ...hotelSettings,
                                                    ...user?.hotel || {}
                                                });
                                            },
                                            className: "btn-3d",
                                            sx: {
                                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                borderRadius: "10px",
                                                fontWeight: 800
                                            },
                                            children: "Print / Save PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                            lineNumber: 1305,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                                    lineNumber: 1293,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                            lineNumber: 1289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                    lineNumber: 1181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
                lineNumber: 1175,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/PaymentLedgerView.jsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_s(PaymentLedgerView, "eYGQn8Zb4hLaNN/Fx/+4nQ8NH7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = PaymentLedgerView;
var _c;
__turbopack_context__.k.register(_c, "PaymentLedgerView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/SettingsView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Tabs/Tabs.mjs [app-client] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Tab/Tab.mjs [app-client] (ecmascript) <export default as Tab>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TextField/TextField.mjs [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Grid/Grid.mjs [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Card/Card.mjs [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CardContent/CardContent.mjs [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Avatar/Avatar.mjs [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Divider/Divider.mjs [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Switch/Switch.mjs [app-client] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Alert/Alert.mjs [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Tooltip/Tooltip.mjs [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Paper/Paper.mjs [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Accordion$2f$Accordion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accordion$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Accordion/Accordion.mjs [app-client] (ecmascript) <export default as Accordion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionSummary$2f$AccordionSummary$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionSummary$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/AccordionSummary/AccordionSummary.mjs [app-client] (ecmascript) <export default as AccordionSummary>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionDetails$2f$AccordionDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionDetails$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/AccordionDetails/AccordionDetails.mjs [app-client] (ecmascript) <export default as AccordionDetails>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/MenuItem/MenuItem.mjs [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/FormControl/FormControl.mjs [app-client] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Select/Select.mjs [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.mjs [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Palette$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Palette.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Person$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Person.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Settings.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Help$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Help.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/CheckCircle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VpnKey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/VpnKey.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SupportAgent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/SupportAgent.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Refresh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Refresh.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/VolumeUp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NotificationsActive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/NotificationsActive.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TableRows$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/TableRows.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/ExpandMore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccessTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/AccessTime.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Schedule$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Schedule.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Hotel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$InfoOutlined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/InfoOutlined.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WarningAmber$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/WarningAmber.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Public$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Public.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/timeUtils.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const TIMEZONE_OPTIONS = [
    {
        value: "Asia/Kolkata",
        label: "Asia/Kolkata (IST - UTC+05:30) [Default]"
    },
    {
        value: "Asia/Dubai",
        label: "Asia/Dubai (GST - UTC+04:00)"
    },
    {
        value: "Asia/Singapore",
        label: "Asia/Singapore (SGT - UTC+08:00)"
    },
    {
        value: "Asia/Bangkok",
        label: "Asia/Bangkok (ICT - UTC+07:00)"
    },
    {
        value: "Europe/London",
        label: "Europe/London (GMT/BST - UTC+00:00/+01:00)"
    },
    {
        value: "Europe/Paris",
        label: "Europe/Paris (CET/CEST - UTC+01:00/+02:00)"
    },
    {
        value: "America/New_York",
        label: "America/New_York (EST/EDT - UTC-05:00/-04:00)"
    },
    {
        value: "America/Los_Angeles",
        label: "America/Los_Angeles (PST/PDT - UTC-08:00/-07:00)"
    },
    {
        value: "Australia/Sydney",
        label: "Australia/Sydney (AEST/AEDT - UTC+10:00/+11:00)"
    }
];
function SettingsView({ user, onUpdateProfile, onUpdateHotelSettings }) {
    _s();
    const { paletteKey, setPaletteKey, themeConfig, themePalettes, settings, updateSettings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const [activeSubTab, setActiveSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Profile Form State
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.name || "");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.phone || "+91 98765 43210");
    const [currentPassword, setCurrentPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [profileMsg, setProfileMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        message: "",
        severity: "success"
    });
    // Hotel Check-In / Check-Out Timings State
    const [checkInTime, setCheckInTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(user?.hotel?.settings?.checkInTime || "14:00"));
    const [checkOutTime, setCheckOutTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(user?.hotel?.settings?.checkOutTime || "12:00"));
    const [timezone, setTimezone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.timezone || "Asia/Kolkata");
    const [upiId, setUpiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.upiId || "jatinkakadiya234-1@okicici");
    const [beneficiaryName, setBeneficiaryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.bankDetails?.beneficiaryName || user?.hotel?.name || "");
    const [bankName, setBankName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.bankDetails?.bankName || "HDFC Bank");
    const [accountNumber, setAccountNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.bankDetails?.accountNumber || "");
    const [ifscCode, setIfscCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings?.bankDetails?.ifscCode || "");
    const [timingsMsg, setTimingsMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        message: "",
        severity: "success"
    });
    const [savingTimings, setSavingTimings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSaveProfile = (e)=>{
        e.preventDefault();
        if (newPassword && newPassword !== confirmPassword) {
            setProfileMsg({
                show: true,
                message: "New passwords do not match!",
                severity: "error"
            });
            return;
        }
        setProfileMsg({
            show: true,
            message: "Profile settings saved successfully!",
            severity: "success"
        });
        if (onUpdateProfile) {
            onUpdateProfile({
                name,
                phone
            });
        }
        setTimeout(()=>{
            setProfileMsg({
                show: false,
                message: "",
                severity: "success"
            });
        }, 3500);
    };
    const handleSaveHotelTimings = async (e)=>{
        e.preventDefault();
        // Validate Check-in and Check-out timings according to hotel booking rules
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateHotelTimings"])(checkInTime, checkOutTime);
        if (!validation.valid) {
            setTimingsMsg({
                show: true,
                message: validation.error,
                severity: "error"
            });
            return;
        }
        setSavingTimings(true);
        try {
            const updatedPayload = {
                settings: {
                    checkInTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkInTime),
                    checkOutTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkOutTime),
                    timezone: timezone || "Asia/Kolkata",
                    upiId: (upiId || "hotel.frontdesk@okhdfcbank").trim(),
                    bankDetails: {
                        beneficiaryName: beneficiaryName.trim(),
                        bankName: bankName.trim(),
                        accountNumber: accountNumber.trim(),
                        ifscCode: ifscCode.trim()
                    }
                }
            };
            // Call Backend API to persist in database
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.PROFILE, {
                method: "PUT",
                body: updatedPayload
            }).catch((err)=>{
                console.warn("API save fallback (offline/mock):", err.message);
                return {
                    success: true
                };
            });
            // Update local storage session
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem("user");
                if (stored) {
                    try {
                        const u = JSON.parse(stored);
                        if (!u.hotel) u.hotel = {};
                        if (!u.hotel.settings) u.hotel.settings = {};
                        u.hotel.settings.checkInTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkInTime);
                        u.hotel.settings.checkOutTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkOutTime);
                        u.hotel.settings.timezone = timezone || "Asia/Kolkata";
                        localStorage.setItem("user", JSON.stringify(u));
                    } catch  {}
                }
            }
            if (onUpdateHotelSettings) {
                onUpdateHotelSettings({
                    checkInTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkInTime),
                    checkOutTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime24Hour"])(checkOutTime),
                    timezone: timezone || "Asia/Kolkata"
                });
            }
            setTimingsMsg({
                show: true,
                message: `Hotel timings saved successfully! Check-In: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkInTime)} | Check-Out: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkOutTime)} (${timezone})`,
                severity: "success"
            });
        } catch (err) {
            setTimingsMsg({
                show: true,
                message: err.message || "Failed to save timings.",
                severity: "error"
            });
        } finally{
            setSavingTimings(false);
            setTimeout(()=>{
                setTimingsMsg((prev)=>({
                        ...prev,
                        show: false
                    }));
            }, 5000);
        }
    };
    const getRoleBadge = (role)=>{
        switch(role){
            case "SUPER_ADMIN":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                    label: "SUPER ADMIN",
                    size: "small",
                    sx: {
                        bgcolor: "#7e22ce",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(126, 34, 206, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, this);
            case "HOTEL_ADMIN":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                    label: "HOTEL ADMIN",
                    size: "small",
                    sx: {
                        bgcolor: themeConfig.primary,
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        borderRadius: "10px",
                        boxShadow: `0 4px 12px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, this);
            case "RECEPTIONIST":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                    label: "RECEPTIONIST",
                    size: "small",
                    sx: {
                        bgcolor: "#2563eb",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 241,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                    label: role || "USER",
                    size: "small",
                    sx: {
                        borderRadius: "10px",
                        fontWeight: 700
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 255,
                    columnNumber: 16
                }, this);
        }
    };
    const isHotelAdmin = user?.role === "HOTEL_ADMIN";
    const isSuperAdmin = user?.role === "SUPER_ADMIN";
    const availableTabs = [
        {
            id: "themes",
            label: "Theme & Color Palettes",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Palette$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "small"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 263,
                columnNumber: 60
            }, this)
        },
        ...isHotelAdmin ? [
            {
                id: "timings",
                label: "Hotel Timings & Operations",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccessTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    fontSize: "small"
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 264,
                    columnNumber: 85
                }, this)
            }
        ] : [],
        {
            id: "profile",
            label: "My Profile & Security",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Person$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "small"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 265,
                columnNumber: 60
            }, this)
        },
        {
            id: "preferences",
            label: "System Preferences",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "small"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 266,
                columnNumber: 61
            }, this)
        },
        {
            id: "help",
            label: "Help & Knowledge Base",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Help$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "small"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 267,
                columnNumber: 57
            }, this)
        }
    ];
    const currentTab = availableTabs[activeSubTab]?.id || "themes";
    const paletteEntries = Object.entries(themePalettes);
    const turnaroundWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTurnaroundWindow"])(checkInTime, checkOutTime);
    const timingValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateHotelTimings"])(checkInTime, checkOutTime);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            p: {
                xs: 2,
                sm: 3,
                md: 4
            },
            bgcolor: themeConfig.bgMain,
            minHeight: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mb: 3.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                            sx: {
                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                width: 48,
                                height: 48,
                                borderRadius: "16px",
                                boxShadow: `0 6px 18px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                border: "2px solid #FFFFFF"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    color: "#FFFFFF",
                                    fontSize: 26
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h5",
                                    sx: {
                                        fontWeight: 900,
                                        color: themeConfig.textMain,
                                        letterSpacing: "-0.02em"
                                    },
                                    children: "Settings & Preferences"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    sx: {
                                        color: themeConfig.textMuted,
                                        fontWeight: 500
                                    },
                                    children: isSuperAdmin ? "Manage SaaS governance themes, master profile, security credentials, system behavior & support desk" : "Manage themes, hotel check-in/out timings, personal profile, system behavior & support desk"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                sx: {
                    borderRadius: "24px",
                    border: `1.5px solid ${themeConfig.border}`,
                    bgcolor: "#FFFFFF",
                    boxShadow: "0 20px 45px -12px rgba(12, 39, 59, 0.08), 0 4px 16px rgba(0,0,0,0.02), inset 0 1px 0 #FFFFFF",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            borderBottom: `1.5px solid ${themeConfig.border}`,
                            px: {
                                xs: 1.5,
                                sm: 3
                            },
                            py: 1,
                            bgcolor: "rgba(248, 250, 252, 0.7)",
                            backdropFilter: "blur(10px)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                            value: activeSubTab >= availableTabs.length ? 0 : activeSubTab,
                            onChange: (e, v)=>setActiveSubTab(v),
                            variant: "scrollable",
                            scrollButtons: "auto",
                            sx: {
                                minHeight: 48,
                                "& .MuiTabs-flexContainer": {
                                    gap: 1
                                },
                                "& .MuiTab-root": {
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "0.88rem",
                                    py: 1.2,
                                    px: 2,
                                    minHeight: 44,
                                    borderRadius: "14px",
                                    color: themeConfig.textMuted,
                                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                                    "&.Mui-selected": {
                                        color: "#FFFFFF",
                                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                        boxShadow: `0 4px 14px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                        transform: "translateY(-1px)"
                                    },
                                    "&:hover:not(.Mui-selected)": {
                                        bgcolor: themeConfig.champagne,
                                        color: themeConfig.primaryDark
                                    }
                                },
                                "& .MuiTabs-indicator": {
                                    display: "none"
                                }
                            },
                            children: availableTabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                    icon: tab.icon,
                                    iconPosition: "start",
                                    label: tab.label
                                }, tab.id, false, {
                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: {
                                xs: 2.5,
                                sm: 3.5,
                                md: 4
                            }
                        },
                        children: [
                            currentTab === "themes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    mb: 0.5
                                                },
                                                children: "Select Theme Palette"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    color: themeConfig.textMuted
                                                },
                                                children: "Choose any color palette below to instantly update the entire dashboard across all panels."
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        container: true,
                                        spacing: 2.5,
                                        children: paletteEntries.map(([key, pal])=>{
                                            const isCurrent = paletteKey === key;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                    onClick: ()=>setPaletteKey(key),
                                                    sx: {
                                                        cursor: "pointer",
                                                        borderRadius: "20px",
                                                        border: isCurrent ? `2.5px solid ${pal.primary}` : `1.5px solid ${themeConfig.border}`,
                                                        bgcolor: isCurrent ? pal.bgMain : "#FFFFFF",
                                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                                        boxShadow: isCurrent ? `0 12px 28px -4px ${pal.primaryGlow}, 0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 #FFFFFF` : "0 4px 14px rgba(12, 39, 59, 0.03), inset 0 1px 0 #FFFFFF",
                                                        transform: isCurrent ? "translateY(-3px) scale(1.01)" : "none",
                                                        "&:hover": {
                                                            transform: "translateY(-4px) scale(1.02)",
                                                            borderColor: pal.primary,
                                                            boxShadow: `0 14px 30px -4px ${pal.primaryGlow}, inset 0 1px 0 #FFFFFF`
                                                        }
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                                        sx: {
                                                            p: 2.5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                sx: {
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    mb: 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "subtitle1",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: pal.textMain,
                                                                            fontSize: "0.95rem"
                                                                        },
                                                                        children: pal.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 409,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            fontSize: "small",
                                                                            sx: {
                                                                                color: "#FFFFFF !important"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 414,
                                                                            columnNumber: 39
                                                                        }, this),
                                                                        label: "ACTIVE",
                                                                        size: "small",
                                                                        sx: {
                                                                            background: `linear-gradient(135deg, ${pal.primary} 0%, ${pal.primaryDark} 100%)`,
                                                                            color: "#FFFFFF",
                                                                            fontWeight: 800,
                                                                            fontSize: "0.7rem",
                                                                            height: 26,
                                                                            borderRadius: "10px",
                                                                            boxShadow: `0 3px 10px ${pal.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                        size: "small",
                                                                        variant: "outlined",
                                                                        sx: {
                                                                            py: 0.4,
                                                                            px: 1.5,
                                                                            fontSize: "0.75rem",
                                                                            fontWeight: 700,
                                                                            borderColor: pal.border,
                                                                            color: pal.primaryDark,
                                                                            borderRadius: "10px",
                                                                            bgcolor: "#FFFFFF",
                                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                                                                            "&:hover": {
                                                                                bgcolor: pal.primaryGlow,
                                                                                borderColor: pal.primary,
                                                                                transform: "translateY(-1px)"
                                                                            }
                                                                        },
                                                                        children: "Apply"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 408,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                sx: {
                                                                    display: "flex",
                                                                    gap: 1.2,
                                                                    alignItems: "center"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: `Primary: ${pal.primary}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                width: 32,
                                                                                height: 32,
                                                                                borderRadius: "10px",
                                                                                bgcolor: pal.primary,
                                                                                border: "2px solid #FFFFFF",
                                                                                boxShadow: `0 4px 10px ${pal.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.5)`,
                                                                                transition: "transform 0.2s ease",
                                                                                "&:hover": {
                                                                                    transform: "scale(1.15)"
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 456,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: `Primary Dark: ${pal.primaryDark}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                width: 28,
                                                                                height: 28,
                                                                                borderRadius: "9px",
                                                                                bgcolor: pal.primaryDark,
                                                                                border: "2px solid #FFFFFF",
                                                                                boxShadow: "0 3px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                                                                                transition: "transform 0.2s ease",
                                                                                "&:hover": {
                                                                                    transform: "scale(1.15)"
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 470,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 469,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: `Primary Light: ${pal.primaryLight}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                width: 28,
                                                                                height: 28,
                                                                                borderRadius: "9px",
                                                                                bgcolor: pal.primaryLight,
                                                                                border: "2px solid #FFFFFF",
                                                                                boxShadow: "0 3px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                                                                                transition: "transform 0.2s ease",
                                                                                "&:hover": {
                                                                                    transform: "scale(1.15)"
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 484,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 483,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: `Background: ${pal.bgMain}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                width: 28,
                                                                                height: 28,
                                                                                borderRadius: "9px",
                                                                                bgcolor: pal.bgMain,
                                                                                border: `1.5px solid ${pal.border}`,
                                                                                boxShadow: "0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 #FFFFFF",
                                                                                transition: "transform 0.2s ease",
                                                                                "&:hover": {
                                                                                    transform: "scale(1.15)"
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 498,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 497,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: `Border: ${pal.border}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                width: 28,
                                                                                height: 28,
                                                                                borderRadius: "9px",
                                                                                bgcolor: pal.border,
                                                                                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                                                                                transition: "transform 0.2s ease",
                                                                                "&:hover": {
                                                                                    transform: "scale(1.15)"
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                            lineNumber: 512,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 454,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 407,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 388,
                                                    columnNumber: 23
                                                }, this)
                                            }, key, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 387,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                        sx: {
                                            mt: 4,
                                            p: 3.5,
                                            borderRadius: "20px",
                                            bgcolor: themeConfig.bgMain,
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 8px 24px -6px rgba(12, 39, 59, 0.05), inset 0 1px 0 #FFFFFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            gap: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1.8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            width: 22,
                                                            height: 22,
                                                            borderRadius: "8px",
                                                            bgcolor: themeConfig.primary,
                                                            boxShadow: `0 3px 8px ${themeConfig.primaryGlow}`,
                                                            border: "2px solid #FFFFFF"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 549,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body1",
                                                        sx: {
                                                            fontWeight: 800,
                                                            color: themeConfig.textMain
                                                        },
                                                        children: [
                                                            "Currently Selected: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: themeConfig.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 560,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 559,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    gap: 1.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                        variant: "contained",
                                                        sx: {
                                                            background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                            color: "#FFFFFF",
                                                            fontWeight: 800,
                                                            borderRadius: "12px",
                                                            px: 2.5,
                                                            boxShadow: `0 4px 14px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                                            "&:hover": {
                                                                transform: "translateY(-1px)"
                                                            }
                                                        },
                                                        children: "Primary Button Preview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 564,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                        variant: "outlined",
                                                        sx: {
                                                            borderColor: themeConfig.border,
                                                            bgcolor: "#FFFFFF",
                                                            color: themeConfig.textMain,
                                                            fontWeight: 800,
                                                            borderRadius: "12px",
                                                            px: 2.5,
                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                                                            "&:hover": {
                                                                bgcolor: themeConfig.champagne,
                                                                transform: "translateY(-1px)"
                                                            }
                                                        },
                                                        children: "Outline Button Preview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 578,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 563,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this),
                            currentTab === "timings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                component: "form",
                                onSubmit: handleSaveHotelTimings,
                                sx: {
                                    maxWidth: 880
                                },
                                children: [
                                    timingsMsg.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                        severity: timingsMsg.severity,
                                        sx: {
                                            mb: 3,
                                            borderRadius: "14px",
                                            boxShadow: "0 4px 14px rgba(0,0,0,0.05)"
                                        },
                                        children: timingsMsg.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 604,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 3.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    mb: 0.5
                                                },
                                                children: "Hotel Check-In & Check-Out Timings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    color: themeConfig.textMuted
                                                },
                                                children: "Configure standard hotel check-in time, check-out deadline, and operational timezone used across all reservation folios, desk wizards, and guest documents."
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 610,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        container: true,
                                        spacing: 2.5,
                                        sx: {
                                            mb: 3.5,
                                            alignItems: "stretch"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 3
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        height: "100%",
                                                        borderRadius: "18px",
                                                        border: `1.5px solid ${themeConfig.border}`,
                                                        bgcolor: themeConfig.champagne,
                                                        boxShadow: "0 8px 20px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        minHeight: 145,
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)"
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                justifyContent: "space-between",
                                                                minHeight: 34
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMuted,
                                                                        textTransform: "uppercase",
                                                                        fontSize: "0.68rem",
                                                                        lineHeight: 1.2,
                                                                        minHeight: 28,
                                                                        display: "flex",
                                                                        alignItems: "center"
                                                                    },
                                                                    children: "Check-In Time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    sx: {
                                                                        bgcolor: themeConfig.primary,
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: "10px",
                                                                        boxShadow: `0 2px 6px ${themeConfig.primaryGlow}`,
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccessTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        sx: {
                                                                            color: "#FFFFFF",
                                                                            fontSize: 17
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 645,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 640,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h5",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: themeConfig.textMain,
                                                                fontSize: "1.3rem",
                                                                my: 0.5,
                                                                lineHeight: 1
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkInTime)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 648,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.primaryDark,
                                                                fontWeight: 700,
                                                                fontSize: "0.72rem",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: "Standard Guest Arrival"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 651,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 623,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 622,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 3
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        height: "100%",
                                                        borderRadius: "18px",
                                                        border: `1.5px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        boxShadow: "0 8px 20px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        minHeight: 145,
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)"
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                justifyContent: "space-between",
                                                                minHeight: 34
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMuted,
                                                                        textTransform: "uppercase",
                                                                        fontSize: "0.68rem",
                                                                        lineHeight: 1.2,
                                                                        minHeight: 28,
                                                                        display: "flex",
                                                                        alignItems: "center"
                                                                    },
                                                                    children: "Check-Out Time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    sx: {
                                                                        bgcolor: themeConfig.champagne,
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: "10px",
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Schedule$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        sx: {
                                                                            color: themeConfig.primaryDark,
                                                                            fontSize: 17
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 681,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 676,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h5",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: themeConfig.textMain,
                                                                fontSize: "1.3rem",
                                                                my: 0.5,
                                                                lineHeight: 1
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkOutTime)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 684,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 700,
                                                                fontSize: "0.72rem",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: "Standard Guest Departure"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 687,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 659,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 658,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 3
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        height: "100%",
                                                        borderRadius: "18px",
                                                        border: `1.5px solid ${themeConfig.border}`,
                                                        bgcolor: themeConfig.champagne,
                                                        boxShadow: "0 8px 20px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        minHeight: 145,
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)"
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                justifyContent: "space-between",
                                                                minHeight: 34
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMuted,
                                                                        textTransform: "uppercase",
                                                                        fontSize: "0.68rem",
                                                                        lineHeight: 1.2,
                                                                        minHeight: 28,
                                                                        display: "flex",
                                                                        alignItems: "center"
                                                                    },
                                                                    children: "Housekeeping Buffer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 713,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    sx: {
                                                                        bgcolor: "rgba(16, 185, 129, 0.15)",
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: "10px",
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        sx: {
                                                                            color: themeConfig.success,
                                                                            fontSize: 17
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 717,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 716,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 712,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h5",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: themeConfig.textMain,
                                                                fontSize: "1.3rem",
                                                                my: 0.5,
                                                                lineHeight: 1
                                                            },
                                                            children: turnaroundWindow || "2 hours"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 720,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.success,
                                                                fontWeight: 700,
                                                                fontSize: "0.72rem",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: "Room Cleaning Turnover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 723,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 694,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 3
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        height: "100%",
                                                        borderRadius: "18px",
                                                        border: `1.5px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        boxShadow: "0 8px 20px -4px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        minHeight: 145,
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)"
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                justifyContent: "space-between",
                                                                minHeight: 34
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMuted,
                                                                        textTransform: "uppercase",
                                                                        fontSize: "0.68rem",
                                                                        lineHeight: 1.2,
                                                                        minHeight: 28,
                                                                        display: "flex",
                                                                        alignItems: "center"
                                                                    },
                                                                    children: "Timezone"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 749,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    sx: {
                                                                        bgcolor: themeConfig.champagne,
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: "10px",
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Public$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        sx: {
                                                                            color: themeConfig.primary,
                                                                            fontSize: 17
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 753,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 752,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 748,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h5",
                                                            sx: {
                                                                fontWeight: 900,
                                                                color: themeConfig.textMain,
                                                                fontSize: "1.3rem",
                                                                my: 0.5,
                                                                lineHeight: 1,
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: timezone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 756,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 700,
                                                                fontSize: "0.72rem",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: "Default Operating Zone"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 759,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 731,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 730,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, this),
                                    !timingValidation.valid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                        severity: "warning",
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WarningAmber$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 768,
                                            columnNumber: 49
                                        }, this),
                                        sx: {
                                            mb: 3,
                                            borderRadius: "14px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Booking Rule Violation:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 769,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            timingValidation.error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 768,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                        sx: {
                                            mb: 3.5,
                                            borderRadius: "20px",
                                            bgcolor: themeConfig.bgMain,
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 8px 24px -6px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            sx: {
                                                p: 3.5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "subtitle1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain,
                                                        mb: 2.5,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccessTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            fontSize: "small",
                                                            sx: {
                                                                color: themeConfig.primary
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 777,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Configurable Policy & Schedule"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 776,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    container: true,
                                                    spacing: 3,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Check-In Time * (Standard Arrival)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    type: "time",
                                                                    size: "small",
                                                                    value: checkInTime,
                                                                    onChange: (e)=>setCheckInTime(e.target.value),
                                                                    helperText: `Formally: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkInTime)} (Default: 02:00 PM)`,
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px",
                                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                        },
                                                                        "& .MuiFormHelperText-root": {
                                                                            fontWeight: 700,
                                                                            color: themeConfig.primaryDark
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 786,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 782,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Check-Out Time * (Standard Departure)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 806,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    type: "time",
                                                                    size: "small",
                                                                    value: checkOutTime,
                                                                    onChange: (e)=>setCheckOutTime(e.target.value),
                                                                    helperText: `Formally: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkOutTime)} (Default: 12:00 PM)`,
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px",
                                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                        },
                                                                        "& .MuiFormHelperText-root": {
                                                                            fontWeight: 700,
                                                                            color: themeConfig.primaryDark
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 809,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 805,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Hotel Operating Timezone"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 829,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$FormControl$2f$FormControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                                        value: timezone,
                                                                        onChange: (e)=>setTimezone(e.target.value),
                                                                        sx: {
                                                                            bgcolor: "#FFFFFF",
                                                                            borderRadius: "12px",
                                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                        },
                                                                        children: TIMEZONE_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                                                value: opt.value,
                                                                                sx: {
                                                                                    borderRadius: "8px"
                                                                                },
                                                                                children: opt.label
                                                                            }, opt.value, false, {
                                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                                lineNumber: 843,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 833,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 832,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 828,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 780,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    sx: {
                                                        mt: 3,
                                                        p: 2.5,
                                                        borderRadius: "16px",
                                                        bgcolor: "#FFFFFF",
                                                        border: `1px solid ${themeConfig.border}`,
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: 1.5
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$InfoOutlined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                sx: {
                                                                    color: themeConfig.primary,
                                                                    fontSize: 22,
                                                                    mt: 0.2
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 855,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain
                                                                        },
                                                                        children: "Hotel Turnaround & Booking Integrity Rule:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 857,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        sx: {
                                                                            color: themeConfig.textMuted,
                                                                            lineHeight: 1.5,
                                                                            display: "block",
                                                                            mt: 0.3
                                                                        },
                                                                        children: [
                                                                            "Check-Out Time (",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkOutTime),
                                                                            ") must be earlier than Check-In Time (",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkInTime),
                                                                            ") on the changeover cycle. This gives housekeeping staff ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: turnaroundWindow || "turnaround"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                                lineNumber: 861,
                                                                                columnNumber: 201
                                                                            }, this),
                                                                            " to clean, sanitize, and verify room inventory before incoming guests receive their keycards."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 860,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 856,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 854,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 853,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 775,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 774,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                        sx: {
                                            borderRadius: "20px",
                                            border: `1.5px solid ${themeConfig.border}`,
                                            bgcolor: "rgba(248, 250, 252, 0.6)",
                                            boxShadow: "0 8px 25px -5px rgba(12, 39, 59, 0.05), inset 0 1px 0 #FFFFFF",
                                            mb: 3.5
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            sx: {
                                                p: {
                                                    xs: 2.5,
                                                    sm: 3.5
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1.2,
                                                        mb: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                            sx: {
                                                                bgcolor: themeConfig.primary,
                                                                width: 34,
                                                                height: 34,
                                                                borderRadius: "10px",
                                                                boxShadow: `0 2px 6px ${themeConfig.primaryGlow}`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreditCard, {
                                                                sx: {
                                                                    color: "#FFFFFF",
                                                                    fontSize: 18
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 882,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 881,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h6",
                                                            sx: {
                                                                fontWeight: 800,
                                                                color: themeConfig.textMain,
                                                                fontSize: "1.05rem"
                                                            },
                                                            children: "Hotel UPI QR Code & Bank Settlement Configuration"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 884,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 880,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        mb: 3
                                                    },
                                                    children: "Enter your Hotel UPI ID and official bank settlement account. The Check-In Wizard will automatically encode this UPI ID into dynamic live QR codes for guests."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 888,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    container: true,
                                                    spacing: 2.5,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Hotel UPI ID (for Instant Dynamic QR Payments) *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 895,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    placeholder: "e.g. yourhotel@okhdfcbank or 9876543210@upi",
                                                                    value: upiId,
                                                                    onChange: (e)=>setUpiId(e.target.value),
                                                                    helperText: "Guests scan this UPI ID on the Front Desk check-in screen",
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        borderRadius: "12px",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px"
                                                                        },
                                                                        "& .MuiFormHelperText-root": {
                                                                            fontWeight: 700,
                                                                            color: themeConfig.primaryDark
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 898,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 894,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 6
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Beneficiary / Hotel Merchant Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 916,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    placeholder: "e.g. Hotel Grand Luxury Pvt Ltd",
                                                                    value: beneficiaryName,
                                                                    onChange: (e)=>setBeneficiaryName(e.target.value),
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        borderRadius: "12px",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px"
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 919,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 915,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 4
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Bank Name (for NEFT / IMPS)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 935,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    placeholder: "e.g. HDFC Bank",
                                                                    value: bankName,
                                                                    onChange: (e)=>setBankName(e.target.value),
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        borderRadius: "12px",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px"
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 938,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 934,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 4
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Bank Account Number"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 950,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    placeholder: "e.g. 50200012345678",
                                                                    value: accountNumber,
                                                                    onChange: (e)=>setAccountNumber(e.target.value),
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        borderRadius: "12px",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px"
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 953,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 949,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                            size: {
                                                                xs: 12,
                                                                sm: 4
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain,
                                                                        mb: 0.8,
                                                                        display: "block"
                                                                    },
                                                                    children: "Bank IFSC Code"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 965,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                    fullWidth: true,
                                                                    size: "small",
                                                                    placeholder: "e.g. HDFC0001234",
                                                                    value: ifscCode,
                                                                    onChange: (e)=>setIfscCode(e.target.value),
                                                                    sx: {
                                                                        bgcolor: "#FFFFFF",
                                                                        borderRadius: "12px",
                                                                        "& .MuiOutlinedInput-root": {
                                                                            borderRadius: "12px"
                                                                        }
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 964,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 892,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 879,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 870,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                        sx: {
                                            p: 3,
                                            borderRadius: "18px",
                                            bgcolor: "#FFFFFF",
                                            border: `1.5px dashed ${themeConfig.primary}`,
                                            boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
                                            mb: 3.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle2",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.primaryDark,
                                                    mb: 1.5
                                                },
                                                children: "📋 Live Preview on Guest Reservation Folios & Desk Screens:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 983,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                container: true,
                                                spacing: 2,
                                                sx: {
                                                    fontSize: "0.88rem",
                                                    color: themeConfig.textMain
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Arrival Schedule:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 988,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Check-In from ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkInTime)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 987,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Departure Schedule:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 991,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Check-Out by ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$timeUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime12Hour"])(checkOutTime)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 990,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Active Hotel UPI ID:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 994,
                                                                columnNumber: 21
                                                            }, this),
                                                            " ",
                                                            upiId || "hotel.frontdesk@okhdfcbank"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 993,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 986,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 982,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            type: "submit",
                                            variant: "contained",
                                            disabled: savingTimings || !timingValidation.valid,
                                            startIcon: savingTimings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                                size: 16,
                                                color: "inherit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1005,
                                                columnNumber: 46
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AccessTime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1005,
                                                columnNumber: 95
                                            }, this),
                                            sx: {
                                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                color: "#FFFFFF",
                                                px: 4,
                                                py: 1.3,
                                                fontWeight: 800,
                                                borderRadius: "14px",
                                                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                                "&:hover": {
                                                    transform: "translateY(-1px)",
                                                    boxShadow: `0 6px 18px ${themeConfig.primaryGlow}`
                                                }
                                            },
                                            children: savingTimings ? "Saving Timings..." : "Save Hotel Timings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 1001,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1000,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 602,
                                columnNumber: 13
                            }, this),
                            currentTab === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                component: "form",
                                onSubmit: handleSaveProfile,
                                sx: {
                                    maxWidth: 880
                                },
                                children: [
                                    profileMsg.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                        severity: profileMsg.severity,
                                        sx: {
                                            mb: 3,
                                            borderRadius: "14px",
                                            boxShadow: "0 4px 14px rgba(0,0,0,0.05)"
                                        },
                                        children: profileMsg.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1029,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                        sx: {
                                            mb: 4,
                                            borderRadius: "22px",
                                            bgcolor: themeConfig.bgMain,
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 10px 28px -6px rgba(12, 39, 59, 0.05), inset 0 1px 0 #FFFFFF",
                                            overflow: "hidden"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            sx: {
                                                p: 3.5,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 3,
                                                flexWrap: {
                                                    xs: "wrap",
                                                    sm: "nowrap"
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                    sx: {
                                                        width: 72,
                                                        height: 72,
                                                        borderRadius: "20px",
                                                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                        fontSize: "1.8rem",
                                                        fontWeight: 900,
                                                        border: "3px solid #FFFFFF",
                                                        boxShadow: `0 8px 22px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`
                                                    },
                                                    children: user?.name ? user.name.charAt(0).toUpperCase() : "U"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1046,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1.5,
                                                                mb: 0.5,
                                                                flexWrap: "wrap"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "h6",
                                                                    sx: {
                                                                        fontWeight: 900,
                                                                        color: themeConfig.textMain,
                                                                        fontSize: "1.3rem"
                                                                    },
                                                                    children: user?.name || "Administrator"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 1062,
                                                                    columnNumber: 23
                                                                }, this),
                                                                getRoleBadge(user?.role)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1061,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 500
                                                            },
                                                            children: user?.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1067,
                                                            columnNumber: 21
                                                        }, this),
                                                        user?.hotel?.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.primaryDark,
                                                                fontWeight: 800,
                                                                mt: 0.5,
                                                                display: "block"
                                                            },
                                                            children: [
                                                                "Assigned Property: ",
                                                                user?.hotel?.name,
                                                                " (",
                                                                user?.hotel?.code || "PMS",
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1071,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1060,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 1045,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1035,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    mb: 2.5,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Person$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: themeConfig.primary
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1082,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Personal Information"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1081,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                container: true,
                                                spacing: 2.5,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Full Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1087,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                size: "small",
                                                                value: name,
                                                                onChange: (e)=>setName(e.target.value),
                                                                placeholder: "Your Full Name",
                                                                sx: {
                                                                    bgcolor: "#FFFFFF",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px",
                                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1090,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1086,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Phone Number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1106,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                size: "small",
                                                                value: phone,
                                                                onChange: (e)=>setPhone(e.target.value),
                                                                placeholder: "+91 98765 43210",
                                                                sx: {
                                                                    bgcolor: "#FFFFFF",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px",
                                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Email Address (Account Identifier)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1125,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                size: "small",
                                                                value: user?.email || "",
                                                                disabled: true,
                                                                sx: {
                                                                    bgcolor: "rgba(0,0,0,0.02)",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1128,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1124,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 6
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Assigned Role"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1140,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                size: "small",
                                                                value: user?.role || "SUPER_ADMIN",
                                                                disabled: true,
                                                                sx: {
                                                                    bgcolor: "rgba(0,0,0,0.02)",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1143,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1139,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1085,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1080,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mb: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 3.5,
                                                    borderColor: themeConfig.border
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1159,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "subtitle1",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain,
                                                    mb: 2.5,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VpnKey$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small",
                                                        sx: {
                                                            color: themeConfig.primary
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1161,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Security & Change Password"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1160,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                container: true,
                                                spacing: 2.5,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Current Password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1166,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                type: "password",
                                                                size: "small",
                                                                value: currentPassword,
                                                                onChange: (e)=>setCurrentPassword(e.target.value),
                                                                placeholder: "••••••••",
                                                                sx: {
                                                                    bgcolor: "#FFFFFF",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px",
                                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1169,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1165,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "New Password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1186,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                type: "password",
                                                                size: "small",
                                                                value: newPassword,
                                                                onChange: (e)=>setNewPassword(e.target.value),
                                                                placeholder: "••••••••",
                                                                sx: {
                                                                    bgcolor: "#FFFFFF",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px",
                                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1189,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1185,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        size: {
                                                            xs: 12,
                                                            sm: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontWeight: 700,
                                                                    color: themeConfig.textMain,
                                                                    mb: 0.8,
                                                                    display: "block"
                                                                },
                                                                children: "Confirm Password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                                fullWidth: true,
                                                                type: "password",
                                                                size: "small",
                                                                value: confirmPassword,
                                                                onChange: (e)=>setConfirmPassword(e.target.value),
                                                                placeholder: "••••••••",
                                                                sx: {
                                                                    bgcolor: "#FFFFFF",
                                                                    "& .MuiOutlinedInput-root": {
                                                                        borderRadius: "12px",
                                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1209,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1205,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1164,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            mt: 4,
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            type: "submit",
                                            variant: "contained",
                                            sx: {
                                                background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                color: "#FFFFFF",
                                                px: 4.5,
                                                py: 1.3,
                                                fontWeight: 800,
                                                borderRadius: "14px",
                                                boxShadow: `0 4px 14px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                                "&:hover": {
                                                    transform: "translateY(-1px)",
                                                    boxShadow: `0 6px 18px ${themeConfig.primaryGlow}`
                                                }
                                            },
                                            children: "Save Profile Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                            lineNumber: 1229,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1228,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 1027,
                                columnNumber: 13
                            }, this),
                            currentTab === "preferences" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    maxWidth: 880
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "h6",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.textMain,
                                            mb: 0.5
                                        },
                                        children: "System & Workflow Preferences"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1254,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: themeConfig.textMuted,
                                            mb: 3.5
                                        },
                                        children: "Configure live synchronization, audio alerts, and layout density."
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                        sx: {
                                            p: 3.5,
                                            borderRadius: "22px",
                                            bgcolor: themeConfig.bgMain,
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 10px 28px -6px rgba(12, 39, 59, 0.05), inset 0 1px 0 #FFFFFF"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    py: 1.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 2
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                sx: {
                                                                    bgcolor: themeConfig.champagne,
                                                                    color: themeConfig.primaryDark,
                                                                    width: 44,
                                                                    height: 44,
                                                                    borderRadius: "14px",
                                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Refresh$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 1273,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1272,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body1",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain
                                                                        },
                                                                        children: "Auto-Refresh Live Data (30s)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1276,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            color: themeConfig.textMuted
                                                                        },
                                                                        children: "Automatically poll room status matrix and in-house folios"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1279,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1275,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1271,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                                                        checked: settings.autoRefresh,
                                                        onChange: (e)=>updateSettings({
                                                                autoRefresh: e.target.checked
                                                            }),
                                                        color: "primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 2.5,
                                                    borderColor: themeConfig.border
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    py: 1.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 2
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                sx: {
                                                                    bgcolor: themeConfig.champagne,
                                                                    color: themeConfig.primaryDark,
                                                                    width: 44,
                                                                    height: 44,
                                                                    borderRadius: "14px",
                                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 1296,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1295,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body1",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain
                                                                        },
                                                                        children: "Audio Chime for New Check-ins"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1299,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            color: themeConfig.textMuted
                                                                        },
                                                                        children: "Play sound alert when new guest registration or check-in arrives"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1302,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1294,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                                                        checked: settings.soundAlerts,
                                                        onChange: (e)=>updateSettings({
                                                                soundAlerts: e.target.checked
                                                            }),
                                                        color: "primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1307,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1293,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 2.5,
                                                    borderColor: themeConfig.border
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1314,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    py: 1.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 2
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                sx: {
                                                                    bgcolor: themeConfig.champagne,
                                                                    color: themeConfig.primaryDark,
                                                                    width: 44,
                                                                    height: 44,
                                                                    borderRadius: "14px",
                                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NotificationsActive$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 1319,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1318,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body1",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain
                                                                        },
                                                                        children: "In-App Toast Notifications"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1322,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            color: themeConfig.textMuted
                                                                        },
                                                                        children: "Display instant popup toast notifications on action status"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1325,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1321,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1317,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                                                        checked: settings.notificationsEnabled,
                                                        onChange: (e)=>updateSettings({
                                                                notificationsEnabled: e.target.checked
                                                            }),
                                                        color: "primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1330,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1316,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Divider$2f$Divider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                                sx: {
                                                    my: 2.5,
                                                    borderColor: themeConfig.border
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1337,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    py: 1.5
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 2
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                sx: {
                                                                    bgcolor: themeConfig.champagne,
                                                                    color: themeConfig.primaryDark,
                                                                    width: 44,
                                                                    height: 44,
                                                                    borderRadius: "14px",
                                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TableRows$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                    lineNumber: 1342,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1341,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body1",
                                                                        sx: {
                                                                            fontWeight: 800,
                                                                            color: themeConfig.textMain
                                                                        },
                                                                        children: "Compact Table Density"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1345,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "body2",
                                                                        sx: {
                                                                            color: themeConfig.textMuted
                                                                        },
                                                                        children: "Tighten table padding to maximize visible records on screen"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                        lineNumber: 1348,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1344,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                                                        checked: settings.compactMode,
                                                        onChange: (e)=>updateSettings({
                                                                compactMode: e.target.checked
                                                            }),
                                                        color: "primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1353,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1339,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1261,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 1253,
                                columnNumber: 13
                            }, this),
                            currentTab === "help" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    maxWidth: 880
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "h6",
                                        sx: {
                                            fontWeight: 800,
                                            color: themeConfig.textMain,
                                            mb: 0.5
                                        },
                                        children: "Help Center & Knowledge Base"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1368,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: themeConfig.textMuted,
                                            mb: 3.5
                                        },
                                        children: "Frequently Asked Questions and 24/7 Enterprise Support Channels."
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Accordion$2f$Accordion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accordion$3e$__["Accordion"], {
                                        sx: {
                                            mb: 2,
                                            borderRadius: "16px !important",
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 4px 14px rgba(12, 39, 59, 0.03)",
                                            "&:before": {
                                                display: "none"
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionSummary$2f$AccordionSummary$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionSummary$3e$__["AccordionSummary"], {
                                                expandIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1376,
                                                    columnNumber: 47
                                                }, this),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "subtitle1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: "How do Super Admins approve or reject registered hotels?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1377,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1376,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionDetails$2f$AccordionDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionDetails$3e$__["AccordionDetails"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        lineHeight: 1.6
                                                    },
                                                    children: [
                                                        "Go to the ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Pending Approvals"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1383,
                                                            columnNumber: 31
                                                        }, this),
                                                        " tab. Click on ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Review Dossier"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1383,
                                                            columnNumber: 80
                                                        }, this),
                                                        " to inspect hotel registration details, owner credentials, and tax documents. Click ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Approve & Activate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1383,
                                                            columnNumber: 195
                                                        }, this),
                                                        " to grant 30-day active access, or ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Reject"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1383,
                                                            columnNumber: 269
                                                        }, this),
                                                        " with reason."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1382,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1381,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Accordion$2f$Accordion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accordion$3e$__["Accordion"], {
                                        sx: {
                                            mb: 2,
                                            borderRadius: "16px !important",
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 4px 14px rgba(12, 39, 59, 0.03)",
                                            "&:before": {
                                                display: "none"
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionSummary$2f$AccordionSummary$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionSummary$3e$__["AccordionSummary"], {
                                                expandIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1389,
                                                    columnNumber: 47
                                                }, this),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "subtitle1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: "How does the 5-Step Check-in with Govt ID compliance work?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1390,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1389,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionDetails$2f$AccordionDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionDetails$3e$__["AccordionDetails"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        lineHeight: 1.6
                                                    },
                                                    children: [
                                                        "From the Receptionist Console, navigate to ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "5-Step Check-In"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1396,
                                                            columnNumber: 64
                                                        }, this),
                                                        ". Complete Guest details, select Govt ID document (Aadhaar / Passport / Driving License), choose room type, select check-in/out dates, and finalize billing settlement."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1395,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1388,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Accordion$2f$Accordion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Accordion$3e$__["Accordion"], {
                                        sx: {
                                            mb: 2,
                                            borderRadius: "16px !important",
                                            border: `1.5px solid ${themeConfig.border}`,
                                            boxShadow: "0 4px 14px rgba(12, 39, 59, 0.03)",
                                            "&:before": {
                                                display: "none"
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionSummary$2f$AccordionSummary$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionSummary$3e$__["AccordionSummary"], {
                                                expandIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1402,
                                                    columnNumber: 47
                                                }, this),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "subtitle1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: "How do Hotel Admins add staff receptionists?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1403,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1402,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$AccordionDetails$2f$AccordionDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionDetails$3e$__["AccordionDetails"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        lineHeight: 1.6
                                                    },
                                                    children: [
                                                        "From the Hotel Admin PMS, open the ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Receptionist Staff"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 56
                                                        }, this),
                                                        " tab. Click ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Add Receptionist"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 103
                                                        }, this),
                                                        ", enter full name, email, phone, and assign initial login credentials."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                    lineNumber: 1408,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1407,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                        sx: {
                                            mt: 4,
                                            p: 3.5,
                                            borderRadius: "22px",
                                            bgcolor: "#FFFFFF",
                                            border: `1.5px dashed ${themeConfig.primary}`,
                                            boxShadow: "0 10px 30px -6px rgba(12, 39, 59, 0.06), inset 0 1px 0 #FFFFFF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            gap: 2.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                        sx: {
                                                            background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                            width: 52,
                                                            height: 52,
                                                            borderRadius: "16px",
                                                            boxShadow: `0 6px 16px ${themeConfig.primaryGlow}`
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SupportAgent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            sx: {
                                                                color: "#FFFFFF",
                                                                fontSize: 28
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                            lineNumber: 1440,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1431,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle1",
                                                                sx: {
                                                                    fontWeight: 900,
                                                                    color: themeConfig.textMain
                                                                },
                                                                children: "24/7 Grand Royale SaaS Support"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1443,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "body2",
                                                                sx: {
                                                                    color: themeConfig.textMuted
                                                                },
                                                                children: "Email: support@grandroyale-saas.com | Hotline: +91 (800) 425-6789"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                                lineNumber: 1446,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                        lineNumber: 1442,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1430,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "outlined",
                                                sx: {
                                                    borderColor: themeConfig.primary,
                                                    color: themeConfig.primaryDark,
                                                    fontWeight: 800,
                                                    px: 3,
                                                    py: 1,
                                                    borderRadius: "12px",
                                                    bgcolor: "#FFFFFF",
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                                    "&:hover": {
                                                        bgcolor: themeConfig.champagne,
                                                        transform: "translateY(-1px)"
                                                    }
                                                },
                                                children: "Create Support Ticket"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                                lineNumber: 1451,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                                        lineNumber: 1415,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SettingsView.jsx",
                                lineNumber: 1367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/SettingsView.jsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/SettingsView.jsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/SettingsView.jsx",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
_s(SettingsView, "k6qYEx5EenwjfVfR9+hGGVsRW90=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = SettingsView;
var _c;
__turbopack_context__.k.register(_c, "SettingsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/StatCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Card/Card.mjs [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CardContent/CardContent.mjs [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/TrendingUp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/TrendingDown.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function StatCard({ title, value, subtitle, icon, trend, trendType = "up", color, badgeText }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const cardColor = color || themeConfig.primary;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
        sx: {
            borderRadius: "20px",
            height: "100%",
            minHeight: 175,
            display: "flex",
            flexDirection: "column",
            background: `linear-gradient(135deg, #FFFFFF 0%, #F9FBFC 100%)`,
            border: `1px solid ${themeConfig.borderLight || "#E2E8F0"}`,
            boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.06), 0 8px 10px -6px rgba(12, 39, 59, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            width: "100%",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3.5px",
                background: `linear-gradient(90deg, ${cardColor}, ${themeConfig.primaryLight || cardColor})`,
                opacity: 0.95
            },
            "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 18px 30px -8px rgba(12, 39, 59, 0.12), 0 0 0 1px ${cardColor}40`
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
            sx: {
                p: {
                    xs: 2,
                    sm: 2.2
                },
                "&:last-child": {
                    pb: {
                        xs: 2,
                        sm: 2.2
                    }
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
                height: "100%",
                boxSizing: "border-box"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                minHeight: 40,
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "caption",
                                    title: typeof title === "string" ? title : "",
                                    sx: {
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        color: themeConfig.textMuted,
                                        letterSpacing: 0.6,
                                        fontSize: "0.72rem",
                                        lineHeight: 1.25,
                                        height: 36,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        flex: 1
                                    },
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/StatCard.jsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        width: 38,
                                        height: 38,
                                        minWidth: 38,
                                        borderRadius: "12px",
                                        background: `linear-gradient(135deg, #FFFFFF 0%, ${themeConfig.champagne} 100%)`,
                                        color: cardColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: `1px solid ${themeConfig.border}`,
                                        boxShadow: `0 4px 12px -2px ${cardColor}25, inset 0 1px 1px #FFFFFF`,
                                        flexShrink: 0,
                                        "& svg": {
                                            fontSize: 20
                                        }
                                    },
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/StatCard.jsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/StatCard.jsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h4",
                            sx: {
                                fontWeight: 900,
                                color: cardColor || themeConfig.textMain,
                                height: 42,
                                display: "flex",
                                alignItems: "center",
                                fontSize: {
                                    xs: "1.75rem",
                                    sm: "1.95rem"
                                },
                                lineHeight: 1,
                                letterSpacing: -0.5,
                                my: 0.5,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            },
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/StatCard.jsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/StatCard.jsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        width: "100%",
                        borderTop: `1.5px dashed ${themeConfig.border || "#E2E8F0"}`,
                        my: 1.2,
                        opacity: 0.85
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/StatCard.jsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minHeight: 24,
                        gap: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            title: typeof subtitle === "string" ? subtitle : "",
                            sx: {
                                color: themeConfig.textMuted,
                                fontSize: "0.74rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                flex: 1
                            },
                            children: subtitle || ""
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/StatCard.jsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6,
                                flexShrink: 0
                            },
                            children: [
                                trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.3,
                                        fontSize: "0.68rem",
                                        fontWeight: 800,
                                        px: 0.8,
                                        py: 0.25,
                                        borderRadius: "6px",
                                        bgcolor: trendType === "up" ? `${themeConfig.success}15` : `${themeConfig.danger}15`,
                                        color: trendType === "up" ? themeConfig.success : themeConfig.danger,
                                        border: `1px solid ${trendType === "up" ? themeConfig.success : themeConfig.danger}30`,
                                        whiteSpace: "nowrap"
                                    },
                                    children: [
                                        trendType === "up" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingUp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/StatCard.jsx",
                                            lineNumber: 196,
                                            columnNumber: 39
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$TrendingDown$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                fontSize: 12
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/StatCard.jsx",
                                            lineNumber: 196,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: trend
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/StatCard.jsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/StatCard.jsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        fontSize: "0.68rem",
                                        fontWeight: 800,
                                        px: 0.9,
                                        py: 0.25,
                                        borderRadius: "6px",
                                        background: `linear-gradient(135deg, ${themeConfig.champagne} 0%, #FFFFFF 100%)`,
                                        color: themeConfig.primaryDark,
                                        border: `1px solid ${themeConfig.border}`,
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                                        whiteSpace: "nowrap"
                                    },
                                    children: badgeText
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/StatCard.jsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/StatCard.jsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/StatCard.jsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/shared/components/StatCard.jsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/shared/components/StatCard.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(StatCard, "4X60El56Y/tZtk3jLN3bb8GPh3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = StatCard;
var _c;
__turbopack_context__.k.register(_c, "StatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/StatusChip.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusChip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function StatusChip({ status, size = "small" }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const norm = (status || "").toUpperCase();
    let bg = themeConfig.champagne;
    let color = themeConfig.textMain;
    let border = themeConfig.border;
    let label = status || "UNKNOWN";
    switch(norm){
        case "ACTIVE":
            bg = themeConfig.successBg;
            color = themeConfig.success;
            border = "rgba(46, 125, 50, 0.4)";
            label = "ACTIVE";
            break;
        case "PENDING_APPROVAL":
        case "PENDING":
            bg = themeConfig.warningBg;
            color = themeConfig.warning;
            border = "rgba(217, 119, 6, 0.4)";
            label = "PENDING REVIEW";
            break;
        case "TRIAL":
            bg = themeConfig.infoBg;
            color = themeConfig.info;
            border = "rgba(51, 104, 160, 0.4)";
            label = "30-DAY TRIAL";
            break;
        case "EXPIRED":
            bg = themeConfig.dangerBg;
            color = themeConfig.danger;
            border = "rgba(220, 38, 38, 0.4)";
            label = "TRIAL EXPIRED";
            break;
        case "DISABLED":
        case "SUSPENDED":
            bg = themeConfig.dangerBg;
            color = themeConfig.danger;
            border = "rgba(220, 38, 38, 0.4)";
            label = "DISABLED";
            break;
        case "REJECTED":
            bg = "rgba(117, 109, 100, 0.15)";
            color = themeConfig.textMuted;
            border = themeConfig.border;
            label = "REJECTED";
            break;
        case "AVAILABLE":
            bg = themeConfig.successBg;
            color = themeConfig.success;
            border = "rgba(46, 125, 50, 0.4)";
            label = "AVAILABLE";
            break;
        case "OCCUPIED":
            bg = themeConfig.infoBg;
            color = themeConfig.info;
            border = "rgba(51, 104, 160, 0.4)";
            label = "OCCUPIED";
            break;
        case "RESERVED":
            bg = themeConfig.warningBg;
            color = themeConfig.warning;
            border = "rgba(217, 119, 6, 0.4)";
            label = "RESERVED";
            break;
        case "CLEANING":
            bg = themeConfig.cleaningBg;
            color = themeConfig.cleaning;
            border = "rgba(8, 145, 178, 0.4)";
            label = "HOUSEKEEPING";
            break;
        case "MAINTENANCE":
            bg = themeConfig.dangerBg;
            color = themeConfig.danger;
            border = "rgba(220, 38, 38, 0.4)";
            label = "MAINTENANCE";
            break;
        case "BLOCKED":
            bg = "rgba(117, 109, 100, 0.15)";
            color = themeConfig.textMuted;
            border = themeConfig.border;
            label = "BLOCKED";
            break;
        case "CHECKED_IN":
            bg = themeConfig.infoBg;
            color = themeConfig.info;
            border = "rgba(51, 104, 160, 0.4)";
            label = "IN-HOUSE";
            break;
        case "CHECKED_OUT":
            bg = themeConfig.champagne;
            color = themeConfig.textMuted;
            border = themeConfig.border;
            label = "DEPARTED";
            break;
        case "CANCELLED":
            bg = themeConfig.dangerBg;
            color = themeConfig.danger;
            border = "rgba(220, 38, 38, 0.4)";
            label = "CANCELLED";
            break;
        case "PAID":
            bg = themeConfig.successBg;
            color = themeConfig.success;
            border = "rgba(46, 125, 50, 0.4)";
            label = "PAID";
            break;
        case "PARTIALLY_PAID":
            bg = themeConfig.warningBg;
            color = themeConfig.warning;
            border = "rgba(217, 119, 6, 0.4)";
            label = "PARTIAL";
            break;
        case "UNPAID":
            bg = themeConfig.dangerBg;
            color = themeConfig.danger;
            border = "rgba(220, 38, 38, 0.4)";
            label = "PENDING";
            break;
        case "VERIFIED":
            bg = themeConfig.successBg;
            color = themeConfig.success;
            border = "rgba(46, 125, 50, 0.4)";
            label = "VERIFIED ✓";
            break;
        default:
            label = status;
            break;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
        label: label,
        size: size,
        sx: {
            bgcolor: bg,
            color: color,
            border: `1px solid ${border}`,
            fontWeight: 800,
            fontSize: size === "small" ? "0.72rem" : "0.8rem",
            height: size === "small" ? 22 : 28,
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
            letterSpacing: "0.03em"
        }
    }, void 0, false, {
        fileName: "[project]/src/shared/components/StatusChip.jsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(StatusChip, "4X60El56Y/tZtk3jLN3bb8GPh3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = StatusChip;
var _c;
__turbopack_context__.k.register(_c, "StatusChip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/SubscriptionExpiredScreen.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubscriptionExpiredScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.mjs [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Card/Card.mjs [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.mjs [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Chip/Chip.mjs [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Avatar/Avatar.mjs [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Grid/Grid.mjs [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Dialog/Dialog.mjs [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.mjs [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogContent/DialogContent.mjs [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogActions/DialogActions.mjs [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TextField/TextField.mjs [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/IconButton/IconButton.mjs [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Alert/Alert.mjs [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ToggleButton$2f$ToggleButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/ToggleButton/ToggleButton.mjs [app-client] (ecmascript) <export default as ToggleButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.mjs [app-client] (ecmascript) <export default as ToggleButtonGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CircularProgress/CircularProgress.mjs [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Phone.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Email$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Email.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WhatsApp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/WhatsApp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SupportAgent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/SupportAgent.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/CheckCircle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Logout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Logout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Close.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Lock.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HourglassBottom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/HourglassBottom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Send.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/AutoAwesome.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Star.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Check.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Hotel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Apartment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Apartment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CorporateFare$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/CorporateFare.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function SubscriptionExpiredScreen({ user, onLogout, reason = "", type = "EXPIRED" }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const [plans, setPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingPlans, setLoadingPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [billingCycle, setBillingCycle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("MONTHLY");
    const [helpDialogOpen, setHelpDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ticketSent, setTicketSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [helpForm, setHelpForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: user?.name || "",
        phone: user?.phone || user?.hotel?.ownerPhone || "",
        message: "Hello Super Admin, please help us renew and activate our hotel subscription plan."
    });
    const hotel = user?.hotel || {};
    const subscription = hotel.subscription || {};
    const supportContact = hotel.supportContact || {
        phone: "+91 98765 43210",
        email: "support@cloudhotelier.com",
        whatsapp: "+919876543210"
    };
    const isSuspended = type === "DISABLED" || type === "SUSPENDED" || hotel.status === "DISABLED" || hotel.status === "SUSPENDED";
    const isReceptionist = user?.role === "RECEPTIONIST";
    // Fetch real subscription plans from database
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SubscriptionExpiredScreen.useEffect": ()=>{
            fetchPlans();
        }
    }["SubscriptionExpiredScreen.useEffect"], []);
    const fetchPlans = async ()=>{
        try {
            setLoadingPlans(true);
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].SUBSCRIPTION_PLANS.PUBLIC);
            if (res?.data?.all) {
                setPlans(res.data.all);
            } else if (Array.isArray(res?.data)) {
                setPlans(res.data);
            }
        } catch (err) {
            console.warn("Could not load real plans:", err);
        } finally{
            setLoadingPlans(false);
        }
    };
    const trialEndDateStr = subscription.trialEndDate ? new Date(subscription.trialEndDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }) : "Recently";
    const handleOpenUpgrade = (plan)=>{
        setSelectedPlan(plan);
        const planTitle = typeof plan === "object" ? `${plan.name} (${plan.billingCycle || billingCycle}) - ₹${plan.price?.toLocaleString("en-IN")}` : plan;
        setHelpForm({
            name: user?.name || "",
            phone: user?.phone || user?.hotel?.ownerPhone || "",
            message: `Hello Super Admin, I want to activate/renew the '${planTitle}' plan for hotel '${hotel.name || "Our Hotel"}'. Please assist with invoice and immediate activation.`
        });
        setHelpDialogOpen(true);
    };
    const handleSendTicket = (e)=>{
        e.preventDefault();
        setTicketSent(true);
        setTimeout(()=>{
            setTicketSent(false);
            setHelpDialogOpen(false);
        }, 2500);
    };
    const displayedPlans = plans.filter((p)=>(p.billingCycle || "MONTHLY").toUpperCase() === billingCycle.toUpperCase());
    const getPlanIcon = (idx)=>{
        if (idx === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                fontSize: 24,
                color: themeConfig.primary
            }
        }, void 0, false, {
            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
            lineNumber: 126,
            columnNumber: 27
        }, this);
        if (idx === 1) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Apartment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                fontSize: 24,
                color: themeConfig.accent || "#D97706"
            }
        }, void 0, false, {
            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
            lineNumber: 127,
            columnNumber: 27
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CorporateFare$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                fontSize: 24,
                color: themeConfig.primaryDark
            }
        }, void 0, false, {
            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
            lineNumber: 128,
            columnNumber: 12
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            minHeight: "100vh",
            bgcolor: themeConfig.bgMain || "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: {
                xs: 2,
                sm: 4
            },
            position: "relative",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    position: "absolute",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "700px",
                    height: "700px",
                    background: isSuspended ? "radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0) 70%)" : "radial-gradient(circle, rgba(11, 142, 224, 0.12) 0%, rgba(11, 142, 224, 0) 70%)",
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "card-3d",
                sx: {
                    maxWidth: 960,
                    width: "100%",
                    borderRadius: "28px",
                    border: `1.5px solid ${themeConfig.border || "#E2E8F0"}`,
                    boxShadow: "0 24px 60px -12px rgba(12, 39, 59, 0.15), inset 0 1px 1px #FFFFFF",
                    background: "#FFFFFF",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: {
                                xs: 3,
                                sm: 4
                            },
                            background: isSuspended ? "linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)" : `linear-gradient(135deg, ${themeConfig.primaryDark || "#0C273B"} 0%, ${themeConfig.primary || "#0B8EE0"} 100%)`,
                            color: "#FFFFFF",
                            position: "relative"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                            sx: {
                                                bgcolor: "rgba(255,255,255,0.2)",
                                                color: "#FFFFFF",
                                                width: 58,
                                                height: 58,
                                                borderRadius: "18px",
                                                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                                                backdropFilter: "blur(8px)"
                                            },
                                            children: isSuspended ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    fontSize: 32
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 199,
                                                columnNumber: 32
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HourglassBottom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    fontSize: 32
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 199,
                                                columnNumber: 65
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 0.5
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                            label: isSuspended ? "ACCOUNT ACCESS SUSPENDED" : "30-DAY FREE TRIAL ENDED",
                                                            size: "small",
                                                            sx: {
                                                                bgcolor: "rgba(255,255,255,0.2)",
                                                                color: "#FFFFFF",
                                                                fontWeight: 900,
                                                                fontSize: "0.72rem",
                                                                letterSpacing: 0.8,
                                                                border: "1px solid rgba(255,255,255,0.3)"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 204,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: "rgba(255,255,255,0.85)",
                                                                fontWeight: 700
                                                            },
                                                            children: hotel.name || "Your Hotel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 216,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 203,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "h5",
                                                    sx: {
                                                        fontWeight: 900,
                                                        color: "#FFFFFF",
                                                        letterSpacing: -0.5
                                                    },
                                                    children: isSuspended ? "Hotel Account Temporarily Suspended" : "Your 30-Day Free Trial Has Expired"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 221,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "outlined",
                                    size: "small",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Logout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 232,
                                        columnNumber: 26
                                    }, this),
                                    onClick: onLogout,
                                    sx: {
                                        color: "#FFFFFF",
                                        borderColor: "rgba(255,255,255,0.4)",
                                        borderRadius: "12px",
                                        fontWeight: 700,
                                        fontSize: "0.78rem",
                                        "&:hover": {
                                            borderColor: "#FFFFFF",
                                            bgcolor: "rgba(255,255,255,0.15)"
                                        }
                                    },
                                    children: "Sign Out"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: {
                                xs: 3,
                                sm: 4
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                severity: isSuspended ? "error" : "warning",
                                sx: {
                                    borderRadius: "16px",
                                    mb: 3.5,
                                    fontWeight: 600,
                                    fontSize: "0.92rem",
                                    border: `1px solid ${isSuspended ? "#FECACA" : "#FDE68A"}`,
                                    bgcolor: isSuspended ? "#FEF2F2" : "#FFFBEB"
                                },
                                children: isSuspended ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Administrative Notice: "
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this),
                                        reason || hotel.statusReason || "This hotel account and all associated portals (Frontdesk, Room Matrix, Billing) have been suspended by Super Admin policy."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this) : isReceptionist ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Frontdesk Access Notice: "
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        "Your hotel's 30-day evaluation trial concluded on ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: trialEndDateStr
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 273,
                                            columnNumber: 72
                                        }, this),
                                        ". Operational check-in and folio services are paused. Please notify your Hotel General Manager or Owner to renew the plan."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Plan Renewal Required: "
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this),
                                        "Your 30-day free trial concluded on ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: trialEndDateStr
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 278,
                                            columnNumber: 53
                                        }, this),
                                        ". To re-activate PMS Front Desk, Guest Folios, Room Matrix, and Staff Portals, please renew your plan or contact support."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                className: "card-3d",
                                sx: {
                                    p: 2.5,
                                    borderRadius: "18px",
                                    bgcolor: themeConfig.champagne || "#F8FAFC",
                                    border: `1px solid ${themeConfig.border}`,
                                    mb: 3.5
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12,
                                                sm: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        fontWeight: 700
                                                    },
                                                    children: "Trial Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: isSuspended ? themeConfig.danger : themeConfig.warning
                                                    },
                                                    children: isSuspended ? "SUSPENDED" : "EVALUATION EXPIRED"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12,
                                                sm: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        fontWeight: 700
                                                    },
                                                    children: "Trial Duration"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.textMain
                                                    },
                                                    children: "30 Days (100% Completed)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12,
                                                sm: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        color: themeConfig.textMuted,
                                                        fontWeight: 700
                                                    },
                                                    children: "Concluded On"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 312,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body1",
                                                    sx: {
                                                        fontWeight: 800,
                                                        color: themeConfig.primaryDark
                                                    },
                                                    children: trialEndDateStr
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 315,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            !isReceptionist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    mb: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2.5,
                                            flexWrap: "wrap",
                                            gap: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "h6",
                                                        sx: {
                                                            fontWeight: 900,
                                                            color: themeConfig.textMain
                                                        },
                                                        children: "Select Plan to Re-activate Access"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                        lineNumber: 327,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        sx: {
                                                            color: themeConfig.textMuted
                                                        },
                                                        children: "Choose a commercial plan to restore complete hotel operations:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                        lineNumber: 330,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 326,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__["ToggleButtonGroup"], {
                                                value: billingCycle,
                                                exclusive: true,
                                                onChange: (e, val)=>val && setBillingCycle(val),
                                                size: "small",
                                                sx: {
                                                    bgcolor: themeConfig.bgMain,
                                                    p: 0.5,
                                                    borderRadius: "12px",
                                                    border: `1px solid ${themeConfig.border}`,
                                                    "& .MuiToggleButton-root": {
                                                        border: "none",
                                                        borderRadius: "8px !important",
                                                        px: 1.5,
                                                        py: 0.4,
                                                        fontWeight: 800,
                                                        fontSize: "0.75rem",
                                                        color: themeConfig.textMuted,
                                                        "&.Mui-selected": {
                                                            bgcolor: "#FFFFFF",
                                                            color: themeConfig.primaryDark,
                                                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                                                        }
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ToggleButton$2f$ToggleButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__["ToggleButton"], {
                                                        value: "MONTHLY",
                                                        children: "Monthly"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$ToggleButton$2f$ToggleButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__["ToggleButton"], {
                                                        value: "ANNUAL",
                                                        children: [
                                                            "Annual  ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                label: "SAVE 20%",
                                                                size: "small",
                                                                sx: {
                                                                    bgcolor: themeConfig.successBg,
                                                                    color: themeConfig.success,
                                                                    fontWeight: 900,
                                                                    height: 16,
                                                                    fontSize: "0.58rem"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                lineNumber: 364,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                        lineNumber: 362,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 335,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    loadingPlans ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            justifyContent: "center",
                                            py: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                            sx: {
                                                color: themeConfig.primary
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 371,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        container: true,
                                        spacing: 2.5,
                                        children: displayedPlans.map((plan, idx)=>{
                                            const isPopular = Boolean(plan.isPopular || plan.badge === "MOST POPULAR");
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    md: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.5,
                                                        borderRadius: "18px",
                                                        border: isPopular ? `2px solid ${themeConfig.primary}` : `1px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        position: "relative",
                                                        boxShadow: isPopular ? `0 12px 28px -4px ${themeConfig.primaryGlow}` : "0 4px 16px rgba(0,0,0,0.04)",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        height: "100%"
                                                    },
                                                    children: [
                                                        isPopular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Star$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                sx: {
                                                                    fontSize: 13,
                                                                    color: "#FFFFFF !important"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                lineNumber: 397,
                                                                columnNumber: 37
                                                            }, this),
                                                            label: "RECOMMENDED",
                                                            size: "small",
                                                            sx: {
                                                                position: "absolute",
                                                                top: -10,
                                                                right: 16,
                                                                bgcolor: themeConfig.primary,
                                                                color: "#FFFFFF",
                                                                fontWeight: 900,
                                                                fontSize: "0.62rem",
                                                                boxShadow: `0 4px 10px ${themeConfig.primaryGlow}`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 396,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                    sx: {
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        mb: 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                            sx: {
                                                                                bgcolor: themeConfig.champagne,
                                                                                width: 38,
                                                                                height: 38,
                                                                                borderRadius: "10px"
                                                                            },
                                                                            children: getPlanIcon(idx)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                            lineNumber: 415,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                            label: plan.maxRooms === 0 || plan.maxRooms >= 999 ? "Unlimited Rooms" : `Up to ${plan.maxRooms} Rooms`,
                                                                            size: "small",
                                                                            sx: {
                                                                                fontWeight: 800,
                                                                                borderRadius: "6px",
                                                                                bgcolor: themeConfig.bgMain,
                                                                                color: themeConfig.textMain,
                                                                                fontSize: "0.68rem"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                            lineNumber: 418,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                    lineNumber: 414,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "subtitle1",
                                                                    sx: {
                                                                        fontWeight: 800,
                                                                        color: themeConfig.textMain
                                                                    },
                                                                    children: plan.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                    sx: {
                                                                        display: "flex",
                                                                        alignItems: "baseline",
                                                                        gap: 0.5,
                                                                        my: 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                            variant: "h5",
                                                                            sx: {
                                                                                fontWeight: 900,
                                                                                color: themeConfig.primaryDark
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                plan.price?.toLocaleString("en-IN")
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                            lineNumber: 436,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                            variant: "caption",
                                                                            sx: {
                                                                                color: themeConfig.textMuted,
                                                                                fontWeight: 700
                                                                            },
                                                                            children: [
                                                                                "/ ",
                                                                                billingCycle === "ANNUAL" ? "year" : "mo"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                            lineNumber: 439,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                    lineNumber: 435,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                    sx: {
                                                                        mt: 1.5,
                                                                        mb: 2
                                                                    },
                                                                    children: (plan.features || []).slice(0, 4).map((feat, fIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                            sx: {
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                gap: 0.8,
                                                                                mb: 0.8
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    sx: {
                                                                                        fontSize: 14,
                                                                                        color: themeConfig.success
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                                    lineNumber: 447,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                                    variant: "caption",
                                                                                    sx: {
                                                                                        color: themeConfig.textMain,
                                                                                        fontWeight: 600
                                                                                    },
                                                                                    children: feat
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                                    lineNumber: 448,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, fIdx, true, {
                                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                            lineNumber: 446,
                                                                            columnNumber: 33
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                    lineNumber: 444,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 413,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: isPopular ? "contained" : "outlined",
                                                            fullWidth: true,
                                                            size: "small",
                                                            className: isPopular ? "btn-3d" : "",
                                                            onClick: ()=>handleOpenUpgrade(plan),
                                                            sx: {
                                                                borderRadius: "10px",
                                                                fontWeight: 800,
                                                                py: 0.9,
                                                                fontSize: "0.78rem",
                                                                ...isPopular ? {
                                                                    background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                                                    color: "#FFFFFF"
                                                                } : {
                                                                    borderColor: themeConfig.border,
                                                                    color: themeConfig.primaryDark
                                                                }
                                                            },
                                                            children: [
                                                                "Select ",
                                                                plan.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 456,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 380,
                                                    columnNumber: 25
                                                }, this)
                                            }, plan._id || idx, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 379,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 374,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 324,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    mb: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 1.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SupportAgent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    color: themeConfig.primary,
                                                    fontSize: 24
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 492,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                sx: {
                                                    fontWeight: 800,
                                                    color: themeConfig.textMain
                                                },
                                                children: "Super Admin Support & Instant Activation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "body2",
                                        sx: {
                                            color: themeConfig.textMuted,
                                            mb: 2.5
                                        },
                                        children: "Contact our 24/7 Super Admin Support desk to renew your subscription plan, extend your trial, or resolve account suspension immediately:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        container: true,
                                        spacing: 2,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        borderRadius: "16px",
                                                        border: `1px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        textAlign: "center",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-3px)",
                                                            borderColor: themeConfig.primary
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                            sx: {
                                                                bgcolor: themeConfig.champagne,
                                                                color: themeConfig.primary,
                                                                mx: "auto",
                                                                mb: 1.2,
                                                                width: 44,
                                                                height: 44
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                fontSize: "small"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                lineNumber: 517,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 516,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 700
                                                            },
                                                            children: "Direct Support Helpline"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 519,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 800,
                                                                color: themeConfig.textMain,
                                                                mb: 1.5
                                                            },
                                                            children: supportContact.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 522,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: "outlined",
                                                            size: "small",
                                                            fullWidth: true,
                                                            href: `tel:${supportContact.phone}`,
                                                            sx: {
                                                                borderRadius: "10px",
                                                                fontWeight: 700,
                                                                fontSize: "0.75rem"
                                                            },
                                                            children: "Call Now"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 525,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 504,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 503,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        borderRadius: "16px",
                                                        border: `1px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        textAlign: "center",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-3px)",
                                                            borderColor: "#25D366"
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                            sx: {
                                                                bgcolor: "rgba(37, 211, 102, 0.12)",
                                                                color: "#25D366",
                                                                mx: "auto",
                                                                mb: 1.2,
                                                                width: 44,
                                                                height: 44
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WhatsApp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                fontSize: "small"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                lineNumber: 552,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 551,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 700
                                                            },
                                                            children: "WhatsApp Live Chat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 554,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 800,
                                                                color: themeConfig.textMain,
                                                                mb: 1.5
                                                            },
                                                            children: "Instant Activation Chat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 557,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: "contained",
                                                            size: "small",
                                                            fullWidth: true,
                                                            href: `https://wa.me/${supportContact.whatsapp?.replace(/[^0-9]/g, "") || "919876543210"}?text=${encodeURIComponent(`Hello Super Admin, I want to activate/renew subscription for hotel: ${hotel.name || "Our Hotel"}`)}`,
                                                            target: "_blank",
                                                            sx: {
                                                                borderRadius: "10px",
                                                                fontWeight: 800,
                                                                fontSize: "0.75rem",
                                                                bgcolor: "#25D366",
                                                                color: "#FFFFFF",
                                                                "&:hover": {
                                                                    bgcolor: "#1EBE5D"
                                                                }
                                                            },
                                                            children: "Chat on WhatsApp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 560,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 539,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 538,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                size: {
                                                    xs: 12,
                                                    sm: 4
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                    className: "card-3d",
                                                    sx: {
                                                        p: 2.2,
                                                        borderRadius: "16px",
                                                        border: `1px solid ${themeConfig.border}`,
                                                        bgcolor: "#FFFFFF",
                                                        textAlign: "center",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-3px)",
                                                            borderColor: themeConfig.info
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                            sx: {
                                                                bgcolor: themeConfig.infoBg,
                                                                color: themeConfig.info,
                                                                mx: "auto",
                                                                mb: 1.2,
                                                                width: 44,
                                                                height: 44
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Email$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                fontSize: "small"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                                lineNumber: 597,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 596,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            sx: {
                                                                color: themeConfig.textMuted,
                                                                fontWeight: 700
                                                            },
                                                            children: "Official Billing Email"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 599,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "body2",
                                                            sx: {
                                                                fontWeight: 800,
                                                                color: themeConfig.textMain,
                                                                mb: 1.5
                                                            },
                                                            children: supportContact.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 602,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: "outlined",
                                                            size: "small",
                                                            fullWidth: true,
                                                            href: `mailto:${supportContact.email}?subject=${encodeURIComponent(`Subscription Renewal Request - ${hotel.name || "Hotel"}`)}`,
                                                            sx: {
                                                                borderRadius: "10px",
                                                                fontWeight: 700,
                                                                fontSize: "0.75rem"
                                                            },
                                                            children: "Send Email"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                            lineNumber: 605,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 584,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                lineNumber: 583,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 490,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    mt: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    flexWrap: "wrap"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "contained",
                                    className: "btn-3d",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 626,
                                        columnNumber: 26
                                    }, this),
                                    onClick: ()=>handleOpenUpgrade("Priority Commercial Plan"),
                                    sx: {
                                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                        color: "#FFFFFF",
                                        fontWeight: 800,
                                        fontSize: "0.88rem",
                                        px: 3.5,
                                        py: 1.2,
                                        borderRadius: "14px",
                                        boxShadow: `0 6px 18px ${themeConfig.primaryGlow}`
                                    },
                                    children: "Request Instant Callback & Plan Activation"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 623,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 622,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: helpDialogOpen,
                onClose: ()=>setHelpDialogOpen(false),
                maxWidth: "sm",
                fullWidth: true,
                slotProps: {
                    paper: {
                        sx: {
                            borderRadius: "24px",
                            p: 1.5,
                            border: `1px solid ${themeConfig.border}`,
                            boxShadow: "0 24px 50px rgba(0,0,0,0.18)"
                        }
                    }
                },
                children: ticketSent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        p: 4,
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                            sx: {
                                width: 64,
                                height: 64,
                                bgcolor: themeConfig.successBg,
                                color: themeConfig.success,
                                mx: "auto",
                                mb: 2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    fontSize: 36
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                lineNumber: 665,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 664,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h6",
                            sx: {
                                fontWeight: 800,
                                color: themeConfig.textMain,
                                mb: 1
                            },
                            children: "Support Request Dispatched!"
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 667,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "body2",
                            sx: {
                                color: themeConfig.textMuted
                            },
                            children: [
                                "Our Super Admin operations team has received your urgent request for ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: typeof selectedPlan === "object" ? selectedPlan?.name : selectedPlan
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 671,
                                    columnNumber: 84
                                }, this),
                                ". We will contact you shortly on ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: helpForm.phone
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 671,
                                    columnNumber: 204
                                }, this),
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 670,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                    lineNumber: 663,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSendTicket,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                            component: "div",
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h6",
                                    sx: {
                                        fontWeight: 800,
                                        color: themeConfig.textMain
                                    },
                                    children: [
                                        "Request ",
                                        typeof selectedPlan === "object" ? selectedPlan?.name : selectedPlan || "Plan Activation"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    onClick: ()=>setHelpDialogOpen(false),
                                    sx: {
                                        borderRadius: "10px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 681,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 680,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 676,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                            dividers: true,
                            sx: {
                                borderColor: themeConfig.border
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    sx: {
                                        color: themeConfig.textMuted,
                                        mb: 2.5
                                    },
                                    children: "Submit your contact details and our team will get your hotel back online immediately."
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 686,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMain,
                                                        mb: 0.6,
                                                        display: "block"
                                                    },
                                                    children: "Hotel Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 692,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                    fullWidth: true,
                                                    size: "small",
                                                    value: hotel.name || "My Hotel",
                                                    disabled: true,
                                                    sx: {
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "12px"
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 691,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12,
                                                sm: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMain,
                                                        mb: 0.6,
                                                        display: "block"
                                                    },
                                                    children: "Contact Person *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 699,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                    fullWidth: true,
                                                    size: "small",
                                                    required: true,
                                                    value: helpForm.name,
                                                    onChange: (e)=>setHelpForm({
                                                            ...helpForm,
                                                            name: e.target.value
                                                        }),
                                                    placeholder: "Your Full Name",
                                                    sx: {
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "12px"
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 698,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12,
                                                sm: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMain,
                                                        mb: 0.6,
                                                        display: "block"
                                                    },
                                                    children: "Callback Phone Number *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 714,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                    fullWidth: true,
                                                    size: "small",
                                                    required: true,
                                                    value: helpForm.phone,
                                                    onChange: (e)=>setHelpForm({
                                                            ...helpForm,
                                                            phone: e.target.value
                                                        }),
                                                    placeholder: "+91 98200 11223",
                                                    sx: {
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "12px"
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 717,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 713,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            size: {
                                                xs: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    sx: {
                                                        fontWeight: 700,
                                                        color: themeConfig.textMain,
                                                        mb: 0.6,
                                                        display: "block"
                                                    },
                                                    children: "Requirement / Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 729,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                    fullWidth: true,
                                                    multiline: true,
                                                    rows: 3,
                                                    value: helpForm.message,
                                                    onChange: (e)=>setHelpForm({
                                                            ...helpForm,
                                                            message: e.target.value
                                                        }),
                                                    sx: {
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "12px"
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                                    lineNumber: 732,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                            lineNumber: 728,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 690,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 685,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                            sx: {
                                p: 2.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: ()=>setHelpDialogOpen(false),
                                    sx: {
                                        borderRadius: "10px",
                                        fontWeight: 700
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 745,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "submit",
                                    variant: "contained",
                                    className: "btn-3d",
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                        lineNumber: 752,
                                        columnNumber: 28
                                    }, this),
                                    sx: {
                                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                                        color: "#FFFFFF",
                                        fontWeight: 800,
                                        borderRadius: "12px",
                                        px: 3,
                                        boxShadow: `0 4px 14px ${themeConfig.primaryGlow}`
                                    },
                                    children: "Submit Request"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                            lineNumber: 744,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                    lineNumber: 675,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
                lineNumber: 646,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/SubscriptionExpiredScreen.jsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(SubscriptionExpiredScreen, "3XGOA2BbKibMZlLjRPrc9/RGFv4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = SubscriptionExpiredScreen;
var _c;
__turbopack_context__.k.register(_c, "SubscriptionExpiredScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_shared_components_06xwbr8._.js.map