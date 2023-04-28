
import React, { useState } from 'react';
import { Slider, Button, Card } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';

const PlayProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleProgressChange = value => {
    setProgress(value);
    // 在这里将 value 应用于播放器
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
    // 在这里将 isPlaying 应用于播放器
  };

  return (
    <Card
      
      bordered={false}
      style={{ background: '#002329', maxWidth: '1190px' ,position:"absolute",top:848,left:240}}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={handlePlayPauseClick}
          icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          shape="circle"
          style={{ marginRight: '16px' }}
        />
        <Slider
          value={progress}
          onChange={handleProgressChange}
          min={0}
          max={100}
          tipFormatter={null}
          style={{ width: 1190 }}
          
          trackStyle={{ backgroundColor: '#13c2c2' }}
        />
      </div>
    </Card>
  );
};

export default PlayProgressBar;
