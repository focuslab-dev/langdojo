import Head from "next/head";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_NAME } from "@/constants/brand";
import { ReviewWizard } from "@/components/review/ReviewWizard";

export default function ReviewPage() {
  return (
    <>
      <Head>
        <title>{`Review Phrases | ${BRAND_NAME}`}</title>
        <meta
          name="description"
          content={`Help improve ${BRAND_NAME} by reviewing travel phrases as a native speaker.`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader breadcrumbs={[{ label: "Review", href: "/review" }]} />
        <ReviewWizard />
        <SiteFooter />
      </div>
    </>
  );
}
