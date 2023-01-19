import { IconBrandGithub, IconExternalLink, IconStar } from "tabler-icons";
import { PrimaryButton, SecondaryButton } from "./button";
import { getGithubUsername } from "../utils/utils";
import NewTabLink from "./new-tab-link";
import type { Site } from "@prisma/client";
import BlurImage from "./blur-image";

export default function SiteCard({ site }: { site: Site }) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-2xl text-left">
        <div className="mb-8 rounded-md">
          <div className="flex items-center justify-between ">
            <h1 className="mt-1 text-3xl font-bold capitalize text-gray-900">
              {site.githubUrl && getGithubUsername(site.githubUrl)}
            </h1>

            {site?.stargazersCount && (
              <div className="inline-flex items-center justify-between space-x-2">
                <IconStar className="h-4 w-4" />
                <div className="text-xs text-gray-700">
                  {site.stargazersCount}
                </div>
              </div>
            )}
          </div>

          {site?.techTags && (
            <div className="flex flex-wrap gap-2 py-2">
              {site.techTags.map((tag: string) => (
                <div
                  key={tag}
                  className="rounded bg-gray-200 px-2 border py-0.5 text-xs font-medium text-gray-500"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {site.description && (
            <p className="mt-2 text-gray-700">{site.description}</p>
          )}
          <div className="mt-4 flex space-x-4">
            {site.githubUrl && (
              <NewTabLink href={site.githubUrl}>
                <SecondaryButton>
                  <div className="flex space-x-2">
                    <IconBrandGithub className="h-5 w-5 text-black" />
                    <div>Source code</div>
                  </div>
                </SecondaryButton>
              </NewTabLink>
            )}
            {site.websiteUrl && (
              <NewTabLink href={site.websiteUrl}>
                <PrimaryButton>
                  <div className="flex space-x-2">
                    <div>Visit site</div>
                    <IconExternalLink className="h-5 w-5 text-white" />
                  </div>
                </PrimaryButton>
              </NewTabLink>
            )}
          </div>
        </div>
        <div>{site.imageUrl && <BlurImage src={site.imageUrl} />}</div>
      </div>
    </>
  );
}
