import React from "react";
import PopupIngridientsStyle from "./IngredientDetails.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { ingridientData } from "../../utils/data";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

function IngredientDetails({ popupOpened, product, onClose }) {
  return (
    <Modal
      isOpened={popupOpened}
      header={"Ingridient details"}
      onClose={onClose}
    >
      {product && (
        <div className={PopupIngridientsStyle.productInfo}>
          <img src={product.image_large} alt={product.name} />
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
    </Modal>
  );
}

ModalOverlay.propTypes = {
  popupOpened: PropTypes.func,
  onClose: PropTypes.func,
  product: PropTypes.objectOf(ingridientData),
};

export default IngredientDetails;
