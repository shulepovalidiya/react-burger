import React, {FC} from "react";
import orderDetailsStyles from "./order-details.module.css"
import SuccessIcon from "../success-icon/success-icon";

type TOrderDetailsProps = {
    orderNumber: number;
}

const OrderDetails: FC<TOrderDetailsProps> = ({orderNumber}) => {

    return (
        <div className={orderDetailsStyles.container}>
            <h2 className="text text_type_digits-large ml-25 mt-4 mr-25 mb-8">{orderNumber}</h2>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <SuccessIcon />
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