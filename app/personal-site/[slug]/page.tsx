import supabase from "../../../utils/supabase";
import PersonalSiteCard from "../../../components/personal-site-card";
import slugify from "slugify";
import { BlogType } from "../../../types/supabase";

// cache this page for 1 minute
export async function generateStaticParams() {
  const { data: blogs }: any = await supabase.from("blogs").select("name");

  const paths = await blogs.map(({ name }: any) => ({
    slug: slugify(name.toLowerCase()),
  }));

  return paths;
}

const getBlog = async (slug: string) => {
  const { data: blogs }: any = await supabase.from("blogs").select("*");
  return blogs.find(
    (blog: BlogType) => slugify(blog.name.toLowerCase()) === slug
  );
};

export default async function Post({ params }: any) {
  if (!params?.slug) {
    return null;
  }
  const blog = await getBlog(params.slug);

  return <PersonalSiteCard blog={blog} />;
}
