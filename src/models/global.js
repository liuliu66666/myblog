import { onLogin } from "@/services/global";

const globalModel = {
  namespace: "global",

  state: {},

  effects: {
    *onLogin({ payload }, { call, put }) {
      return yield call(onLogin, { ...payload });
    },
  },

  reducers: {},
};

export default globalModel;
