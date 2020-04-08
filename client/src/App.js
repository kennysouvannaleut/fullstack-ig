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
    console.log(111, userContext.user)

    return (
        <div className='App'>
            { user && <Navbar logout={ logout } user={ user }/> }

            <Switch>
                <Route 
                    exact path='/'
                    render={ () => user ? <Redirect to='/userId' /> : <Auth /> }
                /> 
                {/* <Redirect to='/home' />  */}
                <Route path = '*' component={ Error } />
                {/* <Route path='/:userId' component={ Profile } /> 
                <Route path='/post' component={ Post } />
                <Route path='/' component={ Home } /> */}
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo={ '/' }
                    user={ user } 
                />
                <ProtectedRoute 
                    path='/userId' 
                    component={ Post } 
                    redirectTo={ '/' }
                    user={ user }
                />
                <ProtectedRoute
                    path='/home'
                    component={ Home }
                    redirectTo={ '/' }
                    user={ user }
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