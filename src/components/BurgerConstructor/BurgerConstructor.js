import React, { useEffect } from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
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
import { useSelector } from "react-redux";
import { ingredients } from "../../utils/api";
import { useDrop } from "react-dnd";

function BurgerConstructor({ onButtonClick, onDropHandler }) {
  const cartIngridients = useSelector((state) => state.burgerConstructorList);

  // const bun = ingridients[0];

  // const burgerFillings = ingridients.slice(1, ingridients.length() - 1);
  // console.log(burgerFillings);
  const [{ item }, dropRef] = useDrop({
    accept: "ingridients",
    drop(item) {
      console.log(item);
      onDropHandler(item);
    },
    collect: (monitor) => {
      return {
        item: monitor.getItem(),
      };
    },
  });

  return (
    <section className={BurgerConstructorStyles.flexItem}>
      <ul className={BurgerConstructorStyles.burgerList} ref={dropRef}>
        <li className={BurgerConstructorStyles.gridListBun}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p></p>
            <ConstructorElement
              type="top"
              isLocked={true}
              // text={item.name}
              // price={item.price}
              // thumbnail={item.image}
            />
          </div>
        </li>
        <ul className={BurgerConstructorStyles.listContainier}>
          {cartIngridients.map((el) => (
            <li className={BurgerConstructorStyles.gridList} key={el._id}>
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
        <li className={BurgerConstructorStyles.gridListBun}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              // text={ingridients[0].name}
              // price={ingridients[0].price}
              // thumbnail={ingridients[0].image}
            />
          </div>
        </li>
      </ul>
      <div className={BurgerConstructorStyles.total}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">630</p>
          <div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          type="primary"
          size="large"
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
