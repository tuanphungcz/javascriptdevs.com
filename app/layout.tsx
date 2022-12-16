import { IconBrandGithub } from "tabler-icons";
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
            <div className="flex justify-between py-4">
              <div className="self-center font-bold text-black cursor-pointer">
                JavascriptDevs
              </div>

              <NewTabLink
                className=" items-center inline-flex justify-center space-x-2 rounded-xl border bg-white py-2 px-5 transition-all hover:border-gray-400"
                href="https://dub.sh/javascriptdevs"
              >
                <>
                  <IconBrandGithub className="h-5 w-5 text-black" />
                  <p className="text-sm">Star on GitHub</p>
                </>
              </NewTabLink>
            </div>
          </Container>
        </nav>
        <>{children}</>
      </body>
    </html>
  );
}
