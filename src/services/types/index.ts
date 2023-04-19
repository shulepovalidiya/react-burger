import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {store} from "../../index";
import {AppActions} from "../middleware/socket-middleware";
import {AnyAction} from "redux";

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type RootState = ReturnType<typeof store.getState>;

export type DispatchFunc = () => AppDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


