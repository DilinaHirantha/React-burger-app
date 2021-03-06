import React from 'react';
import BurgerLogo from '../../../assets/images/28.1 burger-logo.png.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={BurgerLogo} alt="MyBurger"/>
    </div>
)

export default Logo;
