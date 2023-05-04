import React from 'react';


import { useState } from 'react';

import request from '../../utils/request';
import {useEffect,useRef} from 'react';

import "./AnalysisPage.css"

import { Button, Checkbox, Form, Input, message,Layout,Card} from 'antd';
import Sidebar from '../../component/Sidebar/Sidebar';

import Header1 from '../../component/MyHeader/MyHeader.js'

import ScoreBoard from '../../component/ScoreBoard/ScoreBoard';
import PlayBar from '../../component/PlayProgressBar/PlayProgressBar.js'
import BallAndPlayer from '../../component/BallAndPlayer/BallAndPlayer';

import HeatMap from '../../component/HeatMap/HeatMap'
import BasketballBg from '../BasketballPage/BasketballBackground2.jpg'
import CriticalData from '../../component/CriticalData/CriticalData';
import ScoreMap from '../../component/ScoreMap/ScoreMap';

const { Header, Footer, Sider, Content } = Layout;

var store = window.localStorage




function AnalysisPage(){
  
    
    
    return (
    
    
        
    
       <div style={{backgroundColor:'#006d75'}}> 
       
        <Layout >

        <Header1/> 

       
         <Layout >
         
            <Sider>
                 <Sidebar /> 
                
            </Sider> 

            <Content style={{backgroundColor:'#006d75'}}>
                        <ScoreBoard/> 
                        
                        <HeatMap />
                        <CriticalData/>
                        <ScoreMap/>
                        
                        
                   
            </Content>

            
            
         </Layout>
                
        
         </Layout > 
            
        
        </div>
        
                  
    )



    
}
export default AnalysisPage