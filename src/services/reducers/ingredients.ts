import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_TO_CART_FILLING,
  ADD_TO_CART_BUN,
  DELETE_FROM_CART_BUN,
  DELETE_FROM_CART_FILLING,
  INCREASE_FILLINGS_COUNTER,
  DECREASE_FILLINGS_COUNTER,
  DELETE_FROM_CART_INGRIDIENTS,
  DRAG_CART_INGREDIENT,
} from "../actions/ingredients";

import { IIngredient, TIngredientWithUniqueId } from "../types/types";
import { TIngredientsActions } from "../actions/ingredients";

type TInitIngredientState = {
  items: IIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;

  burgerConstructorList: {
    bun: string | null;
    fillings: TIngredientWithUniqueId[];
    counter: {};
  };
};

const initialIngredientState: TInitIngredientState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  burgerConstructorList: {
    bun: null,
    fillings: [],
    counter: {},
  },
};

export const ingredientReducer = (
  state = initialIngredientState,
  action: TIngredientsActions
) => {
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

    case INCREASE_FILLINGS_COUNTER: {
      const counter = state.burgerConstructorList.fillings.reduce(function (
        prev,
        cur: any
      ) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      },
      {});

      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          counter,
        },
      };
    }

    case DECREASE_FILLINGS_COUNTER: {
      return {
        ...state,
        burgerConstructorList: {
          ...state.burgerConstructorList,
          counter: {
            ...state.burgerConstructorList.counter,
            [action.id]: state.burgerConstructorList.counter[action.id] - 1,
          },
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
