import Image from "next/image";
import Link from "next/link";

import { Card, NewTabLink } from "@/components/ui";
import { truncateString } from "@/utils/helpers";
import { IconBrandGithub } from "@tabler/icons-react";
import { Profile, User } from "payload-types";

interface ProfileListItemProps {
  user: User;
  profile: Profile;
}

export const ProfileListItem = ({ user, profile }: ProfileListItemProps) => {
  const filteredCategories = profile?.categories
    ?.filter(
      (category) =>
        typeof category === "object" && category.subcategory === "technology",
    )
    .slice(0, 5);

  return (
    <Card>
      <div className="sm:flex gap-4 md:gap-8 space-y-4 sm:space-y-0">
        <div>
          <Link href={`/profile/${user.username}`} className="flex-shrink-0">
            {user.avatar &&
            typeof user.avatar === "object" &&
            "url" in user.avatar ? (
              <Image
                alt={user.lastName ?? ""}
                src={user.avatar.url as string}
                className="h-16 w-16 rounded-full object-cover"
                width={64}
                height={64}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-semibold">
                {user.firstName ? user.firstName[0].toUpperCase() : ""}
              </div>
            )}
          </Link>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:flex-1 sm:gap-8">
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <Link
                href={`/profiles/${user.username}`}
                className="text-lg font-semibold leading-8 tracking-tight text-gray-900"
              >
                {user.firstName} {user.lastName}
              </Link>

              {user.username && (
                <NewTabLink
                  href={`https://github.com/${user.username}`}
                  className="flex items-center text-gray-400 hover:text-gray-500"
                >
                  <IconBrandGithub className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{user.username}</span>
                </NewTabLink>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm leading-7 text-gray-600">
                {truncateString(profile?.description ?? "")}
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredCategories?.map((category) => (
                  <div
                    key={typeof category === "string" ? category : category.id}
                    className="inline-flex capitalize items-center px-2.5 py-0.5 border border-gray-100 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {typeof category === "string" ? category : category.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href={`/profiles/${user.username}`}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
