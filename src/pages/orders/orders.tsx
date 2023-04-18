import React, {FC, useEffect} from "react";
import OrderCard from "../../components/order-card/order-card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {TOrder} from "../../services/reducers/ws-reducer";
import styles from "./orders.module.css"
import {Link, useLocation} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";
import { v4 as uuidv4 } from 'uuid';

const Orders: FC = () => {

    const dispatch = useDispatch();
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

    const {orders} : {orders: TOrder[]} = useSelector((state: RootState) => state.orders)

    return (
        <ul className={styles.container}>
            {orders && orders.map(order =>
                <li key={uuidv4()}>
                    <Link to={`/profile/orders/${order._id}`} className={styles.link} state={{backgroundLocation: location}}>
                        <OrderCard order={order} isHistory={true}/>
                    </Link>
                </li>
                )}
        </ul>

    )
}

export default Orders;