import React from "react";

import classes from "./App.module.scss";
import Layout from "./containers/Layout/Layout";

function App() {
    return (
        <div className={classes.App}>
            <Layout />
        </div>
    );
}

export default App;
