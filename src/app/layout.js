import { Suspense } from "react";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import {
  AuthInitializer,
  Header,
  Footer,
  WelcomePopup,
  WhatsAppButton,
} from "@/components";

import AuthHandler from "@/components/common/Authhandler";
import ReduxProvider from "@/providers/ReduxProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
};

export default async function RootLayout({ children }) {
  let title = "Arshi Naturals | Pure. Authentic. Homemade with Love.";
  let description =
    "Premium homemade pickles, snacks, sweets and natural foods crafted with traditional recipes. Delivered fresh to your doorstep.";
  let favicon = "/logo.jpeg";

  try {
    const response = await fetch(`${API_BASE_URL}/store/cms/site-meta`, {
      cache: "no-store",
    });
    if (response.ok) {
      const body = await response.json();
      const meta = body?.data || {};
      if (meta.title) title = meta.title;
      if (meta.description) description = meta.description;
      if (meta.favicon) favicon = meta.favicon;
    }
  } catch {
    // fall back to defaults
  }

  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ReduxProvider>
          <AuthInitializer />

          <Suspense fallback={null}>
            <AuthHandler>
              <WelcomePopup />
              <Header />

              <main className="flex-1">{children}</main>

              <Footer />

              <WhatsAppButton />
            </AuthHandler>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
