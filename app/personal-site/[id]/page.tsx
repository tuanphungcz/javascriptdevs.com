import supabase from "../../../utils/supabase";
import PersonalSiteCard from "../../../components/personal-site-card";

// cache this page for 1 minute
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: blogs }: any = await supabase.from("blogs").select("id");

  const paths = await blogs.map(({ id }: any) => ({
    id: id.toString(),
  }));

  return paths;
}
export default async function Post({ params }: any) {
  if (!params?.id) {
    return null;
  }
  const { data: blog } = await supabase
    .from("blogs")
    .select()
    .match({ id: params.id })
    .single();

  return <PersonalSiteCard blog={blog} />;
}
