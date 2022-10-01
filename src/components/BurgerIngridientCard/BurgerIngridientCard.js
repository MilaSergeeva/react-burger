import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "../BurgerIngredients/burgerIngredients.module.css";
import { useEffect, useState } from "react";

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
      console.log("kra");
    } else {
      return;
    }
  }, [cartBurgerFillings, cartBurgerBuns]);

  return (
    // !isDrag && (
    <div
      ref={dragRef}
      className={BurgerIngredientsStyles.productCard}
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
        className="text text_type_main-default"
        style={{ textAlign: "center" }}
      >
        {el.name}
      </p>
    </div>
    // )
  );
}

BurgerIngridientCard.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientData.isRequired),
};

export default BurgerIngridientCard;
