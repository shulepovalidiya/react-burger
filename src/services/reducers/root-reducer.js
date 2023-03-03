import {combineReducers} from "redux";
import {ingredientsReducer} from "./index";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
        ingredients: ingredientsReducer,
        auth: authReducer,
    }
)