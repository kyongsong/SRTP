import { Rate, Form, Modal } from 'antd';
import React, { useState } from 'react';
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="资料评价"
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
          name="score"
          rules={[
            {
              required: true,
              message: '打分至少有1星!',
            },
          ]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const ScoreForm = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  return (
    <div>
      <a
        onClick={() => {
          setOpen(true);
        }}
      >
        评分
      </a>
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
export default ScoreForm;