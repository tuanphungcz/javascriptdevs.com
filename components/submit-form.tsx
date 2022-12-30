import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PrimaryButton } from "./button";
import Card from "./card";
import { Input } from "./form";

const INITIAL = {
  githubUrl: "",
  websiteUrl: "",
};

export default function SubmitForm() {
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: INITIAL,
  });

  const submit = async (values: any) => {
    console.log("success", values);
    toast.success("Profile saved successfully");
  };

  return (
    <>
      <div className="mx-auto max-w-xl">
        <div className=" mb-32 space-y-8 pt-16">
          <form onSubmit={handleSubmit(submit)} className="w-full space-y-8">
            <Card className="bg-white sm:rounded">
              <div className="border-b p-8 md:col-span-1">
                <div className="text-lg font-medium leading-6 text-gray-900">
                  Profile Information
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  This information will be displayed publicly
                </div>
              </div>
              <div className="grid-1 mt-5 grid gap-4 border-b p-8 md:mt-0">
                {defaultBaseInputs.map((input: any) => (
                  <input.component
                    {...input}
                    name={input.id}
                    register={register}
                    control={control}
                    key={input.id}
                    error={formState?.errors[input.id]}
                  />
                ))}
              </div>

              <div className="flex justify-end space-x-4 p-8 ">
                <PrimaryButton type="submit">Update profile</PrimaryButton>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}

const defaultBaseInputs = [
  {
    id: "githubUrl",
    label: "Github Url",
    component: Input,
    placeholder: "",
  },
  {
    id: "websiteUrl",
    label: "Website Url",
    component: Input,
    placeholder: "",
  },
];
