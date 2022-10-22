import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "../BurgerIngredients/burgerIngredients.module.css";
import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

function BurgerIngridientCard({ onCardClick, el }) {
  const [count, setCount] = useState("0");

  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );
  const cartBurgerBuns = useSelector(
    (state) => state.burgerConstructorList.bun
  );

  const [, dragRef] = useDrag({
    type: "ingridients",
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    if (cartBurgerFillings.length >= 1 && el.type !== "bun") {
      setCount(cartBurgerFillings.filter((item) => item._id === el._id).length);
    } else if (cartBurgerBuns !== null && cartBurgerBuns._id === el._id) {
      setCount(2);
    } else if (cartBurgerBuns !== null && el.type === "bun") {
      setCount(0);
    } else {
      return;
    }
  }, [cartBurgerFillings, cartBurgerBuns]);

  return (
    // !isDrag && (

    <Link
      ref={dragRef}
      className={BurgerIngredientsStyles.productCard}
      to={{ pathname: `/ingridients/${el._id}` }}
      onClick={() => onCardClick(el)}
    >
      <img src={el.image} alt={el.name} />
      {count > 0 && <Counter count={count} size="default" />}
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
}

BurgerIngridientCard.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  el: ingridientData.isRequired,
};

export default memo(BurgerIngridientCard);
