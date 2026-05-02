export type SkillCategory =
  | "Tools"
  | "Business"
  | "Development"
  | "Testing & Security"
  | "Data & AI"
  | "DevOps"
  | "Documentation"
  | "Content & Media"
  | "Research"
  | "Lifestyle"
  | "Databases"
  | "Blockchain";

export interface SkillFile {
  name: string;
  size: number | null;
  type: "file" | "folder";
}

export interface Skill {
  id: string;
  name: string;
  author: string;
  description: string;
  category: SkillCategory;
  fileCount: number;
  updatedDaysAgo: number;
  files: SkillFile[];
}
