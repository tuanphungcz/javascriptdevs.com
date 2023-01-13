import {
  Input,
  TextArea,
  MultiSelectInput,
  SingleSelectInput,
} from "../components/form";
import Card from "../components/card";
import NewTabLink from "./new-tab-link";
import { Button } from "@mantine/core";
import {
  roleLevel,
  roles,
  technologies,
  workType,
  yearsOfExp,
  searchStatus,
} from "./multi-select-form-options";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconHome,
} from "@tabler/icons";
import { IconGlobe } from "tabler-icons";

const socialInputs = [
  {
    id: "linkedin",
    label: "Linkedin",
    prefix: <IconBrandLinkedin className="w-4" />,
    placeholder: "username",
    helper: "Your linkedin profile url",
  },
  {
    id: "website",
    label: "Website",
    prefix: <IconHome className="w-4" />,
    placeholder: "username",
    helper: "Your website url",
  },

  {
    id: "githubUrl",
    label: "Github",
    prefix: <IconBrandGithub className="w-4" />,
    placeholder: "website",
    helper: "Your githubUrl url",
  },

  {
    id: "twitterUrl",
    label: "Twitter",
    prefix: <IconBrandTwitter className="w-4" />,
    placeholder: "username",
    helper: "Your twitter profile url",
  },
];

const defaultBaseInputs = [
  {
    id: "name",
    label: "Name",
    component: Input,
    placeholder: "John Doe",
    helper: "Your real name",
  },
  {
    id: "heroName",
    label: "Hero Name",
    component: Input,
    placeholder: "Senior Full stack developer - React, Nodejs",
    helper: "Hero name that will be visible publicly",
  },
  {
    id: "bio",
    label: "Bio",
    description: "Tell us a little about yourself",
    component: TextArea,
  },

  {
    id: "image",
    label: "Profile image",
    component: Input,
    placeholder: "https://images.unsplash.com/....",
    helper: "Paste here your profile image url",
  },
  {
    id: "workPreference",
    label: "Work type",
    component: Input,
    helper: "What is your work preference",
    data: workType,
    placeholder: "Full-time, Part-time, Freelance",
  },
  {
    id: "roleSeniority",
    label: "Seniority",
    component: Input,
    helper: "What is your seniority",
    data: roleLevel,
    placeholder: "What is your seniority",
  },

  {
    id: "searchStatus",
    label: "Visibility",
    component: Input,
    placeholder: "Visible",
    data: searchStatus,
    helper: "What is the role you are looking for",
  },
  {
    id: "country",
    label: "Country",
    component: Input,
    placeholder: "Visible",
    data: searchStatus,
    helper: "What is the role you are looking for",
  },
  {
    id: "city",
    label: "City",
    component: Input,
    placeholder: "Visible",
    data: searchStatus,
    helper: "What is the role you are looking for",
  },
];

export default function EditForm({
  profile,
  register,
  handleSubmit,
  formState,
  setValue,
  session,
  onSubmitForm,
  control,
}: any) {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="space-y-8">
          <Card>
            <div className="mb-4 md:col-span-1">
              <h3 className="text-xl font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information is the most prominent information displayed
                publicly on your profile.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              {defaultBaseInputs.map((input: any) => (
                <input.component
                  {...input}
                  label={input.label}
                  name={input.id}
                  register={register}
                  key={input.id}
                  error={formState?.errors[input.id]}
                  setValue={setValue}
                  placeholder={input?.placeholder || ""}
                  helper={input?.helper || ""}
                  control={control}
                />
              ))}
            </div>
          </Card>

          <Card className="bg-white px-4 py-5 sm:rounded sm:p-6">
            <div className="mb-4 md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Online presence
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Where are you active on the web?
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              {socialInputs.map((input) => (
                <Input
                  {...input}
                  label={input.label}
                  name={input.id}
                  register={register}
                  key={input.id}
                  error={formState?.errors[input.id]}
                  setValue={setValue}
                  prefix={input?.prefix || ""}
                />
              ))}
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            {profile?.slug && (
              <NewTabLink href={`http://${profile?.slug}.javascriptdevs.com`}>
                <Button variant="default" color="dark">
                  Preview Profile
                </Button>
              </NewTabLink>
            )}

            <Button
              color="dark"
              type="submit"
              className="bg-black"
              disabled={!session}
            >
              {profile?.email ? "Update profile" : " Create Profile"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
