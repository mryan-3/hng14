import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['[IP_ADDRESS]', 'http://localhost:3000', '10.10.1.216']
};

export default nextConfig;
