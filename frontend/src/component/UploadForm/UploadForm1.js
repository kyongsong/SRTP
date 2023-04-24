import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import './UploadForm.css'
import UploadSelect from './UploadSelect';
import FileUpload from './FileUpload'

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="上传资料"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      // 真正的上传在这里
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
          var store = window.localStorage
          var select_type = store.getItem("UploadType")
          var upload_flag = store.getItem("UploadFlag")
          if (select_type === "NONE") {
            alert("未选择类别，不可提交")
          }
          else if (upload_flag !== "true") {
            alert("未上传文件，不可提交")
          }
          store.setItem("UploadType", "NONE")
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="资料名称"
          rules={[
            {
              required: true,
              message: '资料名称不能为空!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="type" 
          label="资料类别"
        >
          <UploadSelect />
        </Form.Item>
        <Form.Item
          name="upload"
          label="资料上传"
        >
          <FileUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UploadForm1 = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  return (
    <div>
      <Button
      type='primary'
        onClick={() => {
          setOpen(true);
        }}
      >
        分享可下载资料
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default UploadForm1;