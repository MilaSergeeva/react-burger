import React from "react";
import appHeaderStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={appHeaderStyles.headerFlex}>
      <nav className={appHeaderStyles.nav}>
        <button
          className={`${appHeaderStyles.textWhite} ${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
        >
          <BurgerIcon type="primary" />
          Constructor
        </button>
        <button
          className={`${appHeaderStyles.textPurpul} ${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
        >
          <ListIcon type="secondary" />
          Order list
        </button>
      </nav>
      <div className={appHeaderStyles.logoAlign}>
        <Logo />
      </div>
      <button
        className={`${appHeaderStyles.textPurpul} ${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
      >
        <ProfileIcon type="secondary" />
        Personal account
      </button>
    </header>
  );
}

export default AppHeader;
