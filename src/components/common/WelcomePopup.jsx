"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getWelcomePopupData } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

const SESSION_KEY = "arshi_welcome_shown";

export default function WelcomePopup() {
  const router = useRouter();
  const { data } = useCmsSiteContent(getWelcomePopupData);
  const settings = data || {};

  const enabled = settings.enabled !== false;
  const imageUrl = settings.image_url || "/welcome-banner.png";
  const redirectUrl = settings.redirect_url || "/products";
  const displayDuration = settings.display_duration_ms || 6000;

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const autoCloseRef = useRef(null);
  const progressRef = useRef(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(false);
    if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const shown = sessionStorage.getItem(SESSION_KEY);
    if (shown) return;

    const showTimer = setTimeout(() => setVisible(true), 400);

    return () => clearTimeout(showTimer);
  }, [enabled]);

  useEffect(() => {
    if (!visible || !enabled) return;

    const start = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / displayDuration) * 100);
      setProgress(remaining);
    }, 50);

    autoCloseRef.current = setTimeout(dismiss, displayDuration);

    return () => {
      if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [visible, enabled, displayDuration, dismiss]);

  const handleBannerClick = () => {
    dismiss();
    router.push(redirectUrl);
  };

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 hover:scale-105"
              aria-label="Close welcome banner"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={handleBannerClick}
              className="relative block w-full cursor-pointer focus:outline-none"
              aria-label="Welcome to Arshi Naturals — Shop Now"
            >
              <Image
                src={imageUrl}
                alt="Welcome to Arshi Naturals — Pure. Authentic. Homemade with Love."
                width={1920}
                height={1080}
                priority
                unoptimized
                className="h-auto w-full object-contain"
                sizes="(max-width: 1280px) 95vw, 1024px"
              />
            </button>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
              <motion.div
                className="h-full bg-[#4CAF50]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            <button
              onClick={dismiss}
              className="absolute bottom-4 right-4 z-20 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#1B5E20] shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
