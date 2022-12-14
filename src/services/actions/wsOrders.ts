import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../types/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export const WS_CONNECTION_START_AUTH: "WS_CONNECTION_START_AUTH" =
  "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS_AUTH: "WS_CONNECTION_SUCCESS_AUTH" =
  "WS_CONNECTION_SUCCESS_AUTH";
export const WS_CONNECTION_ERROR_AUTH: "WS_CONNECTION_ERROR_AUTH" =
  "WS_CONNECTION_ERROR_AUTH";
export const WS_CONNECTION_CLOSED_AUTH: "WS_CONNECTION_CLOSED_AUTH" =
  "WS_CONNECTION_CLOSED_AUTH";
export const WS_GET_MESSAGE_AUTH: "WS_GET_MESSAGE_AUTH" = "WS_GET_MESSAGE_AUTH";
export const WS_SEND_MESSAGE_AUTH: "WS_SEND_MESSAGE_AUTH" =
  "WS_SEND_MESSAGE_AUTH";
export const WS_CONNECTION_FINISHED_AUTH: "WS_CONNECTION_FINISHED_AUTH" =
  "WS_CONNECTION_FINISHED_AUTH";
export const WS_CONNECTION_FINISHED: "WS_CONNECTION_FINISHED" =
  "WS_CONNECTION_FINISHED";

export interface IWSStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: PayloadAction;
}

export interface IWSError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: PayloadAction;
}

export interface IWSClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: PayloadAction;
}

export interface IWSFinished {
  readonly type: typeof WS_CONNECTION_FINISHED;
  readonly payload: PayloadAction;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWSData;
}

export interface IWSSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export interface IWSStartAuth {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWSSuccessAuth {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSErrorAuth {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSClosedAuth {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSFinishedAuth {
  readonly type: typeof WS_CONNECTION_FINISHED_AUTH;
  readonly payload: PayloadAction;
}

export interface IWSGetMessageAuth {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  readonly payload: TWSData;
}

export interface IWSSendMessageAuth {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
}

export type TWSActions =
  | IWSStart
  | IWSSuccess
  | IWSError
  | IWSClosed
  | IWSGetMessage
  | IWSSendMessage
  | IWSStartAuth
  | IWSSuccessAuth
  | IWSErrorAuth
  | IWSClosedAuth
  | IWSGetMessageAuth
  | IWSSendMessageAuth
  | IWSFinishedAuth
  | IWSFinished;
