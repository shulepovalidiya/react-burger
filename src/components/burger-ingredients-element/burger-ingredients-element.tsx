import React, {FC} from "react";
import ElementStyles from "./burger-ingredients-element.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {INGREDIENT_CLICK} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {RootState} from "../../index";
import {TIngredient} from "../app/App";
import {ingredientTypes} from "../../utils/constants";

type TBurgerIngredientsElementProps = {
    id: string;
}

const BurgerIngredientsElement: FC<TBurgerIngredientsElementProps> = ({id}) => {

    const dispatch = useDispatch();
    const {ingredients, draggedIngredients, currentBun} : {
        ingredients: TIngredient[];
        draggedIngredients: TIngredient[];
        currentBun: TIngredient;
    }
        = useSelector((state: RootState) => state.ingredients)
    const ingredientData: TIngredient = ingredients.find(item => item._id === id)!

    const {bun} = ingredientTypes;

    const [, dragRef, dragPreviewRef] = useDrag({
        type: "ingredient",
        item: {id},
    });

    const handleIngredientClick = () => {
        dispatch({
            type: INGREDIENT_CLICK,
            data: ingredientData,
        })
    };

    const getIngredientCount = (id: string) => {
        let count = 0;
        draggedIngredients.forEach(draggedIngredient => {
            if (draggedIngredient._id === id) {
                ++count
            }
        })
        return count;
    }

    const getBunsCount = (id: string) => {
        return currentBun && currentBun._id === id ? 2 : 0;
    }

    const getIngredientType = (id: string) => {
        const ingredientData: TIngredient = ingredients.find(ingredient => ingredient._id === id)!
        return ingredientData.type;
    }

    const getCounterValue = (id: string) => {
        if (getIngredientType(id) === bun) {
            return getBunsCount(id)
        } else {
            return getIngredientCount(id)
        }
    }

    return (
            <figure
                className={`${ElementStyles.card}`} onClick={handleIngredientClick}
                ref={dragRef}
                draggable>
                {(getCounterValue(id) !== 0) &&
                    <Counter
                        count={getCounterValue(ingredientData._id)}
                        size="default"
                        extraClass="m-1"/>}
                <img src={ingredientData.image} className="mt-0 mr-4 ml-4 mb-1" alt={ingredientData.name}
                     ref={dragPreviewRef}/>
                <figcaption className="text text_type_main-default">
                    <div className={`${ElementStyles.price} mb-1`}>
                        <span>{ingredientData.price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={ElementStyles.name}>{ingredientData.name}</p>
                </figcaption>
            </figure>
    )
}

export default BurgerIngredientsElement;