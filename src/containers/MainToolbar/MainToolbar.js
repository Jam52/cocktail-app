import React from "react";
import { Link } from "react-router-dom";
import NavList from "../../components/navigation/NavList/Navlist";
import classes from "./MainToolbar.module.scss";
import MimiIcon from "../../assets/images/madame-mimi-logo.png";
import MimiIconGold from "../../assets/images/madame-mimi-logo-gold.png";
import Background from "../../assets/images/background.png";
import baseClasses from "../../App.module.scss";
import Divider from "../../components/Divider/Divider";

const mainToolbar = () => {
    return (
        <div className={classes.Display}>
            <div
                className={classes.Header}
                style={{ backgroundImage: `url(${Background})` }}
            >
                <div class={classes.Header__container}>
                    <Link to="/">
                        <img
                            src={MimiIcon}
                            alt="Madam Mimi's"
                            className={classes.Icon}
                            onMouseOver={(e) => {
                                e.currentTarget.src = MimiIconGold;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.src = MimiIcon;
                            }}
                        />
                    </Link>

                    <NavList />
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default mainToolbar;
