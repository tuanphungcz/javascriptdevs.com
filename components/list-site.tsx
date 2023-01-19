import { useId, useState } from "react";
import { PrimaryButton } from "./button";
import type { Site } from "@prisma/client";
import ListItem from "./list-item";

const DEFAULT_VISIBLE_ITEMS = 12;

export default function ListSite({ sites }: { sites: Site[] }) {
  const id = useId();
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);

  return (
    <div className="mx-auto">
      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
        {sites?.slice(0, visibleItems).map((site: Site) => (
          <ListItem site={site} key={id} />
        ))}
      </div>
      {sites && visibleItems >= sites?.length ? null : (
        <div className="my-16 text-center">
          <PrimaryButton
            onClick={() => {
              return setVisibleItems(visibleItems + DEFAULT_VISIBLE_ITEMS);
            }}
          >
            Load more projects
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
