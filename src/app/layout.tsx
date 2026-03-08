import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PERS-41 Command Detailer",
  description: "XO/CO Assignment and Tracking Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <div className="flex h-screen overflow-hidden bg-background print:h-auto print:min-h-screen print:overflow-visible print:block">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden print:block print:overflow-visible print:h-auto">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 print:p-0 print:overflow-visible print:block print:h-auto">
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
