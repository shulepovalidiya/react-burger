import {AppDispatch, AppThunk} from "../types";
import api from "../../utils/api";
import {
    getIngredientsAction,
    getIngredientsFailedAction,
    getIngredientsSuccessAction,
    getOrderNumberAction,
    getOrderNumberFailedAction,
    getOrderNumberSuccessAction
} from "../actions/ingredients";

export function getIngredients(): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(getIngredientsAction());
        api.getIngredientsArray()
            .then(res => {
                dispatch(getIngredientsSuccessAction(res.data))
            })
            .catch(() => dispatch(getIngredientsFailedAction()))
    }
}

export function getOrderNumber(ingredientsID: string[]): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(getOrderNumberAction())
        api.getOrderNumber(ingredientsID)
            .then(res => {
                dispatch(getOrderNumberSuccessAction(res.order.number))
            })
            .catch(() => dispatch(getOrderNumberFailedAction()))
    }
}