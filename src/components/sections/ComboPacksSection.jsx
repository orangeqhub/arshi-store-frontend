"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

export default function ComboPacksSection({ products = [] }) {
  if (!products?.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-primary-soft/50 to-transparent">
      <Container>
        <div className="mb-8 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            Combo Packs
          </Text>
          <Text className="mt-2 text-paragraph">
            Curated bundles at special prices — perfect for gifting
          </Text>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl bg-white premium-shadow transition-all hover:premium-shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    combo.thumbnail_url ||
                    combo.images?.[0]?.image_url ||
                    "/images/product-placeholder.png"
                  }
                  alt={combo.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {combo.is_bestseller && (
                  <span className="absolute top-3 left-3 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-white">
                    Best Value
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="text-[#4CAF50]" />
                  <Text variant="h5" className="text-[#1a2e1a]">
                    {combo.name}
                  </Text>
                </div>
                <Text variant="bodySmall" className="text-paragraph mb-4 line-clamp-2">
                  {combo.short_description || combo.description}
                </Text>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#1B5E20]">
                      ₹{combo.sale_price}
                    </span>
                    {combo.mrp && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ₹{combo.mrp}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/products/${combo.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-[#4CAF50] hover:text-[#1B5E20] transition"
                  >
                    Shop <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
