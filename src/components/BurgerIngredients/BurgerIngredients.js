import React, { useEffect, useRef } from "react";
import BurgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import BurgerIngridientCard from "../BurgerIngridientCard/BurgerIngridientCard.js";
import { useDispatch, useSelector } from "react-redux";

function BurgerIngredients({ onCardClick }) {
  const [current, setCurrent] = React.useState("buns");
  const buns = useRef();
  const sauces = useRef();
  const fillings = useRef();
  const containier = useRef();

  const dispatch = useDispatch();

  const ingridients = useSelector((state) => state.items);

  const getProductCard = (type) => {
    const filterdProductsArray = ingridients.filter((el) => el.type === type);

    return filterdProductsArray.map((el) => (
      <div key={el._id}>
        <BurgerIngridientCard el={el} onCardClick={onCardClick} />
      </div>
    ));
  };

  const scrollHandler = () => {
    const containierPosition = containier.current.getBoundingClientRect().top;

    const bunsPosition =
      buns.current.getBoundingClientRect().top - containierPosition < 0
        ? (buns.current.getBoundingClientRect().top - containierPosition) * -1
        : buns.current.getBoundingClientRect().top - containierPosition;
    const saucesPosition =
      sauces.current.getBoundingClientRect().top - containierPosition < 0
        ? (sauces.current.getBoundingClientRect().top - containierPosition) * -1
        : sauces.current.getBoundingClientRect().top - containierPosition;
    const fillingsPosition =
      fillings.current.getBoundingClientRect().top - containierPosition < 0
        ? (fillings.current.getBoundingClientRect().top - containierPosition) *
          -1
        : fillings.current.getBoundingClientRect().top - containierPosition;

    if (
      Math.abs(bunsPosition) < Math.abs(saucesPosition) &&
      Math.abs(bunsPosition) < Math.abs(fillingsPosition)
    ) {
      setCurrent("buns");
    } else if (
      Math.abs(fillingsPosition) < Math.abs(bunsPosition) &&
      Math.abs(fillingsPosition) < Math.abs(saucesPosition)
    ) {
      setCurrent("fillings");
    } else if (
      Math.abs(saucesPosition) < Math.abs(bunsPosition) &&
      Math.abs(saucesPosition) < Math.abs(fillingsPosition)
    ) {
      setCurrent("sauces");
    } else setCurrent("buns");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  const handleSmoothScroll = (value) => {
    if (value === "fillings") {
      fillings.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "sauces") {
      sauces.current.scrollIntoView({ behavior: "smooth" });
    } else {
      buns.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={BurgerIngredientsStyles.flexSection}>
      <div>
        <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>

        <div className={BurgerIngredientsStyles.tabsBlock}>
          <Tab
            value="buns"
            active={current === "buns"}
            onClick={() => handleSmoothScroll("buns")}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={() => handleSmoothScroll("sauces")}
          >
            Соусы
          </Tab>
          <Tab
            value="fillings"
            active={current === "fillings"}
            onClick={() => handleSmoothScroll("fillings")}
          >
            Начинки
          </Tab>
        </div>
      </div>

      <div ref={containier} className={BurgerIngredientsStyles.productsMenu}>
        <div ref={buns}>
          <h2>Булки</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("bun")}
          </div>
        </div>

        <div ref={sauces}>
          <h2>Соусы</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("sauce")}
          </div>
        </div>
        <div ref={fillings}>
          <h2>Начинки</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("main")}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onCardClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
