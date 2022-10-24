import React from "react";
import PopupIngridientsStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import Modal from "../Modal/Modal";

function IngredientDetails() {
  let { id } = useParams();
  const allProducts = useSelector((state) => state.items);
  console.log(allProducts);

  const currentProduct = allProducts.find((el) => el._id === id);

  return (
    // <Modal
    //   isOpened={popupOpened}
    //   header={"Детали ингридиента"}
    //   onClose={onClose}
    // >
    <>
      {currentProduct && (
        <div className={PopupIngridientsStyle.currentProductInfo}>
          <img src={currentProduct.image_large} alt={currentProduct.name} />
          <h2>{currentProduct.name}</h2>
          <div className={PopupIngridientsStyle.currentProductCompound}>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Калории,калл
              <br />
              <span>{currentProduct.calories}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Белки, г
              <br />
              <span>{currentProduct.proteins}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Жиры, г
              <br />
              <span>{currentProduct.fat}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Углеводы, г
              <br />
              <span>{currentProduct.carbohydrates}</span>
            </p>
          </div>
        </div>
      )}
    </>
    // </Modal>
  );
}

IngredientDetails.propTypes = {
  popupOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
