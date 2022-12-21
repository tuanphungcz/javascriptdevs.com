/* eslint-disable @next/next/no-img-element */
"use client";

import { IconBrandGithub, IconExternalLink } from "tabler-icons";
import { PrimaryButton, SecondaryButton } from "./button";
import { BlogType } from "../types/types";
import { getGithubUsername } from "../utils/utils";
import NewTabLink from "./new-tab-link";

export default function SiteCard({ blog }: { blog: BlogType }) {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="p-8 rounded-md bg-white border border-zinc-300">
        {blog.website_url && (
          <NewTabLink href={blog.website_url}>
            <h3 className="mt-4 text-sm text-gray-700 flex space-x-2">
              <span>{blog.website_url.replace(/^https:\/\/|\/$/g, "")}</span>{" "}
              <IconExternalLink className="w-5 h-5" />
            </h3>
          </NewTabLink>
        )}
        <p className="mt-1 text-2xl font-medium text-gray-900">
          {getGithubUsername(blog.github_url)}
        </p>
        <div className="flex space-x-4 justify-end">
          {blog.github_url && (
            <NewTabLink href={blog.github_url}>
              <SecondaryButton>
                <div className="flex space-x-2">
                  <IconBrandGithub className="h-5 w-5 text-black" />
                  <div>Source code</div>
                </div>
              </SecondaryButton>
            </NewTabLink>
          )}
          {blog.website_url && (
            <NewTabLink href={blog.website_url}>
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

      {blog.image_url && (
        <div className="my-8">
          <img
            className="w-screen object-cover rounded-md shadow-md  border border-zinc-300"
            src={blog.image_url}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
