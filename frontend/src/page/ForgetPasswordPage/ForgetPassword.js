import './ForgetPassword.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import {  KeyOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import axios from 'axios';


function ForgetPasswordPage() {
    const onFinish = (values) => {
        var store = window.localStorage
        store.setItem("UserName", values.username)
        window.location.href="/find_password"
        console.log('Received values of form: ', values);
      };
    return (
        <div>
            
        <div className="login">
        <Form
          name="normal_login"
          layout="vertical"
          autoComplete="off"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
         
        >
          <Form.Item>
            <span>找回密码</span>
          </Form.Item>
          <Form.Item
            name="username"
            label="请输入账号"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          
          
    
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
            >
              下一步
            </Button>
          </Form.Item>
        </Form>
        </div>
        </div>
    )
}
export default ForgetPasswordPage;