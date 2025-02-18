"use client";

import { useState } from "react";
import { ArchivePost } from "./ArchivePost";
import { FilterMenu } from "./FilterMenu";

type Project = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  date: string;
  coverImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: any;
    crop?: any;
    alt: string | null;
    _type: "image";
  };
  location: string | null;
  year: string | null;
  projectTags:
    | {
        _id: string;
        name: string;
        slug: string;
      }[]
    | null;
};

type ProjectArchiveProps = {
  projects: Project[];
  locations: string[];
  years: string[];
  tags: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
};

export function ProjectArchive({
  projects,
  locations,
  years,
  tags,
}: ProjectArchiveProps) {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter projects based on selected filters
  const filteredProjects = projects.filter((project) => {
    // If no filters are selected, show all projects
    if (
      selectedLocation.length === 0 &&
      selectedYears.length === 0 &&
      selectedTags.length === 0
    ) {
      return true;
    }

    // Check if project matches any of the selected locations
    const locationMatch =
      selectedLocation.length === 0 ||
      (project.location && selectedLocation.includes(project.location));

    // Check if project matches any of the selected years
    const yearMatch =
      selectedYears.length === 0 ||
      (project.year && selectedYears.includes(project.year));

    // Check if project matches any of the selected tags
    const tagMatch =
      selectedTags.length === 0 ||
      (project.projectTags &&
        project.projectTags.some((projectTag) =>
          selectedTags.includes(projectTag._id)
        ));

    // Show project if it matches ANY of the selected filters
    return (
      (selectedLocation.length > 0 && locationMatch) ||
      (selectedYears.length > 0 && yearMatch) ||
      (selectedTags.length > 0 && tagMatch)
    );
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="hidden md:block w-full md:w-1/3">
        <div className="sticky top-24 space-y-2">
          <div className="space-y-2">
            <h2 className="font-mono text-sm text-gray-500">PROJECT ARCHIVE</h2>
          </div>

          <FilterMenu
            locations={locations}
            years={years}
            tags={tags}
            selectedLocation={selectedLocation}
            selectedYears={selectedYears}
            selectedTags={selectedTags}
            onLocationChange={setSelectedLocation}
            onYearChange={setSelectedYears}
            onTagChange={setSelectedTags}
          />
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => (
            <div key={project._id} className="w-full">
              <ArchivePost post={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
