import { devLogin, getUserInfo, getToken } from '@/services/global';

const globalModel = {
  namespace: 'global',

  state: {},

  effects: {
    *getToken(_, { call, put }) {
      return yield call(getToken);
    },
    
    *devLogin(_, { call, put }) {
      yield call(devLogin);
    },

    *getUserInfo(_, { call, put }) {
      return yield call(getUserInfo);
    },
  },

  reducers: {},
};

export default globalModel;
