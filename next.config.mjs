/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack }) => {
    // Optional deps referenced by wagmi/walletconnect that we don't use.
    config.externals.push("pino-pretty", "lokijs", "encoding");
    // Coinbase Base Account pulls in @x402/* payment packages we don't use.
    // Ignore the whole namespace so the connectors barrel resolves cleanly.
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^@x402(\/|$)/ }),
    );
    return config;
  },
};
export default nextConfig;
