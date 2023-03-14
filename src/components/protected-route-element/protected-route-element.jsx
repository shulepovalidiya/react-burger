import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRouteElement({onlyUnAuth = false, children}) {

        const {loggedIn, authChecked} = useSelector(store => store.auth);

        if (!authChecked) {
                return null;
        }

        if (onlyUnAuth && loggedIn) {
                return <Navigate to={"/"} replace={true}/>
        }

        if (!onlyUnAuth && !loggedIn ) {
                return <Navigate to={"/login"} replace={true}/>
        }

        // !onlyUnAuth && user

        return children;

}