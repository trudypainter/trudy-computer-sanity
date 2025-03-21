import { Suspense } from "react";
// Add utility to log on server side
import util from "util";

import Link from "next/link";

import { BioBitsWrapper } from "@/app/components/BioBitsWrapper";
import WeatherHub from "@/app/components/WeatherHub";
import { LandingSections } from "@/app/components/LandingSections";
import { ProjectArchive } from "@/app/components/ProjectArchive";
import Header from "@/app/components/Header";
import { CustomFooter } from "@/app/components/CustomFooter";
import BoidBackground from "@/app/components/BoidBackground";
import { sanityFetch } from "@/sanity/lib/live";
import {
  projectArchiveQuery,
  getUniqueValues,
  allDocumentsQuery,
  allPostsCountQuery,
} from "@/sanity/lib/queries";

// Query to get all projects from landing sections in order
const landingSectionProjectsQuery = `
  *[_type == "landingSection"] | order(order asc) {
    _id,
    "rows": rows[] {
      _key,
      "posts": posts[] {
        _key,
        "projectId": post->_id
      }
    }
  }
`;

export default async function Page() {
  // First, get the absolute count of all posts using the simplest query
  console.log("Fetching total post count with simplest query...");
  const { data: simpleTotalCount } = await sanityFetch({
    query: allPostsCountQuery,
  });
  console.log(
    `Simple query found ${simpleTotalCount?.length || 0} total post documents.`
  );

  if (simpleTotalCount && simpleTotalCount.length > 0) {
    // Log draft vs published counts
    const draftCount = simpleTotalCount.filter(
      (doc: any) => doc.isDraft
    ).length;
    const publishedCount = simpleTotalCount.length - draftCount;

    console.log(`=== SIMPLE COUNT STATS ===`);
    console.log(`Total posts: ${simpleTotalCount.length}`);
    console.log(`Published posts: ${publishedCount}`);
    console.log(`Draft posts: ${draftCount}`);
    console.log(`=========================`);

    // Show IDs of all posts from simple query
    console.log(
      "All post IDs from simple query:",
      simpleTotalCount.map((doc: any) => doc._id)
    );
  }

  // Next, fetch ALL documents with more metadata
  console.log("Fetching ALL post documents with metadata...");
  const { data: allDocs } = await sanityFetch({ query: allDocumentsQuery });
  console.log(
    `Found a total of ${allDocs?.length || 0} post documents in Sanity.`
  );

  // Calculate stats for all posts
  if (allDocs && allDocs.length > 0) {
    const publishedCount = allDocs.filter((doc: any) => doc.isPublished).length;
    const draftCount = allDocs.filter((doc: any) => doc.inDrafts).length;
    const withSlugCount = allDocs.filter((doc: any) => doc.hasSlug).length;
    const withCoverImageCount = allDocs.filter(
      (doc: any) => doc.hasCoverImage
    ).length;
    const withDateCount = allDocs.filter((doc: any) => doc.hasDate).length;

    console.log(`=== DOCUMENT STATS ===`);
    console.log(`Total docs: ${allDocs.length}`);
    console.log(`Published docs: ${publishedCount}`);
    console.log(`Draft docs: ${draftCount}`);
    console.log(`Docs with slug: ${withSlugCount}`);
    console.log(`Docs with cover image: ${withCoverImageCount}`);
    console.log(`Docs with date: ${withDateCount}`);
    console.log(`=====================`);
  }

  // Fetch project archive data
  console.log("Fetching project archive data...");
  const { data } = await sanityFetch({ query: projectArchiveQuery });
  console.log(
    `Fetched ${data?.length || 0} projects from Sanity for the archive.`
  );

  // Check for particular posts that we're looking for
  const specificPostsToCheck: string[] = [
    // If you know specific post IDs that are missing, add them here
    // "1fc11be3-7f24-4e0c-a97b-6f33dfb808fa", // An example post ID
  ];

  if (specificPostsToCheck.length > 0 && simpleTotalCount) {
    console.log("\n=== CHECKING FOR SPECIFIC POSTS ===");
    specificPostsToCheck.forEach((postId) => {
      // Check in the simple total
      const inSimpleCount = simpleTotalCount.some(
        (doc: any) => doc._id === postId
      );
      // Check in the archive data
      const inArchiveData = data
        ? data.some((doc: any) => doc._id === postId)
        : false;

      console.log(`Post ID: ${postId}`);
      console.log(`  Found in simple count: ${inSimpleCount}`);
      console.log(`  Found in archive data: ${inArchiveData}`);

      // If found in simple count but not in archive data, investigate why
      if (inSimpleCount && !inArchiveData) {
        const postDetails = simpleTotalCount.find(
          (doc: any) => doc._id === postId
        );
        console.log(`  Post details: ${JSON.stringify(postDetails)}`);

        // If we also have the all documents data, get more details
        if (allDocs) {
          const moreDetails = allDocs.find((doc: any) => doc._id === postId);
          if (moreDetails) {
            console.log(`  Additional details:`);
            console.log(`    Title: ${moreDetails.title || "No title"}`);
            console.log(`    Has slug: ${moreDetails.hasSlug}`);
            console.log(`    Has cover image: ${moreDetails.hasCoverImage}`);
            console.log(`    Has date: ${moreDetails.hasDate}`);
            console.log(`    Is published: ${moreDetails.isPublished}`);
          }
        }
      }
    });
    console.log("================================\n");
  }

  // Log detailed comparison between all documents and filtered results
  if (allDocs && allDocs.length > 0 && data && data.length > 0) {
    console.log(
      `MISSING POSTS: Comparing all ${allDocs.length} docs with ${data.length} filtered results`
    );

    // Find missing posts
    const allDocIds = allDocs.map((doc: any) => doc._id);
    const filteredIds = data.map((doc: any) => doc._id);
    const missingIds = allDocIds.filter(
      (id: string) => !filteredIds.includes(id)
    );

    console.log(
      `Found ${missingIds.length} missing posts in filtered results.`
    );

    if (missingIds.length > 0) {
      // Get details about missing posts
      const missingDocs = allDocs.filter((doc: any) =>
        missingIds.includes(doc._id)
      );
      console.log(`Details about missing posts:`);
      missingDocs.forEach((doc: any, index: number) => {
        console.log(`[${index + 1}] ID: ${doc._id}`);
        console.log(`    Title: ${doc.title || "No title"}`);
        console.log(`    Has slug: ${doc.hasSlug}`);
        console.log(`    Has cover image: ${doc.hasCoverImage}`);
        console.log(`    Has date: ${doc.hasDate}`);
        console.log(`    Is published: ${doc.isPublished}`);
        console.log(`    Updated at: ${doc._updatedAt}`);
      });
    }
  }

  console.log(
    "Project IDs fetched:",
    data?.map((project: any) => project._id)
  );

  // Log the raw project data for debugging (just the first item)
  if (data && data.length > 0) {
    console.log(
      "Raw project data sample:",
      util.inspect(data[0], { depth: 3, colors: true })
    );
  }

  // Fetch landing section projects
  console.log("Fetching landing section projects...");
  const { data: landingSections } = await sanityFetch({
    query: landingSectionProjectsQuery,
  });
  console.log(`Fetched ${landingSections?.length || 0} landing sections.`);

  // Extract project IDs from landing sections in order
  const landingSectionProjectIds: string[] = [];
  if (landingSections && landingSections.length > 0) {
    landingSections.forEach((section: any) => {
      if (section.rows) {
        section.rows.forEach((row: any) => {
          if (row.posts) {
            row.posts.forEach((post: any) => {
              if (
                post.projectId &&
                !landingSectionProjectIds.includes(post.projectId)
              ) {
                landingSectionProjectIds.push(post.projectId);
              }
            });
          }
        });
      }
    });
  }
  console.log(
    `Extracted ${landingSectionProjectIds.length} project IDs from landing sections.`
  );
  console.log("Landing section project IDs:", landingSectionProjectIds);

  // Check for referenced projects that don't exist in our filtered results
  if (landingSectionProjectIds.length > 0 && data && data.length > 0) {
    const projectIds = data.map((project: any) => project._id);
    const missingReferencedIds = landingSectionProjectIds.filter(
      (id) => !projectIds.includes(id)
    );

    if (missingReferencedIds.length > 0) {
      console.log(
        `WARNING: ${missingReferencedIds.length} projects referenced in landing sections but not in filtered results!`
      );
      console.log("Missing referenced IDs:", missingReferencedIds);
    }
  }

  // Prepare project archive data if it exists
  let projectArchiveProps = null;
  if (data && data.length > 0) {
    const locations = getUniqueValues(data, "location");
    const years = getUniqueValues(data, "year");
    const tags = getUniqueValues(data, "projectTags");

    console.log(`Found ${locations.length} unique locations.`);
    console.log(`Found ${years.length} unique years.`);
    console.log(`Found ${tags.length} unique tags.`);

    projectArchiveProps = {
      projects: data,
      locations,
      years,
      tags,
      landingSectionProjectIds,
    };

    console.log(
      `Passing ${projectArchiveProps.projects.length} projects to ProjectArchive component.`
    );
  } else {
    console.log("WARNING: No project data available for the archive.");
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
