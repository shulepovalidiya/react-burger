import React, {FC, useEffect} from "react";
import OrderCard from "../../components/order-card/order-card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {TOrder} from "../../services/reducers/ws-reducer";
import styles from "./orders.module.css"
import {Link, useLocation} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";

const Orders: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {ownOrders} : {ownOrders: TOrder[]} = useSelector((state: RootState) => state.orders)

    useEffect(() => {

        dispatch({
            type: WS_CONNECTION_START,
            wsURL: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken")}`})

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])

    return (
        <ul className={styles.container}>
            {ownOrders && ownOrders.map(order =>
                <li>
                    <Link to={`/profile/orders/${order._id}`} className={styles.link} state={{backgroundLocation: location}}>
                        <OrderCard order={order} />
                    </Link>
                </li>
                )}
        </ul>

    )
}

export default Orders;