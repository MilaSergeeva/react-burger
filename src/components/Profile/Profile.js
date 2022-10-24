import React from "react";
import profileStyle from "./profile.module.css";
import profileFormStyle from "../auth_components/auth_forms.module.css";
import {
  EditIcon,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";

const Profile = () => {
  return (
    <section className={profileStyle.section}>
      <div className={profileStyle.sideBar}>
        <nav className={profileStyle.sidebarMenu}>
          <NavLink
            to="/profile"
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
            className={`${profileStyle.navLink} ${profileStyle.navLinkActiv}`}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
            className={profileStyle.navLink}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/profile"
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
            className={profileStyle.navLink}
          >
            Выход
          </NavLink>
        </nav>
        <p className={profileStyle.sidebarMenuText}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={profileStyle.mainContainier}>
        <form
          method="POST"
          name="user-info"
          className={`${profileFormStyle.form} ${profileStyle.form} `}
          // onSubmit={handleSubmit}
          noValidate
        >
          <div className={profileStyle.inputConteinier}>
            <label for="name">Имя</label>
            <input
              // value={regUserData.password}
              type="name"
              name="name"
              placeholder="Марк"
              className={profileStyle.inputFild}
              minLength="2"
              maxLength="20"
              autoComplete="off"
              // onChange={onChange}
              required
            />
            <div className={profileStyle.inputIcon}>
              <EditIcon type="primary" />
            </div>
            <span></span>
          </div>
          <div className={profileStyle.inputConteinier}>
            <label for="name">Логин</label>
            <input
              // value={regUserData.email}
              type="login"
              name="login"
              placeholder="mail@stellar.burger"
              className={profileStyle.inputFild}
              minLength="5"
              maxLength="40"
              autoComplete="off"
              // onChange={onChange}
              required
            />
            <div className={profileStyle.inputIcon}>
              <EditIcon type="primary" />
            </div>
            <span></span>
          </div>

          <div className={profileStyle.inputConteinier}>
            <label for="password">Пароль</label>
            <input
              // value={regUserData.password}
              type="password"
              name="password"
              placeholder="*********"
              className={profileStyle.inputFild}
              minLength="2"
              maxLength="20"
              autoComplete="off"
              // onChange={onChange}
              required
            />
            <div className={profileStyle.inputIcon}>
              <EditIcon type="primary" />
            </div>
            <span></span>
          </div>
          {/* <p className="registration__form-error">{"messageOnRegister"}</p> */}
        </form>
      </div>
    </section>
  );
};

export default Profile;
