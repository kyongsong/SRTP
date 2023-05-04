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
    
    
        
    
    
       
        <Layout 
        style={{
            minHeight: '100vh',
            minWidth:'120vh'
          }}>

        <Header1/> 

       
         <Layout style={{
        
      }}>
         
          

            <Content style={{backgroundColor:'#006d75'}}>
                        <ScoreBoard/> 
                        
                       
                        <CriticalData />
                        <ScoreMap/>
                        <HeatMap  />
                        
                        
                   
            </Content>

            
            
         </Layout>
                
        
         </Layout > 
            
        
 
        
                  
    )



    
}
export default AnalysisPage