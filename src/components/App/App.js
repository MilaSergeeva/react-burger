import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className={appStyles.appBlock}>
      <AppHeader />
      <main className={appStyles.content}>
        <BurgerConstructor className={appStyles.flexItem} />
        <BurgerIngredients className={appStyles.flexItem} />
      </main>
    </div>
  );
}

export default App;
