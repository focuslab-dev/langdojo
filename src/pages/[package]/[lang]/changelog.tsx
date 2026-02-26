import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { languages, packages } from "@/utils/languages";
import { getChangelogEntries } from "@/utils/changelog";
import { Language, Package, ChangelogEntry } from "@/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_NAME } from "@/constants/brand";
import { ChangelogEntryCard } from "@/components/pages/changelog/ChangelogEntryCard";

interface Props {
  pkg: Package;
  language: Language;
  entries: ChangelogEntry[];
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

  const entries = getChangelogEntries(pkg.id, language.id);

  return { props: { pkg, language, entries } };
};

export default function LanguageChangelogPage({
  pkg,
  language,
  entries,
}: Props) {
  const basePath = `/${pkg.slug}/${language.slug}`;

  const grouped = Object.entries(
    entries.reduce<Record<string, ChangelogEntry[]>>((acc, entry) => {
      (acc[entry.date] ??= []).push(entry);
      return acc;
    }, {}),
  );

  return (
    <>
      <Head>
        <title>{`${language.name} Change Log | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Data review status and change log for ${language.name} phrase and vocabulary content.`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader
          breadcrumbs={[
            { label: pkg.name, href: `/${pkg.slug}` },
            { label: language.name, href: basePath },
            { label: "Change Log", href: `${basePath}/changelog` },
          ]}
        />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {language.flag} {language.name} Change Log
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Status of data review. Content is initially generated with AI and
            then reviewed by human contributors.{" "}
            <Link
              href="/review"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Submit review →
            </Link>
          </p>

          <div className="space-y-8 border-t border-gray-150 pt-6">
            {grouped.map(([date, items]) => (
              <section key={date}>
                <h2 className="text-sm font-semibold text-gray-500 mb-3">
                  {date}
                </h2>
                <ul className="space-y-3">
                  {items.map((entry, i) => (
                    <ChangelogEntryCard key={i} entry={entry} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
