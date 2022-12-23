import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Container from "../components/container";
import ListSite from "../components/list-site";

const Home: NextPage = () => {
  const { data: blogs } = trpc.example.getAllSites.useQuery();

  return (
    <>
      <Container>
        <div className="mx-auto mt-24 max-w-xl">
          <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text font-extrabold text-transparent">
              Awesome open-source
            </span>{" "}
            projects and websites
          </h1>
          <p className="mt-6 text-center text-xl text-zinc-600">
            I am building a collection of awesome and websites with Next.js 13
            and Supabase as a open-source project.
          </p>
        </div>

        {blogs && <ListSite blogs={blogs} />}
      </Container>
    </>
  );
};

export default Home;
