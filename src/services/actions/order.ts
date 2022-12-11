import { baseUrl, checkResponse } from "../../utils/api";
import { IIngredient } from "../types/types";
import { Dispatch } from "react";
import { AppThunk, AppDispatch } from "../types/index";

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_NUMBER: "GET_ORDER_NUMBER" = "GET_ORDER_NUMBER";
export const UPDATE_ORDER_NUMBER: "UPDATE_ORDER_NUMBER" = "UPDATE_ORDER_NUMBER";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const UPDATE_ORDER_INGRIDIENTS_DELAILS: "UPDATE_ORDER_INGRIDIENTS_DELAILS" =
  "UPDATE_ORDER_INGRIDIENTS_DELAILS";
export const DELETE_ORDER_NUMBER: "DELETE_ORDER_NUMBER" = "DELETE_ORDER_NUMBER";

export interface IGetOrderNumber {
  readonly type: typeof GET_ORDER_NUMBER;
  readonly orderNumber: number;
}

export interface IUpdateOrderNumber {
  readonly type: typeof UPDATE_ORDER_NUMBER;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IUpdateOrderIngridientsDetails {
  readonly type: typeof UPDATE_ORDER_INGRIDIENTS_DELAILS;
  readonly ingridientsTotal: IIngredient[];
}

export interface IDeleteOrderNumber {
  readonly type: typeof DELETE_ORDER_NUMBER;
}

export type TOrderActions =
  | IGetOrderNumber
  | IUpdateOrderNumber
  | IGetOrderFailed
  | IGetOrderRequest
  | IUpdateOrderIngridientsDetails
  | IDeleteOrderNumber;

export const makeOrder: AppThunk = (ingredients: string[]): Dispatch<any> => {
  return async function (dispatch: AppDispatch) {
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredients }),
      })
        .then((res) => {
          dispatch({
            type: GET_ORDER_REQUEST,
          });

          return res;
        })
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
};
