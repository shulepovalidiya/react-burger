import api from "../../utils/api";
import {useDispatch} from "react-redux";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const AUTHORIZATION_REQUEST = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILED = 'UPDATE_USER_INFO_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const RECOVERY_CODE_REQUEST = 'RECOVERY_CODE_REQUEST';
export const RECOVERY_CODE_SUCCESS = 'RECOVERY_CODE_SUCCESS';
export const RECOVERY_CODE_FAILED = 'RECOVERY_CODE_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const AUTH_CHECKED = 'AUTH_CHECKED';

export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTRATION_REQUEST,
        });
        api.createUser(email, password, name)
            .then(res => {
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                })
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
            })
            .catch(() => dispatch({
                type: REGISTRATION_FAILED,
            }))
    }
}

export function authorize(email, password) {
    return function (dispatch) {
        dispatch({
            type: AUTHORIZATION_REQUEST,
        })
        api.authorize(email, password)
            .then(res => {
                dispatch({
                    type: AUTHORIZATION_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    accessToken: res.accessToken.split('Bearer ')[1],
                })
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
            })
            .catch(() => dispatch({
                type: AUTHORIZATION_FAILED,
            }))
    }
}

export function getUserInfo() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_INFO_REQUEST,
        })
        api.getUserInfo()
            .then((res) => dispatch({
                type: GET_USER_INFO_SUCCESS,
                name: res.user.name,
                email: res.user.email,
            }))
            .catch(() => dispatch({type: GET_USER_INFO_FAILED}))
    }
}

export function updateUserInfo(name, email, password) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST,
        })
        api.updateUserInfo(name, email, password)
            .then(res => dispatch({
                type: UPDATE_USER_INFO_SUCCESS,
                email: res.user.email,
                name: res.user.name,
            }))
            .catch(() => dispatch({
                type: UPDATE_USER_INFO_FAILED,
            }))
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        })
        api.logout()
            .then(res => dispatch({
                type: LOGOUT_SUCCESS,
            }))
            .catch(() => dispatch({
                type: LOGOUT_FAILED,
            }))
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
    }
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        api.resetPassword(password, token)
            .then(() => dispatch({
                type: RESET_PASSWORD_SUCCESS,
            }))
            .catch(() => dispatch({
                type: RESET_PASSWORD_FAILED,
            }))
    }
}

export function sendPasswordRecoveryCode(email) {
    return function (dispatch) {
        dispatch({
            type: RECOVERY_CODE_REQUEST,
        })
        api.sendPasswordRecoveryCode(email)
            .then(() => dispatch({
                type: RECOVERY_CODE_SUCCESS,
            }))
            .catch(() => dispatch({
                type: RECOVERY_CODE_FAILED,
            }))
    }
}

export function checkUserAuth() {
    return function (dispatch) {
        if (localStorage.getItem("accessToken")) {
            api.getUserInfo()
                .then((res) => dispatch({
                    type: GET_USER_INFO_SUCCESS,
                    name: res.user.name,
                    email: res.user.email,
                }))
                .finally(() => {dispatch({type: AUTH_CHECKED})})
        } else {
            dispatch({type: AUTH_CHECKED});
        }
    }
}


