import {ingredientsReducer} from "./ingredients-reducer";

describe('ingredients reducer', () => {
    it('should return initial state', () => {
        expect(ingredientsReducer(undefined, {} as any))
            .toEqual({
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false,
                draggedIngredient: {},
                draggedIngredients: [],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, {type: "GET_INGREDIENTS_REQUEST"}))
            .toEqual({
                ingredients: [],
                ingredientsRequest: true,
                ingredientsFailed: false,
                draggedIngredient: {},
                draggedIngredients: [],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: "GET_INGREDIENTS_SUCCESS",
            ingredients: [{
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },]
        }))
            .toEqual({
                ingredients: [{
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                    "type":"bun",
                    "proteins":80,
                    "fat":24,
                    "carbohydrates":53,
                    "calories":420,
                    "price":1255,
                    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                    "__v":0
                },],
                ingredientsRequest: false,
                ingredientsFailed: false,
                draggedIngredient: {},
                draggedIngredients: [],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(undefined, {type: "GET_INGREDIENTS_FAILED"}))
            .toEqual({
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: true,
                draggedIngredient: {},
                draggedIngredients: [],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
    it('should handle BUN_DROP', () => {
        expect(ingredientsReducer(undefined, {
            type: "BUN_DROP",
            data: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            }
        })).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
            draggedIngredient: {},
            draggedIngredients: [],
            currentBun: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            orderNumber: null,
            orderNumberRequest: false,
            orderNumberRequestFailed: false,
            reorderedIngredients: [],
            registrationRequest: false,
            registrationRequestFailed: false,
            currentLogin: null,
            currentToken: null,
            currentName: null,
        })
    })
    it('should handle INGREDIENT_DROP', () => {
        expect(ingredientsReducer(undefined, {
            type: "INGREDIENT_DROP",
            data: {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            }
        }))
            .toEqual({
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false,
                draggedIngredient: {},
                draggedIngredients: [{
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                }],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
    it('should handle DELETE_INGREDIENT', () => {
        expect(ingredientsReducer({ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
            draggedIngredient: {},
            draggedIngredients: [{
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                },
                {
                    "_id":"60666c42cc7b410027a1a9b6",
                    "name":"Биокотлета из марсианской Магнолии",
                    "type":"main",
                    "proteins":420,
                    "fat":142,
                    "carbohydrates":242,
                    "calories":4242,
                    "price":424,
                    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
                    "__v":0
                }],
            currentBun: null,
            orderNumber: null,
            orderNumberRequest: false,
            orderNumberRequestFailed: false,
            reorderedIngredients: [],
            registrationRequest: false,
            registrationRequestFailed: false,
            currentLogin: null,
            currentToken: null,
            currentName: null,}, {
            type: "DELETE_INGREDIENT",
            index: 0,
        })).toEqual({ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
            draggedIngredient: {},
            draggedIngredients: [{
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
                {
                    "_id":"60666c42cc7b410027a1a9b6",
                    "name":"Биокотлета из марсианской Магнолии",
                    "type":"main",
                    "proteins":420,
                    "fat":142,
                    "carbohydrates":242,
                    "calories":4242,
                    "price":424,
                    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
                    "__v":0
                }],
            currentBun: null,
            orderNumber: null,
            orderNumberRequest: false,
            orderNumberRequestFailed: false,
            reorderedIngredients: [],
            registrationRequest: false,
            registrationRequestFailed: false,
            currentLogin: null,
            currentToken: null,
            currentName: null,})
    })
    it('should handle GET_ORDER_NUMBER_REQUEST', () => {
        expect(ingredientsReducer(undefined, {type: "GET_ORDER_NUMBER_REQUEST"}))
            .toEqual({
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false,
                draggedIngredient: {},
                draggedIngredients: [],
                currentBun: null,
                orderNumber: null,
                orderNumberRequest: true,
                orderNumberRequestFailed: false,
                reorderedIngredients: [],
                registrationRequest: false,
                registrationRequestFailed: false,
                currentLogin: null,
                currentToken: null,
                currentName: null,
            })
    })
})