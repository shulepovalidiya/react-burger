import React from "react";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from "./order-details.module.css"

function OrderDetails() {

    return (
        <div className={orderDetailsStyles.container}>
            <h2 className="text text_type_digits-large ml-25 mt-4 mr-25 mb-8">034536</h2>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary"/>
            <p className="text text_type_main-small mt-15 mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-small text_color_inactive mb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

export default OrderDetails;