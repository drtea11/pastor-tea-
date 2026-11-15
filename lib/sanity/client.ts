import { createClient } from "@sanity/client";

import {
  hasSanityConfig,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
});

export { hasSanityConfig };
