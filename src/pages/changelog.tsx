import fs from "fs";
import path from "path";
import Head from "next/head";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface Props {
  content: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = path.join(process.cwd(), "data", "CHANGELOG.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return { props: { content } };
};

export default function ChangelogPage({ content }: Props) {
  return (
    <>
      <Head>
        <title>Change Log | Lang Dojo</title>
        <meta
          name="description"
          content="Data review status and change log for Lang Dojo phrase and vocabulary content."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader breadcrumbs={[{ label: "Change Log", href: "/changelog" }]} />

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="prose-custom changelog-prose">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-8 border-gray-200" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
