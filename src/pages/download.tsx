import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Download,
  ArrowLeft,
  Loader2,
  RefreshCw,
  BookOpen,
  Volume2,
  Keyboard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageId, CategoryId } from "@/types";
import { getCategoryById, getLanguageById } from "@/utils/languages";
import { getCategoryData } from "@/utils/getPhraseData";
import { generateCSV } from "@/utils/generateCSV";
import { generateAnkiDeck } from "@/utils/generateAnkiDeck";
import { Card } from "@/components/ui/Card";
import { div } from "framer-motion/client";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DownloadPage() {
  const router = useRouter();
  const { lang, cat } = router.query;
  const [ankiLoading, setAnkiLoading] = useState(false);

  const languageId = lang as LanguageId;
  const categoryId = cat as CategoryId;

  const language = languageId ? getLanguageById(languageId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  // Handle favorites
  if (categoryId === "favorites") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Head>
          <title>Download - Travel Phrases</title>
        </Head>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">❤️</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Favorites can&apos;t be exported
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Select a specific category to download its phrases and words.
          </p>
          <Button variant="link-blue" href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to phrases
          </Button>
        </div>
      </div>
    );
  }

  // Invalid params
  if (router.isReady && (!language || !category)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Head>
          <title>Download - Travel Phrases</title>
        </Head>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Invalid parameters
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            The language or category you specified doesn&apos;t exist.
          </p>
          <Button variant="link-blue" href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to phrases
          </Button>
        </div>
      </div>
    );
  }

  // Loading state before router is ready
  if (!router.isReady || !language || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const { phrases, words } = getCategoryData(languageId, categoryId);
  const items = [...words, ...phrases];
  const deckName = `${language.name} - ${category.name}`;
  const fileBase = `${languageId}-${categoryId}`;

  const handleDownloadCSV = () => {
    const blob = generateCSV(items);
    triggerDownload(blob, `${fileBase}.csv`);
  };

  const handleDownloadAnki = async () => {
    setAnkiLoading(true);
    try {
      const blob = await generateAnkiDeck(items, deckName);
      triggerDownload(blob, `${fileBase}.apkg`);
    } finally {
      setAnkiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>
          Download {category.name} - {language.name}
        </title>
      </Head>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Back link */}
        <Button variant="link-gray" href="/" className="mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to phrases
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-5xl mb-4"
            style={{ backgroundColor: category.color + "20" }}
          >
            {category.emoji}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{category.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {language.flag} {language.name} &middot; {items.length} items
          </p>
        </div>

        <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
          Download options
        </h2>

        {/* Anki Download Card */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">Anki Deck</h2>
              <p className="text-sm text-gray-500 mt-1">
                Import into Anki for spaced repetition study. Cards show
                vocabulary on the front, translation and pronunciation on the
                back.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={handleDownloadAnki}
            disabled={ankiLoading}
            className="mt-4"
          >
            {ankiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download .apkg
              </>
            )}
          </Button>

          <Divider />

          {/* Memozora */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">Memozora Deck</h2>
              <p className="text-sm text-gray-500 mt-1">
                Import into{" "}
                <a
                  href="https://memozora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Memozora
                </a>{" "}
                for spaced repetition study along with its enhanced language
                learning features. Columns: Vocabulary, Translation,
                Pronunciation.
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            fullWidth
            onClick={handleDownloadCSV}
            className="mt-4"
          >
            <Download className="w-4 h-4" />
            Download .csv
          </Button>
        </Card>

        {/* Sponsored */}
        <div className="mt-8 text-center text-xs text-[#b9c1c8] flex items-center justify-stretch gap-4">
          <div className="h-[1px] w-full bg-[#ebedf0]" />
          <span className="shrink-0">We are sponsored by</span>
          <div className="h-[1px] w-full bg-[#ebedf0]" />
        </div>

        {/* Sponsored by Memozora */}
        <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-500 mb-4">
            Memozora.com
          </p>
          <a
            href="https://memozora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <img
              src="/img/memozora.png"
              alt="Memozora"
              className="w-14 h-14 rounded-2xl shadow-sm flex-shrink-0"
            />

            <div>
              <p className="text-lg font-bold leading-snug text-gray-900 group-hover:text-teal-700 transition-colors">
                Anki alternative for serious language learners
              </p>
            </div>
          </a>
          <ul className="mt-4 space-y-3">
            {[
              {
                Icon: RefreshCw,
                title: "Flexible spaced repetition",
                description:
                  "Review words at the right time, with different quiz formats",
              },
              {
                Icon: BookOpen,
                title: "Embedded dictionaries",
                description: "Look up words without leaving the app",
              },
              {
                Icon: Volume2,
                title: "Human-level text-to-speech",
                description:
                  "Hear natural pronunciations for any word or phrase",
              },
              {
                Icon: Keyboard,
                title: "Typing quiz",
                description: "Reinforce vocabulary by actively recalling it",
              },
            ].map(({ Icon, title, description }) => (
              <li key={title} className="flex items-start gap-[16px] text-sm">
                <span className="mt-[2px]">
                  <Icon className="w-[16px] h-[16px] text-teal-500 mt-0.5 flex-shrink-0" />
                </span>
                <div>
                  <span className="font-semibold text-gray-800">{title}</span>
                  <p className="text-gray-500 mt-0.5">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="teal"
            fullWidth
            href="https://memozora.com"
            external
            className="mt-5"
          >
            Try Memozora free →
          </Button>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-[1px] w-full bg-[#ebedf0] my-6" />;
}
