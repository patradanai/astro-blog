export default `
    query Blogs {
        blogs {
            description
            desktopImage {
                url
            }
            mobileImage {
                url
            }
            slug
            title
            metaDescription {
                isFollow
                canonical
                isIndex
                keyword
                metaTitle
                metaDescription
                ogType
                ogImage {
                    url
                }
            }
            publishedAt
            publishedBy {
                name
            }
            category {
                name
            }
        }
    }
`;
