import { sanityFetch } from "@/sanity/lib/live";
import { headerBioBitsQuery } from "@/sanity/lib/queries";
import { BioBits } from "./BioBits";

export const BioBitsWrapper = async () => {
  const { data } = await sanityFetch({ query: headerBioBitsQuery });
  return <BioBits data={data} />;
};
