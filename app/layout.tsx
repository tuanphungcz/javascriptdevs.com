import Link from "next/link";
import { IconBrandGithub } from "tabler-icons";
import { SecondaryButton } from "../components/button";
import Container from "../components/container";
import NewTabLink from "../components/new-tab-link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <nav className="border-b">
          <Container>
            <div className="flex items-center justify-between py-4">
              <Link
                href="/"
                className="self-center font-bold text-black cursor-pointer"
              >
                JavascriptDevs
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
        <>{children}</>
      </body>
    </html>
  );
}
