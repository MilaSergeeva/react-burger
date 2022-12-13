import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredients";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";
import { wsReducerAuth } from "./wsOrders";

export const rootReducer = combineReducers({
  ingredientReducer,
  orderReducer,
  authReducer,
  wsReducer,
  wsReducerAuth,
});
