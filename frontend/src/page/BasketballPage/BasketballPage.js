import React from 'react';
import './BasketballPage.css'

import { useState } from 'react';
import axios from 'axios'
import request from '../../utils/request';
import {useEffect,useRef} from 'react';

import BasketballBg from './BasketballBackground.png'
import { SearchOutlined ,RedoOutlined} from '@ant-design/icons';

import { Button, Checkbox, Form, Input, message,Layout } from 'antd';
import Sidebar from '../../component/Sidebar/Sidebar';

import Header1 from '../../component/Header/Header.js'
import PlayList from '../../component/RoundPlayLIst/RoundPlayList.js'
import ScoreBoard from '../../component/ScoreBoard/ScoreBoard';


var store = window.localStorage
var username1 = store.getItem("UserName")
const { Header, Footer, Sider, Content } = Layout;
//测试 画板功能
//衔接 前后端



function BasketballPage() {
    // Initial the Canvas
    useEffect(() => {
        
        var canvas = document.getElementById('theCanvas');
        canvas.setAttribute("width","1200");
        canvas.setAttribute("height","680");
        
        var context = canvas.getContext('2d');
        var imageObj = new Image();
        //var name = prompt("Enter the name of the file", "backdrop.jpg");

  
        imageObj.onload = function() {
            
        };
        console.log("Initial")
        console.log(canvas)
             
        }, []);

    
    
    const windowToCanvas = (canvas, x, y) => {
        let rect = canvas.getBoundingClientRect()
        return {
                x: x - rect.left * (canvas.width/rect.width),
                y: y - rect.top * (canvas.height/rect.height)
        }
    }
    useEffect(() => {
        let theCanvas = document.querySelector('#theCanvas')
        
        // if theCanvas is not exists or Environment does not support the Canvas
        if (!theCanvas || !theCanvas.getContext) 
        {
        return false
        } 
        else {
        let context = theCanvas.getContext('2d')
        let isAllowDrawLine = false
        console.log("MouseDown")

        var MoveTrack=new Array();
        //mouse down
        theCanvas.onmousedown = function(e) {
            isAllowDrawLine = true
            let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
            let { x, y } = ele
            let x1=(ele.x-10.0)/10
            if(x1<0) x1=0;
            let y1=(ele.y-9.0)/10
            if(y1<0) y1=0;
            
            MoveTrack.push({x1,y1})

            context.moveTo(x, y)
            console.log("init "+x1+" "+y1)
          
            theCanvas.onmousemove = (e) => {
                if (isAllowDrawLine) {
                    let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
                    let { x, y } = ele
                    let x1=(ele.x-10.0)/10
                    if(x1<0) x1=0;
                    let y1=(ele.y-9.0)/10
                    if(y1<0) y1=0;
                    
                    MoveTrack.push({x1,y1})
                    context.lineTo(x, y)
                    context.stroke()
                    //<!-- console.log("mouse move"+x+" "+y) -->
                   
                }
            }
        }
        
        
        theCanvas.onmouseup = function() {
            isAllowDrawLine = false
            var input =JSON.stringify(MoveTrack)
            
            var data={"MoveTrack":input}
        
           
            request.post('/Match', data).then(
                res =>{
                    console.log(res)
                    console.log(res.data.data.length)
                
                if(res.data.data.length===0){
                   alert("匹配失败")
                }else{
                    alert("回合:"+res.data.data[0][0]+"Start:"+res.data.data[0][1]+"End:"+res.data.data[0][2])
                }
                
                
               
              
                }
              )
          //  MoveTrack=new Array();
        }

        }
        
        
             
        }, []);
    const Reset=()=>{

            var ball = document.getElementById("Ball");
       
            
           ball.style.fontSize=0;
           var elem1 = document.getElementById("Team A.0");//获取控件
           
           elem1.style.fontSize=0;
        
           var elem2 = document.getElementById("Team A.1");//获取控件
          
           elem2.style.fontSize=0;
     
           var elem3 = document.getElementById("Team A.2");//获取控件
          
           elem3.style.fontSize=0;
          
       
           var elem4 = document.getElementById("Team A.3");//获取控件
           
           elem4.style.fontSize=0;
           
      
           var elem5 = document.getElementById("Team A.4");//获取控件
          
           
           elem5.style.fontSize=0;
         


 
           var elem6 = document.getElementById("Team B.0");//获取控件
           
           elem6.style.fontSize=0;
   
      
           var elem10 = document.getElementById("Team B.1");//获取控件
           
           elem10.style.fontSize=0;


           var elem7 = document.getElementById("Team B.2");//获取控件
           
           elem7.style.fontSize=0;
   

           var elem8 = document.getElementById("Team B.3");//获取控件
          
           elem8.style.fontSize=0;

           var elem9 = document.getElementById("Team B.4");//获取控件
   
           elem9.style.fontSize=0;
          
            var canvas = document.getElementById('theCanvas');
            canvas.width=canvas.width;
           console.log('reset')

    }
    const [event_id,setEvent_Id]=useState('');
    const [start_index,setStart_Index]=useState('');
    const [end_index,setEnd_Index]=useState('');
    const Movement=()=>
    {
        var request_Data={
            "event_id":event_id,
            "start_index":start_index,
            "end_index":end_index
        };

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
                alert('Analysis成功')
                

                
                
                clearInterval(timer);
                //start Timer
                timer = setInterval(function () {
                    var value = Movement_Data[cnt];
                    
                    /*alert(cnt)*/
                    if (cnt == result.data.size) {
                        clearInterval(timer);
                        return;
                    }
                    else
                    {
                        //Part1.Get the Value of the Ball,Change the Ball Position 
                        var ball_data = value.ball_position;
                        var X_Rate=10;
                        var Y_Rate=10;
                        var Position_X = (ball_data[0] * X_Rate + 100).toFixed(0);
                        var Position_Y = (ball_data[1] * Y_Rate + 105).toFixed(0);
                        //Change the Ball Position
                        var elem = document.getElementById("Ball");//获取控件
                        elem.style.position = "absolute";//设置绝对定位（或者相对定位）
                        elem.style.left = Position_X;//设置left数值
                        elem.style.top = Position_Y;//设置top数值
                       elem.style.fontSize=116;
                        


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
                                var Position_X = (player_data[2] * X_Rate + 100).toFixed(0);
                                var Position_Y = (player_data[3] * Y_Rate + 105).toFixed(0);


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

                                var Position_X = player_data[2] * X_Rate + 100;
                                var Position_Y = player_data[3] * Y_Rate + 105;
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
                }, 30);


            }
            
            }
          )
            
        
           
          
    
    
    
    }

    

    return (
    <div >
         
        
        
         
        <Header1/> 
        <Sidebar/>
        
        
        
            
            
            
        
            <div className="Input" >
       
                <Input type="text" id="Round" name="Round" placeholder="回合" 
                value={event_id} 
                style={{ width: 80 }}
                onChange={(event) => {
                setEvent_Id(event.target.value); 
                }}>        
                </Input>

                <Input type="text" id="StartIndex" name="Index" placeholder="启始帧数"
                value={start_index}
                style={{ width: 80 }}
                onChange={(event) => {
                setStart_Index(event.target.value); 
                }}   
                ></Input>

                <Input type="text" id="EndIndex" name="Index" placeholder="结束帧数"
                value={end_index}
                style={{ width: 80 }}
                onChange={(event) => {
                setEnd_Index(event.target.value); 
                }}        
                ></Input>

                <Button icon={<SearchOutlined />} onClick={Movement}>Submit</Button>
                
            </div>
          
               
            
               
            <img src={BasketballBg} className='Basketball_Background'></img>
                
            
            
            
            { <div className='siderStyle'>
                
                <PlayList width="400"/>
            </div> }
            
            
            <div  className="Canvas">
                    <canvas id="theCanvas" ></canvas>
            </div>
            
           
        
                <div className="Home" id="Home_Team">
                <span id="Team A.0" >•</span>
                <span id="Team A.1">•</span>
                <span id="Team A.2">•</span>
                <span id="Team A.3">•</span>
                <span id="Team A.4">•</span>
                </div>
                <div className="Visitor" id="Visitor_Team">
                <span id="Team B.0">•</span>
                <span id="Team B.1">•</span>
                <span id="Team B.2">•</span>
                <span id="Team B.3">•</span>
                <span id="Team B.4">•</span>

                </div>

                <div className="Basketball" >
                <span id="Ball">•</span>
                </div>  
         
          

    </div>
    )
}



export default BasketballPage