import React, {FC} from "react";
import styles from "./order-number.module.css"

type TOrdersMonitorProps = {
    status: string;
    orderNumbers: number[];
    isCompleted?: boolean;
}

const OrdersMonitor: FC<TOrdersMonitorProps> = ({status, orderNumbers, isCompleted}) => {
    return (
        <div className={styles.container}>
            <h3 className={"text text_type_main-medium"}>{status}</h3>
            <ul className={styles.numbersList}>
                {orderNumbers.map(number =>
                    <li key={number} className={`text text_type_digits-default ${isCompleted && "text_color_success"}`}>
                        0{number}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default OrdersMonitor;