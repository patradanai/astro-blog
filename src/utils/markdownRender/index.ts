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
				const anchor = args.text.toLowerCase().replace(/[^\p{L}\p{M}\d]+/gu, '-');

				toc.push({
					anchor: anchor,
					level: args.depth,
					text: args.text,
				});
			}
			const text = this.parser.parseInline(args.tokens);

			return `
                <h${args.depth} id="${args.text.toLowerCase().replace(/[^\p{L}\p{M}\d]+/gu, '-')}">
                  ${text}
                </h${args.depth}>`;
		},
		image({ href, text, title }): string {
			const imageTitle = title ? `<figcaption class="text-center">${title}</figcaption>` : '';
			return `
				<figure>
					<img src="${href}" alt="${text}" />
					${imageTitle}
				</figure>`;
		},
		code({ text, escaped, lang }): string {
			const hljsClass = lang ? `language-${lang}` : '';
			const toolbar = `
                <div class="code-toolbar">
                    <div class="toolbar">
                        <div class="toolbar-item"></div>
                        <div class="toolbar-item"></div>
                        <div class="toolbar-item"></div>
                    </div>
                </div>
            `;

			return `
                <figure class="code-block">
                    ${toolbar}
					<button class="copy-button">
                        <span class="icon">📋</span> Copy
                    </button>
                    <div><pre><code class="hljs ${hljsClass}">${escaped ? text : escape(text)}</code></pre></div>
                </figure>
            `;
		},
	};

	marked.use(
		markedSmartypants(),
		markedHighlight({
			async: true,
			langPrefix: 'hljs language-',
			highlight(code, lang, _info) {
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


// Helper function to escape HTML
function escape(html: string): string {
	return html
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}