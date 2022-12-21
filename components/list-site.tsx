"use client";

import { useState } from "react";
import BlurImage from "../components/blur-image";
import Container from "../components/container";
import Link from "next/link";
import { BlogType } from "../types/types";
import slugify from "slugify";
import { getGithubUsername, getKeys } from "../utils/utils";
import { cn } from "../utils/utils";

const ALL = "All";

export default function ListSite({ blogs }: { blogs: BlogType[] }) {
  const [initialDataset, setInitialDataset] = useState(blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const keys = getKeys(blogs);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === ALL) {
      return setInitialDataset(blogs);
    }
    setInitialDataset(blogs.filter((item: any) => item.category === category));
  };

  return (
    <div className="mx-auto max-w-2xl py-16">
      {keys?.length > 0 && (
        <div className="py-4">
          <div className="flex space-x-2 overflow-auto no-scrollbar">
            {[ALL, ...keys].map((category) => (
              <button
                onClick={() => handleCategoryClick(category)}
                key={category}
                className={cn(
                  "flex px-2 py-1 items-center capitalize rounded-md transition text-sm shadow-sm bg-white border-zinc-200 hover:border-gray-500 border text-gray-600 whitespace-nowrap",
                  selectedCategory === category ? "border-zinc-500" : ""
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 py-2">
            Showing {initialDataset.length} of {blogs.length}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {initialDataset.map((blog: BlogType) => (
          <Link
            key={blog.id}
            href={`/site/${slugify(
              blog.website_url.toLowerCase().replace(/^https:\/\/|\/$/g, "")
            )}`}
            className="group"
          >
            {blog.image_url && <BlurImage src={blog.image_url} />}
            {blog.website_url && (
              <h3 className="mt-4 text-sm text-gray-700">
                {blog.website_url.replace(/^https:\/\/|\/$/g, "")}
              </h3>
            )}
            <p className="mt-1 text-lg font-medium text-gray-900">
              {getGithubUsername(blog.github_url)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
