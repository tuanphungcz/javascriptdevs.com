import { useState } from "react";
import BlurImage from "../components/blur-image";
import Link from "next/link";
import slugify from "slugify";
import { getGithubUsername, getKeys, stripUrl } from "../utils/utils";
import { cn } from "../utils/utils";
import { IconStar } from "tabler-icons";
import { PrimaryButton } from "./button";

const ALL = "All";
const DEFAULT_VISIBLE_ITEMS = 8;

export default function ListSite({ blogs }: { blogs: any[] }) {
  const [initialDataset, setInitialDataset] = useState(blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);
  const keys = getKeys(blogs);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleItems(DEFAULT_VISIBLE_ITEMS);
    if (category === ALL) {
      return setInitialDataset(blogs);
    }
    setInitialDataset(blogs.filter((item: any) => item.category === category));
  };

  return (
    <div className="mx-auto py-16">
      {keys?.length > 0 && (
        <div className="py-4">
          <div className="no-scrollbar flex space-x-2 overflow-auto">
            {[ALL, ...keys].map((category) => (
              <button
                onClick={() => handleCategoryClick(category)}
                key={category}
                className={cn(
                  "flex items-center whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm capitalize text-gray-600 shadow-sm transition hover:border-gray-500",
                  selectedCategory === category ? "border-zinc-500" : ""
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="py-2 text-xs text-gray-500">
            Showing {initialDataset.length} of {blogs.length}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 xs:grid-cols-2 md:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4">
        {initialDataset.slice(0, visibleItems).map((blog: any) => (
          <Link
            key={blog.id}
            href={`/site/${slugify(stripUrl(blog.websiteUrl))}`}
            className="group"
          >
            {blog.imageUrl && <BlurImage src={blog.imageUrl} />}
            <div className="mt-4 flex items-center justify-between">
              <h3 className=" text-sm text-gray-700">
                By {getGithubUsername(blog.githubUrl)}
              </h3>
              {blog?.stargazersCount && (
                <div className="flex items-center justify-between space-x-2">
                  <IconStar className="h-4 w-4" />
                  <div className="text-xs text-gray-700">
                    {blog.stargazersCount}
                  </div>
                </div>
              )}
            </div>

            <h1 className="mt-2 mb-4 text-lg font-medium text-gray-900">
              {stripUrl(blog.websiteUrl)}
            </h1>

            {blog.description && (
              <p className="text-sm text-gray-700">
                {blog.description?.length > 80
                  ? blog.description?.slice(0, 80) + "..."
                  : blog.description}
              </p>
            )}
          </Link>
        ))}
      </div>
      {visibleItems >= initialDataset.length ? null : (
        <div className="my-16 text-center">
          <PrimaryButton
            onClick={() =>
              setVisibleItems(visibleItems + DEFAULT_VISIBLE_ITEMS)
            }
          >
            Load more projects
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
