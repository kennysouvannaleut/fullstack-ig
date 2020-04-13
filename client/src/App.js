import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserContext from './context/userContext';

import Navbar from './components/nav/Navbar';
import Auth from './components/auth/Auth';
// import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute.js'

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';
import DetailPage from './pages/detail/DetailPage.js'
import UserPosts from './pages/userPosts/UserPosts.js'

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
                {/* <Route path='*' component={ Error } /> */}
                <ProtectedRoute 
                    path='/profile' 
                    component={ Profile } 
                    redirectTo={ '/' }
                    token={ token } 
                />
                <ProtectedRoute 
                    path='/post' 
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
                <ProtectedRoute 
                    exact path='/detail/:postId' 
                    component={DetailPage}
                    redirectTo='/'
                    token={token}
                />
                <ProtectedRoute 
                    exact path='/user/:username' 
                    component={UserPosts}
                    redirectTo='/'
                    token={token}
                />
            </Switch>

        </div>
    ); 
};

export default App;
