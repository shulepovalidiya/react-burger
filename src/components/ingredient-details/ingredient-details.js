import React from "react";
import ingredientCardStyles from "./ingredient-details.module.css"
import {useSelector} from "react-redux";

function IngredientDetails() {

    const currenIngredient = useSelector(state => state.ingredients.currentIngredient)

    return (
        <div className={`${ingredientCardStyles.container} mr-25 ml-25`}>
            <img src={currenIngredient.image_large} alt={currenIngredient.name} className="ml-5 mr-5 mb-4"/>
            <h3 className={`text text_type_main-medium mb-8 ${ingredientCardStyles.header}`}>
                {currenIngredient.name}
            </h3>
            <ul className={`${ingredientCardStyles.nutritionalValue} text text_type_main-default text_color_inactive mb-15`}>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Калории,ккал</div>
                    <div className="text text text_type_digits-default">{currenIngredient.calories}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Белки, г</div>
                    <div className="text text text_type_digits-default">{currenIngredient.proteins}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Жиры, г</div>
                    <div className="text text text_type_digits-default">{currenIngredient.fat}</div>
                </li>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Углеводы, г</div>
                    <div className="text text text_type_digits-default">{currenIngredient.carbohydrates}</div>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;