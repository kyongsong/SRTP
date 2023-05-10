import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'

function Isolate(){
    useEffect(()=>{
        var PeriodData={'current_round':10};
      
        request.post('/isolate', PeriodData).then(
            res =>{
                
                console.log(res)


            }

        )
    },[])
    
    return (
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        
        <g id="ShotMap"></g>
        </g>
        </svg >  


    )
}
export default Isolate;