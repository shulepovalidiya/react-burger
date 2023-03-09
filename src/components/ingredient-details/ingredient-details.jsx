import React from "react";
import ingredientCardStyles from "./ingredient-details.module.css"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function IngredientDetails({isModal}) {

    const {id} = useParams();

    const ingredient = useSelector(state => state.ingredients.ingredients.find(item => item._id === id))

    return (
        ingredient &&
        <div className={`${ingredientCardStyles.container} ${isModal ? "mr-25 ml-25" : "mt-30"}`}>
            {!isModal && <h1 className={"text text_type_main-large"}>Детали ингредиента</h1>}
            <img src={ingredient.image_large} alt={ingredient.name} className="ml-5 mr-5 mb-4"/>
            <h2 className={`text text_type_main-medium mb-8 ${ingredientCardStyles.header}`}>
                {ingredient.name}
            </h2>
            <ul className={`${ingredientCardStyles.nutritionalValue} text text_type_main-default text_color_inactive mb-15`}>
                <li className={ingredientCardStyles.nutritionalValueItem}>
                    <div>Калории, ккал</div>
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

export default IngredientDetails;