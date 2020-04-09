import React from 'react'
import { Link } from 'react-router-dom';
import Navtab from './Navtab';

const Navbar = props => {
    console.log('props', props)
    const { token, logout } = props;

    return (
        <div className='navbar'>
            { token && <Link to='/profile'>Profile</Link> }
            
            <Navtab to='/home' label='Home' />
            <Navtab to='/profile' label='Profile' />
            <Navtab to='/post' label='Post' />

            { token && <button onClick={ logout }>Logout</button> }
        </div>
    );
};

export default Navbar;
