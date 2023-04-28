import "./BallAndPlayer.css"
function BallAndPlayer(){
    return (
        <div>
                <div className="Home" id="Home_Team">
                    <span id="Team A.0" >•</span>
                    <span id="Team A.1">•</span>
                    <span id="Team A.2">•</span>
                    <span id="Team A.3">•</span>
                    <span id="Team A.4">•</span>
                </div>
                <div className="Visitor" id="Visitor_Team">
                    <span id="Team B.0">•</span>
                    <span id="Team B.1">•</span>
                    <span id="Team B.2">•</span>
                    <span id="Team B.3">•</span>
                    <span id="Team B.4">•</span>

                </div>

                <div className="Basketball" >
                    <span id="Ball">•</span>
                </div>  
         </div>   
    )
}
export default BallAndPlayer
