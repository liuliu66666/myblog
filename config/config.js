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
  theme: {
    "@primary-color": "#1DA57A",
  },
  proxy: {
    "/api": {
      target: "http://172.18.19.83:5000",
      changeOrigin: true,
      secure: false,
    },
  },
};
