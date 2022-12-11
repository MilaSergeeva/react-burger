import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { store } from "../../index";
import { TAuthActions } from "./../actions/auth";
import { TOrderActions } from "../actions/order";
import { TIngredientsActions } from "../actions/ingredients";
import { TWSActions } from "../actions/wsOrders";

export type TApplicationActions =
  | TOrderActions
  | TAuthActions
  | TIngredientsActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
// export type AppDispatch = Dispatch<TApplicationActions>;
