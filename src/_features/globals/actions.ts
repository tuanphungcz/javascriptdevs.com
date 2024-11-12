import { cache } from "react";

import { getPayload } from "@/utils/payload";

export const getGlobalSettings = cache(async () => {
  const payload = await getPayload();

  return await payload.findGlobal({
    slug: "settings",
  });
});
