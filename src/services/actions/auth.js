import { baseUrl, checkResponse } from "../../utils/api";

import { setCookie, getCookie, unsetCookie } from "../../utils/data";

//Авторизация

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_ERROR = "TOKEN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "TOKEN_ERROR";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

function setUserInfoToLocalStore({ name, email }) {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      name,
      email,
    })
  );
}

export const register = ({ email, password, name }) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: REGISTER_REQUEST,
        })
      )
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

export const login = ({ email, password }, redirectToProfile) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: LOGIN_REQUEST,
        })
      )
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

export const logOut = (redirectToLogin) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: LOGIN_REQUEST,
        })
      )
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

const saveTokens = (refreshToken, accessToken) => {
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = (afterRefresh) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: TOKEN_REQUEST,
        })
      )
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

export const getUserInfo = () => {
  return function (dispatch) {
    fetch(`${baseUrl}/auth/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
      },
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(checkResponse)
      .then(
        dispatch({
          type: TOKEN_REQUEST,
        })
      )
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: USER_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_ERROR });
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshAccessToken(getUserInfo()));
        } else {
          dispatch({ type: USER_ERROR });
        }
      });
  };
};

export const updateUserInfo = (name, email, password) => {
  return function (dispatch) {
    fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ name, email, password }),
    })
      .then(checkResponse)
      .then(
        dispatch({
          type: USER_UPDATE_REQUEST,
        })
      )
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
              // updateUserInfo({ name, email, password }, dispatch)
              updateUserInfo(name, email, password)
            )
          );
        }

        dispatch({ type: USER_UPDATE_ERROR });
      });
  };
};

export const getCodeToChangePassword = (email, redirectToResetPassword) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
        })
      )
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

export const saveNewPassword = ({ password, token }, redirectToMainPage) => {
  return function (dispatch) {
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
      .then(checkResponse)
      .then(
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
        })
      )
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
