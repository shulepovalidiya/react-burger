import React, {FC, useEffect} from "react";
import {TIngredient} from "../app/App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import styles from "./order-info.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../services/reducers/ws-reducer";
import {useParams} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";
import {TOrderStatus} from "../order-card/order-card";

type TOrderProps = {
    isModal?: boolean;
    isOwn?: boolean;
}

const OrderInfo: FC<TOrderProps> = ({isModal, isOwn}) => {

    const {ingredients}: { ingredients: TIngredient[] } = useSelector((state: RootState) => state.ingredients)
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        !isOwn
            ? dispatch({
                type: WS_CONNECTION_START,
                payload: `/all`
            })
            : dispatch({
                type: WS_CONNECTION_START,
                payload: `?token=${localStorage.getItem("accessToken")}`})

        return () => {dispatch({type: WS_CONNECTION_CLOSED})}
    }, [dispatch])

    const {orders}: { orders: TOrder[]} = useSelector((state: RootState) => state.orders)

    const getIngredientDataByID = (ingredientID: string) => ingredients.find(ingredient => ingredient._id === ingredientID)

    const order: TOrder = orders && orders.find(order => order._id === id)!

    const getIngredientsCount = (id: string) => order.ingredients.filter((ingredient: string) => ingredient === id).length

    const getTotalPrice = (ingredientsID: string[]) => {
        const pricesArr: number[] = [];
        ingredientsID.map(id => pricesArr.push(getIngredientDataByID(id)!.price))
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
        order &&
        <section className={`${styles.container}`}>
            {!isModal && <span className={"text text_type_digits-default mt-30"}>#0{order.number}</span>}
            <h1 className={`text text_type_main-medium mt-10 mb-3 ${styles.header}`}>{order.name}</h1>
            <span
                className={`text text_type_main-default mb-15 ${styles.header} ${isDone(order.status) && "text_color_success"}`}>{translateStatus(order.status)}</span>
            <h2 className={`text text_type_main-medium mb-6 ${styles.header}`}>Состав:</h2>
            <ul className={styles.ingredientsList}>
                {Array.from(new Set(order.ingredients)).map((ingredient, index) => {
                    return <li key={index} className={styles.ingredientsListElement}>
                        <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
                            <IngredientIcon src={getIngredientDataByID(ingredient)!.image_mobile}
                                            ingredientName={getIngredientDataByID(ingredient)!.name}/>
                            <p className={`text text_type_main-default ${styles.ingredientName}`}>{getIngredientDataByID(ingredient)!.name}</p>
                        </div>
                        <div className={styles.priceContainer}>
                            <span
                                className={"text text_type_digits-default"}>{getIngredientsCount(ingredient)} x {getIngredientDataByID(ingredient)!.price}</span>
                            <CurrencyIcon type={"primary"}/>
                        </div>
                    </li>
                })}
            </ul>
            <div className={`mt-10 mb-10 ${styles.footer}`}>
                <span className={"text text_type_main-default text_color_inactive"}>
                    {<FormattedDate date={new Date(order.createdAt)}/>}
                </span>
                <div className={styles.priceContainer}>
                    <span className={"text text_type_digits-default"}>{getTotalPrice(order.ingredients)}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </section>
    )
}

export default OrderInfo;