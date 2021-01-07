import React, { useState, useEffect, useRef } from "react";
import { Skeleton, Row, Col, Card, Tag, Space } from "antd";
import { history } from "umi";
import { connect } from "dva";
import DPlayer from "dplayer";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const { Meta } = Card;

const Home = ({ dispatch, articleStore, searching }) => {
  const player_dom = useRef();

  // const dp = new DPlayer({
  //   container: document.getElementById("dplayer"),
  //   video: {
  //     url:
  //       "https://apd-2a94d9e8f54dee2a78b12e3abcc04523.v.smtcdns.com/vkp.tc.qq.com/AxUB44eETJRIEPOm1p65bARzMLbvlxSqG0JnaRrTk0T0/uwMROfz2r5zBIaQXGdGnC2dfDma3J1MItM3912IN4IRQvkRM/1CkscyDopBx.mp4?sdtfrom=v1010&guid=626ae5e8f557d18ede0320215b60bc5e&vkey=73EC4BB1F98EF3F7586C09A7A07D46302A09AE3933EC4854A0250773D2EF491ACE262D5DF91A864E4C5108D0F3B8AE9DDF4FE5B23B71E23C462E27A80C97D4546AEAA9293C3B10A3D7EE4451880F9E9C2DFC3830D9043D860E769F06B8748C6A5E58DDCDACB92E93CD9682F8B4987E0E6F3FDD978E514EFD782979CBD602EE83",
  //   },
  // });

  const { articlelist } = articleStore;

  useEffect(() => {
    dispatch({ type: "articleStore/getArticleList" });
    console.log("123123123", player_dom);
    player_dom?.current &&
      new DPlayer({
        container: player_dom?.current,
        video: {
          url: "http://106.13.8.97/static/500miles.mp4",
        },
      });
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
          tagDom = JSON.parse(u.tags).map((o, i) => (
            <Tag color="#87d068" key={i}>
              {o}
            </Tag>
          ));
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
      <div className={styles.vidoeBox} ref={player_dom} />
    </div>
  );
};

export default connect(({ articleStore, loading }) => ({
  articleStore,
  searching: loading.effects["articleStore/getArticleList"],
}))(Home);
