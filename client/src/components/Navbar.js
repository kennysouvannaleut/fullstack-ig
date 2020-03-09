import React from 'react'
import Navtab from './Navtab';

const Navbar = () => (
    <>
        <Navtab
            to='/home' 
            label='Home'
        />
        <Navtab
            to='/contact'
            label='/Contact' 
        />
    </> 
);

export default Navbar;