"use client";

import { useState } from "react";
import Link from "next/link";

import { GithubLoginButton } from "@/components/GithubLoginButton";
import { Button, Container, NewTabLink } from "@/components/ui";
import { logout } from "@/utils/lucia/auth";
import {
  IconBrandGithub,
  IconChevronDown,
  IconLogout,
  IconMenu2,
} from "@tabler/icons-react";
import classNames from "classnames";
import { Session, User } from "lucia";

interface HeaderProps {
  user: User | null;
  session: Session | null;
}

export const Header = ({ user, session }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b transition-shadow duration-300 bg-white">
      <Container>
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <div
              className="relative cursor-pointer inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpened(!isOpened)}
            >
              <span className="sr-only">Open main menu</span>
              <IconMenu2 size={24} stroke={1.5} />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <div className="flex items-center">
                  <div className="text-xl font-bold cursor-pointer">
                    JavascriptDevs
                  </div>
                  <div>
                    <div className="ml-2 block rounded-full bg-gray-700 px-1.5 py-0.5 text-xs font-semibold text-white">
                      Beta
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {!user ? (
              <div>
                <GithubLoginButton title="Get Started" />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100"
                  >
                    <div className="uppercase sm:hidden h-8 w-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
                      {user?.lastName?.charAt(0)}
                    </div>
                    <span className="hidden sm:block text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                    <IconChevronDown size={12} stroke={1.5} />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpen(false);
                          logout();
                        }}
                      >
                        <IconLogout size={14} stroke={1.5} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      <div
        className={classNames("sm:hidden", {
          hidden: !isOpened,
          shadow: isOpened,
        })}
        id="mobile-menu"
      >
        <div className="space-y-1 pb-4 pt-2">
          <Link
            href="/profiles"
            className="transition-all block border-l-4 border-transparent py-2 pl-8 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Developers
          </Link>

          <div className="flex items-center gap-8 px-8 pt-4">
            <NewTabLink
              href="https://github.com/tuanphungcz/javascriptdevs.com"
              className="inline-flex w-1/2 items-center justify-center rounded-md text-sm font-medium ring-1 ring-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
              <IconBrandGithub className="mr-2 h-4 w-4" />
              GitHub
            </NewTabLink>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
