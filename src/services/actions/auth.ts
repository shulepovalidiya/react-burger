export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';

export const AUTHORIZATION_REQUEST: 'AUTHORIZATION_REQUEST' = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS: 'AUTHORIZATION_SUCCESS' = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED' = 'AUTHORIZATION_FAILED';

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';

export const UPDATE_USER_INFO_REQUEST: 'UPDATE_USER_INFO_REQUEST' = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS' = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILED: 'UPDATE_USER_INFO_FAILED' = 'UPDATE_USER_INFO_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const RECOVERY_CODE_REQUEST: 'RECOVERY_CODE_REQUEST' = 'RECOVERY_CODE_REQUEST';
export const RECOVERY_CODE_SUCCESS: 'RECOVERY_CODE_SUCCESS' = 'RECOVERY_CODE_SUCCESS';
export const RECOVERY_CODE_FAILED: 'RECOVERY_CODE_FAILED' = 'RECOVERY_CODE_FAILED';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export type TRegistrationRequestAction = {
    readonly type: typeof REGISTRATION_REQUEST,
}

export type TRegistrationSuccessAction = {
    readonly type: typeof REGISTRATION_SUCCESS,
    email: string,
    name: string,
}

export type TRegistrationFailedAction = {
    readonly type: typeof REGISTRATION_FAILED
}

export type TAuthorizationRequestAction = {
    readonly type: typeof AUTHORIZATION_REQUEST
}

export type TAuthorizationSuccessAction = {
    readonly type: typeof AUTHORIZATION_SUCCESS,
    email: string,
    name: string,
    accessToken: string,
}

export type TAuthorizationFailedAction = {
    readonly type: typeof AUTHORIZATION_FAILED
}

export type TGetUserInfoRequestAction = {
    readonly type: typeof GET_USER_INFO_REQUEST
}

export type TGetUserInfoSuccessAction = {
    readonly type: typeof GET_USER_INFO_SUCCESS,
    name: string,
    email: string,
}

export type TGetUserInfoFailedAction = {
    readonly type: typeof GET_USER_INFO_FAILED
}

export type TUpdateUserInfoRequestAction = {
    readonly type: typeof UPDATE_USER_INFO_REQUEST
}

export type TUpdateUserInfoSuccessAction = {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS,
    email: string,
    name: string,
}

export type TUpdateUserInfoFailedAction = {
    readonly type: typeof UPDATE_USER_INFO_FAILED
}

export type TLogoutRequestAction = {
    readonly type: typeof LOGOUT_REQUEST
}

export type TLogoutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS,
}

export type TLogoutFailedAction = {
    readonly type: typeof LOGOUT_FAILED
}

export type TResetPasswordRequestAction = {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

export type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export type TResetPasswordFailedAction = {
    readonly type: typeof RESET_PASSWORD_FAILED
}

export type TRecoveryCodeRequestAction = {
    readonly type: typeof RECOVERY_CODE_REQUEST
}

export type TRecoveryCodeSuccessAction = {
    readonly type: typeof RECOVERY_CODE_SUCCESS
}

export type TRecoveryCodeFailedAction = {
    readonly type: typeof RECOVERY_CODE_FAILED
}

export type TRefreshTokenRequestAction = {
    readonly type: typeof REFRESH_TOKEN_REQUEST
}

export type TRefreshTokenSuccessAction = {
    readonly type: typeof REFRESH_TOKEN_SUCCESS
}

export type TRefreshTokenFailedAction = {
    readonly type: typeof REFRESH_TOKEN_FAILED
}

export type TAuthCheckedAction = {
    readonly type: typeof AUTH_CHECKED
}

export type TAuthActions =
    | TRegistrationRequestAction
    | TRegistrationSuccessAction
    | TRegistrationFailedAction
    | TAuthorizationRequestAction
    | TAuthorizationSuccessAction
    | TAuthorizationFailedAction
    | TGetUserInfoRequestAction
    | TGetUserInfoSuccessAction
    | TGetUserInfoFailedAction
    | TUpdateUserInfoRequestAction
    | TUpdateUserInfoSuccessAction
    | TUpdateUserInfoFailedAction
    | TLogoutRequestAction
    | TLogoutSuccessAction
    | TLogoutFailedAction
    | TResetPasswordRequestAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailedAction
    | TRecoveryCodeRequestAction
    | TRecoveryCodeSuccessAction
    | TRecoveryCodeFailedAction
    | TRefreshTokenRequestAction
    | TRefreshTokenSuccessAction
    | TRefreshTokenFailedAction
    | TAuthCheckedAction

export const registrationRequestAction = (): TRegistrationRequestAction => ({
    type: REGISTRATION_REQUEST
})

export const registrationSuccessAction = (email: string, name: string): TRegistrationSuccessAction => ({
    type: REGISTRATION_SUCCESS,
    email,
    name
})

export const registrationFailedAction = (): TRegistrationFailedAction => ({
    type: REGISTRATION_FAILED,
})

export const authorizationRequestAction = (): TAuthorizationRequestAction => ({
    type: AUTHORIZATION_REQUEST,
})

export const authorizationSuccessAction = (email: string, name: string, accessToken: string): TAuthorizationSuccessAction => ({
    type: AUTHORIZATION_SUCCESS,
    email,
    name,
    accessToken
})

export const authorizationFailedAction = (): TAuthorizationFailedAction => ({
    type: AUTHORIZATION_FAILED,
})

export const getUserInfoRequestAction = (): TGetUserInfoRequestAction => ({
    type: GET_USER_INFO_REQUEST,
})

export const getUserInfoSuccessAction = (email: string, name: string): TGetUserInfoSuccessAction => ({
    type: GET_USER_INFO_SUCCESS,
    email,
    name
})

export const getUserInfoFailedAction = (): TGetUserInfoFailedAction => ({
    type: GET_USER_INFO_FAILED
})

export const updateUserInfoRequestAction = (): TUpdateUserInfoRequestAction => ({
    type: UPDATE_USER_INFO_REQUEST,
})

export const updateUserInfoSuccessAction = (email: string, name: string): TUpdateUserInfoSuccessAction => ({
    type: UPDATE_USER_INFO_SUCCESS,
    email,
    name
})

export const updateUserInfoFailedAction = (): TUpdateUserInfoFailedAction => ({
    type: UPDATE_USER_INFO_FAILED
})

export const logoutRequestAction = (): TLogoutRequestAction => ({
    type: LOGOUT_REQUEST,
})

export const logoutSuccessAction = (): TLogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
})

export const logoutFailedAction = (): TLogoutFailedAction => ({
    type: LOGOUT_FAILED,
})

export const resetPasswordRequestAction = (): TResetPasswordRequestAction => ({
    type: RESET_PASSWORD_REQUEST,
})

export const resetPasswordSuccessAction = (): TResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
})

export const resetPasswordFailedAction = (): TResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED,
})

export const recoveryCodeRequestAction = (): TRecoveryCodeRequestAction => ({
    type: RECOVERY_CODE_REQUEST,
})

export const recoveryCodeSuccessAction = (): TRecoveryCodeSuccessAction => ({
    type: RECOVERY_CODE_SUCCESS,
})

export const recoveryCodeFailedAction = (): TRecoveryCodeFailedAction => ({
    type: RECOVERY_CODE_FAILED,
})

export const authCheckedAction = (): TAuthCheckedAction => ({
    type: AUTH_CHECKED,
})


