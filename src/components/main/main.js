import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import MainStyles from "./main.module.css";

function Main({data}) {
    return (
        <main className={MainStyles.main}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
        </main>
    )
}

export default Main;