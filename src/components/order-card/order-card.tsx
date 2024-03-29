import React, {FC} from "react";
import styles from "./order-card.module.css"
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../services/hooks";
import {TOrder, TOrderStatus} from "../../services/types/orders";
import {TIngredient} from "../../services/types/ingredients";

type TOrderCardProps = {
    order: TOrder;
    isHistory?: boolean;
}

const OrderCard: FC<TOrderCardProps> = ({order, isHistory}) => {

    const {ingredients}: { ingredients: TIngredient[] } = useAppSelector(state => state.ingredients)

    const getIngredientDataByID = (ingredientID: string) => ingredients && ingredients.find(ingredient => ingredient._id === ingredientID)

    const formatDate = (dateFromServer: string) => <FormattedDate date={new Date(dateFromServer)}/>

    const getTotalPrice = (ingredientsID: string[]) => {
        const pricesArr: number[] = [];
        ingredientsID.map(id => getIngredientDataByID(id) && pricesArr.push(getIngredientDataByID(id)!.price))
        return pricesArr.reduce((sum, current) => sum + current)
    }

    const translateStatus = (status: TOrderStatus) => {
        switch (status) {
            case "done":
                return "Выполнен"
            case "created":
                return "Создан"
            case "pending":
                return "Готовится"
        }
    }

    const isDone = (status: TOrderStatus) => status === "done"

    return (
        order && <section className={styles.card}>
            <div className={`${styles.header}`}>
                <span className={"text text_type_digits-default"}>#0{order.number}</span>
                <span className={"text text_type_main-default text_color_inactive"}>{formatDate(order.createdAt)}</span>
            </div>
            <h2 className={`text text_type_main-medium mt-6 ${styles.name}`}>{order.name}</h2>
            {isHistory &&
                <span className={`text text text_type_main-default mt-2 ${isDone(order.status) && "text_color_success"} ${styles.orderStatus}`}>
                    {translateStatus(order.status)}
                </span>
            }
            <div className={styles.container}>
                <ul className={`${styles.ul} mt-6`}>
                    {order && Array.from(new Set(order.ingredients)).map((ingredientID, index, array) => {
                        if (index < 6 && getIngredientDataByID(ingredientID)) {
                            return (<li key={index} className={styles.li}>
                                <IngredientIcon
                                    src={getIngredientDataByID(ingredientID)!.image_mobile}
                                    ingredientName={getIngredientDataByID(ingredientID)!.name}
                                />
                                {index === 5 && array.length > 6 &&
                                    <div className={styles.overflow}>+{array.length - 6}</div>}
                            </li>)
                        }
                    })}
                </ul>
                <div className={styles.priceContainer}>
                    <span className={"text text_type_digits-default"}>{getTotalPrice(order.ingredients)}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </section>
    )
}

export default OrderCard;