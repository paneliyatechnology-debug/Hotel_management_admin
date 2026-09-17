(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppThemeProvider",
    ()=>AppThemeProvider,
    "buildMuiTheme",
    ()=>buildMuiTheme,
    "useAppTheme",
    ()=>useAppTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/styles/ThemeProvider.mjs [app-client] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/styles/createTheme.mjs [app-client] (ecmascript) <export default as createTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CssBaseline/CssBaseline.mjs [app-client] (ecmascript) <export default as CssBaseline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/theme.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function buildMuiTheme(themeConfig) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
        palette: {
            mode: "light",
            primary: {
                main: themeConfig.primary,
                dark: themeConfig.primaryDark,
                light: themeConfig.primaryLight,
                contrastText: "#FFFFFF"
            },
            secondary: {
                main: themeConfig.champagne || themeConfig.border,
                contrastText: themeConfig.textMain
            },
            background: {
                default: themeConfig.bgMain,
                paper: themeConfig.bgCard || "#FFFFFF"
            },
            text: {
                primary: themeConfig.textMain,
                secondary: themeConfig.textMuted
            },
            divider: themeConfig.border,
            success: {
                main: themeConfig.success,
                contrastText: "#FFFFFF"
            },
            warning: {
                main: themeConfig.warning,
                contrastText: "#FFFFFF"
            },
            error: {
                main: themeConfig.danger,
                contrastText: "#FFFFFF"
            },
            info: {
                main: themeConfig.info,
                contrastText: "#FFFFFF"
            }
        },
        typography: {
            fontFamily: [
                '"Plus Jakarta Sans"',
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif"
            ].join(","),
            h1: {
                fontWeight: 800,
                color: themeConfig.textMain,
                letterSpacing: "-0.025em"
            },
            h2: {
                fontWeight: 800,
                color: themeConfig.textMain,
                letterSpacing: "-0.02em"
            },
            h3: {
                fontWeight: 800,
                color: themeConfig.textMain,
                letterSpacing: "-0.015em"
            },
            h4: {
                fontWeight: 800,
                color: themeConfig.textMain,
                letterSpacing: "-0.01em"
            },
            h5: {
                fontWeight: 800,
                color: themeConfig.textMain,
                letterSpacing: "-0.01em"
            },
            h6: {
                fontWeight: 800,
                color: themeConfig.textMain
            },
            subtitle1: {
                fontWeight: 700,
                color: themeConfig.textMain
            },
            subtitle2: {
                fontWeight: 600,
                color: themeConfig.textMuted
            },
            body1: {
                color: themeConfig.textMain,
                fontSize: "0.9125rem"
            },
            body2: {
                color: themeConfig.textMuted,
                fontSize: "0.85rem"
            },
            button: {
                textTransform: "none",
                fontWeight: 700
            }
        },
        shape: {
            borderRadius: 14
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: themeConfig.bgMain,
                        color: themeConfig.textMain,
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale"
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        borderRadius: 18,
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.06), 0 4px 10px -4px rgba(12, 39, 59, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)"
                    },
                    elevation0: {
                        boxShadow: "none",
                        border: `1px solid ${themeConfig.border}`
                    },
                    elevation1: {
                        boxShadow: "0 4px 20px -2px rgba(12, 39, 59, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
                    },
                    elevation2: {
                        boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.08), 0 8px 10px -6px rgba(12, 39, 59, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)"
                    },
                    elevation3: {
                        boxShadow: "0 18px 36px -6px rgba(12, 39, 59, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1)"
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: themeConfig.bgCard || "#FFFFFF",
                        border: `1px solid ${themeConfig.border}`,
                        borderRadius: 20,
                        boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.06), 0 8px 10px -6px rgba(12, 39, 59, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                        position: "relative",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                            boxShadow: "0 16px 32px -6px rgba(12, 39, 59, 0.1), 0 8px 16px -4px rgba(12, 39, 59, 0.04), inset 0 1px 2px #FFFFFF"
                        }
                    }
                }
            },
            /* 3D Segmented Tabs & Tab Pills */ MuiTabs: {
                styleOverrides: {
                    root: {
                        backgroundColor: themeConfig.champagne,
                        borderRadius: 16,
                        padding: "5px",
                        minHeight: 46,
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0,0,0,0.02)"
                    },
                    indicator: {
                        display: "none"
                    },
                    flexContainer: {
                        gap: "4px"
                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        minHeight: 38,
                        padding: "8px 18px",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        textTransform: "none",
                        color: themeConfig.textMuted,
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&.Mui-selected": {
                            color: themeConfig.primaryDark,
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 4px 12px rgba(12, 39, 59, 0.08), inset 0 1px 0 #FFFFFF"
                        },
                        "&:hover": {
                            color: themeConfig.textMain,
                            backgroundColor: "rgba(255,255,255,0.5)"
                        }
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        padding: "8px 18px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textTransform: "none",
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                        "&:hover": {
                            transform: "translateY(-1.5px)"
                        },
                        "&:active": {
                            transform: "translateY(0.5px)"
                        }
                    },
                    containedPrimary: {
                        background: `linear-gradient(135deg, ${themeConfig.primary} 0%, ${themeConfig.primaryDark} 100%)`,
                        color: "#FFFFFF",
                        boxShadow: `0 4px 14px -2px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.35)`,
                        "&:hover": {
                            background: `linear-gradient(135deg, ${themeConfig.primaryDark} 0%, ${themeConfig.primary} 100%)`,
                            boxShadow: `0 8px 20px -2px ${themeConfig.primaryGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.45)`
                        }
                    },
                    containedSuccess: {
                        background: `linear-gradient(135deg, ${themeConfig.success} 0%, #15803D 100%)`,
                        color: "#FFFFFF",
                        boxShadow: "0 4px 14px -2px rgba(22, 163, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)"
                    },
                    containedError: {
                        background: `linear-gradient(135deg, ${themeConfig.danger} 0%, #B91C1C 100%)`,
                        color: "#FFFFFF",
                        boxShadow: "0 4px 14px -2px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)"
                    },
                    outlined: {
                        borderColor: themeConfig.border,
                        color: themeConfig.textMain,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02), inset 0 1px 0 #FFFFFF",
                        "&:hover": {
                            borderColor: themeConfig.primary,
                            backgroundColor: themeConfig.champagne || "rgba(0,0,0,0.04)",
                            boxShadow: `0 4px 12px ${themeConfig.primaryGlow}`
                        }
                    }
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontWeight: 800,
                        borderRadius: 8,
                        fontSize: "0.75rem",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
                    }
                }
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: 18,
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "0 10px 25px -5px rgba(12, 39, 59, 0.06), inset 0 1px 1px #FFFFFF",
                        overflow: "hidden"
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderColor: themeConfig.border,
                        padding: "12px 16px",
                        fontSize: "0.85rem"
                    },
                    head: {
                        fontWeight: 800,
                        color: themeConfig.textMain,
                        backgroundColor: themeConfig.champagne || "#F8F6F4",
                        borderBottom: `1px solid ${themeConfig.border}`,
                        letterSpacing: "0.02em"
                    }
                }
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        transition: "background-color 0.15s ease",
                        "&:hover": {
                            backgroundColor: `${themeConfig.primaryGlow} !important`
                        }
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.02)",
                        transition: "all 0.2s ease",
                        "& fieldset": {
                            borderColor: themeConfig.border
                        },
                        "&:hover fieldset": {
                            borderColor: themeConfig.primary
                        },
                        "&.Mui-focused": {
                            boxShadow: `0 0 0 3px ${themeConfig.primaryGlow}`
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: themeConfig.primary,
                            borderWidth: "1.5px"
                        }
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 22,
                        boxShadow: "0 24px 48px -12px rgba(12, 39, 59, 0.22), 0 12px 24px -8px rgba(12, 39, 59, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                        border: `1px solid ${themeConfig.border}`
                    }
                }
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,
                        boxShadow: "0 12px 28px -6px rgba(12, 39, 59, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                        border: `1px solid ${themeConfig.border}`
                    }
                }
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRadius: 0,
                        backgroundColor: themeConfig.bgCard || "#FFFFFF",
                        borderRight: `1px solid ${themeConfig.border}`,
                        borderTop: "none",
                        borderBottom: "none",
                        borderLeft: "none",
                        boxShadow: "4px 0 24px rgba(12, 39, 59, 0.04)"
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        backgroundColor: themeConfig.bgHeader || "#FFFFFF",
                        borderBottom: `1px solid ${themeConfig.border}`,
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 20px -4px rgba(12, 39, 59, 0.04)"
                    }
                }
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        borderRadius: "16px !important",
                        border: `1px solid ${themeConfig.border}`,
                        boxShadow: "0 4px 14px rgba(12, 39, 59, 0.04), inset 0 1px 0 #FFFFFF",
                        "&:before": {
                            display: "none"
                        },
                        marginBottom: "12px"
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        boxShadow: "0 4px 14px rgba(12, 39, 59, 0.06)"
                    }
                }
            }
        }
    });
}
function AppThemeProvider({ children }) {
    _s();
    const [paletteKey, setPaletteKeyInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("palette1");
    const [settings, setSettingsInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        autoRefresh: true,
        compactMode: false,
        notificationsEnabled: true,
        soundAlerts: true
    });
    const applyDomStyles = (pal)=>{
        if (("TURBOPACK compile-time value", "object") !== "undefined" && pal) {
            document.documentElement.style.setProperty("--color-primary", pal.primary);
            document.documentElement.style.setProperty("--color-primary-dark", pal.primaryDark);
            document.documentElement.style.setProperty("--color-primary-light", pal.primaryLight);
            document.documentElement.style.setProperty("--color-bg-main", pal.bgMain);
            document.documentElement.style.setProperty("--color-text-main", pal.textMain);
            document.documentElement.style.setProperty("--color-border", pal.border);
            if (document.body) {
                document.body.style.backgroundColor = pal.bgMain;
                document.body.style.color = pal.textMain;
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppThemeProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const savedPalette = localStorage.getItem("admin_theme_palette");
                if (savedPalette && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"][savedPalette]) {
                    setPaletteKeyInternal(savedPalette);
                    applyDomStyles(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"][savedPalette]);
                } else {
                    applyDomStyles(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"].palette1);
                }
                const savedSettings = localStorage.getItem("admin_app_settings");
                if (savedSettings) {
                    try {
                        setSettingsInternal(JSON.parse(savedSettings));
                    } catch  {}
                }
            }
        }
    }["AppThemeProvider.useEffect"], []);
    const changePalette = (newKey)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"][newKey]) {
            setPaletteKeyInternal(newKey);
            applyDomStyles(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"][newKey]);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("admin_theme_palette", newKey);
            }
        }
    };
    const updateSettings = (partial)=>{
        setSettingsInternal((prev)=>{
            const next = {
                ...prev,
                ...partial
            };
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("admin_app_settings", JSON.stringify(next));
            }
            return next;
        });
    };
    const activeThemeConfig = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"][paletteKey] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"].palette1;
    const muiTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AppThemeProvider.useMemo[muiTheme]": ()=>buildMuiTheme(activeThemeConfig)
    }["AppThemeProvider.useMemo[muiTheme]"], [
        activeThemeConfig
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            themeConfig: activeThemeConfig,
            paletteKey,
            setPaletteKey: changePalette,
            themePalettes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themePalettes"],
            settings,
            updateSettings
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
            theme: muiTheme,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__["CssBaseline"], {}, void 0, false, {
                    fileName: "[project]/src/shared/context/ThemeContext.jsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/shared/context/ThemeContext.jsx",
            lineNumber: 430,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/shared/context/ThemeContext.jsx",
        lineNumber: 420,
        columnNumber: 5
    }, this);
}
_s(AppThemeProvider, "fBJsMDR3ZKFBN9vHCBxE+sUj5YA=");
_c = AppThemeProvider;
function useAppTheme() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) {
        throw new Error("useAppTheme must be used within AppThemeProvider");
    }
    return ctx;
}
_s1(useAppTheme, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AppThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/utils/pdfGenerator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized Enterprise PDF & Print Document Engine for Grand Royale PMS
 * Generates pristine, print-ready, formatted PDF documents for all 3 panels:
 * 1. Receptionist (GST Tax Invoice, Payment Receipt, Police Manifest, Shift Statement)
 * 2. Hotel Admin (Daily Collections Ledger, Handover Slip, Guest Folio, Staff Roster)
 * 3. Super Admin (Hotels Directory Network Report, Platform Security Audit Logs)
 */ __turbopack_context__.s([
    "downloadAuditLogsPDF",
    ()=>downloadAuditLogsPDF,
    "downloadDailyLedgerPDF",
    ()=>downloadDailyLedgerPDF,
    "downloadGovtIdReportPDF",
    ()=>downloadGovtIdReportPDF,
    "downloadHandoverVoucherPDF",
    ()=>downloadHandoverVoucherPDF,
    "downloadHotelsDirectoryPDF",
    ()=>downloadHotelsDirectoryPDF,
    "downloadPaymentReceiptPDF",
    ()=>downloadPaymentReceiptPDF,
    "downloadTaxInvoicePDF",
    ()=>downloadTaxInvoicePDF,
    "openPrintOrSavePDF",
    ()=>openPrintOrSavePDF
]);
function openPrintOrSavePDF(title, htmlBody) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const printWindow = window.open("", "_blank", "width=850,height=900,menubar=no,toolbar=no,location=no,status=no");
    if (!printWindow) {
        alert("Please allow popups to generate and download the PDF document.");
        return;
    }
    const documentHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title || "Document"}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      background-color: #FFFFFF;
      color: #0F172A;
      font-size: 13px;
      line-height: 1.5;
      padding: 20px;
    }
    
    .header-banner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 18px;
      margin-bottom: 20px;
    }
    
    .hotel-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
      color: #FFFFFF;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 900;
    }
    
    .hotel-name {
      font-size: 20px;
      font-weight: 900;
      color: #0F172A;
      letter-spacing: -0.5px;
    }
    
    .hotel-sub {
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
    }
    
    .doc-meta {
      text-align: right;
    }
    
    .doc-title {
      font-size: 18px;
      font-weight: 900;
      color: #0B8EE0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .doc-id {
      font-size: 13px;
      font-weight: 800;
      color: #334155;
      font-family: monospace;
    }
    
    .doc-date {
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 22px;
    }
    
    .info-block h4 {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    
    .info-block p {
      font-size: 13px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 3px;
    }
    
    .info-block span {
      font-size: 11px;
      color: #64748B;
      display: block;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 22px;
    }
    
    th {
      background-color: #F1F5F9;
      color: #334155;
      font-weight: 800;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1.5px solid #CBD5E1;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #E2E8F0;
      font-size: 12.5px;
      color: #1E293B;
    }
    
    tr:nth-child(even) td {
      background-color: #FAFAFA;
    }
    
    .text-right {
      text-align: right;
    }
    
    .text-center {
      text-align: center;
    }
    
    .total-card {
      margin-left: auto;
      width: 320px;
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 12.5px;
    }
    
    .total-row.grand {
      border-top: 1.5px solid #CBD5E1;
      padding-top: 8px;
      margin-top: 8px;
      font-size: 15px;
      font-weight: 900;
      color: #0B8EE0;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
    }
    
    .badge-success { background: #DCFCE7; color: #15803D; border: 1px solid #86EFAC; }
    .badge-warning { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
    .badge-primary { background: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD; }
    
    .footer {
      border-top: 1.5px solid #E2E8F0;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
      font-size: 11px;
      color: #64748B;
    }
    
    .sign-box {
      text-align: center;
      width: 180px;
    }
    
    .sign-line {
      border-bottom: 1.5px solid #94A3B8;
      height: 36px;
      margin-bottom: 6px;
    }
    
    .no-print-bar {
      background: #0F172A;
      color: #FFFFFF;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .btn-print {
      background: #0B8EE0;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: 800;
      cursor: pointer;
      font-size: 13px;
    }
    
    @media print {
      .no-print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span>🖨️ Print Preview Mode &bull; Click Print or press Ctrl+P to Save as PDF</span>
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>
  ${htmlBody}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>
`;
    printWindow.document.open();
    printWindow.document.write(documentHtml);
    printWindow.document.close();
}
function downloadTaxInvoicePDF(booking = {}, hotel = {}) {
    const guest = booking.guest || {};
    const room = booking.room || {};
    const roomType = booking.roomType || {};
    const charges = booking.posCharges || [];
    const hotelName = hotel.name || "Grand Royale Luxury Resort";
    const hotelAddress = hotel.address || hotel.city || "Marine Drive, Mumbai, Maharashtra";
    const hotelGst = hotel.gstin || "27AABCG1234F1Z8";
    const hotelPhone = hotel.phone || hotel.ownerPhone || "+91 98200 12345";
    const invoiceNum = booking.bookingNumber ? `INV-${booking.bookingNumber}` : `INV-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    const roomTariff = (booking.totalAmount || 4500) - charges.reduce((s, c)=>s + (c.amount || 0), 0);
    const subtotal = booking.totalAmount || 4500;
    const paidAmount = booking.paidAmount || 0;
    const balanceDue = Math.max(0, subtotal - paidAmount);
    const gstRate = 12;
    const gstAmount = Math.round(subtotal * gstRate / (100 + gstRate));
    const baseAmount = subtotal - gstAmount;
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">🏨</div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">${hotelAddress} &bull; Ph: ${hotelPhone}</div>
          <div class="hotel-sub">GSTIN: <strong>${hotelGst}</strong></div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Tax Invoice</div>
        <div class="doc-id">${invoiceNum}</div>
        <div class="doc-date">Date: ${dateStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Billed To (Guest Details)</h4>
        <p>${guest.fullName || guest.name || "Valued Guest"}</p>
        <span>📞 ${guest.mobileNumber || guest.phone || "N/A"} &bull; ✉️ ${guest.email || "N/A"}</span>
        <span>Govt ID: ${guest.idProof?.idType || guest.govtIdType || "Aadhaar"}: ${guest.idProof?.idNumber || guest.govtIdNumber || "XXXX-XXXX-4512"}</span>
      </div>
      <div class="info-block">
        <h4>Stay &amp; Room Allocation</h4>
        <p>Room #${booking.roomNumber || room.roomNumber || "101"} (${roomType.name || "Deluxe Suite"})</p>
        <span>Check-In: <strong>${booking.checkInDate || "Today"}</strong> &bull; Check-Out: <strong>${booking.checkOutDate || "Tomorrow"}</strong></span>
        <span>Booking Folio: #${booking.bookingNumber || "BK-8921"}</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description of Service / Charge</th>
          <th class="text-center">HSN/SAC</th>
          <th class="text-right">Qty / Nights</th>
          <th class="text-right">Rate (₹)</th>
          <th class="text-right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <strong>Room Accommodation Charges</strong>
            <div style="font-size:11px;color:#64748B;">Room #${booking.roomNumber || "101"} - ${roomType.name || "Executive Suite"}</div>
          </td>
          <td class="text-center">996311</td>
          <td class="text-right">1</td>
          <td class="text-right">₹${roomTariff.toLocaleString("en-IN")}</td>
          <td class="text-right">₹${roomTariff.toLocaleString("en-IN")}</td>
        </tr>
        ${charges.map((c, i)=>`
          <tr>
            <td>${i + 2}</td>
            <td>
              <strong>${c.title || c.item || "POS Room Service / Mini-bar"}</strong>
              <div style="font-size:11px;color:#64748B;">F&amp;B / Sundry Service</div>
            </td>
            <td class="text-center">996331</td>
            <td class="text-right">1</td>
            <td class="text-right">₹${(c.amount || 0).toLocaleString("en-IN")}</td>
            <td class="text-right">₹${(c.amount || 0).toLocaleString("en-IN")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="total-card">
      <div class="total-row">
        <span>Taxable Value:</span>
        <span>₹${baseAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row">
        <span>CGST (6%):</span>
        <span>₹${Math.round(gstAmount / 2).toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row">
        <span>SGST (6%):</span>
        <span>₹${Math.round(gstAmount / 2).toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row grand">
        <span>Total Gross Bill:</span>
        <span>₹${subtotal.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row" style="color:#059669;font-weight:700;">
        <span>Amount Settled / Paid:</span>
        <span>₹${paidAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row" style="color:${balanceDue > 0 ? '#DC2626' : '#059669'};font-weight:800;">
        <span>Balance Due:</span>
        <span>₹${balanceDue.toLocaleString("en-IN")}</span>
      </div>
    </div>

    <div class="footer">
      <div>
        <p><strong>Thank you for choosing ${hotelName}!</strong></p>
        <p>This is a computer-generated tax invoice verified under GST regulations.</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Authorized Signatory / Cashier</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Tax_Invoice_${invoiceNum}`, html);
}
function downloadPaymentReceiptPDF(payment = {}, hotel = {}) {
    const hotelName = hotel.name || "Grand Royale Luxury Resort";
    const receiptNum = payment.receiptNumber || `RCP-${Date.now().toString().slice(-6)}`;
    const dateStr = payment.dateStr || new Date().toLocaleDateString("en-IN");
    const timeStr = payment.timeStr || new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">💳</div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Official Counter Payment Voucher &bull; Front Desk Cashier</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#059669;">Payment Receipt</div>
        <div class="doc-id">#${receiptNum}</div>
        <div class="doc-date">${dateStr} &bull; ${timeStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Received From (Guest)</h4>
        <p>${payment.guest?.fullName || payment.guestName || "Guest"}</p>
        <span>📞 ${payment.guest?.mobileNumber || payment.guestPhone || "N/A"}</span>
        <span>Room #${payment.booking?.roomNumber || payment.roomNumber || "101"} (Folio: #${payment.booking?.bookingNumber || payment.bookingNumber || "BK-001"})</span>
      </div>
      <div class="info-block">
        <h4>Payment &amp; Collector Details</h4>
        <p>Method: <strong>${payment.paymentMethod || "CASH"}</strong></p>
        <span>Collector: ${payment.collectedBy?.name || payment.collectedByName || "Front Desk Staff"}</span>
        <span>Reference / UTR: ${payment.transactionId || "Counter Cash"}</span>
      </div>
    </div>

    <div style="background:#F0FDF4;border:2px solid #86EFAC;border-radius:14px;padding:20px;text-align:center;margin-bottom:24px;">
      <div style="font-size:12px;font-weight:800;color:#15803D;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Amount Paid in Full</div>
      <div style="font-size:32px;font-weight:900;color:#15803D;letter-spacing:-1px;">₹${(payment.amount || 0).toLocaleString("en-IN")}</div>
      <div style="font-size:12px;color:#166534;margin-top:4px;">Transaction Stage: <strong>${payment.paymentType || "SETTLEMENT"}</strong> &bull; Status: <strong>PAID / VERIFIED</strong></div>
    </div>

    <div class="footer">
      <div>
        <p>Automated payment receipt &bull; Digitally logged in PMS Treasury</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Cashier / Desk Staff Signature</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Receipt_${receiptNum}`, html);
}
function downloadHandoverVoucherPDF(handover = {}, hotel = {}) {
    const hotelName = hotel.name || "Grand Royale Luxury Resort";
    const code = handover.handoverCode || `HO-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date(handover.createdAt || Date.now()).toLocaleString("en-IN");
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">💼</div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Shift Handover &amp; Cash Drawer Settlement Audit Record</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#D97706;">Handover Slip</div>
        <div class="doc-id">#${code}</div>
        <div class="doc-date">${dateStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Audit &amp; Shift Officer</h4>
        <p>Settled By: <strong>${handover.settledByAdmin?.name || "Hotel General Manager"}</strong></p>
        <span>Audit Timestamp: ${dateStr}</span>
      </div>
      <div class="info-block">
        <h4>Settlement Scope</h4>
        <p>Total Receipts Settled: <strong>${handover.paymentsCount || 0} Transactions</strong></p>
        <span>Status: <strong style="color:#059669;">DEPOSITED IN VAULT / SAFE</strong></span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Payment Channel</th>
          <th class="text-right">Amount Settled (₹)</th>
          <th class="text-right">Audit Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Physical Counter Cash</strong></td>
          <td class="text-right" style="font-weight:800;color:#059669;">₹${(handover.cashAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-success">Vault Locked</span></td>
        </tr>
        <tr>
          <td><strong>UPI QR Digital Collections</strong></td>
          <td class="text-right" style="font-weight:800;color:#7C3AED;">₹${(handover.upiAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-primary">Bank Direct</span></td>
        </tr>
        <tr>
          <td><strong>Card POS &amp; Net Banking</strong></td>
          <td class="text-right" style="font-weight:800;color:#2563EB;">₹${(handover.cardAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-primary">Settled</span></td>
        </tr>
        <tr style="background:#F8FAFC;font-weight:900;">
          <td><strong>Total Shift Revenue Deposited</strong></td>
          <td class="text-right" style="font-size:15px;color:#0F172A;">₹${(handover.totalSettledAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-success">Verified</span></td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Shift Cashier / Receptionist</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Hotel Admin / Duty Manager</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Handover_Slip_${code}`, html);
}
function downloadGovtIdReportPDF(guests = [], hotel = {}) {
    const hotelName = hotel.name || "Grand Royale Luxury Resort";
    const dateStr = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">🛡️</div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Official Guest Police Manifest &amp; Regulatory ID Compliance Ledger</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#D97706;">Police Manifest</div>
        <div class="doc-date">Report Date: ${dateStr}</div>
        <div class="doc-id">Total Registrations: ${guests.length}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Guest Full Name</th>
          <th>Allocated Room</th>
          <th>Govt ID Type</th>
          <th>Document Number</th>
          <th>Mobile Contact</th>
          <th class="text-center">Compliance Stamp</th>
        </tr>
      </thead>
      <tbody>
        ${guests.map((g, i)=>`
          <tr>
            <td>${i + 1}</td>
            <td><strong>${g.fullName || g.name || "Guest"}</strong></td>
            <td>Room #${g.roomAssigned || g.roomNumber || "N/A"}</td>
            <td><span class="badge badge-primary">${g.govtIdType || g.idType || "AADHAAR"}</span></td>
            <td><code style="font-weight:700;">${g.govtIdNumber || g.idNumber || "N/A"}</code></td>
            <td>${g.phone || g.mobileNumber || "N/A"}</td>
            <td class="text-center">
              ${g.idVerified ? '<span class="badge badge-success">✓ Verified &amp; Stamped</span>' : '<span class="badge badge-warning">Pending Physical ID</span>'}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Submitted under compliance with Local Police Registration &amp; Guest Safety Act</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Compliance Officer / General Manager</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Police_Manifest_${Date.now()}`, html);
}
function downloadDailyLedgerPDF(payments = [], summary = {}, hotel = {}, dateStr = "Today") {
    const hotelName = hotel.name || "Grand Royale Luxury Resort";
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">📊</div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Daily Financial Collections &amp; Shift Audit Statement</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Treasury Report</div>
        <div class="doc-date">Date: ${dateStr}</div>
        <div class="doc-id">Total Items: ${payments.length}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Collection Breakdown</h4>
        <p>Cash Counter: ₹${(summary.cashTotal || 0).toLocaleString("en-IN")}</p>
        <span>UPI QR Collections: ₹${(summary.upiTotal || 0).toLocaleString("en-IN")}</span>
        <span>Card POS &amp; Bank: ₹${((summary.cardTotal || 0) + (summary.bankTotal || 0)).toLocaleString("en-IN")}</span>
      </div>
      <div class="info-block">
        <h4>Grand Totals</h4>
        <p style="font-size:18px;color:#059669;">₹${(summary.totalCollections || 0).toLocaleString("en-IN")}</p>
        <span>Settled to Vault: ₹${(summary.settledToAdmin || 0).toLocaleString("en-IN")}</span>
        <span style="color:#D97706;">In Drawer Pending Settlement: ₹${(summary.drawerCash || 0).toLocaleString("en-IN")}</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Receipt # &amp; Time</th>
          <th>Guest &amp; Room</th>
          <th>Mode</th>
          <th>Type</th>
          <th class="text-right">Amount (₹)</th>
          <th>Staff Collector</th>
        </tr>
      </thead>
      <tbody>
        ${payments.map((p)=>`
          <tr>
            <td><strong>#${p.receiptNumber}</strong><div style="font-size:11px;color:#64748B;">${p.timeStr || "N/A"}</div></td>
            <td>Room ${p.roomNumber || p.booking?.roomNumber || "N/A"} - ${p.guestName || p.guest?.fullName || "Guest"}</td>
            <td><span class="badge badge-primary">${p.paymentMethod}</span></td>
            <td>${p.paymentType}</td>
            <td class="text-right" style="font-weight:900;color:#059669;">₹${(p.amount || 0).toLocaleString("en-IN")}</td>
            <td>${p.collectedByName || p.collectedBy?.name || "Staff"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Grand Royale Enterprise PMS Treasury Audit</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Chief Accountant / Auditor</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Collections_Statement_${Date.now()}`, html);
}
function downloadAuditLogsPDF(logs = []) {
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">🔒</div>
        <div>
          <div class="hotel-name">Grand Royale Cloud PMS Platform</div>
          <div class="hotel-sub">Global Super Administrator Security &amp; Tenant Action Audit Ledger</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#DC2626;">Security Audit</div>
        <div class="doc-date">Generated: ${new Date().toLocaleString("en-IN")}</div>
        <div class="doc-id">Total Log Entries: ${logs.length}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Log ID</th>
          <th>Action Triggered</th>
          <th>Target Property</th>
          <th>Actor Email</th>
          <th>IP Address</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map((log)=>`
          <tr>
            <td><code style="font-weight:700;">${log.id || log._id}</code></td>
            <td><span class="badge ${log.action?.includes("ACTIVATED") ? "badge-success" : log.action?.includes("SUSPENDED") ? "badge-warning" : "badge-primary"}">${log.action}</span></td>
            <td><strong>${log.hotel || log.hotelName || "Global Platform"}</strong></td>
            <td>${log.user || log.userEmail || "System Root"}</td>
            <td><code>${log.ip || "127.0.0.1"}</code></td>
            <td>${log.timestamp || log.createdAt || "N/A"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Cryptographically secured platform audit trial. Immutable system ledger.</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Security Compliance Officer</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Platform_Audit_Logs_${Date.now()}`, html);
}
function downloadHotelsDirectoryPDF(hotels = []) {
    const activeCount = hotels.filter((h)=>h.status === "ACTIVE").length;
    const pendingCount = hotels.filter((h)=>h.status === "PENDING").length;
    const suspendedCount = hotels.filter((h)=>h.status === "DISABLED" || h.status === "SUSPENDED").length;
    const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon">🌐</div>
        <div>
          <div class="hotel-name">Grand Royale Multi-Tenant Hotel Network</div>
          <div class="hotel-sub">Global Property Governance &amp; Tenant Lifecycle Directory</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#0B8EE0;">Network Directory</div>
        <div class="doc-date">Generated: ${new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })}</div>
        <div class="doc-id">Total Properties: ${hotels.length}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Tenant Status Distribution</h4>
        <p style="color:#059669;">Active &amp; Licensed: ${activeCount}</p>
        <span style="color:#D97706;">Pending Onboarding: ${pendingCount}</span>
        <span style="color:#DC2626;">Suspended / Disabled: ${suspendedCount}</span>
      </div>
      <div class="info-block">
        <h4>Governance Scope</h4>
        <p>Total Registered Network: ${hotels.length} Properties</p>
        <span>Platform: Grand Royale Cloud Multi-Tenant Cluster</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Property Name</th>
          <th>Location / City</th>
          <th>Admin Email</th>
          <th>Plan &amp; License</th>
          <th class="text-center">Tenant Status</th>
        </tr>
      </thead>
      <tbody>
        ${hotels.map((h, i)=>`
          <tr>
            <td>${i + 1}</td>
            <td><strong>${h.name || "Hotel"}</strong><div style="font-size:11px;color:#64748B;">ID: ${h._id || h.id || "N/A"}</div></td>
            <td>${h.city || "N/A"}</td>
            <td>${h.admin?.email || h.ownerEmail || "N/A"}</td>
            <td><span class="badge badge-primary">${h.subscription?.plan || h.plan || "ENTERPRISE"}</span></td>
            <td class="text-center">
              <span class="badge ${h.status === "ACTIVE" ? "badge-success" : h.status === "PENDING" ? "badge-warning" : "badge-warning"}" style="${h.status !== "ACTIVE" && h.status !== "PENDING" ? "background:#FEE2E2;color:#DC2626;border:1px solid #FCA5A5;" : ""}">
                ${h.status || "ACTIVE"}
              </span>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Grand Royale Multi-Tenant Hospitality Platform Enterprise Report</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Super Administrator</p>
      </div>
    </div>
  `;
    openPrintOrSavePDF(`Hotels_Directory_Report_${Date.now()}`, html);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/utils/timeUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hotel Timings & Timezone Utility Helpers
 */ /**
 * Converts 24-hour time "HH:mm" (e.g. "14:00") into 12-hour format "hh:mm AM/PM" (e.g. "02:00 PM")
 */ __turbopack_context__.s([
    "formatTime12Hour",
    ()=>formatTime12Hour,
    "formatTime24Hour",
    ()=>formatTime24Hour,
    "formatTimeWithZone",
    ()=>formatTimeWithZone,
    "getTurnaroundWindow",
    ()=>getTurnaroundWindow,
    "validateHotelTimings",
    ()=>validateHotelTimings
]);
function formatTime12Hour(time24) {
    if (!time24) return "12:00 PM";
    const str = String(time24).trim();
    // If already in 12-hour AM/PM format
    if (/AM|PM/i.test(str)) {
        return str.toUpperCase();
    }
    const parts = str.split(":");
    if (parts.length < 2) return str;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1].padStart(2, "0");
    if (isNaN(hours)) return str;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${ampm}`;
}
function formatTime24Hour(time12) {
    if (!time12) return "14:00";
    const str = String(time12).trim();
    const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!match) return str;
    let hours = parseInt(match[1], 10);
    const minutes = match[2].padStart(2, "0");
    const period = match[3] ? match[3].toUpperCase() : null;
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
}
function formatTimeWithZone(time, timezone = "Asia/Kolkata") {
    const formattedTime = formatTime12Hour(time);
    return `${formattedTime} (${timezone})`;
}
function getTurnaroundWindow(checkInTime = "14:00", checkOutTime = "12:00") {
    const tIn = formatTime24Hour(checkInTime);
    const tOut = formatTime24Hour(checkOutTime);
    const [inH, inM] = tIn.split(":").map(Number);
    const [outH, outM] = tOut.split(":").map(Number);
    if (isNaN(inH) || isNaN(outH)) return null;
    const inMinutes = inH * 60 + (inM || 0);
    const outMinutes = outH * 60 + (outM || 0);
    let diffMinutes = inMinutes - outMinutes;
    if (diffMinutes < 0) {
        diffMinutes += 24 * 60;
    }
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    if (mins === 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return `${hours}h ${mins}m`;
}
function validateHotelTimings(checkInTime, checkOutTime) {
    if (!checkInTime || !checkOutTime) {
        return {
            valid: false,
            error: "Both Check-in Time and Check-out Time are required."
        };
    }
    const tIn = formatTime24Hour(checkInTime);
    const tOut = formatTime24Hour(checkOutTime);
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(tIn)) {
        return {
            valid: false,
            error: "Invalid Check-in Time format."
        };
    }
    if (!timeRegex.test(tOut)) {
        return {
            valid: false,
            error: "Invalid Check-out Time format."
        };
    }
    if (tIn === tOut) {
        return {
            valid: false,
            error: "Check-in Time and Check-out Time cannot be identical."
        };
    }
    const [inH, inM] = tIn.split(":").map(Number);
    const [outH, outM] = tOut.split(":").map(Number);
    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;
    // In standard hotel PMS operations, checkOut is before checkIn on turnaround day
    if (outMinutes > inMinutes && outMinutes - inMinutes < 720) {
        return {
            valid: false,
            error: "Check-out Time must be earlier than Check-in Time to allow housekeeping room turnover before incoming guests arrive."
        };
    }
    return {
        valid: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_shared_0-dm8gr._.js.map