import { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import RouteComponent from 'route/components/RouteComponent';
import routes from 'route/routes';

const renderRoute = route => {
    // const { name, path, Component, authorization } = route;
    const { name, path, Component } = route;
    return (
        <Route
            key={name}
            path={path}
            element={
                // <RouteComponent authorization={authorization} path={path}>
                //     {Component && <Component {...props} />}
                // </RouteComponent>
                <Component></Component>
            }
        ></Route>
    );
};
const RouteController = memo(() => {
    return (
        <BrowserRouter>
            <Routes>{routes.map(renderRoute)}</Routes>
        </BrowserRouter>
    );
});

RouteController.displayName = 'RouteController';
export default RouteController;
