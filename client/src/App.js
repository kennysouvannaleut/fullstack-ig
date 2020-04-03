import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/UserProvider';

import Navbar from './components/Navbar';
import Error from './components/Error';
import Auth from './components/Auth';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';

import ProtectedRoute from './components/ProtectedRoute.js'

const App = () => {
    const { logout, username } = useContext(UserContext);

    return (
        <div className='App'>
            {username && <Navbar logout={ logout } />}

            <Switch>
                {/* <Redirect to='/home' />  */}
                <Route path='/profile' component={ Profile } />
                <Route path='/post' component={ Post } />
                <Route component={ Error } />
                {/* <Route path='/' component={ Home } /> */}
                <Route 
                    exact path='/'
                    render={() => username ? <Redirect to='/profile'/> : <Auth/>}
                /> 
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo='/'
                    username={username}
                />
                <ProtectedRoute 
                    path='/post' 
                    component={ Post } 
                    redirectTo='/'
                    username={username}
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo='/'
                    username={username}
                />
                <ProtectedRoute 
                    component={ Error } 
                    redirectTo='/'
                    username={username}
                />
            </Switch>

        </div>
    ); 
};

export default App;