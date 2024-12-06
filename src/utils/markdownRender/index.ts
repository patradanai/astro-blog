import hljs from 'highlight.js';
import { marked, type RendererObject, type MarkedExtension } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { markedSmartypants } from 'marked-smartypants';

interface Toc {
	anchor: string;
	level: number;
	text: string;
}

export const serializeMarkdown = async (
	content: string,
	markdownExtension: MarkedExtension[] = [],
) => {
	let toc: Toc[] = [];

	const renderer: RendererObject = {
		heading(args): string {
			// Only H2
			if (args.depth === 2) {
                const anchor = args.text.toLowerCase().replace(/[^\w]+/g, '-');

                toc.push({
                    anchor: anchor,
                    level: args.depth,
                    text: args.text,
                });
            }
			const text = this.parser.parseInline(args.tokens);

			return `
                <h${args.depth} id="${args.text.toLowerCase().replace(/[^\w]+/g, '-')}">
                  ${text}
                </h${args.depth}>`;
		},
    image({href, text, title}): string {
      const imageTitle = title ? `<figcaption class="text-center">${title}</figcaption>` : '';
			return `
				<figure>
					<img src="${href}" alt="${text}" />
					${imageTitle}
				</figure>`;
      },
	};

	marked.use(
		markedSmartypants(),
		markedHighlight({
			async: true,
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			},
		}),
		...markdownExtension,
		{ gfm: true, renderer },
	);
	const contentRender = await marked.parse(content);

	return { contentRender, toc };
};
