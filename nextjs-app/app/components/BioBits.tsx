import { sanityFetch } from "@/sanity/lib/live";
import { headerBioBitsQuery } from "@/sanity/lib/queries";

interface BioBit {
  _id: string;
  title: string;
  content: string;
  order: number;
  tags: { name: string; slug: string }[];
  location: { name: string; slug: string; coordinates: number[] };
  links: any[];
}

export const BioBits = async () => {
  const { data } = await sanityFetch({ query: headerBioBitsQuery });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:w-1/3 space-y-8 text-gray-600">
      {data.map((bit: BioBit) => (
        <section key={bit._id} className="space-y-1">
          <h2 className="font-mono text-xs text-gray-500">
            {bit.title.toUpperCase()}
          </h2>
          <div className="text-sm">{bit.content}</div>
        </section>
      ))}

      <button className="text-xs font-mono text-gray-600 px-3 py-1.5 rounded bg-gray-300 hover:bg-gray-400 transition-colors">
        <a href="/about">+ MORE</a>
      </button>
    </div>
  );
};
