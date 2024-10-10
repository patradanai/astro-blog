import type { BlogSchema } from '@src/types/schema';
import type { WithContext, BreadcrumbList, BlogPosting, Person } from 'schema-dts';

/**
 * Generates a BreadcrumbList schema object.
 * @param items - An array of breadcrumb items.
 * @returns A BreadcrumbList schema object.
 */
export const generateBreadcrumbListSchema = (items: { name: string, item: string }[]): WithContext<BreadcrumbList> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item,
        })),
    };
};



/**
 * Generates a BlogPosting schema object.
 * @param blogSchema - The blog schema object.
 * @returns A BlogPosting schema object.
 */
export const generateBlogSchema = (blogSchema: BlogSchema): WithContext<BlogPosting> => {
    const { title, description, url, image, keywords, publishedDate, updatedDate, author } = blogSchema;
    const defaultCreatorName = author;
    const defaultCreator: Person = {
        "@type": "Person",
        "name": defaultCreatorName,
    };  
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        keywords: keywords,
        author: defaultCreator,
        datePublished: publishedDate?.toISOString(),
        ...(updatedDate && {"dateModified": publishedDate?.toISOString()}),
        url: url,
        image: image,
    };
};