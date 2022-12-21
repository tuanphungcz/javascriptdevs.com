"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "../utils/utils";

function BlurImage({ src }: { src: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="border w-full overflow-hidden rounded-lg object-cover bg-gray-200 aspect-w-6 aspect-h-8">
      <Image
        alt=""
        src={src}
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
  );
}

export default BlurImage;
