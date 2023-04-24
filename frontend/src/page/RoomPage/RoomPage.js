import React from 'react';
import './RoomPage.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';

import { Button, Divider, Typography, Table, Space,Modal,Input,Form,Breadcrumb,DatePicker} from 'antd';
import { useState } from 'react';

import RoomTable from '../../component/Table/RoomTable';
import { useRef } from 'react';
import RoomDataList from '../../component/GlobalVar/RoomList';
import request from '../../utils/request';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

var store = window.localStorage
var username1 = store.getItem("UserName")
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

function RoomPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [RoomType,setRoomType]=useState("");
    const [RoomNo,setRoomNo]=useState("");
    const [CenterName,setCenterName]=useState("");
    const [RoomTime,setRoomTime]=useState("");
    const RoomRef=useRef(null);
    const [ImageUpload,setImageUpload]=useState({
        
    })
    var tmp;
     function fileSelectHandler(event){
        setImageUpload(event.target.files[0])
        const fd=new FormData();
        fd.append("Image",event.target.files[0])
        console.log(fd)
        var xhr=new XMLHttpRequest();
        xhr.open("post","http://127.0.0.1/api.UploadImage");
        xhr.send(fd)
        xhr.onload=function(){
            if(xhr.status==200){
                //...
                console.log("创建成功")
            }
        }
        
    }
    function  FileUploadHandler(){
        const fd=new FormData();
        console.log(tmp)
        fd.append('image',tmp)
        //console.log(fd)
        // request.post("/api/UploadImage",fd).then(  
        //     // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        //     res => {  // 成功的回调函数
        //         console.log(res.data)
        //         alert("创建成功")
        //     }).catch(res => {  // 错误处理
        //         console.log(res.data.res)
        //         console.log("FAILED")
        //     })
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onChange = (date, dateString) => {
    
        setRoomTime(dateString);
        //console.log(dateString)
       
      };
      
    const handleOk = () => {
        //Ajax - Insert the Room 
        console.log(CenterName);
        console.log(RoomType);
      
      
        setIsModalOpen(false);
        const data={
            "index":RoomNo,
            "No":RoomNo,
            "CenterName":CenterName,
            "RoomType":RoomType,
            "TimeStamp":RoomTime,
            "Username":username1
        }

        RoomDataList.push(data)
        RoomRef.current.UpdateRoomTable(RoomDataList)
        request.post("/api/InsertRoom",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
                console.log(res.data)
                alert("创建成功")
            }).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
    
        
        setRoomType("")
        setCenterName("")
        setRoomNo("")
        setRoomTime("")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setRoomType("")
        setCenterName("")
        setRoomNo("")
        setRoomTime("")
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
                    <a href="">房间中心</a>
                </Breadcrumb.Item>
            </Breadcrumb>

                <Typography>
                    
                    <Divider />
                  
                    <Button type="primary" onClick={showModal}>创建房间</Button>
                    <Modal title="创建房间" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form layout="horizontal">
                        <Form.Item label="房间序号">
                            <Input  
                            style={{width: '50%',}}
                            value={RoomNo}
                            onChange={(event) => {
                                setRoomNo(event.target.value);
                            }}
                             />
                        </Form.Item>    
                        <Form.Item label="创建场所">
                            <Input 
                            style={{width:'50%'}}
                            value={CenterName}
                            onChange={(event) => {
                                setCenterName(event.target.value);
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
                        <Form.Item label="场所时间">
                            
                            <DatePicker onChange={onChange} />
                        </Form.Item> 
                        <Form.Item label="上传房户图">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        
                        </Form.Item>
                        
                
                    </Form>
                    </Modal>
                    <RoomTable ref={RoomRef}/>
                </Typography>
            </div>
        </div>
        </div>
    )
}


export default RoomPage