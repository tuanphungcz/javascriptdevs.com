"use client";

import { Button } from "@/components/ui";
import { login } from "@/utils/lucia/auth";
import { IconBrandGithub } from "@tabler/icons-react";

export const GithubLoginButton = ({
  title = "Get started",
}: {
  title?: string;
}) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div
        onClick={(e) => {
          e.preventDefault();
          login({ provider: "github" });
        }}
      >
        <Button>
          <div className="flex items-center space-x-2">
            <IconBrandGithub className="w-5 h-5" />
            <div>{title}</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
