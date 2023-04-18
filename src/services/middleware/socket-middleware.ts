import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import {
    TWSActions, TWSStoreActions
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


export const socketMiddleware = (wsURL: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AnyAction) => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, onError, onOpen, onClose, onMessage} = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsURL}${payload}`);
            }

            if (type === onClose) {
                socket!.close();
            }

            if (socket) {

                if (type === onClose) {
                    socket!.close();
                }

                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData: TMessageResponse = JSON.parse(data);
                    console.log(socket!.url)
                    dispatch({
                            type: onMessage,
                            payload: parsedData,
                        })
                };

                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                }
            }

            next(action);
        };
    }) as Middleware;
};