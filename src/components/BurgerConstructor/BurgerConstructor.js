import React from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingridientData from "../../utils/data";

function BurgerConstructor({ onCardClick, ingridients }) {
  const [current, setCurrent] = React.useState("buns");

  const gretProductCard = (type) => {
    const filterdProductsArray = ingridients.filter((el) => el.type === type);

    return filterdProductsArray.map((el) => (
      <div
        className={BurgerConstructorStyles.productCard}
        key={el._id}
        // onClick={() => togglePopupWithProduct(el)}
        ingridient={el}
        onClick={() => onCardClick(el)}
      >
        <img src={el.image} />
        <Counter count={1} size="default" />
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-default">{el.price}</p>
          <div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p
          className="text text_type_main-default"
          style={{ textAlign: "center" }}
        >
          {el.name}
        </p>
      </div>
    ));
  };

  return (
    <section className={BurgerConstructorStyles.flexSection}>
      <div>
        <h1 className={BurgerConstructorStyles.title}>Assemble a burger</h1>

        <div className={BurgerConstructorStyles.tabsBlock}>
          <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
            Buns
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={setCurrent}
          >
            Sauces
          </Tab>
          <Tab
            value="fillings"
            active={current === "fillings"}
            onClick={setCurrent}
          >
            Fillings
          </Tab>
        </div>
      </div>

      <div className={BurgerConstructorStyles.productsMenu}>
        <div>
          <h2>Buns</h2>
          <div className={BurgerConstructorStyles.typeProductSection}>
            {gretProductCard("bun")}
          </div>
        </div>
        <div>
          <h2>Sauces</h2>
          <div className={BurgerConstructorStyles.typeProductSection}>
            {gretProductCard("sauce")}
          </div>
        </div>
        <div>
          <h2>Fillings</h2>
          <div className={BurgerConstructorStyles.typeProductSection}>
            {gretProductCard("main")}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientData.isRequired),
  onCardClick: PropTypes.func,
};

export default BurgerConstructor;