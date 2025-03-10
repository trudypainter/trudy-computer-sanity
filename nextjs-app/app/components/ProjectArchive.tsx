"use client";

import { useState, useEffect } from "react";
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
  landingSectionProjectIds?: string[]; // Optional array of project IDs in landing section order
};

export function ProjectArchive({
  projects,
  locations,
  years,
  tags,
  landingSectionProjectIds = [],
}: ProjectArchiveProps) {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [orderedProjects, setOrderedProjects] = useState<Project[]>([]);

  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter and order projects
  useEffect(() => {
    // First filter projects based on selected filters
    let filtered = projects.filter((project) => {
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

    // Then sort projects based on device type
    if (isMobile && landingSectionProjectIds.length > 0) {
      // On mobile, prioritize landing section order
      const landingSectionProjects: Project[] = [];
      const otherProjects: Project[] = [];

      // First add projects in landing section order
      landingSectionProjectIds.forEach((id) => {
        const project = filtered.find((p) => p._id === id);
        if (project) {
          landingSectionProjects.push(project);
        }
      });

      // Then add remaining projects sorted by year
      filtered.forEach((project) => {
        if (!landingSectionProjectIds.includes(project._id)) {
          otherProjects.push(project);
        }
      });

      // Sort other projects by year
      otherProjects.sort((a, b) => {
        const yearA = a.year ? parseInt(a.year) : 0;
        const yearB = b.year ? parseInt(b.year) : 0;
        return yearB - yearA;
      });

      setOrderedProjects([...landingSectionProjects, ...otherProjects]);
    } else {
      // On desktop, sort by year (default behavior)
      filtered.sort((a, b) => {
        const yearA = a.year ? parseInt(a.year) : 0;
        const yearB = b.year ? parseInt(b.year) : 0;
        return yearB - yearA;
      });

      setOrderedProjects(filtered);
    }
  }, [
    projects,
    selectedLocation,
    selectedYears,
    selectedTags,
    isMobile,
    landingSectionProjectIds,
  ]);

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
          {orderedProjects.map((project) => (
            <div key={project._id} className="w-full">
              <ArchivePost post={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
