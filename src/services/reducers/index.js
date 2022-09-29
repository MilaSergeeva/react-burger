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
  ADD_TO_CART_LIST,
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

  burgerConstructorList: [],
  currentIngredientDetails: {},
  orderDetails: {},
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
      return { ...state, orderDetails: action.orderDetails };
    }
    case ADD_TO_CART_LIST: {
      return {
        ...state,
        burgerConstructorList: [...state.burgerConstructorList, action.item],
      };
    }
    default: {
      return state;
    }
  }
};
