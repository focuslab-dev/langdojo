import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { ChangelogEntry } from "@/types";

export function getChangelogEntries(
  packageId: string,
  languageId: string,
): ChangelogEntry[] {
  const filePath = path.join(
    process.cwd(),
    "data",
    packageId,
    languageId,
    "00_changelog.yaml",
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return (yaml.load(raw) as ChangelogEntry[]) ?? [];
}

export function getReviewer(
  entries: ChangelogEntry[],
): { name: string; url?: string } | null {
  const firstReview = entries.find((e) => e.type === "review");
  if (!firstReview?.contributor) return null;
  return {
    name: firstReview.contributor.name,
    url: firstReview.contributor.url ?? undefined,
  };
}
