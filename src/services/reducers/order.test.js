import {
  GET_ORDER_NUMBER,
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  DELETE_ORDER_NUMBER,
} from "../actions/order";

import { orderReducer } from "./order";

const initialOrderState = {
  orderDetails: {
    ingridients: [],
    orderFailed: false,
    orderRequest: false,
    orderNumber: "",
  },
};

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialOrderState);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      orderReducer(initialOrderState, { type: GET_ORDER_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderDetails: {
          ...initialOrderState.orderDetails,
          orderRequest: true,
        },
      })
    );
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(orderReducer(initialOrderState, { type: GET_ORDER_FAILED })).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderDetails: {
          ...initialOrderState.orderDetails,
          orderFailed: true,
        },
      })
    );
  });

  it("should handle GET_ORDER_NUMBER", () => {
    expect(
      orderReducer(initialOrderState, {
        type: GET_ORDER_NUMBER,
        orderNumber: 1,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderDetails: {
          ...initialOrderState.orderDetails,
          orderNumber: 1,
          orderRequest: false,
          orderFailed: false,
        },
      })
    );
  });

  it("should handle DELETE_ORDER_NUMBER", () => {
    expect(
      orderReducer(initialOrderState, { type: DELETE_ORDER_NUMBER })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderDetails: {
          ...initialOrderState.orderDetails,
          orderNumber: "",
          orderRequest: false,
          orderFailed: false,
        },
      })
    );
  });

  it("should handle UPDATE_ORDER_INGRIDIENTS_DELAILS", () => {
    expect(
      orderReducer(initialOrderState, {
        type: UPDATE_ORDER_INGRIDIENTS_DELAILS,
        ingridientsTotal: [
          {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
            uniqueId: 0.6283965720469556,
          },
          {
            _id: "60d3b41abdacab0026a733d4",
            name: "Сыр с астероидной плесенью",
            type: "main",
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: "https://code.s3.yandex.net/react/code/cheese.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/cheese-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/cheese-large.png",
            __v: 0,
            uniqueId: "757a1237-b927-4066-a444-9f08d1954857",
          },
        ],
      })
    ).toEqual(
      expect.objectContaining({
        ...initialOrderState,
        orderDetails: {
          ...initialOrderState.orderDetails,
          ingridients: [
            {
              _id: "60d3b41abdacab0026a733c7",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0,
              uniqueId: 0.6283965720469556,
            },
            {
              _id: "60d3b41abdacab0026a733d4",
              name: "Сыр с астероидной плесенью",
              type: "main",
              proteins: 84,
              fat: 48,
              carbohydrates: 420,
              calories: 3377,
              price: 4142,
              image: "https://code.s3.yandex.net/react/code/cheese.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/cheese-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/cheese-large.png",
              __v: 0,
              uniqueId: "757a1237-b927-4066-a444-9f08d1954857",
            },
          ],
        },
      })
    );
  });
});
