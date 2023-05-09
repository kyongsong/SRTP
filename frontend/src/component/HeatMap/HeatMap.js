import { useEffect ,useState} from 'react';
import { Divider, Radio, Typography ,Space,Card,Tabs} from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import "./HeatMap.css"
import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Col, Row } from 'antd';
import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import request from '../../utils/request';
const {Title}=Typography;
var storage=window.localStorage;
function HeatMap(){
  
  // <!-- 生成投篮数据的坐标(x, y) -->
 
  
   useEffect(()=>{
    var PeriodData={'Period':1};
    request.post('/ShotsHeatMap', PeriodData).then(
      res =>{
          console.log(res)
          console.log(res.data.length)
      
      if(res.data.length===0){
        alert("获取失败")
      }else{
          var x = [], y = [];
          for(var i=0;i<res.data.length;i++){
            //读取后端数据

            //转换坐标
            x.push(res.data[i][0]*12.7)
            y.push(res.data[i][1].y*13.44)

          }
          // 计算投篮数据的热点图
          var bins = 20;
          var heatmap = new Array(bins).fill(0).map(() => new Array(bins).fill(0));
          for (var i = 0; i < 100; i++) {
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
                var size = 2 + (value / max) * 4;
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



   

   
    let Value=new Array();
    
    Value=JSON.parse(storage.getItem('InputTrack'))
   
    // let coordinates=[];
    for(var i=0;i<Value.length;i++){
      const data=JSON.parse(Value[i])
      var coordinates ="";
      
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
      //绘制轨迹
      console.log(coordinates)
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", coordinates);
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("stroke-width", "2");
      polyline.setAttribute("fill", "none");
      
      // 将polyline元素添加到SVG中
      const svg = document.getElementById("hotspots");
      svg.appendChild(polyline);
      
      
    }
    let myElement = document.getElementById('mys');
    let position = myElement.getBoundingClientRect();
    console.log(`left: ${position.left}, top: ${position.top}`);
    
    
    
   

   },[storage.getItem('InputTrack')])
  
 
  return (
    <Card
    style={{
      backgroundColor: '#00474f',
      width: '90%',
      height: '91%',
      position: 'absolute',
      left: 80,
      top: 100
    }}
    bordered={false}
   
  >
     <Space>
      
      
        <Tabs 
        defaultActiveKey="1" 
       
        style={{position:'absolute',top:30,left:100,width:"100%" ,color:"white",fontSize:18}}
        tabBarGutter={20} tabBarStyle={{ width: '82%'}}
    
        type="line"
        centered={true}
        >
    
    
       
            <Tabs.TabPane tab="1ST  " key="1" centered={true} >
            <Row>
                <Col span={8} offset={0}>
                  <img src={AtlantaHawks}/>
                  Atlanta Hawks
                </Col>
                <Col span={8} offset={6}>
                <img src={DetroitPistons}/>
                Detroit Pistons
                </Col> 
            </Row>
            <Row>
                <Col span={5} offset={2}>
                <b>
                  <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                
                  
                </b>
                </Col>
                <Col span={6} offset={9}>
                <b>
                <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                </b>
                  
                
                </Col> 
            </Row>
            
            </Tabs.TabPane>
    
    
           <Tabs.TabPane tab="2ST  " key="2">
           <Row>
                <Col span={8}>
                  <img src={AtlantaHawks}/>
                  Atlanta Hawks
                </Col>
                <Col span={8} offset={6}>
                <img src={DetroitPistons}/>
                Detroit Pistons
                </Col> 
            </Row>
            <Row>
                <Col span={5} offset={2}>
                <b>
                  <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                
                  
                </b>
                </Col>
                <Col span={6} offset={9}>
                <b>
                <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                </b>
                  
                
                </Col> 
            </Row>
              
            </Tabs.TabPane>
       
           <Tabs.TabPane tab="3ST  " key="3">
           <Row>
                <Col span={8}>
                  <img src={AtlantaHawks}/>
                  Atlanta Hawks
                </Col>
                <Col span={8} offset={6}>
                <img src={DetroitPistons}/>
                Detroit Pistons
                </Col> 
            </Row>
            <Row>
                <Col span={5} offset={2}>
                <b>
                  <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                
                  
                </b>
                </Col>
                <Col span={6} offset={9}>
                <b>
                <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                </b>
                  
                
                </Col> 
            </Row>
           </Tabs.TabPane>
       
          <Tabs.TabPane tab="4ST  " key="4">
          <Row>
                <Col span={8}>
                  <img src={AtlantaHawks}/>
                  Atlanta Hawks
                </Col>
                <Col span={8} offset={6}>
                <img src={DetroitPistons}/>
                Detroit Pistons
                </Col> 
            </Row>
            <Row>
                <Col span={5} offset={2}>
                <b>
                  <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                
                  
                </b>
                </Col>
                <Col span={6} offset={9}>
                <b>
                <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                </b>
                  
                
                </Col> 
            </Row>
          </Tabs.TabPane>
    
          <Tabs.TabPane tab="All Ground" key="5">
          <Row>
                <Col span={8}>
                  <img src={AtlantaHawks}/>
                  Atlanta Hawks
                </Col>
                <Col span={8} offset={6}>
                <img src={DetroitPistons}/>
                Detroit Pistons
                </Col> 
            </Row>
            <Row>
                <Col span={5} offset={2}>
                <b>
                  <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                
                  
                </b>
                </Col>
                <Col span={6} offset={9}>
                <b>
                <Space>
                  <DribbbleOutlined />
                    36/85
                  </Space>
                </b>
                  
                
                </Col> 
            </Row>
            </Tabs.TabPane> 
    
           </Tabs> 
           
          
    
           <div className='HeatMap'>
              <svg  width="1200" height="677" > 
                  <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
                  <g>
                  <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
                  <g id="hotspots"></g>
                  </g>
              </svg >  
           </div> 
          </Space>
   
       </Card>
  

    
    
      
   


    
  


  )
}

export default HeatMap