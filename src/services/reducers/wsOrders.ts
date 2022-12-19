import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../types/types";
import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_CONNECTION_FINISHED_AUTH,
} from "../actions/wsOrders";
import { TWSActions } from "../actions/wsOrders";

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

export const wsReducerAuth = (
  state = initialSocketState,
  action: TWSActions
): TInitialSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        wsConnected: true,
        error: null,
        wsFinished: false,
      };
    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        wsFinished: null,
      };
    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_FINISHED_AUTH:
      return {
        ...state,
        wsFinished: true,
      };
    case WS_GET_MESSAGE_AUTH:
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
