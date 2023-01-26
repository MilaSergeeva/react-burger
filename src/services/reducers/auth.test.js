import { authReducer } from "./auth";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
} from "../actions/auth";

const initialAuthState = {
  user: {
    name: "",
    email: "",
  },

  auth: {
    userRequest: false,
    userFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    forgotRequest: false,
    forgotFailed: false,

    resetRequest: false,
    resetFailed: false,
  },
};

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialAuthState);
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(
      authReducer(initialAuthState, {
        type: REGISTER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          registerRequest: true,
        },
      })
    );
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: REGISTER_SUCCESS,
        data: {
          user: { email: "test@test.dr", name: "test" },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        user: {
          ...initialAuthState.user,
          name: "test",
          email: "test@test.dr",
        },
        auth: {
          ...initialAuthState.auth,
          registerRequest: false,
          registerFailed: false,
        },
      })
    );
  });

  it("should handle REGISTER_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: REGISTER_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          registerRequest: false,
          registerFailed: true,
        },
      })
    );
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      authReducer(initialAuthState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          loginRequest: true,
        },
      })
    );
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: LOGIN_SUCCESS,
        data: {
          user: { email: "test@test.dr", name: "test" },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        user: {
          name: "test",
          email: "test@test.dr",
        },
        auth: {
          ...initialAuthState.auth,
          loginRequest: false,
          loginFailed: false,
        },
      })
    );
  });

  it("should handle LOGIN_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: LOGIN_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          loginRequest: false,
          loginFailed: true,
        },
      })
    );
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      authReducer(initialAuthState, { type: FORGOT_PASSWORD_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          forgotRequest: true,
        },
      })
    );
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          forgotRequest: false,
          forgotFailed: false,
        },
      })
    );
  });

  it("should handle FORGOT_PASSWORD_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: FORGOT_PASSWORD_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          forgotRequest: false,
          forgotFailed: true,
        },
      })
    );
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      authReducer(initialAuthState, { type: RESET_PASSWORD_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          resetRequest: true,
        },
      })
    );
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: RESET_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          resetRequest: false,
          resetFailed: false,
        },
      })
    );
  });

  it("should handle RESET_PASSWORD_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: RESET_PASSWORD_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          resetRequest: false,
          resetFailed: true,
        },
      })
    );
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(authReducer(initialAuthState, { type: LOGOUT_REQUEST })).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          registerRequest: true,
        },
      })
    );
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        user: { name: "", email: "" },
        auth: {
          ...initialAuthState.auth,
          logoutRequest: false,
          logoutFailed: false,
        },
      })
    );
  });

  it("should handle LOGOUT_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: LOGOUT_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          logoutRequest: false,
          logoutFailed: true,
        },
      })
    );
  });

  it("should handle TOKEN_REQUEST", () => {
    expect(authReducer(initialAuthState, { type: TOKEN_REQUEST })).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          tokenRequest: true,
        },
      })
    );
  });

  it("should handle TOKEN_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: TOKEN_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          tokenRequest: false,
          tokenFailed: false,
        },
      })
    );
  });

  it("should handle TOKEN_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: TOKEN_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          tokenRequest: false,
          tokenFailed: true,
        },
      })
    );
  });

  it("should handle USER_UPDATE_REQUEST", () => {
    expect(
      authReducer(initialAuthState, { type: USER_UPDATE_REQUEST })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          updateUserRequest: true,
        },
      })
    );
  });

  it("should handle USER_UPDATE_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: USER_UPDATE_SUCCESS,
        data: {
          user: { email: "test@test.dr", name: "test" },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        user: {
          name: "test",
          email: "test@test.dr",
        },
        auth: {
          ...initialAuthState.auth,
          updateUserRequest: false,
          updateUserFailed: false,
        },
      })
    );
  });

  it("should handle USER_UPDATE_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: USER_UPDATE_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          updateUserRequest: false,
          updateUserFailed: true,
        },
      })
    );
  });

  it("should handle USER_REQUEST", () => {
    expect(authReducer(initialAuthState, { type: USER_REQUEST })).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          userRequest: true,
        },
      })
    );
  });

  it("should handle USER_SUCCESS", () => {
    expect(
      authReducer(initialAuthState, {
        type: USER_SUCCESS,
        data: {
          user: { email: "test@test.dr", name: "test" },
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        user: {
          name: "test",
          email: "test@test.dr",
        },
        auth: {
          ...initialAuthState.auth,
          userRequest: false,
          userFailed: false,
        },
      })
    );
  });

  it("should handle USER_ERROR", () => {
    expect(
      authReducer(initialAuthState, {
        type: USER_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialAuthState,
        auth: {
          ...initialAuthState.auth,
          userRequest: false,
          userFailed: true,
        },
      })
    );
  });
});
