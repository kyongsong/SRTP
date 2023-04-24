import { Select } from 'antd';
import React from 'react';
const onChange = (value) => {
  var store = window.localStorage
  store.setItem("UploadType", value)
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
const UploadSelect = () => (
  <Select
    showSearch
    placeholder="请选择资料的类别"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'C语言程序设计',
        label: 'C语言程序设计',
      },
      {
        value: '程序设计专题',
        label: '程序设计专题',
      },
      {
        value: '离散数学及其应用',
        label: '离散数学及其应用',
      },
      {
        value: '数据结构',
        label: '数据结构',
      },
      {
        value: '高级数据结构与算法分析',
        label: '高级数据结构与算法分析',
      },
      {
        value: '数字逻辑设计',
        label: '数字逻辑设计',
      },
      {
        value: '信息安全原理',
        label: '信息安全原理',
      },
      {
        value: '计算机系统原理',
        label: '计算机系统原理',
      },
      {
        value: '计算机组成',
        label: '计算机组成',
      },
      {
        value: '面向对象程序设计',
        label: '面向对象程序设计',
      },
      {
        value: '数据库系统',
        label: '数据库系统',
      },
      {
        value: '软件工程基础',
        label: '软件工程基础',
      },
      {
        value: '软件需求工程',
        label: '软件需求工程',
      },
      {
        value: '软件工程管理',
        label: '软件工程管理',
      },
      {
        value: '软件质量保证与测试',
        label: '软件质量保证与测试',
      },
      {
        value: '操作系统',
        label: '操作系统',
      },
      {
        value: '计算机网络',
        label: '计算机网络',
      },
      {
        value: 'B/S体系软件设计',
        label: 'B/S体系软件设计',
      },
      {
        value: 'Java程序设计',
        label: 'Java程序设计',
      },
      {
        value: '程序设计方法学',
        label: '程序设计方法学',
      },
      {
        value: '嵌入式系统',
        label: '嵌入式系统',
      },
      {
        value: '汇编与接口',
        label: '汇编与接口',
      },
      {
        value: '区块链与数字货币',
        label: '区块链与数字货币',
      },
      {
        value: '国际证券市场导论',
        label: '国际证券市场导论',
      },
    ]}
  />
);
export default UploadSelect;