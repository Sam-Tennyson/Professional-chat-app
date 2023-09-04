import { ROUTES_CONSTANT } from "../shared/Routes";
import Home from "../views/Authenticated/Home";
import Profile from "../views/Authenticated/Profile";

export const PRIVATE_ROUTES = [
    {
        path: ROUTES_CONSTANT.HOME,
        element: <Home />
    },  
    {
        path: ROUTES_CONSTANT.PROFILE,
        element: <Profile />
    },   
]