"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SkillCard from "@/components/SkillCard";
import SearchBar from "@/components/SearchBar";
import FilterPills from "@/components/FilterPills";
import skillsData from "@/data/skills.json";
import type { Skill, SkillCategory } from "@/types/skill";

const skills = skillsData as Skill[];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = skills;

    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }

    if (activeSubcategory) {
      result = result.filter((s) => s.subcategory === activeSubcategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          (s.subcategory?.toLowerCase().includes(q) ?? false)
      );
    }

    return result;
  }, [search, activeCategory, activeSubcategory]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#f97316] transition-opacity hover:opacity-80"
        >
          <HomeIcon />
          <span>← Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-[#f97316]">&lt;Claude Skills Library&gt;</p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
          Skills Catalog
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[#9ca3af]">
          Browse and discover ready-to-use skills for Claude — copy prompts or
          download full packages.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters */}
      <div className="mb-5">
        <FilterPills
          selectedCategory={activeCategory}
          selectedSubcategory={activeSubcategory}
          onCategoryChange={(cat) => { setActiveCategory(cat); setActiveSubcategory(null); }}
          onSubcategoryChange={setActiveSubcategory}
        />
      </div>

      {/* Count */}
      <p className="mb-6 text-sm text-[#9ca3af]">
        {filtered.length.toLocaleString()}{" "}
        {filtered.length === 1 ? "skill" : "skills"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 text-[#2a2a2a]">
            <SearchEmptyIcon />
          </div>
          <p className="text-base font-medium text-white">No skills found</p>
          <p className="mt-1 text-sm text-[#9ca3af]">
            Try a different search term or filter.
          </p>
        </div>
      )}
    </main>
  );
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchEmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M8 11h6" />
    </svg>
  );
}
