import React, {useState} from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import BurgerIngredientsElement from "../burger-ingredients-element/burger-ingredients-element";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes, {arrayOf, oneOf} from "prop-types";

function BurgerIngredientsCategory({ingredientType, data}) {

    function getCategoryName() {
        let categoryName = "";
        if (ingredientType === "bun") {
            categoryName = "Булки";
        } else if (ingredientType === "sauce") {
            categoryName = "Соусы";
        } else if (ingredientType === "main") {
            categoryName = "Начинки";
        }
        return categoryName;
    }

    function getIngredientsList() {
        return data.filter(item => item.type === ingredientType)
    }

    return (
        <>
            <h2 className="text text_type_main-medium mt-10">{getCategoryName()}</h2>
            <ul className={BurgerIngredientsStyles.productSection}>
                {
                    getIngredientsList().map(item => (<BurgerIngredientsElement
                            key={item._id}
                            img={item.image}
                            name={item.name}
                            price={item.price}
                        />)
                    )
                }
            </ul>
        </>
    )
}

BurgerIngredientsCategory.propTypes = {
    data: arrayOf(PropTypes.object).isRequired,
    ingredientType: oneOf(["bun", "sauce", "main"]).isRequired,
}

export default BurgerIngredientsCategory;