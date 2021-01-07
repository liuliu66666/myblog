import {
  BankOutlined,
  UnorderedListOutlined,
  FormOutlined,
  SettingOutlined,
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
  {
    id: 4,
    title: "配置",
    icon: <SettingOutlined />,
    path: "/admin/configure",
  },
];

export { adminMenu };
