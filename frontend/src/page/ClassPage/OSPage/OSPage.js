import React from 'react';
import './OSPage.css'
import Header from '../../../component/Header/Header';
import Sidebar from '../../../component/Sidebar/Sidebar';
import UserBlock from '../../../component/UserBlock/UserBlock';
import UploadForm1 from '../../../component/UploadForm/UploadForm1';
import UploadForm2 from '../../../component/UploadForm/UploadForm2';
import Table1 from '../../../component/Table/Table1';
import Table2 from '../../../component/Table/Table2';
import Commentarea from '../../../component/Comment/comment'
import { Button, Divider, Typography, Table, Space} from 'antd';
import { useState } from 'react';

const { Title, Paragraph, Text, Link } = Typography;

function OSPage() {

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
            <div className='Color'>
            <div className='Contain'>
                <Typography>
                    <Title>操作系统</Title>
                    <Divider />

                    <Title level={2}>课程介绍</Title>
                    <Paragraph>
                        操作系统课程的主要内容就三大块：Process Management, Memory Management, 
                        Storage Management。课程框架非常清晰，又有相对应的实验加以辅助，所以课程
                        整体上下来结构完整、内容翔实，经历教改之后上课体验++。
                    </Paragraph>
                    <Divider />

                    <Title level={2}>分数组成</Title>
                    <Paragraph>Final Exam: 50%</Paragraph>
                    <Paragraph>Assignments/Homework: 5%</Paragraph>
                    <Paragraph>In-class Quiz: 5%</Paragraph>
                    <Paragraph>6 labs + 1 bonus</Paragraph>
                    <Paragraph>Lab Report: 20%</Paragraph>
                    <Paragraph>Lab Demos: 20%</Paragraph>
                    <Divider />

                    <Title level={2}>实验</Title>
                    <Paragraph>
                      操作系统实验在最近两年经历了教改，以前是用的mips32的cpu，做编译内核、线程调度相关的实验，现在教改后的实验改为了写risc-v。总体而言，实验内容向MIT 6.S081这门课程靠拢，但是难度和工作量确实还是远远不及，不过OS这门课上下来感觉还是比较良好的，不会花费特别多的时间。
                    </Paragraph>
                    <Paragraph>lab数量：6个 + 1个bonus</Paragraph>
                    <Paragraph>
                      6个lab中，其中第一第二个是单人作业，其余4个两人组队，最后的bonus也是单人作业。
                    </Paragraph>
                    <Paragraph>
                      总体难度不大，时间较为充裕，其实solo也可以完成，但是现在两人组队，所以难度和压力减少了很多。
                    </Paragraph>
                    <Divider />

                    <Title level={2}>考试</Title>
                    <Paragraph>
                      面向考研的考试，很多题目都是考研真题改编，当然jjm班平时作业的不少选择题在考试中也出现了，推荐考前练习一下。当然考试最恶心的是Linux的部分，选择题有10道左右，建议尽早准备，不会的都写在a4纸上。
                    </Paragraph>
                    <Divider />

                    <Title level={2} type='secondary'>资料上传</Title>
                    <UploadForm1 />
                    <p> </p>
                    <UploadForm2 />
                    <Divider />

                    <Title level={2} type='secondary'>可下载资料</Title>
                    <Table1 />
                    <Divider />

                    <Title level={2} type='secondary'>网页链接</Title>
                    <Table2 />
                    <Divider />

                    <Title level={3} type='secondary'>评论区</Title>
                    <Commentarea />
                </Typography>
            </div>
            </div>
        </div>
        </div>
    )
}

export default OSPage