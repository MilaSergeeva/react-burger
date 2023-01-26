import { ingredientReducer } from "./ingredients";
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_TO_CART_FILLING,
  ADD_TO_CART_BUN,
  DELETE_FROM_CART_BUN,
  DELETE_FROM_CART_FILLING,
  INCREASE_FILLINGS_COUNTER,
  DECREASE_FILLINGS_COUNTER,
  DELETE_FROM_CART_INGRIDIENTS,
  DRAG_CART_INGREDIENT,
} from "../actions/ingredients";

const initialIngredientState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  burgerConstructorList: {
    bun: null,
    fillings: [],
    counter: {},
  },
};

describe("ingredientReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialIngredientState);
  });

  it("should handle GET_ITEMS_REQUEST", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: GET_ITEMS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsRequest: true,
      })
    );
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: GET_ITEMS_SUCCESS,
        items: [{}],
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsFailed: false,
        items: [{}],
        itemsRequest: false,
      })
    );
  });

  it("should handle GET_ITEMS_FAILED", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: GET_ITEMS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsFailed: true,
        itemsRequest: false,
      })
    );
  });

  // it("should handle GET_VIEWED_INGREDIENT", () => {
  //   expect(
  //     ingredientReducer(initialIngredientState, {
  //       type: GET_VIEWED_INGREDIENT,
  //       item: {},
  //     })
  //   ).toEqual(
  //     expect.objectContaining({
  //       ...initialIngredientState,
  //       viewedIngredient: {},
  //     })
  //   );
  // });

  it("should handle ADD_TO_CART_FILLING", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: ADD_TO_CART_FILLING,
        item: {
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
          image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
          __v: 0,
          uniqueId: "757a1237-b927-4066-a444-9f08d1954857",
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          fillings: [
            ...initialIngredientState.burgerConstructorList.fillings,
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

  it("should handle ADD_TO_CART_BUN", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: ADD_TO_CART_BUN,
        item: {
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
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          __v: 0,
          uniqueId: "30ab9964-8a50-4b9c-a4d0-651874b3ea18",
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          bun: {
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
            uniqueId: "30ab9964-8a50-4b9c-a4d0-651874b3ea18",
          },
        },
      })
    );
  });

  it("should handle DELETE_FROM_CART_FILLING", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: DELETE_FROM_CART_FILLING,
        index: 2,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          fillings: [
            ...initialIngredientState.burgerConstructorList.fillings.slice(
              0,
              2
            ),
            ...initialIngredientState.burgerConstructorList.fillings.slice(
              2 + 1
            ),
          ],
        },
      })
    );
  });

  it("should handle DELETE_FROM_CART_BUN", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: DELETE_FROM_CART_BUN,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          bun: null,
        },
      })
    );
  });

  it("should handle DELETE_FROM_CART_INGRIDIENTS", () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: DELETE_FROM_CART_INGRIDIENTS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          fillings: [],
          bun: null,
          counter: {},
        },
      })
    );
  });

  it("should handle INCREASE_FILLINGS_COUNTER", () => {
    expect(
      ingredientReducer(
        {
          ...initialIngredientState,
          burgerConstructorList: {
            ...initialIngredientState.burgerConstructorList,
            fillings: [
              "60d3b41abdacab0026a733cd",
              "60d3b41abdacab0026a733cd",
              "60d3b41abdacab0026a733fv",
              "60d3b41abdacab0026a733nh",
            ],
          },
        },
        {
          type: INCREASE_FILLINGS_COUNTER,
          item: {
            _id: "60d3b41abdacab0026a733cd",
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
        }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          fillings: [
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733fv",
            "60d3b41abdacab0026a733nh",
          ],
          counter: {
            ...initialIngredientState.burgerConstructorList.counter,
            "60d3b41abdacab0026a733cd": 2,
            "60d3b41abdacab0026a733fv": 1,
            "60d3b41abdacab0026a733nh": 1,
          },
        },
      })
    );
  });

  it("should handle DECREASE_FILLINGS_COUNTER", () => {
    expect(
      ingredientReducer(
        {
          ...initialIngredientState,
          burgerConstructorList: {
            ...initialIngredientState.burgerConstructorList,
            counter: { "60d3b41abdacab0026a733cd": 10 },
          },
        },
        {
          type: DECREASE_FILLINGS_COUNTER,
          id: "60d3b41abdacab0026a733cd",
        }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          counter: {
            ...initialIngredientState.burgerConstructorList.counter,
            "60d3b41abdacab0026a733cd": 9,
          },
        },
      })
    );
  });

  it("should handle DRAG_CART_INGREDIENT", () => {
    expect(
      ingredientReducer(
        {
          ...initialIngredientState,
          burgerConstructorList: {
            ...initialIngredientState.burgerConstructorList,
            fillings: [
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
              {
                _id: "60d3b41abdacab0026a733cb",
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: "https://code.s3.yandex.net/react/code/meat-01.png",
                image_mobile:
                  "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                image_large:
                  "https://code.s3.yandex.net/react/code/meat-01-large.png",
                __v: 0,
                uniqueId: "5c8713fe-b636-4fbe-9922-e6a52eaeba6b",
              },
            ],
          },
        },
        {
          type: DRAG_CART_INGREDIENT,
          dragIndex: 1,
          hoverIndex: 0,
        }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        burgerConstructorList: {
          ...initialIngredientState.burgerConstructorList,
          fillings: [
            {
              _id: "60d3b41abdacab0026a733cb",
              name: "Биокотлета из марсианской Магнолии",
              type: "main",
              proteins: 420,
              fat: 142,
              carbohydrates: 242,
              calories: 4242,
              price: 424,
              image: "https://code.s3.yandex.net/react/code/meat-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
              __v: 0,
              uniqueId: "5c8713fe-b636-4fbe-9922-e6a52eaeba6b",
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
