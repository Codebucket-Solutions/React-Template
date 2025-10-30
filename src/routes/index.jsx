import React, { lazy, useEffect, useState, Suspense } from "react";
const ButtonPage = lazy(() => import("../pages/buttonPages"));
import { Route, Routes } from "react-router-dom";


const homeRoutes = [
    // Creator Page
    {
        path: "/",
        parent: "BUTTON",
        permissions: "VIEW_BUTTON",
        exact: true,
        component: ButtonPage,
    },
    // {
    //     path: "/*",
    //     parent: "INFLUENCER",
    //     permissions: "VIEW_BASIC_INFO",
    //     exact: true,
    //     navigate: "/button",
    // },

];





const PagesRoute = () => {
    const [allRoutes, setAllRoutes] = useState([]);
  
    useEffect(() => {
        setAllRoutes(homeRoutes)
    }, []);


    const generateRoute = (allRoutes) => {
        let _data = [];
        allRoutes.map(({ path, component, navigate }, i) => {
            const Component = component;
            _data.push(
                <Route
                    path={path}
                    key={i}
                    exact={true}
                    element={
                        navigate ? (
                            <Navigate replace to={navigate} />
                        ) : (
                            <Suspense fallback={<></>}>
                                <Component />
                            </Suspense>
                        )
                    }
                />
            );
        });
        return <Routes>{_data}</Routes>;
    };

    return (
        <div>
            {generateRoute(allRoutes)}
        </div>
    );
};

export default PagesRoute;