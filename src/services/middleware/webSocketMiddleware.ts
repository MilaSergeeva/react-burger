import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/data";
// import { TWSActions } from "../actions/wsOrders";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../actions/wsOrders";

export const socketMiddleware =
  (wsUrl: string, auth: boolean) => (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (item: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const token = auth ? getCookie("token") : null;
      if (type === WS_CONNECTION_START) {
        socket = token
          ? new WebSocket(`${wsUrl}?token=${token}`)
          : new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_CONNECTION_CLOSED) {
          socket.close();
        }

        if (type === WS_SEND_MESSAGE) {
          const message = token ? { ...payload, token: token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
