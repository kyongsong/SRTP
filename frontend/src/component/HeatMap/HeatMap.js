function HeatMap(){
  // <!-- 生成投篮数据的坐标(x, y) -->
  
    var x = [], y = [];
    for (var i = 0; i < 100; i++) {
      x.push(Math.random() * 500);
      y.push(Math.random() * 300 + 100);
    }
 
   // 计算投篮数据的热点图
   var bins = 20;
   var heatmap = new Array(bins).fill(0).map(() => new Array(bins).fill(0));
   for (var i = 0; i < 100; i++) {
     var bin_x = Math.floor(x[i] / (500 / bins));
     var bin_y = Math.floor(y[i] / (500 / bins));
     heatmap[bin_x][bin_y]++;
   }

   // 绘制热点图
   var max = Math.max(...[].concat(...heatmap));
   for (var i = 0; i < bins; i++) {
     for (var j = 0; j < bins; j++) {
       var value = heatmap[i][j];
       if (value > 0) {
         var color = "rgba(255, 0, 0, " + (value / max) + ")";
         var size = 2 + (value / max) * 4;
         var cx = (i + 0.5) * (500 / bins);
         var cy = (j + 0.5) * (500 / bins);
         var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
         circle.setAttribute("cx", cx);
         circle.setAttribute("cy", cy);
         circle.setAttribute("r", size);
         circle.setAttribute("fill", color);
         document.getElementById("hotspots").appendChild(circle);
       }
     }
   }
 
  return (
<svg width="500" height="500">
  <image xlink:href="BasketballBackground.png" width="500" height="500"/>

 

  {/* <!-- 绘制投篮热点图 --> */}
  <g>
    <rect x="0" y="0" width="500" height="500" fill="none" pointer-events="all"/>
    <g id="hotspots"></g>
  </g>

 
</svg>
  )
}

export default HeatMap