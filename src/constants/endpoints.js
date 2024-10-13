export const ENDPOINTS = {
  LOGIN: (backendAPI) => `${backendAPI}/auth/login`,
  SIGNUP: (backendAPI) => `${backendAPI}/auth/register`,
  GET_USER: (backendAPI) => `${backendAPI}/get-user`,
  PASSWORD_RESET: (backendAPI) => `${backendAPI}/auth/send-password-reset-link`,
  SET_PASSWORD: (backendAPI) => `${backendAPI}/auth/reset-password-verification`,
};
