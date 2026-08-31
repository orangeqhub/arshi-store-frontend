"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

export default function CustomerReviewsSection({ reviews = [] }) {
  if (!reviews?.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-white/60">
      <Container>
        <div className="mb-10 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            What Our Customers Say
          </Text>
          <Text className="mt-2 text-paragraph">
            Real reviews from food lovers across India
          </Text>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 premium-shadow"
            >
              <Quote
                size={24}
                className="absolute top-4 right-4 text-[#4CAF50]/20"
              />
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#D4AF37] text-[#D4AF37]"
                  />
                ))}
              </div>
              <Text variant="bodySmall" className="text-paragraph mb-4 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </Text>
              <div className="border-t pt-4">
                <p className="font-semibold text-sm text-[#1a2e1a]">
                  {review.name}
                </p>
                {review.product && (
                  <p className="text-xs text-[#4CAF50] mt-1">
                    {review.product}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
