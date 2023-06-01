import React, {FC, useEffect} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import SignIn from "../../pages/sign-in/sign-in";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Orders from "../../pages/orders/orders";
import UserInfo from "../user-info/user-info";
import {Feed} from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/ingredients";
import {getIngredients} from "../../services/thunks/ingredients";
import {checkUserAuth} from "../../services/thunks/auth";

export const App: FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    const {
        ingredients,
        ingredientsRequest
    } : {
        ingredients: TIngredient[],
        ingredientsRequest: boolean
    } = useAppSelector((state) => state.ingredients)

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(checkUserAuth())
    }, [])

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={"/"} element={(!ingredientsRequest && ingredients.length) && <Main/>}>
                </Route>
                <Route path={"/login"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><SignIn/></ProtectedRouteElement>}/>
                <Route path={"/register"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><Register/></ProtectedRouteElement>}/>
                <Route path={"/forgot-password"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><ForgotPassword/></ProtectedRouteElement>}/>
                <Route path={"/reset-password"}
                       element={<ProtectedRouteElement onlyUnAuth={true}><ResetPassword/></ProtectedRouteElement>}/>
                <Route path={"/profile"}
                       element={<ProtectedRouteElement onlyUnAuth={false}><Profile/></ProtectedRouteElement>}>
                    <Route index
                           element={<ProtectedRouteElement onlyUnAuth={false}><UserInfo/></ProtectedRouteElement>}/>
                    <Route path={"/profile/orders"}
                           element={<ProtectedRouteElement onlyUnAuth={false}><Orders/></ProtectedRouteElement>}/>
                </Route>
                <Route path={"/ingredients/:id"} element={<IngredientDetails isModal={false}/>}/>
                <Route path={"/feed"} element={<Feed/>}/>
                <Route path={"/feed/:id"} element={<OrderInfo/>}/>
                <Route path={"/profile/orders/:id"} element={<ProtectedRouteElement onlyUnAuth={false}><OrderInfo
                    isOwn={true}/></ProtectedRouteElement>}/>
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path={"/ingredients/:id"} element={
                        <Modal onClose={() => navigate(-1)} header={"Детали ингредиента"}>
                            <IngredientDetails isModal={true}/>
                        </Modal>}/>
                    <Route path={"/feed/:id"} element={
                        <Modal onClose={() => navigate(-1)} >
                            <OrderInfo isModal={true}/>
                        </Modal>}/>
                    <Route path={"/profile/orders/:id"} element={
                        <Modal onClose={() => navigate(-1)} >
                            <OrderInfo isModal={true} isOwn={true}/>
                        </Modal>}/>
                </Routes>
            )}
        </>
    );
}


