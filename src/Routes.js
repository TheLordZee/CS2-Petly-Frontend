import React from "react";
import { Route, useHistory } from "react-router-dom"
import { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";

const Routes = () => {
    return(
        <>
        <NavBar/>
        <div>
            <Route exact path="/">
                <Home />
            </Route>
        </div>
        </>
    )
}

export default Routes;