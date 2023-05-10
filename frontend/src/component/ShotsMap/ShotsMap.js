import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
function ShotsMap(){
    useEffect(()=>{
        var PeriodData={'current_round':120};
    request.post('/ShotsMap', PeriodData).then(
      res =>{
        console.log("ShotsMap")
        console.log(res.data)
        
        var x = [], y = [],status=[],direction=[];
        //Twopt Made postion loaded
        for(var i=0;i<res.data.TwoMade.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push(res.data.TwoMade[i][0]*12.7)
          y.push(res.data.TwoMade[i][1]*13.44)
          status.push("TwoMade");
          if(x[i]>47){
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
          x.push(res.data.TwoMiss[i][0]*12.7)
          y.push(res.data.TwoMiss[i][1]*13.44)
          status.push("TwoMiss");

        }
        //Threept Made postion loaded
        for(var i=0;i<res.data.ThreeMade.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push(res.data.ThreeMade[i][0]*12.7)
          y.push(res.data.ThreeMade[i][1]*13.44)
          status.push("ThreeMade");

        }
        //Threept Miss postion loaded
        for(var i=0;i<res.data.ThreeMiss.length;i++){
          //读取后端数据
          
          //转换坐标
          x.push(res.data.ThreeMiss[i][0]*12.7)
          y.push(res.data.ThreeMiss[i][1]*13.44)
          status.push("ThreeMiss");

        }
       
        //绘制热点图
        
        console.log(x)
        console.log(y)
        for (var i = 0; i < res.data.TwoMade.length+res.data.TwoMiss.length+res.data.ThreeMade.length+res.data.ThreeMiss.length; i++) {
            var size = 20;
            var cx = x[i];
            var cy = y[i] ;
        
            if (status[i]=="TwoMade") {
              var color = "rgba(255, 0, 0, "   + ")";
              
              var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              circle.setAttribute("cx", cx);
              circle.setAttribute("cy", cy);
              circle.setAttribute("r", size);
              circle.setAttribute("fill", color);
              document.getElementById("ShotMap").appendChild(circle);
              
            }
            else if(status[i]=="TwoMiss"){
              var color = "rgba(0, 0, 255)";
              
              var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              circle.setAttribute("cx", cx);
              circle.setAttribute("cy", cy);
              circle.setAttribute("r", size);
              circle.setAttribute("fill", color);
               document.getElementById("ShotMap").appendChild(circle);

            }
            else if(status[i]=="ThreeMade"){
              var color = "rgba(0, 128, 255)";
              
              var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              circle.setAttribute("cx", cx);
              circle.setAttribute("cy", cy);
              circle.setAttribute("r", size);
              circle.setAttribute("fill", color);
               document.getElementById("ShotMap").appendChild(circle);

            }
            else if(status[i]=="ThreeMiss"){
              var color = "rgba(0, 255, 0)";
              
              var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              circle.setAttribute("cx", cx);
              circle.setAttribute("cy", cy);
              circle.setAttribute("r", size);
              circle.setAttribute("fill", color);
               document.getElementById("ShotMap").appendChild(circle);

            }
          
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