import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { checkResponse, ingridientsDataApi } from "../../utils/data";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);
  const [ingridientPopupOpened, setIngridientPopupOpened] = useState(false);
  const [checkoutPopupOpened, setCheckoutPopupOpened] = useState(false);

  const [ingridients, setIngridients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setIngridients({ ...ingridients, hasError: false, isLoading: true });

    fetch(ingridientsDataApi)
      .then(checkResponse)
      .then((res) => res.json())
      .then((data) => {
        setIngridients({ ...ingridients, data: data.data, isLoading: false });
      })
      .catch((err) => {
        setIngridients({ ...ingridients, hasError: true, isLoading: false });
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  const handleCardClick = (ingridient) => {
    setSelectedIngridientCard(ingridient);
    setIngridientPopupOpened(true);
  };

  const handleProceedOrder = () => {
    setCheckoutPopupOpened(true);
  };

  function closeAllPopups() {
    setIngridientPopupOpened(false);
    setCheckoutPopupOpened(false);
  }

  return (
    <div className={appStyles.appBlock}>
      <AppHeader />

      <main className={appStyles.content}>
        <BurgerConstructor
          onCardClick={handleCardClick}
          ingridients={ingridients.data}
        />
        <BurgerIngredients
          ingridients={ingridients.data}
          onButtonClick={handleProceedOrder}
        />
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
