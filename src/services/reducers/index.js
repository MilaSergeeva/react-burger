import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredients";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  ingredientReducer,
  orderReducer,
  authReducer,
});
