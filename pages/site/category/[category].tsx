import { type NextPage } from "next";
import { trpc } from "../../../utils/trpc";
import Container from "../../../components/container";
import ListSite from "../../../components/list-site";
import { useRouter } from "next/router";
import { prisma } from "../../../server/db/client";
import TechTags from "../../../components/tech-tags";
import type { Site } from "@prisma/client";
import HeroHeader from "../../../components/hero-header";

const Home: NextPage = () => {
  const { query }: any = useRouter();

  const { data: sites } = trpc.site.getFiltered.useQuery({
    tag: null,
    category: query?.category,
  }) as { data: Site[] };

  return (
    <>
      <HeroHeader />
      <Container>
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
