import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
  Divider,
  Button,
  Space,
} from "antd";
import { SendOutlined, SaveOutlined } from "@ant-design/icons";
import BraftEditor from "braft-editor";

import "braft-editor/dist/index.css";

import styles from "./index.less";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const controls = [
  "bold",
  "italic",
  "underline",
  "text-color",
  "separator",
  "link",
  "separator",
  "media",
];

const { Search } = Input;
const { Option } = Select;

const Write = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("=========", values);
    console.log('====????',values.content.toHTML())
  };

  return (
    <div className={styles.writeMain}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input maxLength={20} placeholder="请输入标题" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="发布日期"
              name="createTime"
              rules={[{ required: true, message: "请选择发布日期" }]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="标签"
              name="tags"
              rules={[{ required: true, message: "请选择标签" }]}
            >
              <Select
                mode="multiple"
                placeholder="请选择标签"
                style={{ width: "100%" }}
                getPopupContainer={false}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <div style={{ padding: 8 }}>
                      <Search
                        placeholder="请添加标签"
                        maxLength={10}
                        allowClear
                        enterButton="添加"
                      />
                    </div>
                  </div>
                )}
              >
                {OPTIONS.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="文章正文"
              name="content"
              rules={[
                {
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback("请输入正文内容");
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            >
              <BraftEditor
                className={styles.articleEdit}
                placeholder="请输入正文内容"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.footerBtns}>
        <Space>
          <Button type="primary" onClick={() => form?.submit()}>
            <SendOutlined />
            发布
          </Button>
          <Button type="primary" onClick={() => {}}>
            <SaveOutlined />
            暂存
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Write;
