import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onButtonPress})=>{
    return(
        <div>
            <p className="f3">
                {"This magic brain will detect faces in your pictures. Give it a try"}
            </p>
            <div className="center">
                <div className="pa4 br3 center shadow-5 form">
                    <input className="f4 pa2 center w-70"type="text" onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 white bg-light-purple dib" onClick={onButtonPress} >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;