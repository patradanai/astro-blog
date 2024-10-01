import { reposities } from '@src/repositories';

export const hygraphService = () => {
	return {
		getBlogs: async () => {
			return reposities.hygraphRepository.getBlogs();
		},
		getBlogBySlug: async (slug: string) => {
			return reposities.hygraphRepository.getBlogBySlug(slug);
		},
	};
};
