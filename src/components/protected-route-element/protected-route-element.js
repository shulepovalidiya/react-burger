import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRouteElement({onlyUnAuth = false, children}) {

        const {loggedIn, authChecked, currentName} = useSelector(store => store.auth);
        const navigate = useNavigate();

        if (!authChecked) {
                return null;
        }

        if (onlyUnAuth && loggedIn) {
                return <Navigate to={"/"} replace={true}/>
                // navigate("/");
        }

        if (!onlyUnAuth && !loggedIn ) {
                return <Navigate to={"/login"} replace={true}/>
                // navigate("/login");
        }

        // !onlyUnAuth && user

        return children;

}