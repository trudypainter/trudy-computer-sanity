import { defineLive } from "next-sanity";
import { client } from "./client";
import { token } from "./token";

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

const { sanityFetch: originalSanityFetch, SanityLive } = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used, or to enable the Vercel Toolbar Edit Mode
  serverToken: token,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token,
});

// Wrap the original sanityFetch to add logging
export const sanityFetch = async (options: any) => {
  console.log(
    `[SANITY FETCH] Executing query: ${options.query.substring(0, 100)}...`
  );

  try {
    const result = await originalSanityFetch(options);
    console.log(
      `[SANITY FETCH] Query succeeded with ${result?.data?.length || 0} results`
    );
    return result;
  } catch (error) {
    console.error(`[SANITY FETCH] Query failed:`, error);
    throw error;
  }
};

export { SanityLive };
