import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({data}) {

    function getTotalPrice() {
        let bunsPrice = data[0].price * 2;
        let mainsAndSaucesPrice = 0;
        getOrderItems().forEach(item => {
            mainsAndSaucesPrice += item.price
        })
        return mainsAndSaucesPrice + bunsPrice;
    }

    function getOrderItems() {
       return data.filter(item => item.type !== "bun")
    }

    return (
        <section className={`${constructorStyles.constructor} pt-25 pr-4 pl-4`}>
            <ConstructorElement
                text={`${data[0].name} (верх)`}
                thumbnail={data[0].image}
                price={data[0].price}
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
                text={`${data[0].name} (низ)`}
                thumbnail={data[0].image}
                price={data[0].price}
                extraClass="mb-10 mr-4 mt-4 ml-8"
                type="bottom"
                isLocked={true}
            />
            <div className={`${constructorStyles.orderSection} mt-10`}>
                <span className="text text_type_digits-medium mr-2">{getTotalPrice()}</span>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;