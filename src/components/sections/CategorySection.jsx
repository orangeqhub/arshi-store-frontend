"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

function CategoryCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(item)}
      className="
        group cursor-pointer rounded-2xl border border-gray-200
        bg-white p-5 flex flex-col items-center gap-3
        transition-all duration-300 hover:border-[#4CAF50]
        hover:shadow-[0_8px_30px_rgba(27,94,32,0.12)]
      "
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl bg-[#E8F5E9] transition-transform group-hover:scale-110">
        {item.icon || "🌿"}
      </div>

      <div className="text-center">
        <p className="font-semibold text-[#1a2e1a] text-sm sm:text-base">
          {item.name}
        </p>
        <p className="mt-1 text-xs text-paragraph leading-relaxed line-clamp-2 min-h-[32px]">
          {item.description || "Explore our collection"}
        </p>
      </div>

      <span className="text-xs font-semibold text-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity">
        Shop Now →
      </span>
    </motion.div>
  );
}

export default function CategorySection({ categories = [] }) {
  const router = useRouter();

  const handleCategoryClick = (item) => {
    sessionStorage.setItem("selectedCategory", item.id);
    sessionStorage.setItem("selectedCategoryName", item.name);
    router.push("/products");
  };

  if (!categories?.length) {
    return null;
  }

  const row1 = categories.slice(0, Math.min(6, categories.length));
  const row2 = categories.length > 6 ? categories.slice(6, 10) : [];

  return (
    <section className="bg-[#FFF8E7] pt-10 pb-12 md:pt-12 md:pb-16">
      <Container>
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60 sm:w-20" />
            <span className="text-[#D4AF37] text-lg">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60 sm:w-20" />
          </div>
          <Text
            as="h2"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            Shop by Category
          </Text>
          <Text className="mt-3 max-w-md mx-auto text-paragraph">
            Discover our handcrafted range of traditional homemade foods
          </Text>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#1B5E20] via-[#4CAF50] to-[#D4AF37]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {row1.map((item, index) => (
            <CategoryCard
              key={item.id}
              item={item}
              index={index}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {row2.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {row2.map((item, index) => (
              <CategoryCard
                key={item.id}
                item={item}
                index={index + 6}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
