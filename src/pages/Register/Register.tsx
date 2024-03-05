import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import registrationStyle from "../auth_forms.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { register } from "../../services/actions/auth";
import { useForm } from "../../hooks/useForm";

const Register: FC = (props) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const formSubmit = useSelector(
    (state: any) => state.authReducer.auth.registerFailed
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(values));
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
        <h1 className={registrationStyle.formTitle}>Registration</h1>
        <Input
          placeholder="Имя"
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
        />
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
          <p className={registrationStyle.formError}>
            Something went wrong, please try again.
          </p>
        )}

        <Button type="primary" htmlType="submit" size="large" disabled={false}>
          Sign in
        </Button>
      </form>
      <p className={registrationStyle.formText}>
        Are you already registered?
        <Link className={registrationStyle.link} to="/login">
          {" "}
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
