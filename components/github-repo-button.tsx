import NewTabLink from "./new-tab-link";
import { SecondaryButton } from "./button";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";

const GithubRepoButton = () => {
  return (
    <NewTabLink href="https://dub.sh/javascriptdevs">
      <UseAnimations
        animation={github}
        size={20}
        onClick={() => {
          // eslint-disable-next-line
          console.log("additional onClick cb is working");
        }}
        render={(eventProps, animationProps) => (
          <SecondaryButton>
            <div
              type="div"
              className="flex items-center space-x-2"
              {...eventProps}
            >
              <div {...animationProps} />
              <p className="text-sm">Source code</p>
            </div>
          </SecondaryButton>
        )}
      />
      {/* <IconBrandGithub className="h-5 w-5 text-black" /> */}
    </NewTabLink>
  );
};

export default GithubRepoButton;
