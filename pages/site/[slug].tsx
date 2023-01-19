import type { Site } from "@prisma/client";
import slugify from "slugify";
import Container from "../../components/container";
import SiteCard from "../../components/site-card";
import { prisma } from "../../server/db/client";
import { getSiteBySlug, getGithubUsername, stripUrl } from "../../utils/utils";
import ListItem from "../../components/list-item";
import { useId } from "react";

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
              <ListItem site={site} key={site.id} />
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
      avatarUrl: true,
      techTags: true,
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
