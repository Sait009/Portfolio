import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

/** เพิ่ม route ใหม่ตรงนี้เมื่อมีหน้าเพิ่ม */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
