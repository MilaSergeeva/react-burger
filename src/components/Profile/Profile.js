import React from "react";
import profileStyle from "./profile.module.css";
import profileFormStyle from "../auth_components/auth_forms.module.css";
import {
  EditIcon,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  NavLink,
  useHistory,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/actions/index";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const redirectToLogin = () => {
    history.push("/login");
  };

  const { name, email } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(logOut(redirectToLogin));
  };
  return (
    <section className={profileStyle.section}>
      <div className={profileStyle.sideBar}>
        <nav className={profileStyle.sidebarMenu}>
          <NavLink
            to="/profile"
            exact
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
            className={`${profileStyle.navLink}`}
            activeClassName={profileStyle.navLinkActiv}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
            className={profileStyle.navLink}
            activeClassName={profileStyle.navLinkActiv}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/login"
            exact
            // className={isActive ? `${profileStyle.navLinkActiv}` :`${profileStyle.navLink}`}
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
              // onSubmit={handleSubmit}
              noValidate
            >
              <div className={profileStyle.inputConteinier}>
                <label for="name">Имя</label>
                <input
                  // value={regUserData.password}
                  type="name"
                  name="name"
                  placeholder={name}
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
                  placeholder={email}
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
        </Route>
        <Route path="/profile/orders" exact>
          <></>
        </Route>
      </Switch>
    </section>
  );
};

export default Profile;
