import Image from "next/image";
import { useState } from "react";
import { cn } from "../utils/utils";

function BlurImage({ src }: { src: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="aspect-w-6 aspect-h-4 w-full overflow-hidden rounded-lg border shadow-sm border-gray-300 object-cover">
      <Image
        alt=""
        src={src}
        fill
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        className={cn(
          "object-cover object-top duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-75",
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
