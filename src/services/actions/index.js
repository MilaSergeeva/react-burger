import { baseUrl, checkResponse } from "../../utils/api";

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

export const ADD_TO_CART_FILLINGS = "ADD_TO_CART_FILLINGS";
export const ADD_TO_CART_BUN = "ADD_TO_CART_BUN";
export const DELETE_FROM_CART_BUN = "DELETE_FROM_CART_BUN";
export const DELETE_FROM_CART_FILLING = "DELETE_FROM_CART_FILLING";

export const DRAG_CART_INGREDIENT = "DRAG_CART_INGREDIENT";

export const UPDATE_ORDER_INGRIDIENTS_DELAILS =
  "UPDATE_ORDER_INGRIDIENTS_DELAILS";

export const DELETE_FROM_CART_FILLINGS = "DELETE_FROM_CART_FILLINGS";

export function getItems() {
  return function (dispatch) {
    fetch(`${baseUrl}/ingredients`)
      .then(
        dispatch({
          type: GET_ITEMS_REQUEST,
        })
      )
      .then(checkResponse)
      .then((res) => res.json())
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
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER,
            orderDetails: res,
          });
          dispatch({
            type: DELETE_FROM_CART_BUN,
          });
          dispatch({
            type: DELETE_FROM_CART_FILLINGS,
          });
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
        type: ADD_TO_CART_FILLINGS,
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
