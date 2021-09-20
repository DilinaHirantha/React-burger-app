import React from 'react';
import Logo from "../../UI/Logo/Logo";
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/Auxs/Auxs';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;
