import './FindPassword.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import {  KeyOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Cascader,Select,message } from 'antd';
import request from '../../utils/request';
import {useEffect, useState} from 'react';

import React, { useRef } from "react"


 let options=[]

 
  var store = window.localStorage
  var username1 = store.getItem("UserName")
function FindPasswordPage() {
    const [phoneNumber,setphoneNumber]=useState("");
    const [NewPassword,setNewPassword]=useState("");
    const [AgainNewPassword,setAgainNewPassword]=useState("");
    const [RecognizeCode,setRecognizeCode]=useState("");
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(()=>{
      //初始化获得密保问题
    const getQuestion= async() =>{
      var username = { "username": username1 } // 传入的参数，使用 json 格式

      request.post("/api/getSecureQuestion",username).then(  
        // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            if(options.length==1) options.pop();
            else {options.push({
              "label": 0,
              "value":res.data
            })}
            //setQuestion(res.data)
            }
        ).catch(res => {  // 错误处理
            console.log(res.data.res)
            console.log("FAILED")
        })
      
    }
    getQuestion()
    },[])
    
    const Info=()=>{
       
        var result=0;
       
        
     
        var data={
          'username':username1,
          
        }
        
        request.post('/api/checkSecureAnswer',data).then(
          res =>{
            console.log("the result of CheckSecureAnswer "+ res.data)
              if(res.data===0)
              {
                 //答案错误
                messageApi.error('密保问题回答错误');
                
              }
              else{
                //答案正确
                if(NewPassword!=AgainNewPassword){
        
                  messageApi.error('两次输入的密码不一致');
                }
                else{
             
                var NewData={
                  'username': username1,
                  'password':NewPassword
                }
                request.post('/api/updateUser',NewData).then(
                res =>{
                  console.log(res.data)
                  messageApi.success('修改密码成功')
                  window.location.href = "./";
                }
              )

             
              
          }

              }
          }
        ).catch(res =>{
          console.log("error")
        }
        )
        
       

    }
    
     
    
      


    return (
        <div>
        <Header />
        <div className="login">
        {contextHolder}
        <Form
          name="normal_login"
          layout="vertical"
          autoComplete="off"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          
         
         
        >
        
      
         
          <Form.Item
          name="phoneNumber"
           rules={[
            {
              required: true,
              message: '请输入手机号',
            },
          ]}
          >
          <Input
          size='large'
          value={phoneNumber}
          placeholder="请输入手机号"
          onChange={(event) => {
            setphoneNumber(event.target.value);
        }}
        />
          </Form.Item>

          <Form.Item
          name="NewPassword"
           rules={[
            {
              required: true,
              message: '请重新输入新密码',
            },
          ]}
          >
          <Input
                size='large'
                placeholder="新密码"
                value={NewPassword}
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}
                
           />
          </Form.Item>
          <Form.Item
          name="AgainNewPassword"
           rules={[
            {
              required: true,
              message: '请输入新密码',
            },
          ]}
          >
            <Input
                size='large'
                value={AgainNewPassword}
                placeholder="重新输入新密码"
                onChange={(event) => {
                    setAgainNewPassword(event.target.value);
                }}

            />
          </Form.Item>
          
          <Form.Item>
          <Input
                size='large'
                value={RecognizeCode}
                placeholder="请输入验证码"
                onChange={(event) => {
                    setRecognizeCode(event.target.value);
                }}

            />
          </Form.Item>
          
    
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              onClick={Info}
            >
            提交
            </Button>
          </Form.Item>
        </Form>
        </div>
    </div>
    )
}

export default FindPasswordPage;