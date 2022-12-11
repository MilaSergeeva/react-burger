import { FC } from "react";
import { useSelector } from "../../services/types/hooks";
import { useDrag } from "react-dnd";
import { ingridientData } from "../../utils/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "../BurgerIngredients/burgerIngredients.module.css";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../services/types/types";

type TCard<T> = {
  el: T;
};

const BurgerIngridientCard: FC<TCard<IIngredient>> = ({ el }) => {
  const location = useLocation();

  const { bun, counter } = useSelector(
    (state: any) => state.ingredientReducer.burgerConstructorList
  );

  const [, dragRef] = useDrag({
    type: "ingridients",
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  const quantity =
    bun && bun._id === el._id ? "2" : counter[el._id] !== 0 && counter[el._id];

  return (
    // !isDrag && (

    <Link
      ref={dragRef}
      className={BurgerIngredientsStyles.productCard}
      to={{
        pathname: `/ingridients/${el._id}`,
        state: { background: location },
      }}
    >
      <img src={el.image} alt={el.name} />
      {quantity && <Counter count={quantity} size="default" />}
      <div className={BurgerIngredientsStyles.price}>
        <p className="text text_type_digits-default">{el.price}</p>
        <div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <p
        className={`${BurgerIngredientsStyles.name} text text_type_main-default`}
      >
        {el.name}
      </p>
    </Link>
    // )
  );
};

export default BurgerIngridientCard;
