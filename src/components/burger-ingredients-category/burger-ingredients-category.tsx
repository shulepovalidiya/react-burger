import React, {FC} from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import BurgerIngredientsElement from "../burger-ingredients-element/burger-ingredients-element";
import { useSelector, } from "react-redux";
import {useLocation, Link} from "react-router-dom";
import {ingredientTypes} from "../../utils/constants";
import styles from "./burger-ingredients-category.module.css"
import {TIngredientType, TIngredient} from "../app/App";
import {RootState} from "../../index";

type TBurgerIngredientsCategory = {
    ingredientType: TIngredientType;
}

const BurgerIngredientsCategory: FC<TBurgerIngredientsCategory> = ({ingredientType}) => {

    const location = useLocation();

    const {bun, sauce, main} = ingredientTypes;

    const {ingredients} : {ingredients: TIngredient[]} = useSelector((state: RootState) => state.ingredients);

    function getCategoryName() {
        let categoryName = "";
        switch(ingredientType) {
            case bun:
                return categoryName = "Булки";
            case sauce:
                return categoryName = "Соусы";
            case main:
                return categoryName = "Начинки";
        }
    }

    function getIngredientsList() {
        return ingredients.filter(item => item.type === ingredientType)
    }

    return (
        <>
            <h2 className="text text_type_main-medium mt-10">{getCategoryName()}</h2>
            <ul className={BurgerIngredientsStyles.productSection}>
                {
                    getIngredientsList().map(ingredient =>
                        <li key={ingredient._id} className={styles.listElement}>
                            <Link className={styles.link} to={`/ingredients/${ingredient._id}`} state={{backgroundLocation: location}}>
                                <BurgerIngredientsElement id={ingredient._id}/>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default BurgerIngredientsCategory;