// libs
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import React from 'react'

// components
import AppLayout from '../components/layouts/AppLayout'
import PrivateLayout from '../components/layouts/PrivateLayout'
import PublicLayout from '../components/layouts/PublicLayout'

// routes
import { PUBLIC_ROUTES } from './PublicRoutes'
import { AUTH_ROUTES } from './AuthRoutes'
import { PRIVATE_ROUTES } from './PrivateRoutes'

// constants
import { ROUTES_CONSTANT } from '../shared/Routes'
import { useSelector } from 'react-redux';
import TestLayout from '../components/layouts/TestLayout'

const DEFAULT_AUTHENTICATED_ROUTE = ROUTES_CONSTANT.HOME
const DEFAULT_GUEST_ROUTE = ROUTES_CONSTANT.LOGIN

const AuthenticatedRoutes = () => {
    const routes = PUBLIC_ROUTES.concat(PRIVATE_ROUTES)
    let defaultRoute = {
        path: "*",
        element: <Navigate to={DEFAULT_AUTHENTICATED_ROUTE} replace />,
        title: "Home",
    };
    routes.push(defaultRoute);
    const routing = useRoutes(routes)
    return <PrivateLayout>{routing}</PrivateLayout>
}

const GuestRoutes = () => {
    const routes = PUBLIC_ROUTES.concat(AUTH_ROUTES)
    let defaultRoute = {
        path: "*",
        element: <Navigate to={DEFAULT_GUEST_ROUTE} replace />,
        title: "Home",
    };
    routes.push(defaultRoute);
    const routing = useRoutes(routes)
    return <PublicLayout>{routing}</PublicLayout>
}

const RootRouter = () => {
    const token = useSelector((state) => state.auth.token)
    return (
        <BrowserRouter>
            <AppLayout>
                {token ? <AuthenticatedRoutes /> : <GuestRoutes />}
            </AppLayout>

            {/* <TestLayout></TestLayout> */}
        </BrowserRouter>
    )
}

export default RootRouter