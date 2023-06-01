import React, {FC} from "react";

type TOrdersStatsProps = {
    heading: string;
    ordersCount: number;
}

const OrdersStats: FC<TOrdersStatsProps> = ({heading, ordersCount}) => {
    return (
        <div>
            <h3 className={"text text_type_main-medium"}>{heading}</h3>
            <span className="text text_type_digits-large">{ordersCount}</span>
        </div>
    )
}

export default OrdersStats;