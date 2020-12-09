import proxy from './proxy';

export default {
  title: 'Hi，我是刘昌陇',
  // history: { type: 'hash' },
  hash: true,
  runtimePublicPath: false,
  publicPath: '/',
  outputPath: 'build',
  targets: {
    ie: 11,
  },
  dva: {},
  antd: {},
  proxy: proxy['dev'],
};
