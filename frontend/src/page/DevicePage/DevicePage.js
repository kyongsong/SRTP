import React from 'react';
import './DevicePage.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import UserBlock from '../../component/UserBlock/UserBlock';
import Commentarea from '../../component/Comment/comment'
import { Button, Divider, Typography, Table, Space,Modal,Input,Form,Breadcrumb,Dropdown,DatePicker} from 'antd';
import { useState } from 'react';
import axios from 'axios'
import CenterTable from '../../component/Table/CenterTable';
import Table1 from '../../component/Table/Table1';
import RoomTable from '../../component/Table/RoomTable';
import DeviceTable from '../../component/Table/DeviceTable';
import { DownOutlined } from '@ant-design/icons';
import DeviceDataList from '../../component/GlobalVar/DeviceList';
import { useRef } from 'react';
import request from '../../utils/request';

var store = window.localStorage
var username1 = store.getItem("UserName")


const { Title, Paragraph, Text, Link } = Typography;
const items = [
    {
      key: '1',
      label: '灯',
    },
   
    {
      key: '2',
      label: '开关',
    },
    {
      key: '3',
      label: '传感器',
    },
    {
        key: '4',
        label: '门锁',
    },
  ];

function DevicePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [RoomType,setRoomType]=useState("");
    const [DeviceNo,setDeviceNo]=useState("");
    const [CenterName,setCenterName]=useState("");
    const [RoomTime,setRoomTime]=useState("");
    const [DeviceType,setDeviceType]=useState("选择设备类型");
    const [RoomNo,setRoomNo]=useState("");
    const [DevicePosition_X,setDevicePosition_X]=useState("");
    const [DevicePosition_Y,setDevicePosition_Y]=useState("");
    const [DeviceStatus,setDeviceStatus]=useState(true);
    const DeviceRef=useRef(null);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        console.log(RoomTime);
        setIsModalOpen(false);
        //ajax --创建设备
        
        
        const data ={
            "index":DeviceNo,
            "No":DeviceNo,
            "RoomType":RoomType,
            "RoomNo":RoomNo,
            "CenterName":CenterName,
            "TimeStamp":RoomTime,
            "DeviceType":DeviceType,
            "PositionX":DevicePosition_X,
            "PositionY":DevicePosition_Y,
            "status":DeviceStatus,
            "Username":username1
        }
        console.log(data)
        DeviceDataList.push(data)
        DeviceRef.current.UpdateDeviceTable(DeviceDataList)

        request.post("/api/InsertDevice",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
                console.log(res.data)
                alert("创建成功")
            }).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
        //Reset
        setRoomType("")
        setCenterName("")
        setDeviceNo("")
        setDeviceType("选择设备类型")
        setDevicePosition_X("")
        setDevicePosition_Y("")
        setRoomTime("")
        
        // setRoomTime("")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        //Reset
        setRoomType("")
        setCenterName("")
        setDeviceNo("")
        setDeviceType("选择设备类型")
        setDevicePosition_X("")
        setDevicePosition_Y("")
        setRoomTime("")
  };
  const onMenuClick = (key) => {
    //console.log(key.key);
    //console.log(items[key.key-1].label)
    setDeviceType(items[key.key-1].label)
  };
  const onChange = (date, dateString) => {
    
    setRoomTime(dateString);
    //console.log(dateString)
   
  };
  
    return (
      <div className='Page'>
        <div className='PageHeader'>
          <Header />
        </div>
        
        <div className='Side'>
            <Sidebar />
            <div className='Contain'>
            <Breadcrumb>
                <Breadcrumb.Item><a href="/">主页</a></Breadcrumb.Item>
                <Breadcrumb.Item>
                    信息收集
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">设备中心</a>
                </Breadcrumb.Item>
            </Breadcrumb>

                <Typography>
                    
                    <Divider />
                  
                    <Button type="primary" onClick={showModal}>创建设备</Button>
                    <Modal title="创建设备" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form layout="horizontal">
                        <Form.Item label="设备序号">
                            <Input  
                            style={{width: '50%',}}
                            value={DeviceNo}
                            onChange={(event) => {
                                setDeviceNo(event.target.value);
                            }}
                             />
                        </Form.Item>    
                        <Form.Item label="场所名称">
                            <Input 
                            style={{width:'50%'}}
                            value={CenterName}
                            onChange={(event) => {
                                setCenterName(event.target.value);
                            }}
                            />
                        </Form.Item>    
                        <Form.Item label="房间序号">
                            <Input 
                            style={{width:'50%'}}
                            value={RoomNo}
                            onChange={(event) => {
                                setRoomNo(event.target.value);
                            }}
                            />
                        </Form.Item>    
                        <Form.Item label="房间类型">
                            <Input 
                            style={{width:'50%'}}
                            value={RoomType}
                            onChange={(event) => {
                                setRoomType(event.target.value);
                            }}
                            />
                        </Form.Item>    
                       
                        <Form.Item label="设备类型">
                           
                        <Dropdown.Button
                         menu={{
                            items,
                            onClick: onMenuClick,
                             }}
                         >
                        {DeviceType}
                        </Dropdown.Button>    

                        </Form.Item> 

                        <Form.Item label="场所时间">
                        <DatePicker onChange={onChange} />
                           
                            
                        </Form.Item> 
                        
                        <Form.Item label="设备位置X">
                            <Input
                            style={{width:'50%'}}
                            placeholder="X:500"
                            value={DevicePosition_X}
                            onChange={(event) => {
                               setDevicePosition_X(event.target.value)
                            }}
                            />
                        </Form.Item> 
                        <Form.Item label="设备位置Y">
                            <Input
                            style={{width:'50%'}}
                            placeholder="Y:500"
                            value={DevicePosition_Y}
                            onChange={(event) => {
                               setDevicePosition_Y(event.target.value)
                            }}
                            />
                        </Form.Item> 
                       
                            
                
                    </Form>
                    </Modal>
                    
                    <DeviceTable ref={DeviceRef} />
                </Typography>
            </div>
        </div>
        </div>
    )
}


export default DevicePage