import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import { Menu, Drawer} from 'antd';
import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/SideBar.js';
import RoundPlayList from '../RoundPlayLIst/RoundPlayList.js';
var storage=window.localStorage;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('User', '1', <UserOutlined />),
  
  getItem('Algorithm', 'sub1', <DribbbleOutlined />, [
    getItem('dtw', '2'),
    getItem('encoder', '3'),
    
    
  ]),
  getItem('Tool', 'sub2', <ToolOutlined />, [
    getItem('Scratch', '4',<EditOutlined />),
    getItem('Click', '5',<DashOutlined />),
    getItem('Reset', '6',<RedoOutlined  />),
    
    
  ]),
  getItem('Matching', '7', <SearchOutlined />),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1'];
const Sidebar = (props) => {
  
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onLink = (key) => {
    console.log(key.key)
    if (key.key=='1'){
      window.location.href = "./"
    }
    else if(key.key=='2'){
      storage.setItem("ChoosingAlgorithm","dtw")
    }
    else if (key.key == '3') {
      storage.setItem("ChoosingAlgorithm","encoder")
    }
    else if(key.key=='4'){
      window.location.href="./Room"
    }
    else if(key.key=='5'){
      window.location.href="./Device"
    }
    else if (key.key == '6') {
      var ball = document.getElementById("Ball");
       
            
      ball.style.fontSize=0;
      var elem1 = document.getElementById("Team A.0");//获取控件
      
      elem1.style.fontSize=0;
   
      var elem2 = document.getElementById("Team A.1");//获取控件
     
      elem2.style.fontSize=0;

      var elem3 = document.getElementById("Team A.2");//获取控件
     
      elem3.style.fontSize=0;
     
  
      var elem4 = document.getElementById("Team A.3");//获取控件
      
      elem4.style.fontSize=0;
      
 
      var elem5 = document.getElementById("Team A.4");//获取控件
     
      
      elem5.style.fontSize=0;
    



      var elem6 = document.getElementById("Team B.0");//获取控件
      
      elem6.style.fontSize=0;

 
      var elem10 = document.getElementById("Team B.1");//获取控件
      
      elem10.style.fontSize=0;


      var elem7 = document.getElementById("Team B.2");//获取控件
      
      elem7.style.fontSize=0;


      var elem8 = document.getElementById("Team B.3");//获取控件
     
      elem8.style.fontSize=0;

      var elem9 = document.getElementById("Team B.4");//获取控件

      elem9.style.fontSize=0;
     
       var canvas = document.getElementById('theCanvas');
       canvas.width=canvas.width;
      console.log('reset2')
    }
    else {
      setOpen(true);
    }
  };
  const theme={
    
      'primary-color': '#1890ff',
  
  }
  return (

      <div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          
        theme="dark"
          style={{
            width: 200,
            height:920,
            fontSize:20,
            
            backgroundColor: '#00474f',
          }}
          items={items}
          
          onClick={onLink}
        />
        <Drawer title="Matching Round" placement="right" onClose={onClose} open={open} headerStyle={{backgroundColor: '#00474f' ,fontSize:20 } } bodyStyle={{backgroundColor:'#006d75'}}>
          <RoundPlayList Matching={props}/>
      </Drawer>
      </div>
     
  );
};

export default Sidebar;