
import React, { useEffect, useState } from 'react';
import { Slider, Button, Card } from 'antd';
import { PauseOutlined, CaretRightOutlined,FastBackwardOutlined ,FastForwardOutlined } from '@ant-design/icons';


import request from '../../utils/request';
var store = window.localStorage

function  PlayProgressBar  () {
  
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [CurClip, setCurClip] = useState(0);
  const [TotalClip,setTotalClip]=useState(0);

 
 
  
  const handleFrontClipClick = () => {
    setCurClip();
    // 在这里将 isPlaying 应用于播放器
  };
  const handleNextClipClick = () => {
    setCurClip();
    // 在这里将 isPlaying 应用于播放器
  };


  useEffect(()=>{

    var TotalClip=store.getItem("TotalClip")
    setTotalClip(TotalClip)
   
  },[store.getItem("TotalClip")])
  useEffect(()=>{

    var TotalClip=store.getItem("TotalClip")
    setTotalClip(TotalClip)
   
  },[store.getItem("TotalClip")])


  
  
  

  const handleProgressChange = value => {
    setProgress(value);
    // 在这里将 value 应用于播放器
  };

  const handlePlayPauseClick = () => {
    if(store.getItem("event_id")!==null&&store.getItem("start_index")!==null&&store.getItem("end_index")!==null)
    {
      
      
      

      var request_Data={
        "event_id":store.getItem("event_id"),
        "start_index":store.getItem("start_index"),
        "end_index":store.getItem("end_index")
      };
    
    
    store.setItem("TotalClip",store.getItem("end_index")-store.getItem("start_index")+1)
    
    

  request.post('/Analysis-Match', request_Data).then(
      result =>{
      console.log(result.data)
      console.log(result.data.message)
      
      if (result.data.message == "success!")
      {
          //Get the Home_Team Id
          var Home_Id = result.data.metadata.home.teamid;
          //Get the Moverment_Data
          var Movement_Data = (result.data.movement);
          var timer = null;
          //Main Index for the Every clip
          var cnt = 0;
          // alert('Analysis成功')
          
          
          
          
          
      
          //start Timer
          timer = setInterval(function () {
              
              var value = Movement_Data[cnt];
              setProgress(cnt)
          
              
              
              /*alert(cnt)*/
              if (cnt == result.data.size) {
                  clearInterval(timer);
                  
               
                  setProgress(0)
                  
                  return;
              }
              else
              {
                  //Part1.Get the Value of the Ball,Change the Ball Position 
                  var ball_data = value.ball_position;
                  var X_Rate=12.7;
                  var Y_Rate=13.44;
                  var Px_OffsetX=370;
                  var Px_OffsetY=100;

                  var Position_X = (ball_data[0] * X_Rate + Px_OffsetX).toFixed(0);
                  var Position_Y = (ball_data[1] * Y_Rate + Px_OffsetY).toFixed(0);
                  //Change the Ball Position
                  var elem = document.getElementById("Ball");//获取控件
                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）
                  elem.style.top = Position_Y+"px";//设置top数值
                  elem.style.left = Position_X+"px";//设置left数值
                 elem.style.fontSize=116+"px";
                  


                  //Part2.Get the Value of the Player,Change the Player Position
                  //the Counter for the HomePlayer and VisitorPlayer
                  var HomePlayer_Cnt = 0;
                  var VisitorPlayer_Cnt = 0;
                  //Traverse the All the Player Position On each possestion
                  for (var j = 0; j < value.player_position.length; j++)
                  {
                      var player_data = value.player_position[j];

                      //player Belongs to Home_Team
                      if (player_data[0] == Home_Id) {
                          var Position_X = (player_data[2] * X_Rate + Px_OffsetX).toFixed(0);
                          var Position_Y = (player_data[3] * Y_Rate + Px_OffsetY).toFixed(0);


                          switch (HomePlayer_Cnt) {
                              case 0:
                                  var elem = document.getElementById("Team A.0");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 1:
                                  var elem = document.getElementById("Team A.1");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 2:
                                  var elem = document.getElementById("Team A.2");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 3:
                                  var elem = document.getElementById("Team A.3");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 4:
                                  var elem = document.getElementById("Team A.4");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              default:
                                  alert("error")
                          }
                          //alert(Home_Team_html)
                          HomePlayer_Cnt++;

                      }
                      //player Belongs to Visitor_Team
                      else {

                          var Position_X = player_data[2] * X_Rate + Px_OffsetX;
                          var Position_Y = player_data[3] * Y_Rate + Px_OffsetY;
                          //alert("Visitor_player")
                          switch (VisitorPlayer_Cnt) {
                              case 0:
                                  var elem = document.getElementById("Team B.0");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 1:
                                  var elem = document.getElementById("Team B.1");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 2:
                                  var elem = document.getElementById("Team B.2");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 3:
                                  var elem = document.getElementById("Team B.3");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              case 4:
                                  var elem = document.getElementById("Team B.4");//获取控件
                                  elem.style.position = "absolute";//设置绝对定位（或者相对定位）

                                  elem.style.left = Position_X+"px";//设置left数值

                                  elem.style.top = Position_Y+"px";//设置top数值
                                  elem.style.fontSize=116+"px";
                                  break;
                              default:
                                  alert("error")
                          }


                          //alert(Visitor_Team_html)
                          VisitorPlayer_Cnt++;
                      }


                  }
                  cnt++;
                 

              }
              
          }, 15);

         
      }
     
    
    
      }
    )
    }
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
        max={TotalClip}
        tipFormatter={null}
        style={{ width: 1080 }}
        
        trackStyle={{ backgroundColor: 'white' }}
      />
     
     
        
      </div>
    
    
  );
};

export default PlayProgressBar;
