# 1. BasketBall Analysing System

文件目录如下

```
|----backend
	 |------app.py
	 |------dtw.py	
	 |------routes.py
|----frontend
	 |------public
	 |------src 
	 |------ReadME.md
```
## 1.0 文件夹说明
1. frontend文件夹
2. backend文件夹

## 1.1 如何运行？
1. 进入frontend文件夹，输入`npm i` 安装依赖包
2. `npm run start` 将react项目run起来即可
3. 如果在调试前端功能的时候，只需要跑`react`项目即可，无需跑后端
4. 如果需要测试前后端项目的时候，需要进入`backend`文件夹，将`app.py`文件跑起即可

## 1.2 编写时注意事项

### 1.2.1 前后端交互数据格式-JSON

+ @app.route("/ShotsMap", methods=['POST'])

  + 提交格式

    ```
    {
    'current_round':x
    }
    ```

    current_round当前的匹配回合

  + 返回格式

    ```
    {"2pt&made": shot_2pt_made_pos, "2pt&miss": shot_2pt_miss_pos, "3pt&made": shot_3pt_made_pos, "3pt&miss": shot_3pt_miss_pos}
    
    shot_2pt_made_pos = [[x1,y1], [x2,y2], ...], shot_2pt_miss_pos ...
    ```
    
    返回当前回合附近的近二十个回合的出手位置
  
+ @app.route("/ShotsHeatMap", methods=['POST'])

  + 提交格式

    ```
    {
    'current_round':x
    }
    ```

  + 返回格式

    ```
    {'shot_position':[[x,y],[x,y]....]}
    ```
  
+ @app.route("/PassMatrix", methods=['POST'])

  + 提交格式

    ```
    {
    'current_round':x
    'Team':默认HomeTeam
    }
    ```
  
  + 返回格式
  
  ```
  {
  	'player1':[1,2----13],
  	'player2':[1,2----13],
  	'player3':[1,2----13],
  	.....
  	'player13':[1,2---13]
  }
  ```
  
  一个实际样例
  
  ```
  {'player1' : [26, 0 , 1, 0 , 0 , 0, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player2' : [0 , 25, 0, 0 , 0 , 0, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player3' : [0 , 0 , 4, 0 , 0 , 0, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player4' : [1 , 0 , 0, 15, 0 , 1, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player5' : [0 , 0 , 0, 0 , 11, 0, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player6' : [1 , 0 , 0, 1 , 0 , 0, 0, 0 , 0 , 0, 0 , 0 , 0 ],
   'player7' : [0 , 0 , 0, 0 , 0 , 0, 8, 0 , 0 , 0, 0 , 0 , 0 ],
   'player8' : [0 , 0 , 0, 0 , 0 , 0, 0, 32, 0 , 0, 0 , 0 , 0 ],
   'player9' : [0 , 0 , 0, 0 , 0 , 0, 0, 0 , 24, 0, 0 , 0 , 0 ],
   'player10': [0 , 0 , 0, 0 , 0 , 0, 0, 0 , 0 , 7, 0 , 0 , 0 ],
   'player11': [0 , 0 , 0, 0 , 0 , 0, 0, 0 , 0 , 0, 17, 0 , 0 ],
   'player12': [0 , 0 , 0, 0 , 0 , 0, 0, 0 , 0 , 0, 0 , 31, 0 ],
   'player13': [0 , 0 , 0, 0 , 0 , 0, 0, 0 , 0 , 0, 0 , 0 , 13],}
  ```
  
+ @app.route("/isolate", methods=['POST'])

  + 提交格式

    ```
  {
    'current_round':x
  }
    ```

  + 返回格式

    ```
    [{"iso_player":james, "iso_trace":[[x,y],[x,y]....], "iso_result": made/miss},
    {"iso_player":curry, "iso_trace":[[x,y],[x,y]....], "iso_result": made/miss},
    {"iso_player":irving, "iso_trace":[[x,y],[x,y]....], "iso_result": made/miss} ...]
    ```
    
    isolate的含义是单打，即我们会去寻找当前回合前20个回合的球星单打轨迹，并将单打结果返回给前端，包括单打球员名字、单打轨迹、单打结果（made和miss两种情况），前端绘制时，只需要在球场上绘制轨迹，在轨迹起点标注球员名字，红色表达单打成功，黑色表示单打失败

+ @app.route("/Match", methods=['POST'])

  + 提交格式

    + 如果sidebar不选择相应算法，默认为dtw

    + 选择encoder的时候提交格式如下

      ```
      {MoveTrack: '[{"x1":11.190476190476192,"y1":10.180995475113122}…{"x1":36.904761904761905,"y1":12.44343891402715}]', ChoosingAlgorithm: '"encoder"'}
      ```

    + 选择dtw的时候提交格式如下

    ```
    {MoveTrack: '[{"x1":11.190476190476192,"y1":10.180995475113122}…{"x1":36.904761904761905,"y1":12.44343891402715}]', ChoosingAlgorithm: '"dtw"'}
    ```

  + 如果要实现多重轨迹算法，前端提交格式为

  ```
  [[{'MoveTrack': ['[{"x1":10.793650793650794,"y1":14.705882352941178},{"x1":10.873015873015873,"y1":14.705882352941178},{"x1":11.904761904761905,"y1":14.40422322775264},{"x1":13.650793650793652,"y1":14.102564102564102},{"x1":15.714285714285715,"y1":13.951734539969834},{"x1":17.77777777777778,"y1":13.951734539969834},{"x1":20,"y1":13.951734539969834},{"x1":21.58730158730159,"y1":14.102564102564102},{"x1":24.126984126984127,"y1":14.102564102564102},{"x1":25.714285714285715,"y1":14.253393665158372},{"x1":26.904761904761905,"y1":14.253393665158372},{"x1":27.460317460317462,"y1":14.253393665158372},{"x1":27.61904761904762,"y1":14.253393665158372},{"x1":27.6984126984127,"y1":14.253393665158372}]'], 'ChoosingAlgorithm': '"dtw"'}], 
  [{'MoveTrack': ['[{"x1":34.44444444444444,"y1":34.087481146304675},{"x1":34.20634920634921,"y1":34.087481146304675},{"x1":33.88888888888889,"y1":34.16289592760181},{"x1":33.41269841269841,"y1":34.31372549019608},{"x1":32.77777777777778,"y1":34.31372549019608},{"x1":32.06349206349206,"y1":34.38914027149321},{"x1":31.34920634920635,"y1":34.53996983408748},{"x1":30.31746031746032,"y1":34.53996983408748},{"x1":29.761904761904763,"y1":34.53996983408748},{"x1":28.96825396825397,"y1":34.61538461538461},{"x1":27.53968253968254,"y1":34.61538461538461},{"x1":26.984126984126984,"y1":34.61538461538461},{"x1":26.666666666666668,"y1":34.69079939668175},{"x1":26.42857142857143,"y1":34.69079939668175},{"x1":26.11111111111111,"y1":34.69079939668175},{"x1":25.793650793650794,"y1":34.76621417797888},{"x1":25.476190476190478,"y1":34.841628959276015},{"x1":25.07936507936508,"y1":34.841628959276015},{"x1":24.841269841269842,"y1":34.841628959276015},{"x1":24.523809523809526,"y1":34.841628959276015},{"x1":24.126984126984127,"y1":34.917043740573156},{"x1":23.650793650793652,"y1":34.917043740573156},{"x1":22.857142857142858,"y1":34.917043740573156},{"x1":22.3015873015873,"y1":34.917043740573156},{"x1":21.666666666666668,"y1":34.917043740573156},{"x1":20.793650793650794,"y1":34.917043740573156},{"x1":20.476190476190478,"y1":34.917043740573156},{"x1":20.158730158730158,"y1":34.917043740573156},{"x1":19.92063492063492,"y1":34.917043740573156},{"x1":19.761904761904763,"y1":34.917043740573156},{"x1":19.682539682539684,"y1":34.917043740573156},{"x1":19.603174603174605,"y1":34.917043740573156},{"x1":19.523809523809526,"y1":34.917043740573156}]'], 'ChoosingAlgorithm': '"dtw"'}]]
  ```

  

  + 返回格式

  ```json
  {
  	{'status': 'success', 'data': data_rst,'events':"Attacking", 'player_Name':"James" ,'AgainstTeam':"Lakers"}
  }
  ```

  修改后的格式样例
  
  ```
  {"status": "success", "data": [["65", 51, 149], ["15", 54, 123]], "events": ["Atlanta Hawksattacking on Round 65", "Atlanta Hawksattacking on Round 15"], "player_Name": ["Steve Blake", "Reggie Jackson"], "AgainstTeam": ["Detroit Pistons", "Detroit Pistons"]}
  ```

### 1.2.2 有关转换坐标的问题

由于我们需要在战术板上画球员轨迹，并把符合轨迹的场面显示在浏览器中。因此涉及转换坐标的有以下几个关系。

+ 关系1：球场和Canvas之间的关系

  + 首先观察球场数据可以发现，我们当前的球场是94*50米的球场

  + 观察球场图片的size可以发现，图片的size为1194*672 px

  + 统一Canvas和图片的照片大小

+ 关系2：将鼠标点击的轨迹转化为球场轨迹

  + 鼠标坐标转化为Canvas坐标

    + 利用函数-黑盒操作 （没有搞懂原理）

    ```react
    const windowToCanvas = (canvas, x, y) => {
            let rect = canvas.getBoundingClientRect()            
            return {
                    
                    x: x - rect.left * (canvas.width/rect.width),
                    y: y - rect.top * (canvas.height/rect.height)
            }
        }
    ```

  + Canvas坐标转化为球场坐标

    + 通过点击球场最左端得到，观察console得到坐标Base（6，6）
    + 点击球场右最下端得到，观察console得到坐标Offset（1185，666）

    因此可以得到鼠标点击的任意坐标（x,y）可以通过下方的公式得到球场坐标(x1,y1)

    ```
    x1=(x-BaseX)/（(OffsetX-BaseX)/球场长度）
    y1=(y-BaseY)/（(OffsetY-BaseY)/球场宽度）
    球场(94,50)
    ```

    

    

+ 关系3：将球场轨迹转化为浏览器显示轨迹

  + 已知图片的初始放置位置为(240px,180px),比对球在（240px，180px）看球是否会落在初始位置处
    + 发现实际需要把球的初始位置调整为Base（200px，100px）合适
  + 图片的大小为1194*672Px，通过球场的大小(94,50)可以得到 (XRate,YRate)
  + 因此可以得到球场上球员的坐标（x,y）可以通过下方的公式得到在Canvas上的坐标(x1,y1)

  ```
  x1=(x+BaseX)*（XRate）
  y1=(y+BaseY)*（YRate）
  球场(94,50)
  ```

  

### 1.3 仍需要解决问题

#### 1.前端

+ Basketball Image从left 200px 调整为了 380px 后续的一系列参数需要调整
  + 可能会出现画的轨迹和检索轨迹不符合
+ ScoreBoard的实现
  + 比分部分还没有实现
+ RoundPlay List的前后端衔接
  + RoundPlay List 改成弹窗的形式（实现）
  + 点击跳转的页面-需要完成点击窗户收回
  + 后续可添加预览图
+ PlayProgressBar 完成
+ 绘制PassMatrix

  ```
  要在SVG中绘制一个带有13x13矩阵表格的矩阵，您可以使用SVG的rect元素来创建小正方形，并使用循环来创建多个小正方形，并根据数值设置每个小正方形的颜色。以下是一个示例SVG代码，它创建了一个13x13矩阵表格，每个小正方形根据其值被渲染为不同的颜色：
  
  <svg width="500" height="500" viewBox="0 0 500 500">
    <!-- 绘制网格线 -->
    <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
    <rect x="50" y="50" width="400" height="400" fill="#F0F0F0" />
    <g>
      <!-- 绘制矩阵内容 -->
      <text x="10" y="30" font-size="12" fill="#000">球员</text>
      <text x="30" y="30" font-size="12" fill="#000">位置</text>
      <text x="50" y="30" font-size="12" fill="#000">1</text>
      <text x="160" y="30" font-size="12" fill="#000">13</text>
      <text x="5" y="60" font-size="12" fill="#000">1</text>
      <text x="5" y="170" font-size="12" fill="#000">13</text>
      <!-- 循环绘制小正方形 -->
      <g>
        <!-- 13x13小正方形表格内容 -->
        <rect x="50" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
        <text x="65" y="70" fill="#000" font-size="10">球员1</text>
        <text x="55" y="80" fill="#000" font-size="10">位置1</text>
        <text x="55" y="90" fill="#000" font-size="10">5</text>
      </g>
      <!-- 内部循环 -->
      <g transform="translate(0, 30)">
        <!-- 13x13小正方形表格内容 -->
        <rect x="50" y="50" width="30" height="30" fill="#a7ea7f" stroke="#000000" />
        <text x="65" y="70" fill="#000" font-size="10">球员2</text>
        <text x="55" y="80" fill="#000" font-size="10">位置2</text>
        <text x="55" y="90" fill="#000" font-size="10">10</text>
      </g>
      <!-- 循环结束 -->
    </g>
    <!-- 绘制图例内容 -->
    <g>
      <rect x="50" y="450" width="20" height="20" fill="#d9efff" stroke="#000000" />
      <text x="80" y="465" fill="#000" font-size="10">数值最小</text>
    </g>
    <g>
      <rect x="150" y="450" width="20" height="20" fill="#a7ea7f" stroke="#000000" />
      <text x="180" y="465" fill="#000" font-size="10">数值较小</text>
    </g>
    <g>
      <rect x="250" y="450" width="20" height="20" fill="#61c750" stroke="#000000" />
      <text x="280" y="465" fill="#000" font-size="10">数值中等</text>
    </g>
    <g>
      <rect x="350" y="450" width="20" height="20" fill="#004F33" stroke="#000000" />
      <text x="380" y="465" fill="#000" font-size="10">数值最大</text>
    </g>
  </svg>
  在上面的示例中，我们使用了text元素来创建表格的标题、行名、列名和图例，使用了rect元素来创建矩形背景和小正方形、使用fill属性设置小正方形的填充色，根据不同的值设置了不
  ```

  

#### 2.后端

+ backend算法实现
  + dtw算法-检索速度过慢
  + encoder算法还没有融入
