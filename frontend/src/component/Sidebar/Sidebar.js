import { RedoOutlined , SettingOutlined, ReadOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/SideBar.js';
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
  getItem('用户中心', '1', <UserOutlined />),
  
  getItem('匹配算法', 'sub1', <DribbbleOutlined />, [
    getItem('dtw', '2'),
    getItem('encoder', '3'),
    
    
  ]),
  getItem('工具', 'sub2', <ToolOutlined />, [
    getItem('Scratch', '4',<EditOutlined />),
    getItem('Click', '5',<DashOutlined />),
    getItem('Reset', '6',<RedoOutlined  />),
    
    
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1'];
const Sidebar = () => {
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
      window.location.href = "./Total"
    }
    else if (key.key == '3') {
      window.location.href = "./Center"
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
      console.log('no')
      //window.location.href = "./OS"
    }
  };
  return (
    
      <div className='nav-link'>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          
        theme="dark"
          style={{
            width: 200,
            height:900,
            
            backgroundColor: '#002329',
          }}
          items={items}
          
          onClick={onLink}
        />
      </div>
   
  );
};

export default Sidebar;