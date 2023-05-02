import { useEffect ,useState} from 'react';
import { Divider, Radio, Typography ,Space,Card,Tabs} from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import "./HeatMap.css"
import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Col, Row } from 'antd';
import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';

const {Title}=Typography;
function HeatMap(){
  // <!-- 生成投篮数据的坐标(x, y) -->
 
 
  
   useEffect(()=>{

    var x = [], y = [];
    for (var i = 0; i < 100; i++) {
      x.push(Math.random() * 800);
      y.push(Math.random() * 400+100  );
    }
   
   // 计算投篮数据的热点图
   var bins = 20;
   var heatmap = new Array(bins).fill(0).map(() => new Array(bins).fill(0));
   for (var i = 0; i < 100; i++) {
     var bin_x = Math.floor(x[i] / (800 / bins));
     var bin_y = Math.floor(y[i] / (800 / bins));
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
         var cx = (i + 0.5) * (800 / bins);
         var cy = (j + 3.5) * (800 / bins);
         var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
         circle.setAttribute("cx", cx);
         circle.setAttribute("cy", cy);
         circle.setAttribute("r", size);
         circle.setAttribute("fill", color);
       document.getElementById("hotspots").appendChild(circle);
        
       }
     }
   }

   },[])
  
 
  return (
    
    <Card style={{
        backgroundColor: '#00474f',
        width:'55%',
        height:'70%',
        position:'relative',
        left:50,
        top:50
        
       
      }} 
      bordered={false} 
    
    >
      
    <Space>
      
  
  
    <Tabs 
    defaultActiveKey="1" 
   
    style={{position:'absolute',top:30,left:30,width:"100%" ,color:"white",fontSize:18}}
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
          <svg  width="800" height="800" > 
              <image xlinkHref={BasketballBg} width="800" height="800" />
              <g>
              <rect x="0" y="0" width="800" height="800" fill="none" pointerEvents="all" />
              <g id="hotspots"></g>
              </g>
          </svg >  
       </div>
      </Space>

    </Card>
    
  


  )
}

export default HeatMap