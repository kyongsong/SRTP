import { useEffect } from "react";
import request from "../../utils/request";
import Player1 from "../../assets/Player1.png"
import Player2 from "../../assets/Player2.png"
import Player3 from "../../assets/Player3.png"
import Player4 from "../../assets/Player4.png"
import Player5 from "../../assets/Player5.png"
import Player6 from "../../assets/Player6.png"
import Player7 from "../../assets/Player7.png"
import Player8 from "../../assets/Player8.png"
import Player9 from "../../assets/Player9.png"
import Player10 from "../../assets/Player10.png"
import Player11 from "../../assets/Player11.png"
import Player12 from "../../assets/Player12.png"
import Player13 from "../../assets/Player13.png"



function PassMatrix(){
     useEffect(()=>{
        var PeriodData={'current_round':110,"Team":'home'};
        request.post('/PassMatrix', PeriodData).then(
            res =>{
                var length=13;
                var CurIndex="Player";
                var max=0;
                
              

                let data=[];
                data.push(res.data.player1)
                data.push(res.data.player2)
                data.push(res.data.player3)
                data.push(res.data.player4)
                data.push(res.data.player5)
                data.push(res.data.player6)
                data.push(res.data.player7)
                data.push(res.data.player8)
                data.push(res.data.player9)
                data.push(res.data.player10)
                data.push(res.data.player11)
                data.push(res.data.player12)
                data.push(res.data.player13)
                console.log(res.data)

                for(var i=0;i<length;i++){
                    for(var j=0;j<length;j++){
                        if(data[i][j]>max) max=data[i][j];
                    }
                }
                console.log(max)
                for(var i=1;i<=length;i++){
                    CurIndex+=i;
                    CurIndex+="."
                    
                    for(var j=1;j<=length;j++){
                        CurIndex+=j;
                        if(i!=j&&data[i-1][j-1]!=0){
                        var value=((data[i-1][j-1]*100/max)).toFixed(0)
                        var color = "rgba(217, 239, "+value+")";
                        document.getElementById(CurIndex).setAttribute("fill", color)
                        console.log(i,j)
                        }
                        
                        //Reset
                        CurIndex=("Player"+i+".")

                    }
                    CurIndex="Player"

                }
            })

     },[])
    return (
        <svg width="750" height="750" viewBox="0 0 750 750">

            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <rect x="50" y="50" width="650" height="650" fill="#F0F0F0" />
            <g>
            
            <text x="10" y="40" font-size="20" fill="#000">球员</text>
        
            <text x="70" y="40" font-size="20" fill="#000">1</text>
            <text x="660" y="40" font-size="20" fill="#000">13</text>
       
            {/* FirstRow */}
            
            <g>          
                <rect id="Player1.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" /> 
                <image xlinkHref={Player1} width="50" height="50" x="50"y="50" />
            </g>
            <g>
            
                <rect id ="Player1.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player1.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
            

           

            <g transform="translate(0, 50)">
            <g>          
                <rect id="Player2.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player2.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player2} width="50" height="50" x="100"y="50" />
       
            </g>
            <g>
            
                <rect id ="Player2.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player2.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player2.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player2.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player2.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player2.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player2.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player2.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player2.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player2.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player2.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>

            </g>

            <g transform="translate(0, 100)">
            <g>          
                <rect id="Player3.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player3.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player3.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player3} width="50" height="50" x="150"y="50" />
       
            </g>
            <g>
            
                <rect id ="Player3.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player3.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player3.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player3.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player3.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player3.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player3.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player3.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player3.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player3.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>

           
            <g transform="translate(0, 150)">
            <g>          
                <rect id="Player4.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
            
            </g>
            <g>
            
                <rect id ="Player4.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player4.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player4.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player4} width="50" height="50" x="200"y="50" />
            </g>
            <g>
            
                <rect id ="Player4.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
       
            </g>
            <g>
            
                <rect id ="Player4.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player4.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player4.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player4.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player4.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player4.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player4.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player4.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 200)">
            <g>          
                <rect id="Player5.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
            </g>
            <g>
            
                <rect id ="Player5.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player5.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player5.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player5.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player5} width="50" height="50" x="250"y="50" />
            </g>
            <g>
            
                <rect id ="Player5.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
    
            </g>
            <g>
            
                <rect id ="Player5.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player5.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player5.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player5.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player5.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player5.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player5.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 250)">
            <g>          
                <rect id="Player6.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
            </g>
            <g>
            
                <rect id ="Player6.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player6.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player6.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player6.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player6.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player6} width="50" height="50" x="300"y="50" />
            </g>
            <g>
            
                <rect id ="Player6.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player6.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player6.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player6.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player6.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player6.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player6.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 300)">
            <g>          
                <rect id="Player7.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player7.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player7.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player7.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player7.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player7.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player7.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player7} width="50" height="50" x="350"y="50" />
            </g>
            <g>
            
                <rect id ="Player7.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player7.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player7.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player7.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player7.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player7.13"x="650" y="50" width="50"height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 350)">
            <g>          
                <rect id="Player8.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
            </g>
            <g>
            
                <rect id ="Player8.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player8.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player8.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player8.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player8.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player8.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player8.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player8} width="50" height="50" x="400"y="50" />
            </g>
            <g>
            
                <rect id ="Player8.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player8.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player8.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player8.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player8.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 400)">
            <g>          
                <rect id="Player9.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player9.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player9.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player9.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player9.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player9.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player9.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player9.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player9.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player9} width="50" height="50" x="450"y="50" />
            </g>
            <g>
            
                <rect id ="Player9.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player9.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player9.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player9.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 450)">
            <g>          
                <rect id="Player10.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
              
            </g>
            <g>
            
                <rect id ="Player10.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player10.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player10.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player10.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player10.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player10.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player10.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player10.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player10.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player10} width="50" height="50" x="500"y="50" />
            </g>
            <g>
            
                <rect id ="Player10.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player10.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player10.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>
            <g transform="translate(0, 500)">
            <g>          
                <rect id="Player11.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
               
            </g>
            <g>
            
                <rect id ="Player11.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player11.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player11.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player11.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player11.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player11.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player11.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player11.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player11.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player11.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player11} width="50" height="50" x="550"y="50" />
            </g>
            <g>
            
                <rect id ="Player11.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player11.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>

            <g transform="translate(0, 550)">
            <g>          
                <rect id="Player12.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player12.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player12.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player12.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player12.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player12.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player12.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player12.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player12.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player12.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player12.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player12.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                <image xlinkHref={Player12} width="50" height="50" x="600"y="50" />
            </g>
            <g>
            
            <rect id ="Player12.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />

            </g>
            
                
            </g>

            <g transform="translate(0, 600)">
            <g>          
                <rect id="Player13.1" x="50" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
                
            </g>
            <g>
            
                <rect id ="Player13.2" x="100" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player13.3" x="150" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player13.4"x="200" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player13.5"x="250" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player13.6"x="300" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player13.7"x="350" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player13.8"x="400" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player13.9"x="450" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player13.10"x="500" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player13.11"x="550" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player13.12"x="600" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player13.13"x="650" y="50" width="50" height="50" fill="#d9efff" stroke="#000000" />
            <image xlinkHref={Player13} width="50" height="50" x="650"y="50" />
            </g>
            
                
            </g>




            

            <g>
            <rect x="50" y="710" width="20" height="20" fill="#d9efff" stroke="#000000" />
            <text x="80" y="720" fill="#000" font-size="10">数值最小</text>
            </g>
            <g>
            <rect x="150" y="710" width="20" height="20" fill="#d9efa0" stroke="#000000" />
            <text x="180" y="720" fill="#000" font-size="10">数值较小</text>
            </g>
            <g>
            <rect x="250" y="710" width="20" height="20" fill="#d9ef50" stroke="#000000" />
            <text x="280" y="720" fill="#000" font-size="10">数值中等</text>
            </g>
            <g>
            <rect x="350" y="710" width="20" height="20" fill="#d9ef00" stroke="#000000" />
            <text x="380" y="720" fill="#000" font-size="10">数值最大</text>
            </g>
        </svg>
    )
}
export default PassMatrix;