"use client";

import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919885161899";
const WHATSAPP_MESSAGE =
  "Hi Arshi Naturals, I would like to know more about your products.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

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
