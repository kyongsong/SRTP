import React from 'react';
import { Space, Table } from 'antd';
import ScoreForm from '../ScoreForm/ScoreForm';
import axios from 'axios'

const downloadFile = (filePath, filename) => {
  axios.post(filePath, '', {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded', //请求的数据类型为form data格式
      },
      'responseType': 'blob'  //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
  }).then(function (response) {
      const blob = new Blob([response.data]);
      const fileName = filename;
      const linkNode = document.createElement('a');
      linkNode.download = fileName; //a标签的download属性规定下载文件的名称
      linkNode.style.display = 'none';
      linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
      document.body.appendChild(linkNode);
      linkNode.click();  //模拟在按钮上的一次鼠标单击
      URL.revokeObjectURL(linkNode.href); // 释放URL 对象
      document.body.removeChild(linkNode);
  }).catch(function (error) {
      console.log(error);
  });
}

const dataSource = [
    {
      index: '0',
      name: '资料0号',
      user: '一个用户',
      score: '1',
      my_score: '0',
    },
    {
        index: '1',
        name: '资料1号',
        user: '另一个用户',
        score: '5',
        my_score: '0',
      },
  ];

const columns1 = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'index',
    },
    {
      title: '上传用户',
      dataIndex: 'user',
      key: 'index',
    },
    {
      title: '平均评分',
      dataIndex: 'score',
      key: 'index',
    },
    {
        title: '我的评分',
        dataIndex: 'my_score',
        key: 'index',
    },
    {
        title: '下载',
        key: 'index',
        render: (index) => (
            <Space size="middle">
              <a onClick={() => alert('下载成功')}>下载</a>
            </Space>
        ),
    },
    {
        title: '评价',
        key: 'index',
        render: (index) => (
            <Space size="middle">
              <ScoreForm />
            </Space>
        ),
    }
];

const Table1 = () => {
    return (
        <Table dataSource={dataSource} columns={columns1} />
    )
}

export default Table1