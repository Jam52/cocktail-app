import React from "react";
import classes from "./Divider.module.scss";

const divider = (props) => (
    <div>
        <div className={classes.Border}></div>
        <div className={classes.BorderBlack}></div>
        <div className={classes.BorderSmall}></div>
    </div>
);

export default divider;
