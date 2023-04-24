import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import './LoginPage.css';
import axios from 'axios';

const { Title } = Typography;

const LoginPage = () => {
  const request = axios.create({
    baseURL: "http://localhost:8080",
  });
  const onFinish = (values) => {
    var data={
      "username": values.username,
      "password": values.password
    }
    request.post('/api/userLogin', data).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            console.log(res)
            if (res.data === true) {
              var store = window.localStorage
              store.setItem("UserName", values.username)
              window.location.href="/Center"
              console.log('Received values of form: ', values);
            }
            else {
              alert('用户不存在或密码错误')
            }
        }
    ).catch(res => {  // 错误处理
        console.log(res.data.res)
    })
  };
  return (
    <div className='login-background'>
   <div className="login-card">
    <div className="login-page">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item>
        <span>
        
        <p >智能家居系统</p>
        </span>
        
      </Form.Item>
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
      <Form.Item>
        <a className="login-form-register" href="/register">
            注册账号
        </a>
        <a className="login-form-forgot" href="/forget_password">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>
  );
};
export default LoginPage;