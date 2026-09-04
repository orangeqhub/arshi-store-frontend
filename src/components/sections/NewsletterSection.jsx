"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import { subscribeNewsletter } from "@/services/cms.service";

export default function NewsletterSection({ content = {} }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setError("");
      await subscribeNewsletter(email.trim());
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Subscription failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] px-8 py-12 text-center md:px-16"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#D4AF37] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#4CAF50] blur-3xl" />
          </div>

          <div className="relative z-10">
            <Mail size={32} className="mx-auto mb-4 text-[#D4AF37]" />
            <Text
              as="h2"
              variant="h3"
              className="text-white font-[family-name:var(--font-playfair)]"
            >
              {content?.title || "Subscribe to Our Newsletter"}
            </Text>
            <Text className="mt-3 max-w-md mx-auto text-white/80">
              {content?.description ||
                "Get exclusive offers, new product launches and traditional recipes delivered to your inbox"}
            </Text>

            {submitted ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 text-[#D4AF37] font-semibold"
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-xl border-0 px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#1B5E20] transition hover:bg-[#e8c44a] disabled:opacity-70"
                >
                  {loading ? "..." : "Subscribe"} <Send size={16} />
                </button>
              </form>
            )}
            {error && (
              <p className="mt-3 text-sm text-red-200">{error}</p>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
