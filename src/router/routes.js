import RoutePaths from "../constants/route-paths";
import {
  LoginPage,
  SignupPage,
  ForgotPassword,
  SetPassword,
  Dashboard,
} from "../pages";

const ROUTES = [
  {
    id: "0",
    path: RoutePaths.LOGIN,
    component: LoginPage,
  },
  {
    id: "1",
    path: RoutePaths.SIGNUP,
    component: SignupPage,
  },
  {
    id: "5",
    path: RoutePaths.FORGOT_PASSWORD,
    component: ForgotPassword,
  },
  {
    id: "6",
    path: RoutePaths.SET_PASSWORD,
    component: SetPassword,
  },
];

const SIDEBAR_ROUTES = [
  {
    id: "0",
    path: "",
    component: Dashboard,
  },
];

export { ROUTES, SIDEBAR_ROUTES };
