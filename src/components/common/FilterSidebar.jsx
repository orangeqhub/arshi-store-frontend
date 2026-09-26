"use client";

import Text from "@/components/ui/Text";

export default function FilterSidebar({
  categories = [],
  selectedCategory = "",
  onCategoryChange,
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5">
      <Text variant="h4" className="mb-5 font-semibold text-black">
        Categories
      </Text>

      <div className="space-y-3">
        <button
          onClick={() => onCategoryChange("")}
          className={`block w-full text-left text-sm transition-colors ${
            selectedCategory === ""
              ? "font-semibold text-[var(--color-text-primary)]"
              : "text-gray-600"
          }`}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex w-full items-center gap-2 text-left text-sm transition-colors cursor-pointer ${
              selectedCategory === category.id
                ? "font-semibold text-[var(--color-text-primary)]"
                : "text-gray-600"
            }`}
          >
            <span>{category.icon || "🌿"}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
