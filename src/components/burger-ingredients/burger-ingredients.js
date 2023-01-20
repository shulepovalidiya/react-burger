import React, {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import {Link} from "react-scroll";
import {ingredientTypes} from "../../utils/constants";

function BurgerIngredients() {

    const {bun, sauce, main} = ingredientTypes;

    const [selectedCategory, setSelectedCategory] = useState(bun);

    const handleTabClick = (category) => setSelectedCategory(category);

    return (
        <section className={`${BurgerIngredientsStyles.container} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <ul className={BurgerIngredientsStyles.tabPanel}>
                <li><Link to={bun} smooth={true} duration={500} containerId="categories"><Tab active={selectedCategory === bun} onClick={() => handleTabClick(bun)}>Булки</Tab></Link></li>
                <li><Link to={sauce} smooth={true} duration={500} containerId="categories"><Tab active={selectedCategory === sauce} onClick={() => handleTabClick(sauce)}>Соусы</Tab></Link></li>
                <li><Link to={main} smooth={true} duration={500} containerId="categories"><Tab active={selectedCategory === main} onClick={() => handleTabClick(main)}>Начинки</Tab></Link></li>
            </ul>
            <ul className={BurgerIngredientsStyles.ingredientsList} id="categories">
                <li id={bun}><BurgerIngredientsCategory ingredientType={bun}/></li>
                <li id={sauce}><BurgerIngredientsCategory ingredientType={sauce}/></li>
                <li id={main}><BurgerIngredientsCategory ingredientType={main}/></li>
            </ul>
        </section>
    )
}

export default BurgerIngredients;