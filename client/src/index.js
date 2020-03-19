import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserProvider';

import * as firebase from 'firebase';
import config from './firebase-config';

import './css/styles.css';
import App from './App';

const rootElement = document.getElementById('root');

firebase.initializeApp(config);

render ( 
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>,
    rootElement 
);
