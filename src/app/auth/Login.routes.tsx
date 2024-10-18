import ErrorPage from "../errors/ErrorPage"
import Auth from "./Auth"
import Login from "./login/Login"
import Signup from './signUp/Signup';

export const LoginRoutes = {
  path: "/auth",
  element: <Auth />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "login",
      element: <Login />
    },
    {
      path: "signup",
      element: <Signup />
    }
  ],
}