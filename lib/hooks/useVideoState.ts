import { useEffect, useRef } from "react";

export const useVideoState = (videoId: string) => {
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (!video) return;

    // Store current time when unmounting
    return () => {
      timeRef.current = video.currentTime;
    };
  }, [videoId]);

  useEffect(() => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (!video) return;

    // Restore time when mounting
    video.currentTime = timeRef.current;
    video.play().catch(console.error);
  }, [videoId]);
};
