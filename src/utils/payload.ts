import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { getCachedPayload as getCachedPayloadFn } from "./cached-local-api";

export const getPayload = async () => {
  const payload = await getPayloadHMR({ config: await configPromise });

  return payload;
};

export const getCachedPayload = async () => {
  const payload = await getPayload();

  return getCachedPayloadFn(payload);
};
