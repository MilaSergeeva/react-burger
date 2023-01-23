describe("checking DnD functionality and orders", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("drag the ingredient and drop it into the burger constructor", function () {
    cy.get("[class^=burger-constructor_constructorElement__]")
      .contains("Флюоресцентная булка")
      .should("not.exist");

    cy.contains("Флюоресцентная булка").trigger("dragstart");
    cy.get("[class^=burger-constructor_constructorElement__]").trigger("drop");

    cy.get("[class^=burger-constructor_constructorElement__]")
      .contains("Флюоресцентная булка")
      .should("exist");
  });

  it("placing an order for nonAuth user", function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("pass authorization", function () {
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get("button").contains("Войти").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("placing an order for an authorized user and opening a modal order window", function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.get("[class^=modal]").as("modal").should("exist");
    cy.get("@modal").contains("Ваш заказ начали готовить");
    cy.get("@modal").contains("Дождитесь готовности на орбитальной станции");
  });

  it("close the modal window", function () {
    cy.get("[class^=modal_closeIcon__]").click();
    cy.get("[class^=modal]").should("not.exist");
  });
});
