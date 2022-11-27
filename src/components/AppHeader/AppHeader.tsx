import React from "react";
import appHeaderStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch, RouteProps } from "react-router-dom";

function AppHeader() {
  const isFeed = useRouteMatch("/feed");
  const isProfile = useRouteMatch("/profile");
  const isConstructor = useRouteMatch({ path: "/", exact: true });

  return (
    <header className={appHeaderStyles.headerFlex}>
      <div className={appHeaderStyles.headerContainier}>
        <nav className={appHeaderStyles.nav}>
          <NavLink
            to="/"
            className={`${appHeaderStyles.buttonText} ${
              appHeaderStyles.button
            } ${isConstructor && appHeaderStyles.textWhite}`}
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            {/* Constructor */}
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            className={` ${appHeaderStyles.buttonText} ${
              appHeaderStyles.button
            } ${isFeed && appHeaderStyles.textWhite}`}
          >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            {/* Order list */}
            Лента заказа
          </NavLink>
        </nav>
        <NavLink to="/" className={appHeaderStyles.logoAlign}>
          <Logo />
        </NavLink>

        <NavLink
          to="/profile"
          className={` ${appHeaderStyles.buttonText} ${
            appHeaderStyles.button
          } ${isProfile && appHeaderStyles.textWhite}`}
        >
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
          {/* Personal account */}
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
