import {

    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,

    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAILED,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,

    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    RECOVERY_CODE_REQUEST,
    RECOVERY_CODE_SUCCESS,
    RECOVERY_CODE_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, AUTH_CHECKED

} from "../actions/auth";

const initialState = {
    authChecked: false,
    loggedIn: !!localStorage.getItem("accessToken"),
    isResetPasswordAvailable: false,
    registrationRequest: false,
    registrationFailed: false,
    currentLogin: "",
    currentName: "",
    authorizationRequest: false,
    authorizationFailed: false,
    accessToken: null,
    getUserInfoRequest: false,
    getUserInfoFailed: false,
    updateUserInfoRequest: false,
    updateUserInfoFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    recoveryCodeRequest: false,
    recoveryCodeFailed: false,
    refreshTokenRequest: false,
    refreshTokenFailed: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
            }
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                authChecked: true,
                currentLogin: action.email,
                currentName: action.name,
                registrationRequest: false,
            }

        }
        case REGISTRATION_FAILED: {
            return {
                ...state,
                registrationFailed: true,
            }
        }
        case AUTHORIZATION_REQUEST: {
            return {
                ...state,
                authorizationRequest: true,
            }
        }
        case AUTHORIZATION_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                authChecked: true,
                currentLogin: action.email,
                currentName: action.name,
                accessToken: action.accessToken,
                authorizationRequest: false,
            }
        }
        case AUTHORIZATION_FAILED: {
            return {
                ...state,
                authorizationFailed: true,
            }
        }
        case GET_USER_INFO_REQUEST: {
            return {
                ...state,
                getUserInfoRequest: true,
            }
        }
        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                currentName: action.name,
                currentLogin: action.email,
                getUserInfoRequest: false,
            }
        }
        case GET_USER_INFO_FAILED: {
            return {
                ...state,
                getUserInfoFailed: true,
            }
        }
        case UPDATE_USER_INFO_REQUEST: {
            return {
                ...state,
                updateUserInfoRequest: true,
            }
        }
        case UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state,
                currentName: action.name,
                currentLogin: action.email,
                updateUserInfoRequest: false,
            }
        }
        case UPDATE_USER_INFO_FAILED: {
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loggedIn: false,
                logoutRequest: false,
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutFailed: true,
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
            }
        }
        case RECOVERY_CODE_REQUEST: {
            return {
                ...state,
                recoveryCodeRequest: true,
            }
        }
        case RECOVERY_CODE_SUCCESS: {
            return {
                ...state,
                recoveryCodeRequest: false,
                isResetPasswordAvailable: true,
            }
        }
        case RECOVERY_CODE_FAILED: {
            return {
                ...state,
                recoveryCodeRequest: false,
                recoveryCodeFailed: true,
            }
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: true,
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true,
            }
        }
        case AUTH_CHECKED: {
            return {
                ...state,
                authChecked: true,
            }
        }
        default: {
            return state;
        }
    }
}