import type { Site } from "@prisma/client";
import slugify from "slugify";
import Container from "../../components/container";
import SiteCard from "../../components/site-card";

import { prisma } from "../../server/db/client";
import { getSiteBySlug, getGithubUsername, stripUrl } from "../../utils/utils";

export default function Page({ site }: { site: Site }) {
  if (!site) {
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
      <Container>
        <SiteCard site={site} />
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

  const site = getSiteBySlug(params.slug, sites);

  return {
    props: {
      site,
    },
  };
};
