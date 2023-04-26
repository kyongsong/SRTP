import { Card } from 'antd';
const { Meta } = Card;
const ScoreBoard = () => (
  <Card
    hoverable
    style={{
      width: 840,
      height:50,
      left:250,
      top:15
      
    }}
    
  >
    <Meta title="Europe Street beat"  />
  </Card>
);
export default ScoreBoard;
