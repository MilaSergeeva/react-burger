import {
  GET_ORDER_NUMBER,
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  DELETE_ORDER_NUMBER,
} from "../actions/order";

import { IIngredient } from "../types/types";
import { TOrderActions } from "../actions/order";

type TInitOrderState = {
  orderDetails: {
    ingridients: IIngredient[];
    orderFailed: boolean;
    orderRequest: boolean;
    orderNumber: string;
  };
};

const initialOrderState: TInitOrderState = {
  orderDetails: {
    ingridients: [],
    orderFailed: false,
    orderRequest: false,
    orderNumber: "",
  },
};

export const orderReducer = (
  state = initialOrderState,
  action: TOrderActions
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderRequest: true,
        },
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderNumber: action.orderNumber,
          orderRequest: false,
          orderFailed: false,
        },
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderRequest: false,
          orderFailed: true,
        },
      };
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderNumber: "",
          orderRequest: false,
          orderFailed: false,
        },
      };
    }
    case UPDATE_ORDER_INGRIDIENTS_DELAILS: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          ingridients: action.ingridientsTotal,
        },
      };
    }

    default: {
      return state;
    }
  }
};
