import React from 'react';
import './BasketballPage.css'

import { useState } from 'react';
import axios from 'axios'
import request from '../../utils/request';
import {useEffect,useRef} from 'react';

import BasketballBg from './BasketballBackground2.jpg'
import { SearchOutlined ,RedoOutlined} from '@ant-design/icons';

import { Button, Checkbox, Form, Input, message,Layout} from 'antd';
import Sidebar from '../../component/Sidebar/Sidebar';

import Header1 from '../../component/MyHeader/MyHeader.js'

import ScoreBoard from '../../component/ScoreBoard/ScoreBoard';
import PlayBar from '../../component/PlayProgressBar/PlayProgressBar.js'
import BallAndPlayer from '../../component/BallAndPlayer/BallAndPlayer';
import InputRound from '../../component/InputRound/InputRound';

const { Header, Footer, Sider, Content } = Layout;

var store = window.localStorage
var username1 = store.getItem("UserName")





function BasketballPage() {
    const [Matching_Round,setMatching_Round] =useState('');

    // Initial the Canvas
    useEffect(() => {
        
        var canvas = document.getElementById('theCanvas');
        canvas.setAttribute("width","1194");
        canvas.setAttribute("height","672");
        
        
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
            console.log("real "+ele.x,ele.y)
           
            
            let { x, y } = ele
            let x1=(ele.x-7)/12.6
            
            if(x1<0) x1=0;
            let y1=(ele.y-6)/13.26
            console.log(y1)
            if(y1<0) y1=0;
            
            MoveTrack.push({x1,y1})

            context.moveTo(x, y)
            console.log("init "+x1+" "+y1)
          
            theCanvas.onmousemove = (e) => {
                if (isAllowDrawLine) {
                    let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
                    let { x, y } = ele
                    let x1=(ele.x-7)/12.6
                    
                    if(x1<0) x1=0;
                    let y1=(ele.y-6)/13.26
                    console.log(y1)
                    if(y1<0) y1=0;
                    console.log("Move "+x1+" "+y1)
                    
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
                    setMatching_Round(res.data);
                    
                }
                
                
               
              
                }
              )
          //  MoveTrack=new Array();
        }

        }
        
        
             
        }, []);

    
    

    
    
    return (
    
    
        
    
       <div > 
       
        <Layout >

        <Header1/>

       
         <Layout >
         
            <Sider>
                <Sidebar Matching={Matching_Round}/>
                
            </Sider> 

            <Content style={{backgroundColor:'#006d75'}}>
                        <ScoreBoard/>
                       
                        <img src={BasketballBg} className='Basketball_Background'></img>
                        <div  className="Canvas">
                            <canvas id="theCanvas" ></canvas>
                        </div>
                        
                      
                        
                        
                        <InputRound/>
                        <PlayBar />
                        <BallAndPlayer/>
                    {/* <div className='siderStyle'>
                
                            <PlayList />
                    </div>  */}
                   
            </Content>

            
            
         </Layout>
         
        
           
        
    
              
        
           
            
            
            
         
            
            
        
                
          
        
         </Layout > 
            
        
        </div>
        
                
    
    
    
    )
}



export default BasketballPage