import React, { useState } from "react";
import resetPasswordStyle from "../auth_forms.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  ShowIcon,
  HideIcon,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const [inputValue, setInputValue] = useState({
    password: "",
    token: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  // const { isResetPassword } = useSelector(userSelectors.authData);
  const refreshToken = localStorage.refreshToken;

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const redirectToMainPage = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(savePassword(inputValue, redirectToMainPage));
  };

  return (
    <section className={resetPasswordStyle.section}>
      <form
        method="POST"
        name="user-info"
        className={resetPasswordStyle.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={resetPasswordStyle.formTitle}>Восстановление пароля</h1>

        <PasswordInput
          name="password"
          value={inputValue.password || ""}
          onChange={handleChange}
          size={"default"}
        />
        <Input
          placeholder="Введите код из письма"
          type="text"
          name="token"
          value={inputValue.token || ""}
          onChange={handleChange}
          size={"default"}
        />

        <Button type="primary" size="large" disabled={false}>
          Сохранить
        </Button>
      </form>
      <p className={resetPasswordStyle.formText}>
        Вспомнили пароль?
        <Link className={resetPasswordStyle.link} to="/login">
          {" "}
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
