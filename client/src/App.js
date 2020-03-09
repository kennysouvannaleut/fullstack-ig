import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Home from './pages/home/Home';
import Post from './pages/post/Post';
import View from './pages/view/View';

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
                        path='post'
                        component={ Post }
                    />
                    <Route
                        path='/view'
                        component={ View }
                    />
                    <Route component={ Error } />
                </Switch>
            </div>
            
        </div>
    );
};

export default App;