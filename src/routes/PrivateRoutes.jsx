import { ROUTES_CONSTANT } from "../shared/Routes";
import Home from "../views/Authenticated/Home";

export const PRIVATE_ROUTES = [
    {
        path: ROUTES_CONSTANT.HOME,
        element: <Home />
    },   
]