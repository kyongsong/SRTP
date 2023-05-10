import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
function ShotsMap(){
    useEffect(()=>{
        var PeriodData={'current_round':110};
    request.post('/ShotsMap', PeriodData).then(
      res =>{
        console.log("ShotsMap")
        console.log(res.data)
        
        var x = [], y = [],status=[],direction=[];
        //Twopt Made postion loaded
        for(var i=0;i<res.data.TwoMade.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push((res.data.TwoMade[i][0]*12.7).toFixed(0))
          y.push((res.data.TwoMade[i][1]*13.44).toFixed(0))
          status.push("TwoMade");
          if(res.data.TwoMade[i][0]>47){
            direction.push("Right")
          }
          else{
            direction.push("Left")
          }

        }
        //Twopt Miss postion loaded
        for(var i=0;i<res.data.TwoMiss.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push((res.data.TwoMiss[i][0]*12.7).toFixed(0))
          y.push((res.data.TwoMiss[i][1]*13.44).toFixed(0))
          status.push("TwoMiss");
          if(res.data.TwoMiss[i][0]>47){
            direction.push("Right")
          }
          else{
            direction.push("Left")
          }

        }
        //Threept Made postion loaded
        for(var i=0;i<res.data.ThreeMade.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push((res.data.ThreeMade[i][0]*12.7).toFixed(0))
          y.push((res.data.ThreeMade[i][1]*13.44).toFixed(0))
          status.push("ThreeMade");
          if(res.data.ThreeMade[i][0]>47){
            direction.push("Right")
          }
          else{
            direction.push("Left")
          }

        }
        //Threept Miss postion loaded
        for(var i=0;i<res.data.ThreeMiss.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push((res.data.ThreeMiss[i][0]*12.7).toFixed(0))
          y.push((res.data.ThreeMiss[i][1]*13.44).toFixed(0))
          status.push("ThreeMiss");
          if(res.data.ThreeMiss[i][0]>47){
            direction.push("Right")
          }
          else{
            direction.push("Left")
          }

        }
       
        //绘制热点图
        
      
        console.log(direction)
        for (var i = 0; i < res.data.TwoMade.length+res.data.TwoMiss.length+res.data.ThreeMade.length+res.data.ThreeMiss.length; i++) {
            var size = 10;
            var StartX =0;
            var StartY=0 ;
            var color;

            if(direction[i]=="Right"){
                StartX=1150;
                StartY=336;
            }
            else{
                StartX=50;
                StartY=336;

            }
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var StartCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var EndCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
            StartCircle.setAttribute("cx",StartX);
            StartCircle.setAttribute("cy",StartY)
            StartCircle.setAttribute("r", size);

            EndCircle.setAttribute("cx",x[i]);
            EndCircle.setAttribute("cy",y[i])
            EndCircle.setAttribute("r", size);
            

            line.setAttribute("x1", StartX);
            line.setAttribute("y1", StartY);
            line.setAttribute("x2", x[i]);
            line.setAttribute("y2", y[i]);
            line.setAttribute("stroke-width", "2");
            
        
            if (status[i]=="TwoMade") {
            color = "rgba(0, 0, 255 )";
            }
            else if(status[i]=="TwoMiss"){
             color = "rgba(255, 0, 0)";

            }
            else if(status[i]=="ThreeMade"){
             color = "rgba(0, 128, 255)";
            }
            else if(status[i]=="ThreeMiss"){
               color = "rgba(128,255 , 0)";
            

            }
            StartCircle.setAttribute("fill", color);
            EndCircle.setAttribute("fill", color);
            line.setAttribute("stroke", color);
            document.getElementById("ShotMap").appendChild(line);
            document.getElementById("ShotMap").appendChild(StartCircle);
            document.getElementById("ShotMap").appendChild(EndCircle);
          
        }


      })


    },[])
    return (
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        <g id="scratch"></g>
        <g id="ShotMap"></g>
        </g>
        </svg >  


    )
}
export default ShotsMap;