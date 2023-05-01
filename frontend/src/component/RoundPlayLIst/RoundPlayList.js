import Roundcard from "./RoundCard/RoundCard.js";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import React from "react";
function RoundPlayList  (props) {
  // console.log("RoundPlayList "+props.Matching.Matching.data.length)
  // console.log("RoundPlayList "+props.Matching.Matching)
  
  console.log(props.Matching.Matching==="")

  useEffect(() => {
    var CardList=document.getElementById("List")
    if(props.Matching.Matching===""){
      alert("No Result")
    }
    else{
      console.log("Here")
      //We could get the Canvas First and the First Clip for the Matching Round And Script it.
      const roundCards = [];
      for(var i=0;i<props.Matching.Matching.data.length;i++)
      {
        
          var RoundCard=React.createElement(Roundcard,{round:props.Matching.Matching.data[i][0],
          start_index:props.Matching.Matching.data[i][1],
          end_index:props.Matching.Matching.data[i][2],
          events:"Attacking",
          player_Name:"Curry",
          AgainstTeam:"Lakers",
          key:i
          });
          
         
          roundCards.push(RoundCard)
         

    }
    const container = document.getElementById('List');
    const roundCardList = React.createElement("div", {}, roundCards);
    ReactDOM.render(roundCardList, container);
    console.log(CardList)

    }
    
   
    




  },[props])
  
  return(
    
  // <Card  hoverable={true} bordered={false}style={{width:350 ,backgroundColor: '#006d75'}}>
  <div id="List">
    
    
    {/* <RoundCard round="Round 1" start_index={2} end_index={2} events="Attacking" player_Name="James" AgainstTeam="Lakers"/>
    <RoundCard round="Round 2" start_index={2} end_index={2} events="Attacking" player_Name="Kobe" AgainstTeam="Lakers"/>
    <RoundCard round="Round 3" start_index={2} end_index={2} events="Attacking" player_Name="Durant" AgainstTeam="Lakers"/>
    <RoundCard round="Round 4" start_index={2} end_index={2} events="Attacking" player_Name="James" AgainstTeam="Lakers"/> */}
    </div>
  // </Card>
);
}
export default RoundPlayList;