import { useState } from "react";
import { cn } from "../utils/utils";
import { PrimaryButton } from "./button";
import { formatDistance, subDays } from "date-fns";
import { convert } from "html-to-text";
import type { JobTag } from "@prisma/client";
import type { RouterOutputs } from "../utils/trpc";

const MAX_ITEM_TEXT = 500;

type JobsType = RouterOutputs["example"]["getAllJobs"];
type JobWithTagsType = JobsType[0];

const JobCard = ({ job }: { job: JobWithTagsType }) => {
  const markedItemText = job.text;
  const exceedsLimit = markedItemText.length >= MAX_ITEM_TEXT;
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  const text = convert(markedItemText, {
    wordwrap: 80,
  });

  const title = text.split("\n")[0];
  const formattedDate = formatDistance(
    subDays(new Date(), 3),
    new Date(job.firebaseCreatedAt)
  );

  return (
    <>
      <div className="rounded-lg border border-gray-300 p-8">
        <div className="mb-2 sm:flex sm:items-baseline sm:justify-between">
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-sm text-gray-500">{formattedDate} ago</div>
        </div>
        <div className="no-scrollbar flex space-x-2 overflow-auto">
          {job.jobTags?.slice(0, 8).map((item: JobTag) => (
            <div
              key={item.id}
              className={cn(
                "whitespace-nowrap rounded-md border border-zinc-200 px-1 py-0.5 text-xs capitalize text-gray-600 shadow-sm"
              )}
            >
              {item.slug}
            </div>
          ))}
        </div>

        <div className="relative">
          <div
            className={cn(
              "mt-8 space-y-6 break-words text-sm text-gray-600",
              !expanded ? "max-h-[140px] overflow-hidden" : ""
            )}
            dangerouslySetInnerHTML={{ __html: markedItemText }}
          />
          {exceedsLimit && !expanded && (
            <div className="absolute bottom-0 h-8 w-full bg-gradient-to-b from-transparent to-white" />
          )}
        </div>
        {exceedsLimit && (
          <div className="-mb-4 flex justify-end">
            <PrimaryButton onClick={() => toggleExpanded()}>
              {expanded ? "Show less" : "Show more"}
            </PrimaryButton>
          </div>
        )}
      </div>
    </>
  );
};

export default JobCard;
