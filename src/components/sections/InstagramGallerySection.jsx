"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

export default function InstagramGallerySection({
  gallery = [],
  instagram = {},
}) {
  if (!gallery?.length) return null;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Text
              as="h2"
              variant="h2"
              className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
            >
              {instagram?.title || "From Our Kitchen"}
            </Text>
            <Text className="mt-2 text-paragraph">
              {instagram?.description ||
                "Follow us on Instagram for recipes, behind-the-scenes & more"}
            </Text>
          </div>
          <Link
            href={instagram?.profile_url || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaInstagram size={18} />
            {instagram?.handle || "@arshinaturals"}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || "Gallery"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-[#1B5E20]/0 group-hover:bg-[#1B5E20]/30 transition-colors flex items-center justify-center">
                <FaInstagram
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
