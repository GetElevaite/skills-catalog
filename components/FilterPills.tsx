"use client";

import type { SkillCategory } from "@/types/skill";

const CATEGORIES: Array<"All" | SkillCategory> = [
  "All",
  "Tools",
  "Business",
  "Development",
  "Testing & Security",
  "Data & AI",
  "DevOps",
  "Documentation",
  "Content & Media",
  "Research",
  "Lifestyle",
  "Databases",
  "Blockchain",
];

interface FilterPillsProps {
  selected: "All" | SkillCategory;
  onChange: (category: "All" | SkillCategory) => void;
}

export default function FilterPills({ selected, onChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
            selected === cat
              ? "border-[#f97316] bg-[#f97316] text-white"
              : "border-[#2a2a2a] bg-[#1a1a1a] text-[#9ca3af] hover:border-[#f97316]/50 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
