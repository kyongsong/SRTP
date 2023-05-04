import { useEffect ,useState} from 'react';
import { Divider, Radio, Typography ,Space,Card,Tabs} from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'

import AtlantaHawks from '../../assets/Atlanta Hawks.png'
import DetroitPistons from '../../assets/Detroit Pistons.png'
import { Col, Row } from 'antd';
import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import * as echarts from 'echarts';



function ScoreMap(){
 useEffect(()=>{

  
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

let base = +new Date(2016, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let valueBase2 = Math.random() * 50;
let data = [];
let data2 = [];

// for (var i = 1; i < 10; i++) {
//   var now = new Date((base += oneDay));
//   var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
//   valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
//   valueBase <= 0 && (valueBase = Math.random() * 300);
//   data.push([dayStr, valueBase]);
//   valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
//   valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
//   data2.push([dayStr, valueBase2]);
// }
option = {
  backgroundColor: '#00474f',
 
  title: {
    left: 'center',
    text: '比分走势',
   
  },
  legend: {
    top: 'bottom',
    data: ['Intention']
  },
  tooltip: {
    triggerOn: 'none',
    position: function (pt) {
      return [pt[0], 130];
    }
  },
  toolbox: {
    left: 'center',
    itemSize: 25,
    top: 55,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {}
    }
  },
  xAxis: {
   
    
      data: ["Q1","Q2","Q3","Q4"]
  
  },
  yAxis: {
    type: 'value',
    axisTick: {
      inside: true
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      inside: true,
      formatter: '{value}\n'
    },
    z: 10
  },
  grid: {
    top: 110,
    left: 15,
    right: 15,
    height: 160
  },
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#0770FF'
      },
      stack: 'a',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(58,77,233,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(58,77,233,0.3)'
          }
        ])
      },
       data: [0,25,78,89,90]
    },
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      stack: 'a',
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#F2597F'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(213,72,120,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(213,72,120,0.3)'
          }
        ])
      },
      data: [0,34,45,57,78]
    }
  ]
};

option && myChart.setOption(option);


 },[])
    return(
    <Card style={{
        backgroundColor: '#00474f',
        width:'35%',
        height:'37.5%',
        position:'absolute',
        
        left:1150,
        top:580
        
       
      }} 
      bordered={false} 
    
    >
      <div id="main" style={{ height: 362 ,width:567}}></div>
      
  
      
  
  
    
      

    

    </Card>
    )
}
export default ScoreMap