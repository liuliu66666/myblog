import React from "react";
import gfm from "remark-gfm";
import ReactMD from "react-markdown";

import CodeBlock from "../CodeBlock";

const RenderMarkdown = ({ value = "", className }) => {
  return (
    <ReactMD
      className={className}
      plugins={[gfm]}
      children={value}
      escapeHtml={false}
      renderers={{
        code: CodeBlock,
      }}
    />
  );
};

export default RenderMarkdown;
