import type {Middleware, MiddlewareAPI} from 'redux';
import {
    TWSActions, TWSStoreActions
} from "../actions/ws-action-types";
import {TIngredientsActions} from "../actions/ingredients";
import {TAuthActions} from "../actions/auth";
import {AppDispatch, RootState} from "../types";
import {TOrdersResponse} from "../types/data";

export type AppActions =
    | TIngredientsActions
    | TAuthActions
    | TWSActions

export const socketMiddleware = (wsURL: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
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
                    const parsedData: TOrdersResponse = JSON.parse(data);
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