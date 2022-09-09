import React from "react";
import BurgerIngredientsStyles from "./burgerIngredients.module.css";
import dataArray from "../../utils/data";
import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";

function BurgerIngredients({ ingridients, onButtonClick }) {
  return (
    <section className={BurgerIngredientsStyles.flexItem}>
      <ul className={BurgerIngredientsStyles.listContainier}>
        {ingridients.map((el) => (
          <li className={BurgerIngredientsStyles.grisList} key={el._id}>
            <DragIcon type="primary" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className={BurgerIngredientsStyles.total}>
        <div className={BurgerIngredientsStyles.price}>
          <p className="text text_type_digits-medium">630</p>
          <div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="large" onClick={onButtonClick}>
          {/* Place order */}
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientData.isRequired),
  onButtonClick: PropTypes.func,
};

export default BurgerIngredients;
