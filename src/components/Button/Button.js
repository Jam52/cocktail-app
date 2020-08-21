import React from "react";
import classes from "./Button.module.scss";

const button = (props) => {
    let classNames = [classes.Button, props.className];

    return (
        <button className={classNames.join(" ")} onClick={props.click}>
            {props.children}
        </button>
    );
};

export default button;
