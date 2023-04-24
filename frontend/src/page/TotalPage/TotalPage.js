import { useEffect, useRef } from "react";

import * as echarts from "echarts";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./TotalPage.css"
import { Typography,Divider } from "antd";
import Header from "../../component/Header/Header";
import request from "../../utils/request";


const { Title, Paragraph, Text, Link } = Typography;
var store = window.localStorage
var username1 = store.getItem("UserName")

function TotalPage() {
  //统计当前正常设备/故障设备
  const chartRef = useRef(null);
  //统计最近7天出故障设备个数
  const NormalDisnormalRef=useRef(null);


  useEffect(() => {

    let chartInstance = echarts.init(chartRef.current);
    let NormalDisnormalInst=echarts.init(NormalDisnormalRef.current)
    
    const Data={"username":username1}
    var Normal=0;
    var Disnormal=0;
    
    request.post("/api/getNormalDisnormal",Data).then(  
        // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
          
          console.log("获取数据"+res.data[0])
          console.log("获取数据"+res.data[1])
          Normal=res.data[0].cnt
          Disnormal=res.data[1].cnt
          const option = {
            title: {
                text: '设备状态统计'
            },
    
            series : [
                {
                    name: '访问来源',
                    type: 'pie',    // 设置图表类型为饼图
                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                    data:[          // 数据数组，name 为数据项名称，value 为数据项值
                        {value:Normal, name:'正常设备'},
                        {value:Disnormal, name:'故障设备'},
                        
                    ]
                }
            ]
    
        };
        chartInstance.setOption(option);
         
            
          }
        ).catch(res => {  // 错误处理
            console.log(res.data.res)
            console.log("FAILED")
        })
        const Date={
            "username":username1,
            "date0":"2022-12-7",
            "date1":"2022-12-8",
            "date2":"2022-12-9",
            "date3":"2022-12-10",
            "date4":"2022-12-11",
            "date5":"2022-12-12",
            "date6":"2022-12-13",
        }
        request.post("/api/getDisnormalDate",Date).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
              
              console.log("获取数据"+res.data)
              var date0=res.data[0].cnt
              var date1=res.data[1].cnt
              var date2=res.data[2].cnt
              var date3=res.data[3].cnt
              var date4=res.data[4].cnt
              var date5=res.data[5].cnt
              var date6=res.data[6].cnt
              
              const option2={
                title: {
                    text: '最近7天故障设备变化'
                },
                tooltip: {},
                legend: {
                    data:['个']
                },
                xAxis: {
                    data: ["2022-12-7","2022-12-8","2022-12-9","2022-12-10","2022-12-11","2022-12-12","2022-12-13"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [date0,date1, date2,date3,date4,date5,date6]
                }]
            }
            NormalDisnormalInst.setOption(option2)

             
                
              }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
       
    
    

     
    
  }, []);



  return (
    <div className='Page'>
        <div className='PageHeader'>
          <Header />
        </div>
            
        <div className='Side'>
            <Sidebar />
            <div className='Contain'>

                   <Typography>
                    <div ref={chartRef} style={{ height: "400px" }}></div>
                    
                    <Divider />
                    <div ref={NormalDisnormalRef} style={{height: "600px"}}></div>

                   </Typography>
                   
            </div>
        </div>
        
    </div>
    
            
        

    
    

  );

}



export default TotalPage;