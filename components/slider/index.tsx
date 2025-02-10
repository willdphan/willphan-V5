"use client";

import type { Post } from "@/types/post";

import { cn } from "@/lib/cn";
import { formatter } from "@/lib/formatter";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ProjectSliderProps {
  posts: Post[];
}

export const ProjectSlider = ({ posts = [] }: ProjectSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Add debug logging
  useEffect(() => {
    if (!posts || posts.length === 0) {
      console.warn("ProjectSlider received empty posts array");
      return;
    }
    console.log("ProjectSlider mounted with", posts.length, "posts");
    console.log("First post:", posts[0]);
  }, [posts]);

  // Handle video playback when active slide changes
  useEffect(() => {
    const activeProject = getProjectAtIndex(activeIndex);
    if (activeProject?.media?.video) {
      console.log("Active slide changed to:", activeProject.title);
      // Find the video element and try to play it
      const video = document.querySelector(
        `video[src="${activeProject.media.video}"]`,
      ) as HTMLVideoElement;
      if (video) {
        video.play().catch((e) => console.error("Failed to play video:", e));
      }
    }
  }, [activeIndex]);

  // Base projects that we'll repeat infinitely
  const baseProjects = posts;

  // Validate that we have projects before rendering
  if (!posts || posts.length === 0) {
    console.warn("No projects available to display");
    return null;
  }

  // Helper to get project at any index (positive or negative)
  const getProjectAtIndex = (index: number): Post => {
    if (!baseProjects || baseProjects.length === 0) return {} as Post;
    const normalizedIndex =
      ((index % baseProjects.length) + baseProjects.length) %
      baseProjects.length;
    return baseProjects[normalizedIndex];
  };

  // Get visible range of indices centered around activeIndex
  const getVisibleIndices = () => {
    const range = 10; // number of slides visible on each side
    return Array.from(
      { length: range * 2 + 1 },
      (_, i) => activeIndex - range + i,
    );
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlideWidth = (distance: number) => {
    if (distance === 0) return (600 / containerWidth) * 100;
    if (Math.abs(distance) === 1) return 20;
    if (Math.abs(distance) === 2) return 15;
    if (Math.abs(distance) === 3) return 10;
    if (Math.abs(distance) <= 6) return 8;
    return 5;
  };

  // Calculate absolute position of each slide
  const getSlidePosition = (index: number) => {
    // Guard against division by zero
    if (!containerWidth) {
      return 0; // Return 0 if containerWidth is not yet available
    }

    const indexDiff = index - activeIndex;
    const activeWidthPercent = (600 / containerWidth) * 100;
    const centerPosition =
      containerWidth / 2 - (containerWidth * activeWidthPercent) / 100 / 2;
    let position = centerPosition;

    if (indexDiff < 0) {
      let accumulatedWidth = 0;
      for (let i = -1; i >= indexDiff; i--) {
        accumulatedWidth += (containerWidth * getSlideWidth(i)) / 100;
      }
      position = centerPosition - accumulatedWidth;
    } else if (indexDiff > 0) {
      position = centerPosition + (containerWidth * activeWidthPercent) / 100;
      for (let i = 1; i < indexDiff; i++) {
        position += (containerWidth * getSlideWidth(i)) / 100;
      }
    }

    // Ensure we return a valid number
    return isNaN(position) ? 0 : position;
  };

  return (
    <div className="w-full absolute flex items-center justify-center py-20">
      <div ref={containerRef} className="relative w-full h-[400px]">
        {getVisibleIndices().map((index) => {
          const project = getProjectAtIndex(index);
          const isActive = index === activeIndex;
          const distance = index - activeIndex;
          const position = getSlidePosition(index);

          const hasVideo = project?.media?.video && project.media.video !== "";
          const hasImage = project?.media?.image && project.media.image !== "";

          return (
            <div
              key={index}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 cursor-pointer",
                "transition-all duration-200 ease-out h-[360px]",
              )}
              style={{
                left: position,
                width: `${getSlideWidth(distance)}%`,
                zIndex: isActive ? 10 : Math.abs(distance),
                opacity: Math.max(1 - Math.abs(distance) / 10, 0.05),
              }}
              onClick={() => handleClick(index)}
            >
              <div
                className={cn(
                  "w-full h-full border border-border",
                  "overflow-hidden relative",
                )}
              >
                {hasVideo ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    <video
                      src={project.media?.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : hasImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project?.media?.image || ""}
                      alt={project?.title || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={cn(
                        "object-cover transition-all duration-700",
                        !isActive && "grayscale brightness-50",
                      )}
                      priority={isActive}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-background" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
