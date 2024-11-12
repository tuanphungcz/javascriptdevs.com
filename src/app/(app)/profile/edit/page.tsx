import { notFound, redirect } from "next/navigation";

import { getProfilesCategories } from "@/_features/profiles/actions";
import { getCurrentUser } from "@/_features/users/actions";
import { ProfileForm } from "@/app/(app)/profile/edit/ProfileForm";
import { validateRequest } from "@/utils/lucia/lucia";
import { Profile } from "payload-types";

const ProfileEditPage = async () => {
  const { session } = await validateRequest();

  if (!session) {
    // Redirect to login
    return redirect("/auth/login");
  }

  const [currentUser, profileCategories] = await Promise.all([
    getCurrentUser(),
    getProfilesCategories(),
  ]);

  const user = currentUser.docs[0];
  const profile = currentUser.docs[0].profile as Profile;

  if (!profile) {
    // Handle the case where profile is undefined
    return notFound();
  }

  return (
    <ProfileForm
      user={user}
      profile={profile}
      categories={profileCategories.docs}
    />
  );
};

export default ProfileEditPage;
