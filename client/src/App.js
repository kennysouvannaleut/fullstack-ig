import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Public from './pages/public/Public';

const App = () => {
    
    return (
        <div className='App'>
            <div className='App-nav'>
                <Navbar />
            </div>

            <div className='App-main'>
                <Switch>
                    <Redirect 
                        exact path='/'
                        to='/home'
                    />
                    <Route 
                        path='/home' 
                        component={ Home }
                    />
                    <Route
                        path='profile'
                        component={ Profile }
                    />
                    <Route
                        path='/public'
                        component={ Public }
                    />
                    <Route component={ Error } />
                </Switch>
            </div>
            
        </div>
    );
};

export default App;