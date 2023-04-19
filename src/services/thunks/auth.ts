import {AppDispatch, AppThunk} from "../types";
import api from "../../utils/api";
import {
    authCheckedAction,
    authorizationFailedAction,
    authorizationRequestAction,
    authorizationSuccessAction,
    getUserInfoFailedAction,
    getUserInfoRequestAction,
    getUserInfoSuccessAction,
    logoutFailedAction,
    logoutRequestAction,
    logoutSuccessAction,
    recoveryCodeFailedAction,
    recoveryCodeRequestAction,
    recoveryCodeSuccessAction,
    registrationFailedAction,
    registrationRequestAction,
    registrationSuccessAction,
    resetPasswordFailedAction,
    resetPasswordRequestAction,
    resetPasswordSuccessAction,
    updateUserInfoFailedAction,
    updateUserInfoRequestAction,
    updateUserInfoSuccessAction
} from "../actions/auth";

export function register(email: string, password: string, name: string): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(registrationRequestAction());
        api.createUser(email, password, name)
            .then(res => {
                dispatch(registrationSuccessAction(res.user.email, res.user.name))
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
            })
            .catch(() => dispatch(registrationFailedAction()))
    }
}

export function authorize(email: string, password: string): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(authorizationRequestAction())
        api.authorize(email, password)
            .then(res => {
                dispatch(authorizationSuccessAction(res.user.email, res.user.name, res.accessToken.split('Bearer ')[1]))
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
            })
            .catch(() => dispatch(authorizationFailedAction()))
    }
}

export function getUserInfo(): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(getUserInfoRequestAction())
        api.getUserInfo()
            .then((res) => dispatch(getUserInfoSuccessAction(res.user.email, res.user.name)))
            .catch(() => dispatch(getUserInfoFailedAction()))
    }
}

export function updateUserInfo(name: string, email: string, password: string): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(updateUserInfoRequestAction())
        api.updateUserInfo(name, email, password)
            .then(res => dispatch(updateUserInfoSuccessAction(res.user.email, res.user.name)))
            .catch(() => dispatch(updateUserInfoFailedAction()))
    }
}

export function logout(): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(logoutRequestAction())
        api.logout()
            .then(() => dispatch(logoutSuccessAction()))
            .catch(() => dispatch(logoutFailedAction()))
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
    }
}

export function resetPassword(password: string, token: string): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(resetPasswordRequestAction())
        api.resetPassword(password, token)
            .then(() => dispatch(resetPasswordSuccessAction()))
            .catch(() => dispatch(resetPasswordFailedAction()))
    }
}

export function sendPasswordRecoveryCode(email: string): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch(recoveryCodeRequestAction())
        api.sendPasswordRecoveryCode(email)
            .then(() => dispatch(recoveryCodeSuccessAction()))
            .catch(() => dispatch(recoveryCodeFailedAction()))
    }
}

export function checkUserAuth(): AppThunk {
    return function (dispatch: AppDispatch) {
        if (localStorage.getItem("accessToken")) {
            api.getUserInfo()
                .then((res) => dispatch(getUserInfoSuccessAction(res.user.email, res.user.name)))
                .finally(() => {
                    dispatch(authCheckedAction())
                })
        } else {
            dispatch(authCheckedAction());
        }
    }
}