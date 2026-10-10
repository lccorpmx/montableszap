import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      // Tailwind para el CSS global. Los *.module.css quedan fuera: con `as: "*.css"`
      // Turbopack los trataría como CSS global y perderían el scope de CSS Modules.
      "*.css": {
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
