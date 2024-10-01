import type { WrapperGraphResponse } from '@src/types/http';
import type { Blog } from '@src/types/blogs';

import GET_BLOGS from '@src/graphql/queries/blogs';
import GET_BLOG from '@src/graphql/queries/blog';

import { BaseHttp } from './baseHttp';

export abstract class HyGraphRepository {
	abstract getBlogs(): Promise<WrapperGraphResponse<{ blogs: Blog.Response[] }>>;
	abstract getBlogBySlug(slug: string): Promise<WrapperGraphResponse<{ blog: Blog.Response }>>;
}

export class HyGraphRepositoryImpl extends BaseHttp implements HyGraphRepository {
	constructor() {
		super(import.meta.env.PUBLIC_CMS_ENDPOINT, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.PUBLIC_CMS_TOKEN}`,
			},
		});
	}

	async getBlogBySlug(slug: string): Promise<WrapperGraphResponse<{ blog: Blog.Response }>> {
		try {
			return this.post('', {
				query: GET_BLOG,
				variables: {
					slug,
				},
			});
		} catch (error) {
			throw new HttpException(500, 'Internal  server error');
		}
	}

	async getBlogs(): Promise<WrapperGraphResponse<{ blogs: Blog.Response[] }>> {
		try {
			return this.post('', {
				query: GET_BLOGS,
				variables: {},
			});
		} catch (error) {
			throw new HttpException(500, 'Internal  server error');
		}
	}
}
