import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_FINISHED,
} from "../actions/wsOrders";

import { wsReducer } from "./ws";

const initialSocketState = {
  wsConnected: false,
  data: { success: false, orders: [], total: 0, totalToday: 0 },
  wsFinished: null,
};

describe("initialSocketState", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialSocketState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialSocketState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsConnected: true,
        wsFinished: false,
        error: null,
      })
    );
  });

  it("should handle WS_CONNECTION_FINISHED", () => {
    expect(
      wsReducer(initialSocketState, {
        type: WS_CONNECTION_FINISHED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsFinished: true,
      })
    );
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialSocketState, {
        type: WS_CONNECTION_ERROR,
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

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialSocketState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialSocketState,
        wsConnected: false,
        error: undefined,
      })
    );
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(initialSocketState, {
        type: WS_GET_MESSAGE,
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
