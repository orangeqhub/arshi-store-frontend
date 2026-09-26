"use client";

import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppSettings } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

export default function WhatsAppButton() {
  const { data } = useCmsSiteContent(getWhatsAppSettings);
  const settings = data || {};

  const enabled = settings.enabled !== false;
  const number = settings.phone_number || "919885161899";
  const message =
    settings.message ||
    "Hi Arshi Naturals, I would like to know more about your products.";

  if (!enabled || !number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
