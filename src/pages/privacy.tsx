import Head from "next/head";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_NAME } from "@/constants/brand";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>{`Privacy Policy | ${BRAND_NAME}`}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader breadcrumbs={[{ label: "Privacy", href: "/privacy" }]} />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Last updated: February 22, 2026
          </p>

          <div className="prose-custom">
            <p>
              This policy describes how {BRAND_NAME}, operated by FocusLab LLC
              (&quot;we&quot;, &quot;us&quot;), handles your information.
            </p>

            <h2>Information we collect</h2>

            <h3>Local storage</h3>
            <p>
              {BRAND_NAME} stores your preferences (selected language, category) and
              favorited phrases in your browser&apos;s local storage. This data
              never leaves your device and is not sent to our servers.
            </p>

            <h3>Analytics</h3>
            <p>
              We use Google Analytics to collect anonymous usage data such as
              page views, device type, and general location. This helps us
              understand how the Service is used and improve it. Google Analytics
              may set cookies on your browser. You can opt out by using a browser
              extension such as{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out
              </a>
              .
            </p>

            <h2>Information we do not collect</h2>
            <p>
              We do not require you to create an account. We do not collect your
              name, email address, or any other personal information. We do not
              sell or share any data with third parties beyond what is described
              above.
            </p>

            <h2>Cookies</h2>
            <p>
              The only cookies used on {BRAND_NAME} are those set by Google
              Analytics for anonymous usage tracking. No advertising or
              third-party tracking cookies are used.
            </p>

            <h2>Third-party services</h2>
            <p>
              The Service may link to external sites (e.g. Memozora, Anki). We
              are not responsible for the privacy practices of third-party
              websites.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Changes will be
              reflected on this page with an updated date.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="mailto:support@focuslab.dev">support@focuslab.dev</a>.
            </p>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
