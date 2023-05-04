import { useEffect ,useState,useRef} from 'react';
import { Divider, Radio, Typography ,Space,Card,Tabs} from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'

import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Col, Row } from 'antd';
import * as echarts from "echarts";

import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import { RingProgress } from '@antv/g2plot';





function CriticalData(){
  
  useEffect(() => {
    var chartDom = document.getElementById('ThreePoint');
    var PenaltychartDom = document.getElementById('PenaltyPoint');
    var FaultchartDom = document.getElementById('Fault');

    var myChart = echarts.init(chartDom);
    var PenaltyChart=echarts.init(PenaltychartDom);
    var FaultChart=echarts.init(FaultchartDom);
    var option;
    
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      itemStyle: {
        // 修改 line 颜色
        color: '#f00'
      },
      lineStyle: {
        // 修改 lineStyle 颜色
        color: '#0f0'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 13, name: 'Penalty Point' },
            { value: 7, name: 'Fault' },
            
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
    option && PenaltyChart.setOption(option);
    option && FaultChart.setOption(option);
   

  },[])

 
   






  
  return (
 
    <Card
      style={{
        backgroundColor: '#00474f',
        width:'35%',
        height:'37.5%',
        position:'absolute',
        
        left:1150,
        top: 200
      }}
      bordered={false}
     
    >
      <div style={{display:'flex'}}>
      <div id="ThreePoint" style={{ height: 362 ,width:187}}></div>
      <div id="PenaltyPoint" style={{ height: 362 ,width:187}}></div>
      <div id="Fault" style={{ height: 362 ,width:187}}></div>
      </div>
     
         </Card>
    
 


  );
}




export default CriticalData;