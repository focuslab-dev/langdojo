import Head from "next/head";
import { AppShell } from "@/components/global/AppShell";
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

      <AppShell breadcrumbs={[{ label: "Review", href: "/review" }]}>
        <ReviewWizard />
      </AppShell>
    </>
  );
}
