import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
    color: '#b3b322',
    fontWeight: 'bold'
};

const navStyle = {
    margin: '10px'
};

const Navtab = props => (
    <NavLink 
        style={ navStyle } 
        activeStyle={ activeStyle } 
        to={ props.to } 
    >
        { props.label }
    </NavLink>
);

export default Navtab;