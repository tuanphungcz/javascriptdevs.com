/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next";

import config from "@payload-config";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import { importMap } from "../importMap";

type Params = Promise<{ segments: string[] }>;
type SearchParams = Promise<{ [key: string]: string | string[] }>;

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  return await generatePageMetadata({ config, params, searchParams });
};

// Using async component for Next.js 15
async function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  return RootPage({ config, params, importMap, searchParams });
}

export default Page;
