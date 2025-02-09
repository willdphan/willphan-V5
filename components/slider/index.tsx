"use client";

import { cn } from "@/lib/cn";

import { useEffect, useRef, useState } from "react";

interface Project {
  id: number;
  image: string;
  date: string;
  title: string;
  subtitle: string;
}

const dummyProjects: Project[] = [
  {
    id: 1,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2023.42.13-mFYORPVGUC76j2bFjhxwa4mMCcz5iX.png",
    date: "04.12",
    title: "Clutch",
    subtitle: "2022",
  },
  {
    id: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2023.42.13-mFYORPVGUC76j2bFjhxwa4mMCcz5iX.png",
    date: "04.12",
    title: "Project 2",
    subtitle: "2022",
  },
  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2023.42.13-mFYORPVGUC76j2bFjhxwa4mMCcz5iX.png",
    date: "04.12",
    title: "Project 3",
    subtitle: "2022",
  },
  {
    id: 4,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2023.42.13-mFYORPVGUC76j2bFjhxwa4mMCcz5iX.png",
    date: "04.12",
    title: "Project 4",
    subtitle: "2022",
  },
  {
    id: 5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2023.42.13-mFYORPVGUC76j2bFjhxwa4mMCcz5iX.png",
    date: "04.12",
    title: "Project 5",
    subtitle: "2022",
  },
];

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];

export const ProjectSlider = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Create a circular array by repeating the projects many times
  const repeatedProjects = Array(10).fill(dummyProjects).flat();
  const offset = Math.floor(repeatedProjects.length / 2);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index: number) => {
    const newDirection = index > activeIndex ? "right" : "left";
    setDirection(newDirection);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (direction === "right" && activeIndex >= repeatedProjects.length - 2) {
      setActiveIndex(offset);
    } else if (direction === "left" && activeIndex <= 2) {
      setActiveIndex(repeatedProjects.length - offset);
    }
  }, [activeIndex, direction, offset, repeatedProjects.length]);

  const getSlideWidth = (distance: number) => {
    if (distance === 0) return (600 / containerWidth) * 100; // Convert 576px (w-xl) to percentage of container width
    if (Math.abs(distance) === 1) return 20;
    if (Math.abs(distance) === 2) return 15;
    if (Math.abs(distance) === 3) return 10;
    if (Math.abs(distance) <= 6) return 8;
    return 5;
  };

  const getSlidePosition = (index: number) => {
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
    return position;
  };

  return (
    <div className="w-full absolute flex items-center justify-center py-20">
      <div ref={containerRef} className="relative w-full h-[400px]">
        {repeatedProjects.map((project, index) => {
          const isActive = index === activeIndex;
          const distance = index - activeIndex;
          const position = getSlidePosition(index);
          const isVisible = Math.abs(distance) < 20;

          if (!isVisible) return null;

          return (
            <div
              key={index}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 cursor-pointer",
                "transition-all duration-200 ease-out h-[400px]",
              )}
              style={{
                left: position,
                width: `${getSlideWidth(distance)}%`,
                zIndex: isActive ? 10 : Math.abs(distance),
                opacity: Math.max(1 - Math.abs(distance) / 10, 0.3),
              }}
              onClick={() => handleClick(index)}
            >
              <div
                className={cn(
                  "w-full h-full bg-background",
                  "overflow-hidden relative",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-700",
                    !isActive && "grayscale brightness-50",
                  )}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
