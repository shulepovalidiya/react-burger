import React, {FC, useEffect} from "react";
import OrderCard from "../../components/order-card/order-card";
import styles from "./orders.module.css"
import {Link, useLocation} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {TOrder} from "../../services/types/orders";

const Orders: FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {

        dispatch({
            type: WS_CONNECTION_START,
            payload: `?token=${localStorage.getItem("accessToken")}`
        })

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [dispatch])

    const {orders} : {orders: TOrder[]} = useAppSelector(state => state.orders)

    return (
        <ul className={styles.container}>
            {orders && orders.map(order =>
                order && <li key={order._id}>
                    <Link to={`/profile/orders/${order._id}`} className={styles.link} state={{backgroundLocation: location}}>
                        <OrderCard order={order} isHistory={true}/>
                    </Link>
                </li>
                )}
        </ul>

    )
}

export default Orders;