import { revalidateTag, unstable_cache } from "next/cache";

import { buildCachedPayload } from "@payload-enchants/cached-local-api";

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  // collections list to cache
  collections: [
    {
      slug: "session",
      findOneFields: ["id"],
    },
    {
      slug: "users",
      findOneFields: ["id"],
    },
    {
      slug: "profiles",
      findOneFields: ["id"],
    },
  ],
  // Log when revalidation runs or operation cache HIT / SKIP
  loggerDebug: true,
  //   globals: [{ slug: 'header' }],
  revalidateTag,
  options: {},
  unstable_cache,
});
