import { Suspense } from "react";

import { getGlobalSettings } from "@/_features/globals/actions";
import { getUsers } from "@/_features/users/actions";
import Loading from "@/app/(app)/loading";
import { GithubLoginButton } from "@/components/GithubLoginButton";
import { Container, Description, LinkButton, Title } from "@/components/ui";
import { APP_URL, ONE_DAY_IN_SECONDS } from "@/constants";
import { getMetadata } from "@/utils/getMetadata";
import { validateRequest } from "@/utils/lucia/lucia";
import { Profile } from "payload-types";

import { ProfileListItem } from "./ProfileListItem";

export const revalidate = ONE_DAY_IN_SECONDS; // revalidate every hour

export async function generateMetadata() {
  const { seo } = await getGlobalSettings();

  const title = seo?.metaTitle ?? "";
  const description = seo?.metaDescription ?? "";
  const url = `${APP_URL}`;

  return getMetadata({
    title,
    description,
    url,
  });
}

const ProfilesPage = async () => {
  const { session } = await validateRequest();
  const users = await getUsers();

  console.log("users", users);

  return (
    <div className="">
      <div className="border-b pt-16 bg-white">
        <Container size="lg" className="my-16">
          <div className="space-y-4 max-w-lg m-auto text-center">
            <Title>
              The community of{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text font-extrabold text-transparent">
                Javascript developers
              </span>
            </Title>
            <Description>
              Join the community and connect with other developers.
            </Description>

            <Suspense fallback={<Loading />}>
              {session ? (
                <LinkButton href="/profile/edit">Edit my profile</LinkButton>
              ) : (
                <GithubLoginButton title="Create your dev profile" />
              )}
            </Suspense>
          </div>
        </Container>
      </div>
      <div className="bg-gray-50">
        <Container className="p-8">
          <div className="space-y-10 overflow-x-hidden ">
            <div className="text-center">
              <Title>Featured Developers</Title>
            </div>

            <div className="space-y-6 md:space-y-0 md:grid md:gap-6">
              {users.docs.map((user) => {
                if (!user.profile) {
                  return null;
                }

                return (
                  <ProfileListItem
                    user={user}
                    profile={user.profile as Profile}
                    key={user.id}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfilesPage;
