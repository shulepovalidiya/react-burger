import React from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import BurgerIngredientsElement from "../burger-ingredients-element/burger-ingredients-element";
import {oneOf} from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch} from "react-redux";
import {CLOSE_INGREDIENTS_MODAL} from "../../services/actions/burger-ingredients";

function BurgerIngredientsCategory({ingredientType}) {

    const dispatch = useDispatch();

    const {ingredients, currentIngredient} = useSelector(state => state.ingredients);

    const closeIngredientModal = () => {
        dispatch({type: CLOSE_INGREDIENTS_MODAL});
    }

    function getCategoryName() {
        let categoryName = "";
        switch(ingredientType) {
            case "bun":
                return categoryName = "Булки";
            case "sauce":
                return categoryName = "Соусы";
            case "main":
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
                    getIngredientsList().map(item =>
                        <BurgerIngredientsElement key={item._id} id={item._id}/>
                    )
                }
            </ul>
            {currentIngredient && (<Modal header="Детали ингредиента" onClose={closeIngredientModal}>
                <IngredientDetails/>
            </Modal>)}
        </>
    )
}

BurgerIngredientsCategory.propTypes = {
    ingredientType: oneOf(["bun", "sauce", "main"]).isRequired,
}

export default BurgerIngredientsCategory;