// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://patradanai.com',
	output: 'server',
	adapter: vercel(),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		icon(),
	],
	markdown: {
		rehypePlugins: [],
		remarkPlugins: [],
		syntaxHighlight: "prism",
		gfm: true,
	}
});
