import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'

function Isolate(){
    useEffect(()=>{
        var PeriodData={'current_round':110};
      
        request.post('/Isolate', PeriodData).then(
            res =>{
                let Value=new Array();
               

                // let coordinates=[];
                for(var i=0;i<res.data.length;i++){
                    Value=res.data[i].iso_trace
                  const data=JSON.parse(Value[i])
                  
                  var PlayerName=res.data[i].iso_player
                  var Result=res.data[i].iso_result
                  var coordinates ="";
                  var color="blue"
                  
                  for(var j=0;j<data.length;j++)
                  {
                    
                    //转换坐标
                    var XRate=12.7
                    var YRate=13.44
                    var XOffset=0
                    var YOffset=0
                    var x=(data[j].x1*XRate+XOffset).toFixed(0)
                    var y=(data[j].y1*YRate+YOffset).toFixed(0)
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
                  polyline.setAttribute("stroke-width", "12");
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
        </g>
        </svg >  


    )
}
export default Isolate;