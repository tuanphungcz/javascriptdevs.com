import slugify from "slugify";
import Container from "../../components/container";
import SiteCard from "../../components/site-card";

import { prisma } from "../../server/db/client";
import { getBlogBySlug, getGithubUsername, stripUrl } from "../../utils/utils";

export default function Page({ blog }: any) {
  if (!blog) {
    return null;
  }

  return (
    <>
      <title>{`${getGithubUsername(
        blog.github_url
      )} | JavascriptDevs.com`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="robots" content="follow, index" />
      <meta
        name="description"
        content={`Open-source projects and website by ${getGithubUsername(
          blog.name
        )}`}
      />
      <link rel="icon" href="/favicon.ico" />
      <script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://umami-nu.vercel.app/umami.js"
      ></script>
      <Container>
        <SiteCard blog={blog} />
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

  const paths = sites.map(({ websiteUrl }: any) => {
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
      websiteUrl: true,
      description: true,
      category: true,
      imageUrl: true,
      stargazersCount: true,
    },
  });

  const blog = getBlogBySlug(params.slug, sites);

  return {
    props: {
      blog,
    },
  };
};
