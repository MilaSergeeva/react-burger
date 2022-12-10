import React, { useState } from "react";
import loginStyle from "../auth_forms.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";

const Login = () => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const history = useHistory();

  const formSubmit = useSelector(
    (state: any) => state.authReducer.auth.loginFailed
  );

  const dispatch = useDispatch();

  const redirectToProfile = () => {
    history.push("/");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(values, redirectToProfile));
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
          value={values.email || ""}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={values.password || ""}
          onChange={handleChange}
        />

        {formSubmit && (
          <p className={loginStyle.formError}>
            Что-то пошло не так, попробуйте еще раз.
          </p>
        )}

        <Button type="primary" htmlType="submit" size="large" disabled={false}>
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
