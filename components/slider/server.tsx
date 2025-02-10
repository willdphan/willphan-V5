"use client";

import type { Post } from "@/types/post";

import { ProjectSlider } from "./index";

const projects: Post[] = [
  {
    title: "NAVI",
    slug: "navi",
    content: "",
    summary: "Tour Guide Agent",
    tags: ["TS", "PY", "AI"],
    time: {
      created: "2024-09-01",
      updated: "2024-09-01",
    },
    media: {
      image: "/images/navi-display.jpg",
      video: "",
    },
    author: {
      name: "Will Phan",
    },
  },
  {
    title: "ILYA RECS",
    slug: "ilya-recs",
    content: "",
    summary: "30 recs from Ilya",
    tags: ["TS", "PY", "ML/CV"],
    time: {
      created: "2024-05-01",
      updated: "2024-05-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/ilya-display-2.mp4",
      image: "",
    },
    author: {
      name: "Will Phan",
    },
    related: {
      links: ["https://github.com/willdphan/ilya-papers"],
    },
  },
  {
    title: "PROLLY",
    slug: "prolly",
    content: "Guiding Decisions",
    summary: "Guiding Decisions",
    tags: ["TS", "PY", "AI"],
    time: {
      created: "2024-09-01",
      updated: "2024-09-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/prolly-display.mp4",
    },
  },
  {
    title: "PIQ 03",
    slug: "piq-03",
    content: "Imitation learning Arm",
    summary: "Imitation learning Arm",
    tags: ["PY", "C++", "ML/CV"],
    time: {
      created: "2024-03-01",
      updated: "2024-03-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/piq-display.mp4",
    },
    related: {
      links: ["https://github.com/willdphan/silk-02"],
    },
  },
  {
    title: "SILK 02",
    slug: "silk-02",
    content: "Quadruped with Computer Vision",
    summary: "Quadruped with Computer Vision",
    tags: ["C++", "ML/CV"],
    time: {
      created: "2024-05-01",
      updated: "2024-05-01",
    },
    media: {
      image: "/images/silk-display.png",
    },
    related: {
      links: ["https://github.com/willdphan/silk-02"],
    },
  },
  {
    title: "KITTI SF",
    slug: "kitti-sf",
    content: "Sensor fusion",
    summary: "Sensor fusion",
    tags: ["PY", "ML/CV"],
    time: {
      created: "2023-09-01",
      updated: "2023-09-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/kitti-sf-display.mp4",
    },
    related: {
      links: [
        "https://github.com/willdphan/kitti-sf",
        "https://nbviewer.org/github/willdphan/kitti-sf/blob/main/KITTI_SF.ipynb",
      ],
    },
  },
  {
    title: "CHAR 01",
    slug: "char-01",
    content: "Autonomous Navigation",
    summary: "Autonomous Navigation",
    tags: ["PY", "C++", "ML/CV"],
    time: {
      created: "2024-01-01",
      updated: "2024-01-01",
    },
    media: {
      image: "/images/char-01-display.png",
    },
    related: {
      links: ["https://github.com/willdphan/char-01.git"],
    },
  },
  {
    title: "B&W Scale AI",
    slug: "scale-ai",
    content: "Design practice",
    summary: "Design practice",
    tags: ["Spline", "ML/CV"],
    time: {
      created: "2023-05-01",
      updated: "2023-05-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/scaleai-display.mp4",
    },
  },
  {
    title: "DEGEN",
    slug: "degen",
    content: "NFT stories",
    summary: "NFT stories",
    tags: ["TS", "BLOCKCHAIN"],
    time: {
      created: "2023-05-01",
      updated: "2023-05-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/degen-display-3.mp4",
    },
    related: {
      links: ["https://degen-kappa.vercel.app/"],
    },
    social: {
      twitter: "https://twitter.com/willdphan/status/1660381395947077633?s=20",
    },
  },
  {
    title: "ATOM",
    slug: "atom",
    content: "AI schedule management",
    summary: "AI schedule management",
    tags: ["PY", "ML/CV"],
    time: {
      created: "2023-04-01",
      updated: "2023-04-01",
    },
    media: {
      video:
        "https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom-display-2.mp4",
    },
    related: {
      links: ["https://github.com/willdphan/atom-v2"],
    },
    social: {
      twitter: "https://twitter.com/willdphan/status/1652442555533885441?s=20",
    },
  },
];

export const ProjectSliderServer = () => {
  console.log("Server component rendering with projects:", projects.length);
  return <ProjectSlider posts={projects} />;
};
