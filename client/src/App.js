import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserContext from './context/userContext';

import Navbar from './components/nav/Navbar';
import Auth from './components/auth/Auth';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute.js'

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import UserAlbum from './pages/userAlbum/UserAlbum.js';
import PostDetail from './pages/postDetail/PostDetail.js';
import UserDetail from './pages/userDetail/UserDetail.js';

const App = () => {
    const { token , logout } = useContext(UserContext);

    return (
        <div className='App'>
            { token && <Navbar logout={ logout }/> }
            <Switch>
                <Route 
                    exact path='/'
                    render={ () => token ? <Redirect to='/profile' /> : <Auth /> }
                /> 
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo={ '/' }
                    token={ token } 
                />
                <ProtectedRoute 
                    path='/current-user' 
                    component={ UserAlbum } 
                    redirectTo={ '/' }
                    token={ token }
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo={ '/' }
                    token={ token }
                />
                <ProtectedRoute 
                    exact path='/detail/:postId' 
                    component={ PostDetail }
                    redirectTo='/'
                    token={ token }
                />
                <ProtectedRoute 
                    exact path='/user/:username' 
                    component={ UserDetail }
                    redirectTo='/'
                    token={ token }
                />
                <ProtectedRoute 
                    exact path='*' 
                    component={ Error }
                    redirectTo='/'
                    token={ token }
                />
            </Switch>
        </div>
    ); 
};

export default App;
