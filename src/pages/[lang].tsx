import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { languages, categories } from "@/utils/languages";
import { phraseData, getDownloadItemsAll } from "@/utils/getPhraseData";
import { Language, LanguageId } from "@/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface PhraseItem {
  text: string;
  pronunciation?: string | null;
  translation: string;
}

interface Props {
  language: Language;
  allItems: PhraseItem[];
  totalPhraseCount: number;
  categoryCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = languages.map((lang) => ({
    params: { lang: lang.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.lang as string;
  const language = languages.find((l) => l.slug === slug);
  if (!language) return { notFound: true };

  const categoryCount = categories.filter(
    (cat) => cat.id !== "favorites",
  ).length;

  const allItems = getDownloadItemsAll(language.id as LanguageId).map((p) => ({
    text: p.text,
    pronunciation: p.pronunciation ?? null,
    translation: p.translation,
  }));

  return {
    props: {
      language,
      allItems,
      totalPhraseCount: allItems.length,
      categoryCount,
    },
  };
};

export default function LanguagePage({
  language,
  allItems,
  totalPhraseCount,
  categoryCount,
}: Props) {
  const langLower = language.name.toLowerCase();

  return (
    <>
      <Head>
        <title>
          {language.name} Travel Phrases | Lang Dojo
        </title>
        <meta
          name="description"
          content={`Learn essential travel ${langLower} phrases and vocabulary. ${totalPhraseCount} items across ${categoryCount} categories. Download ${langLower} Anki flashcard decks for your next trip.`}
        />
        <meta
          name="keywords"
          content={`travel ${langLower} phrases, ${langLower} travel vocabulary, ${langLower} anki deck, ${langLower} flashcards, learn ${langLower} for travel`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader
          breadcrumbs={[
            { label: language.name, href: `/${language.slug}` },
          ]}
        />

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Language Hero */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{language.flag}</div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language.name} Travel Phrases
            </h1>
            <p className="text-gray-600 mt-2">
              {totalPhraseCount} phrases & vocabulary across {categoryCount}{" "}
              categories
            </p>
          </div>

          {/* CTA buttons */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-center">
            <h2 className="font-semibold text-gray-800 mb-1">
              Download all {language.name} phrases
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Get the complete deck with {totalPhraseCount} items for Anki or
              Memozora
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="primary"
                href={`/download?lang=${language.id}`}
              >
                <Download className="w-4 h-4" />
                Download full deck
              </Button>
              <Button
                variant="ghost"
                href={`/phrases?lang=${language.id}&cat=basics`}
                external
              >
                <BookOpen className="w-4 h-4" />
                Browse phrases
              </Button>
            </div>
          </div>

          {/* Full phrase list */}
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
            All phrases & vocabulary ({totalPhraseCount})
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ol className="divide-y divide-gray-100">
              {allItems.map((item, i) => (
                <li key={i} className="flex items-baseline gap-3 px-5 py-3">
                  <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-gray-800">
                      {item.text}
                    </span>
                    {item.pronunciation && (
                      <span className="text-sm text-gray-400 ml-2">
                        {item.pronunciation}
                      </span>
                    )}
                    <span className="text-sm text-gray-500 ml-2">
                      — {item.translation}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* SEO text */}
          <div className="mt-10 text-sm text-gray-500 leading-relaxed">
            <p>
              Prepare for your trip with essential {langLower} travel phrases.
              Our curated collection covers everyday situations from ordering at
              cafes and restaurants to navigating taxis, trains, and buses.
              Download the complete {langLower} Anki deck or Memozora flashcards
              to study offline with spaced repetition.
            </p>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
