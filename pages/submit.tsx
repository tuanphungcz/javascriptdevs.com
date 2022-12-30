import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Container from "../components/container";
import SubmitForm from "../components/submit-form";

const Home: NextPage = () => {
  const { data: sites } = trpc.example.getAllSites.useQuery();

  if (!sites) return <div>Loading...</div>;

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
        <SubmitForm />
      </Container>
    </>
  );
};

export default Home;
