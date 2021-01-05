import React, { useEffect } from "react";
import { Space, Divider, Modal, message, Result, Spin, Skeleton } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import QueueAnim from 'rc-queue-anim';
import { connect } from "dva";
import { history } from "umi";
import moment from "moment";

import ArtCard from "./ArtCard";

import { isEmpty } from "@/utils/utils";

const { confirm } = Modal;

const ArticleList = ({ dispatch, adminstore, stashing }) => {
  const { articlelist } = adminstore;

  useEffect(() => {
    getArticlelist();
  }, []);

  const getArticlelist = () => {
    dispatch({ type: "adminstore/getArticlelist" });
  };

  // 删除
  const onDelete = (id) => {
    confirm({
      title: "是否删除该文章",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        dispatch({
          type: "adminstore/onDeleteArticle",
          payload: { id },
        }).then((res) => {
          if (res.status === 200) {
            message.success("删除成功");
            getArticlelist();
          } else {
            message.error(res.msg || "删除失败");
          }
        });
      },
    });
  };

  const onEdit = (id) => {
    history.push(`/admin/write?id=${id}`);
  };

  // 发布
  const onPublish = (data) => {
    if (data.createTime) {
      data.createTime = moment(data.createTime).format("YYYY-MM-DD HH:mm:ss");
    }
    dispatch({
      type: "adminstore/onPublishArticle",
      payload: { ...data },
    }).then((res) => {
      if (res.status === 200) {
        message.success("发布成功");
        getArticlelist();
      } else {
        message.error(res.msg);
      }
    });
  };

  // 撤回
  const onRemove = (data) => {
    if (data.createTime) {
      data.createTime = moment(data.createTime).format("YYYY-MM-DD HH:mm:ss");
    }
    dispatch({
      type: "adminstore/onStashArticle",
      payload: { ...data },
    }).then((res) => {
      if (res.status === 200) {
        message.success("撤回成功");
        getArticlelist();
      } else {
        message.error("撤回失败");
      }
    });
  };

  const renderList = (arr = null) => {
    if (arr === null) {
      return <Skeleton active />;
    } else if (!arr.length) {
      return <Result status="404" title="暂无数据" />;
    } else {
      return (
        <Space
          style={{ width: "100%", flexWrap: "wrap" }}
          split={<Divider style={{ margin: 0 }} />}
        >
          {articlelist.map((u) => (
            <ArtCard
              key={u.id}
              data={u}
              onDelete={onDelete}
              onEdit={onEdit}
              onPublish={onPublish}
              onRemove={onRemove}
            />
          ))}
        </Space>
      );
    }
  };

  return (
    <Spin spinning={!!stashing}>
      <div>{renderList(articlelist)}</div>
    </Spin>
  );
};

export default connect(
  ({ adminstore, loading }) => ({
    adminstore,
    stashing: loading.effects["adminstore/onStashArticle"],
  }),
  null,
  null,
  { forwardRef: true }
)(ArticleList);
