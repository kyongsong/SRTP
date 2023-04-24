import React from 'react';
import './CenterPage.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';

import { Button, Divider, Typography, Table, Space,Modal,Input,Form,Breadcrumb,DatePicker} from 'antd';
import { useState } from 'react';
import axios from 'axios'
import CenterTable from '../../component/Table/CenterTable';
import request from '../../utils/request';
import {useEffect,useRef} from 'react';
import CenterDataList from '../../component/GlobalVar/CenterList';

var store = window.localStorage
var username1 = store.getItem("UserName")


function CenterPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CenterName,setCenterName]=useState("");
    const [CenterNo,setCenterNo]=useState("");
    const [CenterTime,setCenterTime]=useState("");
    const CenterTable1=useRef(null);
    const onChange = (date, dateString) => {
    
        setCenterTime(dateString);
        //console.log(dateString)
       
      };
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        //ajax Insert the Center
        
        setIsModalOpen(false);
        const data={
           "index":CenterNo,
           "No":CenterNo,
           "CenterName": CenterName,
           "TimeStamp":CenterTime,
           "Username":username1
        }
       
        
        CenterDataList.push(data)
        CenterTable1.current.UpdateCenterTable(data)
        
        
        

        

        request.post("/api/InsertCenter",data).then(  
            // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
            res => {  // 成功的回调函数
                console.log(res.data)
                alert("创建成功")
            }).catch(res => {  // 错误处理
                console.log(res.data.res)
                console.log("FAILED")
            })
        setCenterName("")
        setCenterNo("")
        setCenterTime("")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setCenterName("")
        setCenterNo("")
        setCenterTime("")
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
                        <a href="">场所中心</a>
                    </Breadcrumb.Item>
                    </Breadcrumb>
                <Typography>
                    

                    <Divider />
                  
                    <Button type="primary" onClick={showModal}>创建场所</Button>
                    <Modal title="创建场所" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form layout="horizontal">
                        <Form.Item label="场所序号">
                            <Input  
                            style={{width: '50%',}}
                            value={CenterNo}
                            onChange={(event) => {
                                setCenterNo(event.target.value);
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
                        <Form.Item label="场所时间">
                            <DatePicker onChange={onChange} />
                        </Form.Item> 
                            
                
                    </Form>
                    </Modal>
                    <CenterTable ref={CenterTable1}></CenterTable>
                </Typography>
            </div>
        </div>
        </div>
    )
}

// 前后端交互 demo 前端部分，使用 axios 进行路由，在后端使用 flask 进行处理，这里发送方式默认使用 ‘POST’
function getUser() {
    var username = { 'username': 'admin' } // 传入的参数，使用 json 格式
    axios.post('/api/getUser', username).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            console.log(res.data)
        }
    ).catch(res => {  // 错误处理
        console.log(res.data.res)
    })
}

export default CenterPage