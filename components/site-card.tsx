/* eslint-disable @next/next/no-img-element */

import { IconBrandGithub, IconExternalLink, IconStar } from "tabler-icons";
import { PrimaryButton, SecondaryButton } from "./button";
import { getGithubUsername } from "../utils/utils";
import NewTabLink from "./new-tab-link";
import type { Site } from "@prisma/client";
import BlurImage from "./blur-image";

export default function SiteCard({ site }: { site: Site }) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="mb-8 rounded-md">
          <h1 className="mt-1 text-2xl font-medium text-gray-900 capitalize">
            {site.githubUrl && getGithubUsername(site.githubUrl)}
          </h1>
          {site.description && (
            <p className="mt-2 flex text-sm text-gray-700">
              {site.description}
            </p>
          )}

          <div className="mt-4">
            {site?.stargazersCount && (
              <div className="inline-flex items-center justify-between space-x-2">
                <IconStar className="h-4 w-4" />
                <div className="text-xs text-gray-700">
                  {site.stargazersCount}
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-4">
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
