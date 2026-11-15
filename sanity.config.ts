import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "dr-tea-website",
  title: "Dr. TEA Website",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
