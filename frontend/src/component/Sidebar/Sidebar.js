import { RedoOutlined , SettingOutlined, SearchOutlined,DribbbleOutlined ,EditOutlined,ToolOutlined,DashOutlined ,UserOutlined   } from '@ant-design/icons';
import { Menu, Drawer} from 'antd';
import React, { useState,useEffect } from 'react';
import Wrapper from '../../assets/wrappers/SideBar.js';
import RoundPlayList from '../RoundPlayLIst/RoundPlayList.js';
import request from '../../utils/request.js';

var storage=window.localStorage;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('User', '1', <UserOutlined />),
  
  getItem('Algorithm', 'sub1', <DribbbleOutlined />, [
    getItem('dtw', '2'),
    getItem('encoder', '3'),
    getItem('GraphicFeatures', '4'),
    
    
  ]),
  getItem('Tool', 'sub2', <ToolOutlined />, [
    getItem('Scratch', '5',<EditOutlined />),
    getItem('Click', '6',<DashOutlined />),
    getItem('Reset', '7',<RedoOutlined  />),
    
    
  ]),
  getItem('Matching', '8', <SearchOutlined />),
  getItem('Analysis', '9', <SearchOutlined />),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1'];
const Sidebar = () => {

  
  const [open, setOpen] = useState(false);
  const [MatchingStatus,setMathingStatus]=useState(false);
  
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onLink = (key) => {
    
    if (key.key=='1'){
      window.location.href = "./"
    }
    else if(key.key=='2'){
      storage.setItem("ChoosingAlgorithm","dtw")
    }
    else if (key.key == '3') {
      storage.setItem("ChoosingAlgorithm","encoder")
    }
    else if (key.key == '4') {
      storage.setItem("ChoosingAlgorithm","graphic_features")
    }
    else if(key.key=='5'){
      window.location.href="./Room"
    }
    else if(key.key=='6'){
      window.location.href="./Device"
    }
    else if (key.key == '7') {
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
      console.log('reset2')
    }
    else if(key.key == '8'){
      

     
        console.log(Trackdata)
      
      request.post('/Match', Trackdata).then(
          res =>{
              console.log(res)
              console.log(res.data.data.length)
          
          if(res.data.data.length===0){
            alert("匹配失败")
          }else{
              
              setMatching_Round(res.data);
              
          }
                      
        
          }
        )
  
  
      
      setOpen(true);
    }
    else {
      
      window.location.href="./Analysis"
    }
  };
  const theme={
    
      'primary-color': '#1890ff',
  
  }
  const [Matching_Round,setMatching_Round] =useState('');
  const [ScratchStatus,setScratchStatus]=useState(false);
  let Trackdata=[];

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
   
   let MoveTrack=new Array();
  
   
   

    
   
    theCanvas.onmousedown = function(e) {
      isAllowDrawLine = true
      
      let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
      console.log("real "+ele.x,ele.y)

      MoveTrack=new Array();
      //mouse down
      console.log(MatchingStatus)
     
      
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
        let input=new Array(JSON.stringify(MoveTrack));
        
        var Choosing;
        if(storage.getItem("ChoosingAlgorithm")==null){
            Choosing="dtw"
        }
        else{
            Choosing=storage.getItem("ChoosingAlgorithm")
        }
        var ChoosingAlgorithm=JSON.stringify(Choosing)
        
        let data=new Array({"MoveTrack":input,"ChoosingAlgorithm":ChoosingAlgorithm})
        Trackdata.push(data)
        // console.log(data)
        // console.log(Trackdata)
      
        // console.log(MatchingStatus)
      
      //  MoveTrack=new Array();
    
  }
   }
  
  
   
   
   

   
   
        
   }, [Trackdata]);
  return (

      <div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          
        theme="dark"
          style={{
            width: 200,
            height:990,
            fontSize:20,
            
            backgroundColor: '#00474f',
          }}
          items={items}
          
          onClick={onLink}
        />
        <Drawer title="Matching Round" placement="right" onClose={onClose} open={open} headerStyle={{backgroundColor: '#00474f' ,fontSize:20 } } bodyStyle={{backgroundColor:'#006d75'}}>
          <RoundPlayList Matching={Matching_Round}/>
      </Drawer>
      </div>
     
  );
};

export default Sidebar;