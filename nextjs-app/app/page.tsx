import { Suspense } from "react";
import Link from "next/link";

import { BioBits } from "@/app/components/BioBits";
import WeatherHub from "@/app/components/WeatherHub";
import { LandingSections } from "@/app/components/LandingSections";
import { ProjectArchiveSection } from "@/app/components/ProjectArchiveSection";
import Header from "@/app/components/Header";

export default async function Page() {
  return (
    <>
      {/* section for hero */}
      <section className="fixed z-10 h-[90vh] top-0 left-0 w-full bg-gray-200">
        <div className="container mx-auto px-4 h-[70vh] flex items-center">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <Suspense
              fallback={
                <div className="w-full md:w-1/3 animate-pulse bg-gray-200 h-96" />
              }
            >
              <BioBits />
            </Suspense>

            <div className="w-full md:w-2/3">
              <div className="bg-gray-800 rounded-lg h-full w-full relative">
                <WeatherHub />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section for landing sections + project archive */}
      <div className="relative mt-[70vh] z-20 bg-white border-t border-gray-200 rounded-3xl">
        <Header />
        <div className="container mx-auto px-4">
          <aside className="py-12 sm:py-20">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-100 h-96" />}
            >
              <LandingSections />
            </Suspense>
          </aside>
        </div>
        <div className="container mx-auto px-4">
          <aside className="py-12 sm:py-20">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-100 h-96" />}
            >
              <ProjectArchiveSection />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
