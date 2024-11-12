import React from "react";
import Link from "next/link";

import { IconChevronRight, IconHome } from "@tabler/icons-react";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({
  items,
}) => {
  return (
    <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-1 md:space-x-3">
      {items.map((item, index) => (
        <div key={index} className="inline-flex items-center">
          {index > 0 && (
            <IconChevronRight className="w-4 h-4 mr-2 text-gray-500" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="inline-flex items-center text-sm font-medium transition-colors hover:text-gray-600 text-gray-800"
            >
              {index === 0 && (
                <IconHome className="w-4 h-4 mr-2 text-gray-500" />
              )}
              {item.label}
            </Link>
          ) : (
            <div className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
              {item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
