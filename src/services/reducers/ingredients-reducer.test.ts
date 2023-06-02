import {ingredientsReducer, ingredientsState} from "./ingredients-reducer";
import {mockBun, mockIngredient, mockIngredientsArray} from "../../utils/mock-data";
import exp from "constants";

describe('ingredients reducer', () => {

    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(ingredientsState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, {type: "GET_INGREDIENTS_REQUEST"})).toEqual(
            {
                ...ingredientsState,
                ingredientsRequest: true,
            }
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: "GET_INGREDIENTS_SUCCESS",
            ingredients: mockIngredientsArray
        })).toEqual(
            {
                ...ingredientsState,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: mockIngredientsArray
            }
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(undefined, {type: "GET_INGREDIENTS_FAILED"}))
            .toEqual({
                ...ingredientsState,
                ingredientsRequest: false,
                ingredientsFailed: true,
            })
    })

    it('should handle BUN_DROP', () => {
        expect(ingredientsReducer(undefined, {
            type: "BUN_DROP",
            data: mockBun,
        })).toEqual({
                ...ingredientsState,
                currentBun: mockBun
            })
    })

    it('should handle INGREDIENT_DROP', () => {
        expect(ingredientsReducer(undefined, {
            type: "INGREDIENT_DROP",
            data: mockIngredient,
        })).toEqual({
            ...ingredientsState,
            draggedIngredients: [...ingredientsState.draggedIngredients, mockIngredient]
        })
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(ingredientsReducer(undefined, {
            type: "DELETE_INGREDIENT",
            index: 0,
        })).toEqual({
            ...ingredientsState,
            draggedIngredients: ingredientsState.draggedIngredients.filter((item, index) => index != 0)
        })
    })

    it('should handle GET_ORDER_NUMBER_REQUEST', () => {
        expect(ingredientsReducer(undefined, {type: "GET_ORDER_NUMBER_REQUEST"}))
            .toEqual({
                ...ingredientsState,
                orderNumberRequest: true,
            })
    })

    it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: "GET_ORDER_NUMBER_SUCCESS",
            orderNumber: 73382828,
        })).toEqual({
            ...ingredientsState,
            orderNumber: 73382828,
            orderNumberRequest: false,
        })
    })

    it('should handle GET_ORDER_NUMBER_FAILED', () => {
        expect(ingredientsReducer(undefined, {type: "GET_ORDER_NUMBER_FAILED"}))
            .toEqual({
                ...ingredientsState,
                orderNumberRequest: false,
                orderNumberRequestFailed: true,
            })
    })

    it('should handle CLOSE_ORDER_MODAL', () => {
        expect(ingredientsReducer(undefined, {type: "CLOSE_ORDER_MODAL"}))
            .toEqual({
                ...ingredientsState,
                orderNumber: null,
                draggedIngredients: [],
                currentBun: null,
            })
    })

    it('should handle REORDER_INGREDIENTS', () => {
        expect(ingredientsReducer(undefined, {
            type: "REORDER_INGREDIENTS",
            to: 5,
        })).toEqual({
            ...ingredientsState,
            draggedIngredients: [...ingredientsState.reorderedIngredients.slice(0, 5), ingredientsState.draggedIngredient, ...ingredientsState.reorderedIngredients.slice(5)]
        })
    })

    it('should handle CUT_INGREDIENT', () => {
        expect(ingredientsReducer(undefined, {
            type: "CUT_INGREDIENT",
            from: 3,
        })).toEqual({
            ...ingredientsState,
            draggedIngredient: ingredientsState.draggedIngredients[3],
            reorderedIngredients: ingredientsState.draggedIngredients.filter((item, itemIndex) => itemIndex !== 3)
        })
    })
})