import { Phrase } from "@/types";

function escapeCSVField(field: string): string {
  if (field.includes('"') || field.includes(",") || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function generateCSV(items: Phrase[]): Blob {
  const header = "Vocabulary,Translation,Pronunciation";
  const rows = items.map(
    (item) =>
      `${escapeCSVField(item.translation)},${escapeCSVField(item.english)},${escapeCSVField(item.pronunciation)}`,
  );

  const csv = [header, ...rows].join("\n");
  return new Blob([csv], { type: "text/csv;charset=utf-8;" });
}
