import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Navtab from './Navtab';
import userContext from '../../context/userContext';

const Navbar = props => {
    const { logout } = props;
    const {getCurrentProfile, currentProfile: {img}} = useContext(userContext)

    useEffect(() => {
        getCurrentProfile()
    }, [])

    return (
        <div className='nav'>
            <div className='nav-box'>
                <Navtab to='/home' label='Home' />
                <Navtab to='/profile' label='Profile' />
                <Navtab to='/current-user' label='My Album' />
            </div>
            <div className='nav-user'>
                {
                img && img.imgUrl && 
                    <NavLink 
                        to='/profile' 
                        className='navbar-icon-link' 
                        activeStyle={{
                            'border': 'solid rgb(116, 154, 177) 1px', 
                            'height': '26px', 
                            'width': '26px',
                            'marginRight': '5px',
                            'marginTop': '-1px',
                            'marginBottom': '-3px'
                        }}
                    >
                        <img className='navbar-icon' src={img.imgUrl}/>
                    </NavLink>
                }
                <button className='nav-button button' onClick={ logout }>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
