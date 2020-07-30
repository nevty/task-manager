import React from "react";
import LoginPage from "../pages/LoginPage";
import authAPI from "../api/auth";

const withAuthRedirect = (Component)=>({...props})=>{
    const uid = authAPI.getUid();
    if (!uid) {
       return <LoginPage {...props}/>
    } else {
        return <Component {...props}/>
    }
}

export default withAuthRedirect;