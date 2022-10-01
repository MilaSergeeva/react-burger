import React, { useEffect, useCallback } from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";
import { useSelector } from "react-redux";
import { ingredients } from "../../utils/api";
import { useDrop } from "react-dnd";
import FillingsCard from "../FillingsCard/FillingsCard";

function BurgerConstructor({ onButtonClick, onDropHandler }) {
  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );

  const cartBurgerBan = useSelector((state) => state.burgerConstructorList.bun);
  //расчет общей стоимости
  const priceTotalFillings = (arr) =>
    arr.reduce((acc, el) => acc + el.price, 0);

  const totalPrice =
    priceTotalFillings(cartBurgerFillings) +
    (cartBurgerBan === null ? 0 : cartBurgerBan.price * 2);

  const [{ item }, dropRef] = useDrop({
    accept: "ingridients",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => {
      return {
        item: monitor.getItem(),
      };
    },
  });

  //присвоение уникального номера
  const randomNr = (elId) => {
    return elId + Math.random();
  };

  return (
    <section className={BurgerConstructorStyles.flexItem}>
      <ul className={BurgerConstructorStyles.burgerList} ref={dropRef}>
        <li className={BurgerConstructorStyles.gridListBun}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minHeight: "90px",
            }}
          >
            <p></p>
            {cartBurgerBan !== null && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={cartBurgerBan.name}
                price={cartBurgerBan.price}
                thumbnail={cartBurgerBan.image}
              />
            )}
          </div>
        </li>

        <ul className={BurgerConstructorStyles.listContainier}>
          {cartBurgerFillings.map((el, i) => {
            return <FillingsCard key={randomNr(el._id)} index={i} el={el} />;
          })}
        </ul>

        <li className={BurgerConstructorStyles.gridListBun}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minHeight: "90px",
            }}
          >
            {cartBurgerBan !== null && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={cartBurgerBan.name}
                price={cartBurgerBan.price}
                thumbnail={cartBurgerBan.image}
              />
            )}
          </div>
        </li>
      </ul>
      <div className={BurgerConstructorStyles.total}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          disabled={
            cartBurgerBan === null || cartBurgerFillings.length < 1
              ? true
              : false
          }
          onClick={() => onButtonClick(ingredients)}
        >
          {/* Place order */}
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientData.isRequired),
  onButtonClick: PropTypes.func,
};

export default BurgerConstructor;
