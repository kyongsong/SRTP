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
  const chartRef = useRef(null);
  useEffect(() => {
    let myChart = echarts.init(chartRef.current);
   
    // 绘制图表
    let option = {
      radius: '480%',//仪表盘放大，默认的图太小了
      series: [
        // 背景
        {
            animation: false,
            name: '总数',
            type: 'gauge',
            center: ['50%', '50%'],
            startAngle: 360,
            endAngle: 0,
            splitNumber: 12,
            // 展示当前进度
            progress: {
                show: true,
                width: 20,
                roundCap: true,
                itemStyle: {
                    color: "black"
                },
            },
            // 仪表盘指针
            pointer: {
                show: false,
            },
            // 仪表盘轴线相关配置
            axisLine: {
                show: false,
            },
            // 刻度样式
            axisTick: {
                show: false,
            },
            // 分隔线样式
            splitLine: {
                show: false,
            },
            // 刻度标签
            axisLabel: {
                show: false,
            },
            // 表盘中指针的固定点
            anchor: {
                show: false,
            },
            detail: {
                show: false,
            },
            data: [
                {
                    value: 100,
                },
            ],
        },
        // 内容
        {
            name: '未整改',
            type: 'gauge',
            center: ['50%', '50%'],
            startAngle: '360',//180半环和360全环
            endAngle: '0',
            clockwise: false,//false进度逆时针
            // min: 0,
            // max: this.data.yh_total,
            zlevel: 10,
            // splitNumber: 10,
            // 展示当前进度
            progress: {
                show: true,
                width: 22,
                roundCap: true,
                itemStyle: {
                    color: 'black'
                },
            },
            // 仪表盘指针
            pointer: {
                show: false,
            },
            // 仪表盘轴线相关配置
            axisLine: {
                show: false,
            },
            // 刻度样式
            axisTick: {
                show: false,
            },
            // 分隔线样式
            splitLine: {
                show: false,
            },
            // 刻度标签
            axisLabel: {
                show: false,
            },
            // 表盘中指针的固定点
            anchor: {
                show: false,
            },
           
        },
      ],
    };
  
    myChart.setOption(option);
    return () => {
      // 组件销毁时销毁 RingProgress 实例
      myChart.destroy();
    };
  
  

  },[])

 
   






  
  return (
 
    <Card
      style={{
        backgroundColor: '#00474f',
        width: '30%',
        height: '35%',
        position: 'absolute',
        left: 1200,
        top: 200
      }}
      bordered={false}
     
    >
     <div ref={chartRef} style={{ height: "200px" ,width:"200px"}}></div>
         </Card>
    
 


  );
}




export default CriticalData;