import Link from "next/link";
import { PrimaryButton } from "../components/button";

export default function Custom404() {
  return (
    <div className="text-center pt-16">
      <h1 className="text-3xl mb-8">404 - Page Not Found</h1>
      <PrimaryButton>
        <Link href="https://javascriptdevs.com/">Go back</Link>
      </PrimaryButton>
    </div>
  );
}
