import request from "@/utils/request";

// 获取文章列表
export async function getArticleList() {
  return request(`/api/blog/article/list`);
}

// 获取文章
export async function getArticle({ id }) {
  return request(`/api/blog/article?id=${id}`);
}
