/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next";

import config from "@payload-config";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { generatePageMetadata, NotFoundPage } from "@payloadcms/next/views";

import { importMap } from "../importMap";

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};
type Params = Promise<{ segments: string[] }>;
type SearchParams = Promise<{ [key: string]: string | string[] }>;

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => generatePageMetadata({ config, params, searchParams });

const NotFound = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => NotFoundPage({ config, importMap: importMap, params, searchParams });

export default NotFound;
