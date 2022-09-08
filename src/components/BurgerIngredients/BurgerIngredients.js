import React from "react";
import BurgerIngredientsStyles from "./burgerIngredients.module.css";
import dataArray from "../../utils/data";
import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  return (
    <section className={BurgerIngredientsStyles.flexItem}>
      <ul className={BurgerIngredientsStyles.listContainier}>
        {dataArray.map((el) => (
          <li className={BurgerIngredientsStyles.flexList} key={el._id}>
            <DragIcon type="primary" />
            <img
              src={el.image}
              style={{ width: 80, height: 40, marginLeft: 12 }}
            />
            <p
              className="text text_type_main-default"
              style={{ display: "flex", width: 254, alignItems: "center" }}
            >
              {el.name}
            </p>
            <div
              className={BurgerIngredientsStyles.price}
              style={{ width: 100 }}
            >
              <p className="text text_type_digits-default">{el.price}</p>
              <div>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <DeleteIcon type="primary" />
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
        <Button type="primary" size="large">
          Place order
        </Button>
      </div>
    </section>
  );
}

export default BurgerIngredients;
