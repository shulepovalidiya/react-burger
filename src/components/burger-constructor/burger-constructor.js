import React, {useContext, useState} from "react";
import constructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext} from "../app/App";

function BurgerConstructor() {

    const ingredientsArray = useContext(IngredientsContext).ingredientsArray;
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function getOrderNumber() {
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: getIngredientsID(),
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
                setIsLoading(true);
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
            .then(res => {
                if (res.success) {
                    setIsLoading(true);
                    setOrderNumber(res.order.number);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function getIngredientsID() {
        let ingredientsID = [];
        getOrderItems().forEach(item => ingredientsID.push(item._id))
        return ingredientsID;
    }

    function handleSubmitBtnClick() {
        getOrderNumber();
        !isLoading && setIsModalOpened(true);
    }

    function handleClose() {
        setIsModalOpened(false);
        setOrderNumber(null);
    }

    function getTotalPrice() {
        const bunsPrice = ingredientsArray[0].price * 2;
        let mainsAndSaucesPrice = 0;
        getOrderItems().forEach(item => {
            mainsAndSaucesPrice += item.price
        })
        return mainsAndSaucesPrice + bunsPrice;
    }

    function getOrderItems() {
       return ingredientsArray.filter(item => item.type !== "bun")
    }

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
                    getOrderItems().map((item) =>
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
                <span className="text text_type_digits-medium mr-2">{getTotalPrice()}</span>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" onClick={handleSubmitBtnClick}>Оформить заказ</Button>
            </div>
            {
                isModalOpened && (<Modal onClose={handleClose}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>)
            }
        </section>
    )
}


export default BurgerConstructor;