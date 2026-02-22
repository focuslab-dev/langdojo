import { Phrase } from "@/types";

function escapeTSVField(field: string): string {
  return field.replace(/[\t\n\r]/g, " ");
}

export function generateTSV(items: Phrase[]): Blob {
  // const header = `Vocabulary\tTranslation\tPronunciation`;
  const rows = items.map((item) => {
    const pron = item.pronunciation
      ? `\t(${escapeTSVField(item.pronunciation)})`
      : "";
    return `${escapeTSVField(item.text)}\t${escapeTSVField(item.translation)}${pron}`;
  });

  const tsv = rows.join("\n");
  return new Blob([tsv], { type: "text/tab-separated-values;charset=utf-8;" });
}
