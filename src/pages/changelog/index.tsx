import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { languages, packages } from "@/utils/languages";
import { getChangelogEntries } from "@/utils/changelog";
import { Package, Language, ChangelogEntry } from "@/types";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";
import { ChangelogEntryCard } from "@/components/pages/changelog/ChangelogEntryCard";

interface LanguageChangelog {
  language: Language;
  entries: ChangelogEntry[];
  changelogUrl: string;
}

interface PackageChangelog {
  pkg: Package;
  languages: LanguageChangelog[];
}

interface Props {
  packageChangelogs: PackageChangelog[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const packageChangelogs: PackageChangelog[] = packages.map((pkg) => ({
    pkg,
    languages: languages.map((lang) => ({
      language: lang,
      entries: getChangelogEntries(pkg.id, lang.id),
      changelogUrl: `/${pkg.slug}/${lang.slug}/changelog`,
    })),
  }));

  return { props: { packageChangelogs } };
};

export default function ChangelogIndexPage({ packageChangelogs }: Props) {
  return (
    <>
      <Head>
        <title>{`Change Log | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Data review status and change log for ${BRAND_NAME} phrase and vocabulary content.`}
        />
      </Head>

      <AppShell breadcrumbs={[{ label: "Change Log", href: "/changelog" }]}>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Log</h1>
          <p className="text-sm text-gray-500 mb-8">
            Status of data review for each language. Content is initially
            generated with AI and then reviewed by human contributors.
          </p>

          <div className="space-y-10">
            {packageChangelogs.map(({ pkg, languages: langChangelogs }) => (
              <section key={pkg.id}>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {pkg.name}
                </h2>

                <div className="space-y-6">
                  {langChangelogs.map(({ language, entries, changelogUrl }) => (
                    <div
                      key={language.id}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{language.flag}</span>
                          <span className="font-medium text-gray-900">
                            {language.name}
                          </span>
                        </div>
                        <Link
                          href={changelogUrl}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          View all →
                        </Link>
                      </div>

                      {entries.length > 0 ? (
                        <ul className="divide-y divide-gray-100 [&>li]:px-4 [&>li]:py-3">
                          {entries.slice(0, 3).map((entry, i) => (
                            <ChangelogEntryCard key={i} entry={entry} />
                          ))}
                        </ul>
                      ) : (
                        <p className="px-4 py-3 text-sm text-gray-400">
                          No entries yet
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  );
}
