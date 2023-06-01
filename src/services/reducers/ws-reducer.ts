import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
} from "../actions/ws-action-types";

import {TOrder} from "../types/orders";

type TWSState = {
    wsConnected: boolean;
    orders: TOrder[];
    error?: Event;
    success: boolean;
    total: number;
    totalToday: number;
}

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                error: undefined,
                success: action.payload.success,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
};