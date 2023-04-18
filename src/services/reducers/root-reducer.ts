import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients-reducer";
import {authReducer} from "./auth-reducer";
import {wsReducer} from "./ws-reducer";

export const rootReducer = combineReducers({
        ingredients: ingredientsReducer,
        auth: authReducer,
        orders: wsReducer,
    }
)