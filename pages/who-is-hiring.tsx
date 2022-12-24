import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Container from "../components/container";
import { useState } from "react";
import JobList from "../components/job-list";
import StartOnGithubButton from "../components/star-on-github-button";

const Home: NextPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const { data: jobs } = trpc.example.getAllJobs.useQuery({
    filter: selectedFilter,
    sortByNewest: true,
  });

  if (!jobs) return null;

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
          <StartOnGithubButton />
          <h1 className="tracking-loose text-center text-4xl font-bold text-zinc-800 sm:text-5xl">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text font-extrabold text-transparent">
              Javascript & Typescript
            </span>{" "}
            jobs from HackerNews
          </h1>
          <p className="mt-6 text-center text-xl text-zinc-600">
            A collection of jobs from hackernews who is hiring thread
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <JobList
            jobs={jobs}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </div>
      </Container>
    </>
  );
};

export default Home;
