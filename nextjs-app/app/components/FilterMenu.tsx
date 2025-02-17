"use client";

type FilterButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

function FilterButton({ label, isSelected, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs border ${
        isSelected
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

type Tag = {
  _id: string;
  name: string;
  slug: string;
};

type FilterMenuProps = {
  locations: string[];
  years: string[];
  tags: Tag[];
  selectedLocation: string[];
  selectedYears: string[];
  selectedTags: string[];
  onLocationChange: (locations: string[]) => void;
  onYearChange: (years: string[]) => void;
  onTagChange: (tags: string[]) => void;
};

export function FilterMenu({
  locations,
  years,
  tags,
  selectedLocation,
  selectedYears,
  selectedTags,
  onLocationChange,
  onYearChange,
  onTagChange,
}: FilterMenuProps) {
  const toggleFilter = (
    value: string,
    selected: string[],
    onChange: (newValue: string[]) => void
  ) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-mono text-gray-500">Location:</span>
          {locations.map((location) => (
            <FilterButton
              key={location}
              label={location}
              isSelected={selectedLocation.includes(location)}
              onClick={() =>
                toggleFilter(location, selectedLocation, onLocationChange)
              }
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-mono text-gray-500">Years:</span>
          {years.map((year) => (
            <FilterButton
              key={year}
              label={year}
              isSelected={selectedYears.includes(year)}
              onClick={() => toggleFilter(year, selectedYears, onYearChange)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-mono text-gray-500">Tags:</span>
          {tags.map((tag) => (
            <FilterButton
              key={tag._id}
              label={tag.name}
              isSelected={selectedTags.includes(tag._id)}
              onClick={() => toggleFilter(tag._id, selectedTags, onTagChange)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
