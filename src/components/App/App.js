import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Popup from "../Popup/Popup";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);

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
        <BurgerConstructor onCardClick={handleCardClick} />
        <BurgerIngredients />
      </main>

      <Popup product={selectedIngridientCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
