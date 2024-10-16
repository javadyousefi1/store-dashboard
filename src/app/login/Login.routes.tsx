import ErrorPage from "../errors/ErrorPage"
import Auth from "./Auth"
import Login from "./Login"
import Signup from "./Signup"

export const LoginRoutes = {
    path: "/user",
    element:<Auth/>,
    errorElement: <ErrorPage />,
    children: [
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "signup",
          element: <Signup/>
        }
      ],
}