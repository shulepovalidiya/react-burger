import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";

function App() {

    const dispatch = useDispatch();

    const {ingredients, ingredientsRequest} = useSelector(state => state.ingredients)

    useEffect(() => dispatch(getIngredients()), [dispatch])

    return (
        <>
            <AppHeader/>
            {(!ingredientsRequest && ingredients.length) && (
                    <Main />
                )
            }

        </>
    );
}


export default App;
