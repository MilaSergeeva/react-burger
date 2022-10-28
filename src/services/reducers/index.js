//список всех полученных ингредиентов,
//список всех ингредиентов в текущем конструкторе бургера,
//объект текущего просматриваемого ингредиента,
// объект созданного заказа

import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ORDER_NUMBER,
  ADD_TO_CART_FILLING,
  ADD_TO_CART_BUN,
  DELETE_FROM_CART_BUN,
  DELETE_FROM_CART_FILLING,
  INCREASE_FILLINGS_COUNTER,
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  DRAG_CART_INGREDIENT,
  DELETE_FROM_CART_INGRIDIENTS,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
} from "../actions/index";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  burgerConstructorList: {
    bun: null,
    fillings: [],
    counter: {},
  },
  currentIngredientDetails: {},
  orderDetails: {
    ingridients: [],
    orderFailed: false,
    orderRequest: false,
    orderNumber: "",
  },

  user: {
    name: "",
    email: "",
  },

  auth: {
    userRequest: false,
    userFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    tokenRequest: false,
    tokenUpdate: false,
    tokenFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    forgotRequest: false,
    forgotFailed: false,
    isResetPassword: false,
    resetRequest: false,
    resetFailed: false,
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
    case ADD_TO_CART_FILLING: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: [...state.burgerConstructorList.fillings, action.item],
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

    case DELETE_FROM_CART_INGRIDIENTS: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          fillings: [],
          bun: null,
          counter: {},
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
    case DELETE_FROM_CART_BUN: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          bun: null,
        },
      };
    }

    case 
    case INCREASE_FILLINGS_COUNTER: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          bun: null,
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

    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: true,
        },
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: false,
          updateUserFailed: false,
          name: action.data.user.name,
          email: action.data.user.email,
        },
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: false,
          updateUserFailed: true,
        },
      };
    }

    case USER_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          userRequest: true,
        },
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          userRequest: false,
          userFailed: false,
          name: action.data.user.name,
          email: action.data.user.email,
        },
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          userRequest: false,
          userFailed: true,
        },
      };
    }

    case TOKEN_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenRequest: true,
        },
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenUpdate: true,
          tokenRequest: false,
          tokenFailed: false,
        },
      };
    }
    case TOKEN_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenRequest: false,
          tokenUpdate: false,
          tokenFailed: true,
        },
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: true,
        },
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          logoutRequest: false,
          logoutFailed: false,
          name: "",
          email: "",
        },
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          logoutRequest: false,
          logoutFailed: true,
        },
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: true,
        },
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,

          name: action.data.user.name,
          email: action.data.user.email,
        },
        auth: {
          ...state.auth,
          registerRequest: false,
          registerFailed: false,
        },
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: false,
          registerFailed: true,
        },
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          loginRequest: true,
        },
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,

          name: action.data.user.name,
          email: action.data.user.email,
        },
        auth: {
          ...state.auth,
          loginRequest: false,
          loginFailed: false,
        },
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          loginRequest: false,
          loginFailed: true,
        },
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: true,
          isResetPassword: false,
        },
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: false,
          isResetPassword: true,
          forgotFailed: false,
        },
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: false,
          isResetPassword: false,
          forgotFailed: true,
        },
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: true,
        },
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: false,
          resetFailed: false,
        },
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: false,
          resetFailed: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
