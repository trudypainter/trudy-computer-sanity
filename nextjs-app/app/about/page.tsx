import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import type { AboutPage, BioSection } from "@/sanity/types/about";
import ObjectCoverSanityImage from "@/app/components/sanity/ObjectCoverSanityImage";
import FindMe from "@/app/components/FindMe";
import Header from "@/app/components/Header";

export default async function AboutPage() {
  const about = await client.fetch<AboutPage>(aboutPageQuery);

  if (!about) {
    return <div>No about page data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pt-32 sm:py-32 max-w-content line-height-tight-custom">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Profile Picture */}
          <div className="w-1/2 md:w-1/3">
            <div className="md:sticky md:top-24 rounded-t-3xl overflow-hidden">
              <div className="relative aspect-[3/4] w-full">
                <ObjectCoverSanityImage
                  value={{
                    asset: about.profileImage.asset,
                    alt: about.profileImage.alt ?? undefined,
                  }}
                />
              </div>
              <p className="pt-1 text-sm text-gray-500 tracking-tight">
                Photo by{" "}
                <Link
                  href={about.photographerUrl}
                  target="_blank"
                  className="text-gray-500 underline decoration-1 hover:decoration-2 tracking-tight"
                >
                  {about.photographerName}
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Bio */}
          <div className="w-full md:w-2/3">
            <div className="space-y-2 text-gray-600 tracking-tight prose prose-a:font-normal prose-a:text-gray-600 prose-a:underline prose-a:decoration-1 hover:prose-a:decoration-2 prose-p:tracking-tight prose-headings:tracking-tight leading-snug">
              <PortableText value={about.fullBio} />

              <div className="h-2"></div>
              <hr />
              {about.bioSections.map((section: BioSection) => (
                <div key={section.title} className="space-y-1">
                  <h2 className="font-mono font-light text-sm text-gray-500 mt-12 tracking-tight mb-0">
                    {section.title.toUpperCase()}
                  </h2>
                  <PortableText value={section.content} />
                </div>
              ))}
            </div>

            <div
              style={{
                height: "350px",
                maxHeight: "100vw",
                maxWidth: "410px",
                width: "100%",
                position: "relative",
              }}
              className="mt-16"
            >
              <FindMe />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
