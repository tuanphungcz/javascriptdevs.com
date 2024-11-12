"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateProfile } from "@/_features/profiles/actions";
import { updateUser, updateUserTimezone } from "@/_features/users/actions";
import { getUserTimeZoneInfo } from "@/_features/users/utils";
import {
  MultiSelectField,
  TextareaField,
  TextInputField,
} from "@/components/form";
import { CheckboxGroupField } from "@/components/form/CheckboxGroupField";
import { Button, Container } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCurrencyDollar, IconLoader2 } from "@tabler/icons-react";
import { Profile, ProfilesCategory, User } from "payload-types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  content: z.string().min(2, "Description must be at least 2 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description must be less than 200 characters"),
  githubUrl: z.string().url("Invalid URL"),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  role: z
    .array(z.string())
    .min(1, "Select at least one")
    .max(2, "Select up to 2"),
  openTo: z.array(z.string()),
  technology: z
    .array(z.string())
    .min(1, "Select at least one")
    .max(10, "Select up to 10"),
  timeCapacity: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
  profile: Profile;
  categories: ProfilesCategory[];
}

export const ProfileForm = ({
  user,
  profile,
  categories,
}: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues: ProfileFormData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    description: profile?.description ?? "",
    content: profile?.content ?? "",
    githubUrl: profile?.githubUrl ?? "",
    linkedinUrl: profile?.linkedinUrl ?? "",
    twitterUrl: profile?.twitterUrl ?? "",
    websiteUrl: profile?.websiteUrl ?? "",
    // careerStartYear: profile?.careerStartYear ?? 0,
    // hourlyRate: profile?.hourlyRate ?? 0,

    role:
      profile?.categories
        ?.filter((category: any) => category.subcategory === "role")
        ?.map((category: any) => category.id) ?? [],
    openTo:
      profile?.categories
        ?.filter((category: any) => category.subcategory === "openTo")
        ?.map((category: any) => category.id) ?? [],
    timeCapacity:
      profile?.categories
        ?.filter((category: any) => category.subcategory === "timeCapacity")
        ?.map((category: any) => category.id) ?? [],
    technology:
      profile?.categories
        ?.filter((category: any) => category.subcategory === "technology")
        ?.map((category: any) => category.id) ?? [],
  };

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ProfileFormData>({
    defaultValues,
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!user?.timezone) {
      const { timezone, timezoneOffset } = getUserTimeZoneInfo();

      updateUserTimezone({
        timezone,
        timezoneOffset,
      });
    }
  }, [user?.id, user?.timezone]);

  const onSubmitForm = (values: ProfileFormData) => {
    startTransition(async () => {
      const [userUpdateResult, profileUpdateResult] = await Promise.all([
        updateUser({
          firstName: values.firstName,
          lastName: values.lastName,
        }),
        updateProfile({
          content: values.content,
          description: values.description,
          githubUrl: values.githubUrl,
          linkedinUrl: values.linkedinUrl,
          twitterUrl: values.twitterUrl,
          websiteUrl: values.websiteUrl,
          categories: [
            ...values.role,
            ...values.openTo,
            ...values.technology,
            ...(values.timeCapacity ?? []),
          ],
        }),
      ]);

      if (!userUpdateResult.success || !profileUpdateResult.success) {
        toast.error("Failed to update profile.");
      } else {
        toast.success("Profile updated successfully.");
        router.push(`/profiles/${user.username}`);
      }
    });
  };

  const getCategoryOptions = (subcategory: string) => {
    return categories
      .filter((category: any) => category.subcategory === subcategory)
      .sort((a: any, b: any) => a.name.localeCompare(b.name))

      .map((subcategory: any) => ({
        label: subcategory.label,
        value: subcategory.id,
      }));
  };

  return (
    <Container size="xl" className="mt-32">
      <form
        className="space-y-10 divide-y divide-gray-900/10 mb-16"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              Let&apos;s make your user stand out. Provide key information about
              yourself.
            </div>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Profile Photo
                  </label>

                  <div className="mt-2 space-y-4">
                    <div className="space-x-4 flex">
                      <div className="w-full h-16 max-w-16 rounded-full overflow-hidden">
                        {typeof user?.avatar === "object" &&
                          user?.avatar?.url && (
                            <img
                              src={user.avatar.url}
                              alt="Current profile photo"
                              className="w-full h-full object-cover rounded-full"
                            />
                          )}
                      </div>

                      <div className="space-y-2">
                        <Button
                          type="button"
                          disabled
                          className="max-w-32 cursor-not-allowed rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm"
                        >
                          Change photo
                        </Button>
                        <div className="text-xs text-gray-500">
                          Profile photo changes are currently disabled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <TextInputField
                    name="firstName"
                    control={control}
                    label="First Name"
                    placeholder="John Doe"
                    description="Your professional name as you'd like it to appear"
                    withAsterisk
                  />
                </div>

                <div className="col-span-full sm:col-span-3">
                  <TextInputField
                    name="lastName"
                    control={control}
                    label="Last Name"
                    placeholder="John Doe"
                    description="Your professional name as you'd like it to appear"
                    withAsterisk
                  />
                </div>

                {/* <div className="col-span-full sm:col-span-3">
                  <TextInputField
                    name="hourlyRate"
                    control={control}
                    label="Hourly Rate"
                    description="Your hourly rate"
                    type="number"
                    leftSection={<IconCurrencyDollar size={16} />}
                    withAsterisk
                  />
                </div> */}

                {/* <div className="col-span-full sm:col-span-3">
                  <TextInputField
                    name="careerStartYear"
                    control={control}
                    label="Career Start Year"
                    description="When did you begin your professional journey?"
                    type="number"
                  />
                </div> */}

                <div className="col-span-full">
                  <TextInputField
                    name="description"
                    control={control}
                    label="Headline"
                    placeholder="Senior Full Stack Developer - React, Node.js"
                    description="A brief description of your professional role"
                    withAsterisk
                  />
                </div>
                <div className="col-span-full">
                  <TextareaField
                    name="content"
                    control={control}
                    label="About me"
                    description="Tell us something."
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                color="dark"
                type="submit"
                className="w-auto text-white font-semibold rounded-md transition duration-300 ease-in-out"
                disabled={isPending || !isValid}
              >
                {isPending && (
                  <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                <span>{isPending ? "Updating..." : "Save Changes"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Work preference
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              Share your work preference
            </div>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <MultiSelectField
                    name="role"
                    control={control}
                    label="Professional Role(s)"
                    placeholder="Select role(s)"
                    defaultOptions={getCategoryOptions("role")}
                    description="Choose the roles that best describe your expertise"
                    withAsterisk
                  />
                </div>

                <div className="col-span-full">
                  <MultiSelectField
                    name="technology"
                    control={control}
                    label="Technologies"
                    placeholder="Select technologies"
                    defaultOptions={getCategoryOptions("technology")}
                    description="Highlight your key technical skills"
                    withAsterisk
                  />
                </div>

                <div className="col-span-full">
                  <CheckboxGroupField
                    name="timeCapacity"
                    control={control}
                    label="Time Capacity"
                    description="Select the types of opportunities you're interested in"
                    options={getCategoryOptions("timeCapacity")}
                    columns={2}
                  />
                </div>

                <div className="col-span-full">
                  <CheckboxGroupField
                    name="openTo"
                    control={control}
                    label="Open To"
                    description="Select the types of opportunities you're interested in"
                    options={getCategoryOptions("openTo")}
                    columns={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                color="dark"
                type="submit"
                className="w-auto text-white font-semibold rounded-md transition duration-300 ease-in-out"
                disabled={isPending || !isValid}
              >
                {isPending && (
                  <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                <span>{isPending ? "Updating..." : "Save Changes"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Online Presence
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              Connect with your network by sharing your professional online
              users.
            </div>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <TextInputField
                    name="githubUrl"
                    control={control}
                    label="GitHub user"
                    placeholder="https://github.com/yourusername"
                    readOnly={!!profile.githubUrl}
                    disabled={!!profile.githubUrl}
                    withAsterisk
                  />
                </div>

                <div className="col-span-full">
                  <TextInputField
                    name="linkedinUrl"
                    control={control}
                    label="LinkedIn user"
                    placeholder="https://www.linkedin.com/in/yourusername"
                  />
                </div>

                <div className="col-span-full">
                  <TextInputField
                    name="twitterUrl"
                    control={control}
                    label="Twitter user"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>

                <div className="col-span-full">
                  <TextInputField
                    name="websiteUrl"
                    control={control}
                    label="Personal Website"
                    placeholder="https://www.yourwebsite.com"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Button
                color="dark"
                type="submit"
                className="w-auto text-white font-semibold rounded-md transition duration-300 ease-in-out"
                disabled={isPending || !isValid}
              >
                {isPending && (
                  <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                <span>{isPending ? "Updating..." : "Save Changes"}</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};
