import {wsReducer} from "./ws-reducer";

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(
            {
                wsConnected: false,
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            })
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_SUCCESS"}))
            .toStrictEqual({
                wsConnected: true,
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
                error: undefined,
            })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_ERROR"}))
            .toEqual({
                wsConnected: false,
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(undefined, {type: "WS_CONNECTION_CLOSED"}))
            .toStrictEqual({
                wsConnected: false,
                error: undefined,
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            })
    })

    it('should handle WS_GET_ORDERS', () => {
        expect(wsReducer(undefined, {type: "WS_GET_ORDERS", payload: {
                success: true,
                orders: [],
                total: 0,
                totalToday: 0,
            }})).toStrictEqual(
            {
                wsConnected: true,
                error: undefined,
                success: true,
                orders: [],
                total: 0,
                totalToday: 0}
        )
    })
})