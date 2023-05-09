import { Card ,Typography ,Space,Divider,message} from 'antd';
import React from 'react';
import { useEffect,useState } from 'react';
import BasketballBg from '../../../page/BasketballPage/BasketballBackground2.jpg'
import {UserOutlined,ClockCircleFilled ,ExclamationCircleFilled,SkinFilled  } from '@ant-design/icons'
import request from '../../../utils/request';

var store = window.localStorage
const { Paragraph } = Typography;

const IconText = ({ icon, text }) => (
    <>
    {React.createElement(icon)}
      {text}
    
    </>
      
  );
  
 
function RoundCard(props){
  
  let CurClip=0;
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
 
  const handleClick=()=>{
         CurClip=0;
         messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 2,
            });
          }, 200);
          var store = window.localStorage
          store.setItem("event_id",props.round)
          store.setItem("start_index",props.start_index)
          store.setItem("end_index",props.end_index)

       
            
    
    
    
  }
    return (
    
        <Card
      style={{
        backgroundColor: '#006d75',
        width:340,
        marginTop: 16,
       
      }}
      bordered={false}
      onClick={handleClick}
      
      
    >
        {contextHolder}
        
       <img src={BasketballBg} style={{width:"40%",position:"absolute",left:0,top:0}}></img>
       <Space style={{position:'absolute',left:140,top:10}}>
            <IconText icon={UserOutlined} text={props.player_Name} key="list-vertical-star-o" />
            <Divider type="vertical" />
       </Space>
      
       <Space style={{position:'absolute',left:220,top:10}}>
            <IconText icon={ClockCircleFilled} text={props.round} key="list-vertical-star-o" />   
            <Divider type="vertical" />
       </Space>
       
       <Space style={{position:'absolute',left:140,top:40}}>
            <IconText icon={ExclamationCircleFilled} text={props.events} key="list-vertical-star-o" />      
            <Divider type="vertical" />
       </Space>
       
       <Space style={{position:'absolute',left:220,top:40}}>
            <IconText icon={SkinFilled} text={props.AgainstTeam} key="list-vertical-star-o" />   
       </Space>
       
       
       
       

       
       
       
    </Card>
  
    

    )
}
export default RoundCard;