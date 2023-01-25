const withLess = require("next-with-less");

module.exports = withLess({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/category",
        destination: "/",
        permanent: true,
      },
    ];
  },
});
