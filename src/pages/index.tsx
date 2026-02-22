import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { languages, categories } from "@/utils/languages";
import { getDownloadItemsAll } from "@/utils/getPhraseData";
import { LanguageId } from "@/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface LanguageCard {
  id: string;
  name: string;
  slug: string;
  flag: string;
  phraseCount: number;
}

interface Props {
  languageCards: LanguageCard[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const languageCards = languages.map((lang) => ({
    id: lang.id,
    name: lang.name,
    slug: lang.slug,
    flag: lang.flag,
    phraseCount: getDownloadItemsAll(lang.id as LanguageId).length,
  }));

  return { props: { languageCards } };
};

export default function LandingPage({ languageCards }: Props) {
  return (
    <>
      <Head>
        <title>Lang Dojo — Free Language Phrases & Anki Flashcards</title>
        <meta
          name="description"
          content="Learn essential phrases and vocabulary in Japanese, Mandarin, Thai, Korean, French, and Spanish. Download Anki flashcards and study with spaced repetition."
        />
        <meta
          name="keywords"
          content="language phrases, language flashcards, anki deck, vocabulary, japanese phrases, mandarin phrases, thai phrases, korean phrases, french phrases, spanish phrases"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader showTagline />

        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <img
              src="/img/hero-image-sm.png"
              alt="Lang Dojo mascot"
              className="w-32 h-32 mx-auto mb-4 rounded-2xl object-cover"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Lang Dojo</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              A word and phrase database for language learners. Download and
              import into Anki, Quizlet, Memozora, and other flashcard tools.
            </p>
          </div>

          {/* Travel Phrases section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Essential Travel Phrases & Words
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
                href={`/${lang.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="text-5xl mb-3">{lang.flag}</div>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {lang.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {lang.phraseCount} items
                </p>
              </Link>
            ))}
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
