const mockResponse = {
  success: true,
  name: "Space флюоресцентный бургер",
  order: {
    ingredients: [
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
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,
      },
    ],
    _id: "63d4378e936b17001be54797",
    owner: {
      name: "Milaaaam",
      email: "buka4a@gmail.com",
      createdAt: "2022-10-25T00:17:08.054Z",
      updatedAt: "2022-11-28T11:37:18.833Z",
    },
    status: "done",
    name: "Space флюоресцентный бургер",
    createdAt: "2023-01-27T20:43:58.040Z",
    updatedAt: "2023-01-27T20:43:58.472Z",
    number: 38367,
    price: 1068,
  },
};

function fillUpConstructor() {
  cy.contains("Флюоресцентная булка R2-D3").trigger("dragstart");
  cy.get("[class^=burgerConstractor]").trigger("drop");

  cy.contains("Соус с шипами Антарианского плоскоходца").trigger("dragstart");
  cy.get("[class^=burgerConstractor]").trigger("drop");
}

describe("when on menu page", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/#");
  });

  describe("when dnd elements from menu to constructor", () => {
    it("elements should appear in constructor", () => {
      cy.get("[class^=burgerConstractor]")
        .contains("Флюоресцентная булка R2-D3")
        .should("not.exist");

      cy.contains("Флюоресцентная булка R2-D3").trigger("dragstart");
      cy.get("[class^=burgerConstractor]").trigger("drop");

      cy.get("[class^=burgerConstractor]")
        .contains("Флюоресцентная булка R2-D3")
        .should("exist");

      cy.get("[class^=burgerConstractor]")
        .contains("Соус с шипами Антарианского плоскоходца")
        .should("not.exist");

      cy.contains("Соус с шипами Антарианского плоскоходца").trigger(
        "dragstart"
      );
      cy.get("[class^=burgerConstractor]").trigger("drop");

      cy.get("[class^=burgerConstractor]")
        .contains("Соус с шипами Антарианского плоскоходца")
        .should("exist");
    });
  });

  describe("when elements are in constructor", () => {
    beforeEach(() => {
      fillUpConstructor();
    });

    it("button is active", () => {
      cy.get("button").contains("Оформить заказ"); // fix
    });
  });

  describe("when constructor has order elements", () => {
    beforeEach(() => {
      fillUpConstructor();
    });

    describe("when user is unauthorised", () => {
      it("when click order button prompts login page", () => {
        cy.get("button").contains("Оформить заказ").click();
        cy.url().should("eq", "http://localhost:3000/#/login");
      });
    });

    describe("when user is authorised", () => {
      beforeEach(() => {
        cy.visit("http://localhost:3000/#/login");
        cy.get('input[name="email"]').type("test@gmail.com");
        cy.get('input[name="password"]').type("123456");
        cy.get("button").contains("Войти").click();
        cy.url().should("eq", "http://localhost:3000/#/");
        fillUpConstructor();

        cy.intercept(
          {
            method: "POST",
            url: "/api/orders",
          },
          mockResponse
        ).as("mockOrderResponse");
      });

      it.only("when press order button it should send order payload to server", () => {
        cy.get("button").contains("Оформить заказ").click();

        cy.wait("@mockOrderResponse").then(({ request, response }) => {
          console.log("here", request.body);
          console.log(response.body);

          cy.get("[class^=popup]").as("modal").should("exist");
          cy.get("@modal").contains("Ваш заказ начали готовить");
          cy.get("@modal").contains(
            "Дождитесь готовности на орбитальной станции"
          );

          cy.get("[class^=closeIcon]").click();
          cy.get("[class^=popup]").should("not.exist");
        });
      });
    });
  });
});

/// other file for login
// describe.only("login page", () => {
//   describe("when submit valid params", () => {
//     it("receives auth and refresh tokens", () => {});
//   });

//   describe("when submit invalid params", () => {
//     describe("when send empty payload", () => {
//       it("showns validation error", () => {});
//     });

//     describe("when send invalid credentials", () => {
//       it("shows validation error", () => {});
//     });
//   });
// });
