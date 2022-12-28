import { useState } from "react";
import type { RouterOutputs} from "../utils/trpc";
import { trpc } from "../utils/trpc";
import { cn, mainTechSlugs } from "../utils/utils";
import { PrimaryButton } from "./button";
import JobCard from "./job-card";

const DEFAULT_VISIBLE_ITEMS = 10;

type JobsType = RouterOutputs["example"]["getAllJobs"];
type JobWithTagsType = JobsType[0];

const JobList: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);

  const { data: jobs } = trpc.example.getAllJobs.useQuery({
    filter: selectedFilter,
    sortByNewest: true,
  });

  return (
    <div>
      {mainTechSlugs?.length > 0 && (
        <div className="py-4">
          <div className="no-scrollbar flex space-x-2 overflow-auto">
            {mainTechSlugs.map((category) => (
              <button
                onClick={() => {
                  setSelectedFilter(category);
                }}
                key={category}
                className={cn(
                  "flex items-center whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm capitalize text-gray-600 shadow-sm transition hover:border-gray-500",
                  selectedFilter === category ? "border-zinc-500" : ""
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="py-2 text-xs text-gray-500">
            Showing {jobs?.length} jobs
          </div>
        </div>
      )}

      {jobs && (
        <>
          <div className="marked-text space-y-8">
            {jobs?.slice(0, visibleItems).map((job: JobWithTagsType) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {visibleItems >= jobs?.length ? null : (
            <div className="my-16 text-center">
              <PrimaryButton
                onClick={() =>
                  setVisibleItems(visibleItems + DEFAULT_VISIBLE_ITEMS)
                }
              >
                Load more projects
              </PrimaryButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobList;
