import React, { useCallback, useEffect } from "react";
import BurgerConstructorStyles from "./burgerConstructor.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { useDrop } from "react-dnd";
import FillingsCard from "../FillingsCard/FillingsCard";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import {
  DRAG_CART_INGREDIENT,
  DELETE_FROM_CART_INGRIDIENTS,
  updateCartList,
} from "../../services/actions/ingredients";
import { DELETE_ORDER_NUMBER } from "../../services/actions/order";

import {
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  makeOrder,
} from "../../services/actions/order";

import { getCookie } from "../../utils/data";
import {
  IIngredient,
  TIngredientWithUniqueId,
} from "../../services/types/types";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const cartBurgerFillings = useSelector(
    (state: any) => state.ingredientReducer.burgerConstructorList.fillings
  );

  const cartBurgerBuns = useSelector(
    (state: any) => state.ingredientReducer.burgerConstructorList.bun
  );

  const orderDetails = useSelector(
    (state: any) => state.orderReducer.orderDetails
  );

  useEffect(() => {
    if (
      orderDetails.orderNumber !== undefined &&
      orderDetails.orderNumber !== ""
    ) {
      const orderNumber = orderDetails.orderNumber;

      dispatch({ type: DELETE_ORDER_NUMBER });
      history.push({
        pathname: `/current-order/${orderNumber}`,
        state: {
          background: location,
        },
      });

      dispatch({
        type: DELETE_FROM_CART_INGRIDIENTS,
      });
    }
  }, [orderDetails]);

  const cartBurgerBan = useSelector(
    (state: any) => state.ingredientReducer.burgerConstructorList.bun
  );

  const hasUser = getCookie("accessToken");

  ///////////////////////

  const burgerIngredients = (): string[] => {
    const ingridientsTotal: string[] = [];

    cartBurgerBuns !== null && ingridientsTotal.push(cartBurgerBuns._id);
    if (cartBurgerFillings.length >= 1) {
      cartBurgerFillings.forEach((element: IIngredient) => {
        ingridientsTotal.push(element._id);
      });
    }
    dispatch({ type: UPDATE_ORDER_INGRIDIENTS_DELAILS, ingridientsTotal });
    return ingridientsTotal;
  };

  const handleMakeAnOrder = async () => {
    if (hasUser) {
      await dispatch(makeOrder(burgerIngredients()));
    } else {
      history.push("/login");
    }
  };

  const onDropHandler = (item: IIngredient) => {
    dispatch(updateCartList(item));
  };

  //расчет общей стоимости
  const priceTotalFillings = (arr: IIngredient[]) =>
    arr.reduce((acc, el) => acc + el.price, 0);

  const totalPrice =
    priceTotalFillings(cartBurgerFillings) +
    (cartBurgerBan === null ? 0 : cartBurgerBan.price * 2);

  const [, dropRef] = useDrop({
    accept: "ingridients",
    drop(item: IIngredient) {
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

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: DRAG_CART_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const renderFilling = useCallback(
    (el: TIngredientWithUniqueId, i: number) => {
      return (
        <FillingsCard
          key={el.uniqueId}
          moveCard={moveCard}
          index={i}
          el={el}
          id={el.uniqueId}
        />
      );
    },
    []
  );

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
            {cartBurgerFillings.map((el: TIngredientWithUniqueId, i: number) =>
              renderFilling(el, i)
            )}
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
          htmlType="submit"
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
