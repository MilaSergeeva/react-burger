import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import PopupIngridients from "../PopupIngridients/PopupIngridients";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);

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
        console.log(data, "kra");
        setIngridients({ ...ingridients, data: data.data, isLoading: false });
      })
      .catch((err) => {
        setIngridients({ ...ingridients, hasError: true, isLoading: false });
        console.log(err); // выведем ошибку в консоль
      });
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
  };

  function closeAllPopups(event) {
    setSelectedIngridientCard(false);
  }

  return (
    <div className={appStyles.appBlock}>
      <AppHeader />

      <main className={appStyles.content}>
        <BurgerConstructor
          onCardClick={handleCardClick}
          ingridients={ingridients.data}
        />
        <BurgerIngredients ingridients={ingridients.data} />
      </main>

      <PopupIngridients
        product={selectedIngridientCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
