import { baseUrl, checkResponse } from "../../utils/api";

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const UPDATE_ORDER_NUMBER = "UPDATE_ORDER_NUMBER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const UPDATE_ORDER_INGRIDIENTS_DELAILS =
  "UPDATE_ORDER_INGRIDIENTS_DELAILS";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export function makeOrder(ingredients) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
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
        .then(checkResponse);

      if (res && res.success) {
        dispatch({
          type: GET_ORDER_NUMBER,
          orderNumber: res.order.number,
        });

        return res;
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    }
  };
}
