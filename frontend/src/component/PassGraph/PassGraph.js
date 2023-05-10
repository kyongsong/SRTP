import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import Player1 from "../../assets/Player1.png"
import Player2 from "../../assets/Player2.png"
import Player3 from "../../assets/Player3.png"
import Player4 from "../../assets/Player4.png"
import Player5 from "../../assets/Player5.png"
import Away1 from "../../assets/Away1.png"
import Away2 from "../../assets/Away2.png"
import Away3 from "../../assets/Away3.png"
import Away4 from "../../assets/Away4.png"
import Away5 from "../../assets/Away5.png"


function PassGraph(){
    useEffect(()=>{
        // let PlayerPosition=[];
        // PlayerPosition=[100,150,100,350,100,550,350,250,350,450];

        // var arr2 = [
        //     [0, 2, 3,4,6],
        //     [1, 0, 3,4,6],
        //     [1, 2, 0,4,6],
        //     [1, 2, 3,0,6],
        //     [1, 2, 3,4,0],
        //   ];
        

        // for(var i=0;i<5;i++){                
        //     var value=arr2[i]
          
        //     for(var j=0;j<5;j++){
        //         if(i!=j){
        //             var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        //             line.setAttribute("x1", PlayerPosition[i*2]);
        //             line.setAttribute("y1", PlayerPosition[i*2+1]);
        //             line.setAttribute("x2", PlayerPosition[j*2]);
        //             line.setAttribute("y2", PlayerPosition[j*2+1]);
        //             var Size=""+value[j]
        //             line.setAttribute("stroke-width", Size);
        //             line.setAttribute("stroke", "blue");
        //             console.log(line)
        //             document.getElementById("PassGraph").appendChild(line);
                    

        //         }
        //     }
        // }
        var PeriodData={'current_round':110,"Team":'home'};
        request.post('/PassGraph', PeriodData).then(
            res =>{
              
                console.log(res.data)
              

               let PlayerPosition=[];
               PlayerPosition=[100,150,100,350,100,550,350,250,350,450];
               for(var i=0;i<5;i++){                
                    var value=res.data[i]
                    for(var j=0;j<5;j++){
                        if(i!=j){
                            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                            line.setAttribute("x1", PlayerPosition[i*2]);
                            line.setAttribute("y1", PlayerPosition[i*2+1]);
                            line.setAttribute("x2", PlayerPosition[j*2]);
                            line.setAttribute("y2", PlayerPosition[j*2+1]);
                            line.setAttribute("stroke", "blue");
                            var Size=""+value[j]*10
                            line.setAttribute("stroke-width", Size);
                            document.getElementById("PassGraph").appendChild(line);
                            

                        }
                    }
               }


               
            })

     },[])
    
    return (
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        
        <circle cx="100" cy="150" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player1} x="75" y="120" width="50" height="50"  />

        <circle cx="100" cy="350" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player2} x="75" y="320" width="50" height="50"  />

        <circle cx="100" cy="550" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player3} x="75" y="520" width="50" height="50"  />

        <circle cx="350" cy="250" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player4} x="325" y="220" width="50" height="50"  />


        <circle cx="350" cy="450" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player5} x="325" y="420" width="50" height="50"  />


        <circle cx="1100" cy="150" r="40" fill="#ffffff" /> 
        <image xlinkHref={Away1} x="1075" y="120" width="50" height="50"  />

        <circle cx="1100" cy="350" r="40" fill="#ffffff" /> 
        <image xlinkHref={Away2} x="1075" y="320" width="50" height="50"  />

        <circle cx="1100" cy="550" r="40" fill="#ffffff" /> 
        <image xlinkHref={Away3} x="1075" y="520" width="50" height="50"  />

        <circle cx="850" cy="250" r="40" fill="#ffffff" /> 
        <image xlinkHref={Away4} x="825" y="220" width="50" height="50"  />


        <circle cx="850" cy="450" r="40" fill="#ffffff" /> 
        <image xlinkHref={Away5} x="825" y="420" width="50" height="50"  />
        
        
        <g id="PassGraph"></g>
        </g>
        </svg >  

    )
}
export default PassGraph;