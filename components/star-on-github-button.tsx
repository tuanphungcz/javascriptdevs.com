import NewTabLink from "../components/new-tab-link";
import { SecondaryButton } from "../components/button";
import { IconBrandGithub } from "tabler-icons";

const StartOnGithubButton = () => {
  return (
    <NewTabLink href="https://dub.sh/javascriptdevs">
      <SecondaryButton>
        <div className="flex space-x-2">
          <IconBrandGithub className="h-5 w-5 text-black" />
          <p className="text-sm">Star on GitHub</p>
        </div>
      </SecondaryButton>
    </NewTabLink>
  );
};

export default StartOnGithubButton;
