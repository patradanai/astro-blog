import { hygraphService } from "@src/services/hygraphService";

export async function GET() {
    const siteUrl = import.meta.env.PUBLIC_CMS_SITE;
    const { data } = await hygraphService().getBlogs();

    const result = `  
  <?xml version="1.0" encoding="UTF-8"?>  
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  
    <url><loc>${siteUrl}/</loc></url>  
    <url><loc>${siteUrl}/posts/</loc></url>  
    ${data.blogs
      .map((post) => {
        const lastMod = (new Date(post.publishedAt)).toISOString();
        return `<url><loc>${siteUrl}/${post.slug}/</loc><lastmod>${lastMod}</lastmod></url>`;
      })
      .join('\n')}  
  </urlset>  
    `.trim();
   
    return new Response(result, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }