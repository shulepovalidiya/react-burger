import React, {FC} from "react";
import styles from "./order-number.module.css"
import { v4 as uuidv4 } from 'uuid';

type TOrdersMonitorProps = {
    status: string;
    orders: number[];
    isCompleted?: boolean;
}

const OrdersMonitor: FC<TOrdersMonitorProps> = ({status, orders, isCompleted}) => {
    return (
        <div className={styles.container}>
            <h3 className={"text text_type_main-medium"}>{status}</h3>
            <ul className={styles.numbersList}>
                {orders.map(order => {
                    return <li key={uuidv4()} className={`text text_type_digits-default ${isCompleted && "text_color_success"}`}>
                        0{order}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default OrdersMonitor;