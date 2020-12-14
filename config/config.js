import proxy from './proxy';

export default {
  title: 'jmgo',
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
