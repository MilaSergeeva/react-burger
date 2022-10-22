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
      header={"Детали ингридиента"}
      onClose={onClose}
    >
      {product && (
        <div className={PopupIngridientsStyle.productInfo}>
          <img src={product.image_large} alt={product.name} />
          <h2>{product.name}</h2>
          <div className={PopupIngridientsStyle.productCompound}>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Калории,калл
              <br />
              {product.calories}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Белки, г
              <br />
              {product.proteins}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Жиры, г
              <br />
              {product.fat}
            </p>
            <p className={PopupIngridientsStyle.productCompoundText}>
              Углеводы, г
              <br />
              {product.carbohydrates}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

IngredientDetails.propTypes = {
  popupOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
