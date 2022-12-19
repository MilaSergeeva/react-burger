import { FC, memo } from "react";
import { IIngredient } from "../../services/types/types";
import styleOrderFeedIngredients from "./OderFeedIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TOderFeedIngredients = {
  ingredient: IIngredient;
  quantity: number;
};

const OderFeedIngredients: FC<TOderFeedIngredients> = ({
  ingredient,
  quantity,
}) => {
  const ingredientPrice =
    ingredient.type === "bun"
      ? `2 x ${ingredient.price}`
      : `${quantity} x ${ingredient.price}`;

  return (
    <section className={styleOrderFeedIngredients.section}>
      <div className={styleOrderFeedIngredients.container}>
        <img
          className={`mr-4 ${styleOrderFeedIngredients.img}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <span
          className={`text text_type_main-default mr-4 ${styleOrderFeedIngredients.ingredientName}`}
        >
          {ingredient.name}
        </span>
      </div>
      <div className={styleOrderFeedIngredients.container}>
        <div className={styleOrderFeedIngredients.containierPrice}>
          <span className="text text_type_digits-default">
            {ingredientPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default memo(OderFeedIngredients);
