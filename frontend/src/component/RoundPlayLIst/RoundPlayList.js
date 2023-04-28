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
import { Divider, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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

function RoundPlayList  ()  {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
  <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
  <List
    
    itemLayout="vertical"
    size="large"
    header="Matching Round"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 4,
    }}
    dataSource={data}
   
    renderItem={(item) => (
      
      
      <List.Item
        style={{borderBottomColor:'#00474f',backgroundColor:'#00474f'}}
        key={item.title}
        actions={[
          <IconText icon={ClockCircleOutlined } text="Round 1" key="list-vertical-star-o" />,
          <IconText icon={PlayCircleOutlined  } text="20 's" key="list-vertical-star-o" />
          
          
        ]}
        extra={
          <img
            width={90}
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
    </InfiniteScroll>
    </div>)
  
      };
export default RoundPlayList;
