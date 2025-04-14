export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://gokulabisheak.dev';
  
  // Define your site pages
  const pages = [
    '',
    '/#about',
    '/#experience',
    '/#education',
    '/#skills',
    '/#projects',
    '/#contact',
  ];
  
  // Generate sitemap entries
  const sitemapEntries = pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1.0 : 0.8,
  }));
  
  return sitemapEntries;
} 