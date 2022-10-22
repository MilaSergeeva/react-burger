import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { updateCartList } from "../../services/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../../services/actions/index";
import { ingredients } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UPDATE_ORDER_INGRIDIENTS_DELAILS } from "../../services/actions/index";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);
  const [ingridientPopupOpened, setIngridientPopupOpened] = useState(false);
  const [checkoutPopupOpened, setCheckoutPopupOpened] = useState(false);

  const dispatch = useDispatch();
  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );

  const cartBurgerBuns = useSelector(
    (state) => state.burgerConstructorList.bun
  );

  // useEffect(() => {
  //   dispatch(makeOrder(ingredients));
  // }, [dispatch]);

  const burgerIngridients = () => {
    const ingridientsTotal = [];

    cartBurgerBuns !== null && ingridientsTotal.push(cartBurgerBuns._id);
    if (cartBurgerFillings.length >= 1) {
      cartBurgerFillings.forEach((element) => {
        ingridientsTotal.push(element._id);
      });
    }
    dispatch({ type: UPDATE_ORDER_INGRIDIENTS_DELAILS, ingridientsTotal });
    return ingridientsTotal;
  };

  const handleCardClick = (ingridient) => {
    setSelectedIngridientCard(ingridient);
    setIngridientPopupOpened(true);
  };

  const handleProceedOrder = (burgerIngredients) => {
    dispatch(makeOrder(burgerIngredients()));

    setCheckoutPopupOpened(true);
  };

  function closeAllPopups() {
    setIngridientPopupOpened(false);
    setCheckoutPopupOpened(false);
  }

  const onDropHandler = (item) => {
    dispatch(updateCartList(item));
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
            onButtonClick={() => handleProceedOrder(burgerIngridients)}
            onDropHandler={onDropHandler}
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
