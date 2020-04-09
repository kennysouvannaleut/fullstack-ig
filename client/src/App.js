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
    const { token , logout } = useContext(UserContext)

    return (
        <div className='App'>
            { token && <Navbar logout={ logout }/> }

            <Switch>
                <Route 
                    exact path='/'
                    render={ () => token ? <Redirect to='/profile' /> : <Auth /> }
                /> 
                {/* <Redirect to='/home' />  */}
                {/* <Route path = '*' component={ Error } /> */}
                {/* <Route path='/:userId' component={ Profile } /> 
                <Route path='/post' component={ Post } />
                <Route path='/' component={ Home } /> */}
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo='/'
                    token={ token } 
                />
                <ProtectedRoute 
                    path='/post' 
                    component={ Post } 
                    redirectTo='/'
                    token={ token }
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo='/'
                    token={ token }
                />
                {/* <ProtectedRoute
                    component={ Error }
                    redirectTo='/'
                    username={username}
                /> */}
            </Switch>

        </div>
    ); 
};

export default App;