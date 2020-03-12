import React from 'react'
import Navtab from './Navtab';

const Navbar = props => {
    const { logout } = props;

    return (
        <div className='navbar'>
            <Navtab
                to='/home' 
                label='Home'
            />
            <Navtab
                to='/profile'
                label='Profile' 
            />
            <Navtab
                to='/post'
                label='Post' 
            />
            <button onClick={ logout }>Logout</button>
        </div>
    );
};

export default Navbar;