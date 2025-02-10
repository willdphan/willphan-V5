"use client";

import type { Post } from "@/types/post";

import { cn } from "@/lib/cn";
import { formatter } from "@/lib/formatter";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useTransitionOut } from "../screens/home";

interface ProjectSliderProps {
  posts: Post[];
}

export const ProjectSlider = ({ posts = [] }: ProjectSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>(
    {},
  );

  const router = useRouter();

  // Add the transition hook
  const isPageTransitioningOut = useTransitionOut();

  // Add debug logging
  useEffect(() => {
    if (!posts || posts.length === 0) {
      console.warn("ProjectSlider received empty posts array");
      return;
    }
    console.log("ProjectSlider mounted with", posts.length, "posts");
    console.log("First post:", posts[0]);
  }, [posts]);

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
    const project = getProjectAtIndex(index);

    if (index === activeIndex) {
      // Trigger exit animation before navigation
      if (project.slug) {
        setIsTransitioningOut(true);
        // Dispatch custom event for text animation on home.tsx page
        window.dispatchEvent(new Event("projectSelected"));
        setTimeout(() => {
          router.push(`/examples/${project.slug}`);
        }, 700); // Match the transition duration
      }
    } else {
      setActiveIndex(index);
    }
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

  // Add effect to control video playback
  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video.closest(`[data-index="${activeIndex}"]`)) {
        video.play().catch((e) => console.log("Video play error:", e));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  const getSlideWidth = (distance: number) => {
    if (distance === 0) return (600 / containerWidth) * 100;
    if (Math.abs(distance) === 1) return 20;
    if (Math.abs(distance) === 2) return 15;
    if (Math.abs(distance) === 3) return 10;
    if (Math.abs(distance) <= 6) return 8;
    return 5;
  };

  // Modify getSlidePosition to handle exit animation
  const getSlidePosition = (index: number) => {
    if (!containerWidth) {
      return 0;
    }

    const indexDiff = index - activeIndex;
    const activeWidthPercent = (600 / containerWidth) * 100;
    const centerPosition =
      containerWidth / 2 - (containerWidth * activeWidthPercent) / 100 / 2;
    let position = centerPosition;

    // During exit animation, collapse slides from both sides towards the center
    if (isTransitioningOut) {
      const absoluteCenter = containerWidth / 2;
      if (indexDiff === 0) {
        return absoluteCenter - (containerWidth * activeWidthPercent) / 100 / 2; // Center the active slide
      }

      // Calculate collapse position based on which side the slide is on
      if (indexDiff < 0) {
        // Slides on the left move right
        return absoluteCenter - 100 + Math.abs(indexDiff) * 5;
      } else {
        // Slides on the right move left
        return absoluteCenter + 100 - indexDiff * 5;
      }
    }

    // Normal positioning logic for non-transitioning state
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

    return isNaN(position) ? 0 : position;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
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
              data-index={index}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 cursor-pointer",
                "transition-all duration-700 cubic-bezier(0.05, 0.7, 0.1, 1.0) h-[360px]",
              )}
              style={{
                left: position,
                width: `${getSlideWidth(distance)}%`,
                zIndex: isActive ? 10 : Math.abs(distance),
                opacity: isTransitioningOut
                  ? isActive
                    ? 1
                    : 0
                  : Math.max(1 - Math.abs(distance) / 10, 0.05),
              }}
              onClick={() => handleClick(index)}
            >
              <div
                className={cn(
                  "w-full h-full border-transparent border-2",
                  "overflow-hidden relative",
                )}
              >
                {hasVideo ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    <video
                      src={project.media?.video}
                      autoPlay={isActive}
                      loop
                      muted
                      playsInline
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        !isActive && "grayscale brightness-50",
                      )}
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

      {/* Project details below carousel */}
      <div
        className={cn(
          "mt-0 w-full max-w-[600px]",
          "transform transition-all duration-700",
          isTransitioningOut || isPageTransitioningOut
            ? "-translate-y-32 opacity-0"
            : "translate-y-0 opacity-100",
        )}
      >
        <div className="flex justify-between items-center w-full">
          <p className="font-[400] tracking-widest pt-4 text-[12px] uppercase leading-none">
            {getProjectAtIndex(activeIndex)?.title}
          </p>
          <p className="font-[400] tracking-widest pt-4 text-[12px] uppercase leading-none text-[#6A6A72]">
            {getProjectAtIndex(activeIndex)?.time?.created}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="pt-1 font-[400] text-[#6A6A72] uppercase tracking-widest text-[12px] leading-normal">
            {getProjectAtIndex(activeIndex)?.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
