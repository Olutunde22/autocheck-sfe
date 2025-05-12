import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autochek - %s",
  description:
    "Apply For Car Loans And Get Offers In 24 Hours! At Autochek, Buy New & Used Cars From Trusted Dealers & Sellers In Nigeria. Sell Your Car Fast By Contacting Right Buyers Today.",
  openGraph: {
    title: "Autochek - %s",
    description:
      "Apply For Car Loans And Get Offers In 24 Hours! At Autochek, Buy New & Used Cars From Trusted Dealers & Sellers In Nigeria. Sell Your Car Fast By Contacting Right Buyers Today.",
    url: "https://autochek.com/ng",
    siteName: "Autochek Nigeria",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
