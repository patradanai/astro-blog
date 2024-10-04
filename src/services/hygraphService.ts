import { reposities } from '@src/repositories';

export const hygraphService = () => {
	return {
		getBlogs: async (input?:{q: string}) => {
			return reposities.hygraphRepository.getBlogs(input);
		},
		getBlogBySlug: async (slug: string) => {
			return reposities.hygraphRepository.getBlogBySlug(slug);
		},
	};
};
