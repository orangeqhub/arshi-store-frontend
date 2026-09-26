"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container, Text } from "@/components";
import useCategories from "@/hooks/useCategories";

function CategoryCard({ cat, index, onClick }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(cat)}
      className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 premium-shadow transition-all hover:border-[#4CAF50]/40 hover:premium-shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl bg-[#E8F5E9]">
          {cat.icon || "🌿"}
        </div>
        <div className="min-w-0">
          <Text variant="h5" className="text-[#1a2e1a]">
            {cat.name}
          </Text>
          <Text variant="bodySmall" className="text-paragraph mt-1">
            {cat.description || "Explore our collection"}
          </Text>
        </div>
      </div>
      <button className="mt-4 text-sm font-semibold text-[#4CAF50] hover:text-[#1B5E20] transition">
        Shop {cat.name} →
      </button>
    </motion.div>
  );
}

export default function CategoriesPage() {
  const router = useRouter();
  const { categories, loading } = useCategories();

  const handleCategoryClick = (item) => {
    sessionStorage.setItem("selectedCategory", item.id);
    sessionStorage.setItem("selectedCategoryName", item.name);
    router.push("/products");
  };

  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="mb-10 text-center">
          <Text
            as="h1"
            variant="h2"
            className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            Our Categories
          </Text>
          <Text className="mt-3 max-w-xl mx-auto text-paragraph">
            Browse our complete range of homemade pickles, snacks, sweets,
            spice powders and natural food products
          </Text>
        </div>

        {loading ? (
          <div className="py-20 text-center text-paragraph">Loading...</div>
        ) : categories?.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                index={index}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-paragraph">
            No categories available yet. Check back soon.
          </div>
        )}
      </Container>
    </section>
  );
}
