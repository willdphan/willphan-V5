"use client";

import { DeployButton } from "@/components/deploy";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";
import { ProjectSliderServer } from "@/components/slider/server";
import { cn } from "@/lib/cn";

import { DivideCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export const useTransitionOut = () => {
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  // Listen for custom event from slider
  useEffect(() => {
    const handleTransitionStart = () => {
      setIsTransitioningOut(true);
    };

    window.addEventListener("projectSelected", handleTransitionStart);
    return () =>
      window.removeEventListener("projectSelected", handleTransitionStart);
  }, []);

  return isTransitioningOut;
};

export default function Home() {
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  // Listen for custom event from slider
  useEffect(() => {
    const handleTransitionStart = () => {
      setIsTransitioningOut(true);
    };

    window.addEventListener("projectSelected", handleTransitionStart);
    return () =>
      window.removeEventListener("projectSelected", handleTransitionStart);
  }, []);

  return (
    <div>
      <div>
        <div>
          <div
            className={cn(
              "transition-all duration-700 transform",
              isTransitioningOut && "translate-y-32 opacity-0",
            )}
          >
            <h1>Sylph</h1>
            <h2>Next.js Portfolio Starter</h2>
            <p>
              Sylph is a Next.js Portfolio Starter that you can use to create
              your own portfolio website. It is designed to be minimal,
              lightweight, and fast. It is also highly customizable, so you can
              easily make it your own. Sylph is perfect for developers,
              designers, and other creatives who want to showcase their work. To
              start using Sylph, you can follow the guides below.
            </p>
          </div>
        </div>
        <ProjectSliderServer />
        <Spacer />
      </div>
    </div>
  );
}
