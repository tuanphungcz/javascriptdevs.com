"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogType } from "../types/supabase";
import { cn } from "../utils/utils";

function BlurImage({ blog }: { blog: BlogType }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/personal-site/${blog.id}`} className="group">
      {blog?.imageUrl && (
        <div className="aspect-w-1 border aspect-h-1 w-full overflow-hidden rounded-lg object-cover bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt=""
            src={blog.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            className={cn(
              "duration-700 ease-in-out object-cover group-hover:opacity-75 object-top group-hover:scale-110",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      )}
      {blog.websiteUrl && (
        <h3 className="mt-4 text-sm text-gray-700">
          {blog.websiteUrl.replace(/^https:\/\/|\/$/g, "")}
        </h3>
      )}
      <p className="mt-1 text-lg font-medium text-gray-900">{blog.name}</p>
    </Link>
  );
}

export default BlurImage;
