import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import MainStyles from "./main.module.css";
import PropTypes, {arrayOf} from "prop-types";

function Main({data}) {
    return (
        <main className={MainStyles.main}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
        </main>
    )
}

Main.propTypes = {
    data: arrayOf(PropTypes.object).isRequired,
}

export default Main;