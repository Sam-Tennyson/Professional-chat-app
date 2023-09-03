import { ROUTES_CONSTANT } from "../shared/Routes";
import Login from "../views/Authentication/Login";
import Signup from "../views/Authentication/Signup";

export const AUTH_ROUTES = [
    {
        path: ROUTES_CONSTANT.LOGIN,
        element: <Login />
    },
    {
        path: ROUTES_CONSTANT.SIGN_UP,
        element: <Signup />
    }
]