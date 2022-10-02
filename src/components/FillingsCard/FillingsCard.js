import React, { useRef } from "react";
import BurgerConstructorStyles from "../BurgerConstructor/burgerConstructor.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { DELETE_FROM_CART_FILLING } from "../../services/actions/index";
import { ingridientData } from "../../utils/data";

function FillingsCard({ index, el, moveCard, id }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "fills",
    item: () => {
      return { id, index };
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "fills",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  //удаление ингридиента

  const handleDeleteFillingFromCart = (index) => {
    dispatch({ type: DELETE_FROM_CART_FILLING, index });
  };

  return (
    <li
      className={BurgerConstructorStyles.gridList}
      style={{ opacity }}
      ref={ref}
    >
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

FillingsCard.propTypes = {
  el: ingridientData,
  moveCard: PropTypes.func,
  index: PropTypes.string,
  id: PropTypes.string,
};

export default FillingsCard;
