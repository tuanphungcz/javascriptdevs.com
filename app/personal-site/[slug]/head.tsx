import { BlogType } from "../../../types/supabase";
import { getBlogBySlug } from "../../../utils/utils";

export default async function Head({ params }: any) {
  const blog: BlogType = await getBlogBySlug(params.slug);
  return (
    <>
      <title>{`${blog.name} | JavascriptDevs.com`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="robots" content="follow, index" />
      <meta
        name="description"
        content={`Open-source personal blog and website by ${blog.name}`}
      />
      <link rel="icon" href="/favicon.ico" />
      <script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src="https://umami-nu.vercel.app/umami.js"
      ></script>
    </>
  );
}
