import React, {FC, useEffect} from "react";
import styles from "./feed.module.css"
import OrderCard from "../../components/order-card/order-card";
import OrdersMonitor from "../../components/orders-monitor/orders-monitor";
import OrdersStats from "../../components/orders-stats/orders-stats";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {TOrder} from "../../services/reducers/ws-reducer";
import {Link, useLocation} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";

export const Feed: FC = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const {
        orders,
        total,
        totalToday
    } : {
        orders: TOrder[],
        total: number,
        totalToday: number,
    } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            wsURL: `wss://norma.nomoreparties.space/orders/all`
        })
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])

    const getOrderNumbersByStatus = (status: "done" | "pending" | "created", ordersCount: number) => {
        const result: number[] = [];
        orders && orders
            .filter(order => order.status === status)
            .map(order => result.push(order.number))
        return result.slice(0, ordersCount);
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h1>
            <ul className={styles.ordersList}>
                {orders && orders.map((order) => {
                    if (order) {
                        return <Link to={`/feed/${order._id}`} className={styles.link} state={{backgroundLocation: location}}>
                            <li style={{listStyleType: "none", width: "100%",}}>
                                <OrderCard order={order}/>
                            </li>
                        </Link>
                    }
                })}
            </ul>
            <div className={styles.ordersStats}>
                <div className={styles.ordersBoard}>
                    <OrdersMonitor
                        status={"Готовы:"}
                        orders={getOrderNumbersByStatus("done", 10)}
                        isCompleted={true}/>
                    <OrdersMonitor
                        status={"В работе:"}
                        orders={getOrderNumbersByStatus("pending", 10)}/>
                </div>
                <OrdersStats heading={"Выполнено за все время:"} ordersCount={total}/>
                <OrdersStats heading={"Выполнено за сегодня:"} ordersCount={totalToday}/>
            </div>
        </section>

    )
}