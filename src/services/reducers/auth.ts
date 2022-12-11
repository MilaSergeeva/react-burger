import { TAuthActions } from "../actions/auth";

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

type TInitAuthState = {
  user: {
    name: string,
    email: string,
  },

  auth: {
    userRequest: boolean,
    userFailed: boolean,

    updateUserRequest: boolean,
    updateUserFailed: boolean,

    tokenRequest: boolean,
    tokenFailed: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    registerRequest: boolean,
    registerFailed: boolean,

    loginRequest: boolean,
    loginFailed: boolean,

    forgotRequest: boolean,
    forgotFailed: boolean,

    resetRequest: boolean,
    resetFailed: boolean,
  },
};

const initialAuthState: TInitAuthState = {
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

export const authReducer = (state = initialAuthState, action: TAuthActions) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: true,
        },
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: false,
          updateUserFailed: false,
          name: action.data.user.name,
          email: action.data.user.email,
        },
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          updateUserRequest: false,
          updateUserFailed: true,
        },
      };
    }

    case USER_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          userRequest: true,
        },
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.data.user.name,
          email: action.data.user.email,
        },
        auth: {
          ...state.auth,
          userRequest: false,
          userFailed: false,
        },
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          userRequest: false,
          userFailed: true,
        },
      };
    }

    case TOKEN_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenRequest: true,
        },
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenRequest: false,
          tokenFailed: false,
        },
      };
    }
    case TOKEN_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          tokenRequest: false,
          tokenFailed: true,
        },
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: true,
        },
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: { name: "", email: "" },
        auth: {
          ...state.auth,
          logoutRequest: false,
          logoutFailed: false,
        },
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          logoutRequest: false,
          logoutFailed: true,
        },
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: true,
        },
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,

          name: action.data.user.name,
          email: action.data.user.email,
        },
        auth: {
          ...state.auth,
          registerRequest: false,
          registerFailed: false,
        },
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          registerRequest: false,
          registerFailed: true,
        },
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          loginRequest: true,
        },
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.data.user.name,
          email: action.data.user.email,
        },
        auth: {
          ...state.auth,
          loginRequest: false,
          loginFailed: false,
        },
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          loginRequest: false,
          loginFailed: true,
        },
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: true,
        },
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: false,
          forgotFailed: false,
        },
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          forgotRequest: false,
          forgotFailed: true,
        },
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: true,
        },
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: false,
          resetFailed: false,
        },
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          resetRequest: false,
          resetFailed: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
