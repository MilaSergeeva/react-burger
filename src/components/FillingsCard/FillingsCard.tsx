import React, { useRef, FC } from "react";
import BurgerConstructorStyles from "../BurgerConstructor/burgerConstructor.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  DELETE_FROM_CART_FILLING,
  DECREASE_FILLINGS_COUNTER,
} from "../../services/actions/ingredients";
import {
  TFillingsCardIngredientProps,
  TFillingsCardIngredientIndex,
} from "./fillingsCardType";
import { TIngredientWithUniqueId } from "../../utils/types";

const FillingsCard: FC<
  TFillingsCardIngredientProps<TIngredientWithUniqueId>
> = ({ index, el, moveCard, id }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "fills",
    item: () => {
      return { id, index };
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "fills",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: TFillingsCardIngredientIndex, monitor) => {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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

  const handleDeleteFillingFromCart = (index: number, id: string) => {
    dispatch({ type: DECREASE_FILLINGS_COUNTER, id });
    dispatch({ type: DELETE_FROM_CART_FILLING, index });
  };

  return (
    <li
      className={BurgerConstructorStyles.gridList}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <div className={BurgerConstructorStyles.flexConstractorElement}>
        <ConstructorElement
          text={el.name}
          price={el.price}
          thumbnail={el.image}
          handleClose={() => handleDeleteFillingFromCart(index, el._id)}
        />
      </div>
    </li>
  );
};

export default FillingsCard;
