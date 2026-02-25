import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { languages, categories, packages } from "@/utils/languages";
import { getDownloadItemsAll } from "@/utils/getPhraseData";
import { Package, LanguageId } from "@/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_NAME } from "@/constants/brand";

interface LanguageCard {
  id: string;
  name: string;
  slug: string;
  flag: string;
  phraseCount: number;
}

interface Props {
  pkg: Package;
  languageCards: LanguageCard[];
  categoryCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = packages.map((pkg) => ({
    params: { package: pkg.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pkgSlug = params?.package as string;
  const pkg = packages.find((p) => p.slug === pkgSlug);
  if (!pkg) return { notFound: true };

  const categoryCount = categories.filter(
    (cat) => cat.id !== "favorites",
  ).length;

  const languageCards = languages.map((lang) => ({
    id: lang.id,
    name: lang.name,
    slug: lang.slug,
    flag: lang.flag,
    phraseCount: getDownloadItemsAll(lang.id as LanguageId).length,
  }));

  return { props: { pkg, languageCards, categoryCount } };
};

export default function PackagePage({
  pkg,
  languageCards,
  categoryCount,
}: Props) {
  return (
    <>
      <Head>
        <title>{`${pkg.name} | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`${pkg.name} — phrases and vocabulary across ${languageCards.length} languages and ${categoryCount} categories. Download Anki flashcards and study with spaced repetition.`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader breadcrumbs={[{ label: pkg.name, href: `/${pkg.slug}` }]} />

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {pkg.name}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Common phrases and vocabulary for everyday travel situations —
              restaurants, hotels, transportation, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {languageCards.map((lang) => (
              <Link
                key={lang.id}
                href={`/${pkg.slug}/${lang.slug}`}
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
