import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserContext from './context/userContext';

import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute.js'

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';

const App = () => {
    const userContext = useContext(UserContext);
    const { token, logout } = userContext;

    return (
        <div className='App'>
            { <Navbar logout={ logout } token={ token } /> }

            <Switch>
                <Route 
                    exact path='/'
                    render={ () => token ? <Redirect to='/profile' /> : <Auth /> }
                /> 
                <Route path = '/' component={ Error } />
                {/* <Route path='/profile' component={ Profile } /> 
                <Route path='/viewposts/:userId' component={ Post } /> */}
                {/* <Route path='/' component={ Home } /> */}
                
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo={ '/' }
                    token={ token } 
                />
                <ProtectedRoute 
                    path='/:userId' 
                    component={ Post } 
                    redirectTo={ '/' }
                    token={ token }
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo={ '/' }
                    token={ token }
                />
            </Switch>

        </div>
    ); 
};

export default App;
