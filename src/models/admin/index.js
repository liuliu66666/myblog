import { message } from "antd";
import {
  onAddTags,
  getTags,
  onStashArticle,
  getArticlelist,
  onDeleteArticle,
  getArticleDetail,
  onPublishArticle,
} from "@/services/admin";

const dataModel = {
  namespace: "adminstore",

  state: {
    articlelist: null,
  },

  effects: {
    // 文章列表
    *getArticlelist({ payload }, { call, put }) {
      const response = yield call(getArticlelist, { ...payload });
      if (response && response.status === 200) {
        yield put({
          type: "setArticlelist",
          payload: response.result,
        });
      } else {
        message.error(response.msg || "查询失败");
      }
      return response;
    },

    // 新增标签
    *getArticleDetail({ payload }, { call, put }) {
      return yield call(getArticleDetail, { ...payload });
    },

    // 新增标签
    *getTags(_, { call, put }) {
      return yield call(getTags);
    },

    // 新增标签
    *onAddTags({ payload }, { call, put }) {
      return yield call(onAddTags, { ...payload });
    },

    // 暂存
    *onStashArticle({ payload }, { call, put }) {
      return yield call(onStashArticle, { ...payload });
    },

    // 发布
    *onPublishArticle({ payload }, { call, put }) {
      return yield call(onPublishArticle, { ...payload });
    },

    // 删除文章
    *onDeleteArticle({ payload }, { call, put }) {
      return yield call(onDeleteArticle, { ...payload });
    },
  },

  reducers: {
    setArticlelist(state, { payload }) {
      return {
        ...state,
        articlelist: payload || [],
      };
    },
  },
};

export default dataModel;
