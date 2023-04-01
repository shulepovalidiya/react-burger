import React, {useEffect, FC} from 'react';
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
import Orders from "../../pages/orders/orders";
import UserInfo from "../user-info/user-info";
import {RootState} from "../../index";

export type TIngredientType = "bun" | "main" | "sauce";

export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: TIngredientType;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string,
    readonly __v: number;
    uuid?: string;
}

export const App: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    const {
        ingredients,
        ingredientsRequest
    } : {
        ingredients: TIngredient[],
        ingredientsRequest: boolean } = useSelector((state: RootState) => state.ingredients)

    useEffect(() => {
        dispatch(getIngredients() as any)
        dispatch(checkUserAuth() as any)
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
                <Route path={"/profile"} element={<ProtectedRouteElement onlyUnAuth={false}><Profile/></ProtectedRouteElement>}>
                    <Route index  element={<ProtectedRouteElement onlyUnAuth={false}><UserInfo/></ProtectedRouteElement>}/>
                    <Route path={"/profile/orders"}
                           element={<ProtectedRouteElement onlyUnAuth={false}><Orders/></ProtectedRouteElement>}/>
                </Route>
                <Route path={"/ingredients/:id"} element={<IngredientDetails isModal={false}/>}/>
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path={"/ingredients/:id"} element={
                        <Modal onClose={() => navigate(-1)} header={"Детали ингредиента"}>
                            <IngredientDetails isModal={true}/>
                        </Modal>}
                    />
                </Routes>
            )}
        </>
    );
}


