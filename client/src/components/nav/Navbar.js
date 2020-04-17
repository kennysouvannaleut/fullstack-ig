import React from 'react'
import { Link } from 'react-router-dom';
import Navtab from './Navtab';

const Navbar = props => {
    const { token, logout } = props;

    return (
        <div className='nav'>
            { token && <Link to='/profile'>Profile</Link> }
            
            <Navtab to='/home' label='Home' />
            <Navtab to='/profile' label='Profile' />
            {/* <Navtab to='/current-user' label='Post' /> */}

            <button onClick={ logout }>Logout</button>
        </div>
    );
};

export default Navbar;
