import type {Middleware, MiddlewareAPI} from 'redux';
import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_GET_OWN_ORDERS
} from "../actions/ws-action-types";
import type {ThunkDispatch} from 'redux-thunk';
import {TOrder} from "../reducers/ws-reducer";

import {store} from "../../index";
import {TIngredientsActions} from "../actions/burger-ingredients";
import {TAuthActions} from "../actions/auth";

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type RootState = ReturnType<typeof store.getState>;

export type TMessageResponse = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
}

export type AppActions =
    | TIngredientsActions
    | TAuthActions
    | TWSActions


export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActions) => {
            const {dispatch} = store;
            const {type} = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(action.wsURL);
            }

            if (socket) {

                if (type === WS_CONNECTION_CLOSED) {
                    socket!.close();
                }

                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData: TMessageResponse = JSON.parse(data);
                    socket!.url === 'wss://norma.nomoreparties.space/orders/all'
                        ? dispatch({
                            type: WS_GET_ORDERS,
                            payload: parsedData.orders,
                            success: parsedData.success,
                            total: parsedData.total,
                            totalToday: parsedData.totalToday
                        })
                        : dispatch({
                            type: WS_GET_OWN_ORDERS,
                            orders: parsedData.orders,
                            success: parsedData.success,
                        })
                };

                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event});
                }
            }

            next(action);
        };
    }) as Middleware;
};