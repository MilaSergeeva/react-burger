import React from "react";
import PopupIngridientsStyle from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import appStyles from "../App/app.module.css";
import { IIngredient } from "../../services/types/types";

function IngredientDetails() {
  const { id } = useParams() as {
    id: string;
  };
  const allProducts = useSelector(
    (state: any) => state.ingredientReducer.items
  );

  const currentProduct = allProducts.find((el: IIngredient) => el._id === id);

  return (
    <>
      {currentProduct ? (
        <div className={PopupIngridientsStyle.currentProductInfo}>
          <img src={currentProduct.image_large} alt={currentProduct.name} />
          <h2>{currentProduct.name}</h2>
          <div className={PopupIngridientsStyle.currentProductCompound}>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Calories, kcal
              <br />
              <span>{currentProduct.calories}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Protein, g
              <br />
              <span>{currentProduct.proteins}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Fat, g
              <br />
              <span>{currentProduct.fat}</span>
            </p>
            <p className={PopupIngridientsStyle.currentProductCompoundText}>
              Carbohydrate, g
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
