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

export const metadata = {
  title: "Arshi Naturals | Pure. Authentic. Homemade with Love.",
  description:
    "Premium homemade pickles, snacks, sweets and natural foods crafted with traditional recipes. Delivered fresh to your doorstep.",
  icons: {
    icon: "/arshi-logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${playfair.variable} h-full antialiased`}
    >
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
