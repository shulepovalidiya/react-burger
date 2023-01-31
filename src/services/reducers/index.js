import {
    INGREDIENT_CLICK,

    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    CLOSE_INGREDIENTS_MODAL,

    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,

    INGREDIENT_DROP, BUN_DROP, DELETE_INGREDIENT, CLOSE_ORDER_MODAL, REORDER_INGREDIENTS, CUT_INGREDIENT
} from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    draggedIngredient: {},
    draggedIngredients: [],
    currentIngredient: null,
    currentBun: null,
    currentTab: "bun",
    orderData: [],
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberRequestFailed: false,
    reorderedIngredients: [],
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }
        case INGREDIENT_CLICK: {
            return {
                ...state,
                currentIngredient: action.data,
            }
        } case CLOSE_INGREDIENTS_MODAL: {
            return {
                ...state,
                currentIngredient: null,
            }
        }
        case BUN_DROP: {
            return {
                ...state,
                currentBun: action.data,
            }
        }
        case INGREDIENT_DROP: {
            return {
                ...state,
                draggedIngredients: [...state.draggedIngredients, action.data],

            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                draggedIngredients: state.draggedIngredients.filter((item, itemIndex) => itemIndex !== action.index),
            }
        }
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true,
            }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderNumberRequest: false,
            }
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderNumberRequest: false,
                orderNumberRequestFailed: true,
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderNumber: null,
                draggedIngredients: [],
                currentBun: null,
            }
        }
        case REORDER_INGREDIENTS: {
            return {
                ...state,
                draggedIngredients: [...state.reorderedIngredients.slice(0, action.to), state.draggedIngredient, ...state.reorderedIngredients.slice(action.to)]
            }
        }
        case CUT_INGREDIENT: {
            return {
                ...state,
                draggedIngredient: state.draggedIngredients[action.from],
                reorderedIngredients: state.draggedIngredients.filter((item, itemIndex) => itemIndex !== action.from)
            }
        }
        default: {
            return state;
        }
    }
}




