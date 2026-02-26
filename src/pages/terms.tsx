import Head from "next/head";
import Link from "next/link";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>{`Terms of Service | ${BRAND_NAME}`}</title>
      </Head>

      <AppShell breadcrumbs={[{ label: "Terms", href: "/terms" }]}>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Last updated: February 22, 2026
          </p>

          <div className="prose-custom">
            <p>
              By accessing or using {BRAND_NAME} (&quot;the Service&quot;), operated
              by FocusLab LLC (&quot;we&quot;, &quot;us&quot;), you agree to be
              bound by these terms. If you do not agree, please do not use the
              Service.
            </p>

            <h2>Use of the Service</h2>
            <p>
              {BRAND_NAME} provides language phrases and vocabulary for personal
              learning and study. You may use the Service and its downloadable
              content freely for personal and educational purposes.
            </p>

            <h2>Commercial use</h2>
            <p>
              You may use {BRAND_NAME} data for commercial purposes provided you
              include attribution to &quot;{BRAND_NAME} by FocusLab LLC&quot; in
              your product or materials.
            </p>

            <h2>Content accuracy</h2>
            <p>
              Content on {BRAND_NAME} is initially generated using AI and reviewed
              by humans incrementally. While we strive for accuracy, we do not
              guarantee that all phrases, translations, or pronunciations are
              error-free. Please refer to our{" "}
              <Link href="/changelog">change log</Link> for the current review
              status.
            </p>

            <h2>Disclaimer of warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, either express or
              implied. We do not warrant that the Service will be uninterrupted,
              error-free, or free of harmful components.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, FocusLab LLC shall not be
              liable for any indirect, incidental, special, or consequential
              damages arising from your use of the Service.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the
              Service after changes constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:support@focuslab.dev">support@focuslab.dev</a>.
            </p>
          </div>
        </div>

      </AppShell>
    </>
  );
}
