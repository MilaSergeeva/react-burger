import {
  GET_ORDER_NUMBER,
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
} from "../actions/order";

const initialOrderState = {
  orderDetails: {
    ingridients: [],
    orderFailed: false,
    orderRequest: false,
    orderNumber: "",
  },
};

export const orderReducer = (state = initialOrderState, action) => {
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
          orderNumber: action.orderDetails,
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
