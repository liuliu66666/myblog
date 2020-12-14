import React, { useState, useEffect } from "react";
import { Skeleton, Row, Col, Card } from "antd";
import { history } from 'umi'
import styles from "./index.less";

const { Meta } = Card;

const testData = [];

(function mockData() {
  for (let i = 0; i < 50; i++) {
    testData.push({
      id: i + 1,
      coverImg: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      title: `标题${i + 1}`,
      content: `内容${i + 1}`.repeat(10),
      tags: ['222','333']
    });
  }
})();

const Home = () => {
  const renderCard = (arr = []) => {
    return arr.map((u) => (
      <Col key={u.id} span={6} style={{ marginBottom: 20 }}>
        <Card
          hoverable
          onClick={() => history.push(`/article?id=${u.id}`)}
          style={{ width: "100%" }}
          cover={
            <div className={styles.artImgBox}>
              <img alt={u.title} src={u.coverImg} />
            </div>
          }
        >
          <Meta title={u.title} description={u.content} />
        </Card>
      </Col>
    ));
  };

  return (
    <div className={styles.homeMain}>
      <Skeleton paragraph={{ rows: 10 }} title={false} loading={false}>
        <Row gutter={16}>{renderCard(testData)}</Row>
      </Skeleton>
    </div>
  );
};

export default Home;
