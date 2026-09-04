// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "surgicalworld.org",
//       },
//     ],
//   },
// };

// export default nextConfig;

// Derive the backend's image-serving host from NEXT_PUBLIC_API_URL (the
// same env var the API client uses) instead of hardcoding a production
// domain here, so this config stays correct across environments.
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

let backendImagePattern = null;
try {
  const { protocol, hostname, port } = new URL(apiUrl);
  backendImagePattern = {
    protocol: protocol.replace(":", ""),
    hostname,
    ...(port ? { port } : {}),
    pathname: "/uploads/**",
  };
} catch {
  backendImagePattern = null;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...(backendImagePattern ? [backendImagePattern] : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Local dev fallbacks — kept explicit so local images still load
      // even if NEXT_PUBLIC_API_URL isn't set for some reason.
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;