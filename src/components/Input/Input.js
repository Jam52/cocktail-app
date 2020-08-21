import React from "react";
import classes from "./Input.module.scss";

const input = (props) => {
    return (
        <div className={[classes.InputElement, props.className].join(" ")}>
            <label>{props.label}</label>
            <input {...props} />
        </div>
    );
};

export default input;
