import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import SignIn from "../../pages/sign-in/sign-in";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {checkUserAuth} from "../../services/actions/auth";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function App() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    const {ingredients, ingredientsRequest} = useSelector(state => state.ingredients)

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(checkUserAuth())
    }, [])

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={"/"} exact element={(!ingredientsRequest && ingredients.length) && <Main/>}/>
                <Route path={"/login"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><SignIn/></ProtectedRouteElement>}/>
                <Route path={"/register"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><Register/></ProtectedRouteElement>}/>
                <Route path={"/forgot-password"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><ForgotPassword/></ProtectedRouteElement>}/>
                <Route path={"/reset-password"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><ResetPassword/></ProtectedRouteElement>}/>
                <Route path={"/profile"} element={<ProtectedRouteElement><Profile/></ProtectedRouteElement>}/>
                <Route path={"/ingredients/:id"} element={<IngredientDetails/>}/>
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path={"/ingredients/:id"} element={
                        <Modal onClose={() => navigate(-1)} header={"Детали ингредиента"}>
                            <IngredientDetails isModal={true}/>
                        </Modal>}
                    />
                </Routes>)}
        </>
    );
}


export default App;
