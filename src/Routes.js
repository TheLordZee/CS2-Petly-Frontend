import React from "react";
import { Route, useHistory } from "react-router-dom"
import { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import Organizations from "./organizations/Organizations";
import Pets from "./pets/Pets";

const Routes = () => {
    return(
        <>
        <NavBar/>
        <div>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/pets/:page">
                <Pets />
            </Route>
            <Route exact path="/organizations/:page">
                <Organizations />
            </Route>
        </div>
        </>
    )
}

export default Routes;