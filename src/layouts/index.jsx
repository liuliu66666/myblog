import React, { useState, useEffect } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const BasicLayout = ({ dispatch, children, location }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.layoutMain}>
        <div className={styles.header}>
          <div className={styles.bannerBox}>
            <nav className={styles.navBox}>
              <ul className={styles.menuBox}>
                <li>首页</li>
                <li>留言</li>
              </ul>
            </nav>
            <div className={styles.bannerBg}>
              <p className={styles.slogan}>Hi~,打工人</p>
              <div className={styles.mineBox}>
                <div className={styles.avatorBox}>

                </div>
                <p className={styles.text}>之所以不够优秀，是因为你还不够孤独</p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </ConfigProvider>
  );
};

export default connect(({ global }) => ({
  global,
}))(BasicLayout);
