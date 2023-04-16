import {TOrder} from "../reducers/ws-reducer";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_GET_OWN_ORDERS: 'WS_GET_OWN_ORDERS' = 'WS_GET_OWN_ORDERS';

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START,
    wsURL: string,
}

export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS,
}

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR,
}

export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED,
}

export type TWsGetOwnOrdersAction = {
    readonly type: typeof WS_GET_OWN_ORDERS,
    orders: TOrder[],
    success: boolean,
}

export type TWsGetOrdersAction = {
    readonly type: typeof WS_GET_ORDERS,
    payload: TOrder[],
    success: boolean,
    total: number,
    totalToday: number
}

export type TWSActions =
    | TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetOrdersAction
    | TWsGetOwnOrdersAction




