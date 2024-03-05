import React, { useState } from "react";
import loginStyle from "../auth_forms.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/hooks";
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
        <h1 className={loginStyle.formTitle}>Login</h1>
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
            Something went wrong, please try again.
          </p>
        )}

        <Button type="primary" htmlType="submit" size="large" disabled={false}>
          Login
        </Button>
      </form>
      <p className={loginStyle.formText}>
        Are you a new user?
        <Link className={loginStyle.link} to="/register">
          {" "}
          Register
        </Link>
      </p>
      <p className={loginStyle.formText}>
        Forgot your password?
        <Link className={loginStyle.link} to="/forgot-password">
          {" "}
          Reset password
        </Link>
      </p>
    </section>
  );
};

export default Login;
