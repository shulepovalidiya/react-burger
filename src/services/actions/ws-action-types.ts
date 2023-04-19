import {TOrdersResponse} from "../types/data"

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START,
    payload: string,
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

export type TWsGetOrdersAction = {
    readonly type: typeof WS_GET_ORDERS,
    payload: TOrdersResponse,
}

export type TWSActions =
    | TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetOrdersAction

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_ORDERS,
};




