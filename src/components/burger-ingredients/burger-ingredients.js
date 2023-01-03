import React from "react";
import PropTypes, {arrayOf} from "prop-types";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";

function BurgerIngredients({data}) {

    return (
        <section className={`${BurgerIngredientsStyles.container} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <ul className={BurgerIngredientsStyles.tabPanel}>
                <li><Tab active={true}>Булки</Tab></li>
                <li><Tab active={false}>Соусы</Tab></li>
                <li><Tab active={false}>Начинки</Tab></li>
            </ul>
            <ul className={BurgerIngredientsStyles.ingredientsList}>
                <li><BurgerIngredientsCategory data={data} ingredientType="bun" /></li>
                <li><BurgerIngredientsCategory data={data} ingredientType="sauce" /></li>
                <li><BurgerIngredientsCategory data={data} ingredientType="main" /></li>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: arrayOf(PropTypes.object).isRequired,
}

export default BurgerIngredients;