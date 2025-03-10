import { Suspense } from "react";
import Link from "next/link";

import { BioBitsWrapper } from "@/app/components/BioBitsWrapper";
import WeatherHub from "@/app/components/WeatherHub";
import { LandingSections } from "@/app/components/LandingSections";
import { ProjectArchive } from "@/app/components/ProjectArchive";
import Header from "@/app/components/Header";
import { CustomFooter } from "@/app/components/CustomFooter";
import BoidBackground from "@/app/components/BoidBackground";
import { sanityFetch } from "@/sanity/lib/live";
import { projectArchiveQuery, getUniqueValues } from "@/sanity/lib/queries";

export default async function Page() {
  // Fetch project archive data
  const { data } = await sanityFetch({ query: projectArchiveQuery });

  // Prepare project archive data if it exists
  let projectArchiveProps = null;
  if (data && data.length > 0) {
    const locations = getUniqueValues(data, "location");
    const years = getUniqueValues(data, "year");
    const tags = getUniqueValues(data, "projectTags");

    projectArchiveProps = {
      projects: data,
      locations,
      years,
      tags,
    };
  }

  return (
    <>
      {/* section for hero */}
      <section className="fixed z-10 h-[100vh] top-0 left-0 w-full bg-gray-500">
        {/* Boid Background */}
        <BoidBackground />

        <div className="container relative z-20 mx-auto px-4 h-[70vh] flex items-center max-w-content">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <Suspense
              fallback={
                <div className="w-full md:w-1/3 bg-gray-400/50 animate-pulse h-96" />
              }
            >
              <div className="w-full bg-transparent p-0 rounded-lg">
                <BioBitsWrapper />
              </div>
            </Suspense>

            {/* <div className="w-full md:w-2/3">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg h-full w-full relative border border-blue-700/30">
                <WeatherHub />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* section for landing sections + project archive */}
      <div className="relative mt-[70vh] z-20 pt-24 bg-white border-t border-gray-200 rounded-3xl">
        <Header />
        <div className="container mx-auto px-4 my-12 hidden md:block max-w-content">
          <Suspense
            fallback={<div className="animate-pulse bg-gray-100 h-96" />}
          >
            <LandingSections />
          </Suspense>
        </div>

        <div className="container mx-auto px-4 pb-24 max-w-content">
          <Suspense
            fallback={<div className="animate-pulse bg-gray-100 h-96" />}
          >
            {projectArchiveProps && <ProjectArchive {...projectArchiveProps} />}
          </Suspense>
        </div>
      </div>

      {/* Footer section */}
      <div className="relative z-20 pb-0">
        <CustomFooter />
      </div>
    </>
  );
}
