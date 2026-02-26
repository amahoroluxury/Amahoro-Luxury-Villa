import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.SITE_URL || 'https://www.amahoroluxuryvilla.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/pay-balance/', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
