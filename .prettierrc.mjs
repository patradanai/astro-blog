/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-astro', 'prettier-plugin-import-sort', 'prettier-plugin-tailwindcss'],
	printWidth: 100,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,

	tailwindAttributes: ['classBtn'],
	tailwindFunctions: ['cn'],
};
