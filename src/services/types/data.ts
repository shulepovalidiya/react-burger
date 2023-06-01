import {TOrder} from "./orders";

export type TOrdersResponse = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
}

