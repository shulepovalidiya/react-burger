import {authReducer, authState} from "./auth-reducer";

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {} as any)).toEqual(authState)
    })

    it('should handle REGISTRATION_REQUEST', () => {
        expect(authReducer(undefined, {type: "REGISTRATION_REQUEST"}))
            .toEqual({
                ...authState,
                registrationRequest: true,
            })
    })

    it('should handle REGISTRATION_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: "REGISTRATION_SUCCESS",
            email: "test",
            name: "test"
        })).toEqual({
            ...authState,
            loggedIn: true,
            authChecked: true,
            currentLogin: "test",
            currentName: "test",
            registrationRequest: false,
        })
    })

    it('should handle REGISTRATION_FAILED', () => {
        expect(authReducer(undefined, {type: "REGISTRATION_FAILED"}))
            .toEqual({
                ...authState,
                registrationFailed: true,
            })
    })

    it('should handle AUTHORIZATION_REQUEST', () => {
        expect(authReducer(undefined, {type: "AUTHORIZATION_REQUEST"}))
            .toEqual({
                ...authState,
                authorizationRequest: true,
            })
    })

    it('should handle AUTHORIZATION_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: "AUTHORIZATION_SUCCESS",
            email: "test",
            name: "test",
            accessToken: "test"
        })).toEqual({
            ...authState,
            loggedIn: true,
            authChecked: true,
            currentLogin: "test",
            currentName: "test",
            accessToken: "test",
            authorizationRequest: false,
        })
    })

    it('should handle AUTHORIZATION_FAILED', () => {
        expect(authReducer(undefined, {type: "AUTHORIZATION_FAILED"}))
            .toEqual({
                ...authState,
                authorizationFailed: true,
            })
    })
    it('should handle GET_USER_INFO_REQUEST', () => {
        expect(authReducer(undefined, {type: "GET_USER_INFO_REQUEST"}))
            .toEqual({
                ...authState,
                getUserInfoRequest: true,
            })
    })

    it('should handle GET_USER_INFO_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: "GET_USER_INFO_SUCCESS",
            name: "test",
            email: "test"
        })).toEqual({
            ...authState,
            currentName: "test",
            currentLogin: "test",
            getUserInfoRequest: false,
        })
    })

    it('should handle GET_USER_INFO_FAILED', () => {
        expect(authReducer(undefined, {type: "GET_USER_INFO_FAILED"}))
            .toEqual({
                ...authState,
                getUserInfoFailed: true,
            })
    })

    it('should have UPDATE_USER_INFO_REQUEST', () => {
        expect(authReducer(undefined, {type: "UPDATE_USER_INFO_REQUEST"}))
            .toEqual({
                ...authState,
                updateUserInfoRequest: true,
            })
    })

    it('should handle UPDATE_USER_INFO_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: "UPDATE_USER_INFO_SUCCESS",
            name: "test",
            email: "test"
        })).toEqual({
            ...authState,
            currentName: "test",
            currentLogin: "test",
            updateUserInfoRequest: false,
        })
    })

    it('should handle UPDATE_USER_INFO_FAILED', () => {
        expect(authReducer(undefined, {type: "UPDATE_USER_INFO_FAILED"}))
            .toEqual({
                ...authState,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true,
            })
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(authReducer(undefined, {type: "LOGOUT_REQUEST"}))
            .toEqual({
                ...authState,
                logoutRequest: true,
            })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(authReducer(undefined, {type: "LOGOUT_SUCCESS"}))
            .toEqual({
                ...authState,
                loggedIn: false,
                logoutRequest: false,
            })
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(authReducer(undefined, {type: "LOGOUT_FAILED"}))
            .toEqual({
                ...authState,
                logoutFailed: true,
            })
    })
    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(authReducer(undefined, {type: "RESET_PASSWORD_REQUEST"}))
            .toEqual({
                ...authState,
                resetPasswordRequest: true,
            })
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(authReducer(undefined, {type: "RESET_PASSWORD_SUCCESS"}))
            .toEqual({
                ...authState,
                resetPasswordRequest: false,
            })
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(authReducer(undefined, {type: "RESET_PASSWORD_FAILED"}))
            .toEqual({
                ...authState,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
            })
    })
    it('should handle RECOVERY_CODE_REQUEST', () => {
        expect(authReducer(undefined, {type: "RECOVERY_CODE_REQUEST"}))
            .toEqual({
                ...authState,
                recoveryCodeRequest: true,
            })
    })
    it('should handle RECOVERY_CODE_SUCCESS', () => {
        expect(authReducer(undefined, {type: "RECOVERY_CODE_SUCCESS"}))
            .toEqual({
                ...authState,
                recoveryCodeRequest: false,
                isResetPasswordAvailable: true,
            })
    })
    it('should handle RECOVERY_CODE_FAILED', () => {
        expect(authReducer(undefined, {type: "RECOVERY_CODE_FAILED"}))
            .toEqual({
                ...authState,
                recoveryCodeRequest: false,
                recoveryCodeFailed: true,
            })
    })
    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(authReducer(undefined, {type: "REFRESH_TOKEN_REQUEST"}))
            .toEqual({
                ...authState,
                refreshTokenRequest: true,
            })
    })

    it('should handle REFRESH_TOKEN_FAILED', () => {
        expect(authReducer(undefined, {type: "REFRESH_TOKEN_FAILED"}))
            .toEqual({
                ...authState,
                refreshTokenRequest: false,
                refreshTokenFailed: true,
            })
    })

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(authReducer(undefined, {type: "REFRESH_TOKEN_SUCCESS"}))
            .toEqual({
                ...authState,
                refreshTokenSuccess: true,
            })
    })
    it('should handle AUTH_CHECKED', () => {
        expect(authReducer(undefined, {type: "AUTH_CHECKED"}))
            .toEqual({
                ...authState,
                authChecked: true,
            })
    })
})