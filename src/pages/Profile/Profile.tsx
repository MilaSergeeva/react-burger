import React, { useState, useEffect } from "react";
import profileStyle from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  NavLink,
  useHistory,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  updateUserInfo,
  getUserInfo,
} from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const redirectToLogin = () => {
    history.push("/login");
  };

  const { name, email } = useSelector((state) => state.authReducer.user);
  const userInfoUpdateErr = useSelector(
    (state) => state.authReducer.auth.updateUserFailed
  );

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const historyName = name === values.name ? false : true;
  const historyEmail = email === values.email ? false : true;
  const historyPassword = values.password.length === 0 ? false : true;

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(updateUserInfo(values.name, values.email, values.password));
    setValues({
      ...values,
      password: "",
    });
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    setValues(
      (values: { name?: string; email?: string; password?: string }) => {
        return { ...values, name: name, email: email };
      }
    );
  }, [name, email]);

  const handleClick = () => {
    dispatch(logOut(redirectToLogin));
  };

  const handleDecline = () => {
    setValues({
      name: name,
      email: email,
      password: "",
    });
  };

  return (
    <section className={profileStyle.section}>
      <div className={profileStyle.sideBar}>
        <nav className={profileStyle.sidebarMenu}>
          <NavLink
            to="/profile"
            exact
            className={`${profileStyle.navLink}`}
            activeClassName={profileStyle.navLinkActiv}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact
            className={profileStyle.navLink}
            activeClassName={profileStyle.navLinkActiv}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/login"
            exact
            className={profileStyle.navLink}
            onClick={handleClick}
            activeClassName={profileStyle.navLinkActiv}
          >
            Выход
          </NavLink>
        </nav>
        {pathname === "/profile" && (
          <span className={profileStyle.sidebarMenuText}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        )}
        {pathname === "/profile/orders" && (
          <span className={profileStyle.sidebarMenuText}>
            В этом разделе вы можете просмотреть свою историю заказов{" "}
          </span>
        )}
      </div>
      <Switch>
        <Route path="/profile" exact>
          <div className={profileStyle.mainContainier}>
            <form
              method="POST"
              name="user-info"
              className={profileStyle.form}
              noValidate
            >
              <Input
                placeholder="Имя"
                type="text"
                name="name"
                icon="EditIcon"
                value={values.name || ""}
                onChange={handleChange}
                size={"default"}
              />
              <Input
                placeholder="Логин"
                type="email"
                name="email"
                icon="EditIcon"
                value={values.email || ""}
                onChange={handleChange}
                size={"default"}
              />
              <Input
                placeholder="Пароль"
                type="password"
                name="password"
                icon="EditIcon"
                value={values.password || ""}
                onChange={handleChange}
                size={"default"}
              />

              {userInfoUpdateErr && (
                <p className={profileStyle.formError}>
                  Что-то пошло не так, попробуйте еще раз.
                </p>
              )}
            </form>

            {(historyName || historyEmail || historyPassword) && (
              <div>
                <Button
                  onClick={handleDecline}
                  type="secondary"
                  size="medium"
                  htmlType="submit"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  size="small"
                  htmlType="submit"
                >
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </Route>
        <Route path="/profile/orders" exact>
          <></>
        </Route>
      </Switch>
    </section>
  );
};

export default Profile;
