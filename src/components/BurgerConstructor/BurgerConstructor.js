import React, { useCallback } from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import FillingsCard from "../FillingsCard/FillingsCard";
import { DRAG_CART_INGREDIENT } from "../../services/actions/index";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { UPDATE_ORDER_INGRIDIENTS_DELAILS } from "../../services/actions/index";
import { makeOrder, updateCartList } from "../../services/actions/index";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );

  const cartBurgerBuns = useSelector(
    (state) => state.burgerConstructorList.bun
  );

  const orderDetails = useSelector((state) => state.orderDetails);

  const cartBurgerBan = useSelector((state) => state.burgerConstructorList.bun);

  ///////////////////////

  const burgerIngredients = () => {
    const ingridientsTotal = [];

    cartBurgerBuns !== null && ingridientsTotal.push(cartBurgerBuns._id);
    if (cartBurgerFillings.length >= 1) {
      cartBurgerFillings.forEach((element) => {
        ingridientsTotal.push(element._id);
      });
    }
    dispatch({ type: UPDATE_ORDER_INGRIDIENTS_DELAILS, ingridientsTotal });
    return ingridientsTotal;
  };

  const handleMakeAnOrder = async () => {
    await dispatch(makeOrder(burgerIngredients()));

    const orderNumber = orderDetails.orderNumber.order.number;
    history.push({
      pathname: `/feed/${orderNumber}`,
      state: {
        background: location,
      },
    });
  };

  const onDropHandler = (item) => {
    dispatch(updateCartList(item));
  };

  //расчет общей стоимости
  const priceTotalFillings = (arr) =>
    arr.reduce((acc, el) => acc + el.price, 0);

  const totalPrice =
    priceTotalFillings(cartBurgerFillings) +
    (cartBurgerBan === null ? 0 : cartBurgerBan.price * 2);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: "ingridients",
    drop(item) {
      const itemWithId = { ...item, uniqueId: uuidv4() };
      onDropHandler(itemWithId);
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({
      type: DRAG_CART_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const renderFilling = useCallback((el, i) => {
    return (
      <FillingsCard
        key={el.uniqueId}
        moveCard={moveCard}
        index={i}
        el={el}
        id={el.uniqueId}
      />
    );
  }, []);

  return (
    <section className={BurgerConstructorStyles.flexItem}>
      <ul className={BurgerConstructorStyles.burgerList} ref={dropRef}>
        <li className={BurgerConstructorStyles.gridListBun}>
          <div className={BurgerConstructorStyles.flexContainier}>
            <p></p>
            {cartBurgerBan !== null && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${cartBurgerBan.name} (верх)`}
                price={cartBurgerBan.price}
                thumbnail={cartBurgerBan.image}
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
          <div className={BurgerConstructorStyles.flexContainier}>
            {cartBurgerBan !== null && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${cartBurgerBan.name} (низ)`}
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
          onClick={handleMakeAnOrder}
        >
          {/* Place order */}
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
