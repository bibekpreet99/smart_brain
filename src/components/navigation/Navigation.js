import React from "react";

const Navigation = ({onRouteChange, isSignedIn})=>{
        if(isSignedIn)
        {
            return(   
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <p onClick={()=>onRouteChange('signin')} className="underline f3 pa3 link pointer black dim"> Sign Out </p>
                </nav>
            )
        }
        else{
            return(
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <p onClick={()=>onRouteChange('signin')} className="underline f3 pa3 link pointer black dim"> Sign In </p>
                    <p onClick={()=>onRouteChange('register')} className="underline f3 pa3 link pointer black dim"> Register </p>
                </nav>
            )
        }
    
}

export default Navigation;