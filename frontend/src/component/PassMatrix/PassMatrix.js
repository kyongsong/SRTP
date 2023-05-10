import { useEffect } from "react";

function PassMatrix(){
     useEffect(()=>{

        
     },[])
    return (
        <svg width="650" height="650" viewBox="0 0 650 650">

            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <rect x="50" y="50" width="550" height="550" fill="#F0F0F0" />
            <g>
            
            <text x="10" y="30" font-size="12" fill="#000">球员</text>
           
            <text x="50" y="30" font-size="12" fill="#000">1</text>
            <text x="550" y="30" font-size="12" fill="#000">13</text>
            <text x="5" y="60" font-size="12" fill="#000">1</text>
            <text x="460" y="170" font-size="12" fill="#000">13</text>
            {/* FirstRow */}
            
            <g>          
                <rect id="Player1"x="50" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
                <text x="60" y="70" fill="#000" font-size="20">1</text>
            </g>
            <g>
            
                <rect id ="Player1.2"x="80" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.3"x="110" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.4"x="140" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.5"x="170" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.6"x="200" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.7"x="230" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.8"x="260" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.9"x="290" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
       
            </g>
            <g>
            
                <rect id ="Player1.10"x="320" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.11"x="350" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
                <rect id ="Player1.12"x="380" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />
    
            </g>
            <g>
            
            <rect id ="Player1.12"x="410" y="50" width="30" height="30" fill="#d9efff" stroke="#000000" />

            </g>
           

            <g transform="translate(0, 30)">
            <rect x="50" y="50" width="30" height="30" fill="#a7ea7f" stroke="#000000" />
                <text x="65" y="70" fill="#000" font-size="10">球员2</text>
                <text x="55" y="80" fill="#000" font-size="10">位置2</text>
                
            </g>

            </g>

            <g>
            <rect x="50" y="610" width="20" height="20" fill="#d9efff" stroke="#000000" />
            <text x="80" y="620" fill="#000" font-size="10">数值最小</text>
            </g>
            <g>
            <rect x="150" y="610" width="20" height="20" fill="#a7ea7f" stroke="#000000" />
            <text x="180" y="620" fill="#000" font-size="10">数值较小</text>
            </g>
            <g>
            <rect x="250" y="610" width="20" height="20" fill="#61c750" stroke="#000000" />
            <text x="280" y="620" fill="#000" font-size="10">数值中等</text>
            </g>
            <g>
            <rect x="350" y="610" width="20" height="20" fill="#004F33" stroke="#000000" />
            <text x="380" y="620" fill="#000" font-size="10">数值最大</text>
            </g>
        </svg>
    )
}
export default PassMatrix;