/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static export if you're using <Image />
  },
  trailingSlash: true, // Optional: adds trailing slash to URLs
};

export default nextConfig;
