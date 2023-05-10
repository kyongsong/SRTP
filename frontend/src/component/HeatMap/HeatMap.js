import { useEffect ,useState} from 'react';
import { Divider, Radio, Typography ,Space,Card,Tabs} from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import "./HeatMap.css"
import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Col, Row } from 'antd';
import ShotsHeatMap from '../ShotsHeatMap/ShotsHeatMap';
import ShotsMap from '../ShotsMap/ShotsMap';
import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import request from '../../utils/request';
const {Title}=Typography;
var storage=window.localStorage;
function HeatMap(){
  
  // <!-- 生成投篮数据的坐标(x, y) -->
 
  
   useEffect(()=>{
    

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
      const svg = document.getElementById("scratch");
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
    
    
       
            <Tabs.TabPane tab="ShotsHeatMap  " key="1" centered={true} >
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
            <div className='HeatMap'>
             <ShotsHeatMap/>
             
           </div> 
            </Tabs.TabPane>
    
    
           <Tabs.TabPane tab="ShotMap  " key="2">
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
            <div className='HeatMap'>
            <ShotsMap/>
           </div> 
              
            </Tabs.TabPane>
       
           <Tabs.TabPane tab="Pass Matrix  " key="3">
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
            <div className='HeatMap'>
            <svg width="500" height="500" viewBox="0 0 500 500">

  <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
  <rect x="50" y="50" width="400" height="400" fill="#F0F0F0" />
  <g>
   
    <text x="10" y="30" font-size="12" fill="#000">球员</text>
    <text x="30" y="30" font-size="12" fill="#000">位置</text>
    <text x="50" y="30" font-size="12" fill="#000">1</text>
    <text x="160" y="30" font-size="12" fill="#000">13</text>
    <text x="5" y="60" font-size="12" fill="#000">1</text>
    <text x="5" y="170" font-size="12" fill="#000">13</text>
   
    <g>
    
      <rect x="50" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
      <text x="65" y="70" fill="#000" font-size="10">球员1</text>
      <text x="55" y="80" fill="#000" font-size="10">位置1</text>
      <text x="55" y="90" fill="#000" font-size="10">5</text>
    </g>
  
    <g transform="translate(0, 30)">
     <rect x="50" y="50" width="30" height="30" fill="#a7ea7f" stroke="#000000" />
      <text x="65" y="70" fill="#000" font-size="10">球员2</text>
      <text x="55" y="80" fill="#000" font-size="10">位置2</text>
      <text x="55" y="90" fill="#000" font-size="10">10</text>
    </g>

  </g>

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
              </div>
           </Tabs.TabPane>
       
          <Tabs.TabPane tab="Pass Graph  " key="4">
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
    
          <Tabs.TabPane tab="LineUp" key="5">
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
           
          
    
          
          </Space>
   
       </Card>
  

    
    
      
   


    
  


  )
}

export default HeatMap