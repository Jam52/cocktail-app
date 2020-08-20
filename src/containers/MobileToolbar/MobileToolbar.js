import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import NavList from "../../components/navigation/NavList/Navlist";
import classes from "./MobileToolbar.module.scss";
import MiniIcon from "../../assets/images/madame-mimi-logo-glass.png";
import Background from "../../assets/images/background.png";
import Divider from "../../components/Divider/Divider";

class mobileToolbar extends Component {
    state = {
        open: false,
    };

    popupClickHandler = () => {
        console.log("[PopupHandler] Clicked");
        this.setState({ open: !this.state.open });
    };

    render() {
        let open = { transform: "translateY(100px)" };
        if (this.state.open) {
            open = { transform: "translateY(0px)" };
        }

        return (
            <Aux>
                <div className={classes.MobileToolbar} style={open}>
                    <div
                        className={classes.Icon}
                        onClick={this.popupClickHandler}
                    >
                        <img src={MiniIcon} alt="Madam Mimi's" />
                    </div>
                    <Divider />
                    <div
                        onClick={this.popupClickHandler}
                        className={classes.Popup}
                        style={{ backgroundImage: `url(${Background})` }}
                    >
                        <NavList />
                    </div>
                </div>
            </Aux>
        );
    }
}

export default mobileToolbar;
