import BlurImage from "../components/blur-image";
import Link from "next/link";
import slugify from "slugify";
import { getGithubUsername, stripUrl } from "../utils/utils";
import { IconStar } from "tabler-icons";
import type { Site } from "@prisma/client";
import BlurAvatar from "./blur-avatar";

export default function ListItem({ site }: { site: Site }) {
  return (
    <Link
      key={site.id + site.websiteUrl}
      href={`/site/${slugify(
        (site.websiteUrl && stripUrl(site.websiteUrl)) || "no-url"
      )}`}
      className="group"
    >
      {site.imageUrl && <BlurImage src={site.imageUrl} />}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {site.avatarUrl && <BlurAvatar src={site.avatarUrl} />}
          <h3 className=" text-sm text-gray-700">
            By {site.githubUrl && getGithubUsername(site.githubUrl)}
          </h3>
        </div>
        {site?.stargazersCount && (
          <div className="flex items-center justify-between space-x-2">
            <IconStar className="h-4 w-4" />
            <div className="text-xs text-gray-700">{site.stargazersCount}</div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <h1 className="text-xl font-bold text-gray-800">
          {site.websiteUrl && stripUrl(site.websiteUrl)}
        </h1>

        {site.description && (
          <p className="text-sm text-gray-700">
            {site.description?.length > 80
              ? site.description?.slice(0, 80) + "..."
              : site.description}
          </p>
        )}
        {site?.techTags && (
          <div className="flex flex-wrap gap-2 pt-1">
            {site.techTags.map((tag: string) => (
              <div
                key={tag}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
