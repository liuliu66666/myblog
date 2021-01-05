import { message } from "antd";
import { getArticleList, getArticle } from "@/services/blog/aricle";

const dataModel = {
  namespace: "articleStore",

  state: {
    articlelist: null,
    articleData: {},
  },

  effects: {
    *getArticleList(_, { call, put }) {
      const resp = yield call(getArticleList);
      if (resp && resp.status === 200) {
        yield put({
          type: "setArticleList",
          payload: resp.result || [],
        });
      } else {
        message.error(resp.msg || "查询失败");
      }
    },

    *getArticle({ payload }, { call, put }) {
      const resp = yield call(getArticle, { ...payload });
      if (resp && resp.status === 200) {
        yield put({
          type: "setArticle",
          payload: resp.result || {},
        });
      } else {
        message.error(resp.msg || "查询失败");
      }
    },
  },

  reducers: {
    setArticleList(state, { payload }) {
      return {
        ...state,
        articlelist: payload || [],
      };
    },

    setArticle(state, { payload }) {
      return {
        ...state,
        articleData: payload || {},
      };
    },
  },
};

export default dataModel;
