import React from 'react';
import { Space, Table } from 'antd';
import ScoreForm from '../ScoreForm/ScoreForm';

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

  const columns2 = [
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
        title: '链接',
        key: 'index',
        render: (index) => (
            <Space size="middle">
              <a onClick={() => alert('跳转成功')}>跳转</a>
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

const Table2 = () => {
    return (
        <Table dataSource={dataSource} columns={columns2} />
    )
}

export default Table2