import { baseUrl, checkResponse } from "../../utils/api";

import { setCookie, getCookie } from "../../utils/data";

//Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

//Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const GET_RECOMMENDED_ITEMS_REQUEST = "GET_RECOMMENDED_ITEMS_REQUEST";
export const GET_RECOMMENDED_ITEMS_SUCCESS = "GET_RECOMMENDED_ITEMS_SUCCESS";
export const GET_RECOMMENDED_ITEMS_FAILED = "GET_RECOMMENDED_ITEMS_FAILED";

//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
export const ADD_CURRENT_INGRIDIENT_DETAILS = "ADD_CURRENT_INGRIDIENT_DETAILS";
export const DELETE_CURRENT_INGRIDIENT_DETAILS =
  "DELETE_CURRENT_INGRIDIENT_DETAILS";

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const UPDATE_ORDER_NUMBER = "UPDATE_ORDER_NUMBER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";

//Обновление карзины

export const ADD_TO_CART_FILLING = "ADD_TO_CART_FILLING";
export const ADD_TO_CART_BUN = "ADD_TO_CART_BUN";
export const DELETE_FROM_CART_BUN = "DELETE_FROM_CART_BUN";
export const DELETE_FROM_CART_FILLING = "DELETE_FROM_CART_FILLING";

export const DRAG_CART_INGREDIENT = "DRAG_CART_INGREDIENT";

export const UPDATE_ORDER_INGRIDIENTS_DELAILS =
  "UPDATE_ORDER_INGRIDIENTS_DELAILS";

export const DELETE_FROM_CART_INGRIDIENTS = "DELETE_FROM_CART_INGRIDIENTS";

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

export const INCREASE_FILLINGS_COUNTER = "INCREASE_FILLINGS_COUNTER";
export const DECREASE_FILLINGS_COUNTER = "DECREASE_FILLINGS_COUNTER";

export const INCREASE_BUNS_COUNTER = "INCREASE_FILLINGS_COUNTER";
export const DECREASE_BUNS_COUNTER = "DECREASE_BUNS_COUNTER";

export const CLEAR_INGRIDIENTS_COUNTER = "CLEAR_INGRIDIENTS_COUNTER";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export function getItems() {
  return function (dispatch) {
    fetch(`${baseUrl}/ingredients`)
      .then(
        dispatch({
          type: GET_ITEMS_REQUEST,
        })
      )
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };
}

export function makeOrder(ingredients) {
  return function (dispatch) {
    fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    })
      .then(
        dispatch({
          type: GET_ORDER_REQUEST,
        })
      )
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER,
            orderDetails: res,
          });
          // dispatch({
          //   type: DELETE_FROM_CART_BUN,
          // });
          dispatch({
            type: DELETE_FROM_CART_INGRIDIENTS,
          });
          return res;
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };
}

export function updateCartList(item) {
  return function (dispatch) {
    if (item.type !== "bun") {
      dispatch({
        type: ADD_TO_CART_FILLING,
        item,
      });
      dispatch({
        type: INCREASE_FILLINGS_COUNTER,
        item,
      });
    } else {
      dispatch({
        type: DELETE_FROM_CART_BUN,
      });
      dispatch({
        type: ADD_TO_CART_BUN,
        item,
      });
    }
  };
}

///////////////////////////////////

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
        const refreshToken = res.refreshToken;
        setCookie("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", refreshToken);

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

export const login = ({ email, password }) => {
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
          dispatch({ type: LOGIN_SUCCESS, data: res });
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

export const getNewToken = () => {
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
        const refreshToken = res.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        if (res && res.success) {
          dispatch({ type: TOKEN_SUCCESS });
        } else {
          dispatch({ type: TOKEN_ERROR });
        }
      })
      .catch((err) => {
        if (
          err.message === "jwt expired" ||
          err.message === "Token is invalid"
        ) {
          getNewToken(dispatch).then((res) => {
            if (res.success) {
              localStorage.setItem("refreshToken", res.refreshToken);
              setCookie("accessToken", res.accessToken);
            }
          });
        } else {
          localStorage.removeItem("refreshToken");
          dispatch({ type: TOKEN_ERROR });
        }
      });
  };
};

export const getUserInfo = () => {
  return function (dispatch) {
    fetch(`${baseUrl}/auth/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${getCookie("accessToken")}`,
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
        if (
          err.message === "jwt expired" ||
          err.message === "Token is invalid" ||
          err.message === "jwt malformed"
        ) {
          getNewToken(dispatch);
          getUserInfo(dispatch);
        } else console.log(err.message);
        dispatch({ type: USER_ERROR });
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
        console.log();
        if (res && res.success) {
          dispatch({ type: USER_UPDATE_SUCCESS, data: res });
        } else {
          dispatch({ type: USER_UPDATE_ERROR });
        }
      })
      .catch((err) => {
        if (
          err.message === "jwt expired" ||
          err.message === "Token is invalid" ||
          err.message === "jwt malformed"
        ) {
          getNewToken(dispatch);
          updateUserInfo({ name, email, password }, dispatch);
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
