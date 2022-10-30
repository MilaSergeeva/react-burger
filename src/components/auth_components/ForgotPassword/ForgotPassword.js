import React, { useState } from "react";
import forgotPasswordStyle from "../auth_forms.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCodeToChangePassword,
  FORGOT_PASSWORD_ERROR,
} from "../../../services/actions/auth";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const formSubmit = useSelector(
    (state) => state.authReducer.auth.forgotFailed
  );

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const redirectToResetPassword = () => {
    history.push("/reset-password", { from: "forgot-password" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let reg = /^\S+@\S+\.\S+$/;

    if (inputValue.email.match(reg)) {
      dispatch(getCodeToChangePassword(inputValue, redirectToResetPassword));
    } else dispatch({ type: FORGOT_PASSWORD_ERROR });
  };

  return (
    <section className={forgotPasswordStyle.section}>
      <form
        method="POST"
        name="user-info"
        className={forgotPasswordStyle.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={forgotPasswordStyle.formTitle}>Восстановление пароля</h1>

        <Input
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          value={inputValue.email || ""}
          onChange={handleChange}
        />

        {formSubmit && (
          <p className={forgotPasswordStyle.formError}>
            Что-то пошло не так, попробуйте еще раз.
          </p>
        )}

        <Button type="primary" htmlType="button" size="large" disabled={false}>
          Восстановить
        </Button>
      </form>
      <p className={forgotPasswordStyle.formText}>
        Вспомнили пароль?
        <Link className={forgotPasswordStyle.link} to="/login">
          {" "}
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
