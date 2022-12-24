/* eslint-disable @next/next/no-img-element */

import { IconBrandGithub, IconExternalLink } from "tabler-icons";
import { PrimaryButton, SecondaryButton } from "./button";
import { getGithubUsername, stripUrl } from "../utils/utils";
import NewTabLink from "./new-tab-link";
import type { Site } from "@prisma/client";

export default function SiteCard({ site }: { site: Site }) {
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <div className="rounded-md border border-zinc-300 bg-white p-8">
        {site.websiteUrl && (
          <NewTabLink href={site.websiteUrl}>
            <h3 className="mt-4 flex space-x-2 text-sm text-gray-700">
              <span>{stripUrl(site.websiteUrl)}</span>{" "}
              <IconExternalLink className="h-5 w-5" />
            </h3>
          </NewTabLink>
        )}
        <p className="mt-1 text-2xl font-medium text-gray-900">
          {site.githubUrl && getGithubUsername(site.githubUrl)}
        </p>
        {site.description && (
          <h3 className="mt-2 flex text-gray-700">{site.description}</h3>
        )}
        <div className="flex justify-end space-x-4">
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

      {site.imageUrl && (
        <div className="my-8">
          <img
            className="w-screen rounded-md border border-zinc-300  object-cover shadow-md"
            src={site.imageUrl}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
