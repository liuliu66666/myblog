import React, { useState, useEffect } from "react";
import { Skeleton, Typography, Space } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import styles from "./index.less";

const { Title } = Typography;

const Article = () => {
  
  useEffect(() => {
    let dom = document.getElementById('article-page')
    dom.scrollIntoView()
  }, [])

  return (
    <div className={styles.articleMain} id='article-page'>
      <div className={styles.topBox}>
        <Title level={2}>h2. Ant Design</Title>
        <Space direction="horizontal" size="large" split={<span>|</span>}>
          <span>
            <CalendarOutlined /> 2020-02-12
          </span>
          <span>
            <UserOutlined /> xxx
          </span>
          <span>
            <FileTextOutlined /> 字数统计 2345
          </span>
        </Space>
        <Skeleton paragraph={{ rows: 20 }} loading={true}>
          <div className={styles.contentMian}>
            {`内容他`.repeat(100)}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Article;
