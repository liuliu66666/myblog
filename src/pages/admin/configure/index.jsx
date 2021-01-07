import React, { useState, useEffect, useRef } from "react";
import {
  Skeleton,
  Card,
  Space,
  Table,
  Button,
  Popconfirm,
  Input,
  Modal,
  message,
} from "antd";
import { history } from "umi";
import { connect } from "dva";
import DPlayer from "dplayer";

import { isEmpty } from "@/utils/utils";

import styles from "./index.less";

const { confirm } = Modal;

const Configure = ({ dispatch, tagsloading }) => {
  let tagValue = "";
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    dispatch({ type: "adminstore/getTags" }).then(({ result }) => {
      setTagsData(result || []);
    });
  };

  const onAddTag = () => {
    confirm({
      icon: null,
      title: "新增标签",
      content: (
        <Input
          autoComplete="off"
          onChange={({ target }) => (tagValue = target.value)}
          placeholder="请输入文字"
          maxLength={10}
          allowClear
        />
      ),
      onOk: () => {
        if (!isEmpty(tagValue)) {
          dispatch({
            type: "adminstore/onAddTags",
            payload: {
              text: tagValue.trim(),
            },
          })
            .then((res) => {
              if (res.status === 200) {
                getTags();
              } else {
                message.error(res.msg || "新增失败");
              }
              tagValue = "";
            })
            .catch(() => (tagValue = ""));
        } else {
          message.warning("请输入文字");
        }
      },
      onCancel: () => {
        tagValue = "";
      },
    });
  };

  const onDelTag = (id) => {
    dispatch({ type: "adminstore/onDeleteTag", payload: { id } }).then(
      (res) => {
        if (res.status === 200) {
          message.success(res.msg);
          getTags();
        } else {
          message.error(res.msg);
        }
      }
    );
  };

  const tagCols = [
    {
      title: "序号",
      dataIndex: "idx",
      render: (t, r, idx) => idx + 1,
      width: 50,
    },
    {
      title: "名称",
      dataIndex: "text",
    },
    {
      title: (
        <Button type="primary" size="small" onClick={onAddTag}>
          新增
        </Button>
      ),
      dataIndex: "oprate",
      width: 50,
      render: (t, r) => (
        <Popconfirm
          placement="top"
          title={"是否确认删除"}
          onConfirm={() => onDelTag(r.id)}
          okText="是"
          cancelText="否"
        >
          <Button danger type="link" size="small">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <Card title="文章所属标签" size="small" type="inner">
        <Table
          rowKey={(rowKey) => rowKey.id}
          bordered
          loading={tagsloading}
          style={{ width: 500 }}
          pagination={{ hideOnSinglePage: true }}
          size="small"
          columns={tagCols}
          dataSource={tagsData}
        />
      </Card>
    </div>
  );
};

export default connect(({ adminstore, loading }) => ({
  adminstore,
  tagsloading: loading.effects["adminstore/getTags"],
}))(Configure);
