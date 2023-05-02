import { Card } from 'antd';
import './ScoreBoard.css';
import { useState, useEffect } from 'react';
import request from '../../utils/request';
import axios from 'axios';
import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Divider, Radio, Typography ,Space} from 'antd';
const { Meta } = Card;

const { Paragraph } = Typography;
const {Title}=Typography;

function ScoreBoard(){
  const [teamNames_Scores, setTeamNamesAndScore] = useState({ home: '', visitor: '', hscore: '', vscore: '' });

  useEffect(() => {
    request.post('/Team_Score').then((response) => {
      console.log(response.data);
      setTeamNamesAndScore(response.data);
    });
  }, []);

  return(
  <Card
    hoverable={true}
    className='ScoreBoard'
    bordered={false}
    style={{
      width: 750,
      height: 90,
      left: 380,
      top: 20,
      backgroundColor:"#006d75",
     
    }}
  >
    {/* <Meta
      title={`${teamNames_Scores.home} VS ${teamNames_Scores.visitor}`}
      description={`${teamNames_Scores.hscore} : ${teamNames_Scores.vscore}`}
    /> */}
    <Title  level={2}
     style={
      {
      textAlign:'center',
      
      }
    }
    >

    <Space>
      <img src={AtlantaHawks}/>
      {teamNames_Scores.home} 
      <b> VS</b> 
      <img src={DetroitPistons}/>
      {teamNames_Scores.visitor}
    </Space>
    
    </Title>
    <Paragraph
    
    style={
      {
      textAlign:'center',
    
      }
    }>
    <Space>
       
        {teamNames_Scores.hscore} 
        <b> :</b> 
       {teamNames_Scores.vscore}
       
    </Space>
    </Paragraph>
    
    
  </Card>
  );
}

export default ScoreBoard;