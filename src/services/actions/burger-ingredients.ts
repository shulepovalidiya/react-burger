import api from "../../utils/api";
import {Dispatch} from "redux";
import {TIngredient} from "../../components/app/App";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const INGREDIENT_CLICK: 'INGREDIENT_CLICK' = 'INGREDIENT_CLICK';
export const CLOSE_INGREDIENTS_MODAL: 'CLOSE_INGREDIENTS_MODAL' = 'CLOSE_INGREDIENTS_MODAL';

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const INGREDIENT_DROP: 'INGREDIENT_DROP' = 'INGREDIENT_DROP';
export const BUN_DROP: 'BUN_DROP' = 'BUN_DROP';

export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';

export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';

export const REORDER_INGREDIENTS: 'REORDER_INGREDIENTS' = 'REORDER_INGREDIENTS';
export const CUT_INGREDIENT: 'CUT_INGREDIENT' = 'CUT_INGREDIENT';

export type TGetIngredientsRequestAction = {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TGetIngredientsSuccessAction = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export type TGetIngredientsFailedAction = {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientClickAction = {
    readonly type: typeof INGREDIENT_CLICK;
    data: TIngredient;
}

export type TCloseIngredientModalAction = {
    readonly type: typeof CLOSE_INGREDIENTS_MODAL;
}

export type TGetOrderNumberRequestAction = {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export type TGetOrderNumberSuccessAction = {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly orderNumber: number;
}

export type TGetOrderNumberFailedAction = {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export type TIngredientDropAction = {
    readonly type: typeof INGREDIENT_DROP;
    data: TIngredient;
}

export type TBunDropAction = {
    readonly type: typeof BUN_DROP;
    data: TIngredient;
}

export type TDeleteIngredientAction = {
    readonly type: typeof DELETE_INGREDIENT;
    index: number;
}

export type TCloseOrderModalAction = {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export type TReorderIngredientsAction = {
    readonly type: typeof REORDER_INGREDIENTS;
    to: number;
}

export type TCutIngredientAction = {
    readonly type: typeof CUT_INGREDIENT;
    from: number;
}

export type TIngredientsActions =
    | TGetIngredientsRequestAction
    | TGetIngredientsSuccessAction
    | TGetIngredientsFailedAction
    | TIngredientClickAction
    | TCloseIngredientModalAction
    | TGetOrderNumberRequestAction
    | TGetOrderNumberSuccessAction
    | TGetOrderNumberFailedAction
    | TIngredientDropAction
    | TBunDropAction
    | TDeleteIngredientAction
    | TCloseOrderModalAction
    | TReorderIngredientsAction
    | TCutIngredientAction

export const getIngredientsAction = (): TGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (ingredients: TIngredient[]): TGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsFailedAction = (): TGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
})

export const getOrderNumberAction = (): TGetOrderNumberRequestAction => ({
    type: GET_ORDER_NUMBER_REQUEST
})

export const getOrderNumberSuccessAction = (orderNumber: number): TGetOrderNumberSuccessAction => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    orderNumber
})

export const getOrderNumberFailedAction = (): TGetOrderNumberFailedAction => ({
    type: GET_ORDER_NUMBER_FAILED
})

export function getIngredients() {
    return function (dispatch: Dispatch<TIngredientsActions>) {
        dispatch(getIngredientsAction());
        api.getIngredientsArray()
            .then(res => {
                dispatch(getIngredientsSuccessAction(res.data))
            })
            .catch(() => dispatch(getIngredientsFailedAction()))
    }
}

export function getOrderNumber(ingredientsID: string[]) {
    return function(dispatch: Dispatch<TIngredientsActions>) {
        dispatch(getOrderNumberAction())
        api.getOrderNumber(ingredientsID)
            .then(res => {
                dispatch(getOrderNumberSuccessAction(res.order.number))
            })
            .catch(() => dispatch(getOrderNumberFailedAction()))
    }
}


