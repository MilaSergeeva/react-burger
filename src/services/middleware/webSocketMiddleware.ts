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
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "../actions/wsOrders";
import { WS_URL_ALL, WS_URL_OWNER } from "../../utils/data";

export const socketMiddleware = () => (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;
  let socketAuth: WebSocket | null = null;

  let auth = false;

  if (localStorage.getItem("refreshToken") !== null) {
    auth = true;
  } else {
    auth = false;
  }
  return (next: (item: AnyAction) => void) => (action: AnyAction) => {
    const { dispatch } = store;
    const { type, payload } = action;

    const token = auth ? getCookie("accessToken")?.slice(7) : null;
    if (type === WS_CONNECTION_START) {
      // socketAuth = auth
      //   ? new WebSocket(`${WS_URL_OWNER}?token=${token}`)
      //   : null;

      socket = new WebSocket(`${WS_URL_ALL}`);

      console.log("я тут");
    }

    if (type === WS_CONNECTION_START_AUTH) {
      socketAuth = new WebSocket(`${WS_URL_OWNER}?token=${token}`);

      // socket = new WebSocket(`${WS_URL_ALL}`);

      console.log("zzzzz");
    }

    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: WS_CONNECTION_ERROR, payload: event });
      };

      socket.onmessage = (event) => {
        console.log("и вот тут");
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
      };

      socket.onclose = (event) => {
        dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
      };
    }

    if (socketAuth) {
      socketAuth.onopen = (event) => {
        dispatch({ type: WS_CONNECTION_SUCCESS_AUTH, payload: event });
      };

      socketAuth.onerror = (event) => {
        dispatch({ type: WS_CONNECTION_ERROR_AUTH, payload: event });
      };

      socketAuth.onmessage = (event) => {
        console.log("а теперь тут");
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        auth &&
          dispatch({
            type: WS_GET_MESSAGE_AUTH,
            payload: restParsedData,
          });
      };

      socketAuth.onclose = (event) => {
        dispatch({ type: WS_CONNECTION_CLOSED_AUTH, payload: event });
      };
    }

    if (type === WS_CONNECTION_CLOSED && socket !== null) {
      socket.close();
    }

    if (type === WS_CONNECTION_CLOSED_AUTH && socketAuth !== null) {
      socketAuth.close();
    }

    if (type === WS_SEND_MESSAGE && socket !== null) {
      const message = token ? { ...payload, token: token } : { ...payload };
      socket.onopen = () => socket?.send(JSON.stringify(message));
    }

    if (type === WS_SEND_MESSAGE_AUTH && socketAuth !== null) {
      const message = token ? { ...payload, token: token } : { ...payload };
      socketAuth.onopen = () => socketAuth?.send(JSON.stringify(message));
    }

    next(action);
  };
};
