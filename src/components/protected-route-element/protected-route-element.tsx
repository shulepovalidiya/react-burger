import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../index";


type TProtectedRouteElementProps = {
    onlyUnAuth: boolean;
    children: JSX.Element;
}

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({onlyUnAuth = false, children}) => {

    const {loggedIn, authChecked} = useSelector((store: RootState) => store.auth);

    if (!authChecked) {
        return null;
    }

    if (onlyUnAuth && loggedIn) {
        return <Navigate to={"/"} replace={true}/>
    }

    if (!onlyUnAuth && !loggedIn) {
        return <Navigate to={"/login"} replace={true}/>
    }

    // !onlyUnAuth && user

    return children;

}

export default ProtectedRouteElement;