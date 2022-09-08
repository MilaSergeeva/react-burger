import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);
  const [ingridientPopupOpened, setIngridientPopupOpened] = useState(false);
  const [checkoutPopupOpened, setCheckoutPopupOpened] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);

  const [ingridients, setIngridients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    setIngridients({ ...ingridients, hasError: false, isLoading: true });

    const ingridientsDataApi =
      "https://norma.nomoreparties.space/api/ingredients";

    fetch(ingridientsDataApi)
      .then((res) => res.json())
      .then((data) => {
        setIngridients({ ...ingridients, data: data.data, isLoading: false });
      })
      .catch((err) => {
        setIngridients({ ...ingridients, hasError: true, isLoading: false });
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  // закрытие модального окна по оверлей
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup")) {
      setClickedOutside(true);
      closeAllPopups();
    }
  };
  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    const elements = document.getElementsByClassName("popup");
    console.log(elements);

    for (const element of elements) {
      element.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      for (const element of elements) {
        element.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  //закрытие модального окна по esc
  useEffect(() => {
    function handleCloseByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
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
        onClick={handleClickInside}
      />
      <OrderDetails
        popupOpened={checkoutPopupOpened}
        onClose={closeAllPopups}
        onClick={handleClickInside}
      />
    </div>
  );
}

export default App;
