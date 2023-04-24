import React from 'react';
import { Space, Table } from 'antd';
import request from '../../utils/request';
import {useEffect, useState} from 'react';
import CenterDataList from '../GlobalVar/CenterList';
import { forwardRef, useImperativeHandle } from 'react'

var store = window.localStorage
var username1 = store.getItem("UserName")



const CenterTable =forwardRef(({

},ref) => {
  useImperativeHandle(ref,()=>({
    UpdateCenterTable:UpdateCenterTable
  }))
  function UpdateCenterTable(props){
   
    // console.log(CenterDataList)
     let newdata1=[...CenterDataList]; 
     setCenterList(newdata1)
  }
  useEffect(()=>{
  const getCenter= async() =>{
  
    var username = { "username": username1 } // 传入的参数，使用 json 格式
    request.post("/api/getCenter",username).then(  
      // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
      res => {  // 成功的回调函数
        
        var length=res.data.length;
        console.log(res.data)
        for(var i=0;i<length;i++){
          var temp={
            index:res.data[i].CenterNo,
            No:res.data[i].CenterNo,
            CenterName:res.data[i].CenterName,
            TimeStamp:res.data[i].TimeStamp,
            Username:res.data[i].Creater

          }
          CenterDataList.push(temp);
        }
       
        setCenterList(CenterDataList)
          
        }
      ).catch(res => {  // 错误处理
          console.log(res.data.res)
          console.log("FAILED")
      })
    
  }
  getCenter()
},[])
 
  
 
    //初始化获得所有场所
    const [CenterList,setCenterList]=useState("");
 
  const  DeleteCenter=(index)=>{
    //Ajax-Delte the Center
    
    const center={
      "CenterName":index.CenterName
    }
   

    for(var i=0;i<CenterDataList.length;i++){
     
      if(CenterDataList[i].CenterName==index.CenterName){
        CenterDataList.splice(i,1)  
      }
      
    }
    alert("data"+CenterDataList.length)
    UpdateCenterTable(CenterDataList)
   
    
    request.post("/api/DeleteCenter",center).then(  
      // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
      res => {  // 成功的回调函数
        
        alert("删除场所成功")
          
        }
      ).catch(res => {  // 错误处理
          console.log(res.data.res)
          console.log("FAILED")
      })
  
  }
  const columns1 = [
    {
      title: '序号',
      dataIndex: 'No',
      key: 'index',
    },
    {
        title: '创建场所名称',
        dataIndex: 'CenterName',
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
              <a onClick={() => DeleteCenter(index)}>删除</a>
            </Space>
        ),
    }
];
 
    return (
      
        <Table dataSource={CenterList} columns={columns1} />
    )
})

export default CenterTable