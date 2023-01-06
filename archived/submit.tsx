import { type NextPage } from "next";
import Container from "../components/container";
import GithubRepoButton from "../components/github-repo-button";
import SubmitForm from "../components/submit-form";

const Submit: NextPage = () => {
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

          <div className="flex items-center space-x-2">
            <GithubRepoButton />
          </div>
        </div>

        <div className="mt-8">
          <SubmitForm />
        </div>
      </Container>
    </>
  );
};

export default Submit;
