import {
  BankOutlined,
  UnorderedListOutlined,
  FormOutlined,
} from "@ant-design/icons";

const adminMenu = [
  {
    id: 1,
    title: "首页",
    icon: <BankOutlined />,
    path: "/admin",
  },
  {
    id: 2,
    title: "文章列表",
    icon: <UnorderedListOutlined />,
    path: "/admin/articlelist",
  },
  {
    id: 3,
    title: "写文章",
    icon: <FormOutlined />,
    path: "/admin/write",
  },
];

export { adminMenu };
