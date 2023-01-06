import { useState } from "react";
import BlurImage from "../components/blur-image";
import Link from "next/link";
import slugify from "slugify";
import { getGithubUsername, stripUrl } from "../utils/utils";
import { cn } from "../utils/utils";
import { IconStar } from "tabler-icons";
import { PrimaryButton } from "./button";
import type { Site } from "@prisma/client";
import { trpc } from "../utils/trpc";

const DEFAULT_VISIBLE_ITEMS = 12;
const tags = [
  "react",
  "next",
  "tailwindcss",
  "vue",
  "zod",
  "zustand",
  // "@supabase/supabase-js",
  // "@trpc/client",
  "gatsby",
  "graphql",
  "react-hook-form",
  "react-redux",
];

const Tag = ({ item, tag }: any) => {
  return (
    <Link
      href={`/site/tag/${item}`}
      className={cn(
        "flex cursor-pointer items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium capitalize text-gray-500 shadow-sm transition hover:border-gray-400",
        tag === item ? "border-zinc-500 text-gray-600" : ""
      )}
    >
      {item}{" "}
      <span className="ml-1 inline-flex rounded-full bg-gray-200 p-1">
        {/* {count?._count.techTags} */}
      </span>
    </Link>
  );
};

export default function ListSite({
  sites,
  tag,
  category,
}: {
  sites?: Site[];
  tag?: any;
  category?: any;
}) {
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);
  const { data: categories } = trpc.site.getCategoryCounts.useQuery();

  return (
    <div className="mx-auto py-16">
      {categories && categories?.length > 0 && (
        <div className="py-4">
          <div className="mb-2 text-[14px] font-semibold uppercase text-gray-600">
            Category
          </div>
          <div className="no-scrollbar flex space-x-2 overflow-auto">
            {categories.map((item) => (
              <Link
                href={`/site/category/${item.category}`}
                key={item.category}
                className={cn(
                  "flex cursor-pointer items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium capitalize text-gray-500 shadow-sm transition hover:border-gray-400",
                  category === item.category
                    ? "border-zinc-500 text-gray-600"
                    : ""
                )}
              >
                {item.category}{" "}
                <span className="ml-2 flex h-5 w-6 items-center justify-center rounded bg-slate-100 text-xs">
                  {item._count.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="mb-2 text-[14px] font-semibold uppercase text-gray-600">
        Tech
      </div>
      <div className="no-scrollbar flex space-x-2 overflow-auto">
        {tags.map((item) => (
          <Tag item={item} key={item} tag={tag} />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
        {sites &&
          sites.slice(0, visibleItems).map((site: Site) => (
            <Link
              key={site.id + site.websiteUrl}
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
      {sites && visibleItems >= sites?.length ? null : (
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
