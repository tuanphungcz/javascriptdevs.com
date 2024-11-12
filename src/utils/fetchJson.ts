export type FetchOptions = RequestInit;

export const fetchJson = async (
  url: string,
  options?: FetchOptions,
  timeout?: number,
): Promise<any> => {
  if (process.env.VERBOSE) console.log(`fetchJson: ${url}`);
  if (!options) options = {};
  if (typeof timeout === "number") {
    options.signal ??= AbortSignal.timeout(timeout);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status} ${url}`);
  }
  return await response.json();
};
