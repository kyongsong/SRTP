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
import HeatMap from '../../component/HeatMap/HeatMap'

const { Header, Footer, Sider, Content } = Layout;

var store = window.localStorage




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