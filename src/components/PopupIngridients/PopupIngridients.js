import React from "react";
import PopupIngridientsStyle from "./PopupIngridiends.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ingridientData from "../../utils/data";
import PropTypes from "prop-types";

function PopupIngridients({ popupOpened, product, onClose }) {
  return (
    <ModalOverlay
      isOpened={popupOpened}
      header={"Ingridient details"}
      onClose={onClose}
    >
      {product && (
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
      )}
    </ModalOverlay>
  );
}

ModalOverlay.propTypes = {
  popupOpened: PropTypes.func,
  onClose: PropTypes.func,
  product: PropTypes.objectOf(ingridientData),
};

export default PopupIngridients;
