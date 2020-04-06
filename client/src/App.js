import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './context/userContext';

import Navbar from './components/Navbar';
import Error from './components/Error';
import Auth from './components/Auth';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';

import ProtectedRoute from './components/ProtectedRoute.js'

const App = () => {
    const userContext = useContext(UserContext);
    const { user, logout } = userContext;

    return (
        <div className='App'>
            {user && <Navbar logout={ logout } />}

            <Switch>
                {/* <Redirect to='/home' />  */}
                <Route path='/profile' component={ Profile } />
                {/* <Route path='/post' component={ Post } /> */}
                <Route path='/post/:userId:' component={ Post } />
                <Route component={ Error } />
                {/* <Route path='/' component={ Home } /> */}
                <Route 
                    exact path='/'
                    render={() => user ? <Redirect to='/profile'/> : <Auth/>}
                /> 
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo='/'
                    username={user}
                />
                <ProtectedRoute 
                    path='/post' 
                    component={ Post } 
                    redirectTo='/'
                    username={user}
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo='/'
                    username={user}
                />
                <ProtectedRoute 
                    component={ Error } 
                    redirectTo='/'
                    username={user}
                />
            </Switch>

        </div>
    ); 
};

export default App;