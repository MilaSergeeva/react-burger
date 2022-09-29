import { ingridientsDataApi } from "../../utils/api";

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

//Обновление карзины

export const ADD_TO_CART_LIST = "ADD_TO_CART_LIST";

export function getItems() {
  return function (dispatch) {
    fetch(ingridientsDataApi)
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
      });
  };
}

export function makeOrder(ingredients) {
  return function (dispatch) {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER,
          orderDetails: res,
        });
      });
  };
}
