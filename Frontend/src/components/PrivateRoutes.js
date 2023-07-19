import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
const isLogin= ()=>localStorage['user'];
export const AuthenticationRoutes = () =>{
    return (
        <>
            {!isLogin() ? <Outlet  /> : <Navigate to="/" />};
        </>
    )
}
export const PrivateRoutes = () => {
    return (
        <>
            {isLogin() ? <Outlet  /> : <Navigate to="/login" />};
        </>
    )
}


