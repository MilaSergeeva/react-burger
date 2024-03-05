import React, { useState } from "react";
import forgotPasswordStyle from "../auth_forms.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/types/hooks";
import {
  getCodeToChangePassword,
  FORGOT_PASSWORD_ERROR,
} from "../../services/actions/auth";

import { useForm } from "../../hooks/useForm";

const ForgotPassword = () => {
  const { values, handleChange, setValues } = useForm({ email: "" });

  const history = useHistory();
  const dispatch = useDispatch();
  const formSubmit = useSelector(
    (state: any) => state.authReducer.auth.forgotFailed
  );

  const redirectToResetPassword = () => {
    history.push("/reset-password", { from: "forgot-password" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reg = /^\S+@\S+\.\S+$/;

    if (values.email?.match(reg)) {
      dispatch(getCodeToChangePassword(values, redirectToResetPassword));
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
        <h1 className={forgotPasswordStyle.formTitle}>Password recovery</h1>

        <Input
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        />

        {formSubmit && (
          <p className={forgotPasswordStyle.formError}>
            Something went wrong, please try again.
          </p>
        )}

        <Button type="primary" htmlType="submit" size="large" disabled={false}>
          Restore
        </Button>
      </form>
      <p className={forgotPasswordStyle.formText}>
        Remembered your password?
        <Link className={forgotPasswordStyle.link} to="/login">
          {" "}
          Login
        </Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
