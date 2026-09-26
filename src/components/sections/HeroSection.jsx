"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Star,
  Leaf,
  FlaskConical,
  ChefHat,
  Sparkles,
  Heart,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";

const ICON_MAP = {
  Leaf,
  FlaskConical,
  ChefHat,
  Sparkles,
  Heart,
  Package,
  Truck,
  ShieldCheck,
};

const DEFAULT_TRUST_BAR = [
  { icon: "Heart", label: "Made with Love" },
  { icon: "Package", label: "Hygienically Packed" },
  { icon: "Truck", label: "Delivered with Care" },
  { icon: "ShieldCheck", label: "Secure Payments" },
];

const DEFAULT_PILLS = [
  { icon: "Leaf", label: "100% Natural" },
  { icon: "FlaskConical", label: "No Artificial Preservatives" },
  { icon: "ChefHat", label: "Traditional Recipes" },
  { icon: "Sparkles", label: "Freshly Prepared" },
];

export default function HeroSection({ banners = [], hero = {} }) {
  const router = useRouter();
  const activeBanner = banners?.[0];
  const heroImage = activeBanner?.image_url || "/hero-bg.png";

  const featurePills = hero?.feature_pills?.length
    ? hero.feature_pills
    : DEFAULT_PILLS;

  const trustBar = hero?.trust_bar?.length
    ? hero.trust_bar
    : DEFAULT_TRUST_BAR;

  return (
    <section className="relative">
      <div className="relative min-h-[620px] overflow-hidden sm:min-h-[680px] lg:min-h-[720px]">
        <Image
          src={heroImage}
          alt={activeBanner?.title || "Hero"}
          fill
          priority
          className="object-cover object-[65%_center] sm:object-[70%_center] lg:object-right"
          sizes="100vw"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(238,246,238,0.97) 0%, rgba(244,249,244,0.92) 28%, rgba(255,248,231,0.55) 48%, transparent 72%)",
          }}
        />

        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#E8F5E9]/40 to-transparent" />

        <Container className="relative z-10">
          <div className="flex min-h-[620px] items-center py-12 sm:min-h-[680px] lg:min-h-[720px] lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="w-full max-w-xl lg:max-w-[540px]"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4CAF50]/25 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm">
                <Leaf size={16} className="text-[#4CAF50]" />
                <span className="text-sm font-medium text-[#1B5E20]">
                  {hero?.badge || "Pure. Authentic. Homemade with Love."}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.12] text-[#1a2e1a] sm:text-5xl lg:text-[3.4rem]">
                {hero?.title || "Traditional Flavors"}
                <br />
                <span className="text-[#1B5E20]">
                  {hero?.title_highlight || "Crafted with Love"}{" "}
                  <span className="text-[#D4AF37]" aria-hidden="true">
                    ♡
                  </span>
                </span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-[#5a6b5a] sm:text-lg">
                {hero?.description ||
                  "Authentic homemade pickles, snacks, sweets and natural foods delivered fresh to your doorstep."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featurePills.map((pill) => {
                  const Icon = ICON_MAP[pill.icon] || Leaf;
                  return (
                    <span
                      key={pill.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#4CAF50]/15 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#1B5E20] shadow-sm backdrop-blur-sm sm:text-sm"
                    >
                      <Icon size={13} className="shrink-0 text-[#4CAF50]" />
                      {pill.label}
                    </span>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/products")}
                  className="rounded-xl bg-[#1B5E20] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2E7D32] hover:shadow-lg sm:px-8 sm:text-base"
                >
                  Shop Now →
                </button>
                <button
                  onClick={() => router.push("/categories")}
                  className="rounded-xl border-2 border-[#1B5E20] bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#1B5E20] backdrop-blur-sm transition hover:bg-white sm:px-8 sm:text-base"
                >
                  Explore Categories
                </button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <span className="font-bold text-[#1a2e1a]">
                  {hero?.rating || 4.9}/5
                </span>
                <span className="text-sm text-[#5a6b5a]">
                  by {hero?.customer_count || "2,400+"} happy customers
                </span>
              </div>
            </motion.div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 z-10 leading-[0]">
          <svg
            viewBox="0 0 1440 56"
            fill="white"
            className="block h-10 w-full sm:h-12 lg:h-14"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0,32 C240,56 480,8 720,28 C960,48 1200,16 1440,36 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 bg-white">
        <Container>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4 py-8 md:grid-cols-4 md:gap-0 md:py-9">
            {trustBar.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Heart;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3 md:px-4 ${
                    i < trustBar.length - 1
                      ? "md:border-r md:border-[#1B5E20]/10"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5E9]">
                    <Icon
                      size={20}
                      className="text-[#1B5E20]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#1a2e1a]">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
