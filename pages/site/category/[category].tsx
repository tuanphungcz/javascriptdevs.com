import { type NextPage } from "next";
import { trpc } from "../../../utils/trpc";
import Container from "../../../components/container";
import ListSite from "../../../components/list-site";
import GithubRepoButton from "../../../components/github-repo-button";
import { PrimaryButton } from "../../../components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { prisma } from "../../../server/db/client";
import TechTags from "../../../components/tech-tags";
import type { Site } from "@prisma/client";
import NewTabLink from "../../../components/new-tab-link";

const Home: NextPage = () => {
  const { query }: any = useRouter();

  const { data: sites } = trpc.site.getFiltered.useQuery({
    tag: null,
    category: query?.category,
  }) as { data: Site[] };

  return (
    <>
      <title>JavascriptDevs.com</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="robots" content="follow, index" />
      <meta
        name="description"
        content="Awesome Open-source projects and websites"
      />
      <link rel="icon" href="/favicon.ico" />
      <script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://umami-nu.vercel.app/umami.js"
      ></script>
      <Container>
        <div className="mx-auto mt-32 flex max-w-xl flex-col items-center space-y-4">
          <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text font-extrabold text-transparent">
              Awesome open-source
            </span>{" "}
            projects and websites
          </h1>
          <p className="mt-6 text-center text-xl text-zinc-600">
            Discover the Best Open-Source projects and website built with React,
            Next.js, Tailwind CSS, and more.
          </p>

          <div className="flex items-center space-x-4">
            <NewTabLink href="https://airtable.com/shrwaqGgNDP6l9Rgh">
              <PrimaryButton>Submit a project</PrimaryButton>
            </NewTabLink>
            <GithubRepoButton />
          </div>
        </div>

        <TechTags />
        <ListSite sites={sites} />
      </Container>
    </>
  );
};

export default Home;

export const getStaticPaths = async () => {
  const categories = await prisma.site.groupBy({
    by: ["category"],
    where: {
      category: {
        not: null,
      },
    },
  });

  const paths = categories.map((category: any) => {
    return {
      params: {
        category: category.category,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
