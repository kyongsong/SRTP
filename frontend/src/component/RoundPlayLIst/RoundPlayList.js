import RoundCard from "./RoundCard/RoundCard";
function RoundPlayList  (props) {
  console.log("RoundPlayList "+props.Matching.Matching.data)
  
  return(
    
  // <Card  hoverable={true} bordered={false}style={{width:350 ,backgroundColor: '#006d75'}}>
  <div>
   
    <RoundCard round="Round 1" start_index={2} end_index={2} events="Attacking" player_Name="James" AgainstTeam="Lakers"/>
    <RoundCard round="Round 2" start_index={2} end_index={2} events="Attacking" player_Name="Kobe" AgainstTeam="Lakers"/>
    <RoundCard round="Round 3" start_index={2} end_index={2} events="Attacking" player_Name="Durant" AgainstTeam="Lakers"/>
    <RoundCard round="Round 4" start_index={2} end_index={2} events="Attacking" player_Name="James" AgainstTeam="Lakers"/>
    </div>
  // </Card>
);
}
export default RoundPlayList;