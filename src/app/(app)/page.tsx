import { redirect } from "next/navigation";

import { APP_URL } from "@/constants";
import { getMetadata } from "@/utils/getMetadata";

export async function generateMetadata() {
  const url = `${APP_URL}`;

  return getMetadata({
    title: "JavascriptDevs.com - explore javascript developers",
    description: "explore javascript developers",
    url,
  });
}

const Homepage = async () => {
  redirect("/profiles");
};

export default Homepage;
