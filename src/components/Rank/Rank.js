import React from "react";

const Rank = ({name, submissions})=>{
    return(
        <div>
            <div className="white f3">
                {`${name}, your number of submissions are...`}
            </div>
            <div className="white f1">
                {`${submissions}`}
            </div>
        </div>
    )
}

export default Rank;