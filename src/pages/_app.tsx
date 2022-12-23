import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Container from "../components/container";
import Link from "next/link";
import NewTabLink from "../components/new-tab-link";
import { SecondaryButton } from "../components/button";
import { IconBrandGithub } from "tabler-icons";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div>
        <nav className="border-b">
          <Container>
            <div className="flex items-center justify-between py-4">
              <Link
                href="/"
                className="cursor-pointer self-center font-bold text-black"
              >
                JavascriptDevs.com
              </Link>

              <NewTabLink href="https://dub.sh/javascriptdevs">
                <SecondaryButton>
                  <div className="flex space-x-2">
                    <IconBrandGithub className="h-5 w-5 text-black" />
                    <p className="text-sm">Star on GitHub</p>
                  </div>
                </SecondaryButton>
              </NewTabLink>
            </div>
          </Container>
        </nav>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
