// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://stargazers.club",
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    sitemap(),
    mdx(),
  ],
});
