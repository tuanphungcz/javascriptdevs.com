import slugify from "slugify";
import supabase from "../../../utils/supabase";
import { getBlogBySlug } from "../../../utils/utils";
import PersonalSiteCard from "../../../components/personal-site-card";

export async function generateStaticParams() {
  const { data: blogs } = await supabase.from("blogs").select("name");

  if (!blogs) return [];

  const paths = await blogs.map(({ name }: any) => ({
    slug: slugify(name.toLowerCase()),
  }));

  return paths;
}

export default async function Post({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    return null;
  }
  const blog = await getBlogBySlug(params.slug);

  return <PersonalSiteCard blog={blog} />;
}
