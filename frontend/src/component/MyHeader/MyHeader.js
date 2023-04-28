import "./MyHeader.css";
import { Layout} from "antd";
import { DownloadOutlined, LinkOutlined ,UserOutlined, CommentOutlined,DribbbleOutlined ,DribbbleSquareOutlined} from '@ant-design/icons';
import Wrapper from "../../assets/wrappers/Header";

var store = window.localStorage
var username = store.getItem("UserName")
const { Header, Footer, Sider, Content } = Layout;



function MyHeader(props) {
  return (
  
    <Header
      style={{backgroundColor: '#002329',fontSize:28,color:"white"}}
      
      className="site-page-header"
      
      
    >
      <DribbbleSquareOutlined />
      
      Sportia
      
    
      
    </Header>
   
  
  );
}

export default MyHeader;