/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local files only — everything is served from /public.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
