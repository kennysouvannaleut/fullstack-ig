import React from 'react'
import Navtab from './Navtab';

const Navbar = () => (
    <>
        <Navtab
            to='/home' 
            label='Home'
        />
        <Navtab
            to='/post'
            label='/Post' 
        />
        <Navtab
            to='/view'
            label='/View' 
        />
    </> 
);

export default Navbar;