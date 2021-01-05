import React, { useState, useEffect } from "react";
import { Skeleton, Typography, Space, Tag } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { connect } from "dva";

import RenderMarkdown from "@/components/RenderMarkdown";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const { Title } = Typography;

const Article = ({ dispatch, articleStore, location, searching }) => {
  const { articleData } = articleStore;
  let tagDom = <div />;
  useEffect(() => {
    const { query } = location;
    let dom = document.getElementById("article-page");
    setTimeout(() => {
      dom.scrollIntoView();
    }, 100);

    dispatch({
      type: "articleStore/getArticle",
      payload: { id: query.id },
    });
  }, []);

  if (!isEmpty(articleData.tags)) {
    tagDom = JSON.parse(articleData.tags).map((o, i) => (
      <Tag color="cyan" key={i}>
        {o}
      </Tag>
    ));
  }

  return (
    <div className={styles.articleMain} id="article-page">
      <div className={styles.topBox}>
        <Title level={2}>{articleData?.title || "--"}</Title>
        <Space direction="horizontal" size="large" split={<span>|</span>}>
          <span>
            <CalendarOutlined />{" "}
            {!isEmpty(articleData.createTime)
              ? moment(articleData.createTime).format("YYYY-MM-DD HH:mm:ss")
              : "--"}
          </span>
          <span>
            <UserOutlined /> {articleData?.author || "--"}
          </span>
          <span>{tagDom}</span>
        </Space>
      </div>
      <Skeleton paragraph={{ rows: 20 }} loading={searching}>
        <div className={styles.contentMian}>
          <RenderMarkdown value={articleData.content} />
        </div>
      </Skeleton>
    </div>
  );
};

export default connect(({ articleStore, loading }) => ({
  articleStore,
  searching: loading.effects["articleStore/getArticle"],
}))(Article);
