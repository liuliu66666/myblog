import React, { useEffect, useRef } from "react";
import { Skeleton, Row, Col, Card, Tag, Space } from "antd";

import styles from "./index.less";

const About = () => {
  return (
    <div className={styles.aboutMain}>
      <h2 className={styles.title}>关于CHANGLONG LIU</h2>
      <p className={styles.oneWord}>一个写代码写到没有灵魂的前端小喽啰</p>
      <h2>COMPOSE</h2>
    </div>
  );
};

export default About;
