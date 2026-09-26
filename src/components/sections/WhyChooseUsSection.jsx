"use client";

import { motion } from "framer-motion";
import { Leaf, ChefHat, Clock, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

const ICON_MAP = {
  Leaf,
  ChefHat,
  Clock,
  Truck,
};

const DEFAULT_FEATURES = [
  {
    icon_name: "Leaf",
    title: "100% Natural Ingredients",
    description:
      "We use only fresh, natural ingredients with no artificial colors or preservatives.",
    color: "#4CAF50",
  },
  {
    icon_name: "ChefHat",
    title: "Traditional Recipes",
    description:
      "Every product is made using time-honored family recipes passed down through generations.",
    color: "#1B5E20",
  },
  {
    icon_name: "Clock",
    title: "Freshly Prepared",
    description:
      "Small-batch preparation ensures maximum freshness and authentic taste in every bite.",
    color: "#D4AF37",
  },
  {
    icon_name: "Truck",
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across India so your favorites arrive fresh at your door.",
    color: "#2E7D32",
  },
];

export default function WhyChooseUsSection({ features = [] }) {
  const items = features?.length ? features : DEFAULT_FEATURES;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-10 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            Why Choose Arshi Naturals
          </Text>
          <Text className="mt-2 max-w-xl mx-auto text-paragraph">
            Premium homemade foods crafted with care, tradition and love
          </Text>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon_name] || Leaf;
            const color = feature.color || "#4CAF50";

            return (
              <motion.div
                key={feature.id || feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center premium-shadow transition-all hover:border-[#4CAF50]/30 hover:premium-shadow-lg"
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <Text variant="h6" className="mb-2 text-[#1a2e1a]">
                  {feature.title}
                </Text>
                <Text variant="bodySmall" className="text-paragraph">
                  {feature.description}
                </Text>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
