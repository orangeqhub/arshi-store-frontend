"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar({ className = "", compact = false }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      sessionStorage.setItem("productSearch", trimmed);
      router.push("/products");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <Search
        size={compact ? 16 : 18}
        className="absolute left-3 text-gray-400 pointer-events-none"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search pickles, snacks, sweets..."
        className={`
          w-full rounded-full border border-gray-200 bg-[#f5f5f0]
          pl-10 pr-9 outline-none transition
          focus:border-[var(--color-accent)] focus:bg-white focus:ring-2 focus:ring-[#4CAF50]/20
          ${compact ? "h-9 text-sm" : "h-10 text-sm"}
        `}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
