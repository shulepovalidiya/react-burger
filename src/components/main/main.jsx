import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import MainStyles from "./main.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";


function Main() {

    const {id} = useParams();
    const ingredient = useSelector(state => state.ingredients.ingredients.find(item => item._id === id))

    return (
        <main className={MainStyles.main}>
            <DndProvider backend={HTML5Backend}>
                {ingredient
                    ? <Outlet/>
                    : <>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </>}

            </DndProvider>
        </main>
    )
}

export default Main;