import type { Site } from "@prisma/client";
import slugify from "slugify";
import Container from "../../components/container";
import SiteCard from "../../components/site-card";
import Link from "next/link";

import { prisma } from "../../server/db/client";
import { getSiteBySlug, getGithubUsername, stripUrl } from "../../utils/utils";
import BlurImage from "../../components/blur-image";
import { IconStar } from "tabler-icons";

export default function Page({
  site,
  random3Sites,
}: {
  site: Site;
  random3Sites: Site[];
}) {
  if (!site || !random3Sites) {
    return null;
  }

  const githubName = getGithubUsername(site.githubUrl);

  return (
    <>
      <title>{`${githubName} | JavascriptDevs.com`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="robots" content="follow, index" />
      <meta
        name="description"
        content={`Open-source projects and website by ${githubName}`}
      />
      <link rel="icon" href="/favicon.ico" />
      <script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://umami-nu.vercel.app/umami.js"
      ></script>
      <div className="bg-gray-100 pt-4 pb-16">
        <Container>
          <SiteCard site={site} />
        </Container>
      </div>
      <Container>
        <div className="mx-auto max-w-7xl py-16">
          <h2 className="mb-2 text-xl font-medium text-gray-800">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
            {random3Sites?.map((site: Site) => (
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
        </div>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const sites = await prisma.site.findMany({
    select: {
      websiteUrl: true,
    },
  });

  const paths = sites.map(({ websiteUrl }: { websiteUrl: string | null }) => {
    return {
      params: {
        slug: slugify(stripUrl(websiteUrl)),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  if (!params?.slug) {
    return null;
  }

  const sites = await prisma.site.findMany({
    select: {
      id: true,
      websiteUrl: true,
      description: true,
      category: true,
      imageUrl: true,
      stargazersCount: true,
      githubUrl: true,
    },
  });

  // Shuffle array
  const shuffled = sites.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const random3Sites = shuffled.slice(0, 3);

  const site = getSiteBySlug(params.slug, sites);

  return {
    props: {
      site,
      random3Sites,
    },
  };
};
