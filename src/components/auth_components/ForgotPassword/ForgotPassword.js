import React from "react";
import forgotPasswordStyle from "../auth_forms.module.css";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
  return (
    <section className={forgotPasswordStyle.section}>
      <form
        method="POST"
        name="user-info"
        className={forgotPasswordStyle.form}
        // onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={forgotPasswordStyle.formTitle}>Восстановление пароля</h1>

        <div>
          <input
            // value={regUserData.email}
            type="email"
            name="email"
            placeholder="Укажите e-mail"
            className={forgotPasswordStyle.inputFild}
            minLength="5"
            maxLength="40"
            autoComplete="off"
            // onChange={onChange}
            required
          />
          <span></span>
        </div>

        {/* <p className="registration__form-error">{"messageOnRegister"}</p> */}
        <Button type="primary" size="large" disabled={false}>
          Зарегистрироватся
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
