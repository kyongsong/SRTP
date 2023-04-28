import { Card } from 'antd';
import './ScoreBoard.css';
import { useState, useEffect } from 'react';
import request from '../../utils/request';
import axios from 'axios';

const { Meta } = Card;

function ScoreBoard(){
  const [teamNames, setTeamNames] = useState({ home: '', visitor: '' });
  const [team1Score,set_team1Score]=useState('');
  const [team2Score,set_team2Score]=useState('');

  useEffect(() => {
    request.post('/Team_Score').then((response) => {
      console.log(response.data);
      setTeamNames(response.data);
    });
  }, []);

  return(
  <Card
    hoverable
    className='ScoreBoard'
    style={{
      width: 750,
      height: 80,
      left: 250,
      top: 15,
    }}
  >
    <Meta
      title={`${teamNames.home} VS ${teamNames.visitor}`}
      description={`${team1Score} : ${team2Score}`}
    />
  </Card>
  );
}

export default ScoreBoard;