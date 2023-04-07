import React, {useState, FC} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import {Link} from "react-scroll";
import {ingredientTypes} from "../../utils/constants";
import {InView} from "react-intersection-observer";
import {TIngredientType} from "../app/App";

const BurgerIngredients: FC = () => {

    const {bun, sauce, main} = ingredientTypes;

    const [selectedCategory, setSelectedCategory] = useState<TIngredientType>(bun);

    const handleTabClick = (category: TIngredientType) => setSelectedCategory(category);

    return (
        <section className={`${BurgerIngredientsStyles.container} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <ul className={BurgerIngredientsStyles.tabPanel}>
                <li><Link to={bun} smooth={true} duration={500} containerId="categories">
                    <Tab active={selectedCategory === bun}
                         onClick={() => handleTabClick(bun)}
                         value={"Булки"}>Булки</Tab>
                </Link></li>
                <li><Link to={sauce} smooth={true} duration={500} containerId="categories">
                    <Tab active={selectedCategory === sauce}
                         onClick={() => handleTabClick(sauce)}
                         value={"Соусы"}>Соусы</Tab>
                </Link></li>
                <li><Link to={main} smooth={true} duration={500} containerId="categories">
                    <Tab active={selectedCategory === main}
                         onClick={() => handleTabClick(main)}
                         value={"Начинки"}>Начинки</Tab>
                </Link></li>
            </ul>

            <ul className={BurgerIngredientsStyles.ingredientsList} id="categories">
                <InView threshold={1} onChange={(inView) => {
                    inView && setSelectedCategory(bun)
                }}>
                    {({ref}) => (
                        <li id={bun} ref={ref}><BurgerIngredientsCategory ingredientType={bun}/></li>
                    )}
                </InView>
                <InView threshold={0.9} onChange={(inView) => {
                    inView && setSelectedCategory(sauce)
                }}>
                    {({ref}) => (
                        <li id={sauce} ref={ref}><BurgerIngredientsCategory ingredientType={sauce}/></li>
                    )}
                </InView>
                <InView threshold={0.5} onChange={(inView) => {
                    inView && setSelectedCategory(main)
                }}>
                    {({ref}) => (
                        <li id={main} ref={ref}><BurgerIngredientsCategory ingredientType={main}/></li>
                    )}
                </InView>
            </ul>
        </section>
    )
}

export default BurgerIngredients;