import React from "react";
import ingredientCardStyles from "./ingredient-details.module.css"
import PropTypes from "prop-types";

function IngredientDetails({ingredient}) {

    return (
        <div className={`${ingredientCardStyles.container} mr-25 ml-25`}>
            <img src={ingredient.image_large} alt={ingredient.name} className="ml-5 mr-5 mb-4"/>
            <h3 className={`text text_type_main-medium mb-8 ${ingredientCardStyles.header}`}>
                {ingredient.name}
            </h3>
            <ul className={`${ingredientCardStyles.nutritionalValue} text text_type_main-default text_color_inactive mb-15`}>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Калории,ккал</div>
                    <div className="text text text_type_digits-default">{ingredient.calories}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Белки, г</div>
                    <div className="text text text_type_digits-default">{ingredient.proteins}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Жиры, г</div>
                    <div className="text text text_type_digits-default">{ingredient.fat}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Углеводы, г</div>
                    <div className="text text text_type_digits-default">{ingredient.carbohydrates}</div>
                </li>
            </ul>
        </div>
    )

}

IngredientDetails.propTypes = {
    ingredient: PropTypes.object.isRequired,
}

export default IngredientDetails;