import Image from "next/image";
import { useState } from "react";
import { cn } from "../utils/utils";

function BlurAvatar({ src }: { src: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="h-8 w-8 overflow-hidden relative rounded-full border shadow-sm border-gray-300 object-cover">
      <Image
        alt=""
        src={src}
        fill
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        className={cn(
          "object-cover object-top duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-75 rounded-full",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}

export default BlurAvatar;
