import BlurImage from "../components/blur-image";
import supabase from "../utils/supabase";
import Container from "../components/container";
import Link from "next/link";
import { BlogType } from "../types/types";
import slugify from "slugify";

export default async function Page() {
  const { data: blogs } = await supabase.from("blogs").select("*");

  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="max-w-xl mx-auto mt-24">
        <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
            Open-source
          </span>{" "}
          personal blogs and websites
        </h1>
        <p className="mt-6 text-xl text-zinc-600 text-center">
          I am building a collection of personal blogs and websites with Next.js
          13 and Supabase as a open-source project.
        </p>
      </div>
      <div className="mx-auto max-w-2xl py-16 lg:max-w-[1400px]">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {blogs.map((blog: BlogType) => (
            <Link
              key={blog.id}
              href={`/personal-site/${slugify(
                blog.name.toLowerCase().replace(/^https:\/\/|\/$/g, "")
              )}`}
              className="group"
            >
              {blog.imageUrl && <BlurImage src={blog.imageUrl} />}
              {blog.websiteUrl && (
                <h3 className="mt-4 text-sm text-gray-700">
                  {blog.websiteUrl.replace(/^https:\/\/|\/$/g, "")}
                </h3>
              )}
              <p className="mt-1 text-lg font-medium text-gray-900">
                {blog.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
