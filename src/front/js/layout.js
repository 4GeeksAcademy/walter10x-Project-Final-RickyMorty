// src/front/js/layout.js
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Characters } from "./pages/Characters";
import { Locations } from "./pages/Locations";
import { Episodes } from "./pages/Episodes";
import { Favorites } from "./pages/Favorites";
import { Profile } from "./pages/Profile";

import { PrivateRoute } from "./component/PrivateRoute";
import injectContext, { Context } from "./store/appContext";

import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.checkAuth();
    }, []);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/characters" element={<Characters />} />
                            <Route path="/locations" element={<Locations />} />
                            <Route path="/episodes" element={<Episodes />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
