import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/UserProvider';

import Navbar from './components/Navbar';
import Error from './components/Error';
import Auth from './components/Auth';

// import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';

const App = () => {
    const { logout } = useContext(UserContext);

    return (
        <div className='App'>
            <Navbar logout={ logout } />
            <Auth />

            <Switch>
                {/* <Redirect to='/home' />  */}
                <Route path='/profile' component={ Profile } />
                <Route path='/post' component={ Post } />
                <Route component={ Error } />
                {/* <Route path='/' component={ Home } /> */}
            </Switch>

        </div>
    ); 
};

export default App;