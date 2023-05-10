import { useEffect } from "react";
import request from "../../utils/request";
import BasketballBg from '../../page/BasketballPage/BasketballBackground2.jpg'
import Player1 from "../../assets/Player1.png"
import Player2 from "../../assets/Player2.png"
import Player3 from "../../assets/Player3.png"
import Player4 from "../../assets/Player4.png"
import Player5 from "../../assets/Player5.png"

function PassGraph(){
    return (
        <svg  width="1200" height="677" > 
        <image id="mys"xlinkHref={BasketballBg} width="1200" height="677" />
        <g>
        <rect x="0" y="0" width="1200" height="677" fill="none" pointerEvents="all" />
        <defs>
            <clipPath id="circle-clip">
            <circle cx="60" cy="60" r="40" />
            </clipPath>
        </defs>
        <circle cx="60" cy="60" r="40" fill="#ffffff" /> 
        <image xlinkHref={Player1} x="30" y="20" width="50" height="50" clip-path="url(#circle-clip)" />
        
        <g id="PassGraph"></g>
        </g>
        </svg >  

    )
}
export default PassGraph;