import React, { useEffect } from "react";
import { Result, message } from "antd";

const NoFound = () => {
  useEffect(() => {
    message.warning("您来到了荒无人烟的地方");
  }, []);
  return <Result status="404" title="您来到了荒无人烟的地方" />;
};

export default NoFound;
