import { notFound } from "next/navigation";
import Link from "next/link";
import skillsData from "@/data/skills.json";
import type { Skill } from "@/types/skill";
import CopyButton from "@/components/CopyButton";
import DetailCopyCode from "@/components/DetailCopyCode";

const skills = skillsData as Skill[];

interface PageProps {
  params: { skillId: string };
}

export function generateStaticParams() {
  return skills.map((s) => ({ skillId: s.id }));
}

export function generateMetadata({ params }: PageProps) {
  const skill = skills.find((s) => s.id === params.skillId);
  if (!skill) return { title: "Skill Not Found" };
  return { title: `${skill.name} — Skills Catalog` };
}

export default function SkillDetailPage({ params }: PageProps) {
  const skill = skills.find((s) => s.id === params.skillId);
  if (!skill) notFound();

  const installCommand = `claude install-skill https://github.com/skills/${skill.author}/${skill.name}`;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Back */}
      <div className="mb-8">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-sm text-[#9ca3af] transition-colors hover:text-white"
        >
          <ArrowLeftIcon />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: skill info */}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-white">{skill.name}</h1>
          <p className="mb-4 leading-relaxed text-[#9ca3af]">{skill.description}</p>
          <p className="mb-8 text-xs text-[#6b7280]">
            Updated {skill.updatedDaysAgo} {skill.updatedDaysAgo === 1 ? "day" : "days"} ago
            &nbsp;·&nbsp;{skill.fileCount} {skill.fileCount === 1 ? "file" : "files"}
          </p>

          {/* Files */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
                Files
              </span>
              <span className="rounded bg-[#2a2a2a] px-2 py-0.5 text-xs text-[#9ca3af]">
                {skill.fileCount}
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#2a2a2a]">
              {skill.files.map((file, idx) => {
                const isFirst = idx === 0;
                const isFolder = file.type === "folder";
                const isNested = file.name.includes("/");

                return (
                  <div
                    key={file.name}
                    className={`flex items-center justify-between border-b border-[#2a2a2a] px-4 py-2.5 last:border-0 ${
                      isFirst
                        ? "bg-[#f97316]/10"
                        : "bg-[#1a1a1a] hover:bg-[#222]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isFolder ? <FolderIcon /> : <FileIcon isFirst={isFirst} />}
                      <span
                        className={`text-sm ${
                          isNested ? "pl-4" : ""
                        } ${isFirst ? "font-medium text-[#f97316]" : "text-[#d1d5db]"}`}
                      >
                        {file.name}
                      </span>
                    </div>
                    {file.size !== null && (
                      <span className="text-xs text-[#6b7280]">
                        {file.size.toLocaleString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: action panel */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5">
            <div className="mb-3">
              <CopyButton text={skill.description} label="Copy Prompt" variant="primary" />
            </div>
            <div className="mb-5">
              <CopyButton text={installCommand} label="Download ZIP" variant="ghost" />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                Install via Claude Code
              </p>
              <DetailCopyCode command={installCommand} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function FileIcon({ isFirst }: { isFirst: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isFirst ? "#f97316" : "#6b7280"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
