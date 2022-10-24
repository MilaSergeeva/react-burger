import React, { useState } from "react";
import loginStyle from "../auth_forms.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  // const { logoutRequest } = useSelector(userSelectors.authData);
  const refreshToken = localStorage.refreshToken;
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(authorize(inputValue));
  };

  return (
    <section className={loginStyle.section}>
      <form
        method="POST"
        name="user-info"
        className={loginStyle.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={loginStyle.formTitle}>Вход</h1>
        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          value={inputValue.email || ""}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={inputValue.password || ""}
          onChange={handleChange}
        />

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
    </section>
  );
};

export default Login;
