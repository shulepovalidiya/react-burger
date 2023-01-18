import React, {useContext, useEffect, useState} from "react";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import BurgerIngredientsElement from "../burger-ingredients-element/burger-ingredients-element";
import PropTypes, {arrayOf, oneOf} from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientsContext} from "../app/App";

function BurgerIngredientsCategory({ingredientType}) {

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState({});

    const ingredientsArray = useContext(IngredientsContext).ingredientsArray;

    const handleModalClose = () => setIsModalOpened(false);

    const handleIngredientClick = (ingredient) => {
        setIsModalOpened(true);
        setSelectedIngredient(ingredient);
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
        return ingredientsArray.filter(item => item.type === ingredientType)
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
                            onClick={() => {handleIngredientClick(item)}}
                        />)
                    )
                }
            </ul>
            {isModalOpened && (<Modal header="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails ingredient={selectedIngredient}/>
            </Modal>)}
        </>
    )
}

BurgerIngredientsCategory.propTypes = {
    ingredientType: oneOf(["bun", "sauce", "main"]).isRequired,
}

export default BurgerIngredientsCategory;