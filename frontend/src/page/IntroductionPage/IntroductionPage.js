import React from 'react';
import './IntroductionPage.css'
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import UserBlock from '../../component/UserBlock/UserBlock';
import Commentarea from '../../component/Comment/comment'
import { Button, Divider, Typography, Table, Space} from 'antd';
import { useState } from 'react';
import axios from 'axios'

const { Title, Paragraph, Text, Link } = Typography;

function IntroductionPage() {

    return (
      <div className='Page'>
        <div className='PageHeader'>
          <Header />
        </div>
        <div className='Right'>
          <UserBlock />
        </div>
        <div className='Side'>
            <Sidebar />
            <div className='Contain'>
                <Typography>
                    <Title>前言</Title>
                    <Divider />

                    <Title level={2}>关于本网站</Title>
                    <Paragraph>
                        网站介绍放在这里。
                    </Paragraph>
                    <Divider />

                    <Title level={2}>组员们想说的话</Title>
                    <Paragraph>组员目前不想说话。</Paragraph>
                    <Divider />

                    <Title level={2}>使用说明</Title>
                    <Paragraph>
                      使用说明放在这里。
                    </Paragraph>
                    <Divider />

                    <Title level={3} type='secondary'>评论区</Title>
                    <Commentarea />
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

export default IntroductionPage