import { Avatar, Button, Comment, Form, Input, List,Tooltip } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { createElement,useState } from 'react';
import Actions from './actions';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => ( 
   <List>
  <Comment  {...props} />
  <Actions/>
  
  </List>
    )
  }
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);
const  Edit = () => { 
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };
    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];
    
const [comments, setComments] = useState([]);
const [submitting, setSubmitting] = useState(false);
const [value, setValue] = useState('');
const handleSubmit = () => {
if (!value) return;
setSubmitting(true);
setTimeout(() => {
  setSubmitting(false);
  setValue('');
  setComments([
    ...comments,
    { 
      author: 'Han Solo',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: <p>{value}</p>,
      datetime: moment('2022-11-16').fromNow(),
    },
  ]

  );
}, 1000);
};
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <> 
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
       
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
export default Edit;