import React from "react";
import { Route, useHistory } from "react-router-dom"
import { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import Organizations from "./organizations/Organizations";
import Pets from "./pets/Pets";
import PetDetails from "./pets/PetDetails";
import OrgDetails from "./organizations/OrgDetails";
import Signup from "./users/Signup";
import { useLocalStorage } from "./helpers";
import Login from "./users/Login";
import Profile from "./users/Profile";
import UserPetDetails from "./users/UserPetDetails";

const Routes = () => {
    const {getCurrUser} = useLocalStorage();
    const [user, setUser] = useState(getCurrUser());

    return(
        <>
        <NavBar setUser={setUser}/>
        <div>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/pets">
                <Pets />
            </Route>
            <Route exact path="/pets/org/:id">
                <PetDetails />
            </Route>
            <Route exact path="/pets/user/:id">
                <UserPetDetails />
            </Route>
            <Route exact path="/organizations/page/:page">
                <Organizations />
            </Route>
            <Route exact path="/organizations/id/:orgId">
                <OrgDetails />
            </Route>
            <Route exact path="/signup">
                <Signup setUser={setUser}/>
            </Route>
            <Route exact path="/login">
                <Login setUser={setUser}/>
            </Route>
            <Route exact path="/users/:username">
                <Profile />
            </Route>
        </div>
        </>
    )
}

export default Routes;