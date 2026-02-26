import { useState, useCallback } from "react";
import Head from "next/head";
import { IconCheck } from "@/components/ui/Icons";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

const EMAIL = "support@focuslab.dev";

export default function FeedbackPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <>
      <Head>
        <title>{`Feedback | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Send feedback on ${BRAND_NAME} content — corrections, suggestions, and improvements.`}
        />
      </Head>

      <AppShell breadcrumbs={[{ label: "Feedback", href: "/feedback" }]}>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Feedback</h1>

          <div className="prose-custom">
            <p>
              Found an error, have a suggestion, or want to help improve our
              content? We'd love to hear from you.
            </p>

            <p>
              When reporting an issue, it helps to include the language,
              category, and the specific phrase or word so we can locate it
              quickly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Send email to {EMAIL}
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
            >
              {copied ? (
                <>
                  <IconCheck className="w-4 h-4 " />
                  <span className="">Copied!</span>
                </>
              ) : (
                "Copy email address"
              )}
            </button>
          </div>
        </div>
      </AppShell>
    </>
  );
}
