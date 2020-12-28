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
  Card,
  Modal,
  message,
} from "antd";
import { SendOutlined, SaveOutlined } from "@ant-design/icons";

import RenderMarkdown from "@/components/RenderMarkdown";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const { Search, TextArea } = Input;
const { Option } = Select;

const Write = () => {
  const [form] = Form.useForm();
  const [isShow, setShow] = useState(false);
  const [ctContent, setContent] = useState("");

  const onFinish = (values) => {
    console.log("=========", values);
    console.log("====????", values.content.toHTML());
  };

  const onPreview = () => {
    const ct = form.getFieldValue("content");
    if (isEmpty(ct)) {
      message.warning("请先输入正文");
    } else {
      setContent(ct);
      setTimeout(() => {
        setShow(true);
      }, 300);
    }
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
              rules={[{ required: true, message: "请输入正文内容" }]}
            >
              <Card
                title={<h4>MARKDOWN</h4>}
                size="small"
                extra={
                  <Button size="small" type="link" onClick={onPreview}>
                    预览
                  </Button>
                }
              >
                <TextArea
                  placeholder="请输入正文内容"
                  style={{
                    fontSize: 16,
                    fontFamily: null,
                    backgroundColor: "#f8f8f8",
                  }}
                  autoSize={{ minRows: 20, maxRows: 20 }}
                />
              </Card>
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
      <Modal
        title="预览"
        centered
        width={1000}
        visible={isShow}
        destroyOnClose={true}
        forceRender={true}
        maskClosable={false}
        closable={false}
        bodyStyle={{ padding: 0 }}
        footer={
          <Button type="primary" onClick={() => setShow(false)}>
            关闭
          </Button>
        }
      >
        <div
          style={{
            width: "100%",
            height: "80vh",
            overflowY: "auto",
            padding: 20,
          }}
        >
          <RenderMarkdown value={ctContent} />
        </div>
      </Modal>
    </div>
  );
};

export default Write;
