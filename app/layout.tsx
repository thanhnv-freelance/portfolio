import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = 'https://portfolio-jade-kappa-64.vercel.app'
const title = 'Nguyen Van Thanh — Senior Backend & Cloud Engineer'
const description =
  'Senior Backend & Cloud Engineer with 10+ years building large-scale distributed systems for banking, fintech, and enterprise platforms. Specialized in Spring Boot microservices, AWS, payment systems, and event-driven architecture.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Nguyen Van Thanh',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
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
            __html: `(function(){try{if(localStorage.getItem('theme')!=='light')document.documentElement.classList.add('dark');var s=localStorage.getItem('portfolio:font-size');if(s!=='small'&&s!=='default'&&s!=='large'){var w=window.screen.width;s=w<1280?'small':w>=2560?'large':'default'}document.documentElement.setAttribute('data-font-size',s)}catch(e){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-font-size','default')}})()`
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans flex flex-col">
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <footer className="border-t border-border px-6 sm:px-12 lg:px-24 py-6 max-w-4xl mx-auto w-full">
            <p className="text-xs font-mono text-muted-foreground">
              &copy; {new Date().getFullYear()} Nguyen Van Thanh. All rights reserved.
            </p>
          </footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
