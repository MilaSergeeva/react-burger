import React from "react";
import loginStyle from "../auth_forms.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Login = ({ onLogin, onChange, loginData, messageOnLogin }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = loginData;

  //   if (!email || !password) {
  //     return;
  //   }

  //   onLogin(email, password);
  // };

  return (
    <section className={loginStyle.section}>
      {/* <div className="login__container">
        <div className="login__content"> */}
      <form
        method="POST"
        name="user-info"
        className={loginStyle.form}
        // onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={loginStyle.formTitle}>Вход</h1>
        <div className="login__input-container">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className={loginStyle.inputFild}
            minLength="5"
            maxLength="40"
            autoComplete="off"
            // value={loginData.email}
            // onChange={onChange}
            required
          />
          <span className="login__error"></span>
        </div>
        <div className="login__input-container">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={loginStyle.inputFild}
            minLength="2"
            maxLength="20"
            autoComplete="off"
            // value={loginData.password}
            // onChange={onChange}
            required
          />
          <span className="login__error"></span>
        </div>
        {/* <p className="login__form-error">{"messageOnLogin"}</p> */}
        <Button type="primary" size="large" disabled={false}>
          Войти
        </Button>
      </form>
      <p className={loginStyle.formText}>
        Вы - новый пользователь?
        <Link className={loginStyle.link} to="/register">
          {" "}
          Зарегистрироватся
        </Link>
      </p>
      <p className={loginStyle.formText}>
        Забыли пароль?
        <Link className={loginStyle.link} to="/forgot-password">
          {" "}
          Восстановить пароль
        </Link>
      </p>
      {/* </div>
      </div> */}
    </section>
  );
};

export default Login;
