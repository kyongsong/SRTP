import { List, Space, Avatar, Statistic, Button } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import './UserBlock.css';
import Wrapper from '../../assets/wrappers/Header.js';
import request from '../../utils/request';


const UserBlock = () => {
    let options = []
    const [likes, setLikes] = useState('0')
    const [comment, setComment] = useState('0')
    const [admin, setAdmin] = useState('用户')
    const [username, setUsername] = useState('')
    const [course1, setCourse1] = useState('')
    const [course2, setCourse2] = useState('')
    const [time1, setTime1] = useState('')
    const [time2, setTime2] = useState('')
    const upload = [
        {
          title: course1,
          time: time1
        },
        {
          title: course2,
          time: time2
        }
    ];
    //这里显示通过/不通过的tag颜色需要通过后端的数据来判断
    const showDetails = () => {
        var store = window.localStorage
        setUsername(store.getItem("UserName"));
        // setUsername("haha");
        getUserCommentsNum();
        getCommentTotalLikes();
        getTotalComment();
        getRecentArticle();
    }

    const getUserCommentsNum = () => {
        var data = { "username": username }
        request.post('/api/getUser', data).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            if(options.length==1) options.pop();
            else {options.push({
              "label": 0,
              "value":res.data.isAdmin
            })}
            if(res.data.isAdmin == "1")
               setAdmin("管理员")
            else    setAdmin("用户")
        }
        ).catch(res => {  // 错误处理
            console.log("FAILED")
        })
    }
    
    const getCommentTotalLikes = () => {
        var data = { "username": username }
        request.post('/api/getCommentTotalLikes', data).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            if(options.length==1) options.pop();
            else {options.push({
              "label": 0,
              "value":res.data.isAdmin
            })}
            setLikes(res.data)
        }
        ).catch(res => {  // 错误处理
            console.log("FAILED")
        })
    }

    const getTotalComment = () => {
        var data = { "username": username }
        request.post('/api/getUserCommentNum', data).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            if(options.length==1) options.pop();
            else {options.push({
              "label": 0,
              "value":res.data.isAdmin
            })}
            setComment(res.data)
        }
        ).catch(res => {  // 错误处理
            console.log("FAILED")
        })
    }
    const getRecentArticle = () => {
        var data = { "username": username }
        request.post('/api/getUserRecentArticles', data).then(  // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            if(options.length==1) options.pop();
            else {options.push({
              "label": 0,
              "value":res.data.isAdmin
            })}
            setCourse1(res.data[0]["course"]);
            setCourse2(res.data[1]["course"]);
            setTime1(res.data[0]["time"]);
            setTime2(res.data[1]["time"]);
        }
        ).catch(res => {  // 错误处理
            console.log("FAILED")
        })

    }

    useEffect(()=>{
        showDetails();
    })

    return (
        <Wrapper>
        <div className='container'>
            
            <div className='main'>
                {/* <div style = {{color:'#14919b'}} >
                    <Tag color="cyan">管理员地址</Tag>
                    <span style = {{color:'#044e54'}}>{"SSSS"}</span>
                </div> */}
                <Avatar style={{ backgroundColor: '#ffffff' }} size = {100} />
                <h4>{username}</h4>
                <div className='info'>
                    <Button type='primary' size="small" shape="round" style = {{backgroundColor :'#55acee'}}>{admin}</Button>
                </div>
                <div className="info">
                    <Space>
                        <Statistic
                            title="点赞" value={likes} precision={0}
                            valueStyle={{ color: '#3f8600' }}/>
                        <Statistic
                            title="评论" value={comment} precision={0}
                            valueStyle={{ color: '#cf1322' }}/>
                    </Space>
                </div>
                
                {/* <Divider orientation='center' style = {{color:'#829ab1'}} plain>最近上传</Divider> */}
                <div style={{color:'#829ab1'}}>最近上传</div>
                <List
                    itemLayout="horizontal"
                    dataSource={upload}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title = {<span style={{color:'#4fabec'}}>{item.title}</span>}
                        description={
                            <Space>
                            <div>{item.time}</div>
                            </Space>
                        }
                        />
                    </List.Item>
                    )}
                />
            </div>
        </div>
        </Wrapper>
    )
}


export default UserBlock
