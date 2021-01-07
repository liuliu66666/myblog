import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { history } from "umi";
import { connect } from "dva";

import styles from "./index.less";

const Login = ({ dispatch, logining }) => {
  const onFinish = (values) => {
    dispatch({ type: "global/onLogin", payload: { ...values } }).then((res) => {
      if (res && res.status === 200) {
        // message.success(res.msg);
        history.push("/admin");
      } else {
        message.error(res.msg);
      }
    });
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
    <div className={styles.loginBox}>
      <Spin spinning={!!logining}>
        <div className={styles.formBox}>
          <h2>帐户登录</h2>
          <Form name="basic" onFinish={onFinish}>
            <Form.Item
              label=""
              name="username"
              rules={[{ required: true, message: "请输入账号!" }]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button block type="primary" htmlType="submit" shape="round">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  logining: loading.effects["global/onLogin"],
}))(Login);
