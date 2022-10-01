import React, { useEffect, useCallback } from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";
import { useSelector, useDispatch } from "react-redux";
import { ingredients } from "../../utils/api";
import { useDrop } from "react-dnd";
import FillingsCard from "../FillingsCard/FillingsCard";
import { DRAG_CART_INGREDIENT } from "../../services/actions/index";

function BurgerConstructor({ onButtonClick, onDropHandler }) {
  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );

  const dispatch = useDispatch();
  const cartBurgerBan = useSelector((state) => state.burgerConstructorList.bun);
  //расчет общей стоимости
  const priceTotalFillings = (arr) =>
    arr.reduce((acc, el) => acc + el.price, 0);

  const totalPrice =
    priceTotalFillings(cartBurgerFillings) +
    (cartBurgerBan === null ? 0 : cartBurgerBan.price * 2);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: "ingridients",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  //присвоение уникального номера
  const randomNr = (elId) => {
    return elId + Math.random();
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: DRAG_CART_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
    },
    [dispatch]
  );

  const renderFilling = useCallback((el, i) => {
    return (
      <FillingsCard key={randomNr(el._id)} index={i} el={el} id={el._id} />
    );
  }, []);

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
                moveCard={moveCard}
              />
            )}
          </div>
        </li>
        <DndProvider backend={HTML5Backend}>
          <ul className={BurgerConstructorStyles.listContainier}>
            {cartBurgerFillings.map((el, i) => renderFilling(el, i))}
          </ul>
        </DndProvider>
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
