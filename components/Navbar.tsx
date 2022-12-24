import { useSession, signIn, signOut } from "next-auth/react";
import Container from "../components/container";
import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "./button";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed top-0 z-10 w-full bg-white">
      <nav className="border-b">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="mr-8 cursor-pointer self-center font-bold text-black"
              >
                JavascriptDevs.com
              </Link>
              <Link href="/">
                <div className=" text-sm font-medium text-slate-600">
                  OSS showcase
                </div>
              </Link>
              <Link href="/who-is-hiring">
                <div className=" text-sm font-medium text-slate-600">
                  Who is hiring?
                </div>
              </Link>
            </div>

            {session?.user?.image ? (
              <div className="flex items-center space-x-4">
                <Image
                  src={session.user.image}
                  width={40}
                  alt="Iser image"
                  height={40}
                  className="h-10 w-10 rounded-full border"
                />
                <SecondaryButton onClick={() => signOut()}>
                  Logout
                </SecondaryButton>
              </div>
            ) : (
              <PrimaryButton onClick={() => signIn("")}>
                Login with Github
              </PrimaryButton>
            )}
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
