import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyen Van Thanh — Senior Backend & Cloud Engineer",
  description:
    "Senior Backend & Cloud Engineer with 10+ years building large-scale distributed systems for banking, fintech, and enterprise platforms. Specialized in Spring Boot microservices, AWS, payment systems, and event-driven architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent flash of unstyled content — runs before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        <ThemeProvider>
          <header className="fixed top-0 right-0 p-4 z-50">
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
