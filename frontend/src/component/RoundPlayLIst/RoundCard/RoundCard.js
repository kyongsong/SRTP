import { Card ,Typography ,Space} from 'antd';
import React from 'react';
import BasketballBg from '../../../page/BasketballPage/BasketballBackground2.jpg'
import {UserOutlined,ClockCircleFilled ,ExclamationCircleFilled,SkinFilled  } from '@ant-design/icons'
const { Paragraph } = Typography;
const IconText = ({ icon, text }) => (
    <>
    {React.createElement(icon)}
      {text}
    
    </>
      
  );

function RoundCard(props){
    return (
        <Card
      style={{
        backgroundColor: '#006d75',
        width:340,
        marginTop: 16,
       
      }}
      bordered={false}
      
      
    >
        
       <img src={BasketballBg} style={{width:"40%",position:"absolute",left:0,top:0}}></img>
       <Space style={{position:'absolute',left:140,top:10}}>
            <IconText icon={UserOutlined} text={props.player_Name} key="list-vertical-star-o" />
       </Space>

       <Space style={{position:'absolute',left:220,top:10}}>
            <IconText icon={ClockCircleFilled} text={props.round} key="list-vertical-star-o" />   
       </Space>

       <Space style={{position:'absolute',left:140,top:40}}>
            <IconText icon={ExclamationCircleFilled} text={props.events} key="list-vertical-star-o" />      
       </Space>

       <Space style={{position:'absolute',left:220,top:40}}>
            <IconText icon={SkinFilled} text={props.AgainstTeam} key="list-vertical-star-o" />   
       </Space>
       
       
       
       

       
       
       
    </Card>

    )
}
export default RoundCard;