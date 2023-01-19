import { type NextPage } from "next";
import { trpc } from "../../../utils/trpc";
import Container from "../../../components/container";
import ListSite from "../../../components/list-site";
import { useRouter } from "next/router";
import TechTags from "../../../components/tech-tags";
import { allTags } from "../../../utils/utils";
import type { Site } from "@prisma/client";
import HeroHeader from "../../../components/hero-header";

const Home: NextPage = () => {
  const { query }: any = useRouter();
  const { data: sites } = trpc.site.getFiltered.useQuery({
    category: null,
    tag: query?.tag,
  }) as { data: Site[] };

  return (
    <>
      <Container>
        <HeroHeader />
        <TechTags />
        <ListSite sites={sites} />
      </Container>
    </>
  );
};

export default Home;

export const getStaticPaths = async () => {
  const paths = allTags.map((tag: any) => {
    return {
      params: {
        tag,
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
