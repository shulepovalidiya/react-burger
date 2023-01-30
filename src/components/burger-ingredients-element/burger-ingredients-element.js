import React from "react";
import ElementStyles from "./burger-ingredients-element.module.css";
import PropTypes from "prop-types";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {INGREDIENT_CLICK, INGREDIENT_DROP} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";

function BurgerIngredientsElement({id}) {

    const dispatch = useDispatch();
    const ingredientData = useSelector(state => state.ingredients.ingredients.find(item => item._id === id))
    const {ingredients, draggedIngredients, currentBun} = useSelector(state => state.ingredients)

    const [{isDrag, didDrop}, dragRef, dragPreviewRef] = useDrag({
        type: "ingredient",
        item: {id},
        collect: monitor => ({
            isBunDrag: monitor.isDragging(),
            didBunDrop: monitor.didDrop(),
        })
    });


    const handleIngredientClick = () => {
        dispatch({
            type: INGREDIENT_CLICK,
            data: ingredientData,
        })
    };


    const getIngredientCount = (id) => {
        let count = 0;
        draggedIngredients.forEach(draggedIngredient => {
            if (draggedIngredient._id === id) {
                ++count
            }
        })
        return count;
    }

    const getBunsCount = (id) => {
        const count = currentBun && currentBun._id === id ? 2 : 0
        return count;
    }

    const getIngredientType = (id) => {
        const ingredientData = ingredients.find(ingredient => ingredient._id === id)
        return ingredientData.type;
    }

    const getCounterValue = (id) => {
        if (getIngredientType(id) === "bun") {
            return getBunsCount(id)
        } else {
            return getIngredientCount(id)
        }
    }

    return (
        <figure
            className={`${ElementStyles.card}`} onClick={handleIngredientClick}
            ref={dragRef}
            draggable
        >
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

BurgerIngredientsElement.propTypes = {
    id: PropTypes.string.isRequired,
}


export default BurgerIngredientsElement;