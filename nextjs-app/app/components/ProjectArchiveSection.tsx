import { sanityFetch } from "@/sanity/lib/live";
import { projectArchiveQuery, getUniqueValues } from "@/sanity/lib/queries";
import { ProjectArchive } from "./ProjectArchive";

export async function ProjectArchiveSection() {
  const { data } = await sanityFetch({ query: projectArchiveQuery });

  if (!data || data.length === 0) {
    return null;
  }

  // Get unique values for filters
  const locations = getUniqueValues(data, "location");
  const years = getUniqueValues(data, "year");
  const tags = getUniqueValues(data, "projectTags");

  return (
    <ProjectArchive
      projects={data}
      locations={locations}
      years={years}
      tags={tags}
    />
  );
}
