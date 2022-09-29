import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ADD_TO_CART_LIST } from "../../services/actions/index";

import { useDispatch } from "react-redux";
import { makeOrder } from "../../services/actions/index";
import { ingredients } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);
  const [ingridientPopupOpened, setIngridientPopupOpened] = useState(false);
  const [checkoutPopupOpened, setCheckoutPopupOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeOrder(ingredients));
  }, [dispatch]);

  const handleCardClick = (ingridient) => {
    setSelectedIngridientCard(ingridient);
    setIngridientPopupOpened(true);
  };

  const handleProceedOrder = (ingredients) => {
    setCheckoutPopupOpened(true);
  };

  function closeAllPopups() {
    setIngridientPopupOpened(false);
    setCheckoutPopupOpened(false);
  }

  const onDropHandler = (item) => {
    dispatch({ type: ADD_TO_CART_LIST, item });
  };

  return (
    <div className={appStyles.appBlock}>
      <AppHeader />

      <main className={appStyles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            // ingridients={ingridients.data}
            onCardClick={handleCardClick}
          />

          <BurgerConstructor
            onButtonClick={handleProceedOrder}
            onDropHendler={onDropHandler}
            // ingridients={ingridients.data}
          />
        </DndProvider>
      </main>

      <IngredientDetails
        product={selectedIngridientCard}
        popupOpened={ingridientPopupOpened}
        onClose={closeAllPopups}
      />
      <OrderDetails
        popupOpened={checkoutPopupOpened}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
