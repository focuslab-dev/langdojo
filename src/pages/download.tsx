import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { LanguageId, CategoryId } from "@/types";
import { getCategoryById, getLanguageById } from "@/utils/languages";
import { getCategoryData } from "@/utils/getPhraseData";
import { generateCSV } from "@/utils/generateCSV";
import { generateAnkiDeck } from "@/utils/generateAnkiDeck";

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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to phrases
          </Link>
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to phrases
          </Link>
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
        <title>Download {category.name} - {language.name}</title>
      </Head>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to phrases
        </Link>

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

        {/* Anki Download Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">Anki Deck</h2>
              <p className="text-sm text-gray-500 mt-1">
                Import into Anki for spaced repetition study. Cards show vocabulary
                on the front, translation and pronunciation on the back.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadAnki}
            disabled={ankiLoading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-colors"
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
          </button>
        </div>

        {/* CSV Download Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">CSV File</h2>
              <p className="text-sm text-gray-500 mt-1">
                Import into{" "}
                <a href="https://quizlet.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Quizlet</a>,{" "}
                <a href="https://memozora.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">Memozora</a>,
                or open in any spreadsheet app.
                Columns: Vocabulary, Translation, Pronunciation.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            Download .csv
          </button>
        </div>
      </div>
    </div>
  );
}
