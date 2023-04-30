import { Card } from 'antd';
import './ScoreBoard.css';
import { useState, useEffect } from 'react';
import request from '../../utils/request';
import axios from 'axios';

const { Meta } = Card;

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
      height: 80,
      left: 380,
      top: 15,
      backgroundColor:"#006d75",
     
    }}
  >
    <Meta
      title={`${teamNames_Scores.home} VS ${teamNames_Scores.visitor}`}
      description={`${teamNames_Scores.hscore} : ${teamNames_Scores.vscore}`}
    />
  </Card>
  );
}

export default ScoreBoard;