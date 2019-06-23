import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({box,imgUrl})=>{
    return(
        <div className="center">
            <div className="absolute mt2">
                <img id="myImg"src={imgUrl} alt="" width="500px" height="auto" />
                <div className="boundary_box" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;