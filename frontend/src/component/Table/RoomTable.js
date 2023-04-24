import React from 'react';
import { Space, Table } from 'antd';
import ScoreForm from '../ScoreForm/ScoreForm';
import axios from 'axios'
import RoomDataList from '../GlobalVar/RoomList';
import { forwardRef, useImperativeHandle } from 'react'
import request from '../../utils/request';
import {useEffect, useState} from 'react';


var store = window.localStorage
var username1 = store.getItem("UserName")




const UploadImg=(index)=>{

}
const showRoom=(index)=>{
 
  store.setItem("RoomNo",index.No)
  store.setItem("RoomType",index.RoomType)
  console.log("InShowRoom:")
  console.log(index)
  window.location.href = "./Photo"
  
    
}

const RoomTable = forwardRef(({

},ref) => {
  useImperativeHandle(ref,() =>({
    UpdateRoomTable:UpdateRoomTable
  }))
 
  const columns1 = [
    {
      title: '序号',
      dataIndex: 'No',
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
              <a onClick={() =>showRoom(index) }>查看</a>
            </Space>
        ),
    },
    {
        title: '操作',
        key: 'index',
        render: (index) => (
            <Space size="middle">
              <a onClick={() => DeleteRoom(index)}>删除</a>
            </Space>
        ),
    }
   
  ];
  const [RoomList,setRoomList]=useState("");
  function UpdateRoomTable(props){
   
    // console.log(CenterDataList)
     let newdata1=[...RoomDataList]; 
     setRoomList(newdata1)
  }
  useEffect(()=>{
    
    const getRoom= async() =>{
      
      var username = { "username": username1 } // 传入的参数，使用 json 格式
      request.post("/api/getRoom",username).then(  
        // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数   
          var length=res.data.length;
          console.log(res.data)
          for(var i=0;i<length;i++){
            var temp={
              index:res.data[i].RoomNo,
              No:res.data[i].RoomNo,
              RoomType:res.data[i].RoomType,
              CenterName:res.data[i].CenterName,
              TimeStamp:res.data[i].TimeStamp,
              Username:res.data[i].Creater
  
            }
            RoomDataList.push(temp);
          }
          console.log(RoomDataList)
         
          setRoomList(RoomDataList)
            
          }
        ).catch(res => {  // 错误处理
            console.log(res.data.res)
            console.log("FAILED")
        })
      
    }
    getRoom()
  },[])

  const  DeleteRoom=(index)=>{
    //Ajax-Delte the Room by No
    
    const Room={
      "RoomNo":index.No
    }
   

    for(var i=0;i<RoomDataList.length;i++){
     
      if(RoomDataList[i].No==index.No){
        RoomDataList.splice(i,1)  
      }
      
    }
    
    UpdateRoomTable(RoomDataList)
   
    
    request.post("/api/DeleteRoom",Room).then(  
      // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
      res => {  // 成功的回调函数
        
        alert("删除房间成功")
          
        }
      ).catch(res => {  // 错误处理
          console.log(res.data.res)
          console.log("FAILED")
      })
  
  }
 
    return (
        <Table dataSource={RoomList} columns={columns1} />
       
    )
})

export default RoomTable