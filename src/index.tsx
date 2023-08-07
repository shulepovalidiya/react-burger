import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./services/reducers/root-reducer";
import thunk from "redux-thunk";
import {HashRouter} from "react-router-dom";
import {socketMiddleware} from "./services/middleware/socket-middleware";
import {
    TWSStoreActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "./services/actions/ws-action-types";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers();

const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS,
};

const wsBaseUrl = "wss://norma.nomoreparties.space/orders";

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsBaseUrl, wsActions))));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>

);

// export type RootState = ReturnType<typeof store.getState>


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
