//список всех полученных ингредиентов,
//список всех ингредиентов в текущем конструкторе бургера,
//объект текущего просматриваемого ингредиента,
// объект созданного заказа

import {
  // DELETE_ITEM,
  // CANCEL_PROMO,
  // DECREASE_ITEM,
  // INCREASE_ITEM,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ORDER_NUMBER,
  ADD_TO_CART_FILLINGS,
  ADD_TO_CART_BUN,
  DELETE_FROM_CART_BUN,
  DELETE_FROM_CART_FILLING,
  // APPLY_PROMO_FAILED,
  // APPLY_PROMO_REQUEST,
  // APPLY_PROMO_SUCCESS,
  // TAB_SWITCH,
  // GET_RECOMMENDED_ITEMS_FAILED,
  // GET_RECOMMENDED_ITEMS_REQUEST,
  // GET_RECOMMENDED_ITEMS_SUCCESS
} from "../actions/index";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  burgerConstructorList: {
    bun: null,
    fillings: [],
  },
  currentIngredientDetails: {},
  orderDetails: {
    ingridients: [],
    orderNumber: "",
  },
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderNumber: action.orderDetails,
        },
      };
    }
    case ADD_TO_CART_FILLINGS: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: [...state.burgerConstructorList.fillings, action.item],
        },
      };
    }
    case DELETE_FROM_CART_BUN: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          bun: null,
        },
      };
    }
    case ADD_TO_CART_BUN: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          bun: action.item,
        },
      };
    }
    case DELETE_FROM_CART_FILLING: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: [
            ...state.burgerConstructorList.fillings.slice(0, action.index),
            ...state.burgerConstructorList.fillings.slice(action.index + 1),
          ],
        },
      };
    }
    default: {
      return state;
    }
  }
};
