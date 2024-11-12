import Link from "next/link";

import { Container, NewTabLink } from "@/components/ui";
import { getCategoryOptions } from "@/utils/helpers";
import { validateRequest } from "@/utils/lucia/lucia";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBriefcase,
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { Profile, User } from "payload-types";

interface ProfileDetailProps {
  user: User;
  profile: Profile;
}

export const ProfileDetail = async ({ profile, user }: ProfileDetailProps) => {
  const { user: currentUser } = await validateRequest();

  const socials = [
    {
      name: "Website",
      url: profile?.websiteUrl,
      icon: IconWorld,
      previewUrl: profile?.websiteUrl
        ?.replace(`https://`, "")
        ?.replace(/^www\./, ""),
    },
    {
      name: "Github",
      url: profile?.githubUrl,
      icon: IconBrandGithub,
      previewUrl: profile?.githubUrl
        ?.replace(`https://`, "")
        ?.replace(/^www\./, "")
        .replace(`github.com/`, ""),
    },
    {
      name: "Linkedin",
      role: profile?.linkedinUrl,
      icon: IconBrandLinkedin,
      url: profile?.linkedinUrl,
      previewUrl: profile?.linkedinUrl
        ?.replace(`https://`, "")
        .replace(/^www\./, "")
        .replace(`linkedin.com/in/`, ""),
    },

    {
      name: "Twitter",
      url: profile?.twitterUrl,
      icon: IconBrandTwitter,
      previewUrl: profile?.twitterUrl
        ?.replace(/^www\./, "")
        .replace(`https://`, "")
        .replace(`twitter.com/`, ""),
    },
  ];

  const roles = getCategoryOptions({
    subcategory: "role",
    categories: profile.categories,
  });

  const technologies = getCategoryOptions({
    subcategory: "technology",
    categories: profile.categories,
  });

  const timeCapacity = getCategoryOptions({
    subcategory: "timeCapacity",
    categories: profile.categories,
  });

  const openTo = getCategoryOptions({
    subcategory: "openTo",
    categories: profile.categories,
  });

  return (
    <div>
      <div className="w-full h-48 border-b bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
      <Container className="flex-grow" size="md">
        <div className="flex items-end justify-between -mt-12 sm:-mt-16 sm:flex sm:space-x-5">
          <div className="relative flex">
            {typeof user.avatar === "object" &&
            user.avatar !== null &&
            "url" in user.avatar ? (
              <img
                className="object-cover w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={user.avatar.url as string}
                alt={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-gray-300 text-gray-600 text-3xl font-semibold">
                {user.firstName ? user.firstName[0].toUpperCase() : ""}
              </div>
            )}
          </div>
          <div>
            {currentUser?.email === user?.email && (
              <div className="flex justify-center pt-5">
                <Link
                  href="/profile/edit"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer whitespace-nowrap hover:border"
                >
                  Update my profile
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="pb-8 space-y-8">
          <div className="flex-1 block min-w-0 mt-4">
            <dd className="text-gray-600 flex items-center gap-4 mb-2">
              {user.firstName} {user.lastName}
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                Available
              </span>
            </dd>

            <h1 className="text-2xl font-bold text-gray-900 truncate ">
              {profile?.description}
            </h1>
          </div>

          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 xs:grid-cols-2">
            {profile?.careerStartYear && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Years of Experience
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconCalendarEvent
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    {new Date().getFullYear() - profile.careerStartYear} years
                  </div>
                </dd>
              </div>
            )}

            {roles && roles.length !== 0 && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Interested roles
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconBriefcase
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    {roles.map((item: any) => item.label).join(", ")}
                  </div>
                </dd>
              </div>
            )}

            {timeCapacity && timeCapacity.length !== 0 && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Time Capacity
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconClock
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    {timeCapacity.map((item: any) => item.label).join(", ")}
                  </div>
                </dd>
              </div>
            )}

            {openTo && openTo.length !== 0 && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Open To</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconUsers
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    {openTo.map((item: any) => item.label).join(", ")}
                  </div>
                </dd>
              </div>
            )}

            {user?.timezone && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconMapPin
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    {user.timezone}
                  </div>
                </dd>
              </div>
            )}

            {user?.timezoneOffset && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center text-sm">
                    <IconClock
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />{" "}
                    UTC/GMT {(Number(user.timezoneOffset) / 60) * -1 > 0 && "+"}
                    {(Number(user.timezoneOffset) / 60) * -1}
                  </div>
                </dd>
              </div>
            )}
          </dl>

          {profile.content && (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="text-sm font-bold text-gray-500">About</div>
                <div className="mt-1 space-y-5 text-sm text-gray-900 whitespace-pre-wrap">
                  {profile.content}
                </div>
              </div>
            </dl>
          )}

          {technologies && technologies.length !== 0 && (
            <div>
              <div className="text-sm font-bold text-gray-500">
                Technologies
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech: any) => (
                  <span
                    key={tech.id}
                    className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {socials && socials.length !== 0 && (
            <div>
              <div className="text-sm font-bold text-gray-500">Socials</div>
              <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                {socials.map(
                  (social) =>
                    social?.url && (
                      <NewTabLink
                        href={social.url}
                        key={social.url + social.name}
                        className="flex items-center px-4 py-4 space-x-3 bg-white border border-gray-300 rounded shadow-sm cursor-pointer hover:border-gray-400"
                      >
                        <div className="">
                          <div className="p-2 rounded-full">
                            <social.icon size={32} className="text-gray-700" />
                          </div>
                        </div>
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {social.name}
                          </div>
                          <div className="overflow-hidden text-sm text-gray-500 truncate max-w-[200px]">
                            {social.previewUrl}
                          </div>
                        </div>
                      </NewTabLink>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
