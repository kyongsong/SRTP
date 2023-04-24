import { MessageOutlined, SettingOutlined, ReadOutlined } from '@ant-design/icons';
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
  getItem('用户中心', '1', <MessageOutlined />),
  
  getItem('信息收集', 'sub1', <ReadOutlined />, [
    getItem('总览', '2'),
    getItem('场所中心', '3'),
    getItem('房间中心', '4'),
    getItem('设备中心', '5'),
    
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
    else if (key.key == '19') {
      window.location.href = "./OS"
    }
    else {
      console.log('no')
      //window.location.href = "./OS"
    }
  };
  return (
    <Wrapper>
      <div className='nav-link'>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
            backgroundColor: '#f2f3f5',
          }}
          items={items}
          
          onClick={onLink}
        />
      </div>
    </Wrapper>
  );
};

export default Sidebar;