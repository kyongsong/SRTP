import "./Header.css";
import { PageHeader, Dropdown, message, Button} from "antd";
import { DownloadOutlined, LinkOutlined ,UserOutlined, CommentOutlined} from '@ant-design/icons';
import Wrapper from "../../assets/wrappers/Header";

var store = window.localStorage
var username = store.getItem("UserName")

const items= [
  {
    label: '待定',
    key: '1',
    icon: <CommentOutlined />,
  },
  {
    label: '注销',
    key: '2',
    icon: <UserOutlined />,
  },
  
];
const handleMenuClick = (e) => {
  message.info('注销成功');
  store.setItem("UserName", '')
  window.location.href = "/"
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};

function Header(props) {
  return (
    <Wrapper>
    <PageHeader
      style={{ backgroundColor: '#13c2c2'}}
      title="篮球战术分析系统"
      className="site-page-header"
      extra={[
      <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
        {username}
      </Dropdown.Button>,
      ]}
      
    >
    </PageHeader>
    </Wrapper>
  );
}

export default Header;