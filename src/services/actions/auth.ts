import { baseUrl, checkResponse } from "../../utils/api";
import {
  TNewPasswordApi,
  TFuncVoid,
  TLoginApi,
  TUserApi,
  TUserInfo,
} from "../types/types";
import { setCookie, getCookie, unsetCookie } from "../../utils/data";
import { Dispatch } from "react";
import { AppThunk, AppDispatch } from "../types/index";

//Авторизация

export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_ERROR: "USER_ERROR" = "USER_ERROR";

export const USER_UPDATE_REQUEST: "USER_UPDATE_REQUEST" = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS: "USER_UPDATE_SUCCESS" = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR: "USER_UPDATE_ERROR" = "USER_UPDATE_ERROR";

export const TOKEN_REQUEST: "TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS: "TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN_ERROR: "TOKEN_ERROR" = "TOKEN_ERROR";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_ERROR: "REGISTER_ERROR" = "REGISTER_ERROR";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR" =
  "FORGOT_PASSWORD_ERROR";

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}

export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  data: { user: { name: string; email: string } };
}

export interface IUserError {
  readonly type: typeof USER_ERROR;
}

export interface IUserUpdateRequest {
  readonly type: typeof USER_UPDATE_REQUEST;
}

export interface IUserUpdateSuccess {
  readonly type: typeof USER_UPDATE_SUCCESS;
  data: { user: { name: string; email: string } };
}

export interface IUserUpdateError {
  readonly type: typeof USER_UPDATE_ERROR;
}

export interface ITokenRequest {
  readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenError {
  readonly type: typeof TOKEN_ERROR;
}

export interface ITokenSuccess {
  readonly type: typeof TOKEN_SUCCESS;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  data: { user: { name: string; email: string } };
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  data: { user: { name: string; email: string } };
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export type TAuthActions =
  | IUserRequest
  | IUserSuccess
  | IUserError
  | IUserUpdateRequest
  | IUserUpdateSuccess
  | IUserUpdateError
  | ITokenRequest
  | ITokenError
  | ITokenSuccess
  | ILogoutRequest
  | ILogoutError
  | ILogoutSuccess
  | IRegisterRequest
  | IRegisterError
  | IRegisterSuccess
  | ILoginRequest
  | ILoginError
  | ILoginSuccess
  | IResetPasswordRequest
  | IResetPasswordError
  | IResetPasswordSuccess
  | IForgotPasswordRequest
  | IForgotPasswordError
  | IForgotPasswordSuccess;

// type TUserInfo = {
//   name?: string | null;
//   email?: string | null;
// }

function setUserInfoToLocalStore({ name, email }: TUserInfo) {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      name,
      email,
    })
  );
}

function getRequestHeaders(): Headers {
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Authorization", getCookie("accessToken") || "");

  return requestHeaders;
}

export const register: AppThunk = ({ email, password, name }: TUserApi) => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/register`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        dispatch({
          type: REGISTER_REQUEST,
        });

        return res;
      })
      .then(checkResponse)
      .then((res) => {
        const { accessToken, refreshToken } = res;

        saveTokens(refreshToken, accessToken);

        if (res && res.success) {
          dispatch({ type: REGISTER_SUCCESS, data: res });
        } else {
          dispatch({ type: REGISTER_ERROR });
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTER_ERROR });
        console.log(err, err.message);
      });
  };
};

export const login: AppThunk = (
  { email, password }: TLoginApi,
  redirectToProfile: TFuncVoid
): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        dispatch({
          type: LOGIN_REQUEST,
        });

        return res;
      })
      .then(checkResponse)

      .then((res) => {
        const { refreshToken, accessToken } = res;

        localStorage.setItem("refreshToken", refreshToken);
        setCookie("accessToken", accessToken);

        if (res && res.success) {
          setUserInfoToLocalStore({
            name: res.user.name,
            email: res.user.email,
          });

          dispatch({ type: LOGIN_SUCCESS, data: res });
          redirectToProfile();
        } else {
          dispatch({ type: LOGIN_ERROR });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR });
        console.log(err, err.message);
      });
  };
};

export const logOut: AppThunk = (redirectToLogin: TFuncVoid): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ token: localStorage.refreshToken }),
    })
      .then((res) => {
        dispatch({
          type: LOGIN_REQUEST,
        });

        return res;
      })
      .then(checkResponse)

      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("refreshToken");
          unsetCookie("accessToken");

          dispatch({ type: LOGOUT_SUCCESS });
          redirectToLogin();
        } else {
          dispatch({ type: LOGOUT_ERROR });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_ERROR });
        console.log(err, err.message);
      });
  };
};

const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken: AppThunk = (afterRefresh): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/token`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    })
      .then((res) => {
        dispatch({
          type: TOKEN_REQUEST,
        });
        return res;
      })
      .then(checkResponse)
      .then((res) => {
        const { refreshToken, accessToken } = res;

        saveTokens(refreshToken, accessToken);

        dispatch(afterRefresh);

        if (res && res.success) {
          dispatch({ type: TOKEN_SUCCESS });
        } else {
          dispatch({ type: TOKEN_ERROR });
        }
      })
      .catch((err) => {
        localStorage.removeItem("refreshToken");
        dispatch({ type: TOKEN_ERROR });
      });
  };
};

export const getUserInfo: AppThunk = (): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/user`, {
      headers: getRequestHeaders(),
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        dispatch({
          type: TOKEN_REQUEST,
        });
        return res;
      })
      .then(checkResponse)

      .then((res) => {
        if (res && res.success) {
          dispatch({ type: USER_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_ERROR });
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshAccessToken(getUserInfo() as TFuncVoid) as any);
        } else {
          dispatch({ type: USER_ERROR });
        }
      });
  };
};

export const updateUserInfo: AppThunk = ({
  name,
  email,
  password,
}: TUserApi): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: getRequestHeaders(),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        dispatch({
          type: USER_UPDATE_REQUEST,
        });

        return res;
      })
      .then(checkResponse)

      .then((res) => {
        if (res && res.success) {
          setUserInfoToLocalStore({
            name,
            email,
          });

          dispatch({ type: USER_UPDATE_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_UPDATE_ERROR });
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(
            refreshAccessToken(
              updateUserInfo({ name, email, password }) as TFuncVoid
            ) as any
          );
        }

        dispatch({ type: USER_UPDATE_ERROR });
      });
  };
};

export const getCodeToChangePassword: AppThunk = (
  email: string | null,
  redirectToResetPassword: TFuncVoid
): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/password-reset`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(email),
    })
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
        });

        return res;
      })
      .then(checkResponse)

      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          redirectToResetPassword();
        } else {
          dispatch({ type: FORGOT_PASSWORD_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: FORGOT_PASSWORD_ERROR });
      });
  };
};

export const saveNewPassword: AppThunk = (
  { password, token }: TNewPasswordApi,
  redirectToMainPage: TFuncVoid
): Dispatch<any> => {
  return function (dispatch: AppDispatch) {
    fetch(`${baseUrl}/password-reset/reset`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ password, token }),
    })
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
        });

        return res;
      })
      .then(checkResponse)

      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
          redirectToMainPage();
        } else {
          dispatch({ type: RESET_PASSWORD_ERROR });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        dispatch({ type: RESET_PASSWORD_ERROR });
      });
  };
};
