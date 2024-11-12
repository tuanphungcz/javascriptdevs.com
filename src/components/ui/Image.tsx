import { FC } from "react";
import Image from "next/image";

import { cn } from "@/utils/helpers";

interface ResponsiveNextImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const ResponsiveNextImage: FC<ResponsiveNextImageProps> = ({
  src,
  alt = "image",
  className,
}) => {
  if (!src) return null;

  return (
    <Image
      className={cn("w-full h-auto object-cover", className)}
      src={src}
      placeholder="blur"
      blurDataURL={src}
      layout="responsive"
      width={16}
      height={9}
      alt={alt}
      priority
    />
  );
};
