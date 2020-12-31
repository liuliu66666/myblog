import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  message,
  Spin,
} from "antd";
import { SendOutlined, SaveOutlined, EyeOutlined } from "@ant-design/icons";
import { connect } from "dva";
import moment from "moment";

import RenderMarkdown from "@/components/RenderMarkdown";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const { Search, TextArea } = Input;
const { Option } = Select;

const Write = ({ dispatch, stashing, searching, submiting, location }) => {
  const [form] = Form.useForm();

  const [artId, setArtId] = useState(null);
  const [isShow, setShow] = useState(false);
  const [ctContent, setContent] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    getTags();
    const { id } = location.query;
    if (id) {
      setArtId(id);
      dispatch({
        type: "adminstore/getArticleDetail",
        payload: { id },
      }).then((res) => {
        if (res && res.status === 200) {
          let data = { ...res.result };
          if (!isEmpty(data.coverUrl)) {
            setImgUrl(data.coverUrl);
          }
          data = {
            ...data,
            tags: JSON.parse(data.tags),
            createTime: data.createTime ? moment(data.createTime) : undefined,
          };
          form && form.setFieldsValue({ ...data });
        }
      });
    }
  }, []);

  const getTags = () => {
    dispatch({ type: "adminstore/getTags" }).then(({ result }) => {
      setTagsData(result || []);
      setTagValue("");
    });
  };

  const onFinish = (values) => {
    let params = { ...values };
    if (params.createTime) {
      params.createTime = params.createTime.format("YYYY-MM-DD HH:mm:ss");
    }

    dispatch({
      type: "adminstore/onPublishArticle",
      payload: { id: artId, ...params },
    }).then((res) => {
      if (res.status === 200) {
        message.success("发布成功");
      } else {
        message.error(res.msg);
      }
    });
  };

  // 预览图片
  const onPreImg = () => {
    const url = form.getFieldValue("coverUrl");
    if (!/\.(gif|jpg|jpeg|png|GIF|JPEG|JPG|PNG)$/.test(url)) {
      message.warning(
        "上传的所有文件必须是【.gif、.jpeg、.jpg、.png】类型的图片!"
      );
      setImgUrl("");
      return false;
    } else {
      setImgUrl(url);
    }
  };

  // 预览内容
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

  // 新增标签
  const onAddTags = () => {
    if (!isEmpty(tagValue)) {
      dispatch({
        type: "adminstore/onAddTags",
        payload: {
          text: tagValue,
        },
      }).then((res) => {
        if (res.status === 200) {
          getTags();
        } else {
          message.error(res.msg || "新增失败");
        }
      });
    }
  };

  // 暂存
  const onStash = () => {
    const result = form.getFieldValue();
    let params = {
      id: artId,
      title: "",
      content: "",
      tags: [],
      coverUrl: "",
      type: "STASH",
      ...result,
    };

    if (params.createTime) {
      params.createTime = params.createTime.format("YYYY-MM-DD HH:mm:ss");
    }

    dispatch({
      type: "adminstore/onStashArticle",
      payload: { ...params },
    }).then((res) => {
      if (res.status === 200) {
        message.success("暂存成功");
      } else {
        message.error("暂存失败");
      }
    });
  };

  return (
    <Spin spinning={!!stashing || !!searching}>
      <div className={styles.writeMain}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input autoComplete="off" placeholder="请输入标题" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="发布日期"
                name="createTime"
                rules={[{ required: true, message: "请选择发布日期" }]}
              >
                <DatePicker
                  format={"YYYY-MM-DD HH:mm:ss"}
                  showTime
                  style={{ width: "100%" }}
                />
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
                  onDropdownVisibleChange={() => setTagValue("")}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div style={{ padding: 8 }}>
                        <Input
                          autoComplete="off"
                          onChange={({ target }) => setTagValue(target.value)}
                          value={tagValue}
                          placeholder="请添加标签"
                          maxLength={10}
                          allowClear
                          addonAfter={
                            <Button
                              size="small"
                              type="primary"
                              onClick={onAddTags}
                            >
                              添加
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  )}
                >
                  {tagsData.map((u) => (
                    <Option key={u.id} value={u.text}>
                      {u.text}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="封面图片"
                name="coverUrl"
                rules={[{ required: true, message: "请上传封面图片" }]}
              >
                <Input autoComplete="off" placeholder="请复制图片地址到此处" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={onPreImg}>
                预览
              </Button>
            </Col>
            <Col span={12}>
              <div className={styles.uploadImg}>
                {!isEmpty(imgUrl) && <img src={imgUrl} alt="coverUrl" />}
              </div>
            </Col>
            <Col span={24}>
              <Form.Item
                label="文章正文"
                name="content"
                rules={[{ required: true, message: "请输入正文内容" }]}
              >
                <TextArea
                  autoComplete="off"
                  placeholder="请输入正文内容"
                  style={{
                    fontSize: 16,
                    fontFamily: null,
                    backgroundColor: "#f8f8f8",
                  }}
                  autoSize={{ minRows: 20, maxRows: 20 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={styles.footerBtns}>
          <Space>
            <Button
              type="primary"
              onClick={onPreview}
              disabled={submiting || stashing}
            >
              <EyeOutlined />
              预览
            </Button>
            <Button
              type="primary"
              onClick={() => form?.submit()}
              disabled={submiting || stashing}
            >
              <SendOutlined />
              发布
            </Button>
            <Button
              type="primary"
              onClick={onStash}
              disabled={submiting || stashing}
            >
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
          bodyStyle={{ padding: 0 }}
          onCancel={() => setShow(false)}
          footer={null}
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
    </Spin>
  );
};

export default connect(
  ({ adminstore, loading }) => ({
    adminstore,
    stashing: loading.effects["adminstore/onStashArticle"],
    searching: loading.effects["adminstore/getArticleDetail"],
    submiting: loading.effects["adminstore/onPublishArticle"],
  }),
  null,
  null,
  { forwardRef: true }
)(Write);
