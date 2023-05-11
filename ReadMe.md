# BasketBall Analysing System

## **项目实施结果概述：**

**当前我们的系统后端由python搭建，前端由React+Antd搭建，形成了一个良好的篮球轨迹检索和球场数据分析系统。其中，后端提供了多种检索算法的接口，前端能够支持基于草图的轨迹查询以及对于篮球比赛相关数据的可视分析结果。**  



## **本项目主要研究内容如下：**

1. **在后端，我们优化了轨迹检索方案，设计了多种检索算法：**

（1）**基于时间序列的DTW算法，其基本思路是将两个序列进行伸缩变换进行对齐，然后计算对其后的序列的欧氏距离。**

（2）**基于深度学习框架的Encoder算法，具体来说，就是通过深度学习的方法，将一个序列映射到特定维度的向量空间，然后进行向量的相似度比较。**

（3）**基于轨迹几何特征的算法。将两个坐标序列转换为轨迹，然后比较这两条轨迹的形状。包括计算轨迹的几何特征，如面积、周长、曲率等，并计算它们之间的差异。**

（4）**将坐标序列转化为一个图形（例如使用欧几里得距离来表示节点之间的距离），然后使用图形匹配算法（例如图形同构算法或者最大权重匹配算法）来计算两个图形的相似度。**

**最后，我们分析了不同算法在检索时间、得到的结果质量等方面的优劣，以及它们在不同场景下的应用意义。**



2. **在前端，我们通过React + Antd优化了前端的设计，使得整体界面的美观度和交互性大幅提升。具体来说，当前的前端系统分成sketch-based检索系统与可视化分析系统两个模块。**

（1）**在sketch-based检索系统中，我们支持手绘多条球员运动轨迹作为查询的输入，在后端通过高效的算法匹配数据库中的相应回合，并将其返回以动画形式进行呈现。该模块非常契合教练员在球场上画战术板的模式，在篮球比赛实战分析中具有非常大的潜力。**

**（2）在可视化分析系统中，我们充分利用了数据库中大量的细粒度球员赛场数据，分析产生一系列重要的球场数据，例如球员在特定场景下的命中率预测，同类型战术在不同场景下的得分效率等等。我们还结合ECHARTS组件和svg对分析结果进行可视化呈现。传统数据分析方式通常比较枯燥和简单，我们通过可视化的方案，能够让篮球数据分析更加直观，方便教练员和篮球专家进行数据提取和分析。**



## 系统概述

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

### 1.0 文件夹说明

1. frontend文件夹
2. backend文件夹

### 1.1 如何运行？

1. 进入frontend文件夹，输入 `npm i` 安装依赖包
2. `npm run start` 将react项目run起来即可
3. 如果在调试前端功能的时候，只需要跑 `react`项目即可，无需跑后端
4. 如果需要测试前后端项目的时候，需要进入 `backend`文件夹，将 `app.py`文件跑起即可

### 1.2 编写时注意事项

#### 1.2.1 前后端交互数据格式-JSON

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
+ @app.route("/PassGraph", methods=['POST'])

  - 提交格式

    ```
    {
    'current_round':x
    'Team':'home' or 'visitor'
    }
    ```
  - 返回格式

    ```
    [
    	[0, 0, 0, 0, 0],
    	[0, 0, 0, 0, 0],
    	[0, 0, 0, 0, 0],
    	[0, 0, 0, 0, 0],
    	[0, 0, 0, 0, 0]
    ]
    ```

    这里的格式是一个二维list访问，其中 `list[][]`第一维代表传球的传出者，第二维代表传球的传入者，需要注意下标范围属于 `0 ~ 4`，不要越界；其中访问到的元素为从 `list[传出者][传入者] = 传球次数（从传出者到传入者）`
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

  - 一个实际样例

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
  
  - 返回格式

  
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
    [{'MoveTrack': ['[{"x1":34.44444444444444,"y1":34.087481146304675},{"x1":34.20634920634921,"y1":34.087481146304675},{"x1":33.88888888888889,"y1":34.16289592760181},{"x1":33.41269841269841,"y1":34.31372549019608},{"x1":32.77777777777778,"y1":34.31372549019608},{"x1":32.06349206349206,"y1":34.38914027149321},{"x1":31.34920634920635,"y1":34.53996983408748},{"x1":30.31746031746032,"y1":34.53996983408748},{"x1":29.761904761904763,"y1":34.53996983408748},{"x1":28.96825396825397,"y1":34.61538461538461},{"x1":27.53968253968254,"y1":34.61538461538461},{"x1":26.984126984126984,"y1":34.61538461538461},{"x1":26.666666666666668,"y1":34.69079939668175},{"x1":26.42857142857143,"y1":34.69079939668175},{"x1":26.11111111111111,"y1":34.69079939668175},{"x1":25.793650793650794,"y1":34.76621417797888},{"x1":25.476190476190478,"y1":34.841628959276015},{"x1":25.07936507936508,"y1":34.841628959276015},{"x1":24.841269841269842,"y1":34.841628959276015},{"x1":24.523809523809526,"y1":34.841628959276015},{"x1":24.126984126984127,"y1":34.917043740573156},{"x1":23.650793650793652,"y1":34.917043740573156},{"x1":22.857142857142858,"y1":34.917043740573156},{"x1":22.3015873015873,"y1":34.917043740573156},{"x1":21.666666666666668,"y1":34.917043740573156},{"x1":20.793650793650794,"y1":34.917043740573156},{"x1":20.476190476190478,"y1":34.917043740573156},{"x1":20.158730158730158,"y1":34.917043740573156},{"x1":19.92063492063492,"y1":34.917043740573156},{"x1":19.761904761904763,"y1":34.917043740573156},{"x1":19.682539682539684,"y1":34.917043740573156},{"x1":19.603174603174605,"y1":34.917043740573156},{"x1":19.523809523809526,"y1":34.917043740573156}]'], 'ChoosingAlgorithm': '"dtw2"'}]]
    ```
  + 返回格式

    ```
    {
    	{'status': 'success', 'data': data_rst,'events':"Attacking", 'player_Name':"James" ,'AgainstTeam':"Lakers"}
    }
    ```

  - 修改后的格式样例

    ```
    {"status": "success", "data": [["65", 51, 149], ["15", 54, 123]], "events": ["Atlanta Hawksattacking on Round 65", "Atlanta Hawksattacking on Round 15"], "player_Name": ["Steve Blake", "Reggie Jackson"], "AgainstTeam": ["Detroit Pistons", "Detroit Pistons"]}
    ```

#### 1.2.2 有关转换坐标的问题

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

