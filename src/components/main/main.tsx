import React, {FC} from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import MainStyles from "./main.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useParams} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/ingredients";


const Main: FC = () => {

    const {id} = useParams();

    const {ingredients} : {ingredients: TIngredient[]} = useAppSelector(state => state.ingredients)
    const ingredient: TIngredient = ingredients.find(item => item._id === id)!

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