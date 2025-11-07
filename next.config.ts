/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hwmtzmgmbijmgwewyalf.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com", // اگه آیکون هم داری
      },
    ],
  },
};

module.exports = nextConfig;
