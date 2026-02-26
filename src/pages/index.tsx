import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { languages, categories, packages } from "@/utils/languages";
import { getDownloadItemsAll } from "@/utils/getPhraseData";
import { getChangelogEntries, getReviewer } from "@/utils/changelog";
import { LanguageId } from "@/types";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

interface LanguageCard {
  id: string;
  name: string;
  slug: string;
  flag: string;
  phraseCount: number;
  isReviewed: boolean;
}

interface Props {
  languageCards: LanguageCard[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pkg = packages[0];
  const languageCards = languages.map((lang) => {
    const entries = getChangelogEntries(pkg.id, lang.id);
    const reviewer = getReviewer(entries);
    return {
      id: lang.id,
      name: lang.name,
      slug: lang.slug,
      flag: lang.flag,
      phraseCount: getDownloadItemsAll(lang.id as LanguageId).length,
      isReviewed: reviewer !== null,
    };
  });

  return { props: { languageCards } };
};

export default function LandingPage({ languageCards }: Props) {
  return (
    <>
      <Head>
        <title>{BRAND_NAME} — Free Language Phrases & Anki Flashcards</title>
        <meta
          name="description"
          content="Learn essential phrases and vocabulary in Japanese, Mandarin, Thai, Korean, French, and Spanish. Download Anki flashcards and study with spaced repetition."
        />
        <meta
          name="keywords"
          content="language phrases, language flashcards, anki deck, vocabulary, japanese phrases, mandarin phrases, thai phrases, korean phrases, french phrases, spanish phrases"
        />
      </Head>

      <AppShell showTagline>

        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <img
              src="/img/hero-image-sm2.webp"
              alt={`${BRAND_NAME} mascot`}
              className="w-32 h-32 mx-auto mb-4 rounded-2xl object-cover"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Master Travel Phrases & Words
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              500+ travel phrases and words for 6 different languages. Download
              them as Anki decks or quickly look them up using the phrasebook.
            </p>
          </div>

          {/* Travel Phrases section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Anki Decks & CSV Files
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Common phrases and vocabulary for everyday travel situations —
              restaurants, hotels, transportation, and more.
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {languageCards.map((lang) => (
              <Link
                key={lang.id}
                href={`/travel-essentials/${lang.slug}`}
                className="relative group bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="text-5xl mb-3">{lang.flag}</div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {lang.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {lang.phraseCount} items
                </p>
                {lang.isReviewed && (
                  <span className="absolute top-[4px] right-[11px] inline-flex items-center rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 mt-2">
                    Reviewed
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Phrasebook section */}
          <div className="mt-12 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Online Phrasebook
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse and search all phrases directly in your browser — no
              download needed.
            </p>
          </div>

          <a
            href="/phrases"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all overflow-hidden"
          >
            <img
              src="/img/phrasebook5.webp"
              alt="Phrasebook screenshot"
              className="w-full h-[160px] sm:w-[160px] sm:h-[160px] object-cover shrink-0"
            />
            <div className="flex items-center justify-between p-6 flex-1 min-w-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Open Phrasebook
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Open the page and add it to your homescreen for quick access.
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors text-xl">
                ↗
              </span>
            </div>
          </a>
        </div>

      </AppShell>
    </>
  );
}
