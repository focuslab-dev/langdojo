import Head from "next/head";
import Link from "next/link";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{`About | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Learn about ${BRAND_NAME} — a free language phrase and vocabulary database for travelers and language learners.`}
        />
      </Head>

      <AppShell breadcrumbs={[{ label: "About", href: "/about" }]}>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About {BRAND_NAME}
          </h1>

          <div className="prose-custom">
            <p>
              {BRAND_NAME} is a free, open word and phrase database built for
              travelers and language learners. It covers everyday situations —
              ordering at cafes, taking taxis, checking into hotels — across
              multiple languages.
            </p>

            <p>
              All content can be downloaded as Anki decks or CSV files and
              imported into your favorite flashcard app for spaced repetition
              study.
            </p>

            <h2>How content is created</h2>
            <p>
              Phrases and vocabulary are initially generated with AI and then
              reviewed by humans incrementally. For the current review status of
              each language and category, please check the{" "}
              <Link href="/changelog">change log</Link>.
            </p>

            <h2>Using our data</h2>
            <p>
              Anyone is free to use {BRAND_NAME} data for personal or educational
              purposes. For commercial use, please credit {BRAND_NAME} by FocusLab
              LLC.
            </p>

            <h2>Who we are</h2>
            <p>
              {BRAND_NAME} is built and maintained by{" "}
              <strong>FocusLab LLC</strong>.
            </p>
            <p>
              Questions or feedback? Reach us at{" "}
              <a href="mailto:support@focuslab.dev">support@focuslab.dev</a>.
            </p>
          </div>
        </div>

      </AppShell>
    </>
  );
}
