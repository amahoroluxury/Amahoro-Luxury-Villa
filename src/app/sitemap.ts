import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.SITE_URL || 'https://www.amahoroluxuryvilla.com';

    const routes = [
        '',
        '/about',
        '/amenities',
        '/book',
        '/contact',
        '/faq',
        '/gallery',
        '/location',
        '/policies',
        '/privacy',
        '/rooms',
        '/reviews',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
