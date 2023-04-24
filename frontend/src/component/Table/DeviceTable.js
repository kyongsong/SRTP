import {React,useEffect} from 'react';
import { Modal, Space, Table,Button,Form ,Input,Slider,Checkbox,Switch} from 'antd';
import ScoreForm from '../ScoreForm/ScoreForm';
import axios from 'axios'
import { AimOutlined } from '@ant-design/icons';
import DeviceDataList from '../GlobalVar/DeviceList';
import request from '../../utils/request';

import { useState } from 'react';
import { forwardRef, useImperativeHandle } from 'react'


var store = window.localStorage
var username1 = store.getItem("UserName")

let LampStatus=[];

const DeviceTable =forwardRef(({
},ref)=>{
    useImperativeHandle(ref,()=>({
        UpdateDeviceTable:UpdateDeviceTable
    }))
 
    function UpdateDeviceTable(){
         // console.log(CenterDataList)
     let newdata1=[...DeviceDataList]; 
     setDeviceList(newdata1)
    }
   
    const  DeleteDevice=(index)=>{
        //Ajax-Delte the Room by No
        
        const Device={
          "DeviceNo":index.No,
          "DeviceType":index.DeviceType
        }
       
    
        for(var i=0;i<DeviceDataList.length;i++){
         
          if(DeviceDataList[i].No==index.No){
            DeviceDataList.splice(i,1)  
          }
          
        }
        
        UpdateDeviceTable(DeviceDataList)
        
        request.post("/api/DeleteDevice",Device).then(  
          // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
          res => {  // 成功的回调函数
            
            alert("删除房间成功")
              
            }
          ).catch(res => {  // 错误处理
              console.log(res.data.res)
              console.log("FAILED")
          })
      
      }
    //initial DeviceTable List
    const [DeviceList,setDeviceList]=useState("")
    
    //Get the Device List
    useEffect(()=>{
    
        const getDevice= async() =>{
         
          var username = { "username": username1 } // 传入的参数，使用 json 格式
          request.post("/api/getDevice",username).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
              var length=res.data.length;
            
              for(var i=0;i<length;i++){
                var temp={
                  index:res.data[i].DeviceNo,
                  No:res.data[i].DeviceNo,
                  RoomType:res.data[i].RoomType,
                  CenterName:res.data[i].CenterName,
                  TimeStamp:res.data[i].TimeStamp,
                  DeviceType:res.data[i].DeviceType,
                  Username:res.data[i].Creater
      
                }
                DeviceDataList.push(temp);
              }
              console.log(DeviceDataList)
              setDeviceList(DeviceDataList)
                
              }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
          
        }
        getDevice()
      },[])
    
    const [isSwitchOpen, setIsSwitchOpen] = useState(false);
    const [isLampOpen, setIsLampOpen] = useState(false);
    const [isSensorOpen, setIsSensorOpen] = useState(false);
    const [isLockOpen, setIsLockOpen] = useState(false);

    //Record the Lamp Information
    const [LampStatus,setLampStatus]=useState('正常');
    const [LampLuminance,setLampluminance]=useState(false);
    
    const [LampPosition_X,setLampPosition_X]=useState(false)
    const [LampPosition_Y,setLampPosition_Y]=useState(false)
    
    //Record the Switch Information
    const [SwitchPosition_X,setSwitchPosition_X]=useState(0)
    const [SwitchPosition_Y,setSwitchPosition_Y]=useState(0)
    const [SwitchNo,setSwitchNo]=useState(0)
    const [SwitchOnOff,setSwitchOnOff]=useState(false)
    const [SwitchStatus,setSwitchStatus]=useState(false)
    //Record the Sensor Information 
    const [SensorPosition_X,setSensorPosition_X]=useState(0)
    const [SensorPosition_Y,setSensorPosition_Y]=useState(0)
    const [SensorTemperature,setSensorTemprature]=useState(false)
    const [SensorStatus,setSensorStatus]=useState(false)
    //Record the Lock Information
    const [LockPosition_X,setLockPosition_X]=useState(0)
    const [LockPosition_Y,setLockPosition_Y]=useState(0)
    const [LockOnOff,setLockOnOff]=useState(false)
    const [LockStatus,setLockStatus]=useState(false)

    const [ClickDeviceNo,setClickDeviceNo]=useState("")
    

   
    const showDetail= (index)=> {
        //Ajax -Get the Information
        var Device={"DeviceNo":index.No,"DeviceType":index.DeviceType}
        
        if(index.DeviceType==="灯"){
            setClickDeviceNo(index.No)
            request.post("/api/getDeviceInfo",Device).then(  
                // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
                res => {  // 成功的回调函数
                   
                    var lamp={"Luminance":res.data[0].Luminance}
                    console.log(lamp.Luminance)
                    setLampluminance(lamp.Luminance)
                    if(res.data[0].Status===1){
                        var status={"Status":"正常"}
                        console.log("fuck "+status.Status)
                        setLampStatus(status.Status)
                        
                        console.log(LampStatus)
                    }
                    else{
                        var status={"Status":"故障"}
                        setLampStatus(status.Status)
                        //setLampStatus(true)
                    }
                    
                    setLampPosition_X(res.data[0].PositionX)
                    setLampPosition_Y(res.data[0].PositionY)
                }
                ).catch(res => {  // 错误处理
                    console.log(res.data.res)
                    console.log("FAILED")
                })
            
            setIsLampOpen(true)
        }
        else if(index.DeviceType==="开关"){
            setClickDeviceNo(index.No)
            request.post("/api/getDeviceInfo",Device).then(  
                // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
                res => {  // 成功的回调函数
                   
                  
                  setSwitchNo(res.data[0].ControlLampId)
                  console.log(SwitchOnOff)
                  if(res.data[0].OnOff===true){
                    
                    setSwitchOnOff("On")
                  }
                  else{
                    setSwitchOnOff("Off")
                  }
                 
                  if(res.data[0].Status===1){
                    setSwitchStatus("正常")
                    }
                    else{
                    setSwitchStatus("故障")
                    }
                  setSwitchPosition_X(res.data[0].PositionX)
                  setSwitchPosition_Y(res.data[0].PositionY)
                  
                  }
                ).catch(res => {  // 错误处理
                    console.log(res.data.res)
                    console.log("FAILED")
                })

            setIsSwitchOpen(true)
        }
        else if(index.DeviceType==="传感器"){
            console.log(index.DeviceType)
            setClickDeviceNo(index.No)
            request.post("/api/getDeviceInfo",Device).then(  
                // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
                res => {  // 成功的回调函数

                  setSensorTemprature(res.data[0].Temperature)
                  if(res.data[0].Status===1){
                    setSensorStatus("正常")
                }
                else{
                    setSensorStatus("故障")
                }
                  setSensorPosition_X(res.data[0].PositionX)
                  setSensorPosition_Y(res.data[0].PositionY)
                  
                  }
                ).catch(res => {  // 错误处理
                    console.log(res.data.res)
                    console.log("FAILED")
                })
                setIsSensorOpen(true)
        }
        else if(index.DeviceType==="门锁"){
            console.log(index.DeviceType)
            setClickDeviceNo(index.No)
            request.post("/api/getDeviceInfo",Device).then(  
                // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
                res => {  // 成功的回调函数
                
                  if(res.data[0].Status===1){
                    
                    setLockStatus("正常")
                    }
                else{
                    setLockStatus("故障")
                    }
                if(res.data[0].OnOff===1){
                        setLockOnOff("On")
                }else{
                        setLockOnOff("Off")
                      }

                  setLockPosition_X(res.data[0].PositionX)
                  setLockPosition_Y(res.data[0].PositionY)
                  
                  }
                ).catch(res => {  // 错误处理
                    console.log(res.data.res)
                    console.log("FAILED")
                })
            setIsLockOpen(true)
        }
        
    }
   
    const handleDetailCancle=()=>{
        setIsLampOpen(false)
        setIsLockOpen(false)
        setIsSensorOpen(false)
        setIsSwitchOpen(false)
       // alert("DetailCancel"+isDetailOpen)
    }
    //Lamp
    const handleLampOk=()=>{
        //Ajax - Update the Lamp
       console.log("Click"+ClickDeviceNo)
        

        var tmp1=false;
        if(LampStatus==="正常"){
            tmp1=true;
        }
        const data={
            "No":ClickDeviceNo,
            "PositionX":LampPosition_X,
            "PositionY":LampPosition_Y,
            "status":tmp1,
            "luminance":LampLuminance
        }
    
        request.post("/api/UpdateLamp",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
        //         DeviceNo=flask.request.json.get('No')
        // PositionX=flask.request.json.get('PositionX')
        // PositionY=flask.request.json.get('PositionY')
        // status=flask.request.json.get('status')
        // Luminance=flask.request.json.get('luminance')
                
              
               alert("修改成功")
              
              
            }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })

        setIsLampOpen(false)
    }
    const LuminanceOnChange=(value)=>{
        setLampluminance(value)
    }
    const LuminanceOnAfterChange=(value)=>{
        setLampluminance(value)
    }
    const LampStatusOnChange = (e) => {
        console.log("Click "+e.target.value)
        setLampStatus(e.target.value);
      };
    //Switch
    const handleSwitchOk=()=>{
        //Ajax - Update the Switch
        var tmp=false;
        if(SwitchOnOff==="On"){
            tmp=true;
        }

        var tmp1=false;
        if(SwitchStatus==="正常"){
            tmp1=true;
        }
        
        const data={
            "No":ClickDeviceNo,
            "PositionX":SwitchPosition_X,
            "PositionY":SwitchPosition_Y,
            "status":tmp1,
            "ControlLampId":SwitchNo,
            "OnOff":tmp
            
        }
    
        request.post("/api/UpdateSwitch",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数       
               alert("修改成功")
              
              
            }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
        setIsSwitchOpen(false)
    }
    const SwitchStatusOnChange=(value)=>{
       setSwitchStatus(value)
    }
    const SwitchOnOffChange=(value)=>{
        setSwitchOnOff(value)
    }
    //Lock
    const handleLockOk=()=>{
        //Ajax - Update the Lock
        var tmp=false;
        if(LockOnOff==="On"){
            tmp=true;
        }

        var tmp1=false;
        if(LockStatus==="正常"){
            tmp1=true;
        }
        const data={
            "No":ClickDeviceNo,
            "PositionX":LockPosition_X,
            "PositionY":LockPosition_Y,
            "status":tmp1,
            "OnOff":tmp
            
        }
        request.post("/api/UpdateLock",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数       
               alert("修改成功")
              
              
            }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })

        setIsLockOpen(false)
    }
    const LockOnOffChange=(value)=>{
        setLockOnOff(value)
    }
    const LockStatusOnChange=(value)=>{
        setLockStatus(value)
    }
    //Sensor
    const handleSensorOk=()=>{
        //Ajax -Update the Sensor
       

        var tmp1=false;
        if(SensorStatus==="正常"){
            tmp1=true;
        }
        const data={
            "No":ClickDeviceNo,
            "PositionX":SensorPosition_X,
            "PositionY":SensorPosition_Y,
            "status":tmp1,
            "Temperature":SensorTemperature
           
        }
        request.post("/api/UpdateSensor",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数       
               alert("修改成功")
              
              
            }
            ).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
        setIsSensorOpen(false)
    }
    const SensorStatusOnChange=(value)=>{
        setSensorStatus(value)
    }
    const TemperatureOnChange=(value)=>{
        setSensorTemprature(value)
    }
    const TemperatureOnAfterChange=(value)=>{
        setSensorTemprature(value)
    }
    const marks = {
        0: '0',
        50: '50',
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>100</strong>,
        },
      };
    const TemperatureMarks={
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
      };
    
      


const columns1 = [
    {
      title: '序号',
      dataIndex: 'No',
      key: 'index',
    },
    {
        title: '创建设备类型',
        dataIndex: 'DeviceType',
        key: 'index',
    },
    {
        title:'场所名称',
        dataIndex:'CenterName',
        key:'index'
    },
    {
        title: '创建房间类型',
        dataIndex: 'RoomType',
        key: 'index',
    },
   
   
   
    {
      title: '创建时间',
      dataIndex: 'TimeStamp',
      key: 'index',
    },
    {
      title: '创建者',
      dataIndex: 'Username',
      key: 'index',
    },
    
    {
        title: '操作',
        key: 'index',
       
        
        render: (index) => (
           
            <Space size="middle">
              <Button  onClick={()=>showDetail(index)} >详细</Button>
              
              <Modal title="设备详细信息-灯" open={isLampOpen} onCancel={handleDetailCancle} onOk={()=>handleLampOk(index)}>
                <Form layout="horizontal">

                    <Form.Item label="灯位置X">
                        <Input 
                        style={{width: '30%',}}
                        value ={LampPosition_X}
                        onChange={(event) => {
                            setLampPosition_X(event.target.value);
                        }}
                        placeholder="灯的位置"
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="灯位置Y">
                        <Input 
                        style={{width: '30%',}}
                        value ={LampPosition_Y}
                        placeholder="灯的位置"
                        onChange={(event) => {
                            setLampPosition_Y(event.target.value);
                        }}
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="灯的状态">
                    <Input 
                        style={{width: '30%',}}
                        value ={LampStatus}
                        placeholder="灯的状态"
                        onChange={(event) => {
                            setLampStatus(event.target.value);
                        }}
                        >

                        </Input>
                      
                        
                    </Form.Item>

                    <Form.Item label="灯的亮度">
                    <Slider marks={marks} value={LampLuminance} onChange={LuminanceOnChange} onAfterChange={LuminanceOnAfterChange} />
                       
                    </Form.Item>

                    
                   
                </Form>
              </Modal>

              <Modal title="设备详细信息-门锁" open={isLockOpen} onCancel={handleDetailCancle} onOk={()=>handleLockOk(index)}>
                <Form>
                    <Form.Item label="门锁的位置X:">
                        <Input 
                       style={{width: '30%',}}
                        value ={LockPosition_X}
                        onChange={(event) => {
                            setLockPosition_X(event.target.value);
                        }}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="门锁的位置Y:">
                        <Input 
                       style={{width: '30%',}}
                        value ={LockPosition_Y}
                        onChange={(event) => {
                            setLockPosition_Y(event.target.value);
                        }}
                        ></Input>
                    </Form.Item>

                    <Form.Item label="门锁的开关">     
                        
                        <Input 
                        style={{width: '30%',}}
                        value ={LockOnOff}
                        placeholder="门锁的开关"
                        onChange={(event) => {
                            setLockOnOff(event.target.value);
                        }}
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="门锁的状态">
                    <Input 
                        style={{width: '30%',}}
                        value ={LockStatus}
                        placeholder="门锁的状态"
                        onChange={(event) => {
                            setLockStatus(event.target.value);
                        }}
                        >

                        </Input>
                    
                    </Form.Item>

                </Form>
              </Modal>
            
              <Modal title="设备详细信息-开关" open={isSwitchOpen} onCancel={handleDetailCancle} onOk={()=>handleSwitchOk(index)}>
                    <Form.Item label="开关控制灯的序号">
                        <Input 
                       style={{width: '10%',}}
                        value ={SwitchNo}
                        onChange={(event) => {
                            setSwitchNo(event.target.value);
                        }}
                        ></Input>
                    </Form.Item>

                    <Form.Item label="开关的位置X:">
                        <Input 
                        style={{width: '30%',}}
                        value ={SwitchPosition_X}
                        onChange={(event) => {
                            setSwitchPosition_X(event.target.value);
                        }}
                        ></Input>
                    </Form.Item>

                    <Form.Item label="开关的位置Y:">
                        <Input 
                       style={{width: '30%',}}
                        value ={SwitchPosition_Y}
                        onChange={(event) => {
                            setSwitchPosition_Y(event.target.value);
                        }}
                        ></Input>
                    </Form.Item>

                    <Form.Item label="灯的开关">
                        
                        <Input 
                        style={{width: '30%',}}
                        value ={SwitchOnOff}
                        placeholder="On/Off"
                        onChange={(event) => {
                            setSwitchOnOff(event.target.value);
                        }}
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="开关状态">
                    <Input 
                        style={{width: '30%',}}
                        value ={SwitchStatus}
                        placeholder="开关的状态"
                        onChange={(event) => {
                            setSwitchStatus(event.target.value);
                        }}
                        >

                        </Input>
                        
                    </Form.Item>
              </Modal>

              <Modal title="设备详细信息-传感器" open={isSensorOpen} onCancel={handleDetailCancle} onOk={()=>handleSensorOk(index)}>
              <Form layout="horizontal">

                    <Form.Item label="传感器位置X">
                        <Input 
                        style={{width: '30%',}}
                        value ={SensorPosition_X}
                        onChange={(event) => {
                            setSensorPosition_X(event.target.value);
                        }}
                        placeholder="传感器的位置"
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="传感器位置Y">
                        <Input 
                        style={{width: '30%',}}
                        value ={SensorPosition_Y}
                        placeholder="传感器的位置"
                        onChange={(event) => {
                            setSensorPosition_Y(event.target.value);
                        }}
                        >

                        </Input>
                    </Form.Item>

                    <Form.Item label="传感器的温度">
                    <Slider marks={TemperatureMarks} value={SensorTemperature} onChange={TemperatureOnChange} onAfterChange={TemperatureOnAfterChange} />
                        
                    </Form.Item>

                    <Form.Item label="传感器的状态">
                    <Input 
                        style={{width: '30%',}}
                        value ={SensorStatus}
                        placeholder="传感器的状态"
                        onChange={(event) => {
                            setSensorStatus(event.target.value);
                        }}
                        >

                        </Input>
                    
                    
                    </Form.Item>



                    </Form>
              </Modal>
             
            </Space>
        ),
    },
   
    {
        title: '操作',
        key: 'index',
        render: (index) => (
            <Space size="middle">
              <a onClick={() => DeleteDevice(index)}>删除</a>
            </Space>
        ),
    }
];

    
    return (
        <Table dataSource={DeviceList} columns={columns1} />
    )
})

export default DeviceTable