import React from "react";
import ElementStyles from "./burger-ingredients-element.module.css";
import PropTypes from "prop-types";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredientsElement({img, price, name}) {
    return (
        <figure className={`${ElementStyles.card}`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={img} className="mt-0 mr-4 ml-4 mb-1" alt={name}/>
            <figcaption className="text text_type_main-default">
                <div className={`${ElementStyles.price} mb-1`}>
                    <span>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={ElementStyles.name}>{name}</p>
            </figcaption>
        </figure>
    )
}

BurgerIngredientsElement.propTypes = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default BurgerIngredientsElement;