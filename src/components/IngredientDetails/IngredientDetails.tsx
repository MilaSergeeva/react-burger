import React from "react";
import PopupIngridientsStyle from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appStyles from "../App/app.module.css";
import { ITypeOfIngredient } from "../../utils/types";

function IngredientDetails() {
  const { id } = useParams() as {
    id: string;
  };
  const allProducts = useSelector(
    (state: any) => state.ingredientReducer.items
  );

  const currentProduct = allProducts.find(
    (el: ITypeOfIngredient) => el._id === id
  );

  return (
    <>
      {currentProduct ? (
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
      ) : (
        <div className={appStyles.loader} />
      )}
    </>
  );
}

export default IngredientDetails;
