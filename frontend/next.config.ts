import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  generateBuildId: async () => 'build',
  generateStaticParams: async () => {
    return [
      { slug: '' } // Home page
    ];
  },
  async generateSitemaps() {
    return [
      {
        url: 'https://checkthename.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      }
    ];
  }
};

export default nextConfig;