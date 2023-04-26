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

### 1.2.1 有关转换坐标的问题

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

+ Basketball Image从left 100px 调整为了 200px 后续的一系列参数需要调整
  + 可能会出现画的轨迹和检索轨迹不符合

+ ScoreBoard的实现
+ RoundPlay List的前后端衔接

#### 2.后端

+ backend算法实现
  + dtw算法-检索速度过慢
