import { baseUrl, checkResponse } from "../../utils/api.ts";

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

//Обновление карзины

export const ADD_TO_CART_FILLING = "ADD_TO_CART_FILLING";
export const ADD_TO_CART_BUN = "ADD_TO_CART_BUN";
export const DELETE_FROM_CART_BUN = "DELETE_FROM_CART_BUN";
export const DELETE_FROM_CART_FILLING = "DELETE_FROM_CART_FILLING";

export const DRAG_CART_INGREDIENT = "DRAG_CART_INGREDIENT";

export const DELETE_FROM_CART_INGRIDIENTS = "DELETE_FROM_CART_INGRIDIENTS";

export const INCREASE_FILLINGS_COUNTER = "INCREASE_FILLINGS_COUNTER";
export const DECREASE_FILLINGS_COUNTER = "DECREASE_FILLINGS_COUNTER";

export const INCREASE_BUNS_COUNTER = "INCREASE_FILLINGS_COUNTER";
export const DECREASE_BUNS_COUNTER = "DECREASE_BUNS_COUNTER";

export const CLEAR_INGRIDIENTS_COUNTER = "CLEAR_INGRIDIENTS_COUNTER";

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
