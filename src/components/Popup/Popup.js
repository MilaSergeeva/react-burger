import React from "react";
import PopupStyles from "./Popup.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Popup({ product, onClose }) {
  console.log("product", product);

  if (!product) {
    return;
  }

  return (
    <div className={PopupStyles.overlay} style={product && { display: "flex" }}>
      <div className={PopupStyles.procuctCardContainier}>
        <div className={PopupStyles.popupHeader}>
          <h1 className="text text_type_main-large">Ingredient details</h1>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none" }}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={PopupStyles.productInfo}>
          <img src={product.image_large} />
          <h2>{product.name}</h2>
          <div className={PopupStyles.productCompound}>
            <p className={PopupStyles.productCompoundText}>
              Calories, cal
              <br />
              {product.calories}
            </p>
            <p className={PopupStyles.productCompoundText}>
              Proteins, g<br />
              {product.proteins}
            </p>
            <p className={PopupStyles.productCompoundText}>
              Fats, g<br />
              {product.fat}
            </p>
            <p className={PopupStyles.productCompoundText}>
              Carbohydrates, g<br />
              {product.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
