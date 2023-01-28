import React, { useEffect, useRef } from "react";
import BurgerIngredientsStyles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngridientCard from "../BurgerIngridientCard/BurgerIngridientCard";
import { useSelector } from "react-redux";
import { IIngredient } from "../../services/types/types";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("buns");
  const buns = useRef() as React.MutableRefObject<HTMLInputElement>;
  const sauces = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fillings = useRef() as React.MutableRefObject<HTMLInputElement>;
  const containier = useRef() as React.MutableRefObject<HTMLInputElement>;

  const ingridients = useSelector(
    (state: any) => state.ingredientReducer.items
  );

  const getProductCard = (type: string) => {
    const filterdProductsArray = ingridients.filter(
      (el: IIngredient) => el.type === type
    );

    return filterdProductsArray.map((el: IIngredient) => (
      <div key={el._id} className="burgerIngridientCard">
        <BurgerIngridientCard el={el} />
      </div>
    ));
  };

  const scrollHandler = () => {
    if (
      buns.current &&
      sauces.current &&
      fillings.current &&
      containier.current
    ) {
      const containierPosition = containier.current.getBoundingClientRect().top;

      const bunsPosition =
        buns.current.getBoundingClientRect().top - containierPosition < 0
          ? (buns.current.getBoundingClientRect().top - containierPosition) * -1
          : buns.current.getBoundingClientRect().top - containierPosition;
      const saucesPosition =
        sauces.current.getBoundingClientRect().top - containierPosition < 0
          ? (sauces.current.getBoundingClientRect().top - containierPosition) *
            -1
          : sauces.current.getBoundingClientRect().top - containierPosition;
      const fillingsPosition =
        fillings.current.getBoundingClientRect().top - containierPosition < 0
          ? (fillings.current.getBoundingClientRect().top -
              containierPosition) *
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
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  const handleSmoothScroll = (value: string) => {
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
        <h1 className={BurgerIngredientsStyles.title}>Construct your burger</h1>

        <div className={BurgerIngredientsStyles.tabsBlock}>
          <Tab
            value="buns"
            active={current === "buns"}
            onClick={() => handleSmoothScroll("buns")}
          >
            Buns
            {/* Булки */}
          </Tab>
          <Tab
            value="sauces"
            active={current === "sauces"}
            onClick={() => handleSmoothScroll("sauces")}
          >
            Sausec
            {/* Соусы */}
          </Tab>
          <Tab
            value="fillings"
            active={current === "fillings"}
            onClick={() => handleSmoothScroll("fillings")}
          >
            Fillings
            {/* Начинки */}
          </Tab>
        </div>
      </div>

      <div ref={containier} className={BurgerIngredientsStyles.productsMenu}>
        <div ref={buns}>
          <h2>Buns</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("bun")}
          </div>
        </div>

        <div ref={sauces}>
          <h2>Sausec</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("sauce")}
          </div>
        </div>
        <div ref={fillings}>
          <h2>Fillings</h2>
          <div className={BurgerIngredientsStyles.typeProductSection}>
            {getProductCard("main")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
