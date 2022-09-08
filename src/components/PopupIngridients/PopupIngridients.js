import React from "react";
import PopupIngridientsStyle from "./PopupIngridiends.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function PopupIngridients({ product, onClose }) {
  console.log("product", product);

  if (!product) {
    return;
  }

  return (
    <div
      className={PopupIngridientsStyle.overlay}
      style={product && { display: "flex" }}
    >
      <div className={PopupIngridientsStyle.procuctCardContainier}>
        <div className={PopupIngridientsStyle.popupHeader}>
          <h1 className="text text_type_main-large">Ingredient details</h1>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none" }}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={PopupIngridientsStyle.productInfo}>
          <img src={product.image_large} />
          <h2>{product.name}</h2>
          <div className={PopupIngridientsStyle.productCompound}>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Calories, cal
              <br />
              {product.calories}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Proteins, g<br />
              {product.proteins}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Fats, g<br />
              {product.fat}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Carbohydrates, g<br />
              {product.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupIngridients;
