import 'antd/dist/antd.min.css';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Form, Input, List, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import Dianzan from './dianzan';
import Edit from './Edit';
import Actions from './actions';
const { TextArea } = Input;



const Commentarea = () => {
 
 
  return (  
    <> 
      <Dianzan />
      <Actions/>
      <Dianzan />
      <Actions/>
       <Edit/>
    </>
  );
};
export default Commentarea;