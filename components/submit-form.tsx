import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IconBrandGithub, IconHome } from "tabler-icons";
import { trpc } from "../utils/trpc";
import { PrimaryButton } from "./button";
import Card from "./card";
import { Input } from "./form";

const INITIAL = {
  githubUrl: "",
  websiteUrl: "",
};

export default function SubmitForm() {
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: INITIAL,
  });

  const mutation = trpc.site.add.useMutation();

  const submit = async (values: { githubUrl: string; websiteUrl: string }) => {
    await mutation.mutate(values, {
      onSuccess: () => {
        console.log("success");
        toast.success("Site successfully submitted");
        reset(INITIAL);
      },
      onError: (error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit(submit)} className="w-full space-y-8">
        <Card className="bg-white sm:rounded">
          <div className="border-b p-8 md:col-span-1">
            <h1 className="text-lg font-medium leading-6 text-gray-900">
              Submit Site
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Submit your site to be featured on JavascriptDevs.com
            </p>
          </div>
          <div className="grid-1 mt-5 grid gap-4 border-b p-8 md:mt-0">
            {defaultBaseInputs.map((input) => {
              const errors = formState.errors as any;
              return (
                <input.component
                  {...input}
                  name={input.id}
                  register={register}
                  control={control}
                  key={input.id}
                  error={errors[input.id]}
                />
              );
            })}
          </div>

          <div className="flex justify-end space-x-4 p-8 ">
            <PrimaryButton type="submit">Update profile</PrimaryButton>
          </div>
        </Card>
      </form>
    </div>
  );
}

const defaultBaseInputs = [
  {
    id: "githubUrl",
    label: "Github Url",
    component: Input,
    placeholder: "https://github.com/tuanphungcz/javascriptdevs.com",
    validation: {
      required: "Please enter your Github Url",
    },
    prefix: <IconBrandGithub className="w-4" />,
  },
  {
    id: "websiteUrl",
    label: "Website Url",
    component: Input,
    placeholder: "https://javascriptdevs.com",
    validation: {
      required: "Please enter your website Url",
    },
    prefix: <IconHome className="w-4" />,
  },
];
