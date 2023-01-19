import React, {useContext, useMemo, useState} from "react";
import constructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext} from "../app/App";
import api from "../../utils/api";
import {ingredientTypes} from "../../utils/constants";

function BurgerConstructor() {

    const {bun, sauce, main} = ingredientTypes;

    const ingredientsArray = useContext(IngredientsContext);
    const [orderNumber, setOrderNumber] = useState(null);

    const getOrderItems = () => ingredientsArray.filter(item => item.type !== bun)

    const memoizedFilteredIngredients = useMemo(getOrderItems, [ingredientsArray])

    const getIngredientsID = () => {
        let ingredientsID = [];
        memoizedFilteredIngredients.forEach(item => ingredientsID.push(item._id))
        return ingredientsID;
    }

    const getOrderNumber = () => {
        api.getOrderNumber(getIngredientsID())
            .then(res => {
                if (res.success) {
                    setOrderNumber(res.order.number)
                }})
            .catch(err => console.log(err))
    }

    const handleSubmitBtnClick = () => getOrderNumber();

    const handleClose = () => setOrderNumber(null);

    const getTotalPrice = () => {
        const bunsPrice = ingredientsArray[0].price * 2;
        let mainsAndSaucesPrice = 0;
        memoizedFilteredIngredients.forEach(item => mainsAndSaucesPrice += item.price)
        return mainsAndSaucesPrice + bunsPrice;
    }

    const memoizedTotal = useMemo(getTotalPrice, [ingredientsArray])


    return (
        <section className={`${constructorStyles.constructor} pt-25 pr-4 pl-4`}>
            <ConstructorElement
                text={`${ingredientsArray[0].name} (верх)`}
                thumbnail={ingredientsArray[0].image}
                price={ingredientsArray[0].price}
                extraClass="mr-4 mb-4 ml-8"
                type="top"
                isLocked={true}
            />
            <ul className={constructorStyles.constructorList}>
                {
                    memoizedFilteredIngredients.map((item) =>
                        (
                            <li key={item._id} className={constructorStyles.constructorItem}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={item.name}
                                    thumbnail={item.image}
                                    price={item.price}
                                    extraClass={`mr-4`}
                                />
                            </li>
                            )
                    )
                }
            </ul>
            <ConstructorElement
                text={`${ingredientsArray[0].name} (низ)`}
                thumbnail={ingredientsArray[0].image}
                price={ingredientsArray[0].price}
                extraClass="mb-10 mr-4 mt-4 ml-8"
                type="bottom"
                isLocked={true}
            />
            <div className={`${constructorStyles.orderSection} mt-10`}>
                <span className="text text_type_digits-medium mr-2">{memoizedTotal}</span>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" onClick={handleSubmitBtnClick}>Оформить заказ</Button>
            </div>
            {
                orderNumber && (
                    <Modal onClose={handleClose}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>
                )
            }
        </section>
    )
}


export default BurgerConstructor;