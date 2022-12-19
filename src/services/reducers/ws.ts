import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "./../types/types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSActions,
  WS_CONNECTION_FINISHED,
} from "../actions/wsOrders";
// import { TWSActions } from '../actions/wsActions';

type TInitialSocketState = {
  wsConnected: boolean;
  data: TWSData;
  error?: PayloadAction | null;
  wsFinished: boolean | null;
};

const initialSocketState: TInitialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
  wsFinished: null,
};

export const wsReducer = (
  state = initialSocketState,
  action: TWSActions
): TInitialSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
        wsFinished: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        wsFinished: null,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_FINISHED:
      return {
        ...state,
        wsFinished: true,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: {
          ...state.data,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};
