function fillUpConstructor() {
  cy.contains("Флюоресцентная булка R2-D3").trigger("dragstart");
  cy.get("[class^=burgerConstractor]").trigger("drop");

  cy.contains("Соус с шипами Антарианского плоскоходца").trigger("dragstart");
  cy.get("[class^=burgerConstractor]").trigger("drop");
}

describe("when on menu page", () => {
  before(function () {
    cy.visit("http://localhost:3000");
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
      setTimeout(() => fillUpConstructor(), 3000);
    });

    it("button is active", () => {
      cy.get("button").contains("Оформить заказ"); // fix
    });
  });

  describe("when constructor has order elements", () => {
    beforeEach(() => {
      setTimeout(() => fillUpConstructor(), 3000);
    });

    describe("when user is unauthorised", () => {
      it("when click order button prompts login page", () => {
        cy.get("button").contains("Оформить заказ").click();
        cy.url().should("eq", "http://localhost:3000/login");
      });
    });

    describe("when user is authorised", () => {
      beforeEach(() => {
        cy.get('input[name="email"]').type("test@gmail.com");
        cy.get('input[name="password"]').type("123456");
        cy.get("button").contains("Войти").click();
        cy.url().should("eq", "http://localhost:3000/");
      });

      it("when press order button it should send order payload to server", () => {
        cy.get("button").contains("Оформить заказ").click();
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

/// other file
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
