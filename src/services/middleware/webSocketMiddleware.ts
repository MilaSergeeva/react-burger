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
      socket = auth
        ? new WebSocket(`${WS_URL_OWNER}?token=${token}`) &&
          new WebSocket(`${WS_URL_ALL}`)
        : new WebSocket(`${WS_URL_ALL}`);

      console.log("я тут");
    }

    if (socket) {
      socket.onopen = (event) => {
        auth
          ? dispatch({ type: WS_CONNECTION_SUCCESS, payload: event }) &&
            dispatch({ type: WS_CONNECTION_SUCCESS_AUTH, payload: event })
          : dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
      };

      socket.onerror = (event) => {
        auth
          ? dispatch({ type: WS_CONNECTION_ERROR_AUTH, payload: event })
          : dispatch({ type: WS_CONNECTION_ERROR, payload: event });
      };

      socket.onmessage = (event) => {
        if (
          (event.currentTarget as any).url ===
          "wss://norma.nomoreparties.space/orders/all"
        ) {
          console.log("и вот тут");
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        } else {
          console.log("а теперь тут");
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          auth &&
            dispatch({
              type: WS_GET_MESSAGE_AUTH,
              payload: restParsedData,
            });
        }
        // const { data } = event;
        // const parsedData = JSON.parse(data);
        // const { success, ...restParsedData } = parsedData;
        // !auth
        //   ? dispatch({ type: WS_GET_MESSAGE, payload: restParsedData })
        //   : dispatch({
        //       type: WS_GET_MESSAGE_AUTH,
        //       payload: restParsedData,
        //     });
      };

      socket.onclose = (event) => {
        auth
          ? dispatch({ type: WS_CONNECTION_CLOSED, payload: event }) &&
            dispatch({ type: WS_CONNECTION_CLOSED_AUTH, payload: event })
          : dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
      };

      // if (type === WS_CONNECTION_CLOSED || WS_CONNECTION_CLOSED_AUTH) {
      //   socket.close();
      // }

      if (type === WS_SEND_MESSAGE || WS_SEND_MESSAGE_AUTH) {
        const message = token ? { ...payload, token: token } : { ...payload };
        socket.onopen = () =>
          socket !== null && socket.send(JSON.stringify(message));
      }
    }
    next(action);
  };
};
