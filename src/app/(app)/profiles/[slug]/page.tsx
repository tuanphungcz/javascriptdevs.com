import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getUserBySlug } from "@/_features/users/actions";
import { ProfileDetail } from "@/app/(app)/profiles/[slug]/ProfileDetail";
import { ONE_DAY_IN_SECONDS } from "@/constants";
import { getCategoryOptions } from "@/utils/helpers";
import { Profile } from "payload-types";

export const revalidate = ONE_DAY_IN_SECONDS;

type Params = Promise<{ slug: string }>;

const ProfilePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const user = await getUserBySlug({ slug });

  if (!user) {
    return notFound();
  }

  const profile = user.docs[0].profile;

  return (
    <div className="pb-32 bg-white">
      <ProfileDetail user={user.docs[0]} profile={profile as Profile} />
    </div>
  );
};

export default ProfilePage;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug({ slug });

  if (!user) {
    return {};
  }

  const { firstName, lastName, avatar } = user.docs[0];
  const { description, categories: profileCategories = [] } = user.docs[0]
    .profile as Profile;

  const technologies = getCategoryOptions({
    subcategory: "technology",
    categories: profileCategories,
  })
    .map(({ label }: { label: string }) => label)
    .join(",");

  const name = `${firstName} ${lastName}`;

  const ogImageUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/og/users`);
  ogImageUrl.searchParams.append("name", name ?? "");
  ogImageUrl.searchParams.append("description", description ?? "");
  ogImageUrl.searchParams.append(
    "image",
    typeof avatar === "object" && avatar !== null ? (avatar.url ?? "") : "",
  );
  ogImageUrl.searchParams.append("technologies", technologies ?? "");

  return {
    title: `${name} - javascriptdevs.com`,
    description: description ?? "",
    robots: "follow, index",

    openGraph: {
      title: `${name} - javascriptdevs.com`,
      description: description ?? "",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/users/${slug}`,
      siteName: "javas.com",
      images: [ogImageUrl.toString()],
      type: "website",
    },
    twitter: {
      site: "@javascriptdevs",
      card: "summary_large_image",
      title: `${name} - javas.com`,
      description: description ?? "",
      images: [ogImageUrl.toString()],
    },
  };
}
