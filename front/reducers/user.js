const initialState = {
  isLoggedIn: false, //로그인 시도중
  isLoggingIn: false,
  isLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => ({
  type: 'LOG_IN_REQUEST',
  data,
});

export const loginSuccessAction = (data) => ({
  type: 'LOG_IN_SUCCESS',
  data,
});

export const loginFailureAction = (data) => ({
  type: 'LOG_IN_FAILURE',
  data,
});

export const logoutRequestAction = () => ({
  type: 'LOG_OUT_REQUEST',
});

export const logoutSuccessAction = () => ({
  type: 'LOG_OUT_SUCCESS',
});

export const logoutFailureAction = () => ({
  type: 'LOG_OUT_FAILURE',
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'bear' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      };
    case 'LOG_OUT_SUCCESS':
    return {
      ...state,
      isLoggingOut: false,
      isLoggedIn: false,
      me: null,
    };
    case 'LOG_OUT_FAILURE':
    return {
      ...state,
      isLoggingOut: false,
    };
    default:
      return state;
  }
};

export default reducer;
