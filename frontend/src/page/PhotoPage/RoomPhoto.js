import "./RoomPhoto.css"

import Lamp from "./Lamp.png"
import Sensor from "./Sensor.png"
import Lock from "./Lock.png"
import Switch from "./Switch.png";
import { useEffect } from "react";
import request from "../../utils/request";

var store = window.localStorage
var username1 = store.getItem("UserName")

var RoomNo = store.getItem("RoomNo")
var RoomType=store.getItem("RoomType")
function RoomPhoto(){
    useEffect(() => {
      var myp=document.getElementById("myp")
      if(RoomType==="卧室"){
        
        myp.className="Dining"
      }
      else if(RoomType==="运动室")
      {
        myp.className="Sport"
      }
      else if(RoomType==="大厅"){
        myp.className="Lobby"
      }
      const data={
        "username":username1,
        "RoomNo":RoomNo
      }
      request.post("/api/getDevice_RoomNo",data).then(  
        // promise 的写法，第一个参数是路由地址，第二个参数是传入的 json
        res => {  // 成功的回调函数
            console.log(res.data)
            var length=res.data.length;
            
            for(var i=0;i<length;i++){
              var Element=document.createElement("img");
              if(res.data[i].DeviceType==="灯"){
                
                Element.src=Lamp
              }
              else if(res.data[i].DeviceType==="开关"){
                Element.src=Switch
              }
              else if(res.data[i].DeviceType==="门锁"){
               
                Element.src=Lock
              }
              else if(res.data[i].DeviceType==="传感器"){
                
                Element.src=Sensor
              }
              Element.style.position="absolute"
              Element.className="Device"
              Element.style.left=res.data[i].PositionX+"px"; //这里可以更改图片左边距
              Element.style.top=res.data[i].PositionY+"px";  //这里可以更改图片的上边距
              console.log(Element)
              myp.appendChild(Element)
            }
          
            
          }
        ).catch(res => {  // 错误处理
            console.log(res.data.res)
            console.log("FAILED")
        })
       
       
     
        
         
     
      
       
       
       
       
       
         console.log(myp)
        
        
    
         
        
      }, []);
    
    return(
        <div>
        <div id="myp" >
           
        
          
           
        </div>
        
        </div>
    )
}
export default RoomPhoto;