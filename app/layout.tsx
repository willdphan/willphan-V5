import "@/styles/main.css";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  ...OpenGraph,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <Providers>
          <main className="mx-auto max-w-screen-sm py-24 md:overflow-x-visible px-6">
            <article className="article">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}
