"use client";

import type { SkillCategory } from "@/types/skill";
import { ALL_CATEGORIES } from "@/types/skill";
import subcategoryData from "@/data/subcategories.json";

const SUBCATEGORIES = subcategoryData as Record<string, string[]>;

interface FilterPillsProps {
  selectedCategory: "All" | SkillCategory;
  selectedSubcategory: string | null;
  onCategoryChange: (category: "All" | SkillCategory) => void;
  onSubcategoryChange: (sub: string | null) => void;
}

export default function FilterPills({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: FilterPillsProps) {
  const subcategories =
    selectedCategory !== "All" ? (SUBCATEGORIES[selectedCategory] ?? []) : [];

  return (
    <div className="space-y-2">
      {/* Top-level categories */}
      <div className="flex flex-wrap gap-2">
        <Pill
          label="All"
          active={selectedCategory === "All"}
          onClick={() => { onCategoryChange("All"); onSubcategoryChange(null); }}
        />
        {ALL_CATEGORIES.map((cat) => (
          <Pill
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => { onCategoryChange(cat); onSubcategoryChange(null); }}
          />
        ))}
      </div>

      {/* Subcategory row — only visible when a category is selected */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-1">
          <Pill
            label="All"
            active={selectedSubcategory === null}
            onClick={() => onSubcategoryChange(null)}
            small
          />
          {subcategories.map((sub) => (
            <Pill
              key={sub}
              label={sub}
              active={selectedSubcategory === sub}
              onClick={() => onSubcategoryChange(sub)}
              small
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
  small = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border transition-all ${
        small ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-xs font-medium"
      } ${
        active
          ? "border-[#f97316] bg-[#f97316] text-white"
          : "border-[#2a2a2a] bg-[#1a1a1a] text-[#9ca3af] hover:border-[#f97316]/50 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
