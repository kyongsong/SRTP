// import { Table,Button } from 'antd';
// import BasketballBg from '../../page/BasketballPage/BasketballBackground.png'

// const columns = [
 
//   {
//     title: "匹配回合",
//     dataIndex: "",
//     width:'30%',
//     render: (record) => {
//       console.log('record的内容',record); 
//       return (
//         <div>
//           <img src={BasketballBg} width="100px"/>
//         </div>
//       )
//     }
//     },
    

// ];
// const data = [
//   {
//     key: 1,
    
    
//   },
//   {
//     key: 2,
  
   
    
//   }
// ];
// const RoundPlayList = () => (

//   <Table
    
//     columns={columns}
    
//     dataSource={data}
    
//   />


// );
// export default RoundPlayList;

import { Avatar, List, Space,Card} from 'antd';
import {StarOutlined,LikeOutlined,MessageOutlined,PlayCircleOutlined  ,ClockCircleOutlined } from '@ant-design/icons'

import BasketballBg from '../../page/BasketballPage/BasketballBackground.png'
import React from 'react';
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `Player ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  render: (record) => {
          console.log('record的内容',record); 
          return (
            <div>
              <img src={BasketballBg} width="100px"/>
            </div>
          )
        }
  
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const RoundPlayList = () => (
<Card  style={{height:960 ,backgroundColor:'#002329'}}title="Default size card" >
  <List
    
    itemLayout="vertical"
    size="large"
    
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 6,
    }}
    dataSource={data}
   
    renderItem={(item) => (
     
      
      <List.Item
        style={{borderBottomColor:'#36cfc9',backgroundColor:'#002329'}}
        key={item.title}
        actions={[
          <IconText icon={ClockCircleOutlined } text="Round 1" key="list-vertical-star-o" />,
          <IconText icon={PlayCircleOutlined  } text="20 's" key="list-vertical-star-o" />
          
          
        ]}
        extra={
          <img
            width={100}
            alt="logo"
            src={BasketballBg}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
         
      </List.Item>
    
    )}
    />
  </Card>
);
export default RoundPlayList;
