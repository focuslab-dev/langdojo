import { LanguageId } from "@/types";
import { getLanguageById, categories } from "@/utils/languages";

interface ReviewData {
  selectedLanguageId: LanguageId;
  phraseComments: Record<string, Record<string, string>>;
  newPhraseSuggestions: Record<string, string>;
  overallFeedback: string;
  contributorName: string;
  contributorLink: string;
}

interface PhraseInfo {
  id: string;
  text: string;
  translation: string;
}

export function formatReviewEmail(
  data: ReviewData,
  phraseLookup: Record<string, PhraseInfo[]>,
): string {
  const language = getLanguageById(data.selectedLanguageId);
  const languageName = language?.name ?? data.selectedLanguageId;
  const reviewCategories = categories.filter((c) => c.id !== "favorites");

  const lines: string[] = [];
  lines.push(`Lang Dojo Phrase Review — ${languageName}`);
  lines.push("=".repeat(40));
  lines.push("");

  if (data.contributorName) {
    lines.push(`Reviewer: ${data.contributorName}`);
  }
  if (data.contributorLink) {
    lines.push(`Link: ${data.contributorLink}`);
  }
  if (data.contributorName || data.contributorLink) {
    lines.push("");
  }

  let hasContent = false;

  for (const category of reviewCategories) {
    const comments = data.phraseComments[category.id] ?? {};
    const suggestion = (data.newPhraseSuggestions[category.id] ?? "").trim();

    const activeComments = Object.entries(comments).filter(
      ([, v]) => v.trim() !== "",
    );

    if (activeComments.length === 0 && !suggestion) continue;

    hasContent = true;
    lines.push(`${category.emoji} ${category.name}`);
    lines.push("-".repeat(30));

    const phrases = phraseLookup[category.id] ?? [];
    for (const [phraseId, comment] of activeComments) {
      const phrase = phrases.find((p) => p.id === phraseId);
      if (phrase) {
        lines.push(`  "${phrase.translation}" → ${phrase.text}`);
        lines.push(`  Comment: ${comment.trim()}`);
        lines.push("");
      }
    }

    if (suggestion) {
      lines.push(`  Suggested additions: ${suggestion}`);
      lines.push("");
    }
  }

  if (data.overallFeedback.trim()) {
    hasContent = true;
    lines.push("Overall Feedback");
    lines.push("-".repeat(30));
    lines.push(data.overallFeedback.trim());
    lines.push("");
  }

  if (!hasContent) {
    lines.push("(No feedback provided)");
    lines.push("");
  }

  lines.push("---");
  lines.push("Sent via Lang Dojo /review");

  return lines.join("\n");
}
