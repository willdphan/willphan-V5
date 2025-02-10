import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  images: {
    domains: [
      "images.unsplash.com",
      "pub-33c643825c664d0091b84d7ae37a5150.r2.dev",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-33c643825c664d0091b84d7ae37a5150.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Configure video content
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  // Any other Next.js configurations
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
