import request from "@/utils/request";

// 文章列表
export async function getArticlelist() {
  return request(`/api/article`);
}

// 文章详情
export async function getArticleDetail({ id }) {
  return request(`/api/article?id=${id}`);
}

// 查询标签
export async function getTags() {
  return request(`/api/article/tags`);
}

// 删除标签
export async function onDeleteTag({ id }) {
  return request(`/api/article/tags?id=${id}`, {
    method: "DELETE",
  });
}

// 新增标签
export async function onAddTags(params) {
  return request(`/api/article/tags`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// 暂存
export async function onStashArticle(params) {
  return request(`/api/article/stash`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// 暂存
export async function onPublishArticle(params) {
  return request(`/api/article/publish`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// 删除文章
export async function onDeleteArticle(params) {
  return request(`/api/article`, {
    method: "DELETE",
    body: JSON.stringify(params),
  });
}
