export default {
  title: "jmgo",
  // history: { type: 'hash' },
  hash: true,
  runtimePublicPath: false,
  publicPath: "/",
  outputPath: "build",
  targets: {
    ie: 11,
  },
  dva: {},
  antd: {},
  proxy: {
    "/portal": {
      target: "https://b2c.csair.com",
      changeOrigin: true,
      secure: false,
    },
  },
};
