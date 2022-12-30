import { useState } from "react";
import BlurImage from "../components/blur-image";
import Link from "next/link";
import slugify from "slugify";
import { getGithubUsername, getKeys, stripUrl } from "../utils/utils";
import { cn } from "../utils/utils";
import { IconStar } from "tabler-icons";
import { PrimaryButton } from "./button";
import type { Site } from "@prisma/client";

const ALL = "All";
const DEFAULT_VISIBLE_ITEMS = 6;

export default function ListSite({ sites }: { sites: Site[] }) {
  const [initialDataset, setInitialDataset] = useState(sites);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);
  const keys = getKeys(sites);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleItems(DEFAULT_VISIBLE_ITEMS);
    if (category === ALL) {
      return setInitialDataset(sites);
    }
    setInitialDataset(sites.filter((item: Site) => item.category === category));
  };

  return (
    <div className="mx-auto py-16">
      {keys?.length > 0 && (
        <div className="py-4">
          <div className="no-scrollbar flex space-x-2 overflow-auto">
            {[ALL, ...keys].map((category) => (
              <div
                onClick={() => handleCategoryClick(category)}
                key={category}
                className={cn(
                  "flex cursor-pointer items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium capitalize text-gray-500 shadow-sm transition hover:border-gray-400",
                  selectedCategory === category
                    ? "border-zinc-500 text-gray-600"
                    : ""
                )}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="py-2 text-xs text-gray-500">
            Showing {initialDataset.length} of {sites.length}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
        {initialDataset.slice(0, visibleItems).map((site: Site) => (
          <Link
            key={site.id}
            href={`/site/${slugify(
              (site.websiteUrl && stripUrl(site.websiteUrl)) || "no-url"
            )}`}
            className="group"
          >
            {site.imageUrl && <BlurImage src={site.imageUrl} />}
            <div className="mt-4 flex items-center justify-between">
              <h3 className=" text-sm text-gray-700">
                By {site.githubUrl && getGithubUsername(site.githubUrl)}
              </h3>
              {site?.stargazersCount && (
                <div className="flex items-center justify-between space-x-2">
                  <IconStar className="h-4 w-4" />
                  <div className="text-xs text-gray-700">
                    {site.stargazersCount}
                  </div>
                </div>
              )}
            </div>

            <h1 className="mt-2 mb-4 text-lg font-medium text-gray-900">
              {site.websiteUrl && stripUrl(site.websiteUrl)}
            </h1>

            {site.description && (
              <p className="text-sm text-gray-700">
                {site.description?.length > 80
                  ? site.description?.slice(0, 80) + "..."
                  : site.description}
              </p>
            )}
          </Link>
        ))}
      </div>
      {visibleItems >= initialDataset.length ? null : (
        <div className="my-16 text-center">
          <PrimaryButton
            onClick={() => {
              return setVisibleItems(visibleItems + DEFAULT_VISIBLE_ITEMS);
            }}
          >
            Load more projects
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
