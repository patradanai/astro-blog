import defaultTheme from 'tailwindcss/defaultTheme';
import defaultColors from 'tailwindcss/colors';

function withOpacityValue(variable) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variable}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${variable}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${variable}))`;
	};
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			container: {
				padding: {
					DEFAULT: '1rem',
					'2xl': '2rem',
				},
			},
			fontFamily: {
				kanit: ['Kanit', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				...defaultColors,
				primary: withOpacityValue('--color-primary'),
				secondary: withOpacityValue('--color-secondary'),
				success: '#206521',
				warning: '#FBBF24',
				error: '#EF4444',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
                        color: theme('colors.black'),
                        h1: { color: theme('colors.red.600') },
                        h2: { color: theme('colors.red.600') },
                        h3: { color: theme('colors.black') },
                        h4: { color: theme('colors.black') },
                        h5: { color: theme('colors.black') },
                        h6: { color: theme('colors.black') },
                    },
				},
			  }),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
