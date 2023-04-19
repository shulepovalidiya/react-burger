import React, {FC} from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import BurgerIngredientsElement from "../burger-ingredients-element/burger-ingredients-element";
import {useLocation, Link} from "react-router-dom";
import {ingredientTypes} from "../../utils/constants";
import styles from "./burger-ingredients-category.module.css"
import {useAppSelector} from "../../services/hooks";
import {TIngredient, TIngredientType} from "../../services/types/ingredients";

type TBurgerIngredientsCategory = {
    ingredientType: TIngredientType;
}

const BurgerIngredientsCategory: FC<TBurgerIngredientsCategory> = ({ingredientType}) => {

    const location = useLocation();

    const {bun, sauce, main} = ingredientTypes;

    const {ingredients} : {ingredients: TIngredient[]} = useAppSelector(state => state.ingredients);

    function getCategoryName() {
        switch(ingredientType) {
            case bun:
                return "Булки";
            case sauce:
                return "Соусы";
            case main:
                return "Начинки";
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