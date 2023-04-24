import React from 'react';
import { LockOutlined, UserOutlined, QuestionCircleOutlined, BulbOutlined,PhoneTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './RegisterPage.css'
import axios from 'axios'


const RegisterPage = () => {
  const request = axios.create({
    baseURL: "http://localhost:8080",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    
    if (values.password !== values.password_repeat) {
      messageApi.error("两次密码不一致，请重新输入")
    }
    else {
      var Phone=values.phoneNumber;
      var UserName=values.username;
      if(Phone.length<6){
        messageApi.error("电话号码长度小于6")
      }
      else if(UserName.length<6){
        messageApi.error("用户名长度小于6")
      }
      else{
        var register_data = {
          "username": values.username,
          "password": values.password,
          "PhoneNumber":values.phoneNumber
        }
        console.log(register_data)
        request.post('/api/userRegister', register_data).then(
          res =>{
          console.log(res.data)
          alert('注册成功')
          var store = window.localStorage
          store.setItem("UserName", values.username)
          window.location.href="/Center"
          }
        )
      }
     
    }
  };
  return (
    <div className='background'>
    <div className="register-card">
    <div className="register">
    {contextHolder}
    <Form
      name="normal_register"
      className="register-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
      >
        <Input size='large' prefix={<PhoneTwoTone  className="site-form-item-icon" />} placeholder="手机号" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="password_repeat"
        rules={[
          {
            required: true,
            message: '请再次输入密码',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="重复密码"
        />
      </Form.Item>
    

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="register-form-button"
        >
          注册
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>
  );
};
export default RegisterPage;