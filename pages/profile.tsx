import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import EditForm from "../components/edit-form";
import Container from "../components/container";
import { prisma } from "../server/db/client";

import timeZoneCityToCountry from "../tz-cities-to-countries.json";

let userRegion: any;
let userCity: any;
let userCountry: any;
let userTimeZone;

const timeZoneCity = timeZoneCityToCountry as any;

if (Intl) {
  userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzArr = userTimeZone.split("/");
  userRegion = tzArr[0];
  userCity = tzArr[tzArr.length - 1];
  userCountry = timeZoneCity[userCity];
}

const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "";

const date = new Date();
const timezoneOffset = date?.getTimezoneOffset()?.toString() || "";

console.log("Time Zone:", userTimeZone);
console.log("Region:", userRegion);
console.log("City:", userCity);
console.log("Country:", userCountry);

export default function Index({ profile, session }: any) {
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      ...profile,
      country: userCountry,
      city: userCity,
    },
  });
  const router = useRouter();

  const onSubmitForm = async (values: any) => {
    const config: AxiosRequestConfig = {
      url: profile?.email ? "api/update-profile" : "/api/create-profile",
      data: { ...values, timezone, timezoneOffset },
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    if (res.status === 200) {
      router.reload();
    }
  };

  const editFormProps = {
    profile,
    register,
    handleSubmit,
    setValue,
    watch,
    onSubmitForm,
    session,
    control,
  };

  return (
    <div>
      <div className="bg-gray-100 pt-24 pb-16">
        <Container>
          <div className="flex justify-center lg:space-x-8">
            <EditForm {...editFormProps} />
          </div>
        </Container>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const profile = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    select: {
      id: true,
      // name: true,
      // email: true,
      // image: true,
      // bio: true,
      // twitterUrl: true,
      // githubUrl: true,
    },
  });

  return {
    props: {
      session,
      profile,
    },
  };
};
