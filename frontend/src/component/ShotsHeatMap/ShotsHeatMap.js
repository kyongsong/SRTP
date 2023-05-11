import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
var store = window.localStorage
function ShotsHeatMap(){
    useEffect(()=>{
        var PeriodData={'current_round':store.getItem("event_id")};
        request.post('/ShotsHeatMap', PeriodData).then(
            res =>{
                console.log(res)
                console.log(res.data.shot_postion)
            
            if(res.data.length===0){
              alert("获取失败")
            }else{
                var x = [], y = [];
                for(var i=0;i<res.data.shot_postion.length;i++){
                  //读取后端数据
      
                  //转换坐标
                  x.push(res.data.shot_postion[i][0]*12.7)
                  y.push(res.data.shot_postion[i][1]*13.44)
                  
                }
              
                // 计算投篮数据的热点图
                var bins = 20;
                var heatmap = new Array(bins).fill(0).map(() => new Array(bins).fill(0));
                for (var i = 0; i<res.data.shot_postion.length; i++) {
                  var bin_x = Math.floor(x[i] / (1200 / bins));
                  var bin_y = Math.floor(y[i] / (677 / bins));
                  heatmap[bin_x][bin_y]++;
                }
                //绘制热点图
                var max = Math.max(...[].concat(...heatmap));
                for (var i = 0; i < bins; i++) {
                  for (var j = 0; j < bins; j++) {
                    var value = heatmap[i][j];
                    if (value > 0) {
                      var color = "rgba(255, 0, 0, " + (value / max) + ")";
                      var size = 15 + (value / max) * 4;
                      var cx = (i + 0.5) * (1200 / bins);
                      var cy = (j + 2.5) * (677 / bins);
                      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                      circle.setAttribute("cx", cx);
                      circle.setAttribute("cy", cy);
                      circle.setAttribute("r", size);
                      circle.setAttribute("fill", color);
                    document.getElementById("hotspots").appendChild(circle);
                      
                    }
                  }
                }
                
                //
      
               
                
            }
                        
          
            }
          )      

    },[])
    return (
       
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        <g id="scratch"></g>
        <g id="hotspots"></g>
        
        </g>
         {/* <svg width="1200" height="677">
              <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
              <g id="hotspots"></g>
              <g id="scratch"></g>
                <defs>
                
                  <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stop-color="rgb(255,255,255)" stop-opacity="1" />
                  <stop offset="100%" stop-color="rgb(255,255,255)" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="100" fill="url(#grad)" />
              </svg> */}
        </svg >  

    )
}
export default ShotsHeatMap;