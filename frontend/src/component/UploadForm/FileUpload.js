import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  accept: '.zip,.rar,.7z',
  onChange(info) {
    var store = window.localStorage
    store.setItem("UploadFlag", "false")
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      store.setItem("UploadFlag", "true")
      message.success(`${info.file.name} 上传成功`);
      console.log(info)
    } else if (info.file.status === 'error') {
      store.setItem("UploadFlag", "false")
      message.error(`${info.file.name} 上传失败`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};
const FileUpload = () => (
  <Upload {...props} maxCount={1}>
    <Button icon={<UploadOutlined />}>点击上传压缩文件</Button>
  </Upload>
);
export default FileUpload;