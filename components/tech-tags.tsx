import Link from "next/link";
import { allTags } from "../utils/utils";
import { cn } from "../utils/utils";
import { trpc } from "../utils/trpc";

const Tag = ({ item, count }: any) => {
  return (
    <Link
      href={`/site/tag/${item}`}
      className={cn(
        "flex cursor-pointer items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium capitalize text-gray-500 shadow-sm transition hover:border-gray-400",
        false === item ? "border-zinc-500 text-gray-600" : ""
      )}
    >
      {item}{" "}
      <span className="ml-2 flex h-5 w-6 items-center justify-center rounded bg-slate-100 text-xs">
        {count}
      </span>
    </Link>
  );
};

export default function TechTags() {
  const { data: tagsWithCount } = trpc.site.getAllTechTagsAndCount.useQuery();
  const { data: categories } = trpc.site.getCategoryCounts.useQuery();

  return (
    <div className="mt-16 mb-8">
      {categories && categories?.length > 0 && (
        <div className="py-4">
          <div className="mb-2 text-[14px] font-semibold uppercase text-gray-600">
            Category
          </div>
          <div className="no-scrollbar flex space-x-2 overflow-auto">
            {categories.map((item) => (
              <Link
                href={`/site/category/${item.category}`}
                key={item.category}
                className={cn(
                  "flex cursor-pointer items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium capitalize text-gray-500 shadow-sm transition hover:border-gray-400",
                  "false" === item.category
                    ? "border-zinc-500 text-gray-600"
                    : ""
                )}
              >
                {item.category}{" "}
                <span className="ml-2 flex h-5 w-6 items-center justify-center rounded bg-slate-100 text-xs">
                  {item._count.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="mb-2 text-[14px] font-semibold uppercase text-gray-600">
        Tech
      </div>
      <div className="no-scrollbar flex space-x-2 overflow-auto">
        {allTags.map((item: string) => (
          <Tag item={item} key={item} count={tagsWithCount?.[item] || ""} />
        ))}
      </div>
    </div>
  );
}
