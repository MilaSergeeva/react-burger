//список всех полученных ингредиентов,
//список всех ингредиентов в текущем конструкторе бургера,
//объект текущего просматриваемого ингредиента,
// объект созданного заказа

import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ORDER_NUMBER,
  ADD_TO_CART_FILLINGS,
  ADD_TO_CART_BUN,
  DELETE_FROM_CART_BUN,
  DELETE_FROM_CART_FILLING,
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  DRAG_CART_INGREDIENT,
  DELETE_FROM_CART_FILLINGS,
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
    orderFailed: false,
    orderRequest: false,
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
    case DELETE_FROM_CART_FILLINGS: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: [],
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
    case UPDATE_ORDER_INGRIDIENTS_DELAILS: {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          ingridients: action.ingridientsTotal,
        },
      };
    }
    case DRAG_CART_INGREDIENT: {
      const newListIngredients = [...state.burgerConstructorList.fillings];
      const dragIngredient = newListIngredients[action.dragIndex];
      newListIngredients.splice(action.dragIndex, 1);
      newListIngredients.splice(action.hoverIndex, 0, dragIngredient);
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: newListIngredients,
        },
      };
    }
    default: {
      return state;
    }
  }
};
