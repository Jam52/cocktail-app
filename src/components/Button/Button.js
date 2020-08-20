import React from "react";
import classes from "./Button.module.scss";

const button = (props) => {
    let classNames = [classes.Button];
    if (props.size === "small") {
        classNames.push(classes.ButtonSmall);
    }
    if (props.active) {
        classNames.puch(classes.active);
    }
    return (
        <button className={classNames.join(" ")} onClick={props.click}>
            {props.children}
        </button>
    );
};

export default button;
