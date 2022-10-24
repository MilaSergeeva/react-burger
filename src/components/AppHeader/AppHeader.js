import React from "react";
import appHeaderStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch } from "react-router-dom";

function AppHeader() {
  const isFeed = useRouteMatch("/feed");
  const isProfile = useRouteMatch("/profile");
  const isConstructor = useRouteMatch({ path: "/", exact: "true" });

  return (
    <header className={appHeaderStyles.headerFlex}>
      <div className={appHeaderStyles.headerContainier}>
        <nav className={appHeaderStyles.nav}>
          <NavLink
            to="/"
            className={`${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
            style={isConstructor && { color: "#fff" }}
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            {/* Constructor */}
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            className={` ${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
            style={isFeed && { color: "#fff" }}
          >
            <ListIcon
              type={isFeed ? "primary" : "secondary"}
              style={isFeed && `color: '#fff'`}
            />
            {/* Order list */}
            Лента заказа
          </NavLink>
        </nav>
        <NavLink to="/" className={appHeaderStyles.logoAlign}>
          <Logo />
        </NavLink>
        <NavLink
          to="/profile"
          className={` ${appHeaderStyles.buttonText} ${appHeaderStyles.button}`}
          style={isProfile && { color: "#fff" }}
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
