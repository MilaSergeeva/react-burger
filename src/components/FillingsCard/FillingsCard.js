import React from "react";
import BurgerConstructorStyles from "../BurgerConstructor/burgerConstructor.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DELETE_FROM_CART_FILLING } from "../../services/actions/index";

function FillingsCard({ index, el, onClick }) {
  const dispatch = useDispatch();

  const [{ item }, dragRef] = useDrag({
    type: "ingridients",
    // item: el,
    // collect: (monitor) => ({
    //   isDrag: monitor.isDragging(),
    //   item: monitor.getItem(),
    // }),
  });

  //удаление ингридиента

  const handleDeleteFillingFromCart = (index) => {
    dispatch({ type: DELETE_FROM_CART_FILLING, index });
  };

  return (
    <li className={BurgerConstructorStyles.gridList} ref={dragRef}>
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
          handleClose={() => handleDeleteFillingFromCart(index)}
        />
      </div>
    </li>
  );
}

export default FillingsCard;
