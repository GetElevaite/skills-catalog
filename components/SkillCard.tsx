import Link from "next/link";
import type { Skill } from "@/types/skill";

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/catalog/${skill.id}`} className="group block">
      <div className="flex h-full min-h-[160px] flex-col rounded-[12px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-all duration-200 hover:border-[#f97316]/40 hover:shadow-[0_0_12px_rgba(249,115,22,0.08)]">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight text-white group-hover:text-[#f97316] transition-colors line-clamp-1">
            {skill.name}
          </h3>
          <span className="shrink-0 text-xs text-[#9ca3af]">{skill.author}</span>
        </div>

        <p className="mb-auto line-clamp-3 text-xs leading-relaxed text-[#9ca3af]">
          {skill.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
            <FolderIcon />
            <span>{skill.fileCount} {skill.fileCount === 1 ? "file" : "files"}</span>
          </div>
          {skill.subcategory && (
            <span className="text-xs text-[#6b7280] truncate max-w-[100px]">
              {skill.subcategory}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function FolderIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
