import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Download,
  Loader2,
  RefreshCw,
  BookOpen,
  Volume2,
  Keyboard,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageId, Phrase } from "@/types";
import { categories, getLanguageById } from "@/utils/languages";
import {
  getDownloadItemsForCategories,
  getDownloadItemsForFavorites,
} from "@/utils/getPhraseData";
import { generateTSV } from "@/utils/generateCSV";
import { generateAnkiDeck } from "@/utils/generateAnkiDeck";
import { Card } from "@/components/ui/Card";
import { FavoriteItem } from "@/hooks/useFavorites";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const DATA_CATEGORIES = categories.filter((c) => c.id !== "favorites");
const ALL_CATEGORY_IDS = DATA_CATEGORIES.map((c) => c.id);

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
  const [favoriteItems, setFavoriteItems] = useState<Phrase[] | null>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(ALL_CATEGORY_IDS);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languageId = lang as LanguageId;
  const isFavorites = cat === "favorites";
  const language = languageId ? getLanguageById(languageId) : undefined;

  useEffect(() => {
    if (!isFavorites || !languageId) return;
    try {
      const stored = localStorage.getItem("travel-phrases-favorites");
      const parsed: FavoriteItem[] = stored ? JSON.parse(stored) : [];
      setFavoriteItems(getDownloadItemsForFavorites(parsed, languageId));
    } catch {
      setFavoriteItems([]);
    }
  }, [isFavorites, languageId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Invalid params
  if (router.isReady && !isFavorites && !language) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Download | Lang Dojo</title>
        </Head>
        <SiteHeader />
        <div className="flex items-center justify-center p-4 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
            <div className="text-4xl mb-4">🤔</div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Invalid parameters
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              The language you specified doesn&apos;t exist.
            </p>
            <Button variant="link-blue" href="/">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!router.isReady || !language || (isFavorites && favoriteItems === null)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const isAllSelected = selectedCategories.length === ALL_CATEGORY_IDS.length;
  const items = isFavorites
    ? favoriteItems!
    : getDownloadItemsForCategories(languageId, selectedCategories);

  const displayName = isFavorites
    ? "Favorites"
    : isAllSelected
      ? "All Categories"
      : `${selectedCategories.length} ${selectedCategories.length === 1 ? "Category" : "Categories"}`;
  const displayEmoji = isFavorites ? "❤️" : "📚";
  const displayColor = isFavorites ? "#f87171" : "#6366F1";
  const deckName = isFavorites
    ? `${language.name} - Favorites`
    : isAllSelected
      ? `${language.name} - All Categories`
      : `${language.name} - ${selectedCategories.length} categories`;
  const fileBase = isFavorites
    ? `${languageId}-favorites`
    : isAllSelected
      ? `${languageId}-all`
      : `${languageId}-${selectedCategories.length}cat`;
  const breadcrumbs = isFavorites
    ? [{ label: "Download", href: "#" }]
    : [
        { label: language.name, href: `/${language.slug}` },
        { label: "Download", href: "#" },
      ];

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId],
    );
  };

  const toggleAll = () => {
    setSelectedCategories(isAllSelected ? [] : ALL_CATEGORY_IDS);
  };

  const handleDownloadCSV = () => {
    const blob = generateTSV(items);
    triggerDownload(blob, `${fileBase}.tsv`);
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
          Download {displayName} — {language.name} | Lang Dojo
        </title>
      </Head>

      <SiteHeader breadcrumbs={breadcrumbs} />

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-5xl mb-4"
            style={{ backgroundColor: displayColor + "20" }}
          >
            {displayEmoji}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {language.flag} {language.name} &middot; {items.length} items
          </p>
        </div>

        {/* Category multi-select dropdown (not shown for favorites) */}
        {!isFavorites && (
          <div className="mb-6" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
              >
                <span>
                  {isAllSelected
                    ? "All categories selected"
                    : selectedCategories.length === 0
                      ? "No categories selected"
                      : `${selectedCategories.length} of ${ALL_CATEGORY_IDS.length} categories`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {/* Select/Deselect All */}
                  <button
                    onClick={toggleAll}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 border-b border-gray-100 font-medium text-gray-700"
                  >
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isAllSelected
                          ? "bg-indigo-500 border-indigo-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isAllSelected && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </span>
                    {isAllSelected ? "Deselect all" : "Select all"}
                  </button>

                  {/* Category list */}
                  {DATA_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50"
                      >
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "bg-indigo-500 border-indigo-500"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </span>
                        <span>{cat.emoji}</span>
                        <span className="text-gray-700">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

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
            disabled={ankiLoading || items.length === 0}
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
            disabled={items.length === 0}
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
                Anki alternative for language learners
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

        <SiteFooter />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-[1px] w-full bg-[#ebedf0] my-6" />;
}
