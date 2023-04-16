import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_GET_OWN_ORDERS
} from "../actions/ws-action-types";

export type TOrder = {
    ingredients: string[];
    _id: string;
    name: string;
    status: "created" | "pending" | "done";
    number: number;
    createdAt: string;
    updatedAt: string;
}

type TWSState = {
    wsConnected: boolean;
    orders: TOrder[];
    error?: Event;
    success: boolean;
    total: number;
    totalToday: number;
    ownOrders: TOrder[],
}

const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    ownOrders: [],
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
                wsConnected: false
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                error: undefined,
                success: action.success,
                orders: action.payload,
                total: action.total,
                totalToday: action.totalToday,
            };

        case WS_GET_OWN_ORDERS:
            return {
                ...state,
                error: undefined,
                success: action.success,
                ownOrders: action.orders,
            }

        default:
            return state;
    }
};