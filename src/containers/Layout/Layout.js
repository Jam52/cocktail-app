import React from "react";
import { Switch, Route } from "react-router-dom";

import MainToolbar from "../MainToolbar/MainToolbar";
import MobileToolbar from "../MobileToolbar/MobileToolbar";
import Aux from "../../hoc/Auxillary/Auxillary";
import LandingPage from "../../components/LandingPage/LandingPage";
import SearchPage from "../../components/SearchPage/SearchPage.js";
import RandomPage from "../../components/RandomPage/RandomPage";

// import classes from "./Layout.Module.scss";

const Layout = (props) => {
    return (
        <Aux>
            <MainToolbar />
            <MobileToolbar />

            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/random" component={RandomPage} />
            </Switch>
        </Aux>
    );
};

export default Layout;
