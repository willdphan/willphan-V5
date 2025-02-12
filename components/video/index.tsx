"use client";

import { cn } from "@/lib/cn";
import { useVideoState } from "@/lib/hooks/useVideoState";

interface MDXVideoProps {
  src: string;
  slug: string;
  className?: string;
}

export const MDXVideo = ({ src, slug, className }: MDXVideoProps) => {
  useVideoState(`video-${slug}`);

  return (
    <video
      id={`video-${slug}`}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={cn("w-full h-full object-cover", className)}
      style={{
        viewTransitionName: "project-video",
      }}
    />
  );
};
