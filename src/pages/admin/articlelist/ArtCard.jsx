import React, { useState, useEffect } from "react";
import { Space, Button, Tag, Row, Col, Card } from "antd";

import styles from "./index.less";

const { Meta } = Card;

const ArtCard = ({ data, onDelete, onEdit, onPublish, onRemove }) => {
  const renderType = (type) => {
    if (type === "STASH") {
      return <Tag color="cyan">未发布</Tag>;
    } else {
      return <Tag color="magenta">已发布</Tag>;
    }
  };
  return (
    <div className={styles.listCardBox}>
      <div className={styles.contentBox}>
        <Card
          style={{ width: 250 }}
          size="small"
          cover={
            <div className={styles.imgBox}>
              {data?.coverUrl && <img src={data.coverUrl} alt="cover" />}
            </div>
          }
          actions={[
            data.type === "STASH" ? (
              <Button
                size="small"
                type="primary"
                onClick={() => onPublish && onPublish(data)}
              >
                发布
              </Button>
            ) : (
              <Button
                danger
                size="small"
                type="primary"
                onClick={() => onRemove && onRemove(data)}
              >
                撤下
              </Button>
            ),
            <Button
              size="small"
              type="primary"
              onClick={() => onEdit && onEdit(data.id)}
            >
              编辑
            </Button>,
            <Button
              danger
              size="small"
              type="primary"
              onClick={() => onDelete && onDelete(data.id)}
            >
              删除
            </Button>,
          ]}
        >
          <Meta
            title={data?.title || "--"}
            description={<Space>{data?.type && renderType(data.type)}</Space>}
          />
        </Card>
      </div>
    </div>
  );
};

export default ArtCard;
