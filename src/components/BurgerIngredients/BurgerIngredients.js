import React, { useEffect } from "react";
import BurgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
// import { ingridientData } from "../../utils/data";
import { getItems } from "../../services/actions/index";
import BurgerIngridientCard from "../BurgerIngridientCard/BurgerIngridientCard.js";
import { useDispatch, useSelector } from "react-redux";

function BurgerIngredients({ onCardClick }) {
  const [current, setCurrent] = React.useState("buns");

  const dispatch = useDispatch();

  useEffect(() => dispatch(getItems()), [dispatch]);

  const ingridients = useSelector((state) => state.items);

  const gretProductCard = (type) => {
    const filterdProductsArray = ingridients.filter((el) => el.type === type);

    return filterdProductsArray.map((el) => (
      <div key={el._id}>
        <BurgerIngridientCard el={el} onCardClick={onCardClick} />
      </div>
    ));
  };

  return (
    <section className={BurgerIngredientsStyles.flexSection}>
      <div>
        <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>

        <div className={BurgerIngredientsStyles.tabsBlock}>
          <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
            Buns
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={setCurrent}
          >
            Sauces
          </Tab>
          <Tab
            value="fillings"
            active={current === "fillings"}
            onClick={setCurrent}
          >
            Fillings
          </Tab>
        </div>
      </div>

      <div className={BurgerIngredientsStyles.productsMenu}>
        <div>
          <h2>Buns</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {/* <BurgerIngridientCard type="bun" onCardClick={onCardClick} /> */}
            {gretProductCard("bun")}
          </div>
        </div>
        <div>
          <h2>Sauces</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {gretProductCard("sauce")}
            {/* <BurgerIngridientCard type="sauce" onCardClick={onCardClick} /> */}
          </div>
        </div>
        <div>
          <h2>Fillings</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {/* <BurgerIngridientCard type="main" onCardClick={onCardClick} /> */}
            {gretProductCard("main")}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  // ingridients: PropTypes.arrayOf(ingridientData.isRequired),
  onCardClick: PropTypes.func,
};

export default BurgerIngredients;
