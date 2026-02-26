import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { IconDownload, IconBookOpen } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { languages, categories, packages } from "@/utils/languages";
import { getDownloadItemsAll } from "@/utils/getPhraseData";
import { getChangelogEntries, getReviewer } from "@/utils/changelog";
import { Language, LanguageId, Package } from "@/types";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

interface PhraseItem {
  text: string;
  pronunciation?: string | null;
  translation: string;
}

interface Reviewer {
  name: string;
  url?: string;
}

interface Props {
  pkg: Package;
  language: Language;
  allItems: PhraseItem[];
  totalPhraseCount: number;
  categoryCount: number;
  reviewer: Reviewer | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = packages.flatMap((pkg) =>
    languages.map((lang) => ({
      params: { package: pkg.slug, lang: lang.slug },
    })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pkgSlug = params?.package as string;
  const slug = params?.lang as string;
  const pkg = packages.find((p) => p.slug === pkgSlug);
  const language = languages.find((l) => l.slug === slug);
  if (!pkg || !language) return { notFound: true };

  const categoryCount = categories.filter(
    (cat) => cat.id !== "favorites",
  ).length;

  const allItems = getDownloadItemsAll(language.id as LanguageId).map((p) => ({
    text: p.text,
    pronunciation: p.pronunciation ?? null,
    translation: p.translation,
  }));

  const entries = getChangelogEntries(pkg.id, language.id);
  const reviewer = getReviewer(entries);

  return {
    props: {
      pkg,
      language,
      allItems,
      totalPhraseCount: allItems.length,
      categoryCount,
      reviewer: reviewer ?? null,
    },
  };
};

export default function LanguagePage({
  pkg,
  language,
  allItems,
  totalPhraseCount,
  categoryCount,
  reviewer,
}: Props) {
  const langLower = language.name.toLowerCase();
  const basePath = `/${pkg.slug}/${language.slug}`;

  return (
    <>
      <Head>
        <title>{`${language.name} Travel Phrases | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Learn essential travel ${langLower} phrases and vocabulary. ${totalPhraseCount} items across ${categoryCount} categories. Download ${langLower} Anki flashcard decks for your next trip.`}
        />
        <meta
          name="keywords"
          content={`travel ${langLower} phrases, ${langLower} travel vocabulary, ${langLower} anki deck, ${langLower} flashcards, learn ${langLower} for travel`}
        />
      </Head>

      <AppShell
        breadcrumbs={[
          { label: pkg.name, href: `/${pkg.slug}` },
          { label: language.name, href: basePath },
        ]}
      >

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Language Hero */}
          <div className="text-center mb-4">
            <div className="text-6xl mb-3">{language.flag}</div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language.name} {pkg.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {totalPhraseCount} phrases & vocabulary across {categoryCount}{" "}
              categories
            </p>
          </div>

          {/* Review status */}
          <div className="mb-8">
            <ReviewStatus
              reviewer={reviewer}
              logUrl={`/${pkg.slug}/${language.slug}/changelog`}
            />
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
                href={`/${pkg.slug}/${language.slug}/download`}
              >
                <IconDownload className="w-4 h-4" />
                Download full deck
              </Button>
              <Button
                variant="ghost"
                href={`/phrases?lang=${language.id}&cat=basics`}
                external
              >
                <IconBookOpen className="w-4 h-4" />
                Browse phrases
              </Button>
            </div>
          </div>

          {/* Full phrase list */}
          <div className="flex items-center mb-4 justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              All phrases & vocabulary ({totalPhraseCount})
            </h2>
          </div>

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

      </AppShell>
    </>
  );
}

function ReviewStatus({
  reviewer,
  logUrl,
}: {
  reviewer: Reviewer | null;
  logUrl: string;
}) {
  return (
    <p className="text-center text-sm text-gray-500">
      {reviewer ? (
        <>
          The content has been{" "}
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Reviewed
          </span>{" "}
          by{" "}
          {reviewer.url ? (
            <a
              href={reviewer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 underline decoration-gray-300 hover:text-gray-900 hover:decoration-gray-500"
            >
              {reviewer.name}
            </a>
          ) : (
            <span className="font-medium text-gray-700">{reviewer.name}</span>
          )}
        </>
      ) : (
        "The content hasn\u2019t been reviewed yet"
      )}

      <span className="text-sm text-gray-500 ml-2">
        (
        <Link
          href={logUrl}
          className="inline-block text-sm text-gray-400 hover:text-gray-600"
        >
          See all changes
        </Link>
        )
      </span>
    </p>
  );
}
