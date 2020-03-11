import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/UserProvider';

import Navbar from './components/Navbar';
import Error from './components/Error';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import View from './pages/view/View';

const App = () => {
    const { logout } = useContext(UserContext);

    return (
        <div className='App'>
            <Navbar logout={ logout } />

            <Switch>
                <Redirect 
                    exact path='/'
                    to='/profile'
                />
                <Route 
                    path='/home' 
                    component={ Home }
                />
                <Route
                    path='/profile'
                    component={ Profile }
                />
                <Route
                    path='/view'
                    component={ View }
                />
                <Route 
                    component={ Error } 
                />
            </Switch>

        </div>
    );
};

export default App;