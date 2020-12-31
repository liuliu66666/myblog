import React, { useState, useEffect } from "react";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, Layout, Menu } from "antd";
import { history } from "umi";

import { connect } from "dva";

import { adminMenu } from "./config";

import styles from "./index.less";

const { Content, Sider } = Layout;

const BasicLayout = ({ dispatch, children, location }) => {
  const { pathname } = location;
  let adminMenuKey = "1";

  if (pathname.indexOf("login") !== -1) {
    return children;
  }

  if (pathname.indexOf("admin") !== -1) {
    let item = adminMenu.find((u) => `${u.path}` === `${pathname}`);
    item && (adminMenuKey = `${item.id}`);
  }

  return (
    <ConfigProvider locale={zhCN}>
      {pathname.indexOf("admin") === -1 ? (
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
                  <div className={styles.avatorBox}></div>
                  <p className={styles.text}>
                    之所以不够优秀，是因为你还不够孤独
                  </p>
                </div>
              </div>
            </div>
          </div>
          {children}
          <footer className={styles.footer}></footer>
        </div>
      ) : (
        <Layout>
          <Sider collapsible>
            <Menu theme="dark" selectedKeys={[adminMenuKey]} mode="inline">
              {adminMenu.map((u) => (
                <Menu.Item
                  key={u.id}
                  icon={u.icon}
                  onClick={() => history.push(u.path)}
                >
                  {u.title}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Content className={styles.adminContent}>
              <div className={styles.adminContentBox}>{children}</div>
            </Content>
          </Layout>
        </Layout>
      )}
    </ConfigProvider>
  );
};

export default connect(({ global }) => ({
  global,
}))(BasicLayout);
