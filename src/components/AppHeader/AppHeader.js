import React from "react";
import appHeaderStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  Typography,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={appHeaderStyles.headerFlex}>
      <nav className={appHeaderStyles.nav}>
        <button
          className={appHeaderStyles.button}
          type="secondary"
          size="large"
        >
          <BurgerIcon type="primary" />
          <p
            className={`${appHeaderStyles.textWhite} ${appHeaderStyles.buttonText}`}
          >
            Constructor
          </p>
        </button>
        <button className={appHeaderStyles.button}>
          <ListIcon type="secondary" />
          <p
            className={`${appHeaderStyles.textPurpul} ${appHeaderStyles.buttonText}`}
          >
            Order list
          </p>
        </button>
      </nav>
      <div className={appHeaderStyles.logoAlign}>
        <Logo />
      </div>
      <button className={appHeaderStyles.button}>
        <ProfileIcon type="secondary" />
        <p
          className={`${appHeaderStyles.textPurpul} ${appHeaderStyles.buttonText}`}
        >
          Personal account
        </p>
      </button>
    </header>
  );
}

export default AppHeader;
