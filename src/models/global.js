import { getNhData } from "@/services/global";

const globalModel = {
  namespace: "global",

  state: {},

  effects: {
    *getNhData({ payload }, { call, put }) {
      return yield call(getNhData, { ...payload });
    },
  },

  reducers: {},
};

export default globalModel;
