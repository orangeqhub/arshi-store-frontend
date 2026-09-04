"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

export default function BlogSection({ posts = [] }) {
  if (!posts?.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-primary-soft/30">
      <Container>
        <div className="mb-8 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            From Our Blog
          </Text>
          <Text className="mt-2 text-paragraph">
            Stories, recipes and traditions from the Arshi Naturals kitchen
          </Text>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white premium-shadow transition-all hover:premium-shadow-lg"
            >
              {post.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {post.category && (
                    <span className="absolute top-3 left-3 rounded-full bg-[#1B5E20] px-3 py-1 text-xs font-medium text-white">
                      {post.category}
                    </span>
                  )}
                </div>
              )}
              <div className="p-5">
                {post.published_at && (
                  <div className="flex items-center gap-2 text-xs text-paragraph mb-2">
                    <Calendar size={12} />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                )}
                <Text variant="h6" className="text-[#1a2e1a] mb-2 line-clamp-2">
                  {post.title}
                </Text>
                <Text variant="bodySmall" className="text-paragraph mb-4 line-clamp-2">
                  {post.excerpt}
                </Text>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#4CAF50] group-hover:text-[#1B5E20] transition">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
