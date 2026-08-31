"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import ProductGrid from "@/components/common/ProductGrid";

export default function BestSellingSection({ products = [] }) {
  if (!products?.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-white/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            Best Sellers
          </Text>
          <Text className="mt-2 max-w-2xl mx-auto text-paragraph">
            Our customers&apos; favorite homemade delights
          </Text>
        </motion.div>

        <ProductGrid products={products} />

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B5E20] px-8 py-3 font-semibold text-[#1B5E20] transition hover:bg-primary-soft"
          >
            View All Products →
          </Link>
        </div>
      </Container>
    </section>
  );
}
