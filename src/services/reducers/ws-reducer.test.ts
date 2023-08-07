import {wsReducer, initialState} from "./ws-reducer";

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState)
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_SUCCESS"}))
            .toStrictEqual({
                ...initialState,
                error: undefined,
                wsConnected: true
            })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_ERROR"}))
            .toEqual({
                ...initialState,
                wsConnected: false
            })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_CLOSED"}))
            .toStrictEqual({
                ...initialState,
                error: undefined,
                wsConnected: false,
            })
    })

    it('should handle WS_GET_ORDERS', () => {
        expect(wsReducer(undefined, {type: "WS_GET_ORDERS", payload: {
                success: true,
                orders: [],
                total: 34543345,
                totalToday: 56445,
            }})).toStrictEqual(
            {
                ...initialState,
                wsConnected: true,
                error: undefined,
                success: true,
                orders: [],
                total: 34543345,
                totalToday: 56445,
                }
        )
    })
})