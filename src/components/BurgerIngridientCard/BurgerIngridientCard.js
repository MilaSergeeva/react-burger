import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ingridientData } from "../../utils/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "../BurgerIngredients/burgerIngredients.module.css";

function BurgerIngridientCard({ onCardClick, el }) {
  const [{ item }, dragRef] = useDrag({
    type: "ingridients",
    item: el,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  return (
    // !isDrag && (
    <div
      ref={dragRef}
      className={BurgerIngredientsStyles.productCard}
      onClick={() => onCardClick(el)}
    >
      <img src={el.image} alt={el.name} />
      <Counter count={1} size="default" />
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
