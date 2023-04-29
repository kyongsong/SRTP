
import React, { useState } from 'react';
import { Slider, Button, Card } from 'antd';
import { PauseOutlined, CaretRightOutlined,FastBackwardOutlined ,FastForwardOutlined } from '@ant-design/icons';

const PlayProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Clip, setClip] = useState(0);
  const [TotalClip,setTotalClip]=useState(0);

  
  

  const handleProgressChange = value => {
    setProgress(value);
    // 在这里将 value 应用于播放器
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
    // 在这里将 isPlaying 应用于播放器
  };
  const handleFrontClipClick = () => {
    setClip();
    // 在这里将 isPlaying 应用于播放器
  };
  const handleNextClipClick = () => {
    setClip();
    // 在这里将 isPlaying 应用于播放器
  };

  return (
    // <Card
      
    //   bordered={false}
    //   style={{ background: '#006d75', maxWidth: '1200px' ,position:"absolute",top:868,left:380}}
    // >
      <div style={{ display: 'flex', alignItems: 'center' ,position:"absolute",top:878,left:380}}>
        <Button
          onClick={handleFrontClipClick}
          icon={ <FastBackwardOutlined />}
          shape="circle"
          style={{ marginRight: '8px' }}
        />
        <Button
          onClick={handlePlayPauseClick}
          icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          shape="circle"
          style={{ marginRight: '8px' }}
        />
        <Button
          onClick={handleNextClipClick}
          icon={<FastForwardOutlined />}
          shape="circle"
          style={{ marginRight: '8px' }}
        />
        <Slider
          value={progress}
          onChange={handleProgressChange}
          min={0}
          max={100}
          tipFormatter={null}
          style={{ width: 1080 }}
          
          trackStyle={{ backgroundColor: 'white' }}
        />
      </div>
    // </Card>
  );
};

export default PlayProgressBar;
