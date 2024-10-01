import fs from 'fs';
import path from 'path';

import { globby } from 'globby';
import matter from 'gray-matter';

const getPosts = async () => {
	const pathPost = path.join(process.cwd(), 'src', 'contents', '**/*.mdx');
	const posts = await globby([pathPost]);

	return posts.reduce((prev: any[], next) => {
		const fileContents = fs.readFileSync(next, 'utf8');
		const { data, content } = matter(fileContents);
		const getPost = {
			...data,
			content,
			slug: path.basename(next).replace(/\.mdx$/, ''),
		};
		!data.draft && prev.push(getPost);
		return prev;
	}, []);
};

const getPostByPath = async (src: string) => {
	const pathPost = path.join(process.cwd(), 'src', 'contents', src, '*.mdx');
	const posts = await globby([pathPost]);

	return posts.reduce((prev: any[], next) => {
		const fileContents = fs.readFileSync(next, 'utf8');
		const { data, content } = matter(fileContents);
		const getPost = {
			...data,
			content,
			slug: path.basename(next).replace(/\.mdx$/, ''),
		};

		!data.draft && prev.push(getPost);
		return prev;
	}, []);
};

const getPostBySlug = (slug: string) => {
	return new Promise((resolve, reject) => {
		getPosts()
			.then((posts) => {
				const post = posts.find((val) => {
					return val.slug.includes(slug);
				});

				resolve(post);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export { getPosts, getPostBySlug, getPostByPath };
