export namespace Blog {
	export interface Request {}

	export interface Response {
		content: string;
		description: string;
		desktopImage: {
			url: string;
		};
		mobileImage: {
			url: string;
		};
		slug: string;
		title: string;
		metaDescription: {
			isFollow: boolean;
			canonical: string;
			isIndex: boolean;
			keyword: string;
			metaTitle: string;
			metaDescription: string;
			ogType: string;
			ogImage: {
				url: string;
			};
		};
		publishedAt: string;
		publishedBy: { name: string };
		category: {
			name: string;
		}[];
	}
}
