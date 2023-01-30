import api from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INGREDIENT_CLICK = 'INGREDIENT_CLICK';
export const CLOSE_INGREDIENTS_MODAL = 'CLOSE_INGREDIENTS_MODAL'

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const INGREDIENT_DROP = 'INGREDIENT_DROP';
export const BUN_DROP = 'BUN_DROP';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';
export const CUT_INGREDIENT = 'CUT_INGREDIENT';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
             type: GET_INGREDIENTS_REQUEST,
        });
        api.getIngredientsArray()
            .then(res => {
                dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data,
                    })
            })
            .catch(e => dispatch({
                type: GET_INGREDIENTS_FAILED,
            }))
    }
}

export function getOrderNumber(ingredientsID) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        })
        api.getOrderNumber(ingredientsID)
            .then(res => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: res.order.number,
                })
            })
            .catch(e => dispatch({
                type: GET_ORDER_NUMBER_FAILED,
            }))
    }
}


