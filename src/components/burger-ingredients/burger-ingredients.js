import React from "react";
import PropTypes, {arrayOf} from "prop-types";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import {Link} from "react-scroll";

function BurgerIngredients({data}) {

    return (
        <section className={`${BurgerIngredientsStyles.container} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <ul className={BurgerIngredientsStyles.tabPanel}>
                <li><Link to="bun" smooth={true} duration={500} containerId="categories"><Tab active={true}>Булки</Tab></Link></li>
                <li><Link to="sauce" smooth={true} duration={500} containerId="categories"><Tab active={false}>Соусы</Tab></Link></li>
                <li><Link to="main" smooth={true} duration={500} containerId="categories"><Tab active={false}>Начинки</Tab></Link></li>
            </ul>
            <ul className={BurgerIngredientsStyles.ingredientsList} id="categories">
                <li id="bun"><BurgerIngredientsCategory data={data} ingredientType="bun" id="bun"/></li>
                <li id="sauce"><BurgerIngredientsCategory data={data} ingredientType="sauce" /></li>
                <li id="main"><BurgerIngredientsCategory data={data} ingredientType="main" /></li>
            </ul>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: arrayOf(PropTypes.object).isRequired,
}

export default BurgerIngredients;