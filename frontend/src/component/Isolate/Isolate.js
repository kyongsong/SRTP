import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import Player1 from "../../assets/Player1.png"

function Isolate(){
    useEffect(()=>{
        var PeriodData={'current_round':110};
      
        request.post('/isolate', PeriodData).then(
            res =>{
                console.log(res.data)
                let Value=new Array();
               

                // let coordinates=[];
                for(var i=0;i<res.data.length;i++){
                    Value=res.data[i].iso_trace
                    console.log(Value.length)
                 
                  
                  var PlayerName=res.data[i].iso_player
                  var Result=res.data[i].iso_result
                  var coordinates ="";
                  var color="blue"
                  var StartX;
                  var StartY;
        
                  
                  for(var j=0;j<Value.length;j++)
                  {
                    
                    //转换坐标
                    var XRate=12.7
                    var YRate=13.44
                    var XOffset=0
                    var YOffset=0
                    var x=(Value[j][0]*XRate+XOffset).toFixed(0)
                    var y=(Value[j][1]*YRate+YOffset).toFixed(0)
                    if(j==0){
                        StartX=x;
                        StartY=y;
                    }
                    coordinates+=x+","+y+" "
                    
                   
                  }
                  if(Result=="miss"){

                    color="red"
                  }
                  //绘制轨迹
                  console.log(coordinates)
                  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                  polyline.setAttribute("points", coordinates);
                  polyline.setAttribute("stroke", color);
                  polyline.setAttribute("stroke-width", "8");
                  polyline.setAttribute("fill", "none");
                  
                  // 将polyline元素添加到SVG中
                  const svg = document.getElementById("PlayerScratch");
                  svg.appendChild(polyline);
                  
                  
                }
             
                
                


                


            }

        )
    },[])
    
    return (
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        
        <g id="PlayerScratch"></g>
        <clipPath id="myClip">
    <circle cx="50" cy="50" r="40" />
  </clipPath>
  <image x="10" y="10" width="80" height="80" xlinkHref={Player1} clip-path="url(#myClip)" />
        </g>
        </svg >  


    )
}
export default Isolate;