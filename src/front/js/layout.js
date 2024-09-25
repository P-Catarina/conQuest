import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";
import { PrivateRoutes } from "./private_routes";

import { Home } from "./pages/home";
import { Login } from "./pages/logIn";
import { Forgot } from "./pages/forgot_password";
import { SignUp } from "./pages/signup";
import { Tutorial } from "./pages/tutorial";
import { Role } from "./pages/role_select";
import { Quests } from "./pages/quests";
import { Rewards } from "./pages/rewards";
import { Bestiary } from "./pages/bestiary"; 
import { EncounterMap } from "./pages/encounter_map";
import { EncounterBattle } from "./pages/encounter_battle";
import { Scoreboard } from "./pages/scoreboard";
import { ProfileEdit } from "./pages/profile_edit";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Forgot />} path="/forgot" />
                    <Route element={<SignUp />} path="/signup" />
                    <Route element={<Quests />} path="/quests" />
                    <Route element={<Tutorial />} path="/tutorial" />
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Role />} path="/role" />
                        <Route element={<Rewards />} path="/rewards" />
                        <Route element={<Bestiary />} path="/bestiary" />
                        <Route element={<EncounterMap />} path="/encounter-map" />
                        <Route element={<EncounterBattle />} path="/encounter-battle" />
                        <Route element={<Scoreboard />} path="/scoreboard" />
                        <Route element={<ProfileEdit />} path="/editprofile" />
                    </Route>
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);