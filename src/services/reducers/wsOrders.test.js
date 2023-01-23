import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_CONNECTION_FINISHED_AUTH,
} from "../actions/wsOrders";

import { wsReducerAuth } from "./wsOrders";

const initialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
  wsFinished: null,
};

describe("initialSocketState", () => {
  it("should return the initial state", () => {
    expect(wsReducerAuth(undefined, {})).toEqual(initialSocketState);
  });

  it("should handle WS_CONNECTION_SUCCESS_AUTH", () => {
    expect(
      wsReducerAuth(initialSocketState, {
        type: WS_CONNECTION_SUCCESS_AUTH,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsConnected: true,
        error: null,
        wsFinished: false,
      })
    );
  });

  it("should handle WS_CONNECTION_ERROR_AUTH", () => {
    expect(
      wsReducerAuth(initialSocketState, {
        type: WS_CONNECTION_ERROR_AUTH,
        payload: "It will come",
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: "It will come",
        wsConnected: false,
      })
    );
  });

  it("should handle WS_CONNECTION_CLOSED_AUTH", () => {
    expect(
      wsReducerAuth(initialSocketState, {
        type: WS_CONNECTION_CLOSED_AUTH,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: undefined,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_CONNECTION_FINISHED_AUTH", () => {
    expect(
      wsReducerAuth(initialSocketState, {
        type: WS_CONNECTION_FINISHED_AUTH,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsFinished: true,
      })
    );
  });

  it("should handle WS_GET_MESSAGE_AUTH", () => {
    expect(
      wsReducerAuth(initialSocketState, {
        type: WS_GET_MESSAGE_AUTH,
        payload: {
          orders: [
            {
              _id: "63ac03ed99a25c001cd6f968",
              ingredients: [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733cb",
              ],
              status: "done",
              name: "Био-марсианский бессмертный флюоресцентный space бургер",
              createdAt: "2022-12-28T08:53:06.269Z",
              updatedAt: "2022-12-28T08:53:06.701Z",
              number: 8420,
            },
          ],
          total: 36042,
          totalToday: 129,
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        error: undefined,
        data: {
          ...initialSocketState.data,
          orders: [
            {
              _id: "63ac03ed99a25c001cd6f968",
              ingredients: [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cd",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733cb",
              ],
              status: "done",
              name: "Био-марсианский бессмертный флюоресцентный space бургер",
              createdAt: "2022-12-28T08:53:06.269Z",
              updatedAt: "2022-12-28T08:53:06.701Z",
              number: 8420,
            },
          ],
          total: 36042,
          totalToday: 129,
        },
      })
    );
  });
});
