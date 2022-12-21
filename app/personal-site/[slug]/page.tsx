import slugify from "slugify";
import supabase from "../../../utils/supabase";
import { getBlogBySlug } from "../../../utils/utils";
import PersonalSiteCard from "../../../components/personal-site-card";
import Container from "../../../components/container";

export async function generateStaticParams() {
  const { data: blogs } = await supabase.from("blogs").select("name");

  if (!blogs) return [];

  const paths = await blogs.map(({ website_url }: any) => ({
    slug: slugify(website_url.replace(/^https:\/\/|\/$/g, "")),
  }));

  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    return null;
  }
  const blog = await getBlogBySlug(params.slug);

  return (
    <Container>
      <PersonalSiteCard blog={blog} />
    </Container>
  );
}
