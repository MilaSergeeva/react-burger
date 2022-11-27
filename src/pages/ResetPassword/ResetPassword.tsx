import React, { useState } from "react";
import resetPasswordStyle from "../auth_forms.module.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { saveNewPassword } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";

const ResetPassword = () => {
  const { values, handleChange, setValues } = useForm({
    password: "",
    token: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const formSubmit = useSelector(
    (state: any) => state.authReducer.auth.resetFailed
  );

  if (history.location.state === undefined) {
    return <Redirect to="/forgot-password" />;
  } else if (history.location?.state?.from !== "forgot-password") {
    return <Redirect to="/forgot-password" />;
  }

  const redirectToMainPage = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveNewPassword(values, redirectToMainPage));
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
          value={values.password || ""}
          onChange={handleChange}
          size={"default"}
        />
        <Input
          placeholder="Введите код из письма"
          type="text"
          name="token"
          value={values.token || ""}
          onChange={handleChange}
          size={"default"}
        />

        {formSubmit && (
          <p className={resetPasswordStyle.formError}>
            Что-то пошло не так, попробуйте еще раз.
          </p>
        )}

        <Button type="primary" htmlType="submit" size="large" disabled={false}>
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
