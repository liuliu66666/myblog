import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ value }) => {
  return (
    <SyntaxHighlighter language="" style={monokai}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
