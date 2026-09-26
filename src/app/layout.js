import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { themeConfig } from "@/config/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grand Royale | Admin & Operations Console",
  description: "Multi-tenant cloud management platform for Super Admins, Hotel Admins, and Receptionists.",
};

export default function RootLayout({ children }) {
  const themeStyles = {
    "--color-primary": themeConfig.primary,
    "--color-primary-dark": themeConfig.primaryDark,
    "--color-primary-light": themeConfig.primaryLight,
    "--color-primary-glow": themeConfig.primaryGlow || "rgba(0, 0, 0, 0.15)",
    "--color-bg-main": themeConfig.bgMain,
    "--color-bg-header": themeConfig.bgHeader || "#ffffff",
    "--color-bg-card": themeConfig.bgCard || "#ffffff",
    "--color-bg-footer": themeConfig.bgFooter || "#ffffff",
    "--color-text-main": themeConfig.textMain,
    "--color-text-muted": themeConfig.textMuted,
    "--color-border": themeConfig.border,
    "--color-border-hover": themeConfig.borderHover || themeConfig.primary,
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={themeStyles}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        style={{ margin: 0, padding: 0, backgroundColor: themeConfig.bgMain, color: themeConfig.textMain }}
      >
        {children}
      </body>
    </html>
  );
}

