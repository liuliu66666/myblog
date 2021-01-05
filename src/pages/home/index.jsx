import React, { useState, useEffect } from "react";
import { Skeleton, Row, Col, Card, Tag, Space } from "antd";
import { history } from "umi";
import { connect } from "dva";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const { Meta } = Card;

const Home = ({ dispatch, articleStore, searching }) => {
  const { articlelist } = articleStore;

  useEffect(() => {
    dispatch({ type: "articleStore/getArticleList" });
  }, []);

  const renderCard = (arr = null) => {
    if (arr === null) {
      return <Skeleton active />;
    } else if (!arr.length) {
      return <Result status="404" title="暂无数据" />;
    } else {
      return arr.map((u) => {
        let tagDom = <div />;
        if (!isEmpty(u.tags)) {
          tagDom = JSON.parse(u.tags).map((o, i) => <Tag color="#87d068" key={i}>{o}</Tag>);
        }
        return (
          <Col key={u.id} span={6} style={{ marginBottom: 20 }}>
            <Card
              hoverable
              onClick={() => history.push(`/article?id=${u.id}`)}
              style={{ width: "100%" }}
              cover={
                <div className={styles.artImgBox}>
                  <img alt={u.title} src={u.coverUrl} />
                </div>
              }
            >
              <Meta title={u.title} description={<Space>{tagDom}</Space>} />
            </Card>
          </Col>
        );
      });
    }
  };

  return (
    <div className={styles.homeMain}>
      <Skeleton paragraph={{ rows: 10 }} title={false} loading={false}>
        <Row gutter={16}>{renderCard(articlelist)}</Row>
      </Skeleton>
    </div>
  );
};

export default connect(({ articleStore, loading }) => ({
  articleStore,
  searching: loading.effects["articleStore/getArticleList"],
}))(Home);
