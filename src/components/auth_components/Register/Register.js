import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import registrationStyle from "../auth_forms.module.css";
import {
  Button,
  ShowIcon,
  HideIcon,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../services/actions/index";

const Register = (props) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const refreshToken = localStorage.refreshToken;

  const logoutRequest = useSelector((state) => state.auth.logoutRequest);
  const formSubmit = useSelector((state) => state.auth.registerFailed);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputValue));
  };

  return (
    <section className={registrationStyle.section}>
      <form
        method="POST"
        name="user-info"
        className={registrationStyle.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={registrationStyle.formTitle}>Регистрация</h1>
        <Input
          placeholder="Имя"
          type="text"
          name="name"
          value={inputValue.name || ""}
          onChange={handleChange}
        />
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

        {formSubmit && (
          <p className={registrationStyle.formError}>
            Что-то пошло не так, попробуйте еще раз.
          </p>
        )}

        <Button type="primary" size="large" disabled={false}>
          Зарегистрироватся
        </Button>
      </form>
      <p className={registrationStyle.formText}>
        Уже зарегистрированы?
        <Link className={registrationStyle.link} to="/login">
          {" "}
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
