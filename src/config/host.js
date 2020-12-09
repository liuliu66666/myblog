export const env = process.env.APP_ENV;

export default {
  local: {
    oahost: '',
    shopv1: '',
    esbhost: '',
    meshost: '',
    pubhost: '',
  },
  dev: {
    oahost: 'http://test.oa.boss.holatek.cn',
    shopv1: 'http://192.168.10.89:9001',
    esbhost: 'http://192.168.10.206',
    meshost: 'http://192.168.9.29:82',
    pubhost: 'https://192.168.10.205:8443',
  },
  test: {
    oahost: 'http://test.oa.boss.holatek.cn',
    shopv1: 'http://192.168.10.89:9001',
    esbhost: 'http://192.168.10.206',
    meshost: 'http://192.168.9.29:82',
    pubhost: 'https://192.168.10.205:8443',
  },
  prod: {
    oahost: 'http://oa.boss.holatek.cn',
    shopv1: 'http://api.oa.holatek.cn',
    esbhost: 'http://192.168.10.206',
    meshost: 'http://192.168.9.29:82',
    pubhost: 'https://192.168.10.205:8443',
  },
};
