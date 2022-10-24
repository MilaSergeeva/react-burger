import React from "react";
import { Link } from "react-router-dom";
import registrationStyle from "../auth_forms.module.css";
import {
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Register = (props) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const { email, password } = regUserData;

  //   onRegister(email, password);

  //   regUserData.email = "";
  //   regUserData.password = "";
  // };

  return (
    <section className={registrationStyle.section}>
      {/* <div className="registration__container">
        <div className="registration__content"> */}
      <form
        method="POST"
        name="user-info"
        className={registrationStyle.form}
        // onSubmit={handleSubmit}
        noValidate
      >
        <h1 className={registrationStyle.formTitle}>Регистрация</h1>
        <div>
          <input
            // value={regUserData.password}
            type="name"
            name="name"
            placeholder="Имя"
            className={registrationStyle.inputFild}
            minLength="2"
            maxLength="20"
            autoComplete="off"
            // onChange={onChange}
            required
          />
          <span></span>
        </div>
        <div>
          <input
            // value={regUserData.email}
            type="email"
            name="email"
            placeholder="E-mail"
            className={registrationStyle.inputFild}
            minLength="5"
            maxLength="40"
            autoComplete="off"
            // onChange={onChange}
            required
          />
          <span></span>
        </div>

        <div className={registrationStyle.inputConteinier}>
          <input
            // value={regUserData.password}
            type="password"
            name="password"
            placeholder="Пароль"
            className={registrationStyle.inputFild}
            minLength="2"
            maxLength="20"
            autoComplete="off"
            // onChange={onChange}
            required
          />
          <div className={registrationStyle.inputIcon}>
            <ShowIcon type="primary" />
          </div>
          <span></span>
        </div>
        {/* <p className="registration__form-error">{"messageOnRegister"}</p> */}
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
      {/* </div>
      </div> */}
    </section>
  );
};

export default Register;
