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
    

    
    

    
    
    return (
    
    
        
    
       <div > 
       
        <Layout >

        <Header1/>

       
         <Layout >
         
            <Sider>
                <Sidebar />
                
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