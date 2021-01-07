import React, { useState, useEffect } from "react";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, Layout, Menu, Space } from "antd";
import Icon, {
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { history } from "umi";

import { connect } from "dva";

import { adminMenu } from "./config";

import styles from "./index.less";

const { Content, Sider } = Layout;

const BasicLayout = ({ children, location }) => {
  const { pathname } = location;
  let adminMenuKey = "1";

  if (pathname.indexOf("login") !== -1) {
    return children;
  }

  if (pathname.indexOf("admin") !== -1) {
    let item = adminMenu.find((u) => `${u.path}` === `${pathname}`);
    item && (adminMenuKey = `${item.id}`);
  }

  const navTo = (url) => {
    history.push(url);
  };

  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );

  const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

  return (
    <ConfigProvider locale={zhCN}>
      {pathname.indexOf("admin") === -1 ? (
        <div className={styles.layoutMain}>
          <div className={styles.header}>
            <div className={styles.bannerBox}>
              <nav className={styles.navBox}>
                <ul className={styles.menuBox}>
                  <li onClick={() => navTo("/home")}>
                    <Space>
                      <HomeOutlined />
                      首页
                    </Space>
                  </li>
                  <li onClick={() => navTo("/home")}>
                    <Space>
                      <MessageOutlined />
                      留言
                    </Space>
                  </li>
                  <li onClick={() => navTo("/about")}>
                    <Space>
                      <UserOutlined />
                      关于我
                    </Space>
                  </li>
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
          <Content className={styles.mainContent}>{children}</Content>
          <footer className={styles.footer}>
            <p>
              MADE WITH <HeartIcon style={{ color: "hotpink" }} /> BY CHANGLONG
              LIU
            </p>
          </footer>
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
