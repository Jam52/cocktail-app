import React from "react";
import { BrowserRouter } from "react-router-dom";

import classes from "./App.module.scss";
import Layout from "./containers/Layout/Layout";

function App() {
    return (
        <BrowserRouter>
            <div className={classes.App}>
                <Layout />
            </div>
        </BrowserRouter>
    );
}

export default App;
